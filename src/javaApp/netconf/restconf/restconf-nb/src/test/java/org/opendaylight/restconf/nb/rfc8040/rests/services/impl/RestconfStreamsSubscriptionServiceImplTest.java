/*
 * Copyright (c) 2016 Cisco Systems, Inc. and others.  All rights reserved.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v1.0 which accompanies this distribution,
 * and is available at http://www.eclipse.org/legal/epl-v10.html
 */
package org.opendaylight.restconf.nb.rfc8040.rests.services.impl;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.mock;

import com.google.common.collect.ImmutableClassToInstanceMap;
import java.io.FileNotFoundException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Map;
import javax.ws.rs.core.MultivaluedHashMap;
import javax.ws.rs.core.UriInfo;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.opendaylight.mdsal.common.api.CommitInfo;
import org.opendaylight.mdsal.dom.api.DOMDataBroker;
import org.opendaylight.mdsal.dom.api.DOMDataTreeChangeService;
import org.opendaylight.mdsal.dom.api.DOMDataTreeWriteTransaction;
import org.opendaylight.mdsal.dom.api.DOMNotificationService;
import org.opendaylight.mdsal.dom.api.DOMSchemaService;
import org.opendaylight.restconf.common.errors.RestconfDocumentedException;
import org.opendaylight.restconf.nb.rfc8040.TestRestconfUtils;
import org.opendaylight.restconf.nb.rfc8040.handlers.SchemaContextHandler;
import org.opendaylight.restconf.nb.rfc8040.legacy.NormalizedNodePayload;
import org.opendaylight.restconf.nb.rfc8040.streams.Configuration;
import org.opendaylight.restconf.nb.rfc8040.streams.listeners.ListenerAdapter;
import org.opendaylight.restconf.nb.rfc8040.streams.listeners.ListenersBroker;
import org.opendaylight.restconf.nb.rfc8040.utils.RestconfConstants;
import org.opendaylight.restconf.nb.rfc8040.utils.parser.IdentifierCodec;
import org.opendaylight.yang.gen.v1.urn.sal.restconf.event.subscription.rev140708.NotificationOutputTypeGrouping.NotificationOutputType;
import org.opendaylight.yangtools.concepts.ListenerRegistration;
import org.opendaylight.yangtools.yang.common.ErrorTag;
import org.opendaylight.yangtools.yang.common.ErrorType;
import org.opendaylight.yangtools.yang.common.QName;
import org.opendaylight.yangtools.yang.data.api.YangInstanceIdentifier;
import org.opendaylight.yangtools.yang.data.api.YangInstanceIdentifier.NodeIdentifier;
import org.opendaylight.yangtools.yang.test.util.YangParserTestUtils;

@RunWith(MockitoJUnitRunner.StrictStubs.class)
public class RestconfStreamsSubscriptionServiceImplTest {

    private static final String URI = "/rests/data/ietf-restconf-monitoring:restconf-state/streams/stream/"
            + "toaster:toaster/toasterStatus/datastore=OPERATIONAL/scope=ONE";

    @Mock
    private DOMDataBroker dataBroker;
    @Mock
    private UriInfo uriInfo;
    @Mock
    private DOMNotificationService notificationService;

    private Configuration configurationWs;
    private Configuration configurationSse;

    private SchemaContextHandler schemaHandler;

    @Before
    public void setUp() throws FileNotFoundException, URISyntaxException {
        final DOMDataTreeWriteTransaction wTx = mock(DOMDataTreeWriteTransaction.class);
        doReturn(wTx).when(dataBroker).newWriteOnlyTransaction();
        doReturn(CommitInfo.emptyFluentFuture()).when(wTx).commit();

        schemaHandler = new SchemaContextHandler(dataBroker, mock(DOMSchemaService.class));

        DOMDataTreeChangeService dataTreeChangeService = mock(DOMDataTreeChangeService.class);
        doReturn(mock(ListenerRegistration.class)).when(dataTreeChangeService)
                .registerDataTreeChangeListener(any(), any());

        doReturn(ImmutableClassToInstanceMap.of(DOMDataTreeChangeService.class, dataTreeChangeService))
                .when(dataBroker).getExtensions();

        doReturn(new MultivaluedHashMap<>()).when(uriInfo).getQueryParameters();
        // FIXME: just mock UriInfo here
        doReturn(new LocalUriInfo().getBaseUriBuilder()).when(uriInfo).getBaseUriBuilder();
        doReturn(new URI("http://127.0.0.1/" + URI)).when(uriInfo).getAbsolutePath();
        schemaHandler.onModelContextUpdated(
            YangParserTestUtils.parseYangFiles(TestRestconfUtils.loadFiles("/notifications")));
        configurationWs = new Configuration(0, 100, 10, false);
        configurationSse = new Configuration(0, 100, 10, true);
    }

