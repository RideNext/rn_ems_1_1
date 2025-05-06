#!/bin/bash
###############################################################################
#
# Copyright (C) 2024 RideNext Software Solutions. Pvt Ltd.  All rights reserved"
#
################################################################################

#################################################################
### this script  used for starting and stopping the 
##  ems .software
##   options for using
##  start/stop/status/configure  all/smo/platform
#######################################################################

REQ_ARGS=2
REQ_ARGS1=3
action=${1,..}
srvcname=${2,..}
passwd=iltwat123%23
BRING_UP_WAIT=30  # in seconds
sdnr_img_name=""
sdnc_img_name=""
ves_img_name=""
perf_img_name=""
dfc_img_name=""
topic=""




declare -a oam=("sdnc-web" "sdnr" "ves-collector" "perf-monitor"  "dfc")

declare -a platform=("identity" "identitydb" "persistence"  "zookeeper"  "kafka"  "onap-dmaap"  "minio-server" )

CURR_WRK_DIR=${PWD}

function Help()
{
  echo " #===========================================================================#"
  echo " #                                                                           #"
  echo " # ------------------------------------------------------------------------- #"
  echo " #                                                                           #"
  echo " # $0: Number of parameters required for Execution  2:   #"
  echo " #   1st Param   : start / stop / restart  / status / configure              #"
  echo " #                 start will start docker services                          #"
  echo " #                 restart option , will stop and   start the services       #"
  echo " #                 stop option, stops the docker services                    #"
  echo " #                 configure shall be executed only once to configure        #"
  echo " #                 platform. Please use platform as 2nd Option               #"
  echo " #                                                                           #"
  echo " #                                                                           #"
  echo " #   2nd param   : all/oam/platform                                          #"
  echo " #                 all : option both oam and platform will be stopped        #"
  echo " #                       or started based on option 1                        #"
  echo " #                 oam : only oam applications would be stopped/started      #"
  echo " #                 platform: only platform app would be started/stopped      #"
  echo " #                                                                           #"
  echo " # ------------------------------------------------------------------------- #"
  echo " #                                                                           #"
  echo " #  3rd Param ( Passwd ): Optional: The passwd used for updating sftp        #"
  echo " #                        config path CONFIG_FILE_PATH                       #"
  echo " #                                                                           #"
  echo " #===========================================================================#"

}


######
## Check, this script has to be executed from exec DIR
## If not exit with failure
#####

isEx=$(basename $CURR_WRK_DIR)
if [[ $isEx != "exec" ]];then
   echo " ## "
   echo " $0 To be executed from exec DIRECTORY"
   echo " Currently $0 executing from $$CURR_WRK_DIR) : $isEx "
   exit 1
   echo " ## "
else
   echo " ## "
   echo " WRONG DIR EXECUTION PATH: $CURR_WRK_DIR : $0 executed from $isExec "
   echo " Executing $0 from $CURR_WRK_DIR "
   echo " ## "
fi




#######################################################################################
##
## read the container logs and check for predefined string.
##  Its iterates for 9 :
##  And each iteartion wait for 10 Seconds
##  if  procedure couldn't find the predefined strings from logs
##  Assumes that container brought up Failed
######################################################################################

declare -A searchStr=(["sdnr"]="Everything OK in Certificate Installation"
                      ["sdnc-web"]="Express Server started on 3005"
                      ["perf-monitor"]="Executing WRDir"
                      ["ves-collector"]="heartbeat has active stream: ves-heartbeat"
                     )


