#!/bin/bash
######################################################################################################
#                                                                                                    #
#               Copyright (C) [2025] [Tejas Networks]. All rights reserved                           #
#                                                                                                    #
######################################################################################################

# Script Overview:
# This script performs the deletion of documents from specified indices in Elasticsearch. It targets documents where the "time" field in a nested structure matches a specific condition, defined by an epoch timestamp in milliseconds.
#
# Deletion Process:
# The script constructs a query that deletes documents with a "time" field value earlier than the specified epoch timestamp. 
# The query uses a nested structure to filter documents within arrays of objects. It applies a range query on the "time" field to match documents that meet the condition.
#
# Deletion Outcome:
# After executing the deletion query, the script logs the result, which includes:
# - total: Number of documents matched by the query.
# - deleted: Number of documents successfully deleted.
# - batches: The count of batches processed during deletion.
# - version_conflicts: Number of version conflicts encountered.
# - noops: Indicates if no documents were found for deletion, meaning no operation was performed.
# - retries: The number of retries, if any, for both bulk and search operations.
# - failures: Any failures encountered during the process.
#
# The script concludes by logging the timestamp when the deletion operation is complete.


serverIP=""
CURR_WRK_DIR=${PWD}
WRK_DIR=""

if [[ $# -eq 1 ]]; then
  if [[ -d $1 ]]; then
      WRK_DIR=$1
      echo "EMS WORKING DIR: ${WRK_DIR}"
  else
      echo "USER HAS PROVIDED WRONG INPUT"
      echo "EMS WORKING DIR: ${WRK_DIR}"
      exit 1
  fi
else
  echo "REQUIRED VALID INPUT FROM USER"
  exit 1
fi

if [[ -z ${WRK_DIR} ]]; then
    read -p "Enter EMS Working DIR: " EMS_DIR
    if [[ ! -d ${EMS_DIR} ]]; then
      echo "USER HAS PROVIDED INVALID DIR: ${EMS_DIR}"
      exit 1
    else
      WRK_DIR=$EMS_DIR
    fi
fi

function updateConfigPath() {
   user_name=$(whoami)
   if [[ ! -f ${WRK_DIR}/exec/smo/oam/.env ]]; then
      echo "INPUT IS WRONG. CANNOT FIND .ENV: ${WRK_DIR}/exec/smo/oam/.env"
      exit 1
   fi
   sdnr_str=$(grep "^SDNR_IP_ADDRESS" ${WRK_DIR}/exec/smo/oam/.env)
   sdnripval=$(cut -d "=" -f2 <<< "${sdnr_str}")
   echo "USERNAME: $user_name IP: $sdnripval : CWRK_DIR=${WRK_DIR}"
   serverIP=$sdnripval
}

# Declare an associative array 'indices_durations' mapping indices to their retention periods (in days).
# The deletion process for these indices happens sequentially based on their respective durations.

declare -A indices_durations=(
  ["faultlog-v7"]=60
  ["eventlog-v7"]=30
  ["auditlog"]=30
  ["pm_data"]=30
  ["rn_ems_perf_util"]=30
  ["sm_history"]=30
)

function deleteDataFromIndices() {
  for INDICES in "${!indices_durations[@]}"; do
    INDEX_DAYS=${indices_durations[$INDICES]}
    TIMESTAMP_CUT=$(date -d "-${INDEX_DAYS} days" +%s)
    TIMESTAMP_CUT_MICRO=$((TIMESTAMP_CUT * 1000000))

    URL="http://$serverIP:9200/$INDICES/_delete_by_query"

    if [[ $INDICES == "pm_data" ]]; then
      DATA=$(cat <<EOF
{
  "query": {
    "nested": {
      "path": "nodes.cell_types.types.data",
      "query": {
        "range": {
          "nodes.cell_types.types.data.time": {
            "lt": $TIMESTAMP_CUT_MICRO
          }
        }
      }
    }
  }
}
EOF
)
    elif [[ $INDICES == "rn_ems_perf_util" ]]; then
      DATA=$(cat <<EOF
{
  "query": {
    "range": {
      "data.time": {
        "lt": $TIMESTAMP_CUT_MICRO
      }
    }
  }
}
EOF
)
    else
      DATA=$(cat <<EOF
{
  "query": {
    "range": {
      "timestamp": {
        "lt": $TIMESTAMP_CUT_MICRO,
        "format": "epoch_millis"
      }
    }
  }
}
EOF
)
    fi

    START_TIME=$(date +"%Y-%m-%d %H:%M:%S")
    echo -e "\n************* Starting deletion for $INDICES at $START_TIME *************"
    echo "Query for $INDICES:"
    echo "$DATA"
    curl -s -X POST -H "Content-Type: application/json" -d "$DATA" "$URL" || {
      echo "Failed to delete data from $INDICES" >&2
      exit 1
    }
    END_TIME=$(date +"%Y-%m-%d %H:%M:%S")

    echo -e "\n************* Completed deletion for $INDICES at $END_TIME *************"
  done
}

updateConfigPath
deleteDataFromIndices

