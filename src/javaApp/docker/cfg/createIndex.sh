#!/bin/bash

# Variables
ES_HOST='http://persistence:9200' 
# JSON payload with settings and mappings

read -r -d '' PM_DATA_INDEX_PAYLOAD << EOM
{
        "settings": {
            "index.mapping.nested_objects.limit": 9223372036854775807,
            "index.max_inner_result_window": 10000
        },
        "mappings": {
            "properties": {
                "nodes": {
                    "type": "nested",
                    "properties": {
                        "node_id": {"type": "keyword"},
                        "cell_types": {
                            "type": "nested",
                            "properties": {
                                "cell_id": {"type": "keyword"},
                                "types": {
                                    "type": "nested",
                                    "properties": {
                                        "type": {"type": "keyword"},
                                        "data": {
                                            "type": "nested",
                                            "properties": {
                                                "time": {"type": "date"},
                                                "value": {"type": "float"}
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
EOM


read -r -d '' SYSTEM_INDEX_PAYLOAD << EOM
{
        "settings": {
            "index.mapping.nested_objects.limit": 9223372036854775807,
            "index.max_inner_result_window": 10000
        }
}
EOM

declare -A INDEX_PAYLOADS=(
  ["basic_config"]=""
  ["cell_config"]=""
  ["cucp_config"]=""
  ["cuup_config"]=""
  ["du_config"]=""
  ["pm_data"]="$PM_DATA_INDEX_PAYLOAD"
  ["rn_ems_perf_util"]="$SYSTEM_INDEX_PAYLOAD"
  ["pre_provider"]=""
  ["software_management"]=""
  ["auditlog"]=""
  ["system_config"]=""
  ["profilemanagement"]=""
  ["sm_history"]=""
  ["cell_status"]=""
  ["software_versions"]=""
)

# Function to check if an index exists
index_exists() {
    local index_name=$1
    response=$(curl -s -o /dev/null -w '%{http_code}' -X GET "${ES_HOST}/_cat/indices/${index_name}?format=json")
    [[ "$response" -eq 200 ]]
}

# Function to create an Elasticsearch index
create_index() {
    local index_name=$1
    local payload=$2
    curl -X PUT "${ES_HOST}/${index_name}" -H 'Content-Type: application/json' -d "${payload}"
    echo "Index $index_name created with the provided settings and mappings."
}

# Main logic to create indices if they do not exist
for index_name in "${!INDEX_PAYLOADS[@]}"; do
    if ! index_exists "$index_name"; then
        create_index "$index_name" "${INDEX_PAYLOADS[$index_name]}"
    else
        echo "Index $index_name already exists."
    fi
done


