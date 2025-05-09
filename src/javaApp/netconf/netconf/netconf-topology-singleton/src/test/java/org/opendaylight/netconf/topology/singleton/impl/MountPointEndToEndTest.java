/*
 * Copyright (c) 2018 Inocybe Technologies and others.  All rights reserved.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v1.0 which accompanies this distribution,
 * and is available at http://www.eclipse.org/legal/epl-v10.html
 */
package org.opendaylight.netconf.topology.singleton.impl;

import static org.awaitility.Awaitility.await;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doAnswer;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.spy;
import static org.mockito.Mockito.timeout;
import static org.mockito.Mockito.verify;

import akka.actor.ActorSystem;
import akka.testkit.javadsl.TestKit;
import akka.util.Timeout;
import com.google.common.collect.ImmutableList;
import com.google.common.collect.ImmutableMap;
import com.google.common.collect.ImmutableSet;
import com.google.common.collect.Lists;
import com.google.common.util.concurrent.FluentFuture;
import com.google.common.util.concurrent.Futures;
import com.google.common.util.concurrent.ListenableFuture;
import com.google.common.util.concurrent.MoreExecutors;
import com.google.common.util.concurrent.SettableFuture;
import com.typesafe.config.ConfigFactory;
import io.netty.util.concurrent.EventExecutor;
import io.netty.util.concurrent.GlobalEventExecutor;
import java.io.File;
import java.util.AbstractMap.SimpleEntry;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;
import org.apache.commons.io.FileUtils;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.opendaylight.aaa.encrypt.AAAEncryptionService;
import org.opendaylight.controller.cluster.ActorSystemProvider;
import org.opendaylight.controller.config.threadpool.ScheduledThreadPool;
import org.opendaylight.controller.config.threadpool.ThreadPool;
import org.opendaylight.mdsal.binding.api.DataBroker;
import org.opendaylight.mdsal.binding.api.DataObjectModification;
import org.opendaylight.mdsal.binding.api.DataTreeIdentifier;
import org.opendaylight.mdsal.binding.api.DataTreeModification;
import org.opendaylight.mdsal.binding.api.ReadTransaction;
import org.opendaylight.mdsal.binding.api.RpcProviderService;
import org.opendaylight.mdsal.binding.api.Transaction;
import org.opendaylight.mdsal.binding.api.TransactionChain;
import org.opendaylight.mdsal.binding.api.TransactionChainListener;
import org.opendaylight.mdsal.binding.api.WriteTransaction;
import org.opendaylight.mdsal.binding.dom.adapter.test.AbstractConcurrentDataBrokerTest;
import org.opendaylight.mdsal.binding.dom.codec.api.BindingNormalizedNodeSerializer;
import org.opendaylight.mdsal.binding.runtime.spi.BindingRuntimeHelpers;
import org.opendaylight.mdsal.binding.spec.reflect.BindingReflections;
import org.opendaylight.mdsal.common.api.LogicalDatastoreType;
import org.opendaylight.mdsal.dom.api.DOMActionProviderService;
import org.opendaylight.mdsal.dom.api.DOMActionService;
import org.opendaylight.mdsal.dom.api.DOMDataBroker;
import org.opendaylight.mdsal.dom.api.DOMDataTreeReadOperations;
import org.opendaylight.mdsal.dom.api.DOMDataTreeReadWriteTransaction;
import org.opendaylight.mdsal.dom.api.DOMDataTreeWriteTransaction;
import org.opendaylight.mdsal.dom.api.DOMMountPoint;
import org.opendaylight.mdsal.dom.api.DOMMountPointListener;
import org.opendaylight.mdsal.dom.api.DOMMountPointService;
import org.opendaylight.mdsal.dom.api.DOMRpcIdentifier;
import org.opendaylight.mdsal.dom.api.DOMRpcImplementation;
import org.opendaylight.mdsal.dom.api.DOMRpcProviderService;
import org.opendaylight.mdsal.dom.api.DOMRpcResult;
import org.opendaylight.mdsal.dom.api.DOMRpcService;
import org.opendaylight.mdsal.dom.api.DOMService;
import org.opendaylight.mdsal.dom.broker.DOMMountPointServiceImpl;
import org.opendaylight.mdsal.dom.broker.DOMRpcRouter;
import org.opendaylight.mdsal.dom.spi.DefaultDOMRpcResult;
import org.opendaylight.mdsal.singleton.common.api.ClusterSingletonServiceProvider;
import org.opendaylight.mdsal.singleton.common.api.ClusterSingletonServiceRegistration;
import org.opendaylight.mdsal.singleton.common.api.ServiceGroupIdentifier;
import org.opendaylight.mdsal.singleton.dom.impl.DOMClusterSingletonServiceProviderImpl;
import org.opendaylight.netconf.client.NetconfClientDispatcher;
import org.opendaylight.netconf.nettyutil.ReconnectFuture;
import org.opendaylight.netconf.sal.connect.api.DeviceActionFactory;
import org.opendaylight.netconf.sal.connect.api.SchemaResourceManager;
import org.opendaylight.netconf.sal.connect.impl.DefaultSchemaResourceManager;
import org.opendaylight.netconf.sal.connect.netconf.NetconfDevice.SchemaResourcesDTO;
import org.opendaylight.netconf.sal.connect.netconf.listener.NetconfSessionPreferences;
import org.opendaylight.netconf.sal.connect.netconf.util.NetconfMessageTransformUtil;
import org.opendaylight.netconf.topology.singleton.impl.utils.ClusteringRpcException;
import org.opendaylight.netconf.topology.singleton.impl.utils.NetconfTopologySetup;
import org.opendaylight.netconf.topology.singleton.impl.utils.NetconfTopologyUtils;
import org.opendaylight.yang.gen.v1.urn.ietf.params.xml.ns.yang.ietf.inet.types.rev130715.Host;
import org.opendaylight.yang.gen.v1.urn.ietf.params.xml.ns.yang.ietf.inet.types.rev130715.IpAddress;
import org.opendaylight.yang.gen.v1.urn.ietf.params.xml.ns.yang.ietf.inet.types.rev130715.Ipv4Address;
import org.opendaylight.yang.gen.v1.urn.ietf.params.xml.ns.yang.ietf.inet.types.rev130715.PortNumber;
import org.opendaylight.yang.gen.v1.urn.opendaylight.netconf.keystore.rev171017.Keystore;
import org.opendaylight.yang.gen.v1.urn.opendaylight.netconf.node.topology.rev150114.NetconfNode;
import org.opendaylight.yang.gen.v1.urn.opendaylight.netconf.node.topology.rev150114.NetconfNodeBuilder;
import org.opendaylight.yang.gen.v1.urn.opendaylight.netconf.node.topology.rev150114.NetconfNodeConnectionStatus;
import org.opendaylight.yang.gen.v1.urn.opendaylight.netconf.node.topology.rev150114.netconf.node.credentials.credentials.LoginPwUnencryptedBuilder;
import org.opendaylight.yang.gen.v1.urn.opendaylight.netconf.node.topology.rev150114.netconf.node.credentials.credentials.login.pw.unencrypted.LoginPasswordUnencryptedBuilder;
import org.opendaylight.yang.gen.v1.urn.opendaylight.netconf.node.topology.rev150114.network.topology.topology.topology.types.TopologyNetconf;
import org.opendaylight.yang.gen.v1.urn.opendaylight.netconf.topology.singleton.config.rev170419.Config;
import org.opendaylight.yang.gen.v1.urn.opendaylight.netconf.topology.singleton.config.rev170419.ConfigBuilder;
import org.opendaylight.yang.gen.v1.urn.opendaylight.params.xml.ns.yang.controller.md.sal.test.list.rev140701.GetTopInput;
import org.opendaylight.yang.gen.v1.urn.opendaylight.params.xml.ns.yang.controller.md.sal.test.list.rev140701.GetTopOutputBuilder;
import org.opendaylight.yang.gen.v1.urn.opendaylight.params.xml.ns.yang.controller.md.sal.test.list.rev140701.PutTopInputBuilder;
import org.opendaylight.yang.gen.v1.urn.opendaylight.params.xml.ns.yang.controller.md.sal.test.list.rev140701.Top;
import org.opendaylight.yang.gen.v1.urn.opendaylight.params.xml.ns.yang.controller.md.sal.test.list.rev140701.two.level.list.TopLevelList;
import org.opendaylight.yang.gen.v1.urn.opendaylight.params.xml.ns.yang.controller.md.sal.test.list.rev140701.two.level.list.TopLevelListBuilder;
import org.opendaylight.yang.gen.v1.urn.opendaylight.params.xml.ns.yang.controller.md.sal.test.list.rev140701.two.level.list.TopLevelListKey;
import org.opendaylight.yang.gen.v1.urn.tbd.params.xml.ns.yang.network.topology.rev131021.NetworkTopology;
import org.opendaylight.yang.gen.v1.urn.tbd.params.xml.ns.yang.network.topology.rev131021.NodeId;
import org.opendaylight.yang.gen.v1.urn.tbd.params.xml.ns.yang.network.topology.rev131021.network.topology.Topology;
import org.opendaylight.yang.gen.v1.urn.tbd.params.xml.ns.yang.network.topology.rev131021.network.topology.topology.Node;
import org.opendaylight.yang.gen.v1.urn.tbd.params.xml.ns.yang.network.topology.rev131021.network.topology.topology.NodeBuilder;
import org.opendaylight.yang.gen.v1.urn.tbd.params.xml.ns.yang.network.topology.rev131021.network.topology.topology.NodeKey;
import org.opendaylight.yangtools.rfc8528.data.util.EmptyMountPointContext;
import org.opendaylight.yangtools.util.concurrent.FluentFutures;
import org.opendaylight.yangtools.yang.binding.InstanceIdentifier;
import org.opendaylight.yangtools.yang.binding.KeyedInstanceIdentifier;
import org.opendaylight.yangtools.yang.binding.YangModuleInfo;
import org.opendaylight.yangtools.yang.common.ErrorTag;
import org.opendaylight.yangtools.yang.common.ErrorType;
import org.opendaylight.yangtools.yang.common.QName;
import org.opendaylight.yangtools.yang.common.Revision;
import org.opendaylight.yangtools.yang.common.RpcError;
import org.opendaylight.yangtools.yang.common.RpcResultBuilder;
import org.opendaylight.yangtools.yang.common.Uint16;
import org.opendaylight.yangtools.yang.common.Uint32;
import org.opendaylight.yangtools.yang.data.api.YangInstanceIdentifier;
import org.opendaylight.yangtools.yang.data.api.schema.ContainerNode;
import org.opendaylight.yangtools.yang.data.api.schema.MapEntryNode;
import org.opendaylight.yangtools.yang.data.api.schema.MapNode;
import org.opendaylight.yangtools.yang.data.api.schema.NormalizedNode;
import org.opendaylight.yangtools.yang.data.impl.schema.Builders;
import org.opendaylight.yangtools.yang.data.impl.schema.ImmutableNodes;
import org.opendaylight.yangtools.yang.model.api.EffectiveModelContext;
import org.opendaylight.yangtools.yang.model.api.Module;
import org.opendaylight.yangtools.yang.model.api.RpcDefinition;
import org.opendaylight.yangtools.yang.model.repo.api.SourceIdentifier;
import org.opendaylight.yangtools.yang.model.repo.api.YangTextSchemaSource;
import org.opendaylight.yangtools.yang.model.repo.spi.PotentialSchemaSource;
import org.opendaylight.yangtools.yang.parser.impl.DefaultYangParserFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Tests netconf mount points end-to-end.
 *
 * @author Thomas Pantelis
 */
