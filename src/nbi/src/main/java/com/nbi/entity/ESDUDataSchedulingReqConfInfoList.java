
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
public class ESDUDataSchedulingReqConfInfoList {
	
	private int id;
	private int schedulingrequest;
	private String scprohibittimer;
	private String sctransmax;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getSchedulingrequest() {
		return schedulingrequest;
	}
	public void setSchedulingrequest(int schedulingrequest) {
		this.schedulingrequest = schedulingrequest;
	}
	public String getScprohibittimer() {
		return scprohibittimer;
	}
	public void setScprohibittimer(String scprohibittimer) {
		this.scprohibittimer = scprohibittimer;
	}
	public String getSctransmax() {
		return sctransmax;
	}
	public void setSctransmax(String sctransmax) {
		this.sctransmax = sctransmax;
	}
	public ESDUDataSchedulingReqConfInfoList(int id, int schedulingrequest, String scprohibittimer, String sctransmax) {
		super();
		this.id = id;
		this.schedulingrequest = schedulingrequest;
		this.scprohibittimer = scprohibittimer;
		this.sctransmax = sctransmax;
	}
	public ESDUDataSchedulingReqConfInfoList() {
		
	}
	@Override
	public String toString() {
		return "ESDUDataSchedulingReqConfInfoList [id=" + id + ", schedulingrequest=" + schedulingrequest
				+ ", scprohibittimer=" + scprohibittimer + ", sctransmax=" + sctransmax + "]";
	}
	

}
