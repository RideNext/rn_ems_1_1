#!/bin/bash
###############################################################################
#
# Copyright (C) 2024 RideNext Software Solutions. Pvt Ltd.  All rights reserved"
#
################################################################################

#################################################################
### this script packakges the Environment required for 
##  executing the rn-ems on new platform.
### Para,meters Required is
##  exec DIR and IP Address;on which this environment will be deplaoyed
##
#######################################################################

REQ_PAR1=2
REQ_PAR2=3

startTime=$(date '+%s')
hname=$(hostname)
LOCALIP="192.168.128.77"
lhost=$(hostname -I | cut -d  " " -f1)
intype=""

##################################################
##
##  EMS : VES INFORMATION
##  COMMON HEADER DEFAULT INFO
#################################################
EMS_SRC_NAME="TEJAS_EMS"
EMS_DOMAIN="notification"
EMS_SRC_ID="EMS_${hname}"
EMS_ENTITY_NAME="gNB_EMS_${hname}"
EMS_EVENT_TYPE="EMS_SWUPGRADE_STATUS"

VES_USERNAME="sample1"
VES_PASSWORD="sample1"

VES_ENDPOINT="https://localhost:8443/eventListener/v7"


###################################################
##REGISTRY  PARAMS
## Docker Registry  URL
## LOG In
## Pwd Details 
## Fetch from Local Elastic DB
##################################################

emsImgRegUrl=""
emsImgRegLn=""
emsImgRegPwd=""
emstargetdir=""
emsPkgFtpPath=""

##############################
## Docker images Identity after Prefxing Registry ID
############################
sdnr_img=""
sdnc_img=""
ves_img=""
perf_img=""

##CURRENT SCRIPT EXE DIR
CEXEDIR="/home/bluefox/ODLUX/rn-ems/exec"

###################################################
## DEFAULT PARAMS
## Docker Registry  URL
## LOG In Pwd Details 
###  Installation type identified by ftp file path / file
##  If file : is in format tar.gz extension : 
##                     then script assumes it is Fresh INstallation
##   If File is .env format; 
##                     then script assumes it as Upgrade
##
##  Target Dir : is the directory,where exec / EMS services will run
##################################################
DOCK_IMG_REG_URL="https://index.docker.io/v2/"
DOCK_LOGIN="gbalaji71"
DOCK_PASSWD="gbalaji71"
TARGET_EMS_DIR="${CEXEDIR}"
EMS_FTP_PATH="/home/bluefox/.env_back"

# SMO IMAGE NAME
SDNC_IMAGE_NAME="SDNC_IMAGE"
SDNC_DKR_VER=""
SDNC_DKR_ID=""

SDNC_WEB_IMAGE_NAME="SDNC_WEB_IMAGE"
SDNC_WEB_DKR_VER=""
SDNC_WEB_DKR_ID=""

VES_COLLECTOR_IMAGE_NAME="VES_COLLECTOR_IMAGE"
VES_DKR_VER=""
VES_DKR_ID=""

PERF_IMAGE_NAME="PERF_IMAGE"
PERF_DKR_VER=""
PERF_DKR_ID=""


#PLATFORM IMAGE DETAILS
IDENTITY_SRV_NAME="IDENTITY_IMAGE"
IDENTITY_SRV_VER=""

PERSISTANCE_IMG_NAME="PERSISTENCE_IMAGE"
PERSISTANCE_IMG_VER=""

ZOO_KEEPER_IMAE_NAME="ZOOKEEPER_IMAGE"
ZOO_KEEPER_IMAE_VER=""

KAFKA_IMAGE_NAME="KAFKA_IMAGE"
KAFKA_IMAGE_VER=""

DMAAP_IMAGE_NAME="DMAAP_IMAGE"
DMAAP_IMAGE_VER=""

PKG_INFO_NAME="COMPOSE_PROJECT_NAME"
NEW_PKG_INFO=""