@RunWith(MockitoJUnitRunner.StrictStubs.class)
public class MountPointEndToEndTest extends AbstractBaseSchemasTest {
    private static final Logger LOG = LoggerFactory.getLogger(MountPointEndToEndTest.class);

    private static final String TOP_MODULE_NAME = "opendaylight-mdsal-list-test";
    private static final String ACTOR_SYSTEM_NAME = "test";
    private static final String TOPOLOGY_ID = TopologyNetconf.QNAME.getLocalName();
    private static final KeyedInstanceIdentifier<Node, NodeKey> NODE_INSTANCE_ID =
        NetconfTopologyUtils.createTopologyNodeListPath(new NodeKey(new NodeId("node-id")), TOPOLOGY_ID);

    private static final String TEST_ROOT_DIRECTORY = "test-cache-root";
    private static final String TEST_DEFAULT_SUBDIR = "test-schema";

    @Mock private DOMRpcProviderService mockRpcProviderRegistry;
    @Mock private RpcProviderService mockRpcProviderService;
    @Mock private DOMActionProviderService mockActionProviderRegistry;
    @Mock private NetconfClientDispatcher mockClientDispatcher;
    @Mock private AAAEncryptionService mockEncryptionService;
    @Mock private ThreadPool mockThreadPool;
    @Mock private ScheduledThreadPool mockKeepaliveExecutor;
    @Mock private DeviceActionFactory deviceActionFactory;

