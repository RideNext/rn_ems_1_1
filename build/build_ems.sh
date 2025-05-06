#!/bin/bash
################################################################################
#                                                                              #
# Copyright 2024 RideNext Software Solutions Pvt Ltd                           #
#                                                                              #
################################################################################


NO_ARG1=1
NO_ARG2=2

COMP_DIR=${PWD}
COMP_TAG=$1
COMP_OPT=$1

SDNR_DIR="${COMP_DIR}/sdnr"
DEV_MGR_DIR="${SDNR_DIR}/deviceMgr"
NET_CONF_DIR="${SDNR_DIR}/netconf"
DOCK_LIB_DIR="${SDNR_DIR}/docker/lib"
SDNC_WEB="${COMP_DIR}/sdncWeb"
NBI_DIR="${COMP_DIR}/nbi"
DFC_DIR="${COMP_DIR}/dfc"

SDNC_WEB_NODE_API_DIR="${COMP_DIR}/sdncWeb/code/Node-api-services"
VES_COLLECTOR_DIR="${COMP_DIR}/vesCollector"

COMP_DEV="dev"
COMP_NC="nconf"
COMP_ALL="all"
COMP_SDNCWEB="sdnc-web"
COMP_VES="ves"
COMP_NBI="nbi"
COMP_DFC="dfc"

MYDIR=${PWD}


function help()
{
    echo " "
    echo " Valid Input For Compilation : "
    echo " "
    echo " $0   COMPILE_OPTION:${COMP_DEV}/${COMP_NC}/${COMP_SDNCWEB}/${COMP_ALL} (optional) "
    echo " BUILD_DIR:${COMP_DIR}: Should Contain : sdnr nbi vesCollector dfc sdncWeb"
    echo "    deviceMgr      : option: $COMP_DEV "
    echo "    netconf        : option  $COMP_NC "
    echo "    sdnc-web       : option  $COMP_SDNCWEB "
    echo "    ves-collector  : option  $COMP_VES "
    echo "    nbi            : option  $COMP_NBI "
    echo "    dfc            : option  $COMP_DFC "
    echo "    all            : option  ${COMP_ALL}  "
    echo " "
    exit 1
}

if [[ "$#" -lt $NO_ARG1 || "$#" -gt $NO_ARG2 ]]; then
    echo " ************************************************* "
    echo " Error: Invalid Input Options   "
    echo " Usage: $0 :   Compilation Option [ dev / netconf / sdnc-web / ves / nbi / dfc /  all -  optional ] "
    echo " ------------------------------------------------------------------------------------------------ "
    echo " "
    echo " REQ ARG = ${NO_ARG1} / ${NO_ARG2}  Current Passed Args = $# "
    echo " ************************************************* "
    help
    exit 1
fi

if [[ ! -d ${COMP_DIR} ]];then
    echo " Cannot Find the Dir : Path: ${COMP_DIR}"
    exit 1
else
    cd  "${SDNR_DIR}"
    sd_nr=$(basename ${SDNR_DIR})
    if [[ ${sd_nr} == "sdnr" ]];then
        echo "found  DIR: ${sd_nr} In ${COMP_DIR} "
        echo "Input Directory: ${COMP_DIR} "
    else
       echo " Not a Valid Working Dir: Expected sdnr In:${COMP_DIR}"
       exit 1
    fi

    echo " INPUT ARGS: $# "
    echo " DIR: ${COMP_DIR}"
    echo " TAG: ${COMP_TAG} "
    echo " COMPILE: ${COMP_OPT} "
    echo " "
    cd ${COMP_DIR}
fi

function crossCheckDirAvail()
{
    if [[ ! -d  ${DEV_MGR_DIR} ]];then
        echo "Compilation : Build Directory Not Has Device Mgr dir: $DEV_MGR_DIR"
        help
        exit 1
    fi

    if [[ ! -d  ${NET_CONF_DIR} ]];then
        echo "Compilation : Build Directory Not Has:NetConf Directory:  $NET_CONF_DIR"
        help
        exit 1
    fi

    if [[ ! -d  ${SDNC_WEB_NODE_API_DIR} ]] ;then
        echo "Compilation : Build Directory Not Has: SDNCWEB Directory: $SDNC_WEB_NODE_API_DIR"
        help
        exit 1
    fi

    if [[ ! -d  ${VES_COLLECTOR_DIR} ]] ;then
        echo "Compilation : Build Directory Not Has: VES-COLLECTOR Directory: $VES_COLLECTOR_DIR"
        help
        exit 1
    fi

    if [[ ! -d  ${NBI_DIR} ]] ;then
        echo "Compilation : Build Directory Not Has: NBI Directory: $NBI_DIR"
        help
        exit 1
    fi

    if [[ ! -d  ${DFC_DIR} ]] ;then
        echo "Compilation : Build Directory Not Has: DFC Directory: $DFC_DIR"
        help
        exit 1
    fi

    if [[ "$#" -eq $NO_ARG2 ]]; then
        if [[ ${COMP_OPT}  = ${COMP_DEV} || ${COMP_OPT} == ${COMP_NC} || ${COMP_OPT} == ${COMP_SDNCWEB}|| ${COMP_OPT} == ${COMP_VES} || ${COMP_OPT} == ${COMP_DFC} || ${COMP_OPT} == ${COMP_NBI} || ${COMP_OPT} == ${COMP_ALL} ]];then
          echo " Compile Option: valid : ${COMP_OPT}"
        else
          echo " Compile Option: Invalid : ${COMP_OPT}"
          echo " Valid Compiler  Options Are: ${COMP_DEV} ${COMP_NC} ${COMP_SDNCWEB} ${COMP_VES} ${COMP_DFC} ${COMP_NBI}   ${COMP_ALL} "
          help
          exit 1
        fi
    fi
}