function Help()
{
  echo " #===========================================================================#"
  echo " #                                                                           #"
  echo " # $0: Number of parameters required for Execution is 3: or 0                #"
  echo " #   1st Param   : Target Directory, Where to be Installed or Upgraded       #"
  echo " #   2nd param   : EMS Binary file In Compressed Format                      #" 
  echo " #   3rd Param   : IP Address (optional) to replace in .env file             #"
  echo " #                                                                           #"
  echo " # ------------------------------------------------------------------------- #"
  echo " #                                                                           #"
  echo " # $0:  with 0(None) Options fetches the required data from ELastic DB       #"
  echo " #                      : For Upgrade                                        #"
  echo " #===========================================================================#"

}


  if [[ $# -eq  0 ]];then
    echo " ############################################## "
    echo " ## UPGRADE INITIATED : FETCH REQ  DATA FROM DB"
    echo " ############################################## "
  elif [[ $# -ne ${REQ_PAR2}  && $# -ne ${REQ_PAR1} ]]; then
    echo " ##################################################### "
    echo " ## EMS Service Installation : Options are not valid   "
    echo " ##################################################### "
    Help
    exit 1
else
    rn_ems_bin=${2}
    TARGET_EMS_DIR=${1}
    ENV_IP=${3}
    #TARGET_EMS_DIR=${1}
    EMS_FTP_PATH="${rn_ems_bin}"
    echo " ##################################################### "
    echo " ## EMS Service Installation : Initiated               "
     echo " ## TARGET DIR : ${TARGET_EMS_DIR}                     "
     echo " ## EMS PACKAGE : ${rn_ems_bin}                        "
    echo " ## EMS IP : ${ENV_IP}                                 "
    echo " ##################################################### "
    if [[ ! -f  ${rn_ems_bin} ]];then
       echo " ################################################## "
       echo " ## EMS Service Installation : ERROR:Invalid Input  "
       echo " File Found ERROR: ${rn_ems_bin}                    "
       echo " ################################################## "
       Help
       exit 1
    fi
    if [[ ! -d "${TARGET_EMS_DIR}" ]];then
       echo " ################################################## "
       echo " ## EMS Service Installation : ERROR:Invalid Input  "
       echo " DIR Found ERROR: ${TARGET_EMS_DIR}                        "
       echo " Create ${TARGET_EMS_DIR} DIR For Installation             "
       echo " ################################################## "
       mkdir -p  ${TARGET_EMS_DIR}
    fi

fi


function validateInstallParams()
{
    lIp=$1

    if [[ ! -f  ${rn_ems_bin} || ! -d "${TARGET_EMS_DIR}" ]];then
       
	echo "################################################################"
        echo "# Neither DIR: ${rn_ems_bin} OR ${TARGET_EMS_DIR}  is Not  Found      #"
	echo "# EMS:EXEC File Name: ${rn_ems_bin} :                          #" 
	echo "# EMS:Target Dir : ${TARGET_EMS_DIR}                                  #" 
	echo "# File Found ERROR:                                            #"
	echo "################################################################"
	Help
	exit 1
    else
	if [[ "${rn_ems_bin}"  =~  ".tar.gz" ]];then
	     echo "################################################################"
             echo "# TARGET DIR:  ${TARGET_EMS_DIR}                                      #"
	     echo "# EMS:EXEC File Name: ${rn_ems_bin} :                          #" 
	     echo "# EMS Service Installation Procedure Initiated: $lIp           #"
	     echo "################################################################"
	else
	    echo "################################################################"
            echo "# EMS Service Binary: ${rn_ems_bin}  Not in Req Format         #"
	    echo "# EMS:EXEC File : ${rn_ems_bin} : FORMAT Error                 #" 
	    echo "# EMS:Expected in Tar.gz Compressed Format                     #" 
	    echo "# File Format ERROR:                                           #"
	    echo "################################################################"
	    Help
	    exit 1
	fi
    fi
}



#######################################################
## Check for required working ENV: of Docker
## If required environment not found; exit without deploying
## ${rn_ems_bin}/smo/oam/.env
#######################################################
function validateRnEMSEnvironment()
{  

   lIp=$1
   echo " * Validating ENV : in $lIp  *"

   if command -v docker &> /dev/null; then
      echo "Docker installation found"
      echo " Docker DU - Version "
      docker -v
      if command -v docker-compose  &> /dev/null; then
          echo " docker-compose  - Version "
          docker-compose -v
      else
          echo " ERROR: Not Found . Required docker-compose Envronment"
          echo "Docker-compose installation not found. Please install docker-compose"
          exit 1
      fi

   else
      echo " ERROR: Not Found . Required Docker Environment"
      echo " Docker installation not found. Please install docker."
      exit 1
   fi

   ####
   ## Log Into the DOCKER HUB / OR
   ## Docker registry
   ####
   docker login --username=$emsImgRegLn  --password=$emsImgRegPwd  $emsImgRegUrl 
   if [[ $? -eq 0 ]]; then
	echo " -------------------------------------------------------------- "
        echo " DOCKER IMAGES REG: Login Success:  ${emsImgRegUrl}             "
	echo " -------------------------------------------------------------- "
        cat "${HOME}/.docker/config.json"
        echo " "
        docker system info | grep -E 'Username|Registry'
	echo " "
    else
	echo " ############################################################### "
        echo " # DOCKER IMAGES REG: Login Failure:  ${emsImgRegUrl}            "
        echo " #                            LOGIN:  ${emsImgRegLn}             "
        echo " #                            PWD:    ${emsImgRegPwd}            "
	echo " ############################################################### "
        exit 1
    fi

    # TODO : Check for Curl 

}

## Write Common Procedure for Success or Failure
##


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


function fetchEmsUpgServiceParams()
{
   lIp=$1
 
   response=$(curl -X GET "http://localhost:9200/ems_credentials/_doc/credentials")

   emsImgRegUrl=$(echo "$response" | jq -r '._source.emsImgRegUrl')
   emsImgRegLn=$(echo "$response" | jq -r '._source.emsImgRegLn')
   emsImgRegPwd=$(echo "$response" | jq -r '._source.emsImgRegPwd')
   emstargetdir=$(echo "$response" | jq -r '._source.emstargetdir')
   emsPkgFtpPath=$(echo "$response" | jq -r '._source.emsPkgFtpPath')
   

   if [[ -z $emsPkgFtpPath || -z $emsImgRegLn || -z $emsImgRegPwd || -z $emstargetdir ]]; then
	 echo " ####################################################################### "
         echo " # EMS DOCKER SERVICES: CREDENTIALS NOT AVAILABLE: "
	 echo " #  CROSS VERIFY ELASTIC : DB: ems_credentials"
	 echo " # FAILURE IN INSTALLATION : "
	 echo " ####################################################################### "
	 exit 1
   else
        echo " ####################################################################### "
        echo "fetching the data(emsImgRegUrl,emsImgRegLn,emsImgRegPwd,emstargetdir,emsPkgFtpPath)"
        echo "  DOCKER REG URL: $emsImgRegUrl"
        echo "  DOCKER REG  LOGIN: $emsImgRegLn"
        echo "  DOCKER REG PASSWD: $emsImgRegPwd"
        echo "  EMS INSATLL DIR: $emstargetdir"
        echo "  EMS FTP Path: $emsPkgFtpPath"
        echo " # ####################################################################### "

   fi
   rn_ems_bin=${emsPkgFtpPath}
   #TARGET_EMS_DIR=${emstargetdir}
   TARGET_EMS_DIR=${emstargetdir}

}


function  getPkgInfo()
{

  newVer=$1

  echo " ................................................. "
  echo " Reading the ENV File: ${newVer}"
  echo " ................................................. "


  if [[ ! -f ${newVer} ]];then
     echo " "
     echo " Cannot find the Version FILE: ${newVer}"
  fi

  while read -r LINE; do
    if [[ $LINE == *'='* ]] && [[ $LINE != '#'* ]]; then
	
      if [[ ${LINE}  =~ "${PKG_INFO_NAME}" ]];then
	  NEW_PKG_INFO=$(echo "${LINE}" | cut -d "=" -f2)
	  echo "NEW VERSION INFO: ${NEW_PKG_INFO}"
	  echo ""
	  echo " INSTALLED PKG INFO :  ${NEW_PKG_INFO} "
      fi

    fi
  done < "${newVer}"


}


function insertDefaultEMSCredentials()
{
   lIp=$1
   echo "Inserting Default Params Into $lIp: DB:  "
   echo " REG URL    :  ${DOCK_IMG_REG_URL}"
   echo " REG LOGIN  :  ${DOCK_LOGIN}"
   echo " REG PWD    :  ${DOCK_PASSWD}"
   echo " TARGET DIR :  ${TARGET_EMS_DIR}"
   echo " ENV UPGRD  :  ${EMS_FTP_PATH}"
   echo " "
   echo 
        response=$(curl -X POST "http://localhost:9200/ems_credentials/_doc/credentials" \
            -H 'Content-Type: application/json' \
            -d '{
                "emsImgRegUrl": "https://index.docker.io/v2/",
                "emsImgRegLn": "gbalaji71",
                "emsImgRegPwd": "gbalaji71",
                "emstargetdir": "/home/bluefox/ODLUX/rn-ems/exec",
                "emsPkgFtpPath": "/home/bluefox/.env_back"
            }')
}



function  replaceEnvVariable()
{

  enFile=$1
  echo " ................................................. "
  echo "installOamImages: Initiating DOCKER PULL From REGISTRY: ${DOCK_LOGIN}"
  echo "installOamImages: Reading the ENV File: ${enFile}"
  echo " ................................................. "
  echo " "

  if [[ ! -z  ${ENV_IP} ]];then
      SDNCIP="SDNR_IP_ADDRESS=${LOCALIP}"
      REPIP="SDNR_IP_ADDRESS=${ENV_IP}"
      echo " REPLACING IP:  ${SDNCIP} "
      echo "              :  ${REPIP} "
      sed  -ie "s%${SDNCIP}%${REPIP}%g" ${enFile}
  fi
  echo " ================================================================== "
  echo " ## append REGISTRY repo to version  ${emsImgRegLn} : In  env file  "
  echo " ## PULL Following EMS Service Images from Registry                 "
  echo " =================================================================== "
  sed -ie s%"SDNC_IMAGE="%"SDNC_IMAGE=${emsImgRegLn}\/%g" ${enFile}
  sed -ie s%"SDNC_WEB_IMAGE="%"SDNC_WEB_IMAGE=${emsImgRegLn}\/%g" ${enFile}
  sed -ie s%"VES_COLLECTOR_IMAGE="%"VES_COLLECTOR_IMAGE=${emsImgRegLn}\/%g" ${enFile}
  sed -ie s%"PERF_IMAGE="%"PERF_IMAGE=${emsImgRegLn}\/%g" ${enFile}

  awk "/SDNC_IMAGE=|SDNC_WEB_IMAGE=|VES_COLLECTOR_IMAGE=|PERF_IMAGE=/ { print }" ${enFile}
  echo " "

}


function validateOamImg_PullAndUpgrade()
{
  enFile=$1
  echo " ###############################################################   "
  echo " ###                OAM                ### "
  echo " # validateOamImg_PullAndUpgrade:IMG REG : ${DOCK_IMG_REG_URL}"
  echo " #                             ENV File : ${enFile}"
  echo " #                             REG  LOGIN : ${DOCK_LOGIN}"
  echo " ###############################################################  "

  if [[ ! -f ${enFile} ]];then
     echo " #### "
     echo " ## ERROR: FAIL: CANNOT FIND THE ENV FILE FOR UPGRADE  ##"
     echo " #### "
     exit 1
  fi

   while read -r LINE; do
    if [[ $LINE == *'='* ]] && [[ $LINE != '#'* ]]; then

      if [[ ${LINE}  =~ "${SDNC_IMAGE_NAME}" ]];then
           SDNC_DKR_VER=$(echo "${LINE}" | cut -d "=" -f2)
           echo "SDNR VER: $SDNC_DKR_VER"
           sdnr_img="${SDNC_DKR_VER}"
           echo " ############################## "
           echo " # DOCKER PULL:SDNR:  ${sdnr_img}"
           echo " ############################## "
           docker pull  "${sdnr_img}"
      fi
      if [[ ${LINE}  =~ "${SDNC_WEB_IMAGE_NAME}" ]];then
           SDNC_WEB_DKR_VER=$(echo "${LINE}" | cut -d "=" -f2)
           echo "SDNC WEB VER: $SDNC_WEB_DKR_VER"
           sdnc_img="${SDNC_WEB_DKR_VER}"
           echo " ############################## "
           echo " # DOCKER PULL:SDNC-WEB:  ${sdnc_img}"
           echo " ############################## "
           docker pull  "${sdnc_img}"
      fi
      if [[ ${LINE}  =~ "${VES_COLLECTOR_IMAGE_NAME}" ]];then
           VES_DKR_VER=$(echo "${LINE}" | cut -d "=" -f2)
           echo "VES COLLECTOR VER: $VES_DKR_VER"
           ves_img="${VES_DKR_VER}"
           echo " ############################## "
           echo " # DOCKER PULL:VES-COLLECTOR:  ${ves_img}"
           echo " ############################## "
           docker pull  ${ves_img}
      fi
      if [[ ${LINE}  =~ "${PERF_IMAGE_NAME}" ]];then
           PERF_DKR_VER=$(echo "${LINE}" | cut -d "=" -f2)
           echo "PERF DOCKER VER: $PERF_DKR_VER"
           perf_img="${PERF_DKR_VER}"
           echo " ############################## "
           echo " # DOCKER PULL:PERF-MONITOR:  ${perf_img}"
           echo " ############################## "
           docker pull  ${perf_img}
      fi

    fi
   done < "${enFile}"

   sdnrdck=$(docker image ls ${sdnr_img} )
   echo " SDNR IMG: ${sdnrdck} :  ${sdnr_img} "
   if [[ -z  ${sdnrdck} ]];then
      echo " #####################################  "
      echo " # ERROR: DOCKER PULL:SDNR:  ${sdnr_img}"
      echo " # FAIL TO PULL IMG : ${sdnrdck}  "
      echo " #################################### "
      exit 1
   fi

   sdncdck=$(docker image ls ${sdnc_img} )
   echo " SDNC IMG: ${sdncdck} :  ${sdnc_img} "
   if [[ -z  ${sdncdck} ]];then
      echo " #####################################  "
      echo " # ERROR: DOCKER PULL:SDNC-WEB:  ${sdnc_img}"
      echo " # FAIL TO PULL IMG : ${sdncdck}  "
      echo " #################################### "
      exit 1
   fi

   vesdck=$(docker image ls ${ves_img} )
   echo " VES IMG: ${vesdck} :  ${ves_img} "
   if [[ -z  ${vesdck} ]];then
      echo " #####################################  "
      echo " # ERROR: DOCKER PULL:VES-COLLECTOR:  ${ves_img}"
      echo " # FAIL TO PULL IMG : ${vesdck}  "
      echo " #################################### "
      exit 1
   fi

   perdck=$(docker image ls ${perf_img} )
   echo " PERF IMG: ${perdck} :  ${perf_img} "
   if [[ -z  ${perdck} ]];then
      echo " #####################################  "
      echo " # ERROR: DOCKER PULL:VES-COLLECTOR:  ${perf_img}"
      echo " # FAIL TO PULL IMG : ${perdck}  "
      echo " #################################### "
      exit 1
   fi

}




function validatePlatImg_PullAndUpgrade()
{

  enFile=$1
  echo " ###############################################################   "
  echo " ###                PLATFORM              ### "
  echo " # validatePlatImg_PullAndUpgrade:IMG REG : ${DOCK_IMG_REG_URL}"
  echo " #                             ENV File : ${enFile}"
  echo " #                             REG  LOGIN : ${DOCK_LOGIN}"
  echo " ###############################################################  "

  if [[ ! -f ${enFile} ]];then
     echo " #### "
     echo " ## ERROR: FAIL: CANNOT FIND THE ENV FILE FOR UPGRADE  ##"
     echo " #### "
     exit 1
  fi

   while read -r LINE; do
    if [[ $LINE == *'='* ]] && [[ $LINE != '#'* ]]; then

       if [[ ${LINE}  =~ "${IDENTITY_SRV_NAME}" ]];then
              IDENTITY_SRV_VER=$(echo "${LINE}" | cut -d "=" -f2)
              echo "Identity Server  VER: $IDENTITY_SRV_VER"
              ident_img="${IDENTITY_SRV_VER}"
              echo " ###################################  "
              echo " # DOCKER PULL: IDENTITY IMG:  ${ident_img}"
              echo " ############################## "
              docker pull  ${ident_img}
      fi
      if [[ ${LINE}  =~ "${PERSISTANCE_IMG_NAME}" ]];then
              PERSISTANCE_IMG_VER=$(echo "${LINE}" | cut -d "=" -f2)
              echo "Persistance Server  VER: $PERSISTANCE_IMG_VER"
              pers_img="${PERSISTANCE_IMG_VER}"
              echo " #####################################  "
              echo " # DOCKER PULL: PERSISTANCE DB:  ${pers_img}"
              echo " #####################################  "
              docker pull  ${pers_img}
      fi
      if [[ ${LINE}  =~ "${ZOO_KEEPER_IMAE_NAME}" ]];then
              ZOO_KEEPER_IMAE_VER=$(echo "${LINE}" | cut -d "=" -f2)
              echo "ZOO Keeper  VER  VER: $ZOO_KEEPER_IMAE_VER"
              zoo_keep_dk=${ZOO_KEEPER_IMAE_VER}
              echo " #####################################  "
              echo " # DOCKER PULL: ZOO KEEPER:  ${zoo_keep_dk}"
              echo " #####################################  "
              docker pull  ${zoo_keep_dk}

      fi
      if [[ ${LINE}  =~ "${KAFKA_IMAGE_NAME}" ]];then
              KAFKA_IMAGE_VER=$(echo "${LINE}" | cut -d "=" -f2)
              echo "KAFKA  VER: $KAFKA_IMAGE_VER"
              kafka_img=${KAFKA_IMAGE_VER}
              echo " #####################################  "
              echo " # DOCKER PULL: DOCKER KAFKA:  ${kafka_img}"
              echo " #####################################  "
              docker pull  ${kafka_img}

      fi
      if [[ ${LINE}  =~ "${DMAAP_IMAGE_NAME}" ]];then
              DMAAP_IMAGE_VER=$(echo "${LINE}" | cut -d "=" -f2)
              echo "DMAP IMAGE  VER: $DMAAP_IMAGE_VER"
              dmap_img=${DMAAP_IMAGE_VER}
              echo " #####################################  "
              echo " # DOCKER PULL: DOCKER DMAAP:  ${dmap_img}"
              echo " #####################################  "
              docker pull  ${dmap_img}
      fi
      #if [[ ${LINE}  =~ "${O_RAN_SC_TOPOLOGY_IMAGE_NAME}" ]];then
      #        O_RAN_SC_TOPOLOGY_IMAGE_VER=$(echo "${LINE}" | cut -d "=" -f2)
      #        echo "ORAN SC TOPOLOGY IMAGE  VER: $O_RAN_SC_TOPOLOGY_IMAGE_VER"
      #        oran_sc_dk=$( docker image ls ${O_RAN_SC_TOPOLOGY_IMAGE_VER})
      #        echo ""
      #        echo " ${oran_sc_dk}"
      #        echo ""
      #        echo " Compressing:ORAN SC TOPOLOGY Server:Img: $O_RAN_SC_TOPOLOGY_IMAGE_VER "
      #fi

    fi
     done < "${rn_ems_bin}/smo/platform/.env"

}




#######################################################
## Required to
##
########################################################
function postUpgradeCleanUp()
{
   echo "********    TODO       ***************************************************  "
   echo " ###   POST UPGRADE CLEAN UP ### "
   echo "**************************************************************************  "



}

#######################################################################################
##
## read the container logs and check for predefined string.
##  Its iterates for 9 :
##  And each iteartion wait for 10 Seconds
##  if  procedure couldn't find the predefined strings from logs
##  Assumes that container brought up Failed
######################################################################################

declare -A searchStr=(["sdnr"]="Everything OK in Certificate Installation"
                      ["sdnc-web"]="Making CodeOmelet on 3005"
		      ["perf-monitor"]="Executing WRDir"
		      ["ves-collector"]="heartbeat has active stream: ves-heartbeat"
                     ) 

function isrnEmsBringUpSuccess()
{
   contName=$1
   contlog=$2

   validStr=${searchStr[$contName]}
   upst="down" # Down
     
   for n in {1..9}; 
    do
      rm outlog
      echo " ------------------------------------------"
      echo " "
      echo " Checking Status Of Container: $contName : $contlog "
      echo " Searching for String: ${validStr} "
      echo " "
      echo " ------------------------------------------"
      docker logs  ${contName} > outlog 
      sestr=$(grep -ir ${validStr} ./outlog)
      if [[ -z ${sestr} ]];then
          echo " Cannot find the string: ${validStr} "
	  echo " In $contName Log"
      else

          echo " Found the string: ${validStr} "
	  echo " In $contName Log : $contlog"
	  upst="up"
	  break
      fi
      echo " ==== Cannot Find the Search String ==== "
      echo " ==== Sleep for 10 Seconds and Try Again ==== "
      sleep 10
   done

   if [[ ${upst} == "down" ]];then
       echo " +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
       echo " CONTAINER : $contName  : $contlog "
       echo " STATUS      FAIL "
       echo " ERROR: Bring up"
       echo " +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
       return 1
   else
       
       echo " +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
       echo " CONTAINER : $contName "
       echo " STATUS       SUCCESS "
       echo " Bring up Successfull"
       echo " +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
       return 0
   fi

}


function fallBackToPrevRelease()
{
  lIp=$1
  prevWrkRel=$2
  echo " ########################################################################################### "
  echo " # UPGRADE FAILED FOR RELEASE:   "
  echo "                             FROM: $lIp"
  echo "                             TO:   $prevWrkRel"
  echo " Trying to Revert EMS Services to Previous Working Release "
  echo " ########################################################################################### "

pushd  ${emstargetdir}
   cd *
   cd oam/smo

   docker-compose  --env-file  "./.env"  up  -d
popd


}

function sendVESEvent()
{
    varstring=$1
    lIp=$2
    CType=$3
    #CNstatus=$4
    #COstatus=$5

    echo " #"
    echo " #+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++# " 
    echo " # SEND VES INSTALL EVENT : FAILURE                            "
    echo " # ERROR STRING:                                               "
    echo " #              :${varstring}                                  "
    echo " #+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++# " 
    echo " #"
    
    curTime=$(date '+%s')



     message_payload="{
    \"event\": {
        \"commonEventHeader\": {
            \"domain\": \""$EMS_DOMAIN"\",
            \"version\": \"4.1\",
            \"eventId\": \"Notification_1\",
            \"eventName\":\"Notification_softwareupgrade\",
            \"sequence\": "1",
            \"priority\": \"Normal\",
            \"sourceId\": \""$EMS_SRC_ID"\",
            \"reportingEntityName\": \""$EMS_ENTITY_NAME"\",
            \"timeZoneOffset\":\"UTC+05:30\",
            \"vesEventListenerVersion\": \"7.1.1\",
            \"sourceName\": \"SDNR\",
            \"startEpochMicrosec\": "$startTime",
            \"lastEpochMicrosec\": "$curTime",
            \"eventType\": \""$EMS_EVENT_TYPE"\",
            \"internalHeaderFields\": {}
        },
        \"notificationFields\": {
            \"changeIdentifier\": \"SW_UPGRADE\",
            \"changeType\": \""${CType}"\",
            \"notificationFieldsVersion\": \"2.0\",
            \"newState\": \""${CType}"\",
            \"oldState\": \""${CType}"\"
        }
      }
  }"

  # Base64 encode username and password
 auth_string=$(echo -n "$VES_USERNAME:$VES_PASSWORD" | base64)

 # Set headers
  headers='{
    "Content-Type": "application/json",
    "Authorization": "Basic '"$auth_string"'"
  }'

