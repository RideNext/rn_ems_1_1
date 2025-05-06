
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
public class ESDUDataManagedNFServiceList {
	
	private String id;
	private String AdministrativeState;
	private String saphost;
	private int sapport;
	private String operationsName;
	private String operationsAllowed;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getAdministrativeState() {
		return AdministrativeState;
	}
	public void setAdministrativeState(String administrativeState) {
		AdministrativeState = administrativeState;
	}
	public String getSaphost() {
		return saphost;
	}
	public void setSaphost(String saphost) {
		this.saphost = saphost;
	}
	public int getSapport() {
		return sapport;
	}
	public void setSapport(int sapport) {
		this.sapport = sapport;
	}
	public String getOperationsName() {
		return operationsName;
	}
	public void setOperationsName(String operationsName) {
		this.operationsName = operationsName;
	}
	public String getOperationsAllowed() {
		return operationsAllowed;
	}
	public void setOperationsAllowed(String operationsAllowed) {
		this.operationsAllowed = operationsAllowed;
	}
	public ESDUDataManagedNFServiceList(String id, String administrativeState, String saphost, int sapport,
			String operationsName, String operationsAllowed) {
		super();
		this.id = id;
		AdministrativeState = administrativeState;
		this.saphost = saphost;
		this.sapport = sapport;
		this.operationsName = operationsName;
		this.operationsAllowed = operationsAllowed;
	}
	public ESDUDataManagedNFServiceList() {
		
	}
	@Override
	public String toString() {
		return "ESDUDataManagedNFServiceList [id=" + id + ", AdministrativeState=" + AdministrativeState + ", saphost="
				+ saphost + ", sapport=" + sapport + ", operationsName=" + operationsName + ", operationsAllowed="
				+ operationsAllowed + "]";
	}
	
	
	

}
