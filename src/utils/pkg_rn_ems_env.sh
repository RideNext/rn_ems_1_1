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
##
#######################################################################

REQ_PAR1=2
REQ_PAR2=3

EX_DIR=${1}
VERENV_FILE=${2}
IN_TYPE=${3,,}

# Get the parent process name
parent_process_name=$(ps -o comm= -p $PPID)

# Check if the parent process is a shell (user invoked)
if [[ "$parent_process_name" == "bash" || "$parent_process_name" == "zsh" ]]; then
     echo " ## Craete the Logs for Packaging: "
     log_time=$(date +%Y%m%d_%H%M%S%Z)
     pkgLg="ems_pkg_log_${log_time}"
     exec > >(tee -a "$pkgLg") 2>&1
else
    echo " ## The script is invoked by Utility Script: Log would initiated by Parent Script."
fi




TMP_DIR="./env-rn-ems-tmp"
DST_DIR=""
UTIL_DIR=""

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

DFC_IMAGE_NAME="DFC_IMAGE"
DFC_IMAGE_VER=""
DFC_IMAGE_ID=""

NBI_IMAGE_NAME="NBI_IMAGE"
NBI_IMAGE_VER=""
NBI_IMAGE_ID=""



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

MYSQL_IMAGE_NAME="MYSQL_IMAGE"
MYSQL_IMAGE_VER=""

REDPANDA_IMAGE_NAME="REDPANDA_IMAGE"
REDPANDA_IMAGE_VER=""

MINIO_IMAGE_NAME="MINIO_IMAGE"
MANIO_IMAGE_VER=""

IDENTITY_DB_IMG_NAME="IDENTITY_DB"




# Declare an associative array
declare -A platform_versions


###################################################
## Later when red-panda and minio required. Uncommnet this array
## and comment the other definition
##
##################################################
#platform_versions=(
    #["IDENTITY_IMAGE"]="bitnami/keycloak:18.0.2"
    #["PERSISTENCE_IMAGE"]="docker.elastic.co/elasticsearch/elasticsearch-oss:7.9.3"
    #["ZOOKEEPER_IMAGE"]="nexus3.onap.org:10001/onap/dmaap/zookeeper:6.0.3"
    #["KAFKA_IMAGE"]="nexus3.onap.org:10001/onap/dmaap/kafka111:1.0.4"
    #["DMAAP_IMAGE"]="nexus3.onap.org:10001/onap/dmaap/dmaap-mr:1.1.18"
    #["REDPANDA_IMAGE"]="redpandadata/console:v2.2.3"
    #["MINIO_IMAGE"]="minio/minio:RELEASE.2024-07-16T23-46-41Z-cpuv1"
    #["IDENTITY_DB"]="bitnami/postgresql:13"
#)
platform_versions=(
    ["IDENTITY_IMAGE"]="nms-artifactory.tejasnetworks.com/tej-ems/keycloak:18.0.2"
    ["PERSISTENCE_IMAGE"]="nms-artifactory.tejasnetworks.com/tej-ems/elasticsearch-oss:7.9.3"
    ["ZOOKEEPER_IMAGE"]="nms-artifactory.tejasnetworks.com/tej-ems/zookeper:6.0.3"
    ["KAFKA_IMAGE"]="nms-artifactory.tejasnetworks.com/tej-ems/kafka111:1.0.4"
    ["DMAAP_IMAGE"]="nms-artifactory.tejasnetworks.com/tej-ems/dmaap-mr:1.1.18"
    ["REDPANDA_IMAGE"]="nms-artifactory.tejasnetworks.com/tej-ems/redpandadata/console:v2.2.3"
    ["MINIO_IMAGE"]="nms-artifactory.tejasnetworks.com/tej-ems/minio:RELEASE.2024-07-16T23-46-41Z-cpuv1"
    ["IDENTITY_DB"]="nms-artifactory.tejasnetworks.com/tej-ems/postgresql:13"
)



