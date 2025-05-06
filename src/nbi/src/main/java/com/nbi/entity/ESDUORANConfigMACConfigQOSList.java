
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
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
import org.springframework.stereotype.Component;

@Component
@Scope("prototype")
public class ESDUORANConfigMACConfigQOSList {
	private int id;
	private int maxdlharqtx;
	private int logicalchannel;
	private String lgalchansrmask;
	private String prioritrizedbitrate;
	private String bucketsizedura;
	private String lsclchansrdelay;
	private int maxulharqtx;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getMaxdlharqtx() {
		return maxdlharqtx;
	}
	public void setMaxdlharqtx(int maxdlharqtx) {
		this.maxdlharqtx = maxdlharqtx;
	}
	public int getLogicalchannel() {
		return logicalchannel;
	}
	public void setLogicalchannel(int logicalchannel) {
		this.logicalchannel = logicalchannel;
	}
	public String getLgalchansrmask() {
		return lgalchansrmask;
	}
	public void setLgalchansrmask(String lgalchansrmask) {
		this.lgalchansrmask = lgalchansrmask;
	}
	public String getPrioritrizedbitrate() {
		return prioritrizedbitrate;
	}
	public void setPrioritrizedbitrate(String prioritrizedbitrate) {
		this.prioritrizedbitrate = prioritrizedbitrate;
	}
	public String getBucketsizedura() {
		return bucketsizedura;
	}
	public void setBucketsizedura(String bucketsizedura) {
		this.bucketsizedura = bucketsizedura;
	}
	public String getLsclchansrdelay() {
		return lsclchansrdelay;
	}
	public void setLsclchansrdelay(String lsclchansrdelay) {
		this.lsclchansrdelay = lsclchansrdelay;
	}
	public int getMaxulharqtx() {
		return maxulharqtx;
	}
	public void setMaxulharqtx(int maxulharqtx) {
		this.maxulharqtx = maxulharqtx;
	}
	public ESDUORANConfigMACConfigQOSList(int id, int maxdlharqtx, int logicalchannel, String lgalchansrmask,
			String prioritrizedbitrate, String bucketsizedura, String lsclchansrdelay, int maxulharqtx) {
		super();
		this.id = id;
		this.maxdlharqtx = maxdlharqtx;
		this.logicalchannel = logicalchannel;
		this.lgalchansrmask = lgalchansrmask;
		this.prioritrizedbitrate = prioritrizedbitrate;
		this.bucketsizedura = bucketsizedura;
		this.lsclchansrdelay = lsclchansrdelay;
		this.maxulharqtx = maxulharqtx;
	}
	public ESDUORANConfigMACConfigQOSList() {
		
	}
	@Override
	public String toString() {
		return "ESDUORANConfigMACConfigQOSList [id=" + id + ", maxdlharqtx=" + maxdlharqtx + ", logicalchannel="
				+ logicalchannel + ", lgalchansrmask=" + lgalchansrmask + ", prioritrizedbitrate=" + prioritrizedbitrate
				+ ", bucketsizedura=" + bucketsizedura + ", lsclchansrdelay=" + lsclchansrdelay + ", maxulharqtx="
				+ maxulharqtx + "]";
	}
	

}
