
 /***
  * ################################################################################################
  * #                                                                                              #
  * #   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd]. All rights  reserved         #
  * #                                                                                              #
  * ################################################################################################
 ****/

package com.nbi.entity;

import org.springframework.stereotype.Component;

@Component
public class ESBasicDataRRMPolicyList {
	private int id;
	private String Name;
	private String PLMNInfo;
	private int SNSSAI;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return Name;
	}
	public void setName(String name) {
		Name = name;
	}
	public String getPLMNInfo() {
		return PLMNInfo;
	}
	public void setPLMNInfo(String pLMNInfo) {
		PLMNInfo = pLMNInfo;
	}
	public int getSNSSAI() {
		return SNSSAI;
	}
	public void setSNSSAI(int sNSSAI) {
		SNSSAI = sNSSAI;
	}
	public ESBasicDataRRMPolicyList(int id, String name, String pLMNInfo, int sNSSAI) {
		super();
		this.id = id;
		Name = name;
		PLMNInfo = pLMNInfo;
		SNSSAI = sNSSAI;
	}
	public ESBasicDataRRMPolicyList() {
		
	}
	@Override
	public String toString() {
		return "ESBasicDataRRMPolicyList [id=" + id + ", Name=" + Name + ", PLMNInfo=" + PLMNInfo + ", SNSSAI=" + SNSSAI
				+ "]";
	}
	
	
	
	

}
