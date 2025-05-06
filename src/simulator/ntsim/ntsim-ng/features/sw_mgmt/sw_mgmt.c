/***************************************************************************************************
 *   Copyright (C) 2024 RideNext Software Solutions. Pvt Ltd. All rights reserved
 * **********************************************************************************************/


#define _GNU_SOURCE

#include "sw_mgmt.h"
#include "utils/log_utils.h"
#include "utils/sys_utils.h"
#include "utils/http_client.h"
#include "utils/nts_utils.h"
#include <stdio.h>
#include <assert.h>
#include <errno.h>
#include <unistd.h>
#include <string.h>
#include <sys/types.h>
#include <dirent.h>
#include <sched.h>
#include <time.h>
#include <signal.h>

#include <sysrepo.h>
#include <sysrepo/values.h>

#include "core/framework.h"
#include "core/session.h"
#include "core/xpath.h"


bool swmgnt_status = true;
bool dnload_status = true;
char dnload_err[256] = { '\0' };
bool install_status = true;
char install_err[256] = { '\0' };
bool active_status = true;
char active_err[256] = { '\0' };


#define CREATE_NEW_VALUE(rc, v, num)  {\
                                        rc = sr_realloc_values(num, num+1, &v);\
                                        if (SR_ERR_OK != rc) {\
                                              return rc;\
                                            }\
                                            num++;\
                                      }


#define LINE_BUFSIZE 128

volatile int exit_application = 0;

pthread_mutex_t lock;

static int sw_download_error_count, sw_install_error_count, sw_activate_error_count;
int sw_mgnt_notify_send_message(sr_session_ctx_t * session, char* filePath, int port, char* res, int actionType, char* evstatus);



void* sw_download_rpc_notification_send(sr_session_ctx_t* pSes, char *pFilePath)
{
    // create the values to be sent in the notification
    int rc = SR_ERR_OK;


    sr_val_t *notif = NULL;
    size_t current_num_of_values_notif = 0;

    CREATE_NEW_VALUE(rc, notif, current_num_of_values_notif);

    char *trunc_filename;
    trunc_filename = strrchr(pFilePath, '/');

    sr_val_build_xpath(&notif[current_num_of_values_notif - 1], "%s", "/o-ran-software-management:download-event/file-name");
    if (trunc_filename != NULL)
    {
        sr_val_set_str_data(&notif[current_num_of_values_notif - 1], SR_STRING_T, trunc_filename + 1);
    }


    CREATE_NEW_VALUE(rc, notif, current_num_of_values_notif);

    sr_val_build_xpath(&notif[current_num_of_values_notif - 1], "%s", "/o-ran-software-management:download-event/status");
    sr_val_set_str_data(&notif[current_num_of_values_notif - 1], SR_ENUM_T, "COMPLETED");


    // wait 5 seconds before sending the notification
    sleep(5);

    /* send notification for event_notif_sub(_tree)_example */
    log_add_verbose(1, "RN-EMS:SWMGNT:DOWNLOAD EVENT:   Sending event notification for '/o-ran-software-management:download-event'...\n");
    rc = sr_event_notif_send(pSes, "/o-ran-software-management:download-event", notif, current_num_of_values_notif);
    if (SR_ERR_NOT_FOUND == rc) {
        log_error("RNEMS:SWMGNT:DOWNLOAD: No application subscribed for '/o-ran-software-management:download-event', skipping.\n");
        rc = SR_ERR_OK;
    }
    sr_free_values(notif, current_num_of_values_notif);

    return NULL;
}





static cJSON*  ves_create_sw_mgnt_fields( int actionType , char* res , char* filePath , int err , char* evstatus ) 
{
    char type[36] = {'\0'};

    if ( actionType == 1 )  {
        strcpy(type, "sw_mgnt_download");
     }
    else if ( actionType == 2 )  {
        strcpy(type, "sw_mgnt_install");
     }
    else if ( actionType == 3 )  {
        strcpy(type, "sw_mgnt_active");
    }
    else {
        log_error("RN-EMS: ves_create_sw_mgnt_fields: could not create cJSON object Option Invalid [%d]\n", actionType);
        strcpy(type, "sw_mgnt_invalid");
    }


    int rc;
    static int sequence_number = 0;

    cJSON *extra_notify_fileds = cJSON_CreateObject();
    if(extra_notify_fileds  == 0) {
        log_error("could not create cJSON object\n");
        return NTS_ERR_FAILED;
    }

     if(cJSON_AddStringToObject(extra_notify_fileds, "changeIdentifier", "SW_MGNT_UPGRADE") == 0) {
        log_error("cJSON_AddStringToObject failed\n");
        cJSON_Delete(extra_notify_fileds);
        return 0;
     }

     if(cJSON_AddStringToObject(extra_notify_fileds, "changeType", "swManagement") == 0) {
        log_error("cJSON_AddStringToObject failed\n");
        cJSON_Delete(extra_notify_fileds);
        return 0;
     }

      if(cJSON_AddStringToObject(extra_notify_fileds, "notificationFieldsVersion", "2.0") == 0) {
        log_error("cJSON_AddStringToObject failed\n");
        cJSON_Delete(extra_notify_fileds);
        return 0;
      }


     cJSON *additional_fields_entry = cJSON_CreateObject();
    if(additional_fields_entry == 0) {
        log_error("could not create JSON object\n");
        cJSON_Delete(extra_notify_fileds);
        return 0;
     }

    if(cJSON_AddStringToObject(additional_fields_entry, "event", type) == 0) {
        log_error("cJSON_AddStringToObject failed\n");
        cJSON_Delete(extra_notify_fileds);
        return 0;
     }

    if(cJSON_AddStringToObject(additional_fields_entry, "status", evstatus) == 0) {
        log_error("cJSON_AddStringToObject failed\n");
        cJSON_Delete(extra_notify_fileds);
        return 0;
     }


    if(cJSON_AddStringToObject(additional_fields_entry, "result", res) == 0) {
        log_error("cJSON_AddStringToObject failed\n");
        cJSON_Delete(extra_notify_fileds);
        return 0;
     }

     if ( strcmp(res, "FAILURE") == 0 ) {

        if(cJSON_AddStringToObject(additional_fields_entry, "error-message", "System: Error") == 0) {
            log_error("cJSON_AddStringToObject failed\n");
            cJSON_Delete(extra_notify_fileds);
            return 0;
         }

      }

     if(cJSON_AddItemToObject(extra_notify_fileds, "additionalFields", additional_fields_entry) == 0) {
        log_error("cJSON_AddStringToObject failed\n");
        cJSON_Delete(extra_notify_fileds);
        return 0;
    }


    return extra_notify_fileds;

}