echo "###################"
echo "${message_payload}"
echo "###################"
# Post message
response=$(curl -X POST -H "Content-Type: application/json" -H "Authorization: Basic $auth_string" -d "$message_payload" -k "$VES_ENDPOINT")

# Check for errors
if [ $? -eq 0 ]; then
    echo "Message posted successfully: $response"
else
    echo "Error posting message"
fi


}



function checkForContainerServices()
{

   echo " == Checking:Whether EMS Services are Successfully UP or not :: == "
   isrnEmsBringUpSuccess  "sdnc-web" ${sdnc_dk}
   ret=$?
   if [[ $ret -eq  0 ]];then
      echo " "
      echo " SDNC-WEB: Container Successfully UP: and Running"
   else	
      echo " ERROR:Fail"      echo " SDNC-WEB : Container Fail to UP"
      docker logs  ${sdnc_dk} 
      return 1
   fi

   isrnEmsBringUpSuccess  "perf-monitor" ${perf_img}
   ret=$?
   if [[ $ret -eq  0 ]];then
      echo " "
      echo " PERF-MONITOR: Container Successfully UP: and Running"
   else	
      echo " ERROR:Fail"
      echo " perf-monitor : Container Fail to UP"
      docker logs   ${perf_img}
      return 1
   fi

   isrnEmsBringUpSuccess  "sdnr"  ${sdnr_dk}
   ret=$?
   if [[ $ret -eq  0 ]];then
      echo " "
      echo " SDNR: Container Successfully UP: and Running"
   else	
      echo " ERROR:Fail"
      echo " SDNR : Container Fail to UP"
      docker logs ${sdnr_dk}
      return 1
   fi

   return 0

}