function compDevMgr()
{
    CWD=${PWD}
    pushd ${DEV_MGR_DIR}

    mvn clean install -DskipTests
    if [ $? -ne 0 ]; then
        echo "  "
        echo " ------------------------------------------------------------------------------------- "
        echo " Compilation of Device Manager Module  Failed  "
        echo " DIR: ${DEV_MGR_DIR} "
        popd
        cd ${CWD}
        exit 1
        echo " ----------DEV MGR COMPILATION ERROR-------------------------------------------------- "
    fi
    popd
    cd ${CWD}

}

function buildVes()
{

    CWD=${PWD}
    pushd ${VES_COLLECTOR_DIR}

     mvn clean install -DskipTests
     if [ $? -ne 0 ]; then
        echo "  "
        echo " ------------------------------------------------------------------------------------- "
        echo " Compilation of VES Collector Module  Failed  "
        echo " DIR: ${VES_COLLECTOR_DIR} "
        popd
        cd ${CWD}
        exit 1
        echo " ------------VES COMPILATION ERROR:--------------------------------------------------- "
    fi
    popd
    cd ${CWD}
}


function buildNbi()
{

    CWD=${PWD}
    pushd ${NBI_DIR}

     mvn clean install -DskipTests
     if [ $? -ne 0 ]; then
        echo "  "
        echo " ------------------------------------------------------------------------------------- "
        echo " Compilation of NBI Module  Failed  "
        echo " DIR: ${NBI_DIR} "
        popd
        cd ${CWD}
        exit 1
        echo " ------------NBI COMPILATION ERROR:--------------------------------------------------- "
     else
        echo "  "
        echo " ------------------------------------------------------------------------------------- "
        echo " COPY The Jar File and POM.xml to NBI BUILD DIR  "
	cp ./target/nbi-1.0.jar  ${NBI_DIR}/docker/
	cp ./pom.xml ${NBI_DIR}/docker/

    fi
    popd
    cd ${CWD}
}



function buildDfc()
{

    CWD=${PWD}
    pushd ${DFC_DIR}

     mvn clean install -DskipTests
     if [ $? -ne 0 ]; then
        echo "  "
        echo " ------------------------------------------------------------------------------------- "
        echo " Compilation of NBI Module  Failed  "
        echo " DIR: ${DFC_DIR} "
        popd
        cd ${CWD}
        exit 1
        echo " ------------DFC COMPILATION ERROR:--------------------------------------------------- "
     else
        echo "  "
        echo " ------------------------------------------------------------------------------------- "

    fi
    popd
    cd ${CWD}
}




function compNetConf()
{
    CWD=${PWD}
    pushd ${NET_CONF_DIR}

    mvn -Pq clean install -DskipTests
    if [ $? -ne 0 ]; then
        echo "  "
        echo " ------------------------------------------------------------------------------------- "
        echo " Compilation of Net Conf Module  Failed  "
        echo " DIR: ${NET_CONF_DIR} "
        popd
        cd ${CWD}
        exit 1
        echo " ------------------------------------------------------------------------------------- "
    fi

    popd
    cd ${CWD}
}