int sw_mgnt_notify_send_message(sr_session_ctx_t * session, char* filePath, int port, char* res, int actionType, char* evstatus)
{

    int rc;
    static int sequence_number = 0;
    int err = 0;
    char eventType[52] = { '\0' };
    char eventInfo[52] = { '\0' };

    switch (actionType) {
         case 1:
          log_add_verbose(1," **** RN-EMS: SOFTWARE DOWNLOAD   \"%s\"  \n", res);
	  strcpy(eventType, "sw_mgnt_download");
	  strcpy(eventInfo, res);
	  break;

         case 2:
          log_add_verbose(1," **** RN-EMS: SOFTWARE Install   \"%s\"  \n", res);
	  strcpy(eventType, "sw_mgnt_install");
	  strcpy(eventInfo, res);
	  break;

         case 3:
          log_add_verbose(1," **** RN-EMS: SOFTWARE Activate   \"%s\"  \n", res);
	  strcpy(eventType, "ssw_mgnt_activew_mgnt_install");
	  strcpy(eventInfo, res);
	  break;

         default:
          log_add_verbose(1," **** RN-EMS: Invalid Managament Req   \"%s\"  \n", res);
	  break;
    }


    cJSON *post_data_json = cJSON_CreateObject();
    if(post_data_json == 0) {
        log_error("could not create cJSON object\n");
        return NTS_ERR_FAILED;
    }

    cJSON *event = cJSON_CreateObject();
    if(event == 0) {
        log_error("could not create cJSON object\n");
        cJSON_Delete(post_data_json);
        return NTS_ERR_FAILED;
    }

    if(cJSON_AddItemToObject(post_data_json, "event", event) == 0) {
        log_error("cJSON_AddItemToObject failed\n");
        cJSON_Delete(post_data_json);
        return NTS_ERR_FAILED;
    }

    cJSON *common_event_header = ves_create_common_event_header("notification", "sw_mgnt_download", framework_environment.settings.hostname, port, "Normal", sequence_number++);
    if(common_event_header == 0) {
        log_error("could not create cJSON object\n");
        cJSON_Delete(post_data_json);
        return NTS_ERR_FAILED;
    }

    cJSON *internalHdrField = cJSON_CreateObject();
    if(internalHdrField == 0) {
        log_error("could not create cJSON object\n");
        cJSON_Delete(post_data_json);
        return NTS_ERR_FAILED;
    }

    if(cJSON_AddStringToObject(common_event_header, "eventType", eventType) == 0) {
        log_error("cJSON_AddStringToObject failed\n");
        cJSON_Delete(post_data_json);
        return 0;
     }

    if(cJSON_AddItemToObject(common_event_header, "internalHeaderFields", internalHdrField) == 0) {
        log_error("cJSON_AddItemToObject failed\n");
        cJSON_Delete(post_data_json);
        return NTS_ERR_FAILED;
    }


    if(cJSON_AddItemToObject(event, "commonEventHeader", common_event_header) == 0) {
        log_error("cJSON_AddItemToObject failed\n");
        cJSON_Delete(post_data_json);
        return NTS_ERR_FAILED;
    }

    cJSON *sw_dnload_fields = ves_create_sw_mgnt_fields(actionType ,  res , filePath , 0 , evstatus );
    if(sw_dnload_fields == 0) {
        log_error("could not create cJSON object\n");
        cJSON_Delete(post_data_json);
        return NTS_ERR_FAILED;
    }

    if(cJSON_AddItemToObject(event, "notificationFields", sw_dnload_fields) == 0) {
        log_error("cJSON_AddItemToObject failed\n");
        cJSON_Delete(post_data_json);
        return NTS_ERR_FAILED;
    }


   log_add_verbose(1," **** ******************************** PRINT  CJSON ********************     \n");
    char *post_data = cJSON_PrintUnformatted(post_data_json);
    cJSON_Delete(post_data_json);
    if(post_data == 0) {
        log_error("cJSON_PrintUnformatted failed\n");
        return NTS_ERR_FAILED;
    }

   log_add_verbose(1," [  %s  ]   \n",post_data);

   log_add_verbose(1," **** ********************************  ********************     \n");

    ves_details_t *ves_details = ves_endpoint_details_get(session, 0);
    if(!ves_details) {
        log_error("ves_endpoint_details_get failed\n");
        free(post_data);
        return NTS_ERR_FAILED;
    }

    rc = http_request(ves_details->url, ves_details->username, ves_details->password, "POST", post_data, 0, 0);
    ves_details_free(ves_details);
    free(post_data);

    if(rc != NTS_ERR_OK) {
        log_error("http_request failed\n");
        return NTS_ERR_FAILED;
    }

    return NTS_ERR_OK;

}