function updateConfigPath()
{
   #user_name=${USER}
   user_name=$(whoami)
   sdnr_str=$(grep "^SDNR_IP_ADDRESS"  ${CURR_WRK_DIR}/smo/oam/.env)
   sdnripval=$(cut -d "=" -f2 <<< "${sdnr_str}")
   echo " USERNAME: $user_name IP: $sdnripval : CWRK_DIR=${CURR_WRK_DIR} "
   config_path="sftp://${user_name}:${passwd}@${sdnripval}:22/${CURR_WRK_DIR}/smo/platform/persistence/config-files/"
   echo "Updated File Path: ${config_path}      "
   CONFIG_FILE_PATH=${config_path}
   export CONFIG_FILE_PATH=${config_path}
   echo "## ENV VARIBALE CONFIG_FILE_PATH: ${CONFIG_FILE_PATH}      "
   echo " Replace ENV Varibale in SMO/OAM"
   sed -i "s|^CONFIG_FILE_PATH=.*|CONFIG_FILE_PATH=${CONFIG_FILE_PATH}|g" "${CURR_WRK_DIR}/smo/oam/.env"
   #sed -i "s%^CONFIG_FILE_PATH=.*%CONFIG_FILE_PATH=${CONFIG_FILE_PATH}%g"  "${CURR_WRK_DIR}/smo/oam/.env"
   echo " "

}



if [[ ${action} == "start" || ${action} == "stop" || ${action} == "restart" || ${action} == "status"  || ${action} == "configure" ]];then
    #echo " User Has Requested for ACTION: ${action} Services "
    echo " "
else
    echo " Valid 1st Param options are: eitehr \"stop\" or \"start\" \"restart\" \"status\" \"permission\"  "
    echo " Wrong Options: $0"
    Help
    exit 0
fi


if [[ ${srvcname} == "all" || ${srvcname} == "oam"  || ${srvcname} == "platform"  ]];then
      echo " User Has Requested ACTION::  ${action} Services::  ${srvcname}  "
      echo " "
else
    echo " Valid 2nd  Param options are: eitehr \"all\" or \"oam\" or \"platform\"  "
    echo " Wrong Options: $0"
    Help
    exit 0
fi


