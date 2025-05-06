
    SOURCE_PASS=$1 
    SOURCE_USER=$2 
    SOURCE_IP=3 
    SOURCE_FOLDER_PATH=$4 
    DESTINATION_PATH=$5 
    LOG_FOLDE=$6
    
    #SOURCE_PASS="iltwat123#" 
    #SOURCE_USER="nms-auto"
    #SOURCE_IP="192.168.120.225"
    #SOURCE_FOLDER_PATH=/home/nms-auto/Mohan/BackupFolder
    #DESTINATION_PATH=/home/nms-auto/Mohan/BackupFolder
    #LOG_FOLDER=/home/nms-auto/Mohan/BackupFolder
 
    LOGFILE="$LOG_FOLDER/import.log"
    
   HOST_IP=$(ip addr show $(ip route | awk '/default/ {print $5}') | awk '/inet / {print $2}' | cut -d/ -f1)
   
   echo "REST_IP: $HOST_IP"
  
    USERNAME="admin"
    PASSWORD="admin"
      
    
    
    LATEST_SRC_TARFILE=$(sshpass -p "$SOURCE_PASS" ssh -o  StrictHostKeyChecking=no "$SOURCE_USER"@"$SOURCE_IP" "ls -td "$SOURCE_FOLDER_PATH"/*.tar.gz 2>/dev/null | head -n 1")
    
    LATEST_SRC_CHECKSUM_FILE=$(sshpass -p "$SOURCE_PASS"  ssh -o  StrictHostKeyChecking=no "$SOURCE_USER"@"$SOURCE_IP" "ls -td "$SOURCE_FOLDER_PATH"/*.sha256 2>/dev/null | head -n 1")
    
    
    echo "$LATEST_SRC_TARFILE"
    
    if [ -z "$LATEST_SRC_TARFILE" ] ; then
        echo "Source file is Empty...."
        exit 1
    fi
    
    
    sshpass -p "$SOURCE_PASS" scp -o StrictHostKeyChecking=no  "$SOURCE_USER"@"$SOURCE_IP":"$LATEST_SRC_TARFILE" "$DESTINATION_PATH"
    
    sshpass -p "$SOURCE_PASS" scp -o StrictHostKeyChecking=no  "$SOURCE_USER"@"$SOURCE_IP":"$LATEST_SRC_CHECKSUM_FILE" "$DESTINATION_PATH"
    
    cd "$DESTINATION_PATH"
     
     #pwd
     
    
    latest_tar_file=$(ls -td *.tar.gz 2>/dev/null | head -n 1)
    
     dest_dir="${latest_tar_file%%.*}"
     
     echo "dest_dir...  $dest_dir"
    
     CHECKSUM_FILE="$dest_dir"_target.sha256
         
     echo "Generating checksum..."
         
     sha256sum "$latest_tar_file"  > "$CHECKSUM_FILE"
    
    
    
    CHECKSUM1=$(cat "$CHECKSUM_FILE")
    CHECKSUM2=$(cat "$LATEST_SRC_CHECKSUM_FILE")  
    
      if [ "$CHECKSUM1" == "$CHECKSUM2" ]; then
          echo "tar file CHECKSUM is   match!"
          echo "tar file CHECKSUM is   match! " >> "$LOGFILE"
      else
          echo "tar file CHECKSUM is do not match."
           echo "tar file CHECKSUM is do not match." >> "$LOGFILE"
           exit 1
      fi
         
    
    echo "latest_tar_file $latest_tar_file"
    
    mkdir "$dest_dir"
    
    tar -xzvf "$latest_tar_file" -C "$DESTINATION_PATH"/"$dest_dir"
    
    pwd
    
    
    echo "Latest folder ...: $dest_dir"
    sleep 2

    docker cp "$DESTINATION_PATH"/"$dest_dir"/. sdnr:/opt/opendaylight/daexim/
    sleep 2

      URL="http://"$HOST_IP":8181/rests/operations/data-export-import:immediate-import"

      BODY='{ "input" : { "check-models" : true, "clear-stores" : "all" }}'
      
    impresponse=$(curl -s -u "$USERNAME:$PASSWORD" -H "Content-Type: application/json" -X POST -d "$BODY" "$URL")
    echo "Import  start Datetime :   $( date '+%Y-%m-%d %H:%M:%S')"
    
    echo "impresponse:  $impresponse"
    
    sleep 2
  
    impresult=$(echo "$impresponse" | grep -o '"result":[^}]*' | awk -F: '{print $2}' | tr -d ' ')
    echo "Import  end Datetime :   $( date '+%Y-%m-%d %H:%M:%S')"
    echo "Import  status :  $impresult"
    
    echo "expresult: $impresult"

    
    
    
    
    
    