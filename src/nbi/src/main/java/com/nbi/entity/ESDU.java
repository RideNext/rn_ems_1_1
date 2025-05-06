
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
@Document(indexName = "du_config")
public class ESDU {
	
	@Id
    private String NodeId;
	@Field(type = FieldType.Object)
	private List<ESDUData> duConfigdata;
	public String getNodeId() {
		return NodeId;
	}
	public void setNodeId(String nodeId) {
		NodeId = nodeId;
	}
	public List<ESDUData> getDuConfigdata() {
		return duConfigdata;
	}
	public void setDuConfigdata(List<ESDUData> duConfigdata) {
		this.duConfigdata = duConfigdata;
	}
	public ESDU(String nodeId, List<ESDUData> duConfigdata) {
		super();
		NodeId = nodeId;
		this.duConfigdata = duConfigdata;
	}
	public ESDU() {
		
	}
	@Override
	public String toString() {
		return "ESDU [NodeId=" + NodeId + ", duConfigdata=" + duConfigdata + "]";
	}
	
	
	
	
	

}
