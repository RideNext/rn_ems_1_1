/*
 * ============LICENSE_START=======================================================
 * ONAP : ccsdk features
 * ================================================================================
* Copyright (C) 2024 RideNext Software Solutions. Pvt Ltd.  All rights reserved
* =================================================================================================
 * Copyright (C) 2020 highstreet technologies GmbH Intellectual Property.
 * All rights reserved.
 * ================================================================================
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============LICENSE_END=========================================================
 *
 */
package org.onap.ccsdk.features.sdnr.wt.dataprovider.setup.frankfurt;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import org.onap.ccsdk.features.sdnr.wt.common.database.HtDatabaseClient;
import org.onap.ccsdk.features.sdnr.wt.common.database.requests.ClusterSettingsRequest;
import org.onap.ccsdk.features.sdnr.wt.common.database.responses.ClusterSettingsResponse;
import org.onap.ccsdk.features.sdnr.wt.dataprovider.database.sqldb.SqlDBClient;
import org.onap.ccsdk.features.sdnr.wt.dataprovider.setup.ReleaseInformation;
import org.onap.ccsdk.features.sdnr.wt.dataprovider.setup.data.ComponentName;
import org.onap.ccsdk.features.sdnr.wt.dataprovider.setup.data.DatabaseInfo;
import org.onap.ccsdk.features.sdnr.wt.dataprovider.setup.data.DatabaseInfo7;
import org.onap.ccsdk.features.sdnr.wt.dataprovider.setup.data.Release;
import org.onap.ccsdk.features.sdnr.wt.dataprovider.setup.data.SearchHitConverter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class FrankfurtReleaseInformationR2 extends ReleaseInformation {

    private final Logger LOG = LoggerFactory.getLogger(FrankfurtReleaseInformationR2.class);
    private final Map<Release, Map<ComponentName, SearchHitConverter>> converters = new HashMap<>();

    public FrankfurtReleaseInformationR2() {
        super(Release.FRANKFURT_R2, createDBMap());
    }

    public static Map<ComponentName, DatabaseInfo> createDBMap() {
        Map<ComponentName, DatabaseInfo> map = new HashMap<>();
        map.put(ComponentName.CONNECTIONLOG, new DatabaseInfo7("connectionlog", "connectionlog",
                "{\"node-id\": {\"type\": \"keyword\"},\"timestamp\": {\"type\": \"long\"},\"status\": {\"type\": \"keyword\"}}"));
        map.put(ComponentName.EVENTLOG, new DatabaseInfo7("eventlog", "eventlog",
                "{\"node-id\": {\"type\": \"keyword\"},\"source-type\": {\"type\": \"keyword\"},\"timestamp\": {\"type\": \"long\"},\"new-value\": {\"type\": \"keyword\"},\"attribute-name\": {\"type\": \"keyword\"},\"counter\": {\"type\": \"long\"},\"object-id\": {\"type\": \"keyword\"}}"));
        map.put(ComponentName.FAULTCURRENT, new DatabaseInfo7("faultcurrent", "faultcurrent",
                "{\"node-id\": {\"type\": \"keyword\"},\"severity\": {\"type\": \"keyword\"},\"timestamp\": {\"type\": \"long\"},\"problem\": {\"type\": \"keyword\"},\"counter\": {\"type\": \"long\"},\"object-id\":{\"type\": \"keyword\"}}"));
        map.put(ComponentName.FAULTLOG, new DatabaseInfo7("faultlog", "faultlog",
                "{\"node-id\": {\"type\": \"keyword\"},\"severity\": {\"type\": \"keyword\"},\"timestamp\": {\"type\": \"long\"},\"problem\": {\"type\": \"keyword\"},\"counter\": {\"type\": \"long\"},\"object-id\":{\"type\": \"keyword\"},\"source-type\":{\"type\": \"keyword\"}}"));
        map.put(ComponentName.INVENTORY, new DatabaseInfo7("inventoryequipment", "inventoryequipment",
                "{\"date\": {\"type\": \"keyword\"},\"model-identifier\": {\"type\": \"keyword\"},\"manufacturer-identifier\": {\"type\": \"keyword\"},\"type-name\": {\"type\": \"keyword\"},\"description\": {\"type\": \"keyword\"},\"uuid\": {\"type\": \"keyword\"},\"version\": {\"type\": \"keyword\"},\"parent-uuid\": {\"type\": \"keyword\"},\"contained-holder\": {\"type\": \"keyword\"},\"node-id\": {\"type\": \"keyword\"},\"tree-level\": {\"type\": \"long\"},\"part-type-id\": {\"type\": \"keyword\"},\"serial\": {\"type\": \"keyword\"}}"));
        map.put(ComponentName.HISTORICAL_PERFORMANCE_15M, new DatabaseInfo7("historicalperformance15min",
                "historicalperformance15min",
                "{\"node-name\":{\"type\": \"keyword\"},\"time-stamp\":{\"type\": \"date\"},\"suspect-interval-flag\":{\"type\":\"boolean\"},\"scanner-id\":{\"type\": \"keyword\"},\"uuid-interface\":{\"type\": \"keyword\"},\"layer-protocol-name\":{\"type\": \"keyword\"},\"granularity-period\":{\"type\": \"keyword\"},\"radio-signal-id\":{\"type\": \"keyword\"}}"));
        map.put(ComponentName.HISTORICAL_PERFORMANCE_24H, new DatabaseInfo7("historicalperformance24h",
                "historicalperformance24h",
                "{\"node-name\":{\"type\": \"keyword\"},\"time-stamp\":{\"type\": \"date\"},\"suspect-interval-flag\":{\"type\":\"boolean\"},\"scanner-id\":{\"type\": \"keyword\"},\"uuid-interface\":{\"type\": \"keyword\"},\"layer-protocol-name\":{\"type\": \"keyword\"},\"granularity-period\":{\"type\": \"keyword\"},\"radio-signal-id\":{\"type\": \"keyword\"}}"));
        map.put(ComponentName.REQUIRED_NETWORKELEMENT, new DatabaseInfo7("networkelement-connection",
                "networkelement-connection",
                "{\"node-id\": {\"type\": \"keyword\"},\"host\": {\"type\": \"keyword\"},\"port\": {\"type\": \"long\"},\"username\": {\"type\": \"keyword\"},\"password\": {\"type\": \"keyword\"},\"core-model-capability\": {\"type\": \"keyword\"},\"device-type\": {\"type\": \"keyword\"},\"is-required\": {\"type\": \"boolean\"},\"status\": {\"type\": \"keyword\"} ,\"softwareVersion\": {\"type\": \"keyword\"},\"serialNumber\": {\"type\": \"keyword\"}}"));
        map.put(ComponentName.MEDIATOR_SERVER, new DatabaseInfo7("mediator-server", "mediator-server",
                "{\"url\":{\"type\": \"keyword\"},\"name\":{\"type\": \"keyword\"}}"));
        map.put(ComponentName.MAINTENANCE, new DatabaseInfo7("maintenancemode", "maintenancemode",
                "{\"node-id\": {\"type\": \"keyword\"},\"start\": {\"type\": \"date\"},\"end\": {\"type\": \"date\"},\"description\": {\"type\": \"keyword\"},\"active\": {\"type\": \"boolean\"}},\"date_detection\":false}}"));
        return map;
    }

    @Override
    public SearchHitConverter getConverter(Release dst, ComponentName comp) {
        SearchHitConverter c = this.converters.containsKey(dst) ? this.converters.get(dst).get(comp) : null;
        if (c == null) {
            c = super.getConverter(dst, comp);
        }
        return c;
    }

    @Override
    public boolean runPreInitCommands(HtDatabaseClient dbClient) {

        ClusterSettingsResponse response = null;
        try {
            response = dbClient.setupClusterSettings(new ClusterSettingsRequest(false).maxCompilationsPerMinute(400));
        } catch (IOException e) {
            LOG.warn("problem setting up cluster: {}", e);
        }
        return response == null ? false : response.isAcknowledged();
    }

    @Override
    public boolean runPostInitCommands(HtDatabaseClient dbClient) {
        return true;
    }

    @Override
    public boolean runPreInitCommands(SqlDBClient dbClient) {
        return false;
    }

    @Override
    public boolean runPostInitCommands(SqlDBClient dbClient) {
        return false;
    }

}
