/*
 * ============LICENSE_START========================================================================
 * ONAP : ccsdk feature sdnr wt
 * =================================================================================================
* Copyright (C) 2024 RideNext Software Solutions. Pvt Ltd.  All rights reserved
* =================================================================================================
 * Copyright (C) 2020 highstreet technologies GmbH Intellectual Property. All rights reserved.
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
package org.onap.ccsdk.features.sdnr.wt.devicemanager.impl.util;

import com.google.common.util.concurrent.Futures;
import com.google.common.util.concurrent.ListenableFuture;
import org.eclipse.jdt.annotation.NonNull;
import org.opendaylight.mdsal.singleton.common.api.ClusterSingletonService;
import org.opendaylight.mdsal.singleton.common.api.ClusterSingletonServiceProvider;
import org.opendaylight.mdsal.singleton.common.api.ClusterSingletonServiceRegistration;
import org.opendaylight.mdsal.singleton.common.api.ServiceGroupIdentifier;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class OdlClusterSingleton implements ClusterSingletonService, AutoCloseable {

    private static final Logger LOG = LoggerFactory.getLogger(OdlClusterSingleton.class);
    private final @NonNull ServiceGroupIdentifier ident;
    private final ClusterSingletonServiceRegistration cssRegistration;
    private volatile boolean master;

    @SuppressWarnings("null")
    public OdlClusterSingleton(ClusterSingletonServiceProvider clusterSingletonServiceProvider) {
        this.ident = ServiceGroupIdentifier.create("ODLEventListenerHandler");
        this.cssRegistration = clusterSingletonServiceProvider.registerClusterSingletonService(this);
        this.master = false;
    }

    @Override
    public @NonNull ServiceGroupIdentifier getIdentifier() {
        return ident;
    }

    @Override
    public void instantiateServiceInstance() {
        LOG.debug("We take Leadership");
        this.master = true;
    }

    @Override
    public ListenableFuture<? extends Object> closeServiceInstance() {
        LOG.debug("We lost Leadership");
        this.master = false;
        return Futures.immediateFuture(null);
    }

    public boolean isMaster() {
        return master;
    }

    @Override
    public void close() throws Exception {
        if (cssRegistration != null) {
            cssRegistration.close();
        }
    }
}
