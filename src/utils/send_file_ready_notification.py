######################################################################################################
#                                                                                                    #
#   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd] . All rights  reserved              #
#                                                                                                    #
######################################################################################################


import requests
import urllib3
import threading
import time
import base64
import os
import shutil
from datetime import datetime

# Disable SSL certificate verification warnings
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

#Dummy xml files configured for each device
xml_folder = '/home/rnacumos/dummy_xml_files'

#Dummy xml files are renamed and copied here
destination_folder = '/home/rnacumos/renamed_xml_files'

#ip for ves collector end point
ip_address = '192.168.128.77'

#Authentication for ves collector
username ='sample1'
password ='sample1'

#Authentication for Host machine 
host_username = "rnacumos"
host_password ="test123"



def copy_file_with_timestamp(source_file, destination_folder):
    file_name_without_extension = os.path.splitext(os.path.basename(source_file))[0]
    timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
    new_file_name = f"{file_name_without_extension}_{timestamp}.xml"
    destination_file_path = os.path.join(destination_folder, new_file_name)
    shutil.copy(source_file, destination_file_path)
    return destination_file_path

def post_message_to_endpoint(file_path):
    endpoint_url = f'https://{ip_address}:8443/eventListener/v7'
    
    message_payload = {
    "event": {
        "commonEventHeader": {
            "domain": "notification",
            "version": "4.1",
            "eventId": "Notification_1",
            "eventName": "Notification_Performance",
            "sequence": 1,
            "priority": "Normal",
            "sourceId": "00256D",
            "reportingEntityName": "gNB_CU_vendorA_ORUAA100_FR1918010111",
            "timeZoneOffset": "UTC+05:30",
            "vesEventListenerVersion": "7.1.1",
            "sourceName": "HgNB_193",
            "startEpochMicrosec": 1700112303595836,
            "lastEpochMicrosec": 1700112303595836,
            "eventType": "kpi_Performance_notification",
            "internalHeaderFields": {}
        },
        "notificationFields": {
            "changeIdentifier": "PM_MEAS_FILES",
            "changeType": "fileReady",
            "notificationFieldsVersion": "2.0",
            "arrayOfNamedHashMap": [
                {
                    "name": os.path.basename(file_path),
                    "hashMap": {
                        "location": f"sftp://{host_username}:{host_password}@{ip_address}:"+file_path,
                        "compression": " ",
                        "fileFormatType": "XML",
                        "fileSize": "23447",
                        "fileDataType": "PERFORMANCE",
                        "fileFormatVersion": "V10"
                    }
                }
            ]
        }
    }
}
    
    headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + base64.b64encode(f'{username}:{password}'.encode()).decode()
    }

    try:
        response = requests.post(endpoint_url, json=message_payload, headers=headers, verify=False)
        response.raise_for_status()  
        print(f'Message posted successfully: {response.text}')
    except requests.exceptions.RequestException as e:
        print(f'Error posting message: {e}')

def main():
    
    source_file = f'{xml_folder}/dataset1.xml'  
    timestamped_file_path = copy_file_with_timestamp(source_file, destination_folder)
    post_message_to_endpoint(timestamped_file_path)
    
    source_file = f'{xml_folder}/dataset2.xml' 
    timestamped_file_path = copy_file_with_timestamp(source_file, destination_folder)
    post_message_to_endpoint(timestamped_file_path)
    
    source_file = f'{xml_folder}/dataset3.xml'  
    timestamped_file_path = copy_file_with_timestamp(source_file, destination_folder)
    post_message_to_endpoint(timestamped_file_path)
    
    source_file = f'{xml_folder}/dataset4.xml' 
    timestamped_file_path = copy_file_with_timestamp(source_file, destination_folder)
    post_message_to_endpoint(timestamped_file_path)


    try:
        
        while True:
            time.sleep(1)  
    except KeyboardInterrupt:
        print('Stopping the Execution...')  

if __name__ == '__main__':
    main()