    @Mock private ActorSystemProvider mockMasterActorSystemProvider;
    @Mock private DOMMountPointListener masterMountPointListener;
    private final DOMMountPointService masterMountPointService = new DOMMountPointServiceImpl();
    private final DOMRpcRouter deviceRpcService = new DOMRpcRouter();
    private DOMClusterSingletonServiceProviderImpl masterClusterSingletonServiceProvider;
    private DataBroker masterDataBroker;
    private DOMDataBroker deviceDOMDataBroker;
    private ActorSystem masterSystem;
    private NetconfTopologyManager masterNetconfTopologyManager;
    private volatile SettableFuture<MasterSalFacade> masterSalFacadeFuture = SettableFuture.create();

    @Mock private ActorSystemProvider mockSlaveActorSystemProvider;
    @Mock private ClusterSingletonServiceProvider mockSlaveClusterSingletonServiceProvider;
    @Mock private ClusterSingletonServiceRegistration mockSlaveClusterSingletonServiceReg;
    @Mock private DOMMountPointListener slaveMountPointListener;
    private final DOMMountPointService slaveMountPointService = new DOMMountPointServiceImpl();
    private DataBroker slaveDataBroker;
    private ActorSystem slaveSystem;
    private NetconfTopologyManager slaveNetconfTopologyManager;
    private final SettableFuture<NetconfTopologyContext> slaveNetconfTopologyContextFuture = SettableFuture.create();
    private TransactionChain slaveTxChain;

    private final EventExecutor eventExecutor = GlobalEventExecutor.INSTANCE;
    private final Config config = new ConfigBuilder().setWriteTransactionIdleTimeout(Uint16.ZERO).build();
    private EffectiveModelContext deviceSchemaContext;
    private YangModuleInfo topModuleInfo;
    private QName putTopRpcSchemaPath;
    private QName getTopRpcSchemaPath;
    private BindingNormalizedNodeSerializer bindingToNormalized;
    private YangInstanceIdentifier yangNodeInstanceId;
    private final TopDOMRpcImplementation topRpcImplementation = new TopDOMRpcImplementation();
    private final ContainerNode getTopInput = ImmutableNodes.containerNode(GetTopInput.QNAME);