if [[ $# -eq ${REQ_ARGS} || $# -eq ${REQ_ARGS1} ]]; then
      echo " .................................. ..."
      echo " $0 Initiated With Args::  "
      echo "          ACTION: $action"
      echo "          SERVICES: $srvcname" 
      echo " .................................. ..."
      if [[ $#  -eq ${REQ_ARGS1} ]];then
	 sed -i "s/^passwd=.*/passwd=${3}/g" $0
         passwd=${3}
	 echo " # ============================================================== #"
         echo " #          PASSWD: $passwd Modfied.                              #"
         echo " #          Will also update / Modify the ENV : CONFIG_FILE_PATH  #"
	 echo " # ============================================================== #"
	 updateConfigPath
      fi
else
    echo " Wrong Options: $0"
    Help
    exit 0
fi


function replaceIPEnv()
{
   IPVAL_STR=$(grep "^SDNR_IP_ADDRESS"  ./smo/oam/.env)
   IPVAL=$(cut -d "=" -f2 <<< "${IPVAL_STR}")

   ##########################
   ## Expected this procedure called always from exec dir
   ## so that we can look for oauth-provider.config.json
   ##  ./smo/oam/sdnr/oauth-provider.config.json
   ###########################

   if [[ -f "./smo/oam/sdnr/oauth-provider.config.json" ]];then

pushd "./smo/oam/sdnr" > /dev/null 
   
   puburl=$(grep  \"publicUrl\":  ./oauth-provider.config.json)
   purl=$(grep  \"url\":  ./oauth-provider.config.json)
   iurl=$(grep  \"internalUrl\":  ./oauth-provider.config.json)

 #  echo " ## "
 #  echo " ##  EXISTING CONFIG VALUES IN: oauth-provider.config.json "
 #  echo " #            publicUrl:    $puburl "
 #  echo " #            url:          $purl "
 #  echo " #            internalUrl:  $iurl "
 #  echo " ## "
 #  echo " "

    if [[ ${puburl}  =~  ${IPVAL} ]];then
       : #  echo " # ${puburl} : Contains : ${IPVAL}: Not Required any Change "
    else
      # echo " # ${puburl} : DOESN'T Contains : ${IPVAL}: Required Modifications: "
       sed -i "s/\"publicUrl\":.*/\"publicUrl\": \"https:\/\/${IPVAL}:8453\",/g"   "./oauth-provider.config.json"
    fi

   echo " "
    if [[ ${purl}  =~  ${IPVAL} ]];then
      : # echo " # ${purl} : Contains : ${IPVAL}: Not Required any Change "
    else
      # echo " # ${purl} : DOESN'T Contains : ${IPVAL}: Required Modifications: "
       sed -i "s/\"url\":.*/\"url\": \"https:\/\/${IPVAL}:8463\",/g"   "./oauth-provider.config.json"
    fi

   echo " "
    if [[ ${iurl}  =~  ${IPVAL} ]];then
      : # echo " # ${iurl} : Contains : ${IPVAL}: Not Required any Change "
    else
      # echo " # ${iurl} : DOESN'T Contains : ${IPVAL}: Required Modifications: "
       sed -i "s/\"internalUrl\":.*/\"internalUrl\": \"https:\/\/${IPVAL}:8463\",/g"   "./oauth-provider.config.json"
       #sed -i "s/^passwd=.*/passwd=${3}/g" $0
    fi

   echo " "


popd  > /dev/null
   fi

}


function verifyExecEnv()
{
    printf " $0 : DIR ${PWD} \n"
    if [[ -d "${PWD}/smo/oam" && -d "${PWD}/smo/platform"  && -d "${PWD}/networkElement" ]];then
       echo " ****** EXECUTION DIR: ${PWD}   **** "
    else
       echo " ****** SOMETHING: WRONG FROM EXECUTION DIR: ${PWD} "
       echo " Cannot Find Required DIR ............ "
       printf " ${PWD}/smo \n "
       printf " ${PWD}/networkElement \n" 
       exit 0
    fi
}





function displDockNetworks()
{
   ems_networks=$(docker network ls -q)
   if [ -z "$ems_networks" ]; then
      echo "## ERROR ##: No Docker networks found."
   fi
   echo " "
   echo " ==  ## Display EMS Network Information ##  ==  "
   for e_network in $ems_networks; do
      # Get network name
      network_name=$(docker network inspect -f '{{.Name}}' $e_network)
      # Get network status
      driver=$(docker network inspect -f '{{.Driver}}' $e_network)
      scope=$(docker network inspect -f '{{.Scope}}' $e_network)
      if [[ $network_name == "dmz" || $network_name == "bridge" || $network_name == "oam" || $network_name == "smo" ]];then
       # printf " %15s : %s : %s \n" "$network_name" "$driver"  "$scope"
       docker network inspect $network_name --format \
            'Name: {{.Name}}, Gateway: {{(index .IPAM.Config 0).Gateway}}, Subnet: {{(index .IPAM.Config 0).Subnet}}'
      fi
   done
   echo " --------------------------------------------------------  "


}


function displayEMSEnv()
{
  IFS==$'\n'
  echo " ============================================================================ \n"
  echo " ##########    ::    EMS ENVIRONMENT VARAIABLES ::                 ########## "
  echo " ============================================================================ \n"
  echo " "

  OAM_ENV="smo/oam/.env"
  OAM_YML="smo/oam/docker-compose.yml"
  PLAT_ENV="smo/platform/.env"
  PLAT_YML="smo/platform/docker-compose.yml"

  mapfile -t cont_match  < <(grep "container_name:" "$OAM_YML")
  for cont_name in "${cont_match[@]}";
  do
    #echo "$cont_name"
    if [[ "$cont_name"  =~  "sdnr" ]];then
	sdnr_img_name=$(cut -d ":" -f2 <<< "${cont_name}")
        #echo " CONTAINER MATCH: $sdnr_img_name "
    fi
    if [[ "$cont_name"  =~  "sdnc" ]];then
	sdnc_img_name=$(cut -d ":" -f2 <<< "${cont_name}")
        #echo " CONTAINER MATCH: $sdnc_img_name "
    fi
    if [[ "$cont_name"  =~  "ves" ]];then
	ves_img_name=$(cut -d ":" -f2 <<< "${cont_name}")
        #echo " CONTAINER MATCH: $ves_img_name "
    fi
    if [[ "$cont_name"  =~  "perf" ]];then
	perf_img_name=$(cut -d ":" -f2 <<< "${cont_name}")
        #echo " CONTAINER MATCH: $ves_img_name "
    fi
    if [[ "$cont_name"  =~  "dfc" ]];then
	dfc_img_name=$(cut -d ":" -f2 <<< "${cont_name}")
        #echo " CONTAINER MATCH: $ves_img_name "
    fi
  done


  sdnr_str=$( grep "^SDNC_IMAGE" $OAM_ENV)
  sdnr_img=$(cut -d "=" -f2 <<< "${sdnr_str}")


  sdnr_ipstr=$(grep "^SDNR_IP_ADDRESS"  $OAM_ENV)
  sdnripval=$(cut -d "=" -f2 <<< "${sdnr_ipstr}")

  sdnc_str=$( grep "^SDNC_WEB_IMAGE"  $OAM_ENV)
  sdnc_img=$(cut -d "=" -f2 <<< "${sdnc_str}")

  ves_str=$( grep "^VES_COLLECTOR_IMAGE" $OAM_ENV)
  ves_img=$(cut -d "=" -f2 <<< "${ves_str}")

  perf_str=$( grep "^PERF_IMAGE" $OAM_ENV)
  perf_img=$(cut -d "=" -f2 <<< "${perf_str}")

  dfc_str=$( grep "^DFC_IMAGE"  $OAM_ENV)
  dfc_img=$(cut -d "=" -f2 <<< "${perf_str}")

  echo   "-------------------------------------------------------------------"
  printf " %15s : %s  \n" "Image Name"  " Image Version"   
  echo   "-------------------------------------------------------------------"
  printf " %15s : %s  \n" "$sdnr_img_name"  "$sdnr_img"   
  printf " %15s : %s  \n" "$sdnc_img_name"  "$sdnc_img"   
  printf " %15s : %s  \n" "$ves_img_name"   "$ves_img"   
  printf " %15s : %s  \n" "$dfc_img_name"   "$dfc_img"   
  echo   "-------------------------------------------------------------------"
  echo " "

  file_up_ip_str=$(grep "^FILE_UPLOAD_SRVIP"  $OAM_ENV)
  file_up_ip=$(cut -d "=" -f2 <<< "${file_up_ip_str}")
  pm_file_upload_id_str=$(grep "^PM_USER_ID"  $OAM_ENV)
  pm_file_upload_id=$(cut -d "=" -f2 <<< "${pm_file_upload_id_str}")
  pm_file_upload_ps_str=$(grep "^PM_USERPASWD"  $OAM_ENV)
  pm_file_upload_ps=$(cut -d "=" -f2 <<< "${pm_file_upload_ps_str}")
  pm_file_upload_path_str=$(grep "^PM_FILE_UPLOADPATH"  $OAM_ENV)
  pm_file_upload_path=$(cut -d "=" -f2 <<< "${pm_file_upload_path_str}")

  ves_id_str=$(grep "^VES_COLLECTOR_USERNAME"  $OAM_ENV)
  ves_id=$(cut -d "=" -f2 <<< "${ves_id_str}")
  ves_ps_str=$(grep "^VES_COLLECTOR_PASSWORD"  $OAM_ENV)
  ves_ps=$(cut -d "=" -f2 <<< "${ves_ps_str}")

  printf " Perfromance Files Up load Information:  \n"   
  printf " Performance Server     IP: %10s \n" "${file_up_ip}"
  printf " Performance Server UserID: %10s \n" "${pm_file_upload_id}"
  printf " Performance Server Passwd: %10s \n" "${pm_file_upload_ps}"
  printf " Performance Files    Path: %10s \n" "${pm_file_upload_path}"
  echo " "
  printf "          ves-collector id: %10s \n" "${ves_id}"
  printf "       es-collector passwd: %10s \n" "${ves_ps}"
  echo   "-------------------------------------------------------------------"
  echo   " "


 pushd "./smo/oam" > /dev/null
 popd  > /dev/null

 displDockNetworks
}


function fetchCurrentOamStatus()
{
  printf " ================== Current OAM Service Status ============== "
  echo " "
  #echo -e "Container Name\tStatus\t\t\t\tImage Version\t\tCPU Usage\tMemory Usage"
  printf  " %15s : %s : %10s : %5s :  %15s \n" "Container Name" "Status" "Image Version" "RestartCnt"   "CPU Usage\tMemory Usage" 
  echo " ============================================================================ "

  for i in "${oam[@]}"
  do
   #echo "$i"
   status=$(docker inspect --format='{{.State.Status}}' $i)
   exec_path=$(docker inspect --format='{{.Path}} {{.Args}}' $i)
   image=$(docker inspect --format='{{.Config.Image}}' $i)
   restartCnt=$(docker inspect --format='{{.RestartCount}}' $i)

   # Get CPU and Memory usage
   stats=$(docker stats --no-stream --format "{{.CPUPerc}}\t{{.MemUsage}}" $i)
   cpu_usage=$(echo $stats | awk '{print $1}')
   mem_usage=$(echo $stats | awk '{print $2" "$3}')

   # or do list  with individual element of the  container status
   #printf "%10s : %10s  : %10s  %10s : \n" $i ${status}  ${image} ${stats} 
   #echo -e "$i\t\t$status\t\t$image\t\t$cpu_usage\t$mem_usage"
   printf  " %15s : %s : %20s : %5s :  %15s \n" "$i" "$status" "$image"  "  $restartCnt"  "${cpu_usage} : ${mem_usage}"

  done

}

function fetchCurrentPlatformStatus()
{
  printf " ================== Current PLATFORM Service Status ============== "
  echo " "
  echo -e "Container Name\tStatus\t\t\t\tImage Version\t\tCPU Usage\tMemory Usage"
  echo " ============================================================================ "

  for i in "${platform[@]}"
  do
   #echo "$i"
   status=$(docker inspect --format='{{.State.Status}}' $i)
   exec_path=$(docker inspect --format='{{.Path}} {{.Args}}' $i)
   image=$(docker inspect --format='{{.Config.Image}}' $i)
   restartCnt=$(docker inspect --format='{{.RestartCount}}' $i)

   # Get CPU and Memory usage
   stats=$(docker stats --no-stream --format "{{.CPUPerc}}\t{{.MemUsage}}" $i)
   cpu_usage=$(echo $stats | awk '{print $1}')
   mem_usage=$(echo $stats | awk '{print $2" "$3}')

   # or do list  with individual element of the  container status
   #printf "%10s : %10s  : %10s  %10s : \n" $i ${status}  ${image} ${stats} 
   echo -e "$i\t$status\t\t$image\t\t$cpu_usage\t$mem_usage"
   # or do list  with individual element of the  container status
  done

}


function updateUpStatus()
{
  echo " "
  echo " ============================================================================ \n"
  echo " "
   fetchCurrentOamStatus
  echo " "
   fetchCurrentPlatformStatus
  echo " "
  echo " ============================================================================ \n"
  echo " "
  displDockNetworks
}


function updateCurrStatus()
{

  printf " ================== Current OAM Service Status ============== "
  echo " "
  echo -e "Container Name\tStatus\t\t\t\tImage Version\t\t Reason"
  echo " ============================================================================ "

  for i in "${oam[@]}"
  do
   #echo "$i"

   status=$(docker inspect --format='{{.State.Status}}' $i)
   exec_path=$(docker inspect --format='{{.Path}} {{.Args}}' $i)
   image=$(docker inspect --format='{{.Config.Image}}' $i)
   exit_reason=$(docker inspect --format='{{.State.ExitCode}} - {{.State.Error}}' $i)

   echo -e "$i\t$status\t\t$image\t$exit_reason"

  done

  echo " ============================================================================ \n"


  for i in "${platform[@]}"
  do
   #echo "$i"

   status=$(docker inspect --format='{{.State.Status}}' $i)
   exec_path=$(docker inspect --format='{{.Path}} {{.Args}}' $i)
   image=$(docker inspect --format='{{.Config.Image}}' $i)
   exit_reason=$(docker inspect --format='{{.State.ExitCode}} - {{.State.Error}}' $i)

   echo -e "$i\t$status\t\t$image\t$exit_reason"

  done

}

function checkforContLogs()
{
  echo " "
  echo " ___________________________________________________________________________ "
  echo " "
  for contName  in "${oam[@]}"
  do
    validStr=${searchStr[$contName]}
    upst="down" # Down

      for n in {1..9};
      do
        rm outlog
        #echo " ##################################################################"
        #echo " #"
        #echo " # Checking Status Of Container: $contName :  is ${status} "
        #echo " # Searching for String: ${validStr} "
        #echo " #"
        #echo " ##################################################################"
        #echo " "
	
        docker logs  ${contName} > outlog 2>&1
	sestr=$(grep -ir "${validStr}" ./outlog)
        if [[ -z ${sestr} ]];then
            echo "# ------------------------------------------------------------ "
            echo "# Cannot find the string: ${validStr} "
            echo "# In $contName Log : Search Iteration: ==> $n "
            echo "# ------------------------------------------------------------ "
        else

            echo " ##################################################################"
            #echo " #  Found the string: ${validStr} "
            #echo " #  In $contName Logs : "
	    echo " #  EMS SERVICE: $contName is UP  ==  "
            echo " ##################################################################"
	    echo " "
            upst="up"
            break
        fi
        echo "# ==== Cannot Find the  String from Container $contName logs  ==== "
        echo "# ==== wait for 10 Seconds and Try Again ==== "
        sleep 10
     done

  done

   echo " "
  if [[ ${upst} == "down" ]];then
    echo " ##################################################### "
    echo " #           -- - EMS SERVICES DOWN   --             # "
    echo " ##################################################### "
    echo " "
    echo " ___________________________________________________________________________ "
    echo " "
    for i in "${oam[@]}"
    do
     #echo "$i"
     status=$(docker inspect --format='{{.State.Status}}' $i)
     image=$(docker inspect --format='{{.Config.Image}}' $i)
     restartCnt=$(docker inspect --format='{{.RestartCount}}' $i)
     if [ "$restartCnt" -gt 1 ]; then
        echo " ##################################################### "
        echo " #  $i SERVICE RESTARTED MORE THAN ONCE: PL CHECK LOGS "
        echo " ##################################################### "
	printf " %15s : %s  : %s : %s \n" "${i}" "${status}" "${image}" "${restartCnt}" 
     fi
     done
    echo " "
  else
    echo " ##################################################### "
    echo " #           -- - EMS SERVICES UP                    # "
    echo " ##################################################### "
    echo " "
  fi

}



function RN_EMSStatus()
{

  isDown="no"

  for cont_name  in "${oam[@]}"
  do
   if ! docker inspect $cont_name > /dev/null 2>&1; then
    echo " ##################################################### "
    printf " #  Container %10s: $cont_name   : Down:            \n" 
    echo " ##################################################### "
    isDown="yes"
   fi
  done


  for cont_name  in "${platform[@]}"
  do
   if ! docker inspect $cont_name > /dev/null 2>&1; then
    echo " #####################################################"
    echo " #  Container $cont_name:   DOWN                      :"
    echo " #####################################################"
    isDown="yes"
   fi
  done


  if [[ ${isDown} == "yes" ]];then
    echo " ##################################################### "
    echo " #                                                   # "
    echo " #           -- - EMS DOWN   ---                     # "
    echo " #    --- EMS SERVICES ARE NOT RUNNING ----          # "
    echo " ##################################################### "
    echo " "
    #updateCurrStatus
  else
    echo " ##################################################### "
    echo " #                                                   # "
    echo " #     --- EMS SERVICES - RUNNING                    # "
    echo " #                                                   # "
    echo " ##################################################### "
    echo " "
    if [[ ! ${action} == "status"  ]];then
      checkforContLogs
    fi
    updateUpStatus
  fi

}



function oamSrvc()
{
  act=$1

 pushd "./smo/oam" > /dev/null
   echo " ============================================ "
     if [[ ${act} == "down" ]];then
        echo " Action: OAM  SERVICES To Bring-Down: "
        docker-compose down
     elif [[ ${act} == "up" ]];then
        echo " Action: OAM  SERVICES To Bring-Up: "
        updateConfigPath
        docker-compose up -d
	echo " WAIT for ${BRING_UP_WAIT}Sec;  "
	sleep ${BRING_UP_WAIT}
	echo " "
     else
       echo " Unsupported Action: For OAM SERVICES: "
       exit 0
     fi
   echo " ============================================ "
 popd  > /dev/null

}

function platformSrvc()
{
  act=$1

 pushd "./smo/platform" > /dev/null
   echo " ============================================ "
     if [[ ${act} == "down" ]];then
        docker-compose down
        echo " Action: PLATFORM  SERVICES To Bring-Down: "
     elif [[ ${act} == "up" ]];then
        echo " Action: PLATFORM  SERVICES To BringUp: "
        docker-compose up -d

         echo " # Disable: Non-needed Platform Logs:   : "
	 sleep 10
         # Disbale the Platform Need less logs.
         ./dmaap/topics.sh
     else
       echo " Unsupported Action: For PLATFORM SERVICES: "
       exit 0
     fi
   echo " ============================================ "
 popd > /dev/null

}


function requestedAction()
{
   typeOfAct=$1
   LOG_FOLDER="./logs"
   if [ ! -d "$LOG_FOLDER" ]; then
      echo "Please use configure option to configure platform first"
      exit
   fi

   case $srvcname in
        "all")
	  platformSrvc ${typeOfAct}
	  sleep 5
	  oamSrvc ${typeOfAct}
	 ;;
	"oam")
	  oamSrvc ${typeOfAct}
	 ;;
	"platform")
	  platformSrvc ${typeOfAct}
	 ;;
     *)
          echo " Invalid Service Stop Request: Nothing to do " 
        ;;
   esac

      echo " CHECK STTAUS OF OAM-PLATFORM Services : "
}

function configureSystem()
{
  echo " ############################################### "
  echo " ## User has Requested for Permission Change ## "
  echo " ## Required SUDO : permissions for  $(whoami)  ## "
  echo " ## Provide Password on request prompt:   ## "
  echo " ############################################### "

pushd "./smo/platform/persistence" > /dev/null 
       sudo mkdir -p ./config-files
       sudo mkdir -p ./esearch
       sudo rm -fr ./config-files/*
       sudo chown -R 1000:0   "./config-files"
       sudo chown -R 1000:0   "./esearch"
popd
 echo " ## Successfully Updated Permissions ## "
       sudo mkdir -p ./logs/sdnr
       sudo mkdir -p ./logs/ves
       sudo mkdir -p ./logs/dfc
       sudo mkdir -p ./logs/nbi
       sudo mkdir -p ./logs/perf
       sudo chmod -R 777 ./logs/
 exit 0

}




function userActionReq()
{
   echo " "
   case $action in
     "stop")
     echo "#  Requested For Stopping: Services: $srvcname" 
     echo " "
      requestedAction "down"
     echo " "
     ;;
   "start")
     echo "#  Requested For Starting: Services: $srvcname" 
     echo " "
     requestedAction "up"
     echo " "
     ;;
   "restart")
      echo "#  Requested For Re-Starting: Services: $srvcname" 
      echo "#  Bring-Down Services"
      echo " "
      requestedAction "down"
      sleep 5
      echo "#  Bring-Up Services"
      requestedAction "up"
      echo " "
     ;;
   "status")
     echo "#  Requested For EMS-Services: Status :" 
     echo " "
     displayEMSEnv
     ;;
   "configure")
     echo "#  Requested For Changing Permission :" 
     echo " "
     configureSystem
     ;;

   *)
     echo " Invalid Action: $action :  Nothing to DO "
   ;;
esac


}

verifyExecEnv
replaceIPEnv
userActionReq
RN_EMSStatus
rm -rf outlog