#platform_versions=(
    #["IDENTITY_IMAGE"]="bitnami/keycloak:18.0.2"
    #["PERSISTENCE_IMAGE"]="docker.elastic.co/elasticsearch/elasticsearch-oss:7.9.3"
    #["ZOOKEEPER_IMAGE"]="nexus3.onap.org:10001/onap/dmaap/zookeeper:6.0.3"
    #["KAFKA_IMAGE"]="nexus3.onap.org:10001/onap/dmaap/kafka111:1.0.4"
    #["DMAAP_IMAGE"]="nexus3.onap.org:10001/onap/dmaap/dmaap-mr:1.1.18"
    #["IDENTITY_DB"]="bitnami/postgresql:13"
#)






function Help()
{
  echo " ----------------------------------------------------------------- "
  echo " $0: EMS Package Build Script:  Number of parameters required: 2 "
  echo "   first Param  :  rn-ems: EXE Dir "
  echo "   second Param :  Version Information Env File -  OAM:ENV File.Path "
  echo "   Third Param  :  New / upgrade : Fresh Installation or Upgrade        "
  echo " -------------------------------------------------------------------- "

}

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


smo_img_name=("SDNC_IMAGE"  "SDNC_WEB_IMAGE" "VES_COLLECTOR_IMAGE" "PERF_IMAGE" "DFC_IMAGE" "NBI_IMAGE")