void sw_download_ves_notification_send(sr_session_ctx_t* session, char*  filePath, char* res , char* fstatus ) 
{
    int ssh_base_port = 0;
    int tls_base_port = 0;
    int actionType = 1 ; //DOWNLOAD
    int port = 0;
    int rc = 0;

    log_add_verbose(1,"RN-EMS: SWMGNT:DOWNLOAD :   SENDING VES EVENT: [%s]: [%s] \n",res,fstatus);

    sr_session_ctx_t *current_session ;

    rc = sr_session_start(session_connection, SR_DS_RUNNING, &current_session);
    if(rc != SR_ERR_OK) {
        log_error("RN-EMS: DOWNLOAD: NOTIFICATION:  could not start sysrepo session\n");
        return NTS_ERR_FAILED;
    }

    nts_mount_point_addressing_method_t mp = nts_mount_point_addressing_method_get(current_session);
    if(mp == UNKNOWN_MAPPING) {
        log_error("RN-EMS: sw_download_ves_notification_send: SWMGNT mount-point-addressing-method failed\n");
        log_add_verbose(1, "RN-EMS:Error: sw_download_ves_notification_send: SWMGNT mount-point-addressing-method failed\n");
      //  sr_session_stop(current_session);
        return NTS_ERR_FAILED;
    }
    else if(mp == DOCKER_MAPPING) {
        ssh_base_port = STANDARD_NETCONF_PORT;
        tls_base_port = ssh_base_port + framework_environment.settings.ssh_connections;
    }
    else {
        ssh_base_port = framework_environment.host.ssh_base_port;
        tls_base_port = framework_environment.host.tls_base_port;
    }


    if((framework_environment.settings.ssh_connections + framework_environment.settings.tls_connections) > 1) {
        for( port = ssh_base_port; port < ssh_base_port + framework_environment.settings.ssh_connections; port++) {
             rc = sw_mgnt_notify_send_message(current_session, filePath, port, res, actionType, fstatus);
            if(rc != NTS_ERR_OK) {
                log_error(" RN-EMS: SWMGNT:DOWNLOAD: Notification Failure SSH port[%d] RC[%d] \n",port,rc);
                log_add_verbose(1, "RN-EMS:Error: SWMGNT:DOWNLOAD: Notification Failure SSH  port[%d] RC[%d] \n",port,rc);
            }
        }

        for( port = tls_base_port; port < tls_base_port + framework_environment.settings.tls_connections; port++) {
             rc = sw_mgnt_notify_send_message(current_session, filePath, port, res, actionType, fstatus);
            if(rc != NTS_ERR_OK) {
                log_error(" RN-EMS: SWMGNT:DOWNLOAD: Notification Failure TLS port[%d] RC[%d] \n",port,rc);
                log_add_verbose(1, "RN-EMS:Error: SWMGNT:DOWNLOAD: Notification Failure TLS  port[%d] RC[%d] \n",port,rc);
            }
        }
    }
    else {
        rc = sw_mgnt_notify_send_message(current_session, filePath, port, res, actionType, fstatus);
        if(rc != NTS_ERR_OK) {
              log_error(" RN-EMS: SWMGNT:DOWNLOAD: Notification Failure  port[%d] RC[%d] \n",port,rc);
              log_add_verbose(1, "RN-EMS:Error: SWMGNT:DOWNLOAD: Notification Failure  port[%d] RC[%d] \n",port,rc);
          }
    }

     
}