function buildSDNCWEB()
{
    CWD=${PWD}
    pushd ${SDNC_WEB_NODE_API_DIR}

    npm install
    npm run build

    cd ../odlux/framework
    yarn install
    yarn vendor:dev
    yarn build:dev

    cd ../apps
    for d in ./*/ ; do
        (cd "$d" && yarn run build:dev)
    done

    cd ../framework
    yarn build:dev

    mkdir -p  "${SDNC_WEB}/html/tej-ems" 
    cd ${SDNC_WEB}/html/tej-ems
    if [ $? -ne 0 ]; then
       echo " # -- SDNC_WEB COMPILATION FAILED -- # "
       exit 1
    fi

    rm -rf ./*.*
    cp -R ${SDNC_WEB}/code/odlux/dist/*  .

    echo "  "
    echo " ------------------------------------------------------------------------------------- "
    echo " Compilation of SDNC WEB NODE API SERVICES Module  Successful::  ${PWD} "
    echo " DIR: ${SDNC_WEB_NODE_API_DIR} "
    echo " ------------------------------------------------------------------------------------- "
    popd
    cd ${CWD}
}


function copySdnrLib()
{
    # Check for availability of Docker Directory
    if [[ ! -d "${SDNR_DIR}/docker/lib" ]];then
        echo " Unable to find the Docker Lib Directory: "
        echo " Pl Check Dir:  "
        echo " ${SDNR_DIR}/docker/lib  : Cannot find "
        exit 1
    fi

    echo "================================================================================================="
    echo "Copying the System Directory to Docker/lib"
    cp -arf  "${DEV_MGR_DIR}/featureaggregator/installer/target/assembly/system"   "${DOCK_LIB_DIR}/"
    dm=$(ls -lrt  ${DOCK_LIB_DIR}/system)

    echo "Copying the NetConf Lib to Docker Lib"
    cp -arf  "${NET_CONF_DIR}/karaf/target/assembly/system/org/opendaylight"   "${DOCK_LIB_DIR}/system/org/"
    nc=$(ls -lrt ${DOCK_LIB_DIR}/system/org/opendaylight)

    cp -arf  "${DEV_MGR_DIR}/featureaggregator/installer/target/assembly/system/org/onap/"   "${DOCK_LIB_DIR}/system/org/"
    nc=$(ls -lrt ${DOCK_LIB_DIR}/system/org/onap)

    cp -arf  "${DEV_MGR_DIR}/featureaggregator/installer/target/assembly/system/com/github/mwiede/"   "${DOCK_LIB_DIR}/system/com/github/"
    nc=$(ls -lrt ${DOCK_LIB_DIR}/system/com/github/mwiede)

    ## SDNC_WEB="${COMP_DIR}/sdncWeb"
    cp -arf  ${SDNC_WEB}/code/odlux/dist/*  ${SDNC_WEB}/html/tej-ems/
    nc=$(ls -lrt ${SDNC_WEB}/html/tej-ems/*)

    echo "  "
    echo "DIR:  ${DOCK_LIB_DIR}/system: "
    echo "${dm}"
    echo " -----------------------------------------------------------------------------------------"

    echo " DIR: ${DOCK_LIB_DIR}/system/org/opendaylight: "
    echo " ${nc} "
    echo "================================================================================================="
    echo " "
}



function compileEms()
{
    echo " Compile Option: ${COMP_OPT} "

    case ${COMP_OPT} in
        ${COMP_DEV} )
            echo " ==========================  Device Manager ========================================= "
            echo " Initiating Dev Manager Module Compiltion"
            compDevMgr
            copySdnrLib
            ;;
        ${COMP_NC})
            echo " ==========================  NET CONF ========================================= "
            echo " Initiating Net Conf Module Compilation "
            compNetConf
            copySdnrLib
            ;;
        ${COMP_SDNCWEB})
            echo "=========================== SDNC WEB =========================================="
            echo "Initiating SDNC WEB Module Compilation"
            buildSDNCWEB
            copySdnrLib
            ;;
        ${COMP_VES})
            echo "=========================== VES COLLECTOR =========================================="
            echo "Initiating VES-Collector Module Compilation"
            buildVes
            ;;
	${COMP_NBI})
            echo "=========================== NBI =========================================="
            echo "Initiating NBI Compilation"
            buildNbi
            ;;
	${COMP_DFC})
            echo "=========================== DFC =========================================="
            echo "Initiating DFC Compilation"
            buildDfc
            ;;
        ${COMP_ALL})
            echo " ==========================  VES COLLECTOR : Comilation Initiated==================== "
	    buildVes
            sleep 5
            echo " ==========================  NBI : Compilation Initiated==================== "
            buildNbi
            echo " ==========================  DFC : Compilation Initiated==================== "
            buildDfc
            echo " ==========================  Device Manager : Compilation Initiated==================== "
            echo " Initiating Dev Manager followed by NetConf  Module Compiltion"
            compDevMgr
            sleep 5
            echo " ==========================  NET CONF : Compilation Initiated==================== "
            compNetConf
            sleep 5
            echo " ==========================  SDNC WEB : Compilation Initiated==================== "
            buildSDNCWEB
            copySdnrLib
            ;;
        *)
            echo " Invalid Option For Compile:  ${COMP_OPT}"
            echo " "
            help
            ;;
    esac
}






crossCheckDirAvail

if [[ "$#" -eq $NO_ARG1  ]]; then
    compileEms
    retval=$?
    if [ $retval -ne 0 ]; then
        echo "compileSdnr Execution Procedure Failed: $retval"
        exit 0
    else
        echo "******** compileSdnr Execution Procedure Success ******** "
    fi
fi

# Finally Change to My DIR:
cd ${MYDIR}