if [[ $# -eq ${REQ_PAR1}  ||  $# -eq ${REQ_PAR2} ]]; then
    if [[ ! -d  ${EX_DIR} || ! -f "${VERENV_FILE}" ]];then
       
        echo " CHECK For Availability Of ::: "
        echo "	     : DIR: ${EX_DIR}  "
	echo "       : VERSION INFO ENV:  File : ${VERENV_FILE} " 
	Help
	exit 0
    fi
    echo " DIR: ${EX_DIR} : "
    echo " IMAGE VERSION INFO ENV: FILE: ${VERENV_FILE} "
    echo " INSTALLATION TYPE:  [ $IN_TYPE ] "
    if [[ -z ${IN_TYPE}  || ${IN_TYPE} == "new" ]];then
         IN_TYPE="new"
    elif [[ ${IN_TYPE} == "upgrade" ]];then
         IN_TYPE="upgrade"
    else
       echo " ## INVALID INSTALL OPTION :: ${INTYPE} ## "	  
       echo " ## VALID INSTALLATION TYPE:  new / upgrade ## "
       echo " ############################################# "
       echo " "
       Help
       exit 0
    fi
    echo " "

    echo " ## Validate FILE: ${VERENV_FILE} For Version Information ## "
    for imgname  in "${smo_img_name[@]}"; do

       if grep  -q "${imgname}" ${VERENV_FILE} ; then
       # Success Case; found Required SMO Image
       :
       else

        echo "#  FILE: ${VERENV_FILE} : ERROR "
	echo "#     ::: ${imgname} Version Unavaibale "
	exit 0
       fi

    done
    echo " ## Validation == Success: == ${VERENV_FILE} Version Information ## "
    echo " "

    UTIL_DIR="${EX_DIR}/../src/utils"
    if [[ ! -d ${UTIL_DIR} ]];then
       echo " ################################################### "
       echo " ## ---------- NOT FINDING UTILS DIR ------------ ## "
       echo " ## PKG SCRIPT EXPECTS SRC DIR ALONG WITH EXEC DIR:  ## "
       echo " ## EXE DIR : ${EX_DIR} "
       echo " ######### EMS - PACKAGING FAILED ################## "
       exit 0
    fi

    if [[ ! -f "${UTIL_DIR}/rn_ems_install_dependency.sh"  || ! -f  "${UTIL_DIR}/rn_ems_setup.sh" ]];then
       echo " ################################################### "
       echo " ## ---------- NOT FINDING SCRIPTS IN  UTILS DIR ------------ ## "
       echo " ## PACKAGING  SCRIPT EXPECTS INSATLL SCRIPTS :     ## "
       echo " ## UTIL DIR : ${UTIL_DIR} "
       echo " ######### EMS - PACKAGING FAILED ################## "
       exit 0
    fi


else
    echo " Wrong Input: $0"
    Help
    exit 0
fi

function cleanupTmpFldr()
{
    echo " ############################################################ # "
    echo " #  Cleanup The Tmp Folder ${PWD}/${TMP_DIR}"
    echo "  "
    if [[ -d "${PWD}/${TMP_DIR}" ]];then
      echo " #  Deleting the TMP DIR For rn-ems    #"
      rm -rf  "${PWD}/${TMP_DIR}"
    fi
      echo " #  Creating  TMP DIR For rn-ems: ENV :${PWD}/${TMP_DIR}  #"
      DST_DIR="${PWD}/${TMP_DIR}"
      mkdir -p "${DST_DIR}"

    echo " ############################################################ # "
}


function  imagefindError()
{
   imgName=$1
   imgVersion=$2
   
   echo " "
   echo "############################################################ # "
   echo "## DOCKER IMAGE INVALID VERSION:                             # "
   echo "## IMAGE: ERROR:  ${imgName} : ${imgVersion}                 # "
   echo "## DOCKER IMAGE ISSUE : UN-AVAILABILITY                      # "
   echo "## EMS IMAGE PACKAGE BUILD ERROR:::                          # "
   echo "############################################################ # "
   echo " "

}


function  readOamEnv()
{

  echo " ## ................................................. ## "
  echo " ## Reading the ENV File: ${VERENV_FILE}              ## "
  echo " ## ................................................. ## "

  echo " "
  echo " ## ......   SMO-OAM IMAGE PKG: INITIATED      ..... ##"
  echo " ## ...................................................... ##"

  while read -r LINE; do

    if [[ $LINE == *'='* ]] && [[ $LINE != '#'* ]]; then
      cmpName=""
	
      if [[ ${LINE}  =~ "${SDNC_IMAGE_NAME}" ]];then
	      SDNC_DKR_VER=$(echo "${LINE}" | cut -d "=" -f2)
	      echo " ##  PACKAGING SDNR VER: $SDNC_DKR_VER"
	      sdnr_dk=$( docker image ls ${SDNC_DKR_VER} | sed -n '2p')
	      if [[  -z ${sdnr_dk} ]];then
	         echo " SDNR: IMAGE ERROR: ${SDNC_DKR_VER}  "
	         imagefindError ${SDNC_IMAGE_NAME}  ${SDNC_DKR_VER}
	         exit 0
	      fi
	      #echo ""
	      echo " #  ${sdnr_dk}"
	      #echo ""
	      echo " #  Compressing:SDNR:Img: $SDNC_DKR_VER "
              docker  save -o  "${DST_DIR}/sdnr_img.tar.gz"  "$SDNC_DKR_VER"
              echo " # .................. : sdnr_img.tar.gz : ......................... ##"
	      echo " ##################################################################### "
	      echo " "
      fi
      if [[ ${LINE}  =~ "${SDNC_WEB_IMAGE_NAME}" ]];then
	      SDNC_WEB_DKR_VER=$(echo "${LINE}" | cut -d "=" -f2)
	      echo " ## PACKAGING  SDNC WEB VER: $SDNC_WEB_DKR_VER"
	      sdnc_dk=$( docker image ls ${SDNC_WEB_DKR_VER} | sed -n '2p')
	      if [[  -z ${sdnc_dk} ]];then
	         echo " ##  SDNC-WEB: IMAGE ERROR: ${SDNC_WEB_DKR_VER}  "
	         imagefindError ${SDNC_WEB_DKR_VER}  ${SDNC_WEB_DKR_VER}
	         exit 0
	      fi
	      #echo ""
	      echo " # ${sdnc_dk}"
	      #echo ""
	      echo " #  Compressing:SDNC WEB:Img: $SDNC_WEB_DKR_VER "
              docker  save -o  "${DST_DIR}/sdnc_web_img.tar.gz"  "$SDNC_WEB_DKR_VER"
              echo " # ....................: sdnc_web_img.tar.gz :..................... ##"
	      echo " ##################################################################### "
	      echo " "
      fi
      if [[ ${LINE}  =~ "${VES_COLLECTOR_IMAGE_NAME}" ]];then
	      VES_DKR_VER=$(echo "${LINE}" | cut -d "=" -f2)
	      echo " ## PACKAGING  VES COLLECTOR VER: $VES_DKR_VER"
	      ves_dk=$( docker image ls ${VES_DKR_VER} | sed -n '2p')
	      if [[  -z ${ves_dk} ]];then
	         echo " ##  VES-COLLECTOR: IMAGE ERROR: ${VES_COLLECTOR_IMAGE_NAME}  "
	         imagefindError ${VES_DKR_VER}  ${VES_COLLECTOR_IMAGE_NAME}
	         exit 0
	      fi
	      #echo ""
	      echo " # ${ves_dk}"
	      #echo ""
	      echo " #  Compressing:VES COLLECTOR:Img: $VES_DKR_VER "
              docker  save -o  "${DST_DIR}/ves_coll_img.tar.gz"  "$VES_DKR_VER"
              echo " # ................... : ves_coll_img.tar.gz : ................... ##"
	      echo " ##################################################################### "
	      echo " "
      fi
      if [[ ${LINE}  =~ "${PERF_IMAGE_NAME}" ]];then
	      PERF_DKR_VER=$(echo "${LINE}" | cut -d "=" -f2)
	      echo " ## PACKAGING  PERF DOCKER VER: $PERF_DKR_VER"
	      perf_dk=$( docker image ls ${PERF_DKR_VER} | sed -n '2p')
	      if [[  -z ${perf_dk} ]];then
	         echo " #  PERF-MONITOR: IMAGE ERROR: ${PERF_IMAGE_NAME}  "
	         imagefindError ${PERF_DKR_VER}  ${PERF_IMAGE_NAME}
	         exit 0
	      fi
	      #echo ""
	      echo " # ${perf_dk}"
	      #echo " "
	      echo " # Compressing:PERF-MONITOR:Img: $PERF_DKR_VER "
              docker  save -o  "${DST_DIR}/perf_mon_img.tar.gz"  "$PERF_DKR_VER"
              echo " # ............... : perf_mon_img.tar.gz : ........................ ##"
	      echo " ##################################################################### "
	      echo " "
      fi
      if [[ ${LINE}  =~ "${DFC_IMAGE_NAME}" ]];then
	      DFC_IMAGE_VER=$(echo "${LINE}" | cut -d "=" -f2)
	      echo " ## PACKAGING DFC DOCKER VER: $DFC_IMAGE_VER"
	      dfc_dk=$( docker image ls ${DFC_IMAGE_VER} | sed -n '2p')
	      if [[  -z ${dfc_dk} ]];then
	         echo " DFC: IMAGE ERROR: ${DFC_IMAGE_NAME}  "
	         imagefindError ${DFC_IMAGE_VER}  ${DFC_IMAGE_NAME}
	         exit 0
	      fi
	      #echo ""
	      echo " # ${dfc_dk}"
	      #echo " "
	      echo " #  Compressing: DFC :Img: $DFC_IMAGE_VER "
              docker  save -o  "${DST_DIR}/dfc_img.tar.gz"  "$DFC_IMAGE_VER"
              echo " # ..................: dfc_img.tar.gz : ........................ ##"
	      echo " ##################################################################### "
	      echo " "
      fi
      if [[ ${LINE}  =~ "${NBI_IMAGE_NAME}" ]];then
	      NBI_IMAGE_VER=$(echo "${LINE}" | cut -d "=" -f2)
	      echo " ## NBI DOCKER VER: $NBI_IMAGE_VER"
	      nbi_dk=$( docker image ls ${NBI_IMAGE_VER} | sed -n '2p')
	      if [[  -z ${nbi_dk} ]];then
	         echo " NBI: IMAGE ERROR: ${NBI_IMAGE_NAME}  "
	         imagefindError ${NBI_IMAGE_VER}  ${NBI_IMAGE_NAME}
	         exit 0
	      fi
	      #echo ""
	      echo " # ${nbi_dk}"
	      #echo " "
	      echo " #  Compressing: NBI :Img: $NBI_IMAGE_VER "
              docker  save -o  "${DST_DIR}/nbi_img.tar.gz"  "$NBI_IMAGE_VER"
              echo " # ................ : nbi_img.tar.gz :...................... ##"
	      echo " ##################################################################### "
	      echo " "
      fi

      ENV_VAR="$(echo $LINE | envsubst)"
      eval "declare $ENV_VAR"

    fi
    #echo " "
  done < "${VERENV_FILE}"


}





function  readPlatformEnv()
{

 echo " ## ........................................................ ##"
 echo " ##  Platform Images:  Versions: To be Packaged              ##"
 echo " ## ........................................................ ##"
 echo " "

 for image in "${!platform_versions[@]}"; do
    printf " # %10s : %s \n" $image ${platform_versions[$image]}
 done
 echo " "
 echo " ## ......   PLATFORM IMAGE PKG: INITIATED      ..... ##"
 echo " "

 for image in "${!platform_versions[@]}"; do
      cmpName=""
      if [[ ${image}  =~ "${IDENTITY_SRV_NAME}" ]];then

	  IDENTITY_SRV_VER=${platform_versions[$image]}
	  echo " # Identity:Keyclock Img   VER: $IDENTITY_SRV_VER"
	  ident_dk=$( docker image ls ${IDENTITY_SRV_VER} | sed -n '2p')
	  if [[  -z ${ident_dk} ]];then
	     echo " # KEYCLOCK: IMAGE ERROR: ${IDENTITY_SRV_VER}  "
	     imagefindError ${image} ${IDENTITY_SRV_VER}
	     exit 0
	  fi
	  echo " #  ${ident_dk}"
	  echo " # Compressing:Identity Server:Img: $IDENTITY_SRV_VER "
          docker  save -o  "${DST_DIR}/identity_keyclock_img.tar.gz"  "$IDENTITY_SRV_VER"
	  cmpName=identity_keyclock_img.tar.gz
      elif [[ ${image}  =~ "${PERSISTANCE_IMG_NAME}" ]];then

	  PERSISTANCE_IMG_VER=${platform_versions[$image]}
	  echo " # PERSISTANCE IMAGE  VER: $PERSISTANCE_IMG_VER"
	  pers_dk=$( docker image ls ${PERSISTANCE_IMG_VER} | sed -n '2p')
	  if [[  -z ${pers_dk} ]];then
	     echo " SDNR-Database: Elastic:ERROR:  ${PERSISTANCE_IMG_VER}  "
	     imagefindError ${image} ${PERSISTANCE_IMG_VER}
	     exit 0
	  fi
	  echo " #  ${pers_dk}"
	  echo " # Compressing:Database: Elastic :Img: $PERSISTANCE_IMG_VER "
          docker  save -o  "${DST_DIR}/persistance_plat_img.tar.gz"  "$PERSISTANCE_IMG_VER"
	  cmpName=persistance_plat_img.tar.gz
      elif [[ ${image}  =~ "${ZOO_KEEPER_IMAE_NAME}" ]];then
	  ZOO_KEEPER_IMAE_VER=${platform_versions[$image]}
	  echo " # ZOO KEEPER IMAGE  VER: $ZOO_KEEPER_IMAE_VER"
	  zoo_keep_dk=$( docker image ls ${ZOO_KEEPER_IMAE_VER} | sed -n '2p')
	  if [[  -z ${zoo_keep_dk} ]];then
	     echo " ZOO KEEPER IMAGE VERSION:  ${ZOO_KEEPER_IMAE_VER}  "
	     imagefindError ${image} ${ZOO_KEEPER_IMAE_VER}
	     exit 0
	  fi
	  echo " #  ${zoo_keep_dk}"
          echo " #  Compressing:Zoo Keeper Server:Img: $ZOO_KEEPER_IMAE_VER "
          docker  save -o  "${DST_DIR}/zoo_keeper_plat_img.tar.gz"  "$ZOO_KEEPER_IMAE_VER"
	  cmpName=zoo_keeper_plat_img.tar.gz
      elif [[ ${image}  =~ "${KAFKA_IMAGE_NAME}" ]];then
	  KAFKA_IMAGE_VER=${platform_versions[$image]}
	  echo " # KAFKA  IMAGE  VER: $KAFKA_IMAGE_VER"
          kafka_dk=$( docker image ls ${KAFKA_IMAGE_VER} | sed -n '2p')
	  if [[  -z ${kafka_dk} ]];then
	     echo " KAFKA IMAGE VERSION:  ${KAFKA_IMAGE_VER}  "
	     imagefindError ${image} ${KAFKA_IMAGE_VER}
	     exit 0
	  fi
	  echo " #  ${kafka_dk}"
	  echo " # Compressing:Kafka Server:Img: $KAFKA_IMAGE_VER "
          docker  save -o  "${DST_DIR}/kafka_plat_img.tar.gz"  "$KAFKA_IMAGE_VER"
	  cmpName=kafka_plat_img.tar.gz
      elif [[ ${image}  =~ "${DMAAP_IMAGE_NAME}" ]];then
	   DMAAP_IMAGE_VER=${platform_versions[$image]}
	   echo " # DMAP IMAGE  VER: $DMAAP_IMAGE_VER"
	   dmap_dk=$( docker image ls ${DMAAP_IMAGE_VER} | sed -n '2p')
	  if [[  -z ${dmap_dk} ]];then
	     echo " DMAAP IMAGE VERSION:  ${DMAAP_IMAGE_VER}  "
	     imagefindError ${image} ${DMAAP_IMAGE_VER}
	     exit 0
	  fi
	  echo " #  ${dmap_dk}"
	  echo " #  Compressing:DMAAP Server:Img: $DMAAP_IMAGE_VER "
          docker  save -o  "${DST_DIR}/dmap_plat_img.tar.gz"  "$DMAAP_IMAGE_VER"
	  cmpName=dmap_plat_img.tar.gz
      elif [[ ${image}  =~ "${REDPANDA_IMAGE_NAME}" ]];then
	   REDPANDA_IMAGE_VER=${platform_versions[$image]}
	   echo " # REDPANDA IMAGE  VER: $REDPANDA_IMAGE_VER"
	   redp_dk=$( docker image ls ${REDPANDA_IMAGE_VER} | sed -n '2p')
	  if [[  -z ${redp_dk} ]];then
	     echo " #  REDPANDA IMAGE VERSION:  ${REDPANDA_IMAGE_VER}  "
	     imagefindError ${image} ${REDPANDA_IMAGE_VER}
	     exit 0
	  fi
	  echo " # ${redp_dk}"
	  echo " ##  Compressing: RED PANDA :Img: $REDPANDA_IMAGE_VER "
          docker  save -o  "${DST_DIR}/readpanda_img.tar.gz"  "$REDPANDA_IMAGE_VER"
	  cmpName=readpanda_img.tar.gz
      elif [[ ${image}  =~ "${MINIO_IMAGE_NAME}" ]];then
	   MINIO_IMAGE_VER=${platform_versions[$image]}
	   echo " ##  MINIO IMAGE  VER: $MINIO_IMAGE_VER"
	   minio_dk=$( docker image ls ${MINIO_IMAGE_VER} | sed -n '2p')
	  if [[  -z ${minio_dk} ]];then
	     echo " MINIO IMAGE VERSION:  ${MINIO_IMAGE_VER}  "
	     imagefindError ${image} ${MINIO_IMAGE_VER}
	     exit 0
	  fi
	  echo " #  ${minio_dk}"
	  echo " #  Compressing: MINIO :Img: $MINIO_IMAGE_VER "
          docker  save -o  "${DST_DIR}/minio_img.tar.gz"  "$MINIO_IMAGE_VER"
	  cmpName=minio_img.tar.gz
      elif [[ ${image}  =~ "${IDENTITY_DB_IMG_NAME}" ]];then
	   IDENTITY_DB_IMAGE_VER=${platform_versions[$image]}
	   echo " ##  IDENTITY-DB IMAGE  VER: $IDENTITY_DB_IMAGE_VER"
	   identity_db_dk=$( docker image ls ${IDENTITY_DB_IMAGE_VER} | sed -n '2p')
	  if [[  -z ${identity_db_dk} ]];then
	     echo " # IDENTITY-DB IMAGE VERSION:  ${IDENTITY_DB_IMAGE_VER}  "
	     imagefindError ${image} ${IDENTITY_DB_IMAGE_VER}
	     exit 0
	  fi
	  echo " #  ${identity_db_dk}"
	  echo " #  Compressing: IDENTITY-DB :Img: $IDENTITY_DB_IMAGE_VER "
          docker  save -o  "${DST_DIR}/identity_db_img.tar.gz"  "$IDENTITY_DB_IMAGE_VER"
	  cmpName=identity_db_img.tar.gz
      else
         echo "#  ==================================== "
	 echo "# Unknow Image : "
	 echo "# $image  === >    ${platform_versions[$image]}  "
	 echo "#  IGNORE : "
         echo "#  ==================================== "

      fi
      echo " ##              ${image}: PKG:COMPLETED: ${cmpName}          ##"
      echo " "
 done

 echo " ###############  PLATFORM IMAGES : PKG:COMPLETED  ##################"

}



function updateSmoImageParams()
{
     echo " ####  Packaging SMO Images : #### "
     echo " "
     if [[ ${IN_TYPE} == "new" ]];then
         echo " #######   EMS: PACKAGE: SMO-PLATFORM-IMAGES  ########## "
         readPlatformEnv
     fi
     echo " "
     echo " ########   PACKAGE: SMO-OAM-IMAGES:    ########### "
     readOamEnv

}


function updateExecDir()
{
  timestamp=$(date +"%B-%d-%H-%M-%S")
  echo " ##  --------------------------------------- ##"
  echo " ## Include EXE DIRECTORY:  ## "
  echo " ##  Compressing EXEC DIR: $EX_DIR"

  MYDIR=${PWD}
pushd ${EX_DIR}
  # Go one level back
  echo " ## Removing the: Temp Files from Persistance ## "
  rm -rf   "./exec/smo/platform/persistence/esearch/nodes"
  rm -rf   "./exec/smo/platform/persistence/config-files"

  cd ..
     if [[ ${IN_TYPE} == "new" ]];then
         echo " ## COMPRESSING EXE DIRECTORY: INCLUDING OAM AND PLATFORM ## "
         tar -cvf "${DST_DIR}/exec.tar.gz"  "exec/."
     else
         echo " ## COMPRESSING EXE DIRECTORY: INCLUDING OAM ## "
         #tar -cvf "${DST_DIR}/exec.tar.gz"  "exec/smo/oam/."
	 tar -czvf "${DST_DIR}/exec.tar.gz" exec/smo/oam/. exec/smo/platform/docker-compose.yml exec/utils/.
     fi
  if [ $? -eq 0 ]; then
    echo " ## EXE : PACKAGING ...  SUCCESS:  !"
  else
    echo " ## EXE : PACKAGING ... FAILED:  !"
    exit 0
  fi
    echo " ## COPYING INSTALL SCRIPTS:   !"
    mkdir -p "${DST_DIR}/scripts"
    cp -arf  "${UTIL_DIR}/rn_ems_install_dependency.sh"  "${DST_DIR}/scripts/"  
    cp -arf  "${UTIL_DIR}/rn_ems_setup.sh" "${DST_DIR}/scripts/"
popd

  # Go Back TO Org Dir
  cd ${MYDIR}

  echo " ##  --------------------------------------- ##"
  echo " ##  --------------------------------------- ##"

     if [[ ${IN_TYPE} == "new" ]];then

           if [[ -f "/usr/local/bin/docker-compose" ]];then
              cp -arf "/usr/local/bin/docker-compose"  ${TMP_DIR}/
           elif [[ -f "/usr/bin/docker-compose" ]];then
              cp -arf "/usr/bin/docker-compose"  ${TMP_DIR}/
           else
              echo " ## ----------------------------------------------- ## "
              echo " ## CANNOT FIND: docker-compose : exec   ##"
              echo " ## ----------------------------------------------- ## "
              echo " ##  EMS: PACKAGING ERROR:  ############### "
              exit 1
           fi
     fi

  MY_DIR=${PWD}
  pushd ${DST_DIR}
  version=`cat ${UTIL_DIR}/nextVersion.txt`
  echo " ##  ======= Building Final TAR Distrubtion PKG :  ===== ##"
  echo " ##                                                      ##"
  cd ..
     if [[ ${IN_TYPE} == "new" ]];then
	echo " ## Compressing the EMS-New Install Pacakge into Tar.gz format ## "
        tar -cvf  "RN_EMS_PKG_${timestamp}_NewInstall.tar.gz"    ${TMP_DIR}
    #    mv "RN_EMS_PKG_${timestamp}_NewInstall.tar.gz"   "${MY_DIR}/"
	#pkgName="RN_EMS_PKG_${timestamp}_NewInstall.tar.gz"
	mv "RN_EMS_PKG_${timestamp}_NewInstall.tar.gz"   "${MY_DIR}/EMS_5GN_${version}.tar.gz"
        pkgName="EMS_5GN_${version}.tar.gz"
     else
	echo " ## Compressing the EMS-Upgrade Pacakge into Tar.gz format ## "
        tar -cvf  "RN_EMS_PKG_${timestamp}_Upgrade.tar.gz"    ${TMP_DIR}
	#mv "RN_EMS_PKG_${timestamp}_Upgrade.tar.gz"   "${MY_DIR}/"
	#pkgName="RN_EMS_PKG_${timestamp}_Upgrade.tar.gz"
	mv "RN_EMS_PKG_${timestamp}_Upgrade.tar.gz"   "${MY_DIR}/EMS_5GU_${version}.tar.gz"
        pkgName="EMS_5GU_${version}.tar.gz"
     fi
  echo " # CLEANING DIR: ${TMP_DIR} "
  rm   -rf   ${TMP_DIR}
  popd

  cd ${MY_DIR}

  echo " "
  echo " ############################################################################### "
  echo " ##  ======= Building SUCCESS EMS PKG :  ${pkgName} =====  ##"
  echo " ##  EMS PKG AVAILABLE IN ${MY_DIR}/${pkgName}  ##"
  echo " ############################################################################### "
}



cleanupTmpFldr
updateSmoImageParams
if [ $? -eq 0 ]; then
    echo " SMO: EMS : PACKAGE ... SUCCESS:  !"
else
    echo " SMO: EMS : PACKAGE ... FAILED:  !"
    exit 0
fi
updateExecDir