void sw_install_ves_notification_send(sr_session_ctx_t* session, char*  slot_name, char* res , char* fstatus ) 
{
    int ssh_base_port = 0;
    int tls_base_port = 0;
    int actionType = 2 ; //INSTALL
    int port = 0;
    int rc = 0;

    log_add_verbose(1,"RN-EMS: SWMGNT:INSTALL :   SENDING VES EVENT: [%s]: [%s] \n",res,fstatus);
    sr_session_ctx_t *current_session = session;

    rc = sr_session_start(session_connection, SR_DS_RUNNING, &current_session);
    if(rc != SR_ERR_OK) {
        log_error("RN-EMS: sw_install_ves_notification_send: SWMGNT mount-point-addressing-method failed\n");
        log_add_verbose(1, "RN-EMS:Error: sw_install_ves_notification_send: SWMGNT mount-point-addressing-method failed\n");
        return NTS_ERR_FAILED;
    }

    nts_mount_point_addressing_method_t mp = nts_mount_point_addressing_method_get(current_session);
    if(mp == UNKNOWN_MAPPING) {
        log_error("RN-EMS: sw_install_ves_notification_send: SWMGNT mount-point-addressing-method failed\n");
        log_add_verbose(1, "RN-EMS:Error: sw_install_ves_notification_send: SWMGNT mount-point-addressing-method failed\n");
        return NTS_ERR_FAILED;
    }
    else if(mp == DOCKER_MAPPING) {
        ssh_base_port = STANDARD_NETCONF_PORT;
        tls_base_port = ssh_base_port + framework_environment.settings.ssh_connections;
    }
    else {
        ssh_base_port = framework_environment.host.ssh_base_port;
        tls_base_port = framework_environment.host.tls_base_port;
    }


    if((framework_environment.settings.ssh_connections + framework_environment.settings.tls_connections) > 1) {
        for( port = ssh_base_port; port < ssh_base_port + framework_environment.settings.ssh_connections; port++) {
             rc = sw_mgnt_notify_send_message(current_session, slot_name, port, res, actionType, fstatus);
            if(rc != NTS_ERR_OK) {
                 log_error("RN-EMS: sw_install_ves_notification_send: SWMGNT  SSH Port [%d] send failed\n",port);
                 log_add_verbose(1, "RN-EMS:Error: sw_install_ves_notification_send: SWMGNT SSH Port[%d] Send Failed \n", port);
            }
        }

        for( port = tls_base_port; port < tls_base_port + framework_environment.settings.tls_connections; port++) {
             rc = sw_mgnt_notify_send_message(current_session, slot_name, port, res, actionType, fstatus);
            if(rc != NTS_ERR_OK) {
                 log_error("RN-EMS: sw_install_ves_notification_send: SWMGNT  TLS Port [%d] send failed\n",port);
                 log_add_verbose(1, "RN-EMS:Error: sw_install_ves_notification_send: SWMGNT TLS Port[%d] Send Failed \n", port);
            }
        }
    }
    else {
        rc = sw_mgnt_notify_send_message(current_session, slot_name, port, res, actionType, fstatus);
        if(rc != NTS_ERR_OK) {
             log_error("RN-EMS: sw_install_ves_notification_send: SWMGNT  Port [%d] send failed\n",port);
             log_add_verbose(1, "RN-EMS:Error: sw_install_ves_notification_send: SWMGNT Port[%d] Send Failed \n", port);
        }
    }

     
}


void sw_activate_ves_notification_send(sr_session_ctx_t* session, char*  slot_name, char* res , char* fstatus ) 
{
    int ssh_base_port = 0;
    int tls_base_port = 0;
    int actionType = 3 ; //ACTIVATE
    int port = 0;
    int rc = 0;

    log_add_verbose(1,"RN-EMS: SWMGNT:ACTIVATE :   SENDING VES EVENT: [%s]: %[%s] \n",res,fstatus);

    sr_session_ctx_t *current_session = session;
    log_add_verbose(1, "RN-EMS:Error: sw_activate_ves_notification_send: SWMGNT Res[%s] Status[%s] \n", res,fstatus);

    rc = sr_session_start(session_connection, SR_DS_RUNNING, &current_session);
    if(rc != SR_ERR_OK) {
        log_error("could not start sysrepo session\n");
        return NTS_ERR_FAILED;
    }

    nts_mount_point_addressing_method_t mp = nts_mount_point_addressing_method_get(current_session);
    if(mp == UNKNOWN_MAPPING) {
        log_error("RN-EMS: sw_activate_ves_notification_send: SWMGNT: nts_mount_point_addressing_method_get FAIL: **  \n");
        log_add_verbose(1, "RN-EMS:Error: sw_activate_ves_notification_send: SWMGNT: nts_mount_point_addressing_method_get FAIL ** \n");
        return NTS_ERR_FAILED;
    }
    else if(mp == DOCKER_MAPPING) {
        ssh_base_port = STANDARD_NETCONF_PORT;
        tls_base_port = ssh_base_port + framework_environment.settings.ssh_connections;
    }
    else {
        ssh_base_port = framework_environment.host.ssh_base_port;
        tls_base_port = framework_environment.host.tls_base_port;
    }


    if((framework_environment.settings.ssh_connections + framework_environment.settings.tls_connections) > 1) {
        for( port = ssh_base_port; port < ssh_base_port + framework_environment.settings.ssh_connections; port++) {
             rc = sw_mgnt_notify_send_message(current_session, slot_name, port, res, actionType, fstatus);
            if(rc != NTS_ERR_OK) {
                log_error("RN-EMS: sw_activate_ves_notification_send: SWMGNT: Send VES  FAIL: SSH Port[%d] **  \n", port);
                log_add_verbose(1, "RN-EMS:Error: sw_activate_ves_notification_send: SWMGNT: Send VES  Fail SSH :port[%d] ** \n",port);
            }
        }

        for( port = tls_base_port; port < tls_base_port + framework_environment.settings.tls_connections; port++) {
             rc = sw_mgnt_notify_send_message(current_session, slot_name, port, res, actionType, fstatus);
            if(rc != NTS_ERR_OK) {
                log_error("RN-EMS: sw_activate_ves_notification_send: SWMGNT: Send VES  FAIL: TLS Port[%d] **  \n", port);
                log_add_verbose(1, "RN-EMS:Error: sw_activate_ves_notification_send: SWMGNT: Send VES Fail TLS :port[%d] ** \n",port);
            }
        }
    }
    else {
        rc = sw_mgnt_notify_send_message(current_session, slot_name, port, res, actionType, fstatus);
        if(rc != NTS_ERR_OK) {
           log_error("RN-EMS: sw_activate_ves_notification_send: SWMGNT: Send VES  FAIL:  Port[%d] **  \n", port);
           log_add_verbose(1, "RN-EMS:Error: sw_activate_ves_notification_send: SWMGNT: Send VES Fail :port[%d] ** \n",port);
        }
    }


}


