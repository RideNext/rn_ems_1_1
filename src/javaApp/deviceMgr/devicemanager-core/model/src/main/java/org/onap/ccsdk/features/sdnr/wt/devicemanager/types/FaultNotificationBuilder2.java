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

import org.eclipse.jdt.annotation.Nullable;
import org.opendaylight.yang.gen.v1.urn.ietf.params.xml.ns.yang.ietf.yang.types.rev130715.DateAndTime;
import org.opendaylight.yang.gen.v1.urn.opendaylight.params.xml.ns.yang.data.provider.rev201110.FaultlogBuilder;
import org.opendaylight.yang.gen.v1.urn.opendaylight.params.xml.ns.yang.data.provider.rev201110.SeverityType;
import org.opendaylight.yang.gen.v1.urn.opendaylight.params.xml.ns.yang.data.provider.rev201110.SourceType;
import org.opendaylight.yang.gen.v1.urn.tbd.params.xml.ns.yang.network.topology.rev131021.NodeId;

import java.time.Instant;
/**
 * Add specific constructor
 */
public class FaultNotificationBuilder2 extends FaultlogBuilder {

    public FaultNotificationBuilder2(NodeId nodeId, @Nullable Integer counter, @Nullable DateAndTime timeStamp,
            @Nullable String objectId, @Nullable String problem, @Nullable SeverityType severity,
            SourceType sourceType) {

        setNodeId(nodeId.getValue());
        if (counter != null) {
            setCounter(counter);
        }
        if (timeStamp != null) {
            setTimestamp(Instant.parse(timeStamp.getValue()).toEpochMilli()*1000);
        }
        setObjectId(objectId);
        setProblem(problem);
        setSeverity(severity);
        setSourceType(sourceType);
    }

}
