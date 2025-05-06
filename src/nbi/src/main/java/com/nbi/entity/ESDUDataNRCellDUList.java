
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
public class ESDUDataNRCellDUList {
	private int id;
	private int NRPCI;
	private int NRTAC;
	private String NRSectorCarrierReflistId;
	private int CellLocalId;
	private String cellId;
	private String ResourceType;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getNRPCI() {
		return NRPCI;
	}
	public void setNRPCI(int nRPCI) {
		NRPCI = nRPCI;
	}
	public int getNRTAC() {
		return NRTAC;
	}
	public void setNRTAC(int nRTAC) {
		NRTAC = nRTAC;
	}
	public String getNRSectorCarrierReflistId() {
		return NRSectorCarrierReflistId;
	}
	public void setNRSectorCarrierReflistId(String nRSectorCarrierReflistId) {
		NRSectorCarrierReflistId = nRSectorCarrierReflistId;
	}
	public int getCellLocalId() {
		return CellLocalId;
	}
	public void setCellLocalId(int cellLocalId) {
		CellLocalId = cellLocalId;
	}
	public String getCellId() {
		return cellId;
	}
	public void setCellId(String cellId) {
		this.cellId = cellId;
	}
	public String getResourceType() {
		return ResourceType;
	}
	public void setResourceType(String resourceType) {
		ResourceType = resourceType;
	}
	public ESDUDataNRCellDUList(int id, int nRPCI, int nRTAC, String nRSectorCarrierReflistId, int cellLocalId,
			String cellId, String resourceType) {
		super();
		this.id = id;
		NRPCI = nRPCI;
		NRTAC = nRTAC;
		NRSectorCarrierReflistId = nRSectorCarrierReflistId;
		CellLocalId = cellLocalId;
		this.cellId = cellId;
		ResourceType = resourceType;
	}
	public ESDUDataNRCellDUList() {
		
	}
	@Override
	public String toString() {
		return "ESDUDataNRCellDUList [id=" + id + ", NRPCI=" + NRPCI + ", NRTAC=" + NRTAC
				+ ", NRSectorCarrierReflistId=" + NRSectorCarrierReflistId + ", CellLocalId=" + CellLocalId
				+ ", cellId=" + cellId + ", ResourceType=" + ResourceType + "]";
	}
	
	

}
