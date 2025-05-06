#!/bin/bash

###############################################################################
#
# Copyright (C) 2024 RideNext Software Solutions. Pvt Ltd.  All rights reserved"
#
################################################################################

#################################################################
### this script Installs the Packages
##  Loads the Docker Images
#######################################################################

REQ_PAR1=2
REQ_PAR2=3
UP_PAR=4 #If user Mentions only For  Upgrade

DK_IMG_TAR=$1
DST_DIR=$2


CURR_WRK_DIR=${PWD}
PASSWD="iltwat123#"
IPVAL=""
EMS_UPGRADE=""




function Help()
{
  echo " -------------------------------------------------------- "
  echo " $0: EMS Installation Script : Number of parameters required : 2 "
  echo "   first Param  :  EMS Docker Images  In Compressed Format tar.gz "
  echo "   second Param :  Destination Dir: Where PackagesTo be Installed "
  echo "   third param  :  IP Address ( Optional )"
  echo "   Update Password in Script: $0 :                ##    "
  echo "                                 : varibale name:PASSWD "
  echo " "
  echo " -------------------------------------------------------- "

}


oam_images=("sdnr"  "sdnc-web"   "vescollector"  "perf"  "nbi"  "dfc")

valid_ipv4() {
    local ip="$1"
    err_msg='IP address is invalid'
    [[ "$ip" =~ ^([0-9]{1,3}\.){3}[0-9]{1,3}$ ]] || { echo "$err_msg"; Help ; exit 0; }
    for i in ${ip//./ }; do
        [[ "${#i}" -gt 1 && "${i:0:1}" == 0 ]] && { echo "$err_msg"; Help ; exit 0; }
        [[ "$i" -gt 255 ]] && { echo "$err_msg"; Help; exit 0; }
    done
    echo 'IP address is valid'
}



if [[ $# -eq ${REQ_PAR1}  ||  $# -eq ${REQ_PAR2} || $# -eq ${UP_PAR} ]]; then

    if [[ ! -d  ${DST_DIR} || ! -f "${DK_IMG_TAR}" ]];then

        echo " CHECK For Availability Of ::: "
        echo "       : DIR: ${DST_DIR}  "
        echo "       : SMO IMAGE TAR FILE : ${DK_IMG_TAR} "
        Help
        exit 0
    fi
    echo " INSTALL:DIR: ${DST_DIR} : "
    echo " SMO DOCKER IMAGE : FILE: ${DK_IMG_TAR} "
    if [[ $# -eq ${REQ_PAR2} || $# -eq ${UP_PAR} ]];then
       valid_ipv4 $3
       IPVAL=$3       
       echo " SDNR IP ADDR: : ${IPVAL} "
    fi
else

   echo " ##################################################### "
   echo " # INVALID INPUT: $0 "
   Help
   echo " ##################################################### "
   echo " "
   exit 1

fi


if [[ $# -eq ${UP_PAR} ]];then
    if [[ ${4,,} == "upgrade" ]];then
       EMS_UPGRADE="yes"
    fi
  
fi



function displayEmsEnv()
{
   echo " ##################################################### "
   user_id=$(id -u)
   user_name=$(whoami)
   echo " ## USER NAME : $user_name                           "
   echo " ## USER ID   : $user_id                             "
   echo " ## INSTALL DIR: ${DST_DIR}                          "

   if sudo -n true 2>/dev/null; then
    echo " ## USER:  $user_name HAS sudo privileges."
   else
    echo " ##  ************************************************* ## "
    echo " ## USER:  $user_name :  DOESN'T HAVE SUDO  privileges."
    echo " ## USER:  $user_name ;  Update as SUDO and RE-Execute " 
    echo " ##  ************************************************* ## "
   fi

   un=$(uname -a)
   um=$(uname -m)
   mem=$(free -h)
   echo " "
   echo " ## SYSTEM INFORMATION:  "
   echo " #         OS:   $un"
   echo " #         PLATFORM:  $um"
   echo " #         MEM:  "
   echo " $mem "
   echo " "
   echo " #-------------------------------------------------------  "
   echo " "
   echo " #  DOCKER INFO:                                   # "

   if command -v docker >/dev/null 2>&1; then
        dkver=$(docker --version)
        dcver=$(docker-compose --version)
	echo " ## DOCKER VER: $dkver  "
	echo " ## DOCKER-COMPOSE VER:  $dcver  "
	echo " "
    else
        echo " ##################################################### "
        echo " ## ERROR:  Docker is not installed."
        echo " ##################################################### "
        exit 1
    fi
    echo " ##################################################### "
    echo " ####   DOCKER  INFO:     ##### "
    docker info
    echo " ##################################################### "
    echo " "
    echo " ## Clean up : Orphan Images   ## "
    docker  system prune -f
    echo " ##################################################### "
    echo " "

    if [[ -z ${PASSWD} ]];then
	    :
    else
      echo " ## ------------- WARNING: PASSWD:$PASSWD UPDATED IN CONFIG PATH  -------- ## "
    fi

}

function extractEMSPkg()
{
  echo " ##    ---------------------------------------------- ## "
  echo " ##  Extarcting : ${DK_IMG_TAR}  ## "
  echo " ##        DIR  : ${DST_DIR}     ## "
  tar -xvf  ${DK_IMG_TAR} -C ${DST_DIR}/  
  if [ $? -eq 0 ]; then
      echo " ## Successfully extracted ${DK_IMG_TAR} : ${DST_DIR}  ## "
  else
      echo " ##  ERROR: EMS PKG Extraction Fail    ## "
      echo " ##  EMS PKG : ${DK_IMG_TAR} :  DIR :: ${DST_DIR}  ## "
      exit 1
  fi

  ## Check for EMS DIR 
  if [[ ! -d  ${DST_DIR}/env-rn-ems-tmp ]];then
     echo " ##  ERROR: EMS PKG Extraction Fail    ## "
     echo " ##       : Expected ${DST_DIR}/env-rn-ems-tmp  ## "
     echo " ##       : Cannot find EMS PKG DIR ${DST_DIR}/env-rn-ems-tmp ## "
     exit 1
  fi

}

function updateOAMEnv()
{

   img=$1 
   ver=$2

    echo " ## UPDATE  VERSION INFORMATION: IN SMO-OAM ENV :   "
    case $img in

         "sdnr")
	  echo " # Updating SDNR VERSION:${ver} "
	  sed -i "s%^SDNC_IMAGE=.*%SDNC_IMAGE=sdnr:${ver}%g"  "${DST_DIR}/exec/smo/oam/.env"
          ;;

         "sdnc-web")
	  echo " # Updating SDNC-WEB VERSION:${ver} "
	  sed -i "s%^SDNC_WEB_IMAGE=.*%SDNC_WEB_IMAGE=sdnc-web:${ver}%g"  "${DST_DIR}/exec/smo/oam/.env"
          ;;

         "vescollector")
	  echo " # Updating VES-COLLECTOR VERSION:${ver} "
	  sed -i "s%^VES_COLLECTOR_IMAGE=.*%VES_COLLECTOR_IMAGE=vescollector:${ver}%g"  "${DST_DIR}/exec/smo/oam/.env"
          ;;

         "perf")
	   echo " # Updating PERF-MONITOR VERSION:${ver} "
	   sed -i "s%^PERF_IMAGE=.*%PERF_IMAGE=perf:${ver}%g"  "${DST_DIR}/exec/smo/oam/.env"
          ;;

         "nbi")
	   echo " # Updating NBI VERSION:${ver} "
	   sed -i "s%^NBI_IMAGE=.*%NBI_IMAGE=nbi:${ver}%g"  "${DST_DIR}/exec/smo/oam/.env"
          ;;

         "dfc")
	   echo " # Updating DFC VERSION:${ver} "
	   sed -i "s%^DFC_IMAGE=.*%DFC_IMAGE=dfc:${ver}%g"  "${DST_DIR}/exec/smo/oam/.env"
          ;;
      *)

      echo " ##  OAM IMAGE: $img : ENV VERSION CHANGE NOT SUPPORTED ##" 
      echo ""
      ;;

    esac

}


