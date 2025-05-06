
 /***
  * ################################################################################################
  * #                                                                                              #
  * #   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd]. All rights  reserved         #
  * #                                                                                              #
  * ################################################################################################
 ****/

package com.nbi.entity;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Component
@Scope("prototype")
public class ESDUPreconfRUProfileList {
	
	private int id;
	private int RUIndex;
	private String RUInstanceId;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getRUIndex() {
		return RUIndex;
	}
	public void setRUIndex(int rUIndex) {
		RUIndex = rUIndex;
	}
	public String getRUInstanceId() {
		return RUInstanceId;
	}
	public void setRUInstanceId(String rUInstanceId) {
		RUInstanceId = rUInstanceId;
	}
	public ESDUPreconfRUProfileList(int id, int rUIndex, String rUInstanceId) {
		super();
		this.id = id;
		RUIndex = rUIndex;
		RUInstanceId = rUInstanceId;
	}
	public ESDUPreconfRUProfileList() {
		
	}
	@Override
	public String toString() {
		return "ESDUPreconfRUProfileList [id=" + id + ", RUIndex=" + RUIndex + ", RUInstanceId=" + RUInstanceId + "]";
	}
	
	

}
