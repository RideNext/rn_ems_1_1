
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
public class ESDUODUWindowDataListPrbUlInfolist {
	
	private int id;
	private int ElemIndex;
	private int RbStart;
	private int RbSize;
	private int StartSymbol;
	private int NumofSymbol;
	private int BeamIndex;
	private int BfweightUpdate;
	private int CompMethod;
	private int IqWidth;
	private int BeamForming;
	private int ScaleFactor;
	private int Remask;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getElemIndex() {
		return ElemIndex;
	}
	public void setElemIndex(int elemIndex) {
		ElemIndex = elemIndex;
	}
	public int getRbStart() {
		return RbStart;
	}
	public void setRbStart(int rbStart) {
		RbStart = rbStart;
	}
	public int getRbSize() {
		return RbSize;
	}
	public void setRbSize(int rbSize) {
		RbSize = rbSize;
	}
	public int getStartSymbol() {
		return StartSymbol;
	}
	public void setStartSymbol(int startSymbol) {
		StartSymbol = startSymbol;
	}
	public int getNumofSymbol() {
		return NumofSymbol;
	}
	public void setNumofSymbol(int numofSymbol) {
		NumofSymbol = numofSymbol;
	}
	public int getBeamIndex() {
		return BeamIndex;
	}
	public void setBeamIndex(int beamIndex) {
		BeamIndex = beamIndex;
	}
	public int getBfweightUpdate() {
		return BfweightUpdate;
	}
	public void setBfweightUpdate(int bfweightUpdate) {
		BfweightUpdate = bfweightUpdate;
	}
	public int getCompMethod() {
		return CompMethod;
	}
	public void setCompMethod(int compMethod) {
		CompMethod = compMethod;
	}
	public int getIqWidth() {
		return IqWidth;
	}
	public void setIqWidth(int iqWidth) {
		IqWidth = iqWidth;
	}
	public int getBeamForming() {
		return BeamForming;
	}
	public void setBeamForming(int beamForming) {
		BeamForming = beamForming;
	}
	public int getScaleFactor() {
		return ScaleFactor;
	}
	public void setScaleFactor(int scaleFactor) {
		ScaleFactor = scaleFactor;
	}
	public int getRemask() {
		return Remask;
	}
	public void setRemask(int remask) {
		Remask = remask;
	}
	public ESDUODUWindowDataListPrbUlInfolist(int id, int elemIndex, int rbStart, int rbSize, int startSymbol,
			int numofSymbol, int beamIndex, int bfweightUpdate, int compMethod, int iqWidth, int beamForming,
			int scaleFactor, int remask) {
		super();
		this.id = id;
		ElemIndex = elemIndex;
		RbStart = rbStart;
		RbSize = rbSize;
		StartSymbol = startSymbol;
		NumofSymbol = numofSymbol;
		BeamIndex = beamIndex;
		BfweightUpdate = bfweightUpdate;
		CompMethod = compMethod;
		IqWidth = iqWidth;
		BeamForming = beamForming;
		ScaleFactor = scaleFactor;
		Remask = remask;
	}
	public ESDUODUWindowDataListPrbUlInfolist() {
		
	}
	@Override
	public String toString() {
		return "ESDUODUWindowDataListPrbUlInfolist [id=" + id + ", ElemIndex=" + ElemIndex + ", RbStart=" + RbStart
				+ ", RbSize=" + RbSize + ", StartSymbol=" + StartSymbol + ", NumofSymbol=" + NumofSymbol
				+ ", BeamIndex=" + BeamIndex + ", BfweightUpdate=" + BfweightUpdate + ", CompMethod=" + CompMethod
				+ ", IqWidth=" + IqWidth + ", BeamForming=" + BeamForming + ", ScaleFactor=" + ScaleFactor + ", Remask="
				+ Remask + "]";
	}
	
	

}
