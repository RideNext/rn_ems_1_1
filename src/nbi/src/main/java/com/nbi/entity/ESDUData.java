
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
public class ESDUData {
	private List<ESDUEP> EndPointList;
	private String userLabel;
	private String gNBDUId;
	private int gNBIdLength;
	private String peeParameters;
	private String rrmPolicyList;
	private String resourceType;
	private int priorityLabel;
	private String DUIndex;
	private String SyncState;
	private String Method;
	private String ConfigStatus;
	private int RUCount;
	@Field(type = FieldType.Nested)
	private List<ESDUPreconfRUProfileList> PreconfRUProfileList;
	@Field(type = FieldType.Nested)
	private List<ESDUODUWindowDataList>ODUWindowDataList;
	
	private int ta4Min;
	private int ta4Max;
	private int t1aMinCpDl;
	private int t1aMinCpUl;
	private int t1aMinUl;
	private int t1aMaxCpDl;
	private int t1aMaxCpUl;
	private int t1aMaxUp;
	private int t12Min;
	private int t12Max;
	private int t34Min;
	private int t34Max;
	private int t2aMinUp;
	private int t2aMaxUp;
	private int t2aMinCpDl;
	private int t2aMinCpUl;
	private int t2aMaxCpDl;
	private int t2aMaxCpUl;
	private int ta3Min;
	private int ta3Max;
	@Field(type = FieldType.Nested)
	private List<ESDUDataNRCellDUList>NRCellDUList;
	@Field(type = FieldType.Nested)
	private List<ESDUDataBwpList>BwpList;
	@Field(type = FieldType.Nested)
	private List<ESDUDataSectorCarrierList>SectorCarrierList;
	@Field(type = FieldType.Nested)
	private List<ESDUDataSectorCarrierList>SectorconfigurationDataList;
	@Field(type = FieldType.Nested)
	private List<ESDUDataScellDeactiveInfoList>ScellDeactiveInfoList;
	private String LogicalChannelSrdelayTimer;
	private String periodicityBsrTimer;
	private String RctxBsrTimer;
	private String phrPeriodicTimer;
	private String phrProhibitTimer;
	private String PhrTxpowerFactorchange;
	private String PhrModeOthercg;
	private String PhrType2OtherCell;
	@Field(type = FieldType.Nested)
	private List<ESDUORANConfigMACConfigQOSList> qoslist;
	@Field(type = FieldType.Object)
	private ESDUORANConfigMACConfigSRBList srblist;
	@Field(type = FieldType.Nested)
	private List<ESDUDataDrxProfileIdInfoList>DrxProfileIdInfoList;
	@Field(type=FieldType.Nested)
	private List<ESDUDataManagedNFServiceList>ManagedNFServiceList;
	