    private SchemaResourceManager resourceManager;

    @Before
    public void setUp() throws Exception {
        deleteCacheDir();

        resourceManager = new DefaultSchemaResourceManager(new DefaultYangParserFactory(), TEST_ROOT_DIRECTORY,
            TEST_DEFAULT_SUBDIR);

        topModuleInfo = BindingReflections.getModuleInfo(Top.class);

        deviceSchemaContext = BindingRuntimeHelpers.createEffectiveModel(Top.class);

        deviceRpcService.onModelContextUpdated(deviceSchemaContext);

        putTopRpcSchemaPath = findRpcDefinition("put-top").getQName();
        getTopRpcSchemaPath = findRpcDefinition("get-top").getQName();

        deviceRpcService.getRpcProviderService().registerRpcImplementation(topRpcImplementation,
                DOMRpcIdentifier.create(putTopRpcSchemaPath), DOMRpcIdentifier.create(getTopRpcSchemaPath));

        setupMaster();

        setupSlave();

        yangNodeInstanceId = bindingToNormalized.toYangInstanceIdentifier(NODE_INSTANCE_ID);

        doReturn(mock(ReconnectFuture.class)).when(mockClientDispatcher).createReconnectingClient(any());

        LOG.info("****** Setup complete");
    }

    private static void deleteCacheDir() {
        FileUtils.deleteQuietly(new File(TEST_ROOT_DIRECTORY));
    }

    @After
    public void tearDown() throws Exception {
        deleteCacheDir();
        TestKit.shutdownActorSystem(slaveSystem, true);
        TestKit.shutdownActorSystem(masterSystem, true);
    }

    private void setupMaster() throws Exception {
        AbstractConcurrentDataBrokerTest dataBrokerTest = newDataBrokerTest();
        masterDataBroker = dataBrokerTest.getDataBroker();
        deviceDOMDataBroker = dataBrokerTest.getDomBroker();
        bindingToNormalized = dataBrokerTest.getDataBrokerTestCustomizer().getAdapterContext().currentSerializer();

        masterSystem = ActorSystem.create(ACTOR_SYSTEM_NAME, ConfigFactory.load().getConfig("Master"));

        masterClusterSingletonServiceProvider = new DOMClusterSingletonServiceProviderImpl();
        masterClusterSingletonServiceProvider.initializeProvider();

        doReturn(masterSystem).when(mockMasterActorSystemProvider).getActorSystem();

        doReturn(MoreExecutors.newDirectExecutorService()).when(mockThreadPool).getExecutor();

        final SchemaResourcesDTO resources =  resourceManager.getSchemaResources(
            new NetconfNodeBuilder().setSchemaCacheDirectory(TEST_DEFAULT_SUBDIR).build(), "test");
        resources.getSchemaRegistry().registerSchemaSource(
            id -> Futures.immediateFuture(YangTextSchemaSource.delegateForByteSource(id,
                    topModuleInfo.getYangTextByteSource())),
            PotentialSchemaSource.create(new SourceIdentifier(TOP_MODULE_NAME,
                    topModuleInfo.getName().getRevision().map(Revision::toString).orElse(null)),
                YangTextSchemaSource.class, 1));

        masterNetconfTopologyManager = new NetconfTopologyManager(BASE_SCHEMAS, masterDataBroker,
                mockRpcProviderRegistry, mockActionProviderRegistry, masterClusterSingletonServiceProvider,
                mockKeepaliveExecutor, mockThreadPool, mockMasterActorSystemProvider, eventExecutor,
                mockClientDispatcher, TOPOLOGY_ID, config, masterMountPointService, mockEncryptionService,
                mockRpcProviderService, deviceActionFactory, resourceManager) {
            @Override
            protected NetconfTopologyContext newNetconfTopologyContext(final NetconfTopologySetup setup,
                final ServiceGroupIdentifier serviceGroupIdent, final Timeout actorResponseWaitTime,
                final DeviceActionFactory deviceActionFact) {
                NetconfTopologyContext context =
                    super.newNetconfTopologyContext(setup, serviceGroupIdent, actorResponseWaitTime, deviceActionFact);

                NetconfTopologyContext spiedContext = spy(context);
                doAnswer(invocation -> {
                    final MasterSalFacade spiedFacade = (MasterSalFacade) spy(invocation.callRealMethod());
                    doReturn(deviceDOMDataBroker).when(spiedFacade).newDeviceDataBroker();
                    masterSalFacadeFuture.set(spiedFacade);
                    return spiedFacade;
                }).when(spiedContext).newMasterSalFacade();

                return spiedContext;
            }
        };

        masterNetconfTopologyManager.init();

        verifyTopologyNodesCreated(masterDataBroker);
    }