void* sw_install_notification_send(sr_session_ctx_t* session, char* slot_name)
{
    // create the values to be sent in the notification
    int rc = SR_ERR_OK;

    sr_val_t *notif = NULL;
    size_t current_num_of_values_notif = 0;

    CREATE_NEW_VALUE(rc, notif, current_num_of_values_notif);

    sr_val_build_xpath(&notif[current_num_of_values_notif - 1], "%s", "/o-ran-software-management:install-event/slot-name");
    sr_val_set_str_data(&notif[current_num_of_values_notif - 1], SR_STRING_T, slot_name);


    CREATE_NEW_VALUE(rc, notif, current_num_of_values_notif);
    sr_val_build_xpath(&notif[current_num_of_values_notif - 1], "%s", "/o-ran-software-management:install-event/status");
    sr_val_set_str_data(&notif[current_num_of_values_notif - 1], SR_ENUM_T, "COMPLETED");

    // wait 5 seconds before sending the notification
    sleep(5);

    /* send notification for event_notif_sub(_tree)_example */
    log_add_verbose(1,"RN-EMS: SWMGNT:INSTALL:  Sending event notification for '/o-ran-software-management:install-event'...\n");
    rc = sr_event_notif_send(session, "/o-ran-software-management:install-event", notif, current_num_of_values_notif);
    if (SR_ERR_NOT_FOUND == rc) {
        log_error("RN-EMS: SWMGNT:INSTALL No application subscribed for '/o-ran-software-management:install-event', skipping.\n");
        rc = SR_ERR_OK;
    }
    sr_free_values(notif, current_num_of_values_notif);

    return NULL;
}


void* sw_activate_notification_send(sr_session_ctx_t* session , char* slot_name) 
{
    // create the values to be sent in the notification
    int rc = SR_ERR_OK;

    sr_val_t *notif = NULL;
    size_t current_num_of_values_notif = 0;

    CREATE_NEW_VALUE(rc, notif, current_num_of_values_notif);

    sr_val_build_xpath(&notif[current_num_of_values_notif - 1], "%s", "/o-ran-software-management:activation-event/slot-name");
    sr_val_set_str_data(&notif[current_num_of_values_notif - 1], SR_STRING_T, slot_name);


    CREATE_NEW_VALUE(rc, notif, current_num_of_values_notif);

    sr_val_build_xpath(&notif[current_num_of_values_notif - 1], "%s", "/o-ran-software-management:activation-event/status");
    sr_val_set_str_data(&notif[current_num_of_values_notif - 1], SR_ENUM_T, "COMPLETED");


    CREATE_NEW_VALUE(rc, notif, current_num_of_values_notif);

    sr_val_build_xpath(&notif[current_num_of_values_notif - 1], "%s", "/o-ran-software-management:activation-event/return-code");
    notif[current_num_of_values_notif - 1].type = SR_UINT8_T;
    notif[current_num_of_values_notif - 1].data.uint8_val = 200;

    // wait 5 seconds before sending the notification
    sleep(5);

    /* send notification for event_notif_sub(_tree)_example */
    log_add_verbose(1,"RN-EMS: SWMGNT:ACTIVE  Sending event notification for '/o-ran-software-management:activation-event'...\n");
    rc = sr_event_notif_send(session, "/o-ran-software-management:activation-event", notif, current_num_of_values_notif);
    if (SR_ERR_NOT_FOUND == rc) {
        log_error("RN-EMS: SWMGNT:ACTIVE No application subscribed for '/o-ran-software-management:activation-event', skipping.\n");
        rc = SR_ERR_OK;
    }
    sr_free_values(notif, current_num_of_values_notif);

    return NULL;
}

#if 0
static int
sw_download_rpc_cb(const char *xpath, const sr_val_t *input, const size_t input_cnt,
       sr_val_t **output, size_t *output_cnt, void *private_ctx)
#endif

static int
sw_download_rpc_cb(sr_session_ctx_t *session, const char *xpath, const sr_val_t *input, const size_t input_cnt, sr_event_t event, uint32_t request_id,sr_val_t **output, size_t *output_cnt,void *private_ctx)

