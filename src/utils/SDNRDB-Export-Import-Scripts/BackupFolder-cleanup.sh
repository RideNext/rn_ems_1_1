  # Directory containing the folders
  
  TARGET_DIR=$1
  
  # Check if the directory is provided and exists
  
  if [ -z "$TARGET_DIR" ] || [ ! -d "$TARGET_DIR" ]; then
  
   echo "Usage: $0 <directory_path>" 
  exit 1
  
  fi
  
  # Find all folders, sort by modification time, and skip the latest 3
  
  FOLDERS_TO_DELETE=$(ls -t "$TARGET_DIR" | tail -n +4)
  
  # Loop through and delete each folder
  
  
  for folder in $FOLDERS_TO_DELETE; do FULL_PATH="$TARGET_DIR/$folder" 
  
  if [ -d "$FULL_PATH" ]; then
  
   echo "Deleting folder: $FULL_PATH"
   
   rm -rf  "$FULL_PATH"
   
   echo "Folder  deleted: $FULL_PATH"
  
  fi done
  
  echo "Cleanup completed....."
  
  
# Find all .tar.gz files, sort by modification time, and exclude the latest 4
FILES_TO_DELETE=$(ls -t "$TARGET_DIR"/*.tar.gz 2>/dev/null | tail -n +4)

# Check if there are files to delete
if [ -z "$FILES_TO_DELETE" ]; then
    echo "No files to delete or fewer than 5 .tar.gz files found."
    exit 0
fi

# Delete the files
echo "Deleting old .tar.gz files..."
echo "$FILES_TO_DELETE" | xargs rm -f


# Find all .tar.gz files, sort by modification time, and exclude the latest 4
FILES_TO_DELETE=$(ls -t "$TARGET_DIR"/*.sha256 2>/dev/null | tail -n +4)

# Check if there are files to delete
if [ -z "$FILES_TO_DELETE" ]; then
    echo "No files to delete or fewer than 5 .sha256 files found."
    exit 0
fi

# Delete the files
echo "Deleting old .sha256 files..."
echo "$FILES_TO_DELETE" | xargs rm -f

