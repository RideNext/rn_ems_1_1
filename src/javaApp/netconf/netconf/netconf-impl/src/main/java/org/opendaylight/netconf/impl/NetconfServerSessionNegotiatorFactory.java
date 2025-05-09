/*
 * Copyright (c) 2013 Cisco Systems, Inc. and others.  All rights reserved.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v1.0 which accompanies this distribution,
 * and is available at http://www.eclipse.org/legal/epl-v10.html
 */
package org.opendaylight.netconf.impl;

import com.google.common.base.Preconditions;
import com.google.common.collect.Collections2;
import com.google.common.collect.ImmutableSet;
import com.google.common.collect.Sets;
import io.netty.channel.Channel;
import io.netty.util.Timer;
import io.netty.util.concurrent.Promise;
import java.net.SocketAddress;
import java.util.Set;
import org.checkerframework.checker.index.qual.NonNegative;
import org.opendaylight.netconf.api.NetconfSessionListenerFactory;
import org.opendaylight.netconf.api.messages.NetconfHelloMessage;
import org.opendaylight.netconf.api.monitoring.NetconfMonitoringService;
import org.opendaylight.netconf.api.xml.XmlNetconfConstants;
import org.opendaylight.netconf.impl.osgi.NetconfOperationRouter;
import org.opendaylight.netconf.impl.osgi.NetconfOperationRouterImpl;
import org.opendaylight.netconf.mapping.api.NetconfOperationService;
import org.opendaylight.netconf.mapping.api.NetconfOperationServiceFactory;
import org.opendaylight.netconf.nettyutil.AbstractNetconfSessionNegotiator;
import org.opendaylight.netconf.nettyutil.NetconfSessionNegotiatorFactory;
import org.opendaylight.yang.gen.v1.urn.ietf.params.xml.ns.yang.ietf.inet.types.rev130715.Uri;
import org.opendaylight.yang.gen.v1.urn.ietf.params.xml.ns.yang.ietf.netconf.monitoring.rev101004.netconf.state.Capabilities;