{
    int rc = SR_ERR_OK;
    char filePath[1024] = { '\0' };

    log_add_verbose(1,"RN-EMS: SWMGNT:DOWNLOAD ====   PREPARING DOWNLOAD RESP \n");
    /**
     * Here you would actually run the operation against the provided input values
     * and obtained the output values.
     */

      // strcpy(filePath, input[0].data.string_val);
      log_add_verbose(1,"RN-EMS: SWMGNT:DOWNLOAD : Initiate RPC RESP   \n");

       *output_cnt = 1;
      /* allocate output values */
      rc = sr_new_values(*output_cnt, output);
      if (SR_ERR_OK != rc) {
           return  SR_ERR_OK;
       }

      rc = sr_val_set_xpath(output[0], "/o-ran-software-management:software-download/status");
       if (SR_ERR_OK != rc) {
           return SR_ERR_OK;
       }
       sr_val_build_str_data(output[0], SR_ENUM_T, "%s", "STARTED");

       log_add_verbose(1,"RN-EMS: SWMGNT:DOWNLOAD :   SENDING RPC NOTIFICATIONS RESP: \n");
       //sw_download_rpc_notification_send(session, filePath );
       /**
       * Do not deallocate input values!
       * They will get freed automatically by sysrepo.
       */

       char* psce = ( dnload_status ) ? "SUCCESSFULL SCENARIO" : "FAILURE SCENARIO" ; 
       log_add_verbose(1," =======  RN-EMS:SWMGNT:DOWNLOAD : [%s]  =========: \n",psce);

       log_add_verbose(1,"RN-EMS: SWMGNT:DOWNLOAD :   SENDING VES EVENT: STARTED: \n");
       sw_download_ves_notification_send(session, filePath, "SUCCESS", "STARTED");
       log_add_verbose(1,"RN-EMS:SWMGNT:DOWNLOAD : ==========================================================: \n");
       sleep(10);

       if ( dnload_status ) {
           log_add_verbose(1,"RN-EMS: SWMGNT:DOWNLOAD :   SENDING VES EVENT: COMPLETED: SUCCESS SCENARIO \n");
           sw_download_ves_notification_send(session, filePath, "SUCCESS", "COMPLETED");

       }
       else {
           log_add_verbose(1,"RN-EMS: SWMGNT:DOWNLOAD :   SENDING VES EVENT: COMPLETED: SUCCESS SCENARIO \n");
           sw_download_ves_notification_send(session, filePath, "FAILURE", "COMPLETED");
        }


    return SR_ERR_OK;
}

static int
sw_install_rpc_cb(sr_session_ctx_t *session, const char *xpath, const sr_val_t *input, const size_t input_cnt, sr_event_t event, uint32_t request_id,sr_val_t **output, size_t *output_cnt,void *private_ctx)
{
    int rc = SR_ERR_OK;
    char slot_name[16] = { '\0' };
    /**
     * Here you would actually run the operation against the provided input values
     * and obtained the output values.
     */
     log_add_verbose(1,"RN-EMS: SWMGNT:INSTALL :   PREPARING RPC NOTIFICATIONS RESP: \n");

      *output_cnt = 1;
      /* allocate output values */
      rc = sr_new_values(*output_cnt, output);
      if (SR_ERR_OK != rc) {
           return  SR_ERR_OK;
       }

      rc = sr_val_set_xpath(output[0], "/o-ran-software-management:software-install/status");
       if (SR_ERR_OK != rc) {
           return SR_ERR_OK;
       }
       sr_val_build_str_data(output[0], SR_ENUM_T, "%s", "STARTED");

       log_add_verbose(1,"RN-EMS: SWMGNT:INSTALL :   SENDING RPC NOTIFICATIONS RESP: \n");
       /**
        * Do not deallocate input values!
        * They will get freed automatically by sysrepo.
        */
       if ( dnload_status ) {

            char* psce = ( install_status ) ? "SUCCESSFULL SCENARIO" : "FAILURE SCENARIO" ; 
            log_add_verbose(1," =======  RN-EMS:SWMGNT:INSTALL : [%s]  =========: \n",psce);

            log_add_verbose(1,"RN-EMS: SWMGNT:INSTALL :   SENDING VES EVENT: STARTED: \n");
            sw_install_ves_notification_send(session, slot_name, "SUCCESS", "STARTED");

            log_add_verbose(1,"RN-EMS:SWMGNT:INSTALL : ==========================================================: \n");

            sleep(10);

	    if( install_status ) {
               log_add_verbose(1,"RN-EMS: SWMGNT:INSTALL :   SENDING VES EVENT: COMPLETED: SUCCESSFULL SCENARIO \n");
               sw_install_ves_notification_send(session, slot_name, "SUCCESS", "COMPLETED");
	     }
	     else {
               log_add_verbose(1,"RN-EMS: SWMGNT:INSTALL :   SENDING VES EVENT: COMPLETED: : FAILURE SCENARIO \n");
               sw_install_ves_notification_send(session, slot_name, "FAILURE", "COMPLETED");
	     }

       }
       else {
            log_add_verbose(1," =======  RN-EMS:SWMGNT:DOWNLOAD:FAILURE SCENARIO  =========: Hence Wont be sending Install Event: \n");
        }

        return rc;
}


