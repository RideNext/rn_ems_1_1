
 /***
  * ################################################################################################
  * #                                                                                              #
  * #   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd]. All rights  reserved         #
  * #                                                                                              #
  * ################################################################################################
 ****/

package com.nbi.entity;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
import org.springframework.stereotype.Component;

@Component
@Document(indexName = "cell_config")
public class ESCellConfig {
	@Id
    private String NodeId;
	
	@Field(type = FieldType.Object)
	private List<ESCellConfigData> cellConfigdata;

	public String getNodeId() {
		return NodeId;
	}

	public void setNodeId(String nodeId) {
		NodeId = nodeId;
	}

	public List<ESCellConfigData> getCellConfigdata() {
		return cellConfigdata;
	}

	public void setCellConfigdata(List<ESCellConfigData> cellConfigdata) {
		this.cellConfigdata = cellConfigdata;
	}

	public ESCellConfig(String nodeId, List<ESCellConfigData> cellConfigdata) {
		super();
		NodeId = nodeId;
		this.cellConfigdata = cellConfigdata;
	}

	public ESCellConfig() {
		
	}

	@Override
	public String toString() {
		return "ESCellConfig [NodeId=" + NodeId + ", cellConfigdata=" + cellConfigdata + "]";
	}
	
    
}
