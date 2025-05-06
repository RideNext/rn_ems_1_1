/*************************************************************************
*
* Copyright (C) 2024 RideNext Software Solutions. Pvt Ltd.  All rights reserved
* -----------------------------------------------------------------------------
* Copyright 2020 highstreet technologies GmbH and others
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
***************************************************************************/

#define _GNU_SOURCE

#include "ves_file_ready.h"
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

#include <sysrepo.h>
#include <sysrepo/values.h>

#include "core/framework.h"
#include "core/session.h"
#include "core/xpath.h"


static int ves_file_ready_invoke_pm_cb(sr_session_ctx_t *session, const char *path, const sr_val_t *input, const size_t input_cnt, sr_event_t event, uint32_t request_id, sr_val_t **output, size_t *output_cnt, void *private_data);
static int ves_file_ready_send_message(sr_session_ctx_t *session, const char *file_location, int port);
static cJSON* ves_create_file_ready_fields(const char* file_location);

static sr_subscription_ctx_t *ves_file_ready_subscription = 0;
extern int errno;

//void* ves_notify_file_thread_routine(void *arg);

int ves_file_ready_feature_get_status(void) {
    return (ves_file_ready_subscription != 0);
}




int ves_file_ready_feature_start(sr_session_ctx_t *current_session) {
    assert(current_session);
    assert_session();
    log_error("ves_file_ready_feature_start \n");

    if(ves_file_ready_subscription == 0) {
        int rc = sr_rpc_subscribe(current_session, NTS_NF_RPC_FILE_READY_SCHEMA_XPATH, ves_file_ready_invoke_pm_cb, 0, 0, SR_SUBSCR_CTX_REUSE, &ves_file_ready_subscription);
        if(rc != SR_ERR_OK) {
            log_error("error from sr_rpc_subscribe: %s\n", sr_strerror(rc));
            return NTS_ERR_FAILED;
        }

        sftp_daemon_init();
        vsftp_daemon_init();
    }

    return NTS_ERR_OK;
}

int ves_file_ready_feature_stop(void) {
    assert_session();

    if(ves_file_ready_subscription) {
        int rc = sr_unsubscribe(ves_file_ready_subscription);
        if(rc != SR_ERR_OK) {
            log_error("error from sr_rpc_subscribe: %s\n", sr_strerror(rc));
            return NTS_ERR_FAILED;
        }

        vsftp_daemon_deinit();
        sftp_daemon_deinit();
        ves_file_ready_subscription = 0;
    }

    return NTS_ERR_OK;
}