    private void setupSlave() throws Exception {
        AbstractConcurrentDataBrokerTest dataBrokerTest = newDataBrokerTest();
        slaveDataBroker = dataBrokerTest.getDataBroker();

        slaveSystem = ActorSystem.create(ACTOR_SYSTEM_NAME, ConfigFactory.load().getConfig("Slave"));

        doReturn(slaveSystem).when(mockSlaveActorSystemProvider).getActorSystem();

        doReturn(mockSlaveClusterSingletonServiceReg).when(mockSlaveClusterSingletonServiceProvider)
                .registerClusterSingletonService(any());

        slaveNetconfTopologyManager = new NetconfTopologyManager(BASE_SCHEMAS, slaveDataBroker, mockRpcProviderRegistry,
            mockActionProviderRegistry, mockSlaveClusterSingletonServiceProvider, mockKeepaliveExecutor, mockThreadPool,
                mockSlaveActorSystemProvider, eventExecutor, mockClientDispatcher, TOPOLOGY_ID, config,
                slaveMountPointService, mockEncryptionService, mockRpcProviderService, deviceActionFactory,
                resourceManager) {
            @Override
            protected NetconfTopologyContext newNetconfTopologyContext(final NetconfTopologySetup setup,
                final ServiceGroupIdentifier serviceGroupIdent, final Timeout actorResponseWaitTime,
                final DeviceActionFactory actionFactory) {
                NetconfTopologyContext spiedContext = spy(super.newNetconfTopologyContext(setup, serviceGroupIdent,
                    actorResponseWaitTime, actionFactory));

                slaveNetconfTopologyContextFuture.set(spiedContext);
                return spiedContext;
            }
        };

        slaveNetconfTopologyManager.init();

        verifyTopologyNodesCreated(slaveDataBroker);

        slaveTxChain = slaveDataBroker.createTransactionChain(new TransactionChainListener() {
            @Override
            public void onTransactionChainSuccessful(final TransactionChain chain) {
            }

            @Override
            public void onTransactionChainFailed(final TransactionChain chain, final Transaction transaction,
                    final Throwable cause) {
                LOG.error("Slave transaction chain failed", cause);
            }
        });
    }

    @Test
    public void test() throws Exception {
        testMaster();

        testSlave();

        final MasterSalFacade masterSalFacade = testMasterNodeUpdated();

        testMasterDisconnected(masterSalFacade);

        testCleanup();
    }

    private MasterSalFacade testMaster() throws InterruptedException, ExecutionException, TimeoutException {
        LOG.info("****** Testing master");

        writeNetconfNode(TEST_DEFAULT_SUBDIR, masterDataBroker);

        final MasterSalFacade masterSalFacade = masterSalFacadeFuture.get(5, TimeUnit.SECONDS);
        final ArrayList<String> capabilities = Lists.newArrayList(
            NetconfMessageTransformUtil.NETCONF_CANDIDATE_URI.toString());

        masterSalFacade.onDeviceConnected(new EmptyMountPointContext(deviceSchemaContext),
                NetconfSessionPreferences.fromStrings(capabilities), deviceRpcService.getRpcService());

        DOMMountPoint masterMountPoint = awaitMountPoint(masterMountPointService);

        LOG.info("****** Testing master DOMDataBroker operations");

        testDOMDataBrokerOperations(getDOMDataBroker(masterMountPoint));

        LOG.info("****** Testing master DOMRpcService");

        testDOMRpcService(getDOMRpcService(masterMountPoint));
        return masterSalFacade;
    }

    private void testSlave() throws InterruptedException, ExecutionException, TimeoutException {
        LOG.info("****** Testing slave");

        writeNetconfNode("slave", slaveDataBroker);

        verify(mockSlaveClusterSingletonServiceProvider, timeout(5000)).registerClusterSingletonService(any());

        // Since the master and slave use separate DataBrokers we need to copy the master's oper node to the slave.
        // This is essentially what happens in a clustered environment but we'll use a DTCL here.

        masterDataBroker.registerDataTreeChangeListener(
            DataTreeIdentifier.create(LogicalDatastoreType.OPERATIONAL, NODE_INSTANCE_ID), changes -> {
                final WriteTransaction slaveTx = slaveTxChain.newWriteOnlyTransaction();
                for (DataTreeModification<Node> dataTreeModification : changes) {
                    DataObjectModification<Node> rootNode = dataTreeModification.getRootNode();
                    InstanceIdentifier<Node> path = dataTreeModification.getRootPath().getRootIdentifier();
                    switch (rootNode.getModificationType()) {
                        case WRITE:
                        case SUBTREE_MODIFIED:
                            slaveTx.merge(LogicalDatastoreType.OPERATIONAL, path, rootNode.getDataAfter());
                            break;
                        case DELETE:
                            slaveTx.delete(LogicalDatastoreType.OPERATIONAL, path);
                            break;
                        default:
                            break;
                    }
                }

                slaveTx.commit();
            });

        DOMMountPoint slaveMountPoint = awaitMountPoint(slaveMountPointService);

        final NetconfTopologyContext slaveNetconfTopologyContext =
                slaveNetconfTopologyContextFuture.get(5, TimeUnit.SECONDS);
        verify(slaveNetconfTopologyContext, never()).newMasterSalFacade();

        LOG.info("****** Testing slave DOMDataBroker operations");

        testDOMDataBrokerOperations(getDOMDataBroker(slaveMountPoint));

        LOG.info("****** Testing slave DOMRpcService");

        testDOMRpcService(getDOMRpcService(slaveMountPoint));
    }

