
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
public class ESBasicDataCellLocalId {
	private int id;
	private int CellLocalId;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getCellLocalId() {
		return CellLocalId;
	}
	public void setCellLocalId(int cellLocalId) {
		CellLocalId = cellLocalId;
	}
	public ESBasicDataCellLocalId(int id, int cellLocalId) {
		super();
		this.id = id;
		CellLocalId = cellLocalId;
	}
	public ESBasicDataCellLocalId() {
		
	}
	@Override
	public String toString() {
		return "ESBasicDataCellLocalId [id=" + id + ", CellLocalId=" + CellLocalId + "]";
	}
	
	
	
	

}