function freshInstallrnEms()
{

 lIp=$1

 echo " # ==================================================== "
 echo " # INITIATED Fresh EMS Install: ${rn_ems_bin} "
 echo " # TARGET DIR: ${TARGET_EMS_DIR} "
 echo " # ==================================================== "

 echo ""
 echo "Extracting the EMS Bin Pkg to ${TARGET_EMS_DIR}"
 tar -xvf  ${rn_ems_bin} -C "${TARGET_EMS_DIR}/"

 if [[ ! -d  "${TARGET_EMS_DIR}/exec"  && ! -f ${TARGET_EMS_DIR}/exec/oam/smo/.env ]];then
    echo " ########################################################################"
    echo " #                                                                     ##"
    echo " #  Extraction of TAR FILE: ${rn_ems_bin} Error                        ##"
    echo " #  File Found Error: ${TARGET_EMS_DIR}/exec/oam/smo/.env              ##"
    echo " ########################################################################"
    #sendVESFailInstallEvent  "Invalid EMS TAR BIN PKG"  $lIp
    exit 1
   
 fi

    echo " ################################################################### "
    echo " #  Extraction of TAR FILE: ${rn_ems_bin} SUCCESS: "
    echo " # "
    echo " #######################################################  "

pushd  ${TARGET_EMS_DIR}
cd *
cd smo

 replaceEnvVariable  "${PWD}/oam/.env"

echo "############################################################################### "
echo "#  Bring Up The Platform  Service:: "
echo "############################################################################### "

cd platform
docker-compose down
sleep 1
docker-compose  up -d

echo "############################################################################### "
echo "#  WAIT FOR SOME TIME 60 Sec: Before Bring Up EMS Service "
echo "#  Bring Up The EMS  Service:: "
echo "############################################################################### "
sleep 60

cd  ./../oam
docker-compose down
echo " "
echo " Bringing Up The EMS Services "
docker-compose  up -d

popd

  echo " ##################################################################### "
  echo " #                "
  echo " # WAIT FOR 30 SECONDS BEFORE CHECKING FOR STATUS of EMS SERVICES #### "
  echo " #                "
  echo " # #################################################################  #"
  sleep 60

  checkForContainerServices
  ret=$?
  if [[ $ret -eq  1 ]];then
       echo " ##################################################################### "
       echo " # ERROR:                                                              "
       echo " #        EMS : SERVICES : FAIL :                                      "
       echo " #        EMS : SERVICES : INSTALLATION FAILED                         "
       echo " # ##################################################################  "
       
       #sendVESFailInstallEvent  "FAILED TO BRING : EMS SERVICES"  $lIp
       ## TODO : INFORM USER ABOUT FAILURE
       exit 1
  else
       echo " ##################################################################### "
       echo " # SUCCESS:                                                            "
       echo " #        EMS : SERVICES : SUCCESS :                                   "
       echo " #        EMS : SERVICES : INSTALLATION DONE                           "
       echo " #                                                                     "
       echo " # #################################################################  #"
       
       ####
       ## Copy the ENV File to Back up
       ####
       cp  "${emstargetdir}/exec/smo/oam/.env"  "${emstargetdir}/exec/smo/oam/.env_base"
       getPkgInfo "${emstargetdir}/exec/smo/oam/.env"
       insertDefaultEMSCredentials ${ENV_IP} 
       sendVESEvent "Success" $lIp "EMS Installation Success ${NEW_PKG_INFO}"
  fi



}