    private MasterSalFacade testMasterNodeUpdated() throws InterruptedException, ExecutionException, TimeoutException {
        LOG.info("****** Testing update master node");

        masterMountPointService.registerProvisionListener(masterMountPointListener);
        slaveMountPointService.registerProvisionListener(slaveMountPointListener);

        masterSalFacadeFuture = SettableFuture.create();
        writeNetconfNode(TEST_DEFAULT_SUBDIR, masterDataBroker);

        verify(masterMountPointListener, timeout(5000)).onMountPointRemoved(yangNodeInstanceId);

        MasterSalFacade masterSalFacade = masterSalFacadeFuture.get(5, TimeUnit.SECONDS);
        final ArrayList<String> capabilities = Lists.newArrayList(
            NetconfMessageTransformUtil.NETCONF_CANDIDATE_URI.toString());

        masterSalFacade.onDeviceConnected(new EmptyMountPointContext(deviceSchemaContext),
                NetconfSessionPreferences.fromStrings(capabilities), deviceRpcService.getRpcService());

        verify(masterMountPointListener, timeout(5000)).onMountPointCreated(yangNodeInstanceId);

        verify(slaveMountPointListener, timeout(5000)).onMountPointRemoved(yangNodeInstanceId);
        verify(slaveMountPointListener, timeout(5000)).onMountPointCreated(yangNodeInstanceId);

        return masterSalFacade;
    }

    private void testMasterDisconnected(final MasterSalFacade masterSalFacade)
            throws InterruptedException, ExecutionException, TimeoutException {
        LOG.info("****** Testing master disconnected");

        masterSalFacade.onDeviceDisconnected();

        awaitMountPointNotPresent(masterMountPointService);

        await().atMost(5, TimeUnit.SECONDS).until(() -> {
            try (ReadTransaction readTx = masterDataBroker.newReadOnlyTransaction()) {
                Optional<Node> node = readTx.read(LogicalDatastoreType.OPERATIONAL,
                        NODE_INSTANCE_ID).get(5, TimeUnit.SECONDS);
                assertTrue(node.isPresent());
                final NetconfNode netconfNode = node.get().augmentation(NetconfNode.class);
                return netconfNode.getConnectionStatus() != NetconfNodeConnectionStatus.ConnectionStatus.Connected;
            }
        });

        awaitMountPointNotPresent(slaveMountPointService);
    }

    private void testCleanup() throws Exception {
        LOG.info("****** Testing cleanup");

        slaveNetconfTopologyManager.close();
        verify(mockSlaveClusterSingletonServiceReg).close();
    }

    private void testDOMRpcService(final DOMRpcService domRpcService)
            throws InterruptedException, ExecutionException, TimeoutException {
        testPutTopRpc(domRpcService, new DefaultDOMRpcResult((NormalizedNode)null));
        testPutTopRpc(domRpcService, null);
        testPutTopRpc(domRpcService, new DefaultDOMRpcResult(ImmutableList.of(
                RpcResultBuilder.newError(ErrorType.APPLICATION, new ErrorTag("tag1"), "error1"),
                RpcResultBuilder.newError(ErrorType.APPLICATION, new ErrorTag("tag2"), "error2"))));

        testGetTopRpc(domRpcService, new DefaultDOMRpcResult(bindingToNormalized.toNormalizedNodeRpcData(
                new GetTopOutputBuilder().setTopLevelList(oneTopLevelList()).build())));

        testFailedRpc(domRpcService, getTopRpcSchemaPath, getTopInput);
    }

    private void testPutTopRpc(final DOMRpcService domRpcService, final DOMRpcResult result)
            throws InterruptedException, ExecutionException, TimeoutException {
        ContainerNode putTopInput = bindingToNormalized.toNormalizedNodeRpcData(
                new PutTopInputBuilder().setTopLevelList(oneTopLevelList()).build());
        testRpc(domRpcService, putTopRpcSchemaPath, putTopInput, result);
    }

    private static Map<TopLevelListKey, TopLevelList> oneTopLevelList() {
        final TopLevelListKey key = new TopLevelListKey("one");
        return ImmutableMap.of(key, new TopLevelListBuilder().withKey(key).build());
    }

    private void testGetTopRpc(final DOMRpcService domRpcService, final DOMRpcResult result)
            throws InterruptedException, ExecutionException, TimeoutException {
        testRpc(domRpcService, getTopRpcSchemaPath, getTopInput, result);
    }

    private void testRpc(final DOMRpcService domRpcService, final QName qname, final NormalizedNode input,
            final DOMRpcResult result) throws InterruptedException, ExecutionException, TimeoutException {
        final FluentFuture<DOMRpcResult> future = result == null ? FluentFutures.immediateNullFluentFuture()
                : FluentFutures.immediateFluentFuture(result);
        final DOMRpcResult actual = invokeRpc(domRpcService, qname, input, future);
        if (result == null) {
            assertNull(actual);
            return;
        }

        assertNotNull(actual);
        assertEquals(result.getResult(), actual.getResult());

        assertEquals(result.getErrors().size(), actual.getErrors().size());
        Iterator<? extends RpcError> iter1 = result.getErrors().iterator();
        Iterator<? extends RpcError> iter2 = actual.getErrors().iterator();
        while (iter1.hasNext() && iter2.hasNext()) {
            RpcError err1 = iter1.next();
            RpcError err2 = iter2.next();
            assertEquals(err1.getErrorType(), err2.getErrorType());
            assertEquals(err1.getTag(), err2.getTag());
            assertEquals(err1.getMessage(), err2.getMessage());
            assertEquals(err1.getSeverity(), err2.getSeverity());
            assertEquals(err1.getApplicationTag(), err2.getApplicationTag());
            assertEquals(err1.getInfo(), err2.getInfo());
        }
    }

