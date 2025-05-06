
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
public class ESBasicDataPLMNInfo {
	private String id;
	private String Name;
	private String MCC;
	private String MNC;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return Name;
	}
	public void setName(String name) {
		Name = name;
	}
	public String getMCC() {
		return MCC;
	}
	public void setMCC(String mCC) {
		MCC = mCC;
	}
	public String getMNC() {
		return MNC;
	}
	public void setMNC(String mNC) {
		MNC = mNC;
	}
	public ESBasicDataPLMNInfo(String id, String name, String mCC, String mNC) {
		super();
		this.id = id;
		Name = name;
		MCC = mCC;
		MNC = mNC;
	}
	public ESBasicDataPLMNInfo() {
		
	}
	@Override
	public String toString() {
		return "ESBasicDataPLMNInfo [id=" + id + ", Name=" + Name + ", MCC=" + MCC + ", MNC=" + MNC + "]";
	}
	
	

}
