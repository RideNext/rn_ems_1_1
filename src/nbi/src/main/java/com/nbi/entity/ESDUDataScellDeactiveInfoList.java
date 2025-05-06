
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
public class ESDUDataScellDeactiveInfoList {
	
	private int Index;
	private String DeactivationTimer;
	public int getIndex() {
		return Index;
	}
	public void setIndex(int index) {
		Index = index;
	}
	public String getDeactivationTimer() {
		return DeactivationTimer;
	}
	public void setDeactivationTimer(String deactivationTimer) {
		DeactivationTimer = deactivationTimer;
	}
	public ESDUDataScellDeactiveInfoList(int index, String deactivationTimer) {
		super();
		Index = index;
		DeactivationTimer = deactivationTimer;
	}
	public ESDUDataScellDeactiveInfoList() {
		
	}
	@Override
	public String toString() {
		return "ESDUDataScellDeactiveInfoList [Index=" + Index + ", DeactivationTimer=" + DeactivationTimer + "]";
	}
	

}
