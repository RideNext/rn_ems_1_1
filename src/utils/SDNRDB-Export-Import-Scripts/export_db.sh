  #!/bin/bash
  
BACKUP_FOLDER_PATH=$1 
LOG_FOLDER=$1 

  
  if [ -z "$BACKUP_FOLDER_PATH" ] ; then
    echo "Please provide BACKUP_FOLDER_PATH"
    exit 1
fi
  
 #LOG_FOLDER=/home/nms-auto/Mohan/BackupFolder
 
 #LOGFILE="$LOG_FOLDER/export.log"
  
 #BACKUP_FOLDER_PATH=/home/nms-auto/Mohan/BackupFolder
 

HOST_IP=$(ip addr show $(ip route | awk '/default/ {print $5}') | awk '/inet / {print $2}' | cut -d/ -f1)
 
 echo "REST_IP: $HOST_IP"
  
  URL="http://"$HOST_IP":8181/rests/operations/data-export-import:status-export"
  USER="admin"
  PASS="admin"
  
  response=$(curl -s -u "$USER:$PASS" -H "Content-Type: application/json" -X POST "$URL")

  status=$(echo "$response" | grep -o '"status":"[^"]*' | awk -F: '{print $2}' | tr -d '"')
  
  echo "________________________________________________"
  echo "Status: $status"
   
  if [[ "$status" == *"complete"*  ||  "$status" == *"initial"* ||  "$status" == *"scheduled"* ]]; then
    echo "________________________________________________" 
    
    URL2="http://"$HOST_IP":8181/restconf/operations/data-export-import:schedule-export"

    BODY='{ "input": { "data-export-import:run-at": 500 }}'
  
    expresponse=$(curl -s -u "$USERNAME:$PASSWORD" -H "Content-Type: application/json" -X POST -d "$BODY" "$URL2")
    sleep 1
   
    echo "expresponse: $expresponse"
  
  
    expresult=$(echo "$expresponse" | grep -o '"result":[^}]*' | awk -F: '{print $2}' | tr -d ' ')
    
    echo "expresult: $expresult"
    echo "Export start status :   $expresult " >> "$LOGFILE"
     
    echo "Export start Datetime :   $( date '+%Y-%m-%d %H:%M:%S')"
    echo "  " >> "$LOGFILE"
    echo "Export start Datetime :   $( date '+%Y-%m-%d %H:%M:%S') " >> "$LOGFILE"

   
  else
      echo "________________________________________________"
        echo " "
      echo "Other Export is running try later : $status"
      
  fi
  
  expostatus=""
  
  # Loop until status becomes "complete"
  while [ "$expostatus" != *"complete"*  ]; do

    exporesponse=$(curl -s -u "$USER:$PASS" -H "Content-Type: application/json" -X POST "$URL")
    
    expostatus=$(echo "$exporesponse" | grep -o '"status":"[^"]*' | awk -F: '{print $2}' | tr -d '"')
     echo "  " >> "$LOGFILE"
     echo "Export status  :  $expostatus" >> "$LOGFILE"
   
    echo "Current status: $expostatus"
    
    if [[ "$expostatus" == *"complete"* ]]; then
    
        echo "Command completed successfully."
        
         
        timestamp=$(date +"%Y%m%d%H%M%S")
        # Folder name with the timestamp
        dest_dir="backup_$timestamp"
        tar_dir="backup_$timestamp"
        
        # Changes 
        cd "$BACKUP_FOLDER_PATH"
        
        # Create the folder
        mkdir "$dest_dir"
        echo "Folder '$dest_dir' created successfully."
        cd "$folder_name"
    
        for file in $(docker exec sdnr find /opt/opendaylight/daexim/ -type f); do
        docker cp sdnr:"$file" "$dest_dir"
        done
      
        
         latest_folder=$(ls -td ./*/ | head -1)
         echo "Latest folder: $latest_folder"
         
          tar -czvf "$tar_dir".tar.gz -C "$BACKUP_FOLDER_PATH/$latest_folder" .
          
          CHECKSUM_FILE="$tar_dir.sha256"
         
         echo "Generating checksum..."
         
         sha256sum "$tar_dir".tar.gz  > "$CHECKSUM_FILE"
         
         echo "checksum file $CHECKSUM_FILE"
         
         rm -r "$latest_folder"
         
          
         echo "Export End Datetime :      $( date '+%Y-%m-%d %H:%M:%S')"
         
           echo "  " >> "$LOGFILE"
           echo "Export End Datetime  :   $( date '+%Y-%m-%d %H:%M:%S')" >> "$LOGFILE"
           
           echo "  " >> "$LOGFILE"
           echo "Export status  :  $expostatus" >> "$LOGFILE"
        
        break
    fi
    # Wait a bit before checking again
    sleep 1

done