static int
sw_activate_rpc_cb(sr_session_ctx_t *session, const char *xpath, const sr_val_t *input, const size_t input_cnt, sr_event_t event, uint32_t request_id,sr_val_t **output, size_t *output_cnt,void *private_ctx)
{
    int rc = SR_ERR_OK;
    char slot_name[16] = { '\0' };

    /**
     * Here you would actually run the operation against the provided input values
     * and obtained the output values.
     */
     log_add_verbose(1,"RN-EMS: SWMGNT:ACTIVATE :   SENDING RPC NOTIFICATIONS RESP: \n");

      *output_cnt = 1;
      /* allocate output values */
      rc = sr_new_values(*output_cnt, output);
      if (SR_ERR_OK != rc) {
           return  SR_ERR_OK;
       }

      rc = sr_val_set_xpath(output[0], "/o-ran-software-management:software-activate/status");
       if (SR_ERR_OK != rc) {
           return SR_ERR_OK;
       }
       sr_val_build_str_data(output[0], SR_ENUM_T, "%s", "STARTED");

       char* psce = ( active_status ) ? "SUCCESSFULL SCENARIO" : "FAILURE SCENARIO" ; 
       log_add_verbose(1," =======  RN-EMS:SWMGNT:ACTIVATE : [%s]  =========: \n",psce);

    /**
     * Do not deallocate input values!
     * They will get freed automatically by sysrepo.
     */
     log_add_verbose(1,"RN-EMS: SWMGNT:ACTIVATE :   SENDING VES EVENT: STARTED: \n");
     sw_activate_ves_notification_send(session, slot_name, "SUCCESS", "STARTED");
     log_add_verbose(1,"RN-EMS:SWMGNT:ACTIVATE : ==========================================================: \n");
     sleep(10);

     if ( active_status ) {
         log_add_verbose(1,"RN-EMS: SWMGNT:ACTIVATE :   SENDING VES EVENT: COMPLETED: SUCCESSFULL SCENARIO \n");
         sw_activate_ves_notification_send(session, slot_name, "SUCCESS", "COMPLETED");
      }
     else {
         log_add_verbose(1,"RN-EMS: SWMGNT:ACTIVATE :   SENDING VES EVENT: COMPLETED: FAILURE SCENARIO \n");
         sw_activate_ves_notification_send(session, slot_name, "FAILURE", "COMPLETED");
      }


    return rc;
}


static int
rpc_handler()
{

    sr_conn_ctx_t *connection = NULL;
    sr_session_ctx_t *session = NULL;
    sr_subscription_ctx_t *subscription = NULL;
    const struct ly_ctx *ctx = NULL;
    int rc = SR_ERR_OK;
    
   log_add_verbose(1, " RN-EMS:Thread : sw_mgnt_notify_thread_routine.. Subscribe for RPC-Hanlders  ");
    /* connect to sysrepo */
    rc = sr_connect(0, &connection);
    if (SR_ERR_OK != rc) {
        log_error("Rn-EMS: Error by sr_connect: %s\n", sr_strerror(rc));
	return -1;
    }

    ctx = sr_get_context(connection);
    /* start session */
    rc = sr_session_start(connection, SR_DS_RUNNING,  &session);
    if (SR_ERR_OK != rc) {
        log_error("Rn-EMS: Error by sr_session_start: %s\n", sr_strerror(rc));
	return -1;
    }


   log_add_verbose(1, " RN-EMS:Thread : sw_mgnt_notify_thread_routine.. Subscribe for RPC-Hanlders:Download  ");
    /* subscribe for handling software-download RPC */
    rc = sr_rpc_subscribe(session, "/o-ran-software-management:software-download", sw_download_rpc_cb, 0,0, SR_SUBSCR_DEFAULT, &subscription);
    if (SR_ERR_OK != rc) {
        log_error("Rn-EMS: SWMGNT:RPC-SUBSCRIPTION: DOWNLOAD Error by sr_rpc_subscribe: %s\n", sr_strerror(rc));
	return -1;
       }

   log_add_verbose(1, " RN-EMS:Thread : sw_mgnt_notify_thread_routine.. Subscribe for RPC-Hanlders:Install  ");
    /* subscribe for handling software-install RPC */
    rc = sr_rpc_subscribe(session, "/o-ran-software-management:software-install", sw_install_rpc_cb, 0,0, SR_SUBSCR_DEFAULT, &subscription);
    if (SR_ERR_OK != rc) {
        log_error("RN-EMS: SWMGNT:RPC-SUBSCRIPTION: INSTALL Error by sr_rpc_subscribe: %s\n", sr_strerror(rc));
	return -1;
     }

   log_add_verbose(1, " RN-EMS:Thread : sw_mgnt_notify_thread_routine.. Subscribe for RPC-Hanlders:Activate  ");
        /* subscribe for handling software-activate RPC */
    rc = sr_rpc_subscribe(session, "/o-ran-software-management:software-activate", sw_activate_rpc_cb, 0,0, SR_SUBSCR_DEFAULT, &subscription);
    if (SR_ERR_OK != rc) {
        log_error("Rn-EMS: SWMGNT:RPC-SUBSCRIPTION: ACTIVE  Error by sr_rpc_subscribe: %s\n", sr_strerror(rc));
	return -1;
    }
    log_add_verbose(1, "\n\n ========== RN-EMS: SWMGNT:  SUBSCRIBED FOR SWManagement rpc: Succesfull ==========\n\n");

    return 0;

}

#if 0
int
main(int argc, char **argv)
{
    sr_conn_ctx_t *connection = NULL;
    sr_session_ctx_t *session = NULL;
    int rc = SR_ERR_OK;

    setbuf(stdout, NULL);

    if (pthread_mutex_init(&lock, NULL) != 0)
	{
		printf("Mutex init failed...\n");
		goto cleanup;
	}

    /* connect to sysrepo */
    rc = sr_connect("sw_management_rpc_app", SR_CONN_DEFAULT, &connection);
    if (SR_ERR_OK != rc) {
        fprintf(stderr, "Error by sr_connect: %s\n", sr_strerror(rc));
        goto cleanup;
    }

    /* start session */
    rc = sr_session_start(connection, SR_DS_RUNNING, SR_SESS_DEFAULT, &session);
    if (SR_ERR_OK != rc) {
        fprintf(stderr, "Error by sr_session_start: %s\n", sr_strerror(rc));
        goto cleanup;
    }

    /* run as a RPC handler */
    printf("This application will be an RPC handler for 'software-download' operation of 'o-ran-software-management'.\n");
    rc = rpc_handler(session);

cleanup:
    if (NULL != session) {
        sr_session_stop(session);
    }
    if (NULL != connection) {
        sr_disconnect(connection);
    }
    return rc;
}

