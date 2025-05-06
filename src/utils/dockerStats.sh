#!/bin/bash

######################################################################################################
#                                                                                                    #
#   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd] . All rights  reserved              #
#                                                                                                    #
######################################################################################################

# This script is used to complete the output of the docker stats command.
# The docker stats command does not compute the total amount of resources (RAM or CPU)

CURRDIR=${PWD}
ENV_PATH=/home/nms-auto/dev_1_1/rn-ems/exec/smo/oam/.env
source ${ENV_PATH}
# Elasticsearch server IP and port
ES_IP=${SDNR_IP_ADDRESS}
ES_PORT="9200"
echo ${ES_IP}

# Elasticsearch index name
INDEX_NAME="rn_ems_perf_util"
ES_URL=""

function cunstruct_ELUrl()
{
   # Elasticsearch URL
   ES_URL="http://${ES_IP}:${ES_PORT}"
   if ! index_exists; then
    # Index does not exist, create it
    create_index
    fi

}

index_exists() {
    response=$(curl -s -o /dev/null -w '%{http_code}' -X GET "${ES_URL}/_cat/indices/${INDEX_NAME}?format=json")
    if [ "$response" -eq 200 ]; then
        return 0  # Index exists
    else
        return 1  # Index does not exist
    fi
}

# Function to create the Elasticsearch index
create_index() {
    echo "create enetered"
    curl -X PUT "${ES_URL}/${INDEX_NAME}" -H 'Content-Type: application/json' -d '
    {
        "mappings": {
            "properties": {
                "data": {
                    "type": "nested"
                },
                "status":{
                    "type": "text"
                }
            }
        }
    }'
}

function fetchSystemLevelResrc()
{
   # Get the total amount of RAM, assumes there are at least 1024*1024 KiB, therefore > 1 GiB
   HOST_MEM_TOTAL=$(grep MemTotal /proc/meminfo | awk '{print $2/1024/1024}')

   # Get the output of the docker stat command. Will be displayed at the end
   # Without modifying the special variable IFS the ouput of the docker stats command won't have
   # the new lines thus resulting in a failure when using awk to process each line
   unset LC_ALL
   IFS=;
   DOCKER_STATS_CMD=`docker stats --no-stream --format "table {{.MemPerc}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.Name}}"`

   SUM_RAM=`echo $DOCKER_STATS_CMD | tail -n +2 | sed "s/%//g" | awk '{s+=$1} END {print s}'`
   SUM_CPU=`echo $DOCKER_STATS_CMD | tail -n +2 | sed "s/%//g" | awk '{s+=$2} END {print s}'`
   SUM_RAM_QUANTITY=`LC_NUMERIC=C printf %.2f $(echo "$SUM_RAM*$HOST_MEM_TOTAL*0.01" | bc)`

   # Output the result
   echo $DOCKER_STATS_CMD
   echo -e "${SUM_RAM}%\t\t\t${SUM_CPU}%\t\t${SUM_RAM_QUANTITY}GiB / ${HOST_MEM_TOTAL}GiB\tTOTAL"

}




elx_perfStats() {
    # Assign function arguments to variables
    nameDock=$1
    cpuPerc=$2
    memPerc=$3
    memUtil=$4
    memTtl=$5
    filDescCnt=$6
    application="Platform"
    if (( $(echo "$cpuPerc == 0" | bc -l) )); then
        status="down"
    else
        status="up"
    fi
    
    case $nameDock in
	      "sdnc-web" | "sdnr" | "ves-collector" | "nbi" | "dfc" | "perf-monitor")
             application="Application"
             ;;
#
	    *)
#	      echo " Not required to Update for: ${nameDock} "
	    ;;
      esac
    # Define JSON data for indexing
    DATA=$(cat <<EOF
    {
        "container_name": "${nameDock}",
        "cpu_utilization": "${cpuPerc}",
        "memory_percentage": "${memPerc}",
        "memory_usage": "${memUtil}",
        "memory_limit": "${memTtl}",
        "file_descriptor_count": "${filDescCnt}",
        "time": $(date +%s%6N),
        "Type": "${application}"
    }
EOF
    )

    # Extract document ID from container name
    doc_id="${nameDock}"

    # Check if document already exists in Elasticsearch
    existing_doc=$(curl -s -X GET "${ES_URL}/${INDEX_NAME}/_doc/${doc_id}")

    if [[ "$(echo "${existing_doc}" | jq -r '.found')" == "true" ]]; then
        # Document exists, retrieve current data array
        current_data=$(echo "${existing_doc}" | jq -r '.["_source"].data[] | @json' | paste -sd "," - | sed 's/^/[/; s/$/]/')
        
        
        # Append new data to the existing data array
        updated_data=$(echo "[${current_data}, ${DATA}]" | jq -s add | jq -c 'flatten | .[]' | paste -sd "," - | sed 's/^/[/; s/$/]/')

        echo "${update_data}"
        # Update existing document with appended data
        curl -s -X POST "${ES_URL}/${INDEX_NAME}/_doc/${doc_id}/_update" \
            -H 'Content-Type: application/json' \
            -d "{\"doc\": {\"data\": ${updated_data}, \"status\": \"${status}\"}}"
    else
        # Document doesn't exist, create new document with data array
        curl -s -X POST "${ES_URL}/${INDEX_NAME}/_doc/${doc_id}" \
            -H 'Content-Type: application/json' \
            -d "{\"data\": [${DATA}], \"status\": \"${status}\"}"
    fi
}


