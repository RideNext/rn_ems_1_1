
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
@Document(indexName = "cuup_config")
public class ESCUUP {
	@Id
    private String NodeId;
	@Field(type = FieldType.Object)
	private ESCUUPData cuupdata;
    
	public String getNodeId() {
		return NodeId;
	}
	
	public void setNodeId(String NodeId) {
		this.NodeId=NodeId;
	}
	public ESCUUPData getCuupdata() {
		return cuupdata;
	}

	public void setCuupdata(ESCUUPData cuupdata) {
		this.cuupdata = cuupdata;
	}
	
	public ESCUUP() {
    }

	public ESCUUP(String NodeId, ESCUUPData cuupdata) {
		super();
		this.NodeId=NodeId;
		this.cuupdata = cuupdata;
	}

	
	
}
