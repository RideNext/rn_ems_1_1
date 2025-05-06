
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

import com.fasterxml.jackson.annotation.JsonProperty;

@Component
@Scope("prototype")
public class DeviceFHODUWindowPrbElemUl {
	@JsonProperty("elem-index")
	private int elemindex;
	@JsonProperty("beam-forming-type")
	private int beamformingtype;
	@JsonProperty("bf-weight-update")
	private int bfweightupdate;
	@JsonProperty("comp-method")
	private int compmethod;
	@JsonProperty("rb-size")
	private int rbsize;
	@JsonProperty("beam-index")
	private int beamindex;
	@JsonProperty("start-symbol")
	private int startsymbol;
	@JsonProperty("re-mask")
	private int remask;
	@JsonProperty("rb-start")
	private int rbstart;
	@JsonProperty("scale-factor")
	private int scalefactor;
	@JsonProperty("number-of-symbol")
	private int numberofsymbol;
	@JsonProperty("iq-width")
	private int idwidth;
	public int getElemindex() {
		return elemindex;
	}
	public void setElemindex(int elemindex) {
		this.elemindex = elemindex;
	}
	public int getBeamformingtype() {
		return beamformingtype;
	}
	public void setBeamformingtype(int beamformingtype) {
		this.beamformingtype = beamformingtype;
	}
	public int getBfweightupdate() {
		return bfweightupdate;
	}
	public void setBfweightupdate(int bfweightupdate) {
		this.bfweightupdate = bfweightupdate;
	}
	public int getCompmethod() {
		return compmethod;
	}
	public void setCompmethod(int compmethod) {
		this.compmethod = compmethod;
	}
	public int getRbsize() {
		return rbsize;
	}
	public void setRbsize(int rbsize) {
		this.rbsize = rbsize;
	}
	public int getBeamindex() {
		return beamindex;
	}
	public void setBeamindex(int beamindex) {
		this.beamindex = beamindex;
	}
	public int getStartsymbol() {
		return startsymbol;
	}
	public void setStartsymbol(int startsymbol) {
		this.startsymbol = startsymbol;
	}
	public int getRemask() {
		return remask;
	}
	public void setRemask(int remask) {
		this.remask = remask;
	}
	public int getRbstart() {
		return rbstart;
	}
	public void setRbstart(int rbstart) {
		this.rbstart = rbstart;
	}
	public int getScalefactor() {
		return scalefactor;
	}
	public void setScalefactor(int scalefactor) {
		this.scalefactor = scalefactor;
	}
	public int getNumberofsymbol() {
		return numberofsymbol;
	}
	public void setNumberofsymbol(int numberofsymbol) {
		this.numberofsymbol = numberofsymbol;
	}
	public int getIdwidth() {
		return idwidth;
	}
	public void setIdwidth(int idwidth) {
		this.idwidth = idwidth;
	}
	
	public DeviceFHODUWindowPrbElemUl(int elemindex, int beamformingtype, int bfweightupdate, int compmethod,
			int rbsize, int beamindex, int startsymbol, int remask, int rbstart, int scalefactor, int numberofsymbol,
			int idwidth) {
		super();
		this.elemindex = elemindex;
		this.beamformingtype = beamformingtype;
		this.bfweightupdate = bfweightupdate;
		this.compmethod = compmethod;
		this.rbsize = rbsize;
		this.beamindex = beamindex;
		this.startsymbol = startsymbol;
		this.remask = remask;
		this.rbstart = rbstart;
		this.scalefactor = scalefactor;
		this.numberofsymbol = numberofsymbol;
		this.idwidth = idwidth;
	}
	
	public DeviceFHODUWindowPrbElemUl() {
		
	}
	@Override
	public String toString() {
		return "DeviceFHODUWindowPrbElemUl [elemindex=" + elemindex + ", beamformingtype=" + beamformingtype
				+ ", bfweightupdate=" + bfweightupdate + ", compmethod=" + compmethod + ", rbsize=" + rbsize
				+ ", beamindex=" + beamindex + ", startsymbol=" + startsymbol + ", remask=" + remask + ", rbstart="
				+ rbstart + ", scalefactor=" + scalefactor + ", numberofsymbol=" + numberofsymbol + ", idwidth="
				+ idwidth + "]";
	}
	
	
	
	

}
