#!/bin/bash

#set -x

##################################################################################
#                                                                                #
# Copyright (C) 2024 RideNext Software Solutions. Pvt Ltd.  All rights reserved" #
#                                                                                #
##################################################################################


######################################################################################################
##   rn_ems_install_utils: script supports following functionality:
##
##   rn_ems_install_dependency.sh : Installs the OS Environment : utilities
##                                : required for EMS . 
##
##   pkg_rn_ems_env.sh  :  prepares or builds a EMS package in compressed format  
##                      :  resultatnt compressed file contains both platform and oam docker images
##
##   rn_ems_setup.sh    : Install the EMS package to specific destination directory
##
##   pkg_rn_ems_env.sh  : Script used for Packaging-EMS Binaries
##
#######################################################################################################


IN_ARGS=1
#IMAGE_TAR=$1
IMAGE_TAR=$(eval echo "$1")


CUR_WRK_DIR=${PWD}
CUR_EMS_DIR=""
EMS_PREV_REL="emsPrevRelArch"
WAIT_SEC=2
TAR_PASSWD=""

log_time=$(date +%Y%m%d_%H%M%S%Z)
utilLg="ems_install_utility_log_${log_time}"
exec > >(tee -a "$utilLg") 2>&1


declare -a oam=("sdnc-web" "sdnr" "ves-collector" "perf-monitor"  "dfc")

declare -a platform=("identity" "identitydb" "persistence"  "zookeeper"  "kafka"  "onap-dmaap"  "minio-server" )

declare -a relarray

function Help() {
 
      echo " ####################################################################################### "
      echo " ## $0: INPUT OPTIONS:   ##"
      echo " ##                  : EXPECTS EMS PKG FILE IN tar.gz Format (Optional)                ## "
      echo " ##                                                                                    ## "
      echo " ##                  : EMS Package Input : User can execute Upgrade and Fresh Install  ## "
      echo " ##                  : With NONE Input   : User Can Execute Downgrade Process Only     ## "
      echo " ######################################################################################## "
      exit 0

 }

