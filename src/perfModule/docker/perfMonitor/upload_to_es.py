import csv
import sys
from elasticsearch import Elasticsearch
import logging
from datetime import datetime

def organize_data(csv_reader):
    logging.info("Organizing the Index Structure")
    pm_data_structure = {"nodes": []}

    for row in csv_reader:
        node_id = row["Node ID"]
        cell_id = row["Cell ID"]
        type_name = row["Type"]
        type_data = {
            "time": row["Time"],
            "value": row["Value"]
        }

        # Check if the node exists
        node_entry = next((node for node in pm_data_structure["nodes"] if node["node_id"] == node_id), None)

        if node_entry:
            # Node exists, check if the cell_id exists
            cell_entry = next((cell for cell in node_entry["cell_types"] if cell["cell_id"] == cell_id), None)

            if cell_entry:
                # Cell exists, check if the type exists
                type_entry = next((entry for entry in cell_entry["types"] if entry["type"] == type_name), None)

                if type_entry:
                    # Type exists, append data
                    type_entry["data"].append(type_data)
                else:
                    # Type does not exist, create a new type entry
                    new_type_entry = {"type": type_name, "data": [type_data]}
                    cell_entry["types"].append(new_type_entry)
            else:
                # Cell does not exist, create a new cell entry with a new type entry
                new_cell_entry = {"cell_id": cell_id, "types": [{"type": type_name, "data": [type_data]}]}
                node_entry["cell_types"].append(new_cell_entry)
        else:
            # Node does not exist, create a new node entry with a new cell entry and a new type entry
            new_node_entry = {"node_id": node_id, "cell_types": [{"cell_id": cell_id, "types": [{"type": type_name, "data": [type_data]}]}]}
            pm_data_structure["nodes"].append(new_node_entry)
    logging.info("Successfully Organized Es Structure")
    return pm_data_structure

def create_index_if_not_exists(es, index_name, index_mapping):
    try:
        if not es.indices.exists(index=index_name):
            logging.info("Creating ES Index")
            es.indices.create(index=index_name, body=index_mapping)
            logging.info("Successfully Created ES Index")
        return True
    except Exception as e:
        logging.error("Error creating index: %s", str(e))
        return False

def index_data_nested(es, index_name, data_structure):
    logging.info("Started data Nesting")
    unique_doc_id = "pm_data"

    try:
        if es.indices.exists(index=index_name):
            # Update or upsert the document
            update_query = {
                "script": {
                    "source": """
                        for (node_entry in params.nodes) {
                            def existing_node = ctx._source.nodes.find(n -> n.node_id == node_entry.node_id);
                            if (existing_node == null) {
                                ctx._source.nodes.add(node_entry);
                                continue;
                            }
                            for (cell_entry in node_entry.cell_types) {
                                def existing_cell = existing_node.cell_types.find(c -> c.cell_id == cell_entry.cell_id);
                                if (existing_cell == null) {
                                    existing_node.cell_types.add(cell_entry);
                                    continue;
                                }
                                for (type_entry in cell_entry.types) {
                                    def existing_type = existing_cell.types.find(t -> t.type == type_entry.type);
                                    if (existing_type == null) {
                                        existing_cell.types.add(type_entry);
                                    } else {
                                        existing_type.data.addAll(type_entry.data);
                                    }
                                }
                            }
                        }
                    """,
                    "params": {
                        "nodes": data_structure["nodes"]
                    }
                },
                "upsert": {
                    "nodes": data_structure["nodes"]
                }
            }

            # Use the update API with upsert
            response = es.update(index=index_name, id=unique_doc_id, body=update_query)
            print(response)
        else:
            # If the index doesn't exist, create it and add the data
            es.index(index=index_name, id=unique_doc_id, body={"nodes": data_structure["nodes"]})
        
        logging.info("Data is nested successfully")
        return True
    except Exception as e:
        logging.error("Error indexing data: %s", str(e))
        return False


def process_new_csv_nested(es, index_name, file_path, index_mapping):
    try:
        with open(file_path, 'r') as csv_file:
            csv_reader = csv.DictReader(csv_file)
            data_structure = organize_data(csv_reader)
            if not create_index_if_not_exists(es, index_name, index_mapping):
                return False
            if not index_data_nested(es, index_name, data_structure):
                return False
            return True
    except Exception as e:
        logging.error("Error processing CSV file: %s", str(e))
        return False

if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("Usage: python script_name.py path/to/csv_file.csv elasticsearch_ip_address log_file")
        sys.exit(1)
    csv_file_path = sys.argv[1]
    es_ip = sys.argv[2]
    log_file = sys.argv[3]

    logging.basicConfig(filename=log_file, level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
    logging.info("log_file: %s", log_file)
    logging.info("Started Uploading to ES:%s", datetime.now().strftime("%Y-%m-%dT%H:%M:%S.%f"))

    es_url = "http://" + es_ip + ":9200"
    logging.info(es_url)
    index_name = "pm_data"
    es = Elasticsearch(es_url)

    index_mapping = {
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

    if process_new_csv_nested(es, index_name, csv_file_path, index_mapping):
        logging.info("Completed Uploading to ES:%s", datetime.now().strftime("%Y-%m-%dT%H:%M:%S.%f"))
    else:
        logging.error("Failed to upload data to Elasticsearch")
