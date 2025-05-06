#!/bin/bash

# Directory containing the log folders
#LOGS_DIR="/home/nms-auto/ems/exec/logs"
LOGS_DIR=${myvar}

# Rotate cron.log
if [ -f "$LOGS_DIR/cron/stats.log" ]; then
    if [ $(/usr/bin/stat -c %s $LOGS_DIR/cron/stats.log) -gt 102400 ]; then
        /bin/tar -czf $LOGS_DIR/cron/stats_$(/bin/date +'%Y%m%d%H%M').tar.gz -C $LOGS_DIR/cron stats.log
        : > $LOGS_DIR/cron/stats.log  # Truncate the file
        echo "Rotated cron.log"
    fi
else
    echo "$LOGS_DIR/cron/cron.log does not exist."
fi

# Rotate rotator.log
if [ -f "$LOGS_DIR/cron/rotator.log" ]; then
    if [ $(/usr/bin/stat -c %s $LOGS_DIR/cron/rotator.log) -gt 102400 ]; then
        /bin/tar -czf $LOGS_DIR/cron/rotator_$(/bin/date +'%Y%m%d%H%M').tar.gz -C $LOGS_DIR/cron rotator.log
        : > $LOGS_DIR/cron/rotator.log  # Truncate the file
        echo "Rotated rotator.log"
    fi
else
    echo "$LOGS_DIR/cron/rotator.log does not exist."
fi
# Rotate cleanup_db.log
if [ -f "$LOGS_DIR/cron/cleanup_db.log" ]; then
	if [ $(/usr/bin/stat -c %s $LOGS_DIR/cron/cleanup_db.log) -gt 102400 ]; then
        /bin/tar -czf $LOGS_DIR/cron/cleanup_db_$(/bin/date +'%Y%m%d%H%M').tar.gz -C $LOGS_DIR/cron cleanup_db.log
        : > $LOGS_DIR/cron/cleanup_db.log  # Truncate the file
        echo "Rotated cleanup_db.log"
    fi
else
    echo "$LOGS_DIR/cron/rotator.log does not exist."
fi


# Loop through each subdirectory in the logs directory
for dir in "$LOGS_DIR"/*; do
    if [ -d "$dir" ]; then
        # Count the number of files in the directory
        file_count=$(find "$dir" -type f | wc -l)

        # Check if the number of files exceeds 10
        if [ "$file_count" -gt 10 ]; then
            echo "Directory $dir has $file_count files. Deleting old logs..."

            # Find the oldest files while keeping the latest 10
            old_files=$(find "$dir" -type f -printf '%T@ %p\n' | sort -n | head -n -10 | cut -d' ' -f2-)

            # Debug: Print the files that will be deleted
            echo "Files to be deleted in $dir:"
            echo "$old_files"

            # Delete the old files
            echo "$old_files" | xargs -d '\n' rm -f
        else
            echo "Directory $dir has $file_count files. No action required."
        fi
    fi
done

