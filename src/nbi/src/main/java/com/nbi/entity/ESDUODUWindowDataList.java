
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
public class ESDUODUWindowDataList {
	
	private int id;
	private int RUIndexId;
	private String RUInstanceId;
	private int Bandwidth;
	private int Subcarrierspacing;
	private String RUcpmacAddress;
	@Field(type = FieldType.Nested)
	private List<ESDUODUWindowDataListPrbUlInfolist>PrbUlInfolist;
    private String DUmacAddress;
    private String RUupmacAddress;
    private int CpvlanId;
    private int UpvalnId;
    private int CompMethod;
    @Field(type = FieldType.Nested)
    private List<ESDUODUWindowDataListPrbUlInfolist>PrbDlInfolist;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getRUIndexId() {
		return RUIndexId;
	}
	public void setRUIndexId(int rUIndexId) {
		RUIndexId = rUIndexId;
	}
	public String getRUInstanceId() {
		return RUInstanceId;
	}
	public void setRUInstanceId(String rUInstanceId) {
		RUInstanceId = rUInstanceId;
	}
	public int getBandwidth() {
		return Bandwidth;
	}
	public void setBandwidth(int bandwidth) {
		Bandwidth = bandwidth;
	}
	public int getSubcarrierspacing() {
		return Subcarrierspacing;
	}
	public void setSubcarrierspacing(int subcarrierspacing) {
		Subcarrierspacing = subcarrierspacing;
	}
	public String getRUcpmacAddress() {
		return RUcpmacAddress;
	}
	public void setRUcpmacAddress(String rUcpmacAddress) {
		RUcpmacAddress = rUcpmacAddress;
	}
	public List<ESDUODUWindowDataListPrbUlInfolist> getPrbUlInfolist() {
		return PrbUlInfolist;
	}
	public void setPrbUlInfolist(List<ESDUODUWindowDataListPrbUlInfolist> prbUlInfolist) {
		PrbUlInfolist = prbUlInfolist;
	}
	public String getDUmacAddress() {
		return DUmacAddress;
	}
	public void setDUmacAddress(String dUmacAddress) {
		DUmacAddress = dUmacAddress;
	}
	public String getRUupmacAddress() {
		return RUupmacAddress;
	}
	public void setRUupmacAddress(String rUupmacAddress) {
		RUupmacAddress = rUupmacAddress;
	}
	public int getCpvlanId() {
		return CpvlanId;
	}
	public void setCpvlanId(int cpvlanId) {
		CpvlanId = cpvlanId;
	}
	public int getUpvalnId() {
		return UpvalnId;
	}
	public void setUpvalnId(int upvalnId) {
		UpvalnId = upvalnId;
	}
	public int getCompMethod() {
		return CompMethod;
	}
	public void setCompMethod(int compMethod) {
		CompMethod = compMethod;
	}
	public List<ESDUODUWindowDataListPrbUlInfolist> getPrbDlInfolist() {
		return PrbDlInfolist;
	}
	public void setPrbDlInfolist(List<ESDUODUWindowDataListPrbUlInfolist> prbDlInfolist) {
		PrbDlInfolist = prbDlInfolist;
	}
	public ESDUODUWindowDataList(int id, int rUIndexId, String rUInstanceId, int bandwidth, int subcarrierspacing,
			String rUcpmacAddress, List<ESDUODUWindowDataListPrbUlInfolist> prbUlInfolist, String dUmacAddress,
			String rUupmacAddress, int cpvlanId, int upvalnId, int compMethod,
			List<ESDUODUWindowDataListPrbUlInfolist> prbDlInfolist) {
		super();
		this.id = id;
		RUIndexId = rUIndexId;
		RUInstanceId = rUInstanceId;
		Bandwidth = bandwidth;
		Subcarrierspacing = subcarrierspacing;
		RUcpmacAddress = rUcpmacAddress;
		PrbUlInfolist = prbUlInfolist;
		DUmacAddress = dUmacAddress;
		RUupmacAddress = rUupmacAddress;
		CpvlanId = cpvlanId;
		UpvalnId = upvalnId;
		CompMethod = compMethod;
		PrbDlInfolist = prbDlInfolist;
	}
	public ESDUODUWindowDataList() {
		
	}
	@Override
	public String toString() {
		return "ESDUODUWindowDataList [id=" + id + ", RUIndexId=" + RUIndexId + ", RUInstanceId=" + RUInstanceId
				+ ", Bandwidth=" + Bandwidth + ", Subcarrierspacing=" + Subcarrierspacing + ", RUcpmacAddress="
				+ RUcpmacAddress + ", PrbUlInfolist=" + PrbUlInfolist + ", DUmacAddress=" + DUmacAddress
				+ ", RUupmacAddress=" + RUupmacAddress + ", CpvlanId=" + CpvlanId + ", UpvalnId=" + UpvalnId
				+ ", CompMethod=" + CompMethod + ", PrbDlInfolist=" + PrbDlInfolist + "]";
	}
    
    
    
}
