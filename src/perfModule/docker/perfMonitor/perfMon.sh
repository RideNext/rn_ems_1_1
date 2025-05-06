#!/bin/bash


####
# DB STRINGS
####
SQL_DB="SQL"
logFileName=""
logName="PerfLog"
FILE_MAX_SIZE=100000
MAX_FILE_COUNT=100
MAX_ALLOWED_RANGE=10  ## Total File Counts: MAX_FILE_COUNT+MAX_ALLOWED_RANGE
PM_XML_DIR="/home/perfModule/rawXml"
echo "$PM_XML_DIR"
PROCESS_DIR="/home/perfModule/procesedXml"
CSV_DIR="/home/perfModule/csvFiles"
ERROR_DIR="/home/perfModule/errorXml"
SCRIPT_DIR="/home/perfModule/perfMonitor"


echo "DELAY : ${DELAY}"
echo " PERFORMANCE DB SUPPORT: ${PERF_DB_TYPE} : ${DB_TYPE} "
echo  " DATABASE IP : "
echo  "       ELASTIC : ${EL_IP}"
echo  "       ${PERF_DB_TYPE} : ${DB_IP}"

export EL_IP=${EL_IP}

#echo "Watcher script is now running. Watching for file changes in $csv_files_dir." >> "$log_file"

function isFileCleanupReq()
{
    echo " Check For Number Of files List In DIR: "
    echo "  ${PROCESS_DIR} "
    echo "  ${CSV_DIR} "

    ## Check For Processed File Count
    pushd ${PROCESS_DIR}

    PRFCnt=$(ls -lrt | wc -l)
    echo " Number of Files Available IN DIR  ${PROCESS_DIR}: "
    echo "COUNT: $PRFCnt"
    if [[ $PRFCnt -gt 1 ]];then
       prfl=$(ls -lrt | cut -d' ' -f10)
       echo $prfl
       maxPCnt=$(($MAX_FILE_COUNT+$MAX_ALLOWED_RANGE))
       echo " Current File LIST In ${PROCESS_DIR}: $maxPCnt "
    fi

    popd

    ## Check for CSV File Count
    pushd ${CSV_DIR}
    CSVCnt=$(ls -lrt | wc -l)
    echo " Number of Files Available IN DIR  ${CSV_DIR}: "
    echo "COUNT: $CSVCnt"

    if [[ $CSVCnt -gt 1 ]];then
       csfl=$(ls -lrt | cut -d' ' -f10)
       echo $csfl
       maxCCnt=$(($MAX_FILE_COUNT+$MAX_ALLOWED_RANGE))
       echo " Current File LIST In ${CSV_DIR}: $maxCCnt "
    fi
    popd


}


function displayError()
{
	errstr=$1
	while [ true ];
	do
            echo  " Cannot Find Required Information  For Processing : "
	    echo  " $errstr "
	    sleep  5
	done

}

function hostSrcExec()
{
   printf " ---------------------------------------------------- \n"
   if [[ -f /home/perfModule/perfMonitor/topics.sh ]];then
       printf " HOST SCRIPT AVAIBLAE IN PATH: /home/perfModule/hst/topics.sh \n "
       bash /home/perfModule/perfMonitor/topics.sh  &
       sleep 5
   else
       printf " ERR: HOST SCRIPT NOT AVAIBLAE IN PATH: /home/perfModule/hst/topics.sh \n"

   fi
   printf " ---------------------------------------------------- \n"


}

###################################################################################
####
###    rawXml : is the input folder for ves-collector. ves-collector/sdnr will do sftp /upload the 
####          received performance files  to this folder
###   
###    procesedXml :  is the place folder for processed xml files ; Once the files are in this placefolder 
##                   means, received performance xml files been converted into CSV and inserted into elastic search
###
####   csvFiles    :  Inserted CSV Files , kept it here.
###
##     The files should be deleted from processedXml and csvFiles, after certian count.
##
###################################################################################

function startAndCheckDir()
{
#    bash /home/perfModule/perfMonitor/background_script.sh  &
#    monitor_pid=$!
#    while true; do
#    if ! docker inspect "$(hostname)" &>/dev/null; then
#        echo "Container has stopped. Killing monitor script."
#        kill "$monitor_pid"
#        exit
#    fi

    printf " $0 :  Executing WRDir: $PWD \n" 
    printf " Validate the Availability of DIR: \n"

    if [[ ! -d  "${PM_XML_DIR}" ]];then
        printf " ERROR: Cannot find the XML Input Dir : For Perfromance files to copy \n"
	printf " ERROR: Trying to Create it: ${PM_XML_DIR} "
	mkdir -p  "${PM_XML_DIR}"
    fi

    if [[ ! -d  "${PROCESS_DIR}" ]];then
        printf " ERROR: Cannot find the XML Output Dir : Converted To CSV \n"
	printf " ERROR: Trying to Create it: ${PROCESS_DIR} "
	mkdir -p  "${PROCESS_DIR}"
    fi

    if [[ ! -d  "${CSV_DIR}" ]];then
        printf " ERROR: Cannot find the CSV Dir :  \n"
	printf " ERROR: Trying to Create it: ${CSV_DIR} "
	mkdir -p  "${CSV_DIR}"
    fi

    if [[ -d "${PM_XML_DIR}"  &&  -d  "${PROCESS_DIR}"  &&  -d  "${CSV_DIR}" ]];then
        echo " Performance Directories are available For Processing: "
	echo " "
    else
        printf " ERROR: Cannot Find The Required Directory .... \n"
	printf " Display the Error In loop "

	displayError  "Directory:Error:Cannot Find Required Directories"

    fi

    # Print Starting Time Stamp
    log_timeStamp
    # start the log file
#done
}