    private void testFailedRpc(final DOMRpcService domRpcService, final QName qname, final NormalizedNode input)
            throws InterruptedException, TimeoutException {
        try {
            invokeRpc(domRpcService, qname, input, FluentFutures.immediateFailedFluentFuture(
                    new ClusteringRpcException("mock")));
            fail("Expected exception");
        } catch (ExecutionException e) {
            assertTrue(e.getCause() instanceof ClusteringRpcException);
            assertEquals("mock", e.getCause().getMessage());
        }
    }

    private DOMRpcResult invokeRpc(final DOMRpcService domRpcService, final QName qname, final NormalizedNode input,
            final FluentFuture<DOMRpcResult> returnFuture)
                throws InterruptedException, ExecutionException, TimeoutException {
        topRpcImplementation.init(returnFuture);
        final ListenableFuture<? extends DOMRpcResult> resultFuture = domRpcService.invokeRpc(qname, input);

        topRpcImplementation.verify(DOMRpcIdentifier.create(qname), input);

        return resultFuture.get(5, TimeUnit.SECONDS);
    }

    private static void testDOMDataBrokerOperations(final DOMDataBroker dataBroker)
            throws InterruptedException, ExecutionException, TimeoutException {

        DOMDataTreeWriteTransaction writeTx = dataBroker.newWriteOnlyTransaction();

        final ContainerNode topNode = Builders.containerBuilder()
                .withNodeIdentifier(new YangInstanceIdentifier.NodeIdentifier(Top.QNAME)).build();
        final YangInstanceIdentifier topPath = YangInstanceIdentifier.of(Top.QNAME);
        writeTx.put(LogicalDatastoreType.CONFIGURATION, topPath, topNode);

        final QName name = QName.create(TopLevelList.QNAME, "name");
        final YangInstanceIdentifier listPath = YangInstanceIdentifier.builder(topPath)
                .node(TopLevelList.QNAME).build();
        final MapEntryNode listEntryNode = ImmutableNodes.mapEntry(TopLevelList.QNAME, name, "one");
        final MapNode listNode = ImmutableNodes.mapNodeBuilder(TopLevelList.QNAME).addChild(listEntryNode).build();
        writeTx.merge(LogicalDatastoreType.CONFIGURATION, listPath, listNode);
        writeTx.commit().get(5, TimeUnit.SECONDS);

        verifyDataInStore(dataBroker.newReadWriteTransaction(), YangInstanceIdentifier.builder(listPath)
                .nodeWithKey(TopLevelList.QNAME, name, "one").build(), listEntryNode);

        writeTx = dataBroker.newWriteOnlyTransaction();
        writeTx.delete(LogicalDatastoreType.CONFIGURATION, topPath);
        writeTx.commit().get(5, TimeUnit.SECONDS);

        DOMDataTreeReadWriteTransaction readTx = dataBroker.newReadWriteTransaction();
        assertFalse(readTx.exists(LogicalDatastoreType.CONFIGURATION, topPath).get(5, TimeUnit.SECONDS));
        assertTrue(readTx.cancel());
    }

    private static void writeNetconfNode(final String cacheDir, final DataBroker databroker)
            throws InterruptedException, ExecutionException, TimeoutException {
        final Node node = new NodeBuilder()
                .withKey(NODE_INSTANCE_ID.getKey())
                .addAugmentation(new NetconfNodeBuilder()
                    .setHost(new Host(new IpAddress(new Ipv4Address("127.0.0.1"))))
                    .setPort(new PortNumber(Uint16.valueOf(1234)))
                    .setActorResponseWaitTime(Uint16.valueOf(10))
                    .setTcpOnly(Boolean.TRUE)
                    .setSchemaless(Boolean.FALSE)
                    .setKeepaliveDelay(Uint32.ZERO)
                    .setConnectionTimeoutMillis(Uint32.valueOf(5000))
                    .setDefaultRequestTimeoutMillis(Uint32.valueOf(5000))
                    .setMaxConnectionAttempts(Uint32.ONE)
                    .setCredentials(new LoginPwUnencryptedBuilder()
                        .setLoginPasswordUnencrypted(new LoginPasswordUnencryptedBuilder()
                            .setUsername("user")
                            .setPassword("pass")
                            .build())
                        .build())
                    .setSchemaCacheDirectory(cacheDir)
                    .build())
                .build();

        final WriteTransaction writeTx = databroker.newWriteOnlyTransaction();
        writeTx.put(LogicalDatastoreType.CONFIGURATION, NODE_INSTANCE_ID, node);
        writeTx.commit().get(5, TimeUnit.SECONDS);
    }