if [[ $# -eq ${IN_ARGS} ]]; then
      echo " "
  if [[ -f  ${IMAGE_TAR} && "${IMAGE_TAR}" == *.tar.gz  ]];then
      echo " ##################################################### "
      echo " ##  EMS PKG FILE: ${IMAGE_TAR} "
      echo " ##  Options:  ##" 
      echo " ##################################################### "
      echo " "
  else
      echo " ##  EMS PKG FILE: ${IMAGE_TAR} : NONE "
      Help
  fi

else
      echo " ##  ====  :$0: EXPECTS EMS PKG FILE FOR UPGRADE AND FRESH INSTALLATION ====  ## "
      echo " ##  EMS PKG FILE: ${IMAGE_TAR} : NONE "
      echo " ################################################################################ "
      echo " ## ====  REQUIRED EMS IMAGE PATH: FOR  UPGRADE AND INSTALL :PROCEDURE          ## "
      echo " ## ====                           FOR DOWNGRADE: CURRENT EMS LOCATION REQUIRED ## "
      echo " ################################################################################# "
      echo " "
      IMAGE_TAR=""
fi

function installError() {

    echo " "
    echo " ##################################################### "
    echo " ##  ${IMAGE_TAR}: ERROR  ##"
    echo " $0 : INSTALL CANNOT PROCEED: ## "
    echo " ##################################################### "
    exit 0
 }

function checkEnv()
{
  ## Check for Availability of  Scripts from tar.gz file
  inDepFile="rn_ems_install_dependency.sh"
  inPkgFile="rn_ems_setup.sh"


  if tar -tvf "$IMAGE_TAR" | grep  "$inDepFile"; then
    echo " # File $inDepFile found in $IMAGE_TAR"
  else
    echo " ### File $inDepFile not found in $IMAGE_TAR"
    echo " ### FILE NOT-FOUND ERROR: $inDepFile ###"
    echo " ### $IMAGE_TAR : PKG ERROR: ###"
    installError
  fi

  if tar -tvf "$IMAGE_TAR" | grep  "$inPkgFile"; then
    echo " # File $inPkgFile found in $IMAGE_TAR"
  else
    echo " ### File $inPkgFile not found in $IMAGE_TAR"
    echo " ### FILE NOT-FOUND ERROR: $inPkgFile ###"
    echo " ### $IMAGE_TAR : PKG ERROR: ###"
    installError
  fi
  echo " "

}


function displayEmsOamVersion()
{
   envPath=$1 ## .envFile
   ymlPath=$2 ## YmlFile

   if [[ ! -f ${envPath} ]];then
       echo " ###  OAM-ENV PATH : WRONG : $envPath ### "
       echo " CANNOT READ: ENVIRONMENT INFORMATION ## "
       return 1
   fi

   if [[ ! -f ${ymlPath} ]];then
       echo " ### OAM-YAML PATH : WRONG : $ymlPath ### "
       echo " CANNOT READ: YAML INFORMATION ## "
       return 1
   fi

  echo " ###  OAM-ENV PATH : $envPath ### "
  echo " ###  OAM-YAML PATH : $ymlPath ### "

  mapfile -t cont_match  < <(grep "container_name:" "$ymlPath")
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

  sdnr_str=$( grep "^SDNC_IMAGE" $envPath)
  sdnr_img=$(cut -d "=" -f2 <<< "${sdnr_str}")


  sdnr_ipstr=$(grep "^SDNR_IP_ADDRESS"  $envPath)
  sdnripval=$(cut -d "=" -f2 <<< "${sdnr_ipstr}")

  sdnc_str=$( grep "^SDNC_WEB_IMAGE"  $envPath)
  sdnc_img=$(cut -d "=" -f2 <<< "${sdnc_str}")

  ves_str=$( grep "^VES_COLLECTOR_IMAGE" $envPath)
  ves_img=$(cut -d "=" -f2 <<< "${ves_str}")

  perf_str=$( grep "^PERF_IMAGE" $envPath)
  perf_img=$(cut -d "=" -f2 <<< "${perf_str}")

  dfc_str=$( grep "^DFC_IMAGE"  $envPath)
  dfc_img=$(cut -d "=" -f2 <<< "${perf_str}")

  printf " %15s : %s  \n" "SDNR IP ADDRESS:"   "$sdnripval"
  echo   "-------------------------------------------------------------------"
  printf " %15s : %s  \n" "Image Name"  " Image Version"
  echo   "-------------------------------------------------------------------"
  printf " %15s : %s  \n" "$sdnr_img_name"  "$sdnr_img"
  printf " %15s : %s  \n" "$sdnc_img_name"  "$sdnc_img"
  printf " %15s : %s  \n" "$ves_img_name"   "$ves_img"
  printf " %15s : %s  \n" "$dfc_img_name"   "$dfc_img"
  printf " %15s : %s  \n" "$perf_img_name"  "$perf_img"
  printf " %15s : %s  \n" "$ves_img_name"   "$ves_img"
  echo   "-------------------------------------------------------------------"
  echo " "

 return 0

}



function displayEmsPlatformVersion()
{

   envPath=$1 ## .envFile
   ymlPath=$2 ## YmlFile

   if [[ ! -f ${envPath} ]];then
       echo " ###  PLATFORM-ENV PATH : WRONG : $envPath ### "
       echo " CANNOT READ: PLATFORM-ENVIRONMENT INFORMATION ## "
       return 1
   fi

   if [[ ! -f ${ymlPath} ]];then
       echo " ### PLATFORM-YAML PATH : WRONG : $ymlPath ### "
       echo " CANNOT READ: PLATFORM-YAML INFORMATION ## "
       return 1
   fi




}




function emsENVInstall() {

  MYWRKDIR=${PWD}
  echo " ############################################################### ##  "
  echo " ### USER : $(whoami) Has Initiated EMS ENV: INSTALLATION PWD: ${MYWRKDIR} #### "
  echo " ############################################################### ##  "
  echo " "
  
   if [[ -z ${IMAGE_TAR} ]];then

       echo " ############################################################### ##  "
       echo " ## Cannot Find Input Option EMS Package FILE:  "
       echo " ###  ==  PROVIDE PATH FOR EMS:PKG FILE: ===  ### "
       echo " ############################################################### ##  "
       echo " "
   fi

   read -p " ## Provide EMS Packge  path: " pak_path
   echo " ## CURRENT: EMS EXECUTION PATH:  $pak_path"
   echo " "
   if [[ ! -f $pak_path ]];then
       echo " ## EMS PACKAGE ERROR: CANNOT FIND FILE : $pak_path ## "
       echo " "
       installError 
   fi

   ## Validate the Package 

   IMAGE_TAR=${pak_path}
   checkEnv

  echo " ## EMS:ENVIRONMENT INSTALL INITIATED : ${MYWRKDIR} ##" 
  echo " FILE: $IMAGE_TAR"
  echo " REQUIRED UTILITY: rn_ems_install_dependency.sh "
  echo " "
  inDepFile="rn_ems_install_dependency.sh"
  fn=$( tar -tvf "$IMAGE_TAR" | grep  "$inDepFile" | rev | cut -d' ' -f1 | rev )
  echo " $fn"
  tar -xvf "$IMAGE_TAR" -C "$MYWRKDIR" "$fn"
  
pushd "${MYWRKDIR}/env-rn-ems-tmp/scripts"
      echo " ############################################ "
      echo " ###  INSTALATION NEEDS SUDO PERMISSION ### "

      ./rn_ems_install_dependency.sh
      sleep ${WAIT_SEC}
      rm -rf  "env-rn-ems-tmp"

      echo " ############################################ "

popd
echo "EMS Environment Installation Complete."
exit 0


}


function checkForEMSavail()
{


  echo " ## Make Sure, This system doesn't have active EMS Packages ### "
  echo " ## CHECK: Avialabilty of EMS: ## "

  for cont_name  in "${oam[@]}"
  do
   if docker inspect $cont_name > /dev/null 2>&1; then
    wrk_dir=$(docker inspect "$cont_name" | grep -oP '(?<="com.docker.compose.project.working_dir": ")[^"]*')
    echo " ##################################################### "
    printf " #  Container %10s: $cont_name   : UP:             ##  \n"
    printf " ##### WARNING : THIS SYSTEM CONTAINS ACTIVE EMS-OAM ##### \n"
    echo " ### CURRENT ACTIVE EMS WRK DIR: ${wrk_dir} ################  "
    echo " ### STOP CURRENT ACTIVE EMS: BEFORE INSTALLING NEW ONE #### "
    echo " ##################################################### "
    exit 1
   fi
  done


  for cont_name  in "${platform[@]}"
  do
   if docker inspect $cont_name > /dev/null 2>&1; then
    wrk_dir=$(docker inspect "$cont_name" | grep -oP '(?<="com.docker.compose.project.working_dir": ")[^"]*')
    echo " #####################################################"
    echo " #  Container $cont_name:   UP                      :"
    printf " ##### WARNING : THIS SYSTEM CONTAINS ACTIVE EMS-PLATFORM ##### \n"
    echo " ### CURRENT ACTIVE EMS WRK DIR: ${wrk_dir} ################  "
    echo " ### STOP CURRENT ACTIVE EMS: BEFORE INSTALLING NEW ONE #### "
    echo " ########################################################### "
    exit 1
   fi
  done

}



function emsNewInstall() {
   
    MYWRKDIR=${PWD}
    echo " ############################################################### ##  "
    echo " ### USER : $(whoami) Has Initiated Fresh Installation PWD: ${MYWRKDIR} #### "
    echo " ############################################################### ##  "
    echo " "

    if [[ -z ${IMAGE_TAR} ]];then
       echo " ############################################################### ##  "
       echo " ###  ==  PROVIDE EMS PACKAGE LOCATION: FOR NEW INSTALL REQUEST:  ===  ### "
       echo " ############################################################### ##  "
       echo " "
    fi

    read -p " ## Provide EMS Packge  path: " nw_path
    echo " ## CURRENT: EMS EXECUTION PATH:  $nw_path"
    echo " "
    nw_path=$(realpath -m "$nw_path")
    if [[ ! -f $nw_path ]];then
       echo " ## EMS PACKAGE ERROR: CANNOT FIND FILE : $nw_path ## "
       echo " "
       installError 
    fi

   ## Validate the Package 

   IMAGE_TAR=${nw_path}
   checkEnv

   ## Check, wther it has already running environments
   checkForEMSavail

    echo " ## Required DESTINATION DIR: INSTALL PATH ### "
    echo " ## Request USER to provide the Install Path ## "

    read -p " ## Please enter the EMS Install path: " ems_path
    echo "  ## USER has entered: $ems_path"

    read -p " ## Please enter Target System IP: " tar_ip
    echo " ## User Has Provided Target IP: $tar_ip "
    echo ""

    read -p " ## Please provide password for $(whoami)  : " pass_wd
    echo " ## user:$(whoami) === passwd: $pass_wd "
    echo ""
    TAR_PASSWD=${pass_wd}


    # Optionally, check if the path exists
    if [[ -e "$ems_path"  && -d "$ems_path" ]]; then
       echo " ## EMS INSTALLATION INITAITED IN PATH : $ems_path ."
    else
       echo " # ===================================="
       echo " ## $ems_path  path does not exist. ##"
       echo " ## ERROR: INSTALL PATH NOT-FOUND ## "
       echo " # ===================================="
       return 1
    fi

    inFile="rn_ems_setup.sh"
    fn=$( tar -tvf "$IMAGE_TAR" | grep  "$inFile" | rev | cut -d' ' -f1 | rev )
    echo " $fn"
    tar -xvf "$IMAGE_TAR" -C "$MYWRKDIR" "$fn"
  
pushd "${MYWRKDIR}/env-rn-ems-tmp/scripts"
      echo " ############################################ "
      echo " ###  EMS-INSTALATION INITIATED  ### "

      if [[ -z ${TAR_PASSWD} ]];then
          echo " ## Not updating the passwd Information ## "
       else
          echo " ## updating the passwd Information ## "
	  sed -i "s%^PASSWD=.*%PASSWD=\"${TAR_PASSWD}\"%g"  "./rn_ems_setup.sh"
      fi

      if [[ -z $tar_ip ]];then
         ./rn_ems_setup.sh  $IMAGE_TAR  $ems_path  
      else
         ./rn_ems_setup.sh  $IMAGE_TAR  $ems_path  $tar_ip  
      fi
      sleep ${WAIT_SEC}
      rm -rf  "env-rn-ems-tmp"
      echo " ############################################ "

popd
      echo " "
      echo " ############################################ "
      echo " ## Exit : $0 and Use rn_ems_start_stop.sh :    ##  "
      echo " ##                          : Activating EMS ## "
      echo " ############################################ "
      echo " "
      sleep 10


    cd ${CUR_WRK_DIR}

}


function emsUpgradeInit()
{
  exdir=$1

  MYWRKDIR=${PWD}


  echo " "
  echo " ## DISPLAY CURRENT VERSION OF EMS-OAM ### "
  echo " ## ------------------------------------------------- ## "
  displayEmsOamVersion  "${exdir}/smo/oam/.env"  "${exdir}/smo/oam/docker-compose.yml" 
  echo " "

  sdnr_str=$(grep "^SDNR_IP_ADDRESS"  ${exdir}/smo/oam/.env)
  sdnripval=$(cut -d "=" -f2 <<< "${sdnr_str}")

  echo " ## CURRENT ENV CONTAINS SDNRIP: $sdnripval ##"

  TMPDIR="${exdir}/../"
  ## Create a tmp PrevVerion archive. if not exist
  epoch_time=$(date +%s)
  tmpdir="ems_${epoch_time}"

  mkdir -p  "${TMPDIR}/${EMS_PREV_REL}" 
  mkdir -p  "${TMPDIR}/${EMS_PREV_REL}/${tmpdir}"
  ## Take a Backup of existing OAM FIle
  cp "${exdir}/smo/oam/.env"    "${TMPDIR}/${EMS_PREV_REL}/${tmpdir}/"
  cp "${exdir}/smo/oam/docker-compose.yml"  "${TMPDIR}/${EMS_PREV_REL}/${tmpdir}/" 

pushd "${TMPDIR}/${EMS_PREV_REL}" 
   echo " ## Taking BackUp of Existing EMS Verisons: ${TMPDIR}/${EMS_PREV_REL}/${tmpdir} "
   tar -cvf "${tmpdir}.tar.gz"  "${tmpdir}"
   echo " ## Current Version Backup: ${tmpdir}.tar.gz"
   ## delete Tmp Dir
   rm -rf ${TMPDIR}/${EMS_PREV_REL}/${tmpdir}
popd

pushd ${TMPDIR}
   RELDIR=${PWD}
popd

    inFile="rn_ems_setup.sh"
    fn=$( tar -tvf "$IMAGE_TAR" | grep  "$inFile" | rev | cut -d' ' -f1 | rev )
    echo " $fn"
    tar -xvf "$IMAGE_TAR" -C "$RELDIR" "$fn"


   ## Now extract new IMAGE To DEST DIR

      echo " "
pushd "${RELDIR}/env-rn-ems-tmp/scripts"
      echo " ############################################ "
      echo " ###  EMS-UPGRADE INITIATED  ### "
      ./rn_ems_setup.sh  $IMAGE_TAR  ${RELDIR} ${sdnripval}  "upgrade"  
      echo " ############################################ "
popd
   rm -rf  "${RELDIR}/env-rn-ems-tmp"
   sleep ${WAIT_SEC}

   echo " "
   echo " ############################################ "
   echo " ## Exit : $0 and Use rn_ems_start_stop.sh :    ##  "
   echo " ##                          : Upgrade EMS ## "
   echo " ############################################ "
   echo " "
   echo " ## ========= RESTART EMS:  ========  ## "
   echo " ## =========================================================== ========  ## "
   sleep 10

}

function emsUpgrade()
{
    echo " "
    echo " ##################################################################  "
    echo " ### USER : $(whoami) : has Initiated Upgrade:EMS : PWD: ${PWD}  #### "
    echo " ##################################################################  "
    echo " "

    if [[ -z ${IMAGE_TAR} ]];then
       echo " ############################################################### ##  "
       echo " ###  ==  PROVIDE INPUT FOR EMS PACKAGE PATH:  ===  ### "
       echo " ############################################################### ##  "
       echo " "
    fi

    read -p " ## Provide EMS Packge  path: " up_path
    echo " ## CURRENT: EMS EXECUTION PATH:  $up_path"
    up_path=$(realpath -m "$up_path")
    echo " "
    if [[ ! -f $up_path ]];then
       echo " ## EMS PACKAGE ERROR: CANNOT FIND FILE : $up_path ## "
       echo " "
       installError 
    fi

   ## Validate the Package 

   IMAGE_TAR=${up_path}
   checkEnv

    read -p " ## Provide Current  EMS Install path: " cur_path
    echo " ## CURRENT: EMS EXECUTION PATH:  $cur_path"
    echo " "

    if [[ -d ${cur_path} ]];then
       ### Check ; whether user have provided input including exec
       ### or without exec directory
       bname=$( basename  ${cur_path})
       if [[ $bname == "exec" ]];then
	    # USER HAS GIVEN TILL EXEC DIR
            CUR_EMS_DIR="${cur_path}" 
	else
         if [[ ! -d "${cur_path}/exec" ]];then
	    echo " ## CANNOT FIND exec Dir In EMS:PATH ${cur_path} ##" 
	    return 1
	  else
             CUR_EMS_DIR="${cur_path}/exec"
          fi
       fi
    else
       echo " ## ERROR: CANNOT FIND EMS PATH: ## "
       echo " ## EMS PATH FOUND ERROR: $cur_path ##"
       return 1
    fi

    echo " ## CURRENT EMS WORKING DIR: $CUR_EMS_DIR ## "
    emsUpgradeInit $CUR_EMS_DIR

    echo " ## --------------------------------------------------- ## "
    echo " ## EMS UPGRADE SUCCESS : ------------------------------------- ## "
    echo " ## UPGRADED EMS:  SMO-OAM VERSION INFORMATION: ## " 
    echo " "
    displayEmsOamVersion  "${exdir}/smo/oam/.env"  "${exdir}/smo/oam/docker-compose.yml" 

    cd ${CUR_WRK_DIR}
}


function is_integer() {
  [[ "$1" =~ ^[0-9]+$ ]]
}

function emsDowngradeProcedure()
{
  expath=$1
  echo " ## DISPLAY CURRENT VERSION OF EMS-OAM ### "
  echo " ## ------------------------------------------------- ## "
  displayEmsOamVersion  "${expath}/smo/oam/.env"  "${expath}/smo/oam/docker-compose.yml" 
  echo " "

  if [[ ! -d "${expath}/../${EMS_PREV_REL}" ]];then
     echo " ######################################################## # "
     echo " # CANNOT FIND THE PREV REL DIR: IN PATH ${expath}   "
     echo " ## PREV REL DIR: ${expath}/../${EMS_PREV_REL} : ERROR "
     echo " ## CANNOT SUPPORT : EMS DOWNGRADE  ## "
     echo " ######################################################## # "
     return 0
  fi

pushd "${expath}/../${EMS_PREV_REL}"

   echo " "
   PREV_REL=${PWD}  
   echo " "
   echo " ######################################################## # "
   echo " ## ------ DISPLAY PREV REL VERSION INFO TO USER ----- ## "
   echo " ######################################################## # "
   verfiles=($(ls -lt "$PREV_REL"/*.tar.gz 2>/dev/null | awk '{print $9}'))

   # Check how many files were found
   file_count=${#verfiles[@]}
   # If there are no files, exit
   if [ $file_count -eq 0 ]; then
     echo " ######################################################## # "
     echo " # CANNOT FIND THE PREV REL INFORMATION  IN PATH ${PREV_REL}   "
     echo " ## CANNOT SUPPORT : EMS DOWNGRADE  ## "
     echo " ######################################################## # "
     return 0
   fi 

   # Reverse the array to have files in ascending order of modification time
   verfiles=($(ls -lt "$PREV_REL"/*.tar.gz 2>/dev/null | awk '{print $9}' | tac))

   # If there are more than 5 files, take only the last 5
   if [ $file_count -gt 5 ]; then
     verfiles=("${verfiles[@]:-5}")  # Get the last 5 elements from the array
   fi

   # Assign the files to an array
   relarray=("${verfiles[@]}")

   # Later in the script, access the global array
    echo "Global array content (latest files in ascending order):"
    for i in "${!relarray[@]}"; do
       echo " ## EMS PREV RELEASE Element $((i+1)): ${relarray[$i]}"
       # Create a TMP DIR IN PREV REL AND LATER DELETE IT
       mkdir -p  "${PREV_REL}/tmp"
       tar -xvf  ${relarray[$i]} -C  ${PREV_REL}/tmp 
       tmpfile=$(basename "${relarray[$i]}")
       tmpdir="${tmpfile%.tar.gz}"
       displayEmsOamVersion   "${PREV_REL}/tmp/$tmpdir/.env"  "${PREV_REL}/tmp/$tmpdir/docker-compose.yml" 
       rm -rf ${PREV_REL}/tmp
       echo " ## =========================================================== ========  ## "
       echo " ## == CHOOSE OPTION $((i+1))   : TO SELECTING THIS VERSION FOR DOWNGRADE : =========== ## "
       echo " ## ===========================================================  =====  ## "
       echo " "
       sleep 1
       echo " "
       if [[ $((i+1)) -gt 5 ]];then
	  echo " ## CHOOSE ONE OF THE OPTION ## "
	  break
       fi
    done

    read -p " Choose Version: Index to Downgrade: " inpin
    if is_integer "$inpin"; then
       echo "  ## USER Has entered Index Val: $inpin"

       echo " ## =========================================================== ========  ## "
       if [[ $inpin -gt $file_count ]];then
	  echo " ##  MAXIMUM SUPPORTED INDEX SHOULD BE LESS THAN : $file_count ONLY ## "
	  echo " ## INPUT VAL SHOULD BE LESS THAN $file_count ## "
	  echo " ## INVALID INDEX FOR DOWNGRADE ## "
	  echo " ## DOWNGRADE CAN'T BE INITIATED ## "
	  return 0
       fi

       if [[ $inpin -gt 5 ]];then
	  echo " ##  MAXIMUM SUPPORTED DOWNGRADE VERSIONS : 5 ONLY ## "
	  echo " ## INPUT VAL SHOULD BE LESS THAN 5 ## "
	  echo " ## INVALID INDEX FOR DOWNGRADE ## "
	  echo " ## DOWNGRADE CAN'T BE INITIATED ## "
	  echo " "
	  return 0
       fi
       echo " ## =========================================================== ========  ## "
    else
        echo " ## Invalid input. Try Again: ##."
	return 0
    fi

     echo " ## ========= DOWNGRADE VERSION CHOSEN  ========  ## "
     # Create a TMP DIR IN PREV REL AND LATER DELETE IT
     index=$((inpin - 1))
     mkdir -p  "${PREV_REL}/tmp"
     tar -xvf  ${relarray[$index]} -C  ${PREV_REL}/tmp 
     tmpfile=$(basename "${relarray[$index]}")
     tmpdir="${tmpfile%.tar.gz}"
     displayEmsOamVersion   "${PREV_REL}/tmp/$tmpdir/.env"  "${PREV_REL}/tmp/$tmpdir/docker-compose.yml" 
     echo " ## =========================================================== ========  ## "
     echo " "

     cp  -arf "${PREV_REL}/tmp/$tmpdir/.env" "${expath}/smo/oam/.env"
     cp -arf "${PREV_REL}/tmp/$tmpdir/docker-compose.yml" "${expath}/smo/oam/docker-compose.yml"

     rm -rf ${PREV_REL}/tmp


popd

   echo " ## ========= DOWNGRADE SUCCESSFULL:  ========  ## "
   echo " "
   echo " ############################################ "
   echo " ## Exit : $0 and Use rn_ems_start_stop.sh :    ##  "
   echo " ##                          : Upgrade EMS ## "
   echo " ############################################ "
   echo " "

   echo " ## ========= RESTART EMS:  ========  ## "
   echo " ## =========================================================== ========  ## "
   sleep 10


}

function emsPackageBuildProcedure()
{
   pk_path=$1

    echo " ## ------------------------------------------------------------------  ##"
    echo " ## $pk_path :  EMS-OAM: Initiating Package Build ##"
    echo " ## Provide Parameters fori OAM ENV (.env ) file and exec directory for  package build ##" 

    read -p " ## Provide Path for EMS-SMO-OAM ENV File: " env_path
    echo "  ## SMO-EMS-OAM  Environment File :  $env_path"
    echo " ## ------------------------------------------------------------------  ##"
    echo " "

    if [[ ! -f "$env_path" ]];then
       echo " ## Cannot Find OAM-ENVIRONMENT FILE ## "
       echo "  ## EMS OAM-FILE ENV FOUND ERROR: :  $env_path"
       echo " ##################################################################  "
       echo " "
       return 0
    fi

    read -p " ## Provide Path for EMS-SMO-EXE Directory:Path To be Packaged: " ex_path
    echo " ## SMO-EMS  OAM Environment File :  $ex_path"
    echo " ## ------------------------------------------------------------------  ##"
    echo " "

    if [[ ! -d "$ex_path" ]];then
       echo " ## Cannot Find SMO-EXE DIRECTORY: ## "
       echo " ## EMS OAM-EXE DIRECTORY:FOUND ERROR: :  $ex_path"
       echo " ##################################################################  "
       echo " "
       return 0
    fi

    echo " ## Provide Installation Type: ## "
    echo " ##                          : 1 ( EMS-Package build For New Installation ) ##"
    echo " ##                          : 2 ( EMS-Package build For EMS-Upgrade Process ) ##"
    echo " "

    local inType
    read -p " ## Enter your choice [1-2]: " inType
    case $inType in
        1)
            echo " ## --------------------------------------------------------- ## "
            echo " ## EMS: Package Build Initiated for NEW:INSTALLATION"
            echo " ## --------------------------------------------------------- ## "
	    echo " "
            # Add the logic for Environment Installation here
	    $pk_path  $ex_path $env_path  "new"
            ;;
        2)
            echo " ## --------------------------------------------------------- ## "
            echo " ## EMS: Package Build Initiated for EMS-SMO-OAM:UPGRADE:"
            echo " ## --------------------------------------------------------- ## "
	    echo " "
            # Add the logic for Environment Installation here
	    $pk_path $ex_path  $env_path "upgrade"
            ;;
        *)
            echo " ##################################################################  "
            echo " ## EMS: Invalid Package Option:  Valid options are :   ##."
	    echo " ##    1 -  FRESH / NEW INSTALLATION : EMS Packge includes platform related Images ## "
	    echo " ##    2 -  EMS-UPGRADE Procedure :  Packge includes Only OAM Related Images ## "
            echo " ##################################################################  "
	    echo " "
	    return 0
            ;;
        esac
}



function emsPackageBuild()
{
    echo ""
    echo " ##################################################################  "
    echo " ### USER : $(whoami) has Initiated SMO-EMS: Packaging Build Procedure: #### PWD: ${PWD} "
    echo " ## Locating packaging script : In dir path: ${PWD}  ## "
    echo " "

    if [[ ! -f "${PWD}/pkg_rn_ems_env.sh" ]];then
       echo " ## Cannot Find pkg_rn_ems_env.sh In ${PWD} ## "
       read -p " ## Provide Path for Packging Script : " pak_path
       echo " ## EMS Pacakge Path :  $pak_path"

       if [[ ! -f $pak_path ]];then
          echo " ##################################################################  "
	  echo " ## Cannot Find The EMS Package Script : $pak_path  ## "
	  echo " ## FILE FOUND ERROR: $pak_path ## "
          echo " ##################################################################  "
	  echo " "
	  return 0
       else
	    pkn=$(basename ${pak_path} )
	    echo " ## Package Name : Provided : $pkn ## "
	    if [[ $pkn == "pkg_rn_ems_env.sh" ]];then
	       echo " ## ---   $pak_path  ---  ## "
               echo " ##################################################################  "
	       echo " "
	    else
               echo " ##################################################################  "
	       echo " ##  $pkn --  Name Not -- Matching with -- pkg_rn_ems_env.sh ## "
	       echo " ##  expected EMS:Pacakge Script Name as pkg_rn_ems_env.sh ## "
               echo " ##################################################################  "
	       echo " "
	       return 0
	    fi
       fi

    else
       pak_path="${PWD}/pkg_rn_ems_env.sh"
    fi

    emsPackageBuildProcedure ${pak_path}


}

function emsDownGrade()
{

    echo ""
    echo " ##################################################################  "
    echo " ### USER : $(whoami) has Initiated EMS:DOWNGRADE Procedure: #### PWD: ${PWD} "
    read -p " ## Provide Current EMS path: " cur_path
    echo "  ## CURRENT: EMS EXECUTION PATH:  $cur_path"

    if [[ -d ${cur_path} ]];then
       ### Check ; whether user have provided input including exec
       ### or without exec directory
       bname=$( basename  ${cur_path})
       if [[ $bname == "exec" ]];then
	    # USER HAS GIVEN TILL EXEC DIR
            CUR_EMS_DIR="${cur_path}" 
	else
         if [[ ! -d "${cur_path}/exec" ]];then
	    echo " ## CANNOT FIND exec Dir In EMS:PATH ${cur_path} ##" 
	    return 1
	  else
             CUR_EMS_DIR="${cur_path}/exec"
          fi
       fi
    else
       echo " ## ERROR: CANNOT FIND EMS PATH: ## "
       echo " ## EMS PATH FOUND ERROR: $cur_path ##"
       return 1
    fi

    echo " ## CURRENT EMS WORKING DIR: $CUR_EMS_DIR ## "
    emsDowngradeProcedure $CUR_EMS_DIR

}


# Function to display the menu
show_menu() {
    clear
    echo " # ===================================="
    echo " #   EMS:  INSTALLATION MENU"
    echo " # ===================================="
    echo " 1. EMS Environment Installation"
    echo " 2. EMS SMO Binary Package Build  "
    echo " 3. Fresh Installation"
    echo " 4. EMS Upgrade : "
    echo " 5. EMS Downgrade : "
    echo " 6. Exit"
    echo " # ===================================="
    echo
}

# Function to handle user selection
read_options() {

    cd ${CUR_WRK_DIR}

    local choice
    read -p " ## Enter your choice [1-6]: " choice
    case $choice in
        1)
	    echo " "
            echo " ## EMS: Environment Installation Procedure  Initiated"
            # Add the logic for Environment Installation here
	    emsENVInstall
            ;;
        2)
	    echo " "
            echo "  ## EMS: SMO Binary Package Build Procedure Initiated"
            # Add the logic for Environment Installation here
	    emsPackageBuild
            ;;
        3)
	    echo " "
            echo " ##  EMS: Fresh Installation Procedure Initiated:"
            # Add the logic for Fresh Installation here
	    emsNewInstall
            ;;
        4)
	    echo " "
            echo " ##  EMS: Upgrade Request Initiated:"
            # Add the logic for Upgrade Installation here
	    emsUpgrade
            ;;
        5)
	    echo " "
            echo " ##  EMS:: Downgrade Request Initiated:"
            # Add the logic for Downgrade Installation here
	    emsDownGrade
            ;;
        6)
            echo " ### --- EXIT: EMS: Options  --- ###"
            # Add the logic for Re-installation here
            exit 0
            ;;
        *)
            echo " EMS: Invalid choice! Please select an option between 1 and 5."
            ;;
    esac
}


function startInstallProcedure() {

  echo " ## Choose: Required Install Options: "
  sleep 2

  # Main script loop
  while true; do
      show_menu
      read_options
      echo
      read -p "Press [Enter] to continue..."
  done

}

if [[ -z ${IMAGE_TAR} ]];then
   :
   echo " "
   #echo " ##  User Can Initiate Only Downgrade Procedure  ##"
else
  checkEnv
fi
startInstallProcedure