function upgradernEms()
{

 lIp=$1
 echo " # ==================================================== "
 echo " # INITIATED UPGRADE With ENV: ${rn_ems_bin} "
 echo " # TARGET DIR: ${TARGET_EMS_DIR} "
 echo " # ENV FILE : ${rn_ems_bin} "
 echo " # ==================================================== "

     replaceEnvVariable  ${rn_ems_bin}
pushd ${TARGET_EMS_DIR}
   
  cd *
  cd smo/oam
  cp ${rn_ems_bin}  .

  echo " Bringing down the existing Image  FROM: ${TARGET_EMS_DIR}"
  docker-compose down

  echo " Bringing UP EMS Services  FROM: ${TARGET_EMS_DIR}"
  echo " ENV FILE: ${rn_ems_bin}"
  docker-compose  --env-file  "${rn_ems_bin}"  up  -d

popd
  checkForContainerServices
  ret=$?
  if [[ $ret -eq  1 ]];then
       echo " ##################################################################### "
       echo " # ERROR:                                                              "
       echo " #        EMS : SERVICES : FAIL :                                      "
       echo " #        EMS : SERVICES : UPGRADATION  FAILED                         "
       echo " # ##################################################################  "
       
       sendVESEvent "Failure" $lIp "Upgrade Error"
       fallBackToPrevRelease  $lIp  ${emstargetdir} 
  else
       echo " ##################################################################### "
       echo " # SUCCESS:                                                            "
       echo " #        EMS : SERVICES : SUCCESS :                                   "
       echo " #        EMS : SERVICES : INSTALLATION DONE                           "
       echo " #                                                                     "
       echo " # #################################################################  #"
       
       ####
       ## Copy the ENV File to Back up
       ####
       getPkgInfo "${rn_ems_bin}"
       newName=".env_${NEW_PKG_INFO}"
       cp  "${rn_ems_bin}"  "${emstargetdir}/smo/oam/${newName}"
       cp  "${rn_ems_bin}"  "${emstargetdir}/smo/oam/.env"

      sendVESEvent "Success" $lIp "Upgrade SUccess"
   fi
}