    @BeforeClass
    public static void setUpBeforeTest() {
        final String name =
            "data-change-event-subscription/toaster:toaster/toasterStatus/datastore=OPERATIONAL/scope=ONE";
        final ListenerAdapter adapter = new ListenerAdapter(YangInstanceIdentifier.create(new NodeIdentifier(
            QName.create("http://netconfcentral.org/ns/toaster", "2009-11-20", "toaster"))),
            name, NotificationOutputType.JSON);
        ListenersBroker.getInstance().setDataChangeListeners(Map.of(name, adapter));
    }

    @AfterClass
    public static void setUpAfterTest() {
        ListenersBroker.getInstance().setDataChangeListeners(Map.of());
    }

    @Test
    public void testSubscribeToStreamSSE() {
        ListenersBroker.getInstance().registerDataChangeListener(
                IdentifierCodec.deserialize("toaster:toaster/toasterStatus", schemaHandler.get()),
                "data-change-event-subscription/toaster:toaster/toasterStatus/datastore=OPERATIONAL/scope=ONE",
                NotificationOutputType.XML);
        final RestconfStreamsSubscriptionServiceImpl streamsSubscriptionService =
                new RestconfStreamsSubscriptionServiceImpl(dataBroker, notificationService,
                        schemaHandler, configurationSse);
        final NormalizedNodePayload response = streamsSubscriptionService.subscribeToStream(
            "data-change-event-subscription/toaster:toaster/toasterStatus/datastore=OPERATIONAL/scope=ONE", uriInfo);
        assertEquals("http://localhost:8181/" + RestconfConstants.BASE_URI_PATTERN
                + "/" + RestconfConstants.NOTIF
                + "/data-change-event-subscription/toaster:toaster/toasterStatus/"
                + "datastore=OPERATIONAL/scope=ONE", response.getNewHeaders().get("Location").toString());
    }

    @Test
    public void testSubscribeToStreamWS() {
        ListenersBroker.getInstance().registerDataChangeListener(
                IdentifierCodec.deserialize("toaster:toaster/toasterStatus", schemaHandler.get()),
                "data-change-event-subscription/toaster:toaster/toasterStatus/datastore=OPERATIONAL/scope=ONE",
                NotificationOutputType.XML);
        final RestconfStreamsSubscriptionServiceImpl streamsSubscriptionService =
                new RestconfStreamsSubscriptionServiceImpl(dataBroker, notificationService,
                        schemaHandler, configurationWs);
        final NormalizedNodePayload response = streamsSubscriptionService.subscribeToStream(
            "data-change-event-subscription/toaster:toaster/toasterStatus/datastore=OPERATIONAL/scope=ONE", uriInfo);
        assertEquals("ws://localhost:8181/" + RestconfConstants.BASE_URI_PATTERN
                + "/data-change-event-subscription/toaster:toaster/toasterStatus/"
                + "datastore=OPERATIONAL/scope=ONE", response.getNewHeaders().get("Location").toString());
    }

    @Test
    public void testSubscribeToStreamMissingDatastoreInPath() {
        final RestconfStreamsSubscriptionServiceImpl streamsSubscriptionService =
                new RestconfStreamsSubscriptionServiceImpl(dataBroker, notificationService,
                        schemaHandler, configurationWs);
        final var errors = assertThrows(RestconfDocumentedException.class,
            () -> streamsSubscriptionService.subscribeToStream("toaster:toaster/toasterStatus/scope=ONE", uriInfo))
            .getErrors();
        assertEquals(1, errors.size());
        final var error = errors.get(0);
        assertEquals(ErrorType.APPLICATION, error.getErrorType());
        assertEquals(ErrorTag.OPERATION_FAILED, error.getErrorTag());
        assertEquals("Bad type of notification of sal-remote", error.getErrorMessage());
    }

    @Test
    public void testSubscribeToStreamMissingScopeInPath() {
        final RestconfStreamsSubscriptionServiceImpl streamsSubscriptionService =
                new RestconfStreamsSubscriptionServiceImpl(dataBroker, notificationService,
                        schemaHandler, configurationWs);
        final var errors = assertThrows(RestconfDocumentedException.class,
            () -> streamsSubscriptionService.subscribeToStream("toaster:toaster/toasterStatus/datastore=OPERATIONAL",
                uriInfo)).getErrors();
        assertEquals(1, errors.size());
        final var error = errors.get(0);
        assertEquals(ErrorType.APPLICATION, error.getErrorType());
        assertEquals(ErrorTag.OPERATION_FAILED, error.getErrorTag());
        assertEquals("Bad type of notification of sal-remote", error.getErrorMessage());
    }
}
