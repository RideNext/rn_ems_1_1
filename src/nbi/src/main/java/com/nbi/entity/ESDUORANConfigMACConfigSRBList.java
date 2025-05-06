
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
public class ESDUORANConfigMACConfigSRBList {
	private String srdelaytimer;
	private String maxpuschduration;
	private int Priority;
	private String AllowedServCells;
	
	public String getSrdelaytimer() {
		return srdelaytimer;
	}
	public void setSrdelaytimer(String srdelaytimer) {
		this.srdelaytimer = srdelaytimer;
	}
	public String getMaxpuschduration() {
		return maxpuschduration;
	}
	public void setMaxpuschduration(String maxpuschduration) {
		this.maxpuschduration = maxpuschduration;
	}
	public int getPriority() {
		return Priority;
	}
	public void setPriority(int priority) {
		Priority = priority;
	}
	public String getAllowedServCells() {
		return AllowedServCells;
	}
	public void setAllowedServCells(String allowedServCells) {
		AllowedServCells = allowedServCells;
	}
	public ESDUORANConfigMACConfigSRBList( String srdelaytimer, String maxpuschduration, int priority,
			String allowedServCells) {
		super();
		this.srdelaytimer = srdelaytimer;
		this.maxpuschduration = maxpuschduration;
		Priority = priority;
		AllowedServCells = allowedServCells;
	}
	public ESDUORANConfigMACConfigSRBList() {
		
	}
	@Override
	public String toString() {
		return "ESDUORANConfigMACConfigSRBList [ srdelaytimer=" + srdelaytimer + ", maxpuschduration="
				+ maxpuschduration + ", Priority=" + Priority + ", AllowedServCells=" + AllowedServCells + "]";
	}
	
	
	
}