function rnEmsupdeploy()
{
   lhost=$1
   installType=$2

      if [[ ${installType} == "new" ]];then

        if [[ "${rn_ems_bin}"  =~  ".tar.gz" ]];then
            echo " ##################################################################### "
            echo " #  Input Install: ${rn_ems_bin}                                       "
            echo " #  Target Dir   : ${emstargetdir}                                       "
            echo " ##################################################################### "
           freshInstallrnEms $lhost
        else
            echo " ##################################################################### "
            echo " # Invalid Input Install: ${rn_ems_bin}                                "
            echo " # ${rn_ems_bin} : Wrong Format                                        "
            echo " ##################################################################### "
	    Help
	    exit 1
        fi

      elif [[ ${installType} == "up" ]];then
        if [[ -f ${rn_ems_bin} ]];then
            echo " ##################################################################### "
            echo " #  EMS Upgrade Version: ${rn_ems_bin}                                 "
            echo " #  Target Dir   : ${emstargetdir}                                     "
            echo " ##################################################################### "
            upgradernEms  $lhost
        else
            echo " ##################################################################### "
            echo " # Invalid Input For Upgrade: ${rn_ems_bin}                            "
            echo " # ${rn_ems_bin} : Wrong Format                                        "
            echo " ##################################################################### "
	    Help
	    exit 1
        fi
      else
            echo " ##################################################################### "
            echo " # Invalid Request For Upgrade / Install                               "
            echo " ##################################################################### "
	    Help
	    exit 1
      fi

}


