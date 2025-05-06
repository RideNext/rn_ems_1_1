
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
@Document(indexName = "basic_config")
public class ESBASIC {

	@Id
    private String NodeId;
	@Field(type = FieldType.Object)
	private ESBasicData basicdata;
	public String getNodeId() {
		return NodeId;
	}
	public void setNodeId(String nodeId) {
		NodeId = nodeId;
	}
	public ESBasicData getBasicdata() {
		return basicdata;
	}
	public void setBasicdata(ESBasicData basicdata) {
		this.basicdata = basicdata;
	}
	public ESBASIC(String nodeId, ESBasicData basicdata) {
		super();
		NodeId = nodeId;
		this.basicdata = basicdata;
	}
	public ESBASIC() {
		
	}
	@Override
	public String toString() {
		return "ESBASIC [NodeId=" + NodeId + ", basicdata=" + basicdata + "]";
	}
	
	
	
}