static int ves_file_ready_invoke_pm_cb(sr_session_ctx_t *session, const char *path, const sr_val_t *input, const size_t input_cnt, sr_event_t event, uint32_t request_id, sr_val_t **output, size_t *output_cnt, void *private_data) {
    int ssh_base_port = 0;
    int tls_base_port = 0;
    sr_session_ctx_t *current_session = 0;
    log_error("ves_file_ready_invoke_pm_cb \n");

    int rc = sr_session_start(session_connection, SR_DS_RUNNING, &current_session);
    if(rc != SR_ERR_OK) {
        log_error("could not start sysrepo session\n");
        return NTS_ERR_FAILED;
    }

    nts_mount_point_addressing_method_t mp = nts_mount_point_addressing_method_get(current_session);
    if(mp == UNKNOWN_MAPPING) {
        log_error("mount-point-addressing-method failed\n");
        sr_session_stop(current_session);
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

    int failed = 0;

    if((framework_environment.settings.ssh_connections + framework_environment.settings.tls_connections) > 1) {
        for(int port = ssh_base_port; port < ssh_base_port + framework_environment.settings.ssh_connections; port++) {
            int rc = ves_file_ready_send_message(current_session, input[0].data.string_val, port);
            if(rc != NTS_ERR_OK) {
                log_error("ves_file_ready_send_message failed\n");
                failed++;
            }
        }

        for(int port = tls_base_port; port < tls_base_port + framework_environment.settings.tls_connections; port++) {
            int rc = ves_file_ready_send_message(current_session, input[0].data.string_val, port);
            if(rc != NTS_ERR_OK) {
                log_error("ves_file_ready_send_message failed\n");
                failed++;
            }
        }
    }
    else {
        int rc = ves_file_ready_send_message(current_session, input[0].data.string_val, 0);
        if(rc != NTS_ERR_OK) {
            log_error("ves_file_ready_send_message failed\n");
            failed++;
        }
    }

    rc = sr_session_stop(current_session);
    if(rc != SR_ERR_OK) {
        log_error("could not stop sysrepo session\n");
        return NTS_ERR_FAILED;
    }

    *output_cnt = 1;
    rc = sr_new_values(*output_cnt, output);
    if(SR_ERR_OK != rc) {
        return rc;
    }

    rc = sr_val_set_xpath(output[0], NTS_NF_RPC_FILE_READY_SCHEMA_XPATH"/status");
    if(SR_ERR_OK != rc) {
        return rc;
    }
    
    if(failed != 0) {
        rc = sr_val_build_str_data(output[0], SR_ENUM_T, "%s", "ERROR");
    }
    else {
        rc = sr_val_build_str_data(output[0], SR_ENUM_T, "%s", "SUCCESS");
    }

    return rc;
}

static int ves_file_ready_send_message(sr_session_ctx_t *session, const char *file_location, int port) {
    assert(session);
    assert(file_location);

    int rc;
    static int sequence_number = 0;

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

    cJSON *common_event_header = ves_create_common_event_header("notification", "Notification-gnb_Nokia-FileReady", framework_environment.settings.hostname, port, "Normal", sequence_number++);
    if(common_event_header == 0) {
        log_error("could not create cJSON object\n");
        cJSON_Delete(post_data_json);
        return NTS_ERR_FAILED;
    }
    
    if(cJSON_AddItemToObject(event, "commonEventHeader", common_event_header) == 0) {
        log_error("cJSON_AddItemToObject failed\n");
        cJSON_Delete(post_data_json);
        return NTS_ERR_FAILED;
    }

    cJSON *file_ready_fields = ves_create_file_ready_fields(file_location);
    if(file_ready_fields == 0) {
        log_error("could not create cJSON object\n");
        cJSON_Delete(post_data_json);
        return NTS_ERR_FAILED;
    }
    
    if(cJSON_AddItemToObject(event, "notificationFields", file_ready_fields) == 0) {
        log_error("cJSON_AddItemToObject failed\n");
        cJSON_Delete(post_data_json);
        return NTS_ERR_FAILED;
    }

    char *post_data = cJSON_PrintUnformatted(post_data_json);
    cJSON_Delete(post_data_json);
    if(post_data == 0) {
        log_error("cJSON_PrintUnformatted failed\n");
        return NTS_ERR_FAILED;
    }


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

static cJSON* ves_create_file_ready_fields(const char* file_location) {
    assert(file_location);

    cJSON *file_ready_fields = cJSON_CreateObject();
    if(file_ready_fields == 0) {
        log_error("could not create JSON object\n");
        return 0;
    }

    if(cJSON_AddStringToObject(file_ready_fields, "changeIdentifier", "PM_MEAS_FILES") == 0) {
        log_error("cJSON_AddStringToObject failed\n");
        cJSON_Delete(file_ready_fields);
        return 0;
    }

    if(cJSON_AddStringToObject(file_ready_fields, "changeType", "FileReady") == 0) {
        log_error("cJSON_AddStringToObject failed\n");
        cJSON_Delete(file_ready_fields);
        return 0;
    }

    if(cJSON_AddStringToObject(file_ready_fields, "notificationFieldsVersion", "2.0") == 0) {
        log_error("cJSON_AddStringToObject failed\n");
        cJSON_Delete(file_ready_fields);
        return 0;
    }

    cJSON *array_of_named_hash_map = cJSON_CreateArray();
    if(array_of_named_hash_map == 0) {
        log_error("could not create JSON object\n");
        cJSON_Delete(file_ready_fields);
        return 0;
    }
    
    if(cJSON_AddItemToObject(file_ready_fields, "arrayOfNamedHashMap", array_of_named_hash_map) == 0) {
        log_error("cJSON_AddStringToObject failed\n");
        cJSON_Delete(file_ready_fields);
        return 0;
    }

    cJSON *additional_fields_entry = cJSON_CreateObject();
    if(additional_fields_entry == 0) {
        log_error("could not create JSON object\n");
        cJSON_Delete(file_ready_fields);
        return 0;
    }

    char *filename = strrchr(file_location, '/');

    if(filename == 0) {
        if(cJSON_AddStringToObject(additional_fields_entry, "name", "dummy_file.tar.gz") == 0) {
            log_error("cJSON_AddStringToObject failed\n");
            cJSON_Delete(file_ready_fields);
            return 0;
        }
    }
    else {
        if(cJSON_AddStringToObject(additional_fields_entry, "name", filename + 1) == 0) {
            log_error("cJSON_AddStringToObject failed\n");
            cJSON_Delete(file_ready_fields);
            return 0;
        }
    }

    cJSON *hash_map = cJSON_CreateObject();
    if(hash_map == 0) {
        log_error("could not create JSON object\n");
        cJSON_Delete(file_ready_fields);
        return 0;
    }
    
    if(cJSON_AddItemToObject(additional_fields_entry, "hashMap", hash_map) == 0) {
        log_error("cJSON_AddStringToObject failed\n");
        cJSON_Delete(file_ready_fields);
        return 0;
    }

    if(cJSON_AddStringToObject(hash_map, "location", file_location) == 0) {
        log_error("cJSON_AddStringToObject failed\n");
        cJSON_Delete(file_ready_fields);
        return 0;
    }

    if(cJSON_AddStringToObject(hash_map, "compression", "gzip") == 0) {
        log_error("cJSON_AddStringToObject failed\n");
        cJSON_Delete(file_ready_fields);
        return 0;
    }

    if(cJSON_AddStringToObject(hash_map, "fileFormatType", "org.3GPP.32.435#measCollec") == 0) {
        log_error("cJSON_AddStringToObject failed\n");
        cJSON_Delete(file_ready_fields);
        return 0;
    }

    if(cJSON_AddStringToObject(hash_map, "fileFormatVersion", "V5") == 0) {
        log_error("cJSON_AddStringToObject failed\n");
        cJSON_Delete(file_ready_fields);
        return 0;
    }

    if(cJSON_AddItemToArray(array_of_named_hash_map, additional_fields_entry) == 0) {
        log_error("cJSON_AddStringToObject failed\n");
        cJSON_Delete(file_ready_fields);
        return 0;
    }

    return file_ready_fields;
}


void generateFileName(const char *gNodeBId, char *fileName, size_t size) {
    // Get the current date and time
    time_t now = time(NULL);
    struct tm *t = localtime(&now);

    // Format the date as YYYYMMDD
    char date[9]; // YYYYMMDD format
    snprintf(date, sizeof(date), "%04d%02d%02d", t->tm_year + 1900, t->tm_mon + 1, t->tm_mday);

    // Format the time as HHMM
    char time1[6]; // HHMM format
    snprintf(time1, sizeof(time1), "%02d%02d", t->tm_hour, t->tm_min);

    // Define the timezone offset (for example, +0200)
    const char *timezoneOffset1 = "+0530";
    const char *timezoneOffset2 = "+0530";

    // Create the file name in the specified format
    snprintf(fileName, size, "A%s.%s%s-%s%s_%s", date, time1, timezoneOffset1, time1, timezoneOffset2, gNodeBId);
}


void* ves_notify_file_thread_routine(void *arg)
{
   log_add_verbose(1, " RN-EMS:Thread : ves_notify_file_thread.. >> Lets Wait for 30 secodnds ");
   // read the ENV variables
   sleep(60);
   sched_yield();

   char hname[256] = { '\0' };
   strcpy( hname, framework_environment.settings.hostname);
   if( strlen(hname) < 2 ){
       // Hardcode the Hostane
       strcpy(hname, "RN-DU-SIM-33");
       log_add_verbose(1, " RN-EMS:Thread : Changing HOSTNAME to Default Value [%s] ", hname);
     }

   char* pvesF = getenv(ENV_NTS_VES_FILE_NOTIFY_FEATURE) ? strdup(getenv(ENV_NTS_VES_FILE_NOTIFY_FEATURE)) : strdup("yes");
   char* pTime = getenv(ENV_NTS_VES_FILE_NOTIFY_DURATION) ? strdup(getenv(ENV_NTS_VES_FILE_NOTIFY_DURATION)): strdup("300");
   char* pFtpPath = getenv(ENV_NTS_VES_FTP_FILE_PATH) ? strdup(getenv(ENV_NTS_VES_FTP_FILE_PATH)): strdup("");

   if ( !pvesF ||  !pTime || !pFtpPath ) {

       log_add_verbose(1, " RN-EMS: Invalid ENV Varibale: ENV_NTS_VES_FILE_NOTIFY_FEATURE, ENV_NTS_VES_FILE_NOTIFY_DURATION:ENV_NTS_VES_FTP_FILE_PATH");
       log_add_verbose(1, " .............. RN-EMS: Invalid ENV Varibale: EXIT :( .............. ");
       log_error(" *****  RN-EMS: Invalid  ENV Varibale: ENV_NTS_VES_FILE_NOTIFY_FEATURE, ENV_NTS_VES_FILE_NOTIFY_DURATION:ENV_NTS_VES_FTP_FILE_PATH  *****");
       log_error( " .............. RN-EMS: Invalid ENV Varibale: EXIT :( .............. ");
       pthread_exit();

    }
    int tDuration = 0;
    char fet[8] = { '\0' };

    if(  pvesF ) {
       strcpy(fet, pvesF);
       log_add_verbose(1, " RN-EMS: is Feature Supported : ENV_NTS_VES_FILE_NOTIFY_FEATURE [ %s] ", fet);
     } 

    if( pTime ) {
         tDuration = atoi( pTime );
         log_add_verbose(1, "  RN-EMS: ENV Varibale:  ENV_NTS_VES_FILE_NOTIFY_DURATION [ %u ] ", tDuration);
       }

   if( !strcmp(fet, "no")  || !strcmp(fet, "NO") ) {

         log_add_verbose(1, " RN-EMS: ENV_NTS_VES_FILE_NOTIFY_FEATURE FEATURE NOT SUOOPRTED: [%s] ", fet);
         log_error( " .............. RN-EMS: FEATURE NOT ENABLED: EXIT :( .............. ");
         pthread_exit();
     }

    log_add_verbose(1, " RN-EMS: ENV_NTS_VES_FILE_NOTIFY_FEATURE Sends VES File Noti Event For every Duration: [%d]  Sec", tDuration);
    log_add_verbose(1, " RN-EMS: ENV_NTS_VES_FTP_FILE_PATH: FTP PATH  [%s]  ", pFtpPath);

    char* pDir = getenv(ENV_NTS_VES_FILE_DIR) ? strdup(getenv(ENV_NTS_VES_FILE_DIR)): strdup("/opt/dev/deploy/data/pmxml");
    if( !pDir ) {

         log_add_verbose(1, " RN-EMS: ENV_NTS_VES_FILE_DIR:  DIR is Not available");
         pthread_exit();
     }
     log_add_verbose(1, " RN-EMS: ENV_NTS_VES_FILE_DIR: [%s] Check ", pDir);

     char fullFileP[1024] = { '\0' };
     char fullP[1024] = { '\0' };

     char xmlfileName[256] = { '\0' };
     char tmpFileName[128] = { '\0' };
     char srcFile[256] = { '\0' };
     char dstFile[256] = { '\0' };


     struct dirent *pathDir = NULL;
     DIR* dir = opendir(pDir);
     if (dir) {
          /* Directory exists. */
	  strcpy(fullP, pDir);
          log_add_verbose(1, " RN-EMS: ENV_NTS_VES_FILE_DIR: [%s] Check For Performance Files \n", fullP);
          log_error(" RN-EMS: ENV_NTS_VES_FILE_DIR: [%s] Check For Performance Files \n", fullP);
	  
	   while ((pathDir = readdir(dir)) != NULL)
            {
		if (!strcmp (pathDir->d_name, "."))
                     continue;
                if (!strcmp (pathDir->d_name, ".."))
                    continue;

                log_add_verbose(1, "RN-EMS: ===  ENV_NTS_VES_FILE:[%s] ====  FOUND ==== in [%s] == \n ", pathDir->d_name,pDir);

                //Condition to check regular file.
		if ( strstr(pathDir->d_name, ".xml") ) {

		     /**
		      * Keep send in loop
		      * Same file with different names
		      * **/
		     strcpy(tmpFileName,pathDir->d_name);
                     log_add_verbose(1," RN-EMS:  ===  ENV_NTS_VES_FILE_DIR: [%s] Found File  \n ", tmpFileName);
		     break;
	          }

	    }
          closedir(dir);
       } 
       else if (ENOENT == errno) {
            /* Directory does not exist. */
            log_error(" Rn-EMS: ENV_NTS_VES_FILE_DIR: [%s]  Not Exist: \n ", pDir);
            pthread_exit();
        } 
        else {
            /* opendir() failed for some other reason. */
            /* Directory does not exist. */
            log_error(" RN-EMS: ENV_NTS_VES_FILE_DIR: [%s]  errno[%d] \n ", pDir,errno);
            pthread_exit();
        }

        log_add_verbose(1, " RN-EMS: **** ENV_NTS_VES_FILE_DIR: [%s] : FileName [%s] Duration[%d]  \n", pDir,tmpFileName,tDuration);

	/**
	 * If u dont any PM files at all
	 * There is no point in proceeding
	 * exit
	 * **/
	if( strlen(tmpFileName) < 3 ) {

            log_error(" RN-EMS: ENV_NTS_VES_FILE_DIR: [%s]  Invalid XML FILE NAME[%s] \n ", pDir,tmpFileName);
            log_add_verbose(1, " ***** RN-EMS: **** ENV_NTS_VES_FILE_DIR: [%s] : FileName [%s] ***** INVALID *****   \n", pDir,tmpFileName);
            pthread_exit();

	  }


	sr_conn_ctx_t *connection = NULL;
        sr_session_ctx_t *session = NULL;
        int rc = SR_ERR_OK;
        struct lyd_node *tree = NULL, *notif;
        const struct ly_ctx *ctx = NULL;
        const char *path = NTS_NF_RPC_FILE_READY_SCHEMA_XPATH;
	const char *node_path = NTS_NF_RPC_FILE_READY_SCHEMA_XPATH"/file-location";  
	char* node_val = NULL;
	sr_val_t input, *output;
	size_t  output_count = 0;

	/* turn logging on */
        sr_log_stderr(SR_LL_WRN);

        /* connect to sysrepo */
        rc = sr_connect(0, &connection);
        if (rc != SR_ERR_OK) {
            log_error(" *** RN-EMS: ENV_NTS_VES_FILE_DIR: ERROR: SYSREPO CONNECTION ERROR *** \n");
            pthread_exit();
         }
         ctx = sr_get_context(connection);

         /* start session */
         rc = sr_session_start(connection, SR_DS_RUNNING, &session);
         if (rc != SR_ERR_OK) {

            log_error(" *** RN-EMS: ENV_NTS_VES_FILE_DIR: ERROR: SYSREPO SESSION  ERROR *** \n");
            pthread_exit();
          }

         log_add_verbose(1, " *** RN-EMS: ENV_NTS_VES_FILE_DIR: PATH[%s] \n",path);
         log_add_verbose(1, " *** RN-EMS: ENV_NTS_VES_FILE_DIR: NODE PATH[%s] \n",node_path);
         

	 /* create the notification */
	 notif = lyd_new_path(NULL, ctx, node_path, NULL, 0, 0);
         if ( !notif ) {
            log_error("RN-EMS: Creating notification \"%s\" \n", path);
            sr_disconnect(connection);
            pthread_exit();
          }
	 
        log_add_verbose(1, " RN-EMS: CREATE NEW PM FILES IN DIR [%s] \n", fullP);

        uid_t new_owner = 1000;
        gid_t new_group = 1000;

        while( tDuration ) {

	   xmlfileName[0] = '\0';
           fullFileP[0] = '\0';
	   char cmd[512] = { '\0' };

	   generateFileName(hname, xmlfileName, sizeof(xmlfileName));
           log_add_verbose(1, " RN-EMS: NEW PM FILE NAME [%s] CURR File[%s] \n", xmlfileName,tmpFileName);
	   /**
	     * Now Rename This File to different File Name
	     * As per our requirement
           ***/
	   sprintf(srcFile,"%s/%s",fullP,tmpFileName);
	   sprintf(dstFile,"%s/%s.xml",fullP,xmlfileName);
	   snprintf(cmd, sizeof(cmd), "cp  %s  %s", srcFile, dstFile);
           system(cmd);
           log_add_verbose(1,"RN-EMS: Creating a New File > \"%s\" ****  From File[%s]  \n", dstFile,srcFile);

	   if (chown(dstFile, new_owner, new_group) == -1) {
               log_error("RN-EMS: CANNOT CHANGE OWNERSHIP OF FILE: File > \"%s\" \n", dstFile);
	       cmd[0] = '\0';
	       snprintf(cmd, sizeof(cmd), "chmod 766 %s", dstFile);
               system(cmd);
               log_add_verbose(1,"RN-EMS: Changing Permsiion of File > \"%s\" \n", dstFile);
	    }
	   else{

               log_add_verbose(1,"RN-EMS: Changed OWENERSHIP  of File > \"%s\" \n", dstFile);
	   }




	   sprintf(fullFileP,"%s%s.xml", pFtpPath,xmlfileName);

           log_add_verbose(1,"RN-EMS: SENDING  NOTIFICATION ========== FOR NEW FILE PATH > \"%s\" ****  \n", fullFileP);

	   input.xpath = node_path;
           input.type = SR_STRING_T;
           input.dflt = 0;
	   node_val = fullFileP; 
           input.data.string_val = node_val;

	    rc = sr_rpc_send(session, NTS_NF_RPC_FILE_READY_SCHEMA_XPATH, &input, 1, 0, &output, &output_count);
            if (rc != SR_ERR_OK) {
                  log_error("######  RN-EMS: SEND NOTIFICATION FAILURE:  \"%s\" failed #### \n", node_path);
                  log_error("#####   RN-EMS: SEND NOTIFICATION FAILURE: FILE  \"%s\" failed #### \n", node_val);
                   //lyd_free_withsiblings(notif);
                   //sr_disconnect(connection);
                   //pthread_exit();
             }
             log_add_verbose(1," **** RN-EMS: SEND NOTIFICATION SUCCESS:  \"%s\" ****  \"%s\"  \n", node_path,node_val);

              log_add_verbose(1,"RN-EMS: ========   WAIT  TIME ========== > WAIT FOR SECONDS [%d]  \n", tDuration);
              sleep( tDuration );
         }

}