function validateUpgradeParams()
{
   lIp=$1

   echo " ** Validating Upgrade Params  : $lIp  *** "
   echo " #==============================================================# "
   echo " # Docker Reg    : ${emsImgRegUrl} "
   echo " # Reg Login     : ${emsImgRegLn}  "
   echo " # reg Passwd    : ${emsImgRegPwd} "
   echo " # emstargetdir  : ${emstargetdir} "
   echo " # emsPkgFtpPath : ${emsPkgFtpPath}"
   echo " #==============================================================# "
   if [[ -z ${emsPkgFtpPath}  || -z  ${emstargetdir}  || -z ${emsImgRegLn} || -z ${emsImgRegPwd}  ]];then
       echo " #==============================================================#"
       echo " # Required Upgrade Params from Local  DB are INVALID           #"
       echo " #  INVALID PARAMS : FOR UPGRADE                                #"
       echo " #  UPGRADE PARAMS : ERROR                                      #"
       echo " #==============================================================#"
       #sendVESFailInstallEvent $lIp
       return 1
   fi

   return 0

}


function fetchEMSUpgradeParams()
{

   lhost=$1

   echo " # Fetching : EMS Upgrade Params From Local Host: $lhost "
   esearch=$(curl localhost:9200)
   if [[ -z $esearch ]];then
       echo " ####################################################################### "
       echo " # EMS DOCKER SERVICES: ELASTIC DB SERVICE CANNOT FIND                   "
       echo " #  ERROR:  CANNOT FIND ELASTIC DB Service $lhost:9200 In Local Host     "
       echo " #  ERROR:  CANNOT FIND REQ UPGRADE PARAMS: from DB                      "
       echo " ####################################################################### "
       exit 1
   fi

   response=$(curl -s -o /dev/null -w '%{http_code}' -X GET "http://localhost:9200/_cat/indices/ems_credentials?format=json")
   if [ "$response" -eq 200 ]; then
      echo "# ---------------------------------------------------  "
      echo "# LOCAL DB IP : ${lhost}:9200 "
      echo "# EMS: Service : Successfull In Getting Upgrade Params "
      echo "# ---------------------------------------------------  "
   else
      echo "# ---------------------------------------------------  "
      echo "#  EMS: Service : Local DB Empty.                      "
      echo "#  Fill With Default Params:                           "
      curl -X PUT "http://localhost:9200/ems_credentials"
     insertDefaultEMSCredentials ${lhost}
  fi

  fetchEmsUpgServiceParams ${lhost}
 
}