    private static void verifyDataInStore(final DOMDataTreeReadOperations readTx, final YangInstanceIdentifier path,
            final NormalizedNode expNode) throws InterruptedException, ExecutionException, TimeoutException {
        final Optional<NormalizedNode> read = readTx.read(LogicalDatastoreType.CONFIGURATION, path)
                .get(5, TimeUnit.SECONDS);
        assertTrue(read.isPresent());
        assertEquals(expNode, read.get());

        final Boolean exists = readTx.exists(LogicalDatastoreType.CONFIGURATION, path).get(5, TimeUnit.SECONDS);
        assertTrue(exists);
    }

    private static void verifyTopologyNodesCreated(final DataBroker dataBroker) {
        await().atMost(5, TimeUnit.SECONDS).until(() -> {
            try (ReadTransaction readTx = dataBroker.newReadOnlyTransaction()) {
                Optional<Topology> configTopology = readTx.read(LogicalDatastoreType.CONFIGURATION,
                        NetconfTopologyUtils.createTopologyListPath(TOPOLOGY_ID)).get(3, TimeUnit.SECONDS);
                Optional<Topology> operTopology = readTx.read(LogicalDatastoreType.OPERATIONAL,
                        NetconfTopologyUtils.createTopologyListPath(TOPOLOGY_ID)).get(3, TimeUnit.SECONDS);
                return configTopology.isPresent() && operTopology.isPresent();
            }
        });
    }

    private AbstractConcurrentDataBrokerTest newDataBrokerTest() throws Exception {
        AbstractConcurrentDataBrokerTest dataBrokerTest = new AbstractConcurrentDataBrokerTest(true) {
            @Override
            protected Set<YangModuleInfo> getModuleInfos() throws Exception {
                return ImmutableSet.of(BindingReflections.getModuleInfo(NetconfNode.class),
                        BindingReflections.getModuleInfo(NetworkTopology.class),
                        BindingReflections.getModuleInfo(Topology.class),
                        BindingReflections.getModuleInfo(Keystore.class),
                        topModuleInfo);
            }
        };

        dataBrokerTest.setup();
        return dataBrokerTest;
    }

    private void awaitMountPointNotPresent(final DOMMountPointService mountPointService) {
        await().atMost(5, TimeUnit.SECONDS).until(
            () -> mountPointService.getMountPoint(yangNodeInstanceId).isEmpty());
    }

    private static DOMDataBroker getDOMDataBroker(final DOMMountPoint mountPoint) {
        return getMountPointService(mountPoint, DOMDataBroker.class);
    }

    private static DOMRpcService getDOMRpcService(final DOMMountPoint mountPoint) {
        return getMountPointService(mountPoint, DOMRpcService.class);
    }

    private static DOMActionService getDomActionService(final DOMMountPoint mountPoint) {
        return getMountPointService(mountPoint, DOMActionService.class);
    }

    private static <T extends DOMService> T getMountPointService(final DOMMountPoint mountPoint,
            final Class<T> serviceClass) {
        final Optional<T> maybeService = mountPoint.getService(serviceClass);
        assertTrue(maybeService.isPresent());
        return maybeService.get();
    }

    private DOMMountPoint awaitMountPoint(final DOMMountPointService mountPointService) {
        await().atMost(5, TimeUnit.SECONDS).until(() ->
                mountPointService.getMountPoint(yangNodeInstanceId).isPresent());

        return mountPointService.getMountPoint(yangNodeInstanceId).get();
    }

    private RpcDefinition findRpcDefinition(final String rpc) {
        Module topModule = deviceSchemaContext.findModule(TOP_MODULE_NAME, topModuleInfo.getName().getRevision()).get();
        RpcDefinition rpcDefinition = null;
        for (RpcDefinition def: topModule.getRpcs()) {
            if (def.getQName().getLocalName().equals(rpc)) {
                rpcDefinition = def;
                break;
            }
        }

        assertNotNull(rpc + " rpc not found in " + topModule.getRpcs(), rpcDefinition);
        return rpcDefinition;
    }

    private static class TopDOMRpcImplementation implements DOMRpcImplementation {
        private volatile SettableFuture<Entry<DOMRpcIdentifier, NormalizedNode>> rpcInvokedFuture;
        private volatile FluentFuture<DOMRpcResult> returnFuture;

        @Override
        public FluentFuture<DOMRpcResult> invokeRpc(final DOMRpcIdentifier rpc, final NormalizedNode input) {
            rpcInvokedFuture.set(new SimpleEntry<>(rpc, input));
            return returnFuture;
        }

        void init(final FluentFuture<DOMRpcResult> retFuture) {
            returnFuture = retFuture;
            rpcInvokedFuture = SettableFuture.create();
        }

        void verify(final DOMRpcIdentifier expRpc, final NormalizedNode expInput)
                throws InterruptedException, ExecutionException, TimeoutException {
            final Entry<DOMRpcIdentifier, NormalizedNode> actual = rpcInvokedFuture.get(5, TimeUnit.SECONDS);
            assertEquals(expRpc, actual.getKey());
            assertEquals(expInput, actual.getValue());
        }
    }
}
