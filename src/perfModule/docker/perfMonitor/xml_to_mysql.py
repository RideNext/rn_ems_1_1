import mysql.connector
import xml.etree.ElementTree as ET
from datetime import datetime
import random
import sys
import logging
import os
def create_database(cursor):
    #logging.info("create database entered")
    # Create a new database
    database_name = "performance_demo"
    cursor.execute("CREATE DATABASE IF NOT EXISTS {}".format(database_name))
    #print("Database created successfully")
    cursor.execute("USE {}".format(database_name))

    # Define table creation queries
    tables = {
        "device": """
            CREATE TABLE IF NOT EXISTS `performance_demo`.`device` (
                `device_id` INT NOT NULL AUTO_INCREMENT,
                `device_name` VARCHAR(45) NOT NULL,
                PRIMARY KEY (`device_id`)
            )
        """,
        "cell": """
            CREATE TABLE IF NOT EXISTS `performance_demo`.`cell` (
                `cell_id` INT NOT NULL AUTO_INCREMENT,
                `device_id` INT NOT NULL,
                `cell_name` VARCHAR(45) NOT NULL,
                PRIMARY KEY (`cell_id`),
                INDEX `device_id_idx` (`device_id` ASC),
                CONSTRAINT `device_id`
                    FOREIGN KEY (`device_id`)
                    REFERENCES `performance_demo`.`device` (`device_id`)
                    ON DELETE NO ACTION
                    ON UPDATE NO ACTION
            )
        """,
        "kpi": """
            CREATE TABLE IF NOT EXISTS `performance_demo`.`kpi` (
                `kpi_id` INT NOT NULL AUTO_INCREMENT,
                `kpi_name` VARCHAR(45) NOT NULL,
                PRIMARY KEY (`kpi_id`)
            )
        """,
        "data": """
            CREATE TABLE IF NOT EXISTS `performance_demo`.`data` (
                `data_id` INT NOT NULL AUTO_INCREMENT,
                `cell_id` INT NOT NULL,
                `kpi_id` INT NOT NULL,
                `time` VARCHAR(45) NOT NULL,
                `value` VARCHAR(45) NOT NULL,
                PRIMARY KEY (`data_id`),
                INDEX `cell_id_idx` (`cell_id` ASC),
                INDEX `kpi_id_idx` (`kpi_id` ASC),
                CONSTRAINT `cell_id`
                    FOREIGN KEY (`cell_id`)
                    REFERENCES `performance_demo`.`cell` (`cell_id`)
                    ON DELETE NO ACTION
                    ON UPDATE NO ACTION,
                CONSTRAINT `kpi_id`
                    FOREIGN KEY (`kpi_id`)
                    REFERENCES `performance_demo`.`kpi` (`kpi_id`)
                    ON DELETE NO ACTION
                    ON UPDATE NO ACTION
            )
        """
    }

    # Create tables if they don't exist
    for table_name, create_table_query in tables.items():
        cursor.execute(create_table_query)
        #print(f"{table_name.capitalize()} table created successfully")