	private String Duid;
	private List<ESDUDataPrbDlInfoList>PrbDlInfoList;
	public List<ESDUEP> getEndPointList() {
		return EndPointList;
	}
	public void setEndPointList(List<ESDUEP> endPointList) {
		EndPointList = endPointList;
	}
	public String getUserLabel() {
		return userLabel;
	}
	public void setUserLabel(String userLabel) {
		this.userLabel = userLabel;
	}
	public String getgNBDUId() {
		return gNBDUId;
	}
	public void setgNBDUId(String gNBDUId) {
		this.gNBDUId = gNBDUId;
	}
	public int getgNBIdLength() {
		return gNBIdLength;
	}
	public void setgNBIdLength(int gNBIdLength) {
		this.gNBIdLength = gNBIdLength;
	}
	public String getPeeParameters() {
		return peeParameters;
	}
	public void setPeeParameters(String peeParameters) {
		this.peeParameters = peeParameters;
	}
	public String getRrmPolicyList() {
		return rrmPolicyList;
	}
	public void setRrmPolicyList(String rrmPolicyList) {
		this.rrmPolicyList = rrmPolicyList;
	}
	public String getResourceType() {
		return resourceType;
	}
	public void setResourceType(String resourceType) {
		this.resourceType = resourceType;
	}
	public int getPriorityLabel() {
		return priorityLabel;
	}
	public void setPriorityLabel(int priorityLabel) {
		this.priorityLabel = priorityLabel;
	}
	public String getDUIndex() {
		return DUIndex;
	}
	public void setDUIndex(String dUIndex) {
		DUIndex = dUIndex;
	}
	public String getSyncState() {
		return SyncState;
	}
	public void setSyncState(String syncState) {
		SyncState = syncState;
	}
	public String getMethod() {
		return Method;
	}
	public void setMethod(String method) {
		Method = method;
	}
	public String getConfigStatus() {
		return ConfigStatus;
	}
	public void setConfigStatus(String configStatus) {
		ConfigStatus = configStatus;
	}
	public int getRUCount() {
		return RUCount;
	}
	public void setRUCount(int rUCount) {
		RUCount = rUCount;
	}
	public List<ESDUPreconfRUProfileList> getPreconfRUProfileList() {
		return PreconfRUProfileList;
	}
	public void setPreconfRUProfileList(List<ESDUPreconfRUProfileList> preconfRUProfileList) {
		PreconfRUProfileList = preconfRUProfileList;
	}
	public List<ESDUODUWindowDataList> getODUWindowDataList() {
		return ODUWindowDataList;
	}
	public void setODUWindowDataList(List<ESDUODUWindowDataList> oDUWindowDataList) {
		ODUWindowDataList = oDUWindowDataList;
	}
	public int getTa4Min() {
		return ta4Min;
	}
	public void setTa4Min(int ta4Min) {
		this.ta4Min = ta4Min;
	}
	public int getTa4Max() {
		return ta4Max;
	}
	public void setTa4Max(int ta4Max) {
		this.ta4Max = ta4Max;
	}
	public int getT1aMinCpDl() {
		return t1aMinCpDl;
	}
	public void setT1aMinCpDl(int t1aMinCpDl) {
		this.t1aMinCpDl = t1aMinCpDl;
	}
	public int getT1aMinCpUl() {
		return t1aMinCpUl;
	}
	public void setT1aMinCpUl(int t1aMinCpUl) {
		this.t1aMinCpUl = t1aMinCpUl;
	}
	public int getT1aMinUl() {
		return t1aMinUl;
	}
	public void setT1aMinUl(int t1aMinUl) {
		this.t1aMinUl = t1aMinUl;
	}
	public int getT1aMaxCpDl() {
		return t1aMaxCpDl;
	}
	public void setT1aMaxCpDl(int t1aMaxCpDl) {
		this.t1aMaxCpDl = t1aMaxCpDl;
	}
	public int getT1aMaxCpUl() {
		return t1aMaxCpUl;
	}
	public void setT1aMaxCpUl(int t1aMaxCpUl) {
		this.t1aMaxCpUl = t1aMaxCpUl;
	}
	public int getT1aMaxUp() {
		return t1aMaxUp;
	}
	public void setT1aMaxUp(int t1aMaxUp) {
		this.t1aMaxUp = t1aMaxUp;
	}
	public int getT12Min() {
		return t12Min;
	}
	public void setT12Min(int t12Min) {
		this.t12Min = t12Min;
	}
	public int getT12Max() {
		return t12Max;
	}
	public void setT12Max(int t12Max) {
		this.t12Max = t12Max;
	}
	public int getT34Min() {
		return t34Min;
	}
	public void setT34Min(int t34Min) {
		this.t34Min = t34Min;
	}
	public int getT34Max() {
		return t34Max;
	}
	public void setT34Max(int t34Max) {
		this.t34Max = t34Max;
	}
	public int getT2aMinUp() {
		return t2aMinUp;
	}
	public void setT2aMinUp(int t2aMinUp) {
		this.t2aMinUp = t2aMinUp;
	}
	public int getT2aMaxUp() {
		return t2aMaxUp;
	}
	public void setT2aMaxUp(int t2aMaxUp) {
		this.t2aMaxUp = t2aMaxUp;
	}
	public int getT2aMinCpDl() {
		return t2aMinCpDl;
	}
	public void setT2aMinCpDl(int t2aMinCpDl) {
		this.t2aMinCpDl = t2aMinCpDl;
	}
	public int getT2aMinCpUl() {
		return t2aMinCpUl;
	}
	public void setT2aMinCpUl(int t2aMinCpUl) {
		this.t2aMinCpUl = t2aMinCpUl;
	}
	public int getT2aMaxCpDl() {
		return t2aMaxCpDl;
	}
	public void setT2aMaxCpDl(int t2aMaxCpDl) {
		this.t2aMaxCpDl = t2aMaxCpDl;
	}
	public int getT2aMaxCpUl() {
		return t2aMaxCpUl;
	}
	public void setT2aMaxCpUl(int t2aMaxCpUl) {
		this.t2aMaxCpUl = t2aMaxCpUl;
	}
	public int getTa3Min() {
		return ta3Min;
	}
	public void setTa3Min(int ta3Min) {
		this.ta3Min = ta3Min;
	}
	public int getTa3Max() {
		return ta3Max;
	}
	public void setTa3Max(int ta3Max) {
		this.ta3Max = ta3Max;
	}
	public List<ESDUDataNRCellDUList> getNRCellDUList() {
		return NRCellDUList;
	}
	public void setNRCellDUList(List<ESDUDataNRCellDUList> nRCellDUList) {
		NRCellDUList = nRCellDUList;
	}
	public List<ESDUDataBwpList> getBwpList() {
		return BwpList;
	}
	public void setBwpList(List<ESDUDataBwpList> bwpList) {
		BwpList = bwpList;
	}
	public List<ESDUDataSectorCarrierList> getSectorCarrierList() {
		return SectorCarrierList;
	}
	public void setSectorCarrierList(List<ESDUDataSectorCarrierList> sectorCarrierList) {
		SectorCarrierList = sectorCarrierList;
	}
	public List<ESDUDataSectorCarrierList> getSectorconfigurationDataList() {
		return SectorconfigurationDataList;
	}
	public void setSectorconfigurationDataList(List<ESDUDataSectorCarrierList> sectorconfigurationDataList) {
		SectorconfigurationDataList = sectorconfigurationDataList;
	}
	public List<ESDUDataScellDeactiveInfoList> getScellDeactiveInfoList() {
		return ScellDeactiveInfoList;
	}
	public void setScellDeactiveInfoList(List<ESDUDataScellDeactiveInfoList> scellDeactiveInfoList) {
		ScellDeactiveInfoList = scellDeactiveInfoList;
	}
	public String getLogicalChannelSrdelayTimer() {
		return LogicalChannelSrdelayTimer;
	}
	public void setLogicalChannelSrdelayTimer(String logicalChannelSrdelayTimer) {
		LogicalChannelSrdelayTimer = logicalChannelSrdelayTimer;
	}
	public String getPeriodicityBsrTimer() {
		return periodicityBsrTimer;
	}
	public void setPeriodicityBsrTimer(String periodicityBsrTimer) {
		this.periodicityBsrTimer = periodicityBsrTimer;
	}
	public String getRctxBsrTimer() {
		return RctxBsrTimer;
	}
	public void setRctxBsrTimer(String rctxBsrTimer) {
		RctxBsrTimer = rctxBsrTimer;
	}
	public String getPhrPeriodicTimer() {
		return phrPeriodicTimer;
	}
	public void setPhrPeriodicTimer(String phrPeriodicTimer) {
		this.phrPeriodicTimer = phrPeriodicTimer;
	}
	public String getPhrProhibitTimer() {
		return phrProhibitTimer;
	}
	public void setPhrProhibitTimer(String phrProhibitTimer) {
		this.phrProhibitTimer = phrProhibitTimer;
	}
	public String getPhrTxpowerFactorchange() {
		return PhrTxpowerFactorchange;
	}
	public void setPhrTxpowerFactorchange(String phrTxpowerFactorchange) {
		PhrTxpowerFactorchange = phrTxpowerFactorchange;
	}
	public String getPhrModeOthercg() {
		return PhrModeOthercg;
	}
	public void setPhrModeOthercg(String phrModeOthercg) {
		PhrModeOthercg = phrModeOthercg;
	}
	public String getPhrType2OtherCell() {
		return PhrType2OtherCell;
	}
	public void setPhrType2OtherCell(String phrType2OtherCell) {
		PhrType2OtherCell = phrType2OtherCell;
	}
	public List<ESDUORANConfigMACConfigQOSList> getQoslist() {
		return qoslist;
	}
	public void setQoslist(List<ESDUORANConfigMACConfigQOSList> qoslist) {
		this.qoslist = qoslist;
	}
	public ESDUORANConfigMACConfigSRBList getSrblist() {
		return srblist;
	}
	public void setSrblist(ESDUORANConfigMACConfigSRBList srblist) {
		this.srblist = srblist;
	}
	public List<ESDUDataDrxProfileIdInfoList> getDrxProfileIdInfoList() {
		return DrxProfileIdInfoList;
	}
	public void setDrxProfileIdInfoList(List<ESDUDataDrxProfileIdInfoList> drxProfileIdInfoList) {
		DrxProfileIdInfoList = drxProfileIdInfoList;
	}
	public List<ESDUDataManagedNFServiceList> getManagedNFServiceList() {
		return ManagedNFServiceList;
	}
	public void setManagedNFServiceList(List<ESDUDataManagedNFServiceList> managedNFServiceList) {
		ManagedNFServiceList = managedNFServiceList;
	}
	public String getDuid() {
		return Duid;
	}
	public void setDuid(String duid) {
		Duid = duid;
	}
	public List<ESDUDataPrbDlInfoList> getPrbDlInfoList() {
		return PrbDlInfoList;
	}
	public void setPrbDlInfoList(List<ESDUDataPrbDlInfoList> prbDlInfoList) {
		PrbDlInfoList = prbDlInfoList;
	}
	public ESDUData(List<ESDUEP> endPointList, String userLabel, String gNBDUId, int gNBIdLength, String peeParameters,
			String rrmPolicyList, String resourceType, int priorityLabel, String dUIndex, String syncState,
			String method, String configStatus, int rUCount, List<ESDUPreconfRUProfileList> preconfRUProfileList,
			List<ESDUODUWindowDataList> oDUWindowDataList, int ta4Min, int ta4Max, int t1aMinCpDl, int t1aMinCpUl,
			int t1aMinUl, int t1aMaxCpDl, int t1aMaxCpUl, int t1aMaxUp, int t12Min, int t12Max, int t34Min, int t34Max,
			int t2aMinUp, int t2aMaxUp, int t2aMinCpDl, int t2aMinCpUl, int t2aMaxCpDl, int t2aMaxCpUl, int ta3Min,
			int ta3Max, List<ESDUDataNRCellDUList> nRCellDUList, List<ESDUDataBwpList> bwpList,
			List<ESDUDataSectorCarrierList> sectorCarrierList,
			List<ESDUDataSectorCarrierList> sectorconfigurationDataList,
			List<ESDUDataScellDeactiveInfoList> scellDeactiveInfoList, String logicalChannelSrdelayTimer,
			String periodicityBsrTimer, String rctxBsrTimer, String phrPeriodicTimer, String phrProhibitTimer,
			String phrTxpowerFactorchange, String phrModeOthercg, String phrType2OtherCell,
			List<ESDUORANConfigMACConfigQOSList> qoslist, ESDUORANConfigMACConfigSRBList srblist,
			List<ESDUDataDrxProfileIdInfoList> drxProfileIdInfoList,
			List<ESDUDataManagedNFServiceList> managedNFServiceList, String duid,
			List<ESDUDataPrbDlInfoList> prbDlInfoList) {
		super();
		EndPointList = endPointList;
		this.userLabel = userLabel;
		this.gNBDUId = gNBDUId;
		this.gNBIdLength = gNBIdLength;
		this.peeParameters = peeParameters;
		this.rrmPolicyList = rrmPolicyList;
		this.resourceType = resourceType;
		this.priorityLabel = priorityLabel;
		DUIndex = dUIndex;
		SyncState = syncState;
		Method = method;
		ConfigStatus = configStatus;
		RUCount = rUCount;
		PreconfRUProfileList = preconfRUProfileList;
		ODUWindowDataList = oDUWindowDataList;
		this.ta4Min = ta4Min;
		this.ta4Max = ta4Max;
		this.t1aMinCpDl = t1aMinCpDl;
		this.t1aMinCpUl = t1aMinCpUl;
		this.t1aMinUl = t1aMinUl;
		this.t1aMaxCpDl = t1aMaxCpDl;
		this.t1aMaxCpUl = t1aMaxCpUl;
		this.t1aMaxUp = t1aMaxUp;
		this.t12Min = t12Min;
		this.t12Max = t12Max;
		this.t34Min = t34Min;
		this.t34Max = t34Max;
		this.t2aMinUp = t2aMinUp;
		this.t2aMaxUp = t2aMaxUp;
		this.t2aMinCpDl = t2aMinCpDl;
		this.t2aMinCpUl = t2aMinCpUl;
		this.t2aMaxCpDl = t2aMaxCpDl;
		this.t2aMaxCpUl = t2aMaxCpUl;
		this.ta3Min = ta3Min;
		this.ta3Max = ta3Max;
		NRCellDUList = nRCellDUList;
		BwpList = bwpList;
		SectorCarrierList = sectorCarrierList;
		SectorconfigurationDataList = sectorconfigurationDataList;
		ScellDeactiveInfoList = scellDeactiveInfoList;
		LogicalChannelSrdelayTimer = logicalChannelSrdelayTimer;
		this.periodicityBsrTimer = periodicityBsrTimer;
		RctxBsrTimer = rctxBsrTimer;
		this.phrPeriodicTimer = phrPeriodicTimer;
		this.phrProhibitTimer = phrProhibitTimer;
		PhrTxpowerFactorchange = phrTxpowerFactorchange;
		PhrModeOthercg = phrModeOthercg;
		PhrType2OtherCell = phrType2OtherCell;
		this.qoslist = qoslist;
		this.srblist = srblist;
		DrxProfileIdInfoList = drxProfileIdInfoList;
		ManagedNFServiceList = managedNFServiceList;
		Duid = duid;
		PrbDlInfoList = prbDlInfoList;
	}
	public ESDUData() {
		
	}
	@Override
	public String toString() {
		return "ESDUData [EndPointList=" + EndPointList + ", userLabel=" + userLabel + ", gNBDUId=" + gNBDUId
				+ ", gNBIdLength=" + gNBIdLength + ", peeParameters=" + peeParameters + ", rrmPolicyList="
				+ rrmPolicyList + ", resourceType=" + resourceType + ", priorityLabel=" + priorityLabel + ", DUIndex="
				+ DUIndex + ", SyncState=" + SyncState + ", Method=" + Method + ", ConfigStatus=" + ConfigStatus
				+ ", RUCount=" + RUCount + ", PreconfRUProfileList=" + PreconfRUProfileList + ", ODUWindowDataList="
				+ ODUWindowDataList + ", ta4Min=" + ta4Min + ", ta4Max=" + ta4Max + ", t1aMinCpDl=" + t1aMinCpDl
				+ ", t1aMinCpUl=" + t1aMinCpUl + ", t1aMinUl=" + t1aMinUl + ", t1aMaxCpDl=" + t1aMaxCpDl
				+ ", t1aMaxCpUl=" + t1aMaxCpUl + ", t1aMaxUp=" + t1aMaxUp + ", t12Min=" + t12Min + ", t12Max=" + t12Max
				+ ", t34Min=" + t34Min + ", t34Max=" + t34Max + ", t2aMinUp=" + t2aMinUp + ", t2aMaxUp=" + t2aMaxUp
				+ ", t2aMinCpDl=" + t2aMinCpDl + ", t2aMinCpUl=" + t2aMinCpUl + ", t2aMaxCpDl=" + t2aMaxCpDl
				+ ", t2aMaxCpUl=" + t2aMaxCpUl + ", ta3Min=" + ta3Min + ", ta3Max=" + ta3Max + ", NRCellDUList="
				+ NRCellDUList + ", BwpList=" + BwpList + ", SectorCarrierList=" + SectorCarrierList
				+ ", SectorconfigurationDataList=" + SectorconfigurationDataList + ", ScellDeactiveInfoList="
				+ ScellDeactiveInfoList + ", LogicalChannelSrdelayTimer=" + LogicalChannelSrdelayTimer
				+ ", periodicityBsrTimer=" + periodicityBsrTimer + ", RctxBsrTimer=" + RctxBsrTimer
				+ ", phrPeriodicTimer=" + phrPeriodicTimer + ", phrProhibitTimer=" + phrProhibitTimer
				+ ", PhrTxpowerFactorchange=" + PhrTxpowerFactorchange + ", PhrModeOthercg=" + PhrModeOthercg
				+ ", PhrType2OtherCell=" + PhrType2OtherCell + ", qoslist=" + qoslist + ", srblist=" + srblist
				+ ", DrxProfileIdInfoList="
				+ DrxProfileIdInfoList + ", ManagedNFServiceList=" + ManagedNFServiceList + ", Duid=" + Duid
				+ ", PrbDlInfoList=" + PrbDlInfoList + "]";
	}
	
	
	
}