function loadEmsImages()
{

 echo " ##  ----------------------------------------------##  "
 echo " ####   DOCKER EMS IMAGE: LOADING : INITIATED   #####  "

 if [[ -f  ${DST_DIR}/env-rn-ems-tmp/exec.tar.gz ]];then

     tar -xvf ${DST_DIR}/env-rn-ems-tmp/exec.tar.gz -C ${DST_DIR}/
     if [ $? -eq 0 ]; then
          echo " ## Successfully extracted  EMS exec dir to PATH: ${DST_DIR}/  ## "
	  if [[ ! -d  "${DST_DIR}/exec" ]];then
              echo " ##################################################### "
              echo " ## ERROR: FAIL:   $Imgfile : Extraction:  ## "
              echo " ## ERROR: CANNOT FIND DIR :  ${DST_DIR}/exec  ## "
              echo " ## ERROR: CHECK TAR CONTENTS :  $Imgfile  ## "
              echo " ##################################################### "
              exit 1
	  fi
     else
          echo " ##################################################### "
          echo " ## ERROR: FAIL:   $Imgfile : Extraction:  ## "
          echo " ##################################################### "
          exit 1
     fi

 else
     echo " ##################################################### "
     echo " ## ERROR: CANNOT FIND EMS EXE DIR IN PKG: ${DST_DIR}/env-rn-ems-tmp/exec.tar.gz  ## "
     echo " ##################################################### "
     exit 1
 fi

 for Imgfile in ${DST_DIR}/env-rn-ems-tmp/*.tar.gz; do
    # Skip the exec.tar.gz file
    echo " ## --  PROCESS IMAGE FILE:  $Imgfile "
    if [[ $(basename "$Imgfile") == "exec.tar.gz" ]]; then
	# Option for EXE Image
        echo " ## EMS EXE Extraction : Done :   "
	echo " ## $Imgfile into Dst:DIR  : ${DST_DIR} "
    else # Option for DOCKER IMAGE 
         # Load the Docker image from the tar.gz file

	 if [[ -z  ${EMS_UPGRADE} ]];then
             echo " ## ********  EMS: FRESH INSTALL  ******** ## " 
             echo " ## Loading EMS-Docker image from $Imgfile"
	 else
             echo " ## ********  EMS: UPGRADE OPTION:DETECTED  ******** ## " 
             if [[ $(basename "$Imgfile") == "kafka_plat_img.tar.gz" ]]; then
		echo " PLATFORM: ## --- Ignore Kafka : $Imgfile --  ## "
		continue
             elif [[ $(basename "$Imgfile") == "identity_keyclock_img.tar.gz" ]]; then
		echo " PLATFORM: ## --- Ignore Identity : $Imgfile --  ## "
		continue
             elif [[ $(basename "$Imgfile") == "identity_db_img.tar.gz" ]]; then
		echo " PLATFORM: ## --- Ignore Identity-db : $Imgfile --  ## "
		continue
             elif [[ $(basename "$Imgfile") == "zoo_keeper_plat_img.tar.gz" ]]; then
		echo " PLATFORM: ## --- Ignore zoo-keeper : $Imgfile --  ## "
		continue
             elif [[ $(basename "$Imgfile") == "persistance_plat_img.tar.gz" ]]; then
		echo " PLATFORM: ## --- Ignore: persistance : $Imgfile --  ## "
		continue
             elif [[ $(basename "$Imgfile") == "dmap_plat_img.tar.gz" ]]; then
		echo " PLATFORM: ## --- Ignore : dmapp : $Imgfile --  ## "
		continue
             elif [[ $(basename "$Imgfile") == "readpanda_img.tar.gz" ]]; then
		echo " PLATFORM: ## --- Ignore : dmapp : $Imgfile --  ## "
		continue
	     else
		echo " UPGRADING:SMO-OAM ## --- $Imgfile --  ## "
	     fi
	 fi

         dkout=$(docker load -i "$Imgfile")
         image_info=$(echo "$dkout" | grep -oP 'Loaded image: \K.*')
         if [ -n "$image_info" ]; then
             image_name=$(echo "$image_info" | cut -d':' -f1)
             image_version=$(echo "$image_info" | cut -d':' -f2)
    
	     echo " # Successfully Loaded: "
             echo " # Image Name: $image_name"
             echo " # Image Version: $image_version"
	     echo " "
	     updateOAMEnv $image_name $image_version
         else
            echo " ##################################################### "
            echo " ###  DOCKER: LOAD : ERROR ### "
            echo " ###  Failed to load image:$Imgfile "
            echo " ##################################################### "
            exit 1
         fi

    fi #End of For Loop

  done


 echo " ####   DOCKER EMS IMAGE: LOADING : COMPLETED   #####  "
 echo " ##  ----------------------------------------------##  "

}


function updateConfigPath()
{
   if [[ -z ${IPVAL} ]];then
      ## No rplacement required
      :
    else
      echo " ## Replacing SDNR IP ADDRESS WITH=${IPVAL} "
      sed -i "s%^SDNR_IP_ADDRESS=.*%SDNR_IP_ADDRESS=${IPVAL}%g"  "${DST_DIR}/exec/smo/oam/.env"
      sed -i "s%^FILE_UPLOAD_SRVIP=.*%FILE_UPLOAD_SRVIP=${IPVAL}%g"  "${DST_DIR}/exec/smo/oam/.env"
      sed -i "s%^NBI_IP=.*%NBI_IP=${IPVAL}%g"  "${DST_DIR}/exec/smo/oam/.env"
      sed -i "s%^NMS_KAFKA_IP=.*%NMS_KAFKA_IP=${IPVAL}%g"  "${DST_DIR}/exec/smo/oam/.env"
   fi

   user_name=$(whoami)
   sdnr_str=$(grep "^SDNR_IP_ADDRESS"  ${DST_DIR}/exec/smo/oam/.env)
   sdnripval=$(cut -d "=" -f2 <<< "${sdnr_str}")
   echo " USERNAME: $user_name IP: $sdnripval : CWRK_DIR=${DST_DIR}/exec "
   sed -i "s%^PM_USER_ID=.*%PM_USER_ID=${user_name}%g"  "${DST_DIR}/exec/smo/oam/.env"
   sed -i "s%^PM_USERPASWD=.*%PM_USERPASWD=${PASSWD}%g"  "${DST_DIR}/exec/smo/oam/.env"
   config_path="sftp://${user_name}:${PASSWD}@${sdnripval}:22/${DST_DIR}/exec/smo/platform/persistence/config-files/"
   echo "Updated File Path: ${config_path}      "
   CONFIG_FILE_PATH=${config_path}
   export CONFIG_FILE_PATH=${config_path} 
   echo "## ENV VARIBALE CONFIG_FILE_PATH: ${CONFIG_FILE_PATH}"
   echo " Replace ENV Varibale in SMO/OAM"
   sed -i "s%^CONFIG_FILE_PATH=.*%CONFIG_FILE_PATH=${CONFIG_FILE_PATH}%g"  "${DST_DIR}/exec/smo/oam/.env"
   FILE_UPLOADPATH="${DST_DIR}/exec/smo/oam/perf-file/raw-perf-files/"
   sed -i "s%^PM_FILE_UPLOADPATH=.*%PM_FILE_UPLOADPATH=${FILE_UPLOADPATH}%g"  "${DST_DIR}/exec/smo/oam/.env"
}




function updateEnvState()
{
    echo " ##  ----------------------------------------------##  "
    echo " ####   UPDATE ENVIRONMENT STATUS   #####  "
    echo " ##  ----------------------------------------------##  "
    echo " #  Change the Ownership Of the: Persistence:Database  "
    mkdir -p ${DST_DIR}/exec/smo/platform/persistence/config-files

    if [[ -z ${EMS_UPGRADE} ]]; then
        sudo cp "${DST_DIR}/env-rn-ems-tmp/docker-compose"  "/usr/local/bin/"
        echo " ## IT IS NEW INSTALL PROCEDURE: RESET: PERSISTENCE DATA ## "
        sudo rm -rf "${DST_DIR}/exec/smo/platform/persistence/esearch/nodes"
        sudo rm -rf "${DST_DIR}/exec/smo/platform/persistence/esearch/snapshots"
        sudo rm -rf "${DST_DIR}/exec/smo/platform/persistence/config-files/*"

        # Update the Config Path for a new installation
        if [[ -n ${PASSWD} ]]; then
            echo "${PASSWD}" | sudo chown -R 1000:0 "${DST_DIR}/exec/smo/platform/persistence/config-files"
            echo "${PASSWD}" | sudo chown -R 1000:0 "${DST_DIR}/exec/smo/platform/persistence/esearch"
        else
            sudo chown -R 1000:0 "${DST_DIR}/exec/smo/platform/persistence/config-files"
            sudo chown -R 1000:0 "${DST_DIR}/exec/smo/platform/persistence/esearch"
        fi
    else
        echo " ## IT IS EMS UPGRADE PROCEDURE: PRESERVE DATA ## "
    fi

    # Update the Config Path (shared between new install and upgrade)
    updateConfigPath


 if [[ -z  ${PASSWD} ]];then
     echo " ***  REQUIRED PASSWD : FROM USER TO CHANGE PERMISSIONS **** "
     sudo chown -R  1000:0   "${DST_DIR}/exec/smo/platform/persistence/config-files"
     sudo chown -R  1000:0   "${DST_DIR}/exec/smo/platform/persistence/esearch"
     echo " ## ***  WARNING: PASSWD:UNKNOWN: Cannot Update Config Path *** ## "
 else
     echo "${PASSWD}" | sudo chown -R  1000:0   "${DST_DIR}/exec/smo/platform/persistence/config-files"
     echo "${PASSWD}" | sudo chown -R  1000:0   "${DST_DIR}/exec/smo/platform/persistence/esearch"
 fi


 if [[ ! -f "/usr/local/bin/docker-compose" ]];then

    echo " ## ############################################################ ## "
    echo " ## --- CANNOT FIND : /usr/local/bin/docker-compose --- ## "
    echo " ## ERROR: /usr/local/bin/docker-compose :  EMS PKG ERROR  "
    echo " ## ############################################################ ## "
    echo " "
    exit 1

 fi

 echo " ## Cleanup TEMP DIR: ${DST_DIR}/env-rn-ems-tmp/ "
 rm   -rf  ${DST_DIR}/env-rn-ems-tmp/

 echo " ## ############################################################ ## "
 echo " ##  EMS SETUP COMPLETED :   ######################### "
 echo "                         : $DK_IMG_TAR "
 echo "                         : $DST_DIR "
 echo " ## ############################################################ ## "

}
function updateCron() {
    crontab -r  # Remove all existing cron jobs
    #DST_DIR="/home/nms-auto/ems"

    # Define the new cron jobs
    CRON_JOB_1="myvar=${DST_DIR}/exec/logs"
    CRON_JOB_2="*/15 * * * * mkdir -p ${DST_DIR}/exec/logs/cron && . ${DST_DIR}/exec/smo/oam/.env && export \$(grep -v '^#' ${DST_DIR}/exec/smo/oam/.env | xargs) && ${DST_DIR}/exec/utils/dockerStats.sh >> ${DST_DIR}/exec/logs/cron/stats.log 2>&1"
    CRON_JOB_3="0 */6 * * * . ${DST_DIR}/exec/smo/oam/.env && export \$(grep -v '^#' ${DST_DIR}/exec/smo/oam/.env | xargs) && ${DST_DIR}/exec/utils/log_rotator.sh >> ${DST_DIR}/exec/logs/cron/rotator.log 2>&1"
    CRON_JOB_4="0 0 * * * ${DST_DIR}/exec/utils/cleanup_db.sh ${DST_DIR}  >> ${DST_DIR}/exec/logs/cron/cleanup_db.log 2>&1"

    # Add the cron jobs

    # Add the cron jobs
    (crontab -l 2>/dev/null; echo "$CRON_JOB_1") | crontab -
    (crontab -l 2>/dev/null; echo "$CRON_JOB_2") | crontab -
    (crontab -l 2>/dev/null; echo "$CRON_JOB_3") | crontab -
    (crontab -l 2>/dev/null; echo "$CRON_JOB_4") | crontab -

    echo "All cron jobs have been added successfully."
}





displayEmsEnv
extractEMSPkg
loadEmsImages
updateEnvState
updateCron
