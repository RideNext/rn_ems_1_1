
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
public class ESCUCPNRCellCU {
	private int PriorityLabel;
	private int CellLocalId;
	private String cellId;
	private String PLMNId;
	public int getPrioritylabel() {
		return PriorityLabel;
	}
	public void setPrioritylabel(int prioritylabel) {
		PriorityLabel = prioritylabel;
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
	public String getPLMNId() {
		return PLMNId;
	}
	public void setPLMNId(String pLMNId) {
		PLMNId = pLMNId;
	}
	public ESCUCPNRCellCU(int prioritylabel, int cellLocalId, String cellId, String pLMNId) {
		super();
		PriorityLabel = prioritylabel;
		CellLocalId = cellLocalId;
		this.cellId = cellId;
		PLMNId = pLMNId;
	}
	public ESCUCPNRCellCU() {
		
	}
	@Override
	public String toString() {
		return "ESCUCPNRCellCU [Prioritylabel=" + PriorityLabel + ", CellLocalId=" + CellLocalId + ", cellId=" + cellId
				+ ", PLMNId=" + PLMNId + "]";
	}
	
	
	
}
