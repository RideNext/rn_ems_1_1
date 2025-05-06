#!/bin/bash

##############################################################################
#   Copyright (C)     [2024]  [RideNext Software Solutions Pvt Ltd]          #
#           RideNext Intellectual Property. All rights  reserved             #
#                                                                            #
##############################################################################

# Set default Elasticsearch host to localhost if es_ip environment variable is not set
ES_IP="${es_ip:-localhost}"

# Function to create snapshot and copy its contents
create_snapshot() {
    echo "Creating repository..."
    curl -X PUT "http://${ES_IP}:9200/_snapshot/snapshots" \
       -H 'Content-Type: application/json' \
       -d '{
             "type": "fs",
             "settings": {
                 "location": "/usr/share/elasticsearch/data/snapshots",
                 "compress": true
             }
         }' || { echo "Failed to create repository"; exit 1; }

    echo "Creating snapshot of all indices..."

    #!/bin/bash

# Get the current timestamp in a suitable format
timestamp=$(date +"%Y%m%d_%H%M%S")

# Create the snapshot name using the timestamp
snapshot_name="snapshot_$timestamp"

# Create the snapshot
curl -X PUT "http://${ES_IP}:9200/_snapshot/snapshots/$snapshot_name?wait_for_completion=true" \
    -H 'Content-Type: application/json' \
    -d '{
          "indices": "*", 
          "ignore_unavailable": true, 
          "include_global_state": false
        }' || { echo "Failed to create snapshot"; exit 1; }

echo "Snapshot created successfully: $snapshot_name"

}


restore_snapshot() {
    # Get all snapshots and extract their names
    echo "Available snapshots:"
    curl -s -X GET "http://${ES_IP}:9200/_snapshot/snapshots/_all" | \
    grep -oP '"snapshot": *"\K[^"]+'

    read -p "Enter the snapshot name to restore: " snapshot_name
    echo "Restoring snapshot: $snapshot_name..."

    # Get the indices in the snapshot
    snapshot_indices=$(curl -s -X GET "http://${ES_IP}:9200/_snapshot/snapshots/$snapshot_name" | \
                       grep -oP '"indices": *\[\K[^\]]*' | tr -d '\"' | tr ',' '\n')

    # Get the existing indices in the cluster
    existing_indices=$(curl -s -X GET "http://${ES_IP}:9200/_cat/indices?h=index" | tr '\n' ' ')

    # Find missing indices
    missing_indices=()
    for index in $snapshot_indices; do
        if [[ ! " $existing_indices " =~ " $index " ]]; then
            missing_indices+=("$index")
        fi
    done

    # If there are missing indices, proceed with restoration
    if [ ${#missing_indices[@]} -gt 0 ]; then
        echo "Missing indices: ${missing_indices[@]}"

        # Create a comma-separated string of missing indices
        indices_to_restore=$(IFS=,; echo "${missing_indices[*]}")

        # Prepare the restore API payload
        restore_payload=$(cat <<EOF
{
    "indices": "$indices_to_restore",
    "ignore_unavailable": true,
    "include_global_state": false
}
EOF
)

        # Send a restore request to the restore API
        echo "Restoring indices: $indices_to_restore..."
        response=$(curl -s -X POST "http://${ES_IP}:9200/_snapshot/snapshots/$snapshot_name/_restore" -H 'Content-Type: application/json' -d "$restore_payload")

        echo "Restore response: $response"
    else
        echo "All indices are already present. No restoration needed."
    fi
}


delete_snapshot(){
  
    # Get all snapshots and extract their names using grep and sed
    echo "Available snapshots:"
    curl -s -X GET "http://${ES_IP}:9200/_snapshot/snapshots/_all" | \
    grep -oP '"snapshot": *"\K[^"]+'  # Extracts the snapshot names

    read -p "Enter the snapshot name to Delete: " snapshot_name
    echo "Deleting snapshot: $snapshot_name..."
    curl -X DELETE "http://${ES_IP}:9200/_snapshot/snapshots/$snapshot_name"

}

delete_all() {
    read -p "Are you sure you want to delete all snapshots? (Y/N): " acceptance
    if [[ "$acceptance" =~ ^[Yy]$ ]]; then
        echo "Deleting all snapshots..."
        curl -X DELETE "http://${ES_IP}:9200/_snapshot/snapshots/*" || { echo "Failed to delete snapshots"; exit 1; }
        echo "All snapshots deleted successfully."
    else
        echo "Snapshot deletion aborted."
    fi
}



# Main function
main() {
    if [ -z "$1" ]; then
        # No argument provided, ask for user input
        echo "Choose an action:"
        echo "1. Create Snapshot"
        echo "2. Restore Snapshot"
        echo "3. Delete Snapshot"
        echo "4. Delete All snapshots"
        read -p "Enter your choice (1 or 2 or 3 or 4): " choice
    else
        # Argument provided, use it as the choice
        choice=$1
        echo "choice : $choice"
    fi

    case $choice in
        1)
            create_snapshot
            ;;
        2)
            restore_snapshot
            ;;
        3)
            delete_snapshot
            ;;
        4)
            delete_all
            ;;
            
        *)
            echo "Invalid choice. Exiting..."
            exit 1
            ;;
    esac
}

# Execute main function
if [ -z "$1" ]; then
  main
else
  main $1
fi
