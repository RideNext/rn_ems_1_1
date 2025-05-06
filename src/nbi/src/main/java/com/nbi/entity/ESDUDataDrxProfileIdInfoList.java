
 /***
  * ################################################################################################
  * #                                                                                              #
  * #   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd]. All rights  reserved         #
  * #                                                                                              #
  * ################################################################################################
 ****/

package com.nbi.entity;

import java.util.List;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Component
@Scope("prototype")
public class ESDUDataDrxProfileIdInfoList {

	private int id;
	private String drxinactivitytimer;
	private int drxharqrttdl;
	private int drxharqrttul;
	private String drxtransmisdl;
	private String drxtransmisul;
	private String drxlongcycle;
	
	private List<ESDUDataSchedulingReqConfInfoList> SchedulingReqConfInfoList;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getDrxinactivitytimer() {
		return drxinactivitytimer;
	}

	public void setDrxinactivitytimer(String drxinactivitytimer) {
		this.drxinactivitytimer = drxinactivitytimer;
	}

	public int getDrxharqrttdl() {
		return drxharqrttdl;
	}

	public void setDrxharqrttdl(int drxharqrttdl) {
		this.drxharqrttdl = drxharqrttdl;
	}

	public int getDrxharqrttul() {
		return drxharqrttul;
	}

	public void setDrxharqrttul(int drxharqrttul) {
		this.drxharqrttul = drxharqrttul;
	}

	public String getDrxtransmisdl() {
		return drxtransmisdl;
	}

	public void setDrxtransmisdl(String drxtransmisdl) {
		this.drxtransmisdl = drxtransmisdl;
	}

	public String getDrxtransmisul() {
		return drxtransmisul;
	}

	public void setDrxtransmisul(String drxtransmisul) {
		this.drxtransmisul = drxtransmisul;
	}

	public String getDrxlongcycle() {
		return drxlongcycle;
	}

	public void setDrxlongcycle(String drxlongcycle) {
		this.drxlongcycle = drxlongcycle;
	}

	public List<ESDUDataSchedulingReqConfInfoList> getSchedulingReqConfInfoList() {
		return SchedulingReqConfInfoList;
	}

	public void setSchedulingReqConfInfoList(List<ESDUDataSchedulingReqConfInfoList> schedulingReqConfInfoList) {
		SchedulingReqConfInfoList = schedulingReqConfInfoList;
	}

	public ESDUDataDrxProfileIdInfoList(int id, String drxinactivitytimer, int drxharqrttdl, int drxharqrttul,
			String drxtransmisdl, String drxtransmisul, String drxlongcycle,
			List<ESDUDataSchedulingReqConfInfoList> schedulingReqConfInfoList) {
		super();
		this.id = id;
		this.drxinactivitytimer = drxinactivitytimer;
		this.drxharqrttdl = drxharqrttdl;
		this.drxharqrttul = drxharqrttul;
		this.drxtransmisdl = drxtransmisdl;
		this.drxtransmisul = drxtransmisul;
		this.drxlongcycle = drxlongcycle;
		SchedulingReqConfInfoList = schedulingReqConfInfoList;
	}

	public ESDUDataDrxProfileIdInfoList() {
		
	}

	@Override
	public String toString() {
		return "ESDUDataDrxProfileIdInfoList [id=" + id + ", drxinactivitytimer=" + drxinactivitytimer
				+ ", drxharqrttdl=" + drxharqrttdl + ", drxharqrttul=" + drxharqrttul + ", drxtransmisdl="
				+ drxtransmisdl + ", drxtransmisul=" + drxtransmisul + ", drxlongcycle=" + drxlongcycle
				+ ", SchedulingReqConfInfoList=" + SchedulingReqConfInfoList + "]";
	}
	
	
	
}