function RN_rn_ems_Rsrc()
{
  #Get the total amount of RAM, assumes there are at least 1024*1024 KiB, therefore > 1 GiB
 # docker stats | while read line

#do
  
   HOST_MEM_TOTAL=$(grep MemTotal /proc/meminfo | awk '{print $2/1024/1024}')
   #echo "HOST TOTAL Memory: $HOST_MEM_TOTAL"
   oldifs=IFS
   IFS=;
   #dStats=$(docker stats --no-stream --format "table {{.MemPerc}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.Name}}\t{{.ID}}" | sed -n '1!p')
   #dStats=$( docker stats --no-stream --format "table {{.MemPerc}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.Name}}\t{{.ID}}")
   dStats=$(docker stats --no-stream --format "table {{.MemPerc}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.Name}}\t" | sed -n '1!p')

   SUM_RAM=`echo $dStats | tail -n +2 | sed "s/%//g" | awk '{s+=$1} END {print s}'`
   SUM_CPU=`echo $dStats | tail -n +2 | sed "s/%//g" | awk '{s+=$2} END {print s}'`
   SUM_RAM_QUANTITY=`LC_NUMERIC=C printf %.2f $(echo "$SUM_RAM*$HOST_MEM_TOTAL*0.01" | bc)`


   # Output the result
   echo "########################################### Start of Resources Output ##############################################" 

   #IFS=$olifs
   echo " DOCKER:STATS::::: "
   IFS=$'\r\n' GLOBIGNORE='*'
   containers=("kafka" "identity" "zookeeper" "identitydb" "mysql" "perf-monitor" "ves-collector" "sdnr" "sdnc-web" "perf-monitor" "nbi" "dfc" "onap-dmaap" "persistence")

   for j in  "${containers[@]}"
   do
      echo   "$j"
      #echo " "
      i=$(echo "$dStats" | grep "$j")


# Check if grep was successful
if [[ $? -eq 0 ]]; then
    # grep succeeded, the container was found
    echo "$containerStats"

    nameDock=$(echo $i | awk '{print $6}')
      case $nameDock in
	      "kafka" | "identity" | "zookeeper" | "identitydb" | "mysql" | "perf-monitor" | "ves-collector" | "sdnr" | "sdnc-web" | "ntsim-ng-topology-server" | "nbi" | "dfc" | "onap-dmaap"| "persistence" | "perf-monitor")
                      echo   "$i"
                      echo " "
                      cpuPerc=$(echo $i | awk '{print $2}')
                      memPerc=$(echo $i | awk '{print $1}')
                      memUtil=$(echo $i | awk '{print $3}')
                      memTtl=$(echo $i | awk '{print $5}')
		      filDescCnt=0
#
                      echo " $memPerc "
                      echo " $cpuPerc "
                      echo " $memUtil "
                      echo " $memTtl "
                      echo " $nameDock "
#
                      SUM_RAM=${SUM_RAM/.*}
                      SUM_CPU=${SUM_CPU/.*}

   
                      disk_usage=$(df -hT | grep ext4 | awk '{print $6}')
                      disk_usage=${disk_usage%"%"}

		      elx_perfStats $nameDock $cpuPerc $memPerc $memUtil $memTtl $filDescCnt
		    ;;
#
	    *)
#	      echo " Not required to Update for: ${nameDock} "
	    ;;
      esac

else
    # grep failed, container not found
    elx_perfStats $j 0 0 0 0 0
fi

      
   done

   IFS=$oldifs
   #sleep 5;
   echo " --------------------------  Fetching the Docker Stats :: AGAIN ----------------------------- "

#done

}


## Based on DB Type 
## Do DB SPecific 
cunstruct_ELUrl


RN_rn_ems_Rsrc