#endif


void* sw_mgnt_notify_thread_routine(void *arg)
{

   log_add_verbose(1, " RN-EMS:Thread : sw_mgnt_notify_thread_routine.. >> Lets Wait for 30 secodnds ");
   // read the ENV variables
   sleep(60);
   sched_yield();

   char hname[256] = { '\0' };
   strcpy( hname, framework_environment.settings.hostname);
   if( strlen(hname) ){
       // Hardcode the Hostane
       strcpy(hname, "Tejas-Gnb-12033");
     }


   log_add_verbose(1, " ********  ******************************   *********************   \n");
   char* pSwF = getenv(ENV_NTS_SW_MGNT_FEATURE) ? strdup(getenv(ENV_NTS_SW_MGNT_FEATURE)) : strdup("yes");
   if ( ( strcmp(pSwF, "yes") == 0 )  || ( strcmp(pSwF, "YES") == 0 )   ) {

        log_error( " ********  RN-EMS: SWMGNT: FEATURE ENABLED: INITIATING RPC: SUBSCRIPTION   *********************   \n");
        log_add_verbose(1, " ********  RN-EMS: SWMGNT: FEATURE ENABLED: INITIATING RPC: SUBSCRIPTION   *********************   \n");
	swmgnt_status = true;

        int ret = rpc_handler();
        if ( ret ) {
             log_error( " ********  RN-EMS: SWMGNT: RPC SUBSCRIPTION FAILED   *********************   \n");
             log_add_verbose(1, " ********  RN-EMS: SWMGNT: RPC SUBSCRIPTION FAILED   *********************   \n");
	     pthread_exit();

          }

     }
   else {

         log_error( " ********  RN-EMS: SWMGNT: FEATURE DISABLED: NOTHING TODO:   *********************   \n");
         log_add_verbose(1, " ********  RN-EMS: SWMGNT: FEATURE DISABLED: NOTHING TO DO   *********************   \n");
	 swmgnt_status =  false;

     }

     log_add_verbose(1, " ********  ******************************   *********************   \n");

    char* pDWFeat = getenv(ENV_NTS_SW_DWLOAD_STATUS_EVNT) ? strdup(getenv(ENV_NTS_SW_DWLOAD_STATUS_EVNT)): strdup("pos");
    char* pInsFeat = getenv(ENV_NTS_SW_INSTALL_STATUS_EVNT) ? strdup(getenv(ENV_NTS_SW_INSTALL_STATUS_EVNT)): strdup("pos");
    char* pActFeat = getenv(ENV_NTS_SW_ACTIVE_STATUS_EVNT) ? strdup(getenv(ENV_NTS_SW_ACTIVE_STATUS_EVNT)): strdup("pos");

    if ( ( strcmp(pDWFeat, "pos") == 0 )  || ( strcmp(pDWFeat, "POS") == 0 )   ) {
         dnload_status = true;                     
      }
     else if ( ( strcmp(pDWFeat, "NEG") == 0 )  || ( strcmp(pDWFeat, "neg") == 0 )   ) {
         dnload_status = false;                     
      }

     if ( ( strcmp(pInsFeat, "pos") == 0 )  || ( strcmp(pInsFeat, "POS") == 0 )   ) {
         install_status = true;                     
      }
     else if ( ( strcmp(pInsFeat, "NEG") == 0 )  || ( strcmp(pInsFeat, "neg") == 0 )   ) {
         install_status = false;                     
      }

     if ( ( strcmp(pActFeat, "pos") == 0 )  || ( strcmp(pActFeat, "POS") == 0 )   ) {
             active_status = true;                     
       }
     else if ( ( strcmp(pActFeat, "NEG") == 0 )  || ( strcmp(pActFeat, "neg") == 0 )   ) {
            active_status = false;                     
      }



   log_add_verbose(1, " ********  RN-EMS: SWMGNT: RPC SUBSCRIPTION SUCCESSFULL   *********************   \n");
   while ( 1 ) {

       log_add_verbose(1, " ## SWMGNT:  ********  ******************************  STATUS  *********************   \n");
       if ( swmgnt_status ) {
                  log_add_verbose(1, " ENV: RN-EMS:Thread : SWMGNT: Simulate DOWNLOAD_EVENT SUCCESS [%s]  Install Event [%s] Activate Event[%s]  ", pDWFeat,pInsFeat,pActFeat);
                  log_add_verbose(1, " *****  RN-EMS:Thread : SWMGNT: Waiting For  Call Back:  ****   ");
         }
       else {

         log_error( " ********  RN-EMS: SWMGNT: FEATURE DISABLED: NOTHING TODO:   *********************   \n");
         log_add_verbose(1, " ********  RN-EMS: SWMGNT: FEATURE DISABLED: NOTHING TO DO   *********************   \n");

       }
       log_add_verbose(1, " ## SWMGNT:  ********  ****************************** STATUS   *********************   \n");



     sleep( 600 );

   }
}
