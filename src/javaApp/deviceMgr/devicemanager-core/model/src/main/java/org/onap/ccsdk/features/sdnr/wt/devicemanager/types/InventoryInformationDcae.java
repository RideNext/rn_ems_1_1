/*
 * ============LICENSE_START========================================================================
 * ONAP : ccsdk feature sdnr wt
 * =================================================================================================
* Copyright (C) 2024 RideNext Software Solutions. Pvt Ltd.  All rights reserved
* =================================================================================================
 * Copyright (C) 2019 highstreet technologies GmbH Intellectual Property. All rights reserved.
 * =================================================================================================
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 * ============LICENSE_END==========================================================================
 */
package org.onap.ccsdk.features.sdnr.wt.devicemanager.types;

import java.util.ArrayList;
import java.util.List;

/**
 * Inventory information of a device, used by DCAE
 */
public class InventoryInformationDcae {

    private static final String UNKNOWN = "unknown";
    private static final List<String> EMPTY = new ArrayList<>();
    private static final InventoryInformationDcae DEFAULT = new InventoryInformationDcae();

    private String type;
    private String model;
    private String vendor;
    private String deviceIpv4;
    private String deviceIpv6;
    private List<String> interfaceUuidList;

    public InventoryInformationDcae() {
        this.type = UNKNOWN;
        this.model = UNKNOWN;
        this.vendor = UNKNOWN;
        this.deviceIpv4 = UNKNOWN;
        this.deviceIpv6 = UNKNOWN;
        this.interfaceUuidList = EMPTY;
    }

    public InventoryInformationDcae(InventoryInformationDcae inventoryInformation) {
        this.type = inventoryInformation.type;
        this.model = inventoryInformation.model;
        this.vendor = inventoryInformation.vendor;
        this.deviceIpv4 = inventoryInformation.deviceIpv4;
        this.deviceIpv6 = inventoryInformation.deviceIpv6;
        this.interfaceUuidList = new ArrayList<>(inventoryInformation.interfaceUuidList);
    }

    public InventoryInformationDcae(String type, String model, String vendor, String deviceIpv4, String deviceIpv6,
            List<String> interfaceUuidList) {
        setType(type);
        setModel(model);
        setVendor(vendor);
        setDeviceIpv4(deviceIpv4);
        setDeviceIpv6(deviceIpv6);
        setInterfaceUuidList(interfaceUuidList);
    }

    public String getType() {
        return type;
    }

    public String getModel() {
        return model;
    }

    public String getVendor() {
        return vendor;
    }

    public String getDeviceIpv4() {
        return deviceIpv4;
    }

    public String getDeviceIpv6() {
        return deviceIpv6;
    }

    public List<String> getInterfaceUuidList() {
        return interfaceUuidList;
    }

    public InventoryInformationDcae setType(String type) {
        this.type = type != null ? type : UNKNOWN;
        return this;
    }

    public InventoryInformationDcae setModel(String model) {
        this.model = model != null ? model : UNKNOWN;
        return this;
    }

    public InventoryInformationDcae setVendor(String vendor) {
        this.vendor = vendor != null ? vendor : UNKNOWN;
        return this;
    }

    public InventoryInformationDcae setDeviceIpv4(String deviceIpv4) {
        this.deviceIpv4 = deviceIpv4 != null ? deviceIpv4 : UNKNOWN;
        return this;
    }

    public InventoryInformationDcae setDeviceIpv6(String deviceIpv6) {
        this.deviceIpv6 = deviceIpv6 != null ? deviceIpv6 : UNKNOWN;
        return this;
    }

    public InventoryInformationDcae setInterfaceUuidList(List<String> interfaceUuidList) {
        this.interfaceUuidList = interfaceUuidList != null ? interfaceUuidList : EMPTY;
        return this;
    }

    public static InventoryInformationDcae getDefault() {
        return DEFAULT;
    }

    @Override
    public String toString() {
        return "InventoryInformation [type=" + type + ", model=" + model + ", vendor=" + vendor + ", deviceIpv4="
                + deviceIpv4 + ", deviceIpv6=" + deviceIpv6 + ", interfaceUuidList=" + interfaceUuidList + "]";
    }

}
