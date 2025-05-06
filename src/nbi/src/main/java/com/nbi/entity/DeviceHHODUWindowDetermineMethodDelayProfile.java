
 /***
  * ################################################################################################
  * #                                                                                              #
  * #   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd]. All rights  reserved         #
  * #                                                                                              #
  * ################################################################################################
 ****/

package com.nbi.entity;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonProperty;

@Component
public class DeviceHHODUWindowDetermineMethodDelayProfile {
	@JsonProperty("ta4-max")
	private int ta4max;
	@JsonProperty("t12-min")
    private int t12min;
	@JsonProperty("t1a-max-up")
	private int t1amaxup;
	@JsonProperty("t2a-max-cp-ul")
	private int t2amaxcpul;
	@JsonProperty("t2a-min-cp-ul")
	private int t2amincpul;
	@JsonProperty("t1a-max-cp-dl")
	private int t1amaxcpdl;
	@JsonProperty("t2a-min-up")
	private int t2aminup;
	@JsonProperty("t2a-max-up")
	private int t2amaxup;
	@JsonProperty("t1a-min-cp-dl")
	private int t1amincpdl;
	@JsonProperty("t12-max")
	private int t12max;
	@JsonProperty("t1a-max-cp-ul")
	private int t1amaxcpul;
	@JsonProperty("t2a-min-cp-dl")
	private int t2amincpdl;
	@JsonProperty("ta4-min")
	private int ta4min;
	@JsonProperty("t2a-max-cp-dl")
	private int t2amaxcpdl;
	@JsonProperty("t1a-min-cp-ul")
	private int t1amincpul;
	@JsonProperty("t34-max")
	private int t34max;
	@JsonProperty("ta3-max")
	private int ta3max;
	@JsonProperty("t34-min")
	private int t34min;
	@JsonProperty("ta3-min")
	private int ta3min;
	@JsonProperty("t1a-min-up")
	private int t1aminup;
	public int getTa4max() {
		return ta4max;
	}
	public void setTa4max(int ta4max) {
		this.ta4max = ta4max;
	}
	public int getT12min() {
		return t12min;
	}
	public void setT12min(int t12min) {
		this.t12min = t12min;
	}
	public int getT1amaxup() {
		return t1amaxup;
	}
	public void setT1amaxup(int t1amaxup) {
		this.t1amaxup = t1amaxup;
	}
	public int getT2amaxcpul() {
		return t2amaxcpul;
	}
	public void setT2amaxcpul(int t2amaxcpul) {
		this.t2amaxcpul = t2amaxcpul;
	}
	public int getT2amincpul() {
		return t2amincpul;
	}
	public void setT2amincpul(int t2amincpul) {
		this.t2amincpul = t2amincpul;
	}
	public int getT1amaxcpdl() {
		return t1amaxcpdl;
	}
	public void setT1amaxcpdl(int t1amaxcpdl) {
		this.t1amaxcpdl = t1amaxcpdl;
	}
	public int getT2aminup() {
		return t2aminup;
	}
	public void setT2aminup(int t2aminup) {
		this.t2aminup = t2aminup;
	}
	public int getT2amaxup() {
		return t2amaxup;
	}
	public void setT2amaxup(int t2amaxup) {
		this.t2amaxup = t2amaxup;
	}
	public int getT1amincpdl() {
		return t1amincpdl;
	}
	public void setT1amincpdl(int t1amincpdl) {
		this.t1amincpdl = t1amincpdl;
	}
	public int getT12max() {
		return t12max;
	}
	public void setT12max(int t12max) {
		this.t12max = t12max;
	}
	public int getT1amaxcpul() {
		return t1amaxcpul;
	}
	public void setT1amaxcpul(int t1amaxcpul) {
		this.t1amaxcpul = t1amaxcpul;
	}
	public int getT2amincpdl() {
		return t2amincpdl;
	}
	public void setT2amincpdl(int t2amincpdl) {
		this.t2amincpdl = t2amincpdl;
	}
	public int getTa4min() {
		return ta4min;
	}
	public void setTa4min(int ta4min) {
		this.ta4min = ta4min;
	}
	public int getT2amaxcpdl() {
		return t2amaxcpdl;
	}
	public void setT2amaxcpdl(int t2amaxcpdl) {
		this.t2amaxcpdl = t2amaxcpdl;
	}
	public int getT1amincpul() {
		return t1amincpul;
	}
	public void setT1amincpul(int t1amincpul) {
		this.t1amincpul = t1amincpul;
	}
	public int getT34max() {
		return t34max;
	}
	public void setT34max(int t34max) {
		this.t34max = t34max;
	}
	public int getTa3max() {
		return ta3max;
	}
	public void setTa3max(int ta3max) {
		this.ta3max = ta3max;
	}
	public int getT34min() {
		return t34min;
	}
	public void setT34min(int t34min) {
		this.t34min = t34min;
	}
	public int getTa3min() {
		return ta3min;
	}
	public void setTa3min(int ta3min) {
		this.ta3min = ta3min;
	}
	public int getT1aminup() {
		return t1aminup;
	}
	public void setT1aminup(int t1aminup) {
		this.t1aminup = t1aminup;
	}
	public DeviceHHODUWindowDetermineMethodDelayProfile(int ta4max, int t12min, int t1amaxup, int t2amaxcpul,
			int t2amincpul, int t1amaxcpdl, int t2aminup, int t2amaxup, int t1amincpdl, int t12max, int t1amaxcpul,
			int t2amincpdl, int ta4min, int t2amaxcpdl, int t1amincpul, int t34max, int ta3max, int t34min, int ta3min,
			int t1aminup) {
		super();
		this.ta4max = ta4max;
		this.t12min = t12min;
		this.t1amaxup = t1amaxup;
		this.t2amaxcpul = t2amaxcpul;
		this.t2amincpul = t2amincpul;
		this.t1amaxcpdl = t1amaxcpdl;
		this.t2aminup = t2aminup;
		this.t2amaxup = t2amaxup;
		this.t1amincpdl = t1amincpdl;
		this.t12max = t12max;
		this.t1amaxcpul = t1amaxcpul;
		this.t2amincpdl = t2amincpdl;
		this.ta4min = ta4min;
		this.t2amaxcpdl = t2amaxcpdl;
		this.t1amincpul = t1amincpul;
		this.t34max = t34max;
		this.ta3max = ta3max;
		this.t34min = t34min;
		this.ta3min = ta3min;
		this.t1aminup = t1aminup;
	}
	public DeviceHHODUWindowDetermineMethodDelayProfile() {
		
	}
	@Override
	public String toString() {
		return "DeviceHHODUWindowDetermineMethodDelayProfile [ta4max=" + ta4max + ", t12min=" + t12min + ", t1amaxup="
				+ t1amaxup + ", t2amaxcpul=" + t2amaxcpul + ", t2amincpul=" + t2amincpul + ", t1amaxcpdl=" + t1amaxcpdl
				+ ", t2aminup=" + t2aminup + ", t2amaxup=" + t2amaxup + ", t1amincpdl=" + t1amincpdl + ", t12max="
				+ t12max + ", t1amaxcpul=" + t1amaxcpul + ", t2amincpdl=" + t2amincpdl + ", ta4min=" + ta4min
				+ ", t2amaxcpdl=" + t2amaxcpdl + ", t1amincpul=" + t1amincpul + ", t34max=" + t34max + ", ta3max="
				+ ta3max + ", t34min=" + t34min + ", ta3min=" + ta3min + ", t1aminup=" + t1aminup + "]";
	}
	
	
}