def parse_xml_to_mysql(xml_file,ip):
    #print("entered parsing")
    # Establish connection
    conn = mysql.connector.connect(
        host=ip,
        user="root",
        password="root"
    )

    # Create a cursor object
    cursor = conn.cursor()

    # Create the database and necessary tables
    create_database(cursor)

    # Parse XML file
    namespace = {'measData': 'http://www.3gpp.org/ftp/specs/archive/28_series/28.532#measData'}
    tree = ET.parse(xml_file)
    root = tree.getroot()

    # Extract sender name from XML
    sender = root.find(".//measData:fileSender", namespaces=namespace).get("senderName")
    sender_name = sender.split(',')[1].split('=')[1]
    end_time = datetime.fromisoformat(root.find(".//measData:granPeriod", namespaces=namespace).get("endTime"))
    
    # Check if the device already exists
    check_device_query = """SELECT device_id FROM performance_demo.device WHERE device_name = %s"""
    cursor.execute(check_device_query, (sender_name,))
    existing_device = cursor.fetchone()
    cursor.fetchall()

    # Insert device name if it doesn't already exist
    if not existing_device:
        print("device not exist")
        insert_device_name_query = """INSERT INTO performance_demo.device (device_name) VALUES (%s)"""
        cursor.execute(insert_device_name_query, (sender_name,))
        print("Sender name inserted into device table successfully")
    
    # Get the device ID
    get_sender_id_query = """SELECT device_id FROM performance_demo.device WHERE device_name = %s"""
    cursor.execute(get_sender_id_query, (sender_name,))
    device_id = cursor.fetchone()[0]  
    cursor.fetchall()
    
    for i in range(1, len(root[1][1])):
        if len(root[1][1][i]) == 0:
            # Check if the KPI already exists
            check_kpi_query = """SELECT kpi_id FROM performance_demo.kpi WHERE kpi_name = %s"""
            
            cursor.execute(check_kpi_query, (root[1][1][i].text,))
            existing_kpi = cursor.fetchone()

            # Insert KPI if it doesn't already exist
            if not existing_kpi:
                insert_kpi_query = """INSERT INTO performance_demo.kpi (kpi_name) VALUES (%s)"""
                cursor.execute(insert_kpi_query, (root[1][1][i].text,))
        if len(root[1][1][i]) !=0:
            #print("Successfully inserted KPI types")
            cell_name = root[1][1][i].get("measObjLdn")
            
            check_cell_and_device_query="""SELECT cell_id FROM performance_demo.cell WHERE cell_name = %s AND device_id = %s"""
            cursor.execute(check_cell_and_device_query,(cell_name,device_id,))
            cell_id_device_id=cursor.fetchone()
            cursor.fetchall()
            
            if not cell_id_device_id:
                insert_cell_id_query = """INSERT INTO performance_demo.cell (device_id, cell_name) VALUES (%s, %s)"""
                cursor.execute(insert_cell_id_query, (device_id, cell_name))
            
            get_cell_id_query = """SELECT cell_id FROM performance_demo.cell WHERE cell_name= %s"""
            cursor.execute(get_cell_id_query, (cell_name,))
            cell_id = cursor.fetchone()[0]
            cursor.fetchall()
            
            j = 1
            while j != len(root[1][1][i]):
                # Get the KPI ID
                get_kpi_id_query = """SELECT kpi_id FROM performance_demo.kpi WHERE kpi_name = %s"""
                cursor.execute(get_kpi_id_query, (root[1][1][j].text,))
                
                kpi_id = cursor.fetchone()[0]
                cursor.fetchall()
                
                # Insert data
                insert_data_query = """INSERT INTO performance_demo.data (cell_id, kpi_id, time, value) VALUES (%s, %s, %s, %s)"""
                cursor.execute(insert_data_query, (cell_id, kpi_id, datetime.now().strftime("%Y-%m-%d %H:%M:%S"), random.randint(70, 90)))
                j += 1
                
    #print("Insertion of Data is Successful")
                
    # Commit the transaction
    conn.commit()

    # Close cursor and connection
    cursor.close()
    conn.close()
if __name__ == '__main__':
    if len(sys.argv) != 5:
        print("Usage: python script.py <xml_folder> <xml_file> <log_file> <IP_ADDRESS> ")
        sys.exit(1)
    
    xml_in_folder = sys.argv[1]
    xml_file = sys.argv[2]
    log_file = sys.argv[3]
    ip=sys.argv[4]
    
    logging.basicConfig(filename=log_file, level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')
    
    xml_path = os.path.join(xml_in_folder, xml_file)
    
    try:
        if parse_xml_to_mysql(xml_path,ip):
            logging.info("Upload to MYSQL Successful: %s", datetime.now())
            print(csv_path)
        else:
            logging.error("Error in Uploading")
    except Exception as e:
        logging.error("Error: %s", str(e))
        sys.exit(1)


# Call the function with the XML file as argument

