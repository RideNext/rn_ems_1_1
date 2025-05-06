package com.nbi.entity;

import java.util.List;

import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
import org.springframework.stereotype.Component;

@Component
public class ESBasicData {
	private int PriorityLabel;
	private String DnPrefix;
	@Field(type = FieldType.Nested)
	private List<ESBasicDataPeerlist>PeerParameterList;
	@Field(type = FieldType.Nested)
	private List<ESBasicDataPLMNInfo>PLMNInfo;
	@Field(type = FieldType.Nested)
	private List<ESBasicDataRRMPolicyList>RRMPolicyList;
	@Field(type = FieldType.Nested)
	private List<ESBasicDataCellLocalId>CellLocalId;
	private int DefaultFileBasedGp;
	private String DefaultFileLocation;
	private int DefaultFileReportingPeriod;
	private String PmaAdministrativeState;
	public int getPriorityLabel() {
		return PriorityLabel;
	}
	public void setPriorityLabel(int priorityLabel) {
		PriorityLabel = priorityLabel;
	}
	public String getDnPrefix() {
		return DnPrefix;
	}
	public void setDnPrefix(String dnPrefix) {
		DnPrefix = dnPrefix;
	}
	public List<ESBasicDataPeerlist> getPeerParameterList() {
		return PeerParameterList;
	}
	public void setPeerParameterList(List<ESBasicDataPeerlist> peerParameterList) {
		PeerParameterList = peerParameterList;
	}
	public List<ESBasicDataPLMNInfo> getPLMNInfo() {
		return PLMNInfo;
	}
	public void setPLMNInfo(List<ESBasicDataPLMNInfo> pLMNInfo) {
		PLMNInfo = pLMNInfo;
	}
	public List<ESBasicDataRRMPolicyList> getRRMPolicyList() {
		return RRMPolicyList;
	}
	public void setRRMPolicyList(List<ESBasicDataRRMPolicyList> rRMPolicyList) {
		RRMPolicyList = rRMPolicyList;
	}
	public List<ESBasicDataCellLocalId> getCellLocalId() {
		return CellLocalId;
	}
	public void setCellLocalId(List<ESBasicDataCellLocalId> cellLocalId) {
		CellLocalId = cellLocalId;
	}
	public int getDefaultFileBasedGp() {
		return DefaultFileBasedGp;
	}
	public void setDefaultFileBasedGp(int defaultFileBasedGp) {
		DefaultFileBasedGp = defaultFileBasedGp;
	}
	public String getDefaultFileLocation() {
		return DefaultFileLocation;
	}
	public void setDefaultFileLocation(String defaultFileLocation) {
		DefaultFileLocation = defaultFileLocation;
	}
	public int getDefaultFileReportingPeriod() {
		return DefaultFileReportingPeriod;
	}
	public void setDefaultFileReportingPeriod(int defaultFileReportingPeriod) {
		DefaultFileReportingPeriod = defaultFileReportingPeriod;
	}
	public String getPmaAdministrativeState() {
		return PmaAdministrativeState;
	}
	public void setPmaAdministrativeState(String pmaAdministrativeState) {
		PmaAdministrativeState = pmaAdministrativeState;
	}
	public ESBasicData(int priorityLabel, String dnPrefix, List<ESBasicDataPeerlist> peerParameterList,
			List<ESBasicDataPLMNInfo> pLMNInfo, List<ESBasicDataRRMPolicyList> rRMPolicyList,
			List<ESBasicDataCellLocalId> cellLocalId, int defaultFileBasedGp, String defaultFileLocation,
			int defaultFileReportingPeriod, String pmaAdministrativeState) {
		super();
		PriorityLabel = priorityLabel;
		DnPrefix = dnPrefix;
		PeerParameterList = peerParameterList;
		PLMNInfo = pLMNInfo;
		RRMPolicyList = rRMPolicyList;
		CellLocalId = cellLocalId;
		DefaultFileBasedGp = defaultFileBasedGp;
		DefaultFileLocation = defaultFileLocation;
		DefaultFileReportingPeriod = defaultFileReportingPeriod;
		PmaAdministrativeState = pmaAdministrativeState;
	}
	public ESBasicData() {
		
	}
	@Override
	public String toString() {
		return "ESBasicData [PriorityLabel=" + PriorityLabel + ", DnPrefix=" + DnPrefix + ", PeerParameterList="
				+ PeerParameterList + ", PLMNInfo=" + PLMNInfo + ", RRMPolicyList=" + RRMPolicyList + ", CellLocalId="
				+ CellLocalId + ", DefaultFileBasedGp=" + DefaultFileBasedGp + ", DefaultFileLocation="
				+ DefaultFileLocation + ", DefaultFileReportingPeriod=" + DefaultFileReportingPeriod
				+ ", PmaAdministrativeState=" + PmaAdministrativeState + "]";
	}
	
	
	
	

}
