
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
public class ESDUDataSectorCarrierList {
	
	private String id;
	private int PriorityLabel;
	private String tXDirection;
	private int ConfigMaxTxPower;
	private int arfcnDL;
	private int arfcnUL;
	private int bSChannelBwDl;
	private int bSChannelBwUl;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public int getPriorityLabel() {
		return PriorityLabel;
	}
	public void setPriorityLabel(int priorityLabel) {
		PriorityLabel = priorityLabel;
	}
	public String gettXDirection() {
		return tXDirection;
	}
	public void settXDirection(String tXDirection) {
		this.tXDirection = tXDirection;
	}
	public int getConfigMaxTxPower() {
		return ConfigMaxTxPower;
	}
	public void setConfigMaxTxPower(int configMaxTxPower) {
		ConfigMaxTxPower = configMaxTxPower;
	}
	public int getArfcnDL() {
		return arfcnDL;
	}
	public void setArfcnDL(int arfcnDL) {
		this.arfcnDL = arfcnDL;
	}
	public int getArfcnUL() {
		return arfcnUL;
	}
	public void setArfcnUL(int arfcnUL) {
		this.arfcnUL = arfcnUL;
	}
	public int getbSChannelBwDl() {
		return bSChannelBwDl;
	}
	public void setbSChannelBwDl(int bSChannelBwDl) {
		this.bSChannelBwDl = bSChannelBwDl;
	}
	public int getbSChannelBwUl() {
		return bSChannelBwUl;
	}
	public void setbSChannelBwUl(int bSChannelBwUl) {
		this.bSChannelBwUl = bSChannelBwUl;
	}
	public ESDUDataSectorCarrierList(String id, int priorityLabel, String tXDirection, int configMaxTxPower,
			int arfcnDL, int arfcnUL, int bSChannelBwDl, int bSChannelBwUl) {
		super();
		this.id = id;
		PriorityLabel = priorityLabel;
		this.tXDirection = tXDirection;
		ConfigMaxTxPower = configMaxTxPower;
		this.arfcnDL = arfcnDL;
		this.arfcnUL = arfcnUL;
		this.bSChannelBwDl = bSChannelBwDl;
		this.bSChannelBwUl = bSChannelBwUl;
	}
	public ESDUDataSectorCarrierList() {
		
	}
	@Override
	public String toString() {
		return "ESDUDataSectorCarrierList [id=" + id + ", PriorityLabel=" + PriorityLabel + ", tXDirection="
				+ tXDirection + ", ConfigMaxTxPower=" + ConfigMaxTxPower + ", arfcnDL=" + arfcnDL + ", arfcnUL="
				+ arfcnUL + ", bSChannelBwDl=" + bSChannelBwDl + ", bSChannelBwUl=" + bSChannelBwUl + "]";
	}
	
	

}
