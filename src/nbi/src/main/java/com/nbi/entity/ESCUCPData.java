
 /***
  * ################################################################################################
  * #                                                                                              #
  * #   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd]. All rights  reserved         #
  * #                                                                                              #
  * ################################################################################################
 ****/

package com.nbi.entity;

import java.util.List;

import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
import org.springframework.stereotype.Component;

@Component
public class ESCUCPData {
	private int PriorityLabel;
	private String ResourceType;
	private String rrmPolicyList;
	@Field(type = FieldType.Nested)
	private List<ESEP> EndPointList;
	private String UserLabel;
	private String gNBCUName;
	private int gNBIDLength;
	private int gNBID;
	private String peeParameters;
	private String plmnId;
	@Field(type = FieldType.Nested)
	private List<ESCUCPNRCellCU> NRCellCuList;
	private String IntegrityProtectAlgoPrio;
	private String CipheringAlgoPrio;
	public int getPriorityLabel() {
		return PriorityLabel;
	}
	public void setPriorityLabel(int priorityLabel) {
		PriorityLabel = priorityLabel;
	}
	public String getResourceType() {
		return ResourceType;
	}
	public void setResourceType(String resourceType) {
		ResourceType = resourceType;
	}
	public String getRrmPolicyList() {
		return rrmPolicyList;
	}
	public void setRrmPolicyList(String rrmPolicyList) {
		this.rrmPolicyList = rrmPolicyList;
	}
	public List<ESEP> getEndPointList() {
		return EndPointList;
	}
	public void setEndPointList(List<ESEP> endPointList) {
		EndPointList = endPointList;
	}
	public String getUserLabel() {
		return UserLabel;
	}
	public void setUserLabel(String userLabel) {
		UserLabel = userLabel;
	}
	public String getgNBCUName() {
		return gNBCUName;
	}
	public void setgNBCUName(String gNBCUName) {
		this.gNBCUName = gNBCUName;
	}
	public int getgNBIDLength() {
		return gNBIDLength;
	}
	public void setgNBIDLength(int gNBIDLength) {
		this.gNBIDLength = gNBIDLength;
	}
	public int getgNBID() {
		return gNBID;
	}
	public void setgNBID(int gNBID) {
		this.gNBID = gNBID;
	}
	public String getPeeParameters() {
		return peeParameters;
	}
	public void setPeeParameters(String peeParameters) {
		this.peeParameters = peeParameters;
	}
	public String getPlmnId() {
		return plmnId;
	}
	public void setPlmnId(String plmnId) {
		this.plmnId = plmnId;
	}
	public List<ESCUCPNRCellCU> getNRCellCuList() {
		return NRCellCuList;
	}
	public void setNRCellCuList(List<ESCUCPNRCellCU> nRCellCuList) {
		NRCellCuList = nRCellCuList;
	}
	public String getIntegrityProtectAlgoPrio() {
		return IntegrityProtectAlgoPrio;
	}
	public void setIntegrityProtectAlgoPrio(String integrityProtectAlgoPrio) {
		IntegrityProtectAlgoPrio = integrityProtectAlgoPrio;
	}
	public String getCipheringAlgoPrio() {
		return CipheringAlgoPrio;
	}
	public void setCipheringAlgoPrio(String cipheringAlgoPrio) {
		CipheringAlgoPrio = cipheringAlgoPrio;
	}
	public ESCUCPData(int priorityLabel, String resourceType, String rrmPolicyList, List<ESEP> endPointList,
			String userLabel, String gNBCUName, int gNBIDLength, int gNBID, String peeParameters, String plmnId,
			List<ESCUCPNRCellCU> nRCellCuList, String integrityProtectAlgoPrio, String cipheringAlgoPrio) {
		super();
		PriorityLabel = priorityLabel;
		ResourceType = resourceType;
		this.rrmPolicyList = rrmPolicyList;
		EndPointList = endPointList;
		UserLabel = userLabel;
		this.gNBCUName = gNBCUName;
		this.gNBIDLength = gNBIDLength;
		this.gNBID = gNBID;
		this.peeParameters = peeParameters;
		this.plmnId = plmnId;
		NRCellCuList = nRCellCuList;
		IntegrityProtectAlgoPrio = integrityProtectAlgoPrio;
		CipheringAlgoPrio = cipheringAlgoPrio;
	}
	public ESCUCPData() {
		
	}
	@Override
	public String toString() {
		return "ESCUCPData [PriorityLabel=" + PriorityLabel + ", ResourceType=" + ResourceType + ", rrmPolicyList="
				+ rrmPolicyList + ", EndPointList=" + EndPointList + ", UserLabel=" + UserLabel + ", gNBCUName="
				+ gNBCUName + ", gNBIDLength=" + gNBIDLength + ", gNBID=" + gNBID + ", peeParameters=" + peeParameters
				+ ", plmnId=" + plmnId + ", NRCellCuList=" + NRCellCuList + ", IntegrityProtectAlgoPrio="
				+ IntegrityProtectAlgoPrio + ", CipheringAlgoPrio=" + CipheringAlgoPrio + "]";
	}
	
	

}