function log_timeStamp()
{
   WrkDir=${PWD}
   unset  logFileName
   logFileName="${WrkDir}/logs/${logName}.$(date +'%Y-%m-%d').log"
   touch   "${logFileName}"
   echo  " #################################################################################" >  "${logFileName}"
   echo  " " >>  ${logFileName}
   echo  " $0: Started ... :" >>  ${logFileName}
   echo  $(date +"%d-%m-%Y %T.%N %Z")  >> ${logFileName}

   echo  "Creating the Log File : IN: ${logFileName} "
   
   echo "$logFileName"

}

function checkLogSize()
{
  myfilesize=$(wc -c "${logFileName}" | cut -d' ' -f1)
  printf "%d\n" $myfilesize
  if [[  $myfilesize  -gt ${FILE_MAX_SIZE}  ]];then
      echo  " ---------------------------------------------------------------------------------------------- " >> ${logFileName}
      printf "This file size is %d bytes  : $myfilesize"  >> ${logFileName}
      echo  " ---------------------------------------------------------------------------------------------- " >> ${logFileName}
      echo  " Creating the New Log File ..... "
      echo " "
      log_timeStamp
  fi
}

function missedFilesProcessing()
{
   printf  " If we missed any previous Files : Process Now  \n" >> "${logFileName}"
   echo "pwd before executing python file: $(pwd)" >> "${logFileName}"
   echo "Started all files execution at: $(date +"%d-%m-%Y %T.%N %Z")"  >> ${logFileName}

   #python "${SCRIPT_DIR}/xml_to_csv.py"  "${PM_XML_DIR}"  "${CSV_DIR}" 

   for xml_file in "${PM_XML_DIR}"/*.xml; do
        if [ -f "$xml_file" ]; then  # Check if it's a regular file
        echo "-----------------------------------------------------------------------------" >> "${logFileName}"
            
                if [[ "${PERF_DB_TYPE}" == "SQL" ]];then
                   echo "Processing XML file: $xml_file" >> "${logFileName}"
   
                  csv_file=$(python3 "${SCRIPT_DIR}/xml_to_csv.py" "${PM_XML_DIR}" "${CSV_DIR}" "${xml_file}" "${logFileName}")
                  if [[ -z "$csv_file" ]] || [[ "$csv_file" == *"Error"* ]]; then
                # Move the XML file to the error directory
                      mv "${PM_XML_DIR}/${xml_file}" "${ERROR_DIR}"
                      echo "Moved ${xml_file} to the error directory" >> "${logFileName}"
                      echo "-----------------------------------------------------------------------------" >> "${logFileName}"
                    fi
		               echo " DBTYPE: Set as SQL: Insert Valid XML Into SQL:DB "
                   python3 "${SCRIPT_DIR}/xml_to_mysql.py" "${PM_XML_DIR}" "${xml_file}" "${logFileName}" "${EL_IP}"
                   mv "${xml_file}" "${PROCESS_DIR}"
                   echo "Moved ${xml_file} to the processed directory" >> "${logFileName}"
                elif [[ "${PERF_DB_TYPE}" == "ELASTIC" ]]; then
                    echo "Processing XML file: $xml_file" >> "${logFileName}"
                    csv_file=$(python3 "${SCRIPT_DIR}/xml_to_csv.py" "${PM_XML_DIR}" "${CSV_DIR}" "${xml_file}" "${logFileName}")

                    if [[ -z "$csv_file" ]] || [[ "$csv_file" == *"Error"* ]]; then
                    # Move the XML file to the error directory
                      mv "${PM_XML_DIR}/${xml_file}" "${ERROR_DIR}"
                      echo "Moved ${xml_file} to the error directory" >> "${logFileName}"
                    echo "-----------------------------------------------------------------------------" >> "${logFileName}"
                    fi

                    echo "DBTYPE: Set as Elastic: Insert Valid XML Into Elastic DB"
                    python3 "${SCRIPT_DIR}/upload_to_es.py" "${csv_file}" "${EL_IP}" "${logFileName}"
                    mv "${xml_file}" "${PROCESS_DIR}"
                    echo "Moved ${xml_file} to the processed directory" >> "${logFileName}"
                else
                   echo " DBTYPE: Set as Kafka: Insert Valid XML Into Kafka:DB "
                   echo "waiting for message" >> "${logFileName}"
                   mv "${xml_file}" "${PROCESS_DIR}"
                   echo "Moved ${xml_file} to the processed directory" >> "${logFileName}"
                    
	        fi
        echo "-----------------------------------------------------------------------------" >> "${logFileName}"
            
        fi
    done
    echo "Completed all files execution at: $(date +"%d-%m-%Y %T.%N %Z")"  >> ${logFileName}
   
}

function  processCurrentFile()
{
   printf   " Process The LatestFile That has created : \n"


}


function  processFileNotification()
{

  ######################################################################################
  ###  inotifywait : use this procedure for any change in the directory
  ###   script would get asynchounous notification for any new files created here;rawXml
  ###   Prior checking new file, do check for missing files and process those files
  #######################################################################################

  #while inotifywait -o ${logFileName} -m  -e create  "${PM_XML_DIR}/"; do

  #inotifywait -m "${PM_XML_DIR}/" -e create -e moved_to --format '%f' |
  echo "log_file: ${logFileName}"
  echo "${log_file_name}" >> "${logFileName}"
  echo "${PM_XML_DIR}/" >> "${logFileName}"

  inotifywait -m "${PM_XML_DIR}/" -e create -e moved_to  |
    while read -r directory action file; do
    
     #Check is it more than one file or single file
     if [[ ${file} == *.xml ]];then 
           #Check for Created File 
	      echo " Check For Number of  XML-Files In DIR: ${PM_XML_DIR}" >> "${logFileName}"
        nc=($(ls  ${PM_XML_DIR}/*.xml | wc ))
        fc=${nc[0]}
	      echo " Found Performance XML Files[ $fc ]  IN DIR: ${PM_XML_DIR} " >> "${logFileName}"
        if [[ $fc -gt  1 ]];then
		       echo " Found Missed File : Process all files Together " >> "${logFileName}"
		       missedFilesProcessing 
	else
           #echo "WatchedFile Name : ${watched_filename} " >> "${logFileName}"
           #echo "EVENT_NAMES: ${EVENT_NAMES}" >> "${logFileName}"
           echo "one file detected" >> "${logFileName}"
           #echo "File That Created ${event_filename} " >> "${logFileName}"
           echo "WATCHED FILE: $file " >> "${logFileName}"
		       echo " File: to Be Parsed: ${file} " >> "${logFileName}"
           echo "pwd before executing python file: $(pwd)" >> "${logFileName}"
                 
           echo "-----------------------------------------------------------------------------" >> "${logFileName}"
           
                # Move the XML file to the processed directory
           if [[ "${PERF_DB_TYPE}" == "SQL" ]];then
              echo "Processing XML file: $file" >> "${logFileName}"
   
              csv_file=$(python3 "${SCRIPT_DIR}/xml_to_csv.py" "${PM_XML_DIR}" "${CSV_DIR}" "${file}" "${logFileName}")
              if [[ -z "$csv_file" ]] || [[ "$csv_file" == *"Error"* ]]; then
                # Move the XML file to the error directory
                  mv "${PM_XML_DIR}/${file}" "${ERROR_DIR}"
                  echo "Moved ${file} to the error directory" >> "${logFileName}"
                  echo "-----------------------------------------------------------------------------" >> "${logFileName}"
              fi
               echo " DBTYPE: Set as SQL: Insert Valid XML Into SQL:DB "
               python3 "${SCRIPT_DIR}/xml_to_mysql.py" "${PM_XML_DIR}" "${file}" "${logFileName}" "${EL_IP}"
               mv "${PM_XML_DIR}/${file}" "${PROCESS_DIR}"
               echo "Moved ${file} to the processed directory" >> "${logFileName}"
           elif [[ "${PERF_DB_TYPE}" == "ELASTIC" ]]; then
               echo "Processing XML file: $file" >> "${logFileName}"
                csv_file=$(python3 "${SCRIPT_DIR}/xml_to_csv.py" "${PM_XML_DIR}" "${CSV_DIR}" "${file}" "${logFileName}")

                if [[ -z "$csv_file" ]] || [[ "$csv_file" == *"Error"* ]]; then
        # Move the XML file to the error directory
                    mv "${PM_XML_DIR}/${file}" "${ERROR_DIR}"
                    echo "Moved ${file} to the error directory" >> "${logFileName}"
                    echo "-----------------------------------------------------------------------------" >> "${logFileName}"
                fi

                echo "DBTYPE: Set as Elastic: Insert Valid XML Into Elastic DB"
                python3 "${SCRIPT_DIR}/upload_to_es.py" "${csv_file}" "${EL_IP}" "${logFileName}"
                mv "${PM_XML_DIR}/${file}" "${PROCESS_DIR}"
                echo "Moved ${file} to the processed directory" >> "${logFileName}"
           else
               echo " DBTYPE: Set as Kafka: Insert Valid XML Into Kafka:DB "
               echo "waiting for message" >> "${logFileName}"
               mv "${PM_XML_DIR}/${file}" "${PROCESS_DIR}"
               echo "Moved ${file} to the processed directory" >> "${logFileName}"
                    
                
                # Process the CSV file
                
                
                echo "-----------------------------------------------------------------------------" >> "${logFileName}"
            fi
            unset ${file}
                 
  

	      fi
	      isFileCleanupReq
       fi

   done

      


}






hostSrcExec
startAndCheckDir
processFileNotification

