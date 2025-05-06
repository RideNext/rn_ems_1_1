
 /***
  * ################################################################################################
  * #                                                                                              #
  * #   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd]. All rights  reserved         #
  * #                                                                                              #
  * ################################################################################################
 ****/

package com.nbi.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
import org.springframework.stereotype.Component;

@Component
@Document(indexName = "cucp_config")
public class ESCUCP {
	@Id
	private String NodeId;
	@Field(type = FieldType.Object)
	private ESCUCPData cucpdata;
	public String getNodeId() {
		return NodeId;
	}
	public void setNodeId(String nodeId) {
		NodeId = nodeId;
	}
	public ESCUCPData getCucpdata() {
		return cucpdata;
	}
	public void setCucpdata(ESCUCPData cucpdata) {
		this.cucpdata = cucpdata;
	}
	public ESCUCP(String nodeId, ESCUCPData cucpdata) {
		super();
		NodeId = nodeId;
		this.cucpdata = cucpdata;
	}
	public ESCUCP() {
		
	}
	@Override
	public String toString() {
		return "ESCUCP [NodeId=" + NodeId + ", cucpdata=" + cucpdata + "]";
	}
	
	
	
}