if [[ $# -eq  0 ]];then

#########################################################
##   0 - NONE PARAMS means
##   UPGRADE PROCEDURE
########################################################

   fetchEMSUpgradeParams $lhost
   validateUpgradeParams $lhost
   ret=$?
   if [[ ret -ne 0 ]];then
      sendVESEvent "Failure" $lIp "Upgrade Failure"
      exit 1
   fi
   intype="up"
   rn_ems_bin=${emsPkgFtpPath}
   TARGET_EMS_DIR=${emstargetdir}

else

#########################################################
##  FRESH INSTALLATION PROCEDURE
##  INSTALLATION - DAY ZERO CONFIGURATION
########################################################
   validateInstallParams $lhost
   intype="new"
    
   #####
   ## Assign the Variable value for Fresh Install
   ####
   emsImgRegUrl=${DOCK_IMG_REG_URL}
   emsImgRegLn=${DOCK_LOGIN}
   emsImgRegPwd=${DOCK_PASSWD}
   emstargetdir=${TARGET_EMS_DIR}
   emsPkgFtpPath=${EMS_FTP_PATH}
   echo " #==============================================================# "
   echo " # Docker Reg    : ${emsImgRegUrl} "
   echo " # Reg Login     : ${emsImgRegLn}  "
   echo " # reg Passwd    : ${emsImgRegPwd} "
   echo " # emstargetdir  : ${emstargetdir} "
   echo " # emsPkgFtpPath : ${emsPkgFtpPath}"
   echo " #==============================================================# "
fi
   validateRnEMSEnvironment $lhost

   rnEmsupdeploy $lhost $intype 
