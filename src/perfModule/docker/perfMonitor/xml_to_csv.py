#!/usr/bin/env python3
import os
import csv
import xml.etree.ElementTree as ET
from datetime import datetime, timedelta
import sys
import random
import logging
from xml.etree.ElementTree import QName
try:
    from builtins import FileNotFoundError
except ImportError:
    FileNotFoundError = IOError

def parse_xml_to_csv(xml_file, csv_file):
    logging.info("Started CSV Conversion: %s", datetime.now())
    namespace = {'measData': 'http://www.3gpp.org/ftp/specs/archive/28_series/28.532#measData'}
    tree = ET.parse(xml_file)
    root = tree.getroot()
    sender = root.find(".//measData:fileSender", namespaces=namespace).get("senderName") 
    end_time_element = root.find(".//measData:granPeriod", namespaces=namespace)
    if end_time_element is not None:
        end_time = end_time_element.get("endTime") or end_time_element.get("endtime")
        if end_time:
            end_time = datetime.fromisoformat(end_time)
        else:
            raise ValueError("endTime and endtime are missing from granPeriod")
    else:
        raise ValueError("granPeriod element is missing")

    list0 = []
    list0.extend(range(1, len(root[1][1])))
    list1 = []
    list2 = []
    list4=[]
    res = []
    k = 0
    time = []

    for meas_value in root.findall(".//measData:measValue", namespaces=namespace):
        meas_obj_ldn = meas_value.get("measObjLdn")
        res.append(meas_obj_ldn)

    for i in range(0, len(root[1][1])):
        if("measType" != root[1][1][i].tag.split('}')[-1] and "measValue" != root[1][1][i].tag.split('}')[-1] ):
            continue
        
        if len(root[1][1][i]) == 0:
            list2.append(root[1][1][i].text)

        if len(root[1][1][i]) != 0:
            list1 = []
            j = 1
            list3 = [res[k]] * len(root[1][1][i])
            k += 1

            while j != len(root[1][1][i]):
                time_zone_offset = timedelta(hours=5, minutes=30)
                formatted_datetime = end_time.strftime("%Y-%m-%dT%H:%M:%S.%f")
                time_zone_offset_str = '{:+03d}:{:02d}'.format(time_zone_offset.seconds // 3600,
                                                               (time_zone_offset.seconds // 60) % 60)
                formatted_datetime_with_offset = formatted_datetime + time_zone_offset_str
                time.append(formatted_datetime_with_offset)

                # Append randomly generated values between 70 to 90
                #list1.append(str(random.randint(70, 90)))
                
                list1.append(root[1][1][i][j].text)
                
                list4.append(sender.split(',')[1].split('=')[1])

                j += 1

            dict_1 = zip(list0,list4, time, list3, list2, list1)

            file_exists = False

            try:
                with open(csv_file, 'r') as f:
                    file_exists = True
            except FileNotFoundError:
                pass

            try:
                with open(csv_file, 'a') as csvfile:
                    csv_writer = csv.writer(csvfile)

                    if not file_exists:
                        csv_writer.writerow(['Number', 'Node ID', 'Time', 'Cell ID', 'Type', 'Value'])

                    csv_writer.writerows(dict_1)
                #logging.info("CSV conversion successful.")
            except Exception as e:
                #logging.error("Error converting to CSV: %s", str(e))
                return False
    
    return True

if __name__ == '__main__':
    if len(sys.argv) != 5:
        print("Usage: python script.py <xml_folder_path> <csv_folder_path> <xml_file> <log_file>")
        sys.exit(1)
    
    xml_in_folder = sys.argv[1]
    csv_folder = sys.argv[2]
    xml_file = sys.argv[3]
    log_file = sys.argv[4]
    
    logging.basicConfig(filename=log_file, level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')
    
    xml_path = os.path.join(xml_in_folder, xml_file)
    csv_path = os.path.join(csv_folder, 'file_{}.csv'.format(datetime.now().strftime("%Y%m%d%H%M%S%f")[:-3]))
    
    try:
        if parse_xml_to_csv(xml_path, csv_path):
            logging.info("Completed CSV Conversion: %s", datetime.now())
            print(csv_path)
        else:
            logging.error("Error in CSV Conversion")
    except Exception as e:
        logging.error("Error: %s", str(e))
        sys.exit(1)