public class NetconfServerSessionNegotiatorFactory
    implements NetconfSessionNegotiatorFactory<NetconfServerSession, NetconfServerSessionListener> {

    public static final Set<String> DEFAULT_BASE_CAPABILITIES = ImmutableSet.of(
            XmlNetconfConstants.URN_IETF_PARAMS_NETCONF_BASE_1_0,
            XmlNetconfConstants.URN_IETF_PARAMS_NETCONF_BASE_1_1,
            XmlNetconfConstants.URN_IETF_PARAMS_NETCONF_CAPABILITY_EXI_1_0,
            XmlNetconfConstants.URN_IETF_PARAMS_NETCONF_CAPABILITY_NOTIFICATION_1_0
    );

    private final @NonNegative int maximumIncomingChunkSize;
    private final Timer timer;
    private final SessionIdProvider idProvider;
    private final NetconfOperationServiceFactory aggregatedOpService;
    private final long connectionTimeoutMillis;
    private final NetconfMonitoringService monitoringService;
    private final Set<String> baseCapabilities;

    // FIXME: 5.0.0: protected
    public NetconfServerSessionNegotiatorFactory(final Timer timer,
            final NetconfOperationServiceFactory netconfOperationProvider, final SessionIdProvider idProvider,
            final long connectionTimeoutMillis, final NetconfMonitoringService monitoringService) {
        this(timer, netconfOperationProvider, idProvider, connectionTimeoutMillis, monitoringService, null);
    }

    // FIXME: 5.0.0: protected
    public NetconfServerSessionNegotiatorFactory(final Timer timer,
            final NetconfOperationServiceFactory netconfOperationProvider, final SessionIdProvider idProvider,
            final long connectionTimeoutMillis,  final NetconfMonitoringService monitoringService,
            final Set<String> baseCapabilities) {
        this(timer, netconfOperationProvider, idProvider, connectionTimeoutMillis, monitoringService, baseCapabilities,
            AbstractNetconfSessionNegotiator.DEFAULT_MAXIMUM_INCOMING_CHUNK_SIZE);
    }

    protected NetconfServerSessionNegotiatorFactory(final Timer timer,
            final NetconfOperationServiceFactory netconfOperationProvider, final SessionIdProvider idProvider,
            final long connectionTimeoutMillis, final NetconfMonitoringService monitoringService,
            final Set<String> baseCapabilities, final @NonNegative int maximumIncomingChunkSize) {
        this.timer = timer;
        aggregatedOpService = netconfOperationProvider;
        this.idProvider = idProvider;
        this.connectionTimeoutMillis = connectionTimeoutMillis;
        this.monitoringService = monitoringService;
        this.maximumIncomingChunkSize = maximumIncomingChunkSize;
        this.baseCapabilities = validateBaseCapabilities(baseCapabilities == null ? DEFAULT_BASE_CAPABILITIES :
                baseCapabilities);
    }

    private static ImmutableSet<String> validateBaseCapabilities(final Set<String> baseCapabilities) {
        // Check base capabilities to be supported by the server
        final Sets.SetView<String> unknownBaseCaps = Sets.difference(baseCapabilities, DEFAULT_BASE_CAPABILITIES);
        Preconditions.checkArgument(unknownBaseCaps.isEmpty(),
                "Base capabilities that will be supported by netconf server have to be subset of %s, "
                        + "unknown base capabilities: %s",
                DEFAULT_BASE_CAPABILITIES, unknownBaseCaps);

        final ImmutableSet.Builder<String> b = ImmutableSet.builder();
        b.addAll(baseCapabilities);
        // Base 1.0 capability is supported by default
        b.add(XmlNetconfConstants.URN_IETF_PARAMS_NETCONF_BASE_1_0);
        return b.build();
    }

    /**
     * Get session negotiator.
     *
     * @param defunctSessionListenerFactory will not be taken into account as session listener factory can
     *                                      only be created after snapshot is opened, thus this method constructs
     *                                      proper session listener factory.
     * @param channel                       Underlying channel
     * @param promise                       Promise to be notified
     * @return session negotiator
     */
    @Override
    public NetconfServerSessionNegotiator getSessionNegotiator(
            final NetconfSessionListenerFactory<NetconfServerSessionListener> defunctSessionListenerFactory,
            final Channel channel, final Promise<NetconfServerSession> promise) {
        final long sessionId = idProvider.getNextSessionId();

        return new NetconfServerSessionNegotiator(createHelloMessage(sessionId, monitoringService), sessionId, promise,
            channel, timer, getListener(Long.toString(sessionId), channel.parent().localAddress()),
            connectionTimeoutMillis, maximumIncomingChunkSize);
    }

    private NetconfServerSessionListener getListener(final String netconfSessionIdForReporting,
                                                     final SocketAddress socketAddress) {
        final NetconfOperationService service = getOperationServiceForAddress(netconfSessionIdForReporting,
                socketAddress);
        final NetconfOperationRouter operationRouter =
                new NetconfOperationRouterImpl(service, monitoringService, netconfSessionIdForReporting);
        return new NetconfServerSessionListener(operationRouter, monitoringService, service);
    }

    protected NetconfOperationService getOperationServiceForAddress(final String netconfSessionIdForReporting,
                                                                    final SocketAddress socketAddress) {
        return aggregatedOpService.createService(netconfSessionIdForReporting);
    }

    protected final NetconfOperationServiceFactory getOperationServiceFactory() {
        return aggregatedOpService;
    }

    private NetconfHelloMessage createHelloMessage(
            final long sessionId, final NetconfMonitoringService capabilityProvider) {
        return NetconfHelloMessage.createServerHello(Sets.union(transformCapabilities(capabilityProvider
                .getCapabilities()), baseCapabilities), sessionId);
    }

    public static Set<String> transformCapabilities(final Capabilities capabilities) {
        return Sets.newHashSet(Collections2.transform(capabilities.getCapability(), Uri::getValue));
    }
}
