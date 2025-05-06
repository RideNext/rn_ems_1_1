
 /***
  * ################################################################################################
  * #                                                                                              #
  * #   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd]. All rights  reserved         #
  * #                                                                                              #
  * ################################################################################################
 ****/

package com.nbi.enums;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
public class AlarmEnum {
	

	public enum severity {
	    Critical("CRITICAL"),
	    Major("MAJOR"),
	    Minor("MINOR"),
	    Warning("WARNING"),
	    NonAlarmed("NORMAL");

	    private final String displayName;

	    severity(String displayName) {
	        this.displayName = displayName;
	    }

	    @JsonValue
	    public String getDisplayName() {
	        return displayName;
	    }

	    @JsonCreator
	    public static severity fromValue(String value) {
	        for (severity sev : severity.values()) {
	            if (sev.name().equalsIgnoreCase(value) || sev.displayName.equalsIgnoreCase(value)) {
	                return sev;
	            }
	        }
	        throw new IllegalArgumentException("Unknown value for severity: " + value);
	    }

	    @Override
	    public String toString() {
	        return displayName;
	    }
	}

	public enum VfStatus {
	    ACTIVE("Active"),
	    IDLE("Idle"),
	    PREPARING_TO_TERMINATE("Preparing to terminate"),
	    READY_TO_TERMINATE("Ready to terminate"),
	    REQUESTING_TERMINATION("Requesting Termination");

	    private final String displayName;

	    VfStatus(String displayName) {
	        this.displayName = displayName;
	    }

	    @JsonValue
	    public String getDisplayName() {
	        return displayName;
	    }

	    @JsonCreator
	    public static VfStatus fromValue(String value) {
	        for (VfStatus status : VfStatus.values()) {
	            if (status.name().equalsIgnoreCase(value) || status.displayName.equalsIgnoreCase(value)) {
	                return status;
	            }
	        }
	        throw new IllegalArgumentException("Unknown value for VfStatus: " + value);
	    }

	    @Override
	    public String toString() {
	        return displayName;
	    }
	}

	public enum alarmAction {
	    RAISE("RAISE"),
	    CLEAR("CLEAR");

	    private final String displayName;

	    alarmAction(String displayName) {
	        this.displayName = displayName;
	    }

	    @JsonValue
	    public String getDisplayName() {
	        return displayName;
	    }

	    @JsonCreator
	    public static alarmAction fromValue(String value) {
	        for (alarmAction action : alarmAction.values()) {
	            if (action.name().equalsIgnoreCase(value)) {
	                return action;
	            }
	        }
	        throw new IllegalArgumentException("Unknown value for alarmAction: " + value);
	    }
	}

	public enum priority {
	    High("High"),
	    Low("Low"),
	    Normal("Normal"),
	    Medium("Medium");

	    private final String displayName;

	    priority(String displayName) {
	        this.displayName = displayName;
	    }

	    @JsonValue
	    public String getDisplayName() {
	        return displayName;
	    }

	    @JsonCreator
	    public static priority fromValue(String value) {
	        for (priority prio : priority.values()) {
	            if (prio.name().equalsIgnoreCase(value)) {
	                return prio;
	            }
	        }
	        throw new IllegalArgumentException("Unknown value for priority: " + value);
	    }
	}
}
