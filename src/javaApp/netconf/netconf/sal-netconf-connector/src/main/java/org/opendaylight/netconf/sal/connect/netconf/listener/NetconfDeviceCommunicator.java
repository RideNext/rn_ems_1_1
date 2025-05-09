/*
 * Copyright (c) 2014 Cisco Systems, Inc. and others.  All rights reserved.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v1.0 which accompanies this distribution,
 * and is available at http://www.eclipse.org/legal/epl-v10.html
 */
package org.opendaylight.netconf.sal.connect.netconf.listener;

import com.google.common.base.Strings;
import com.google.common.util.concurrent.ListenableFuture;
import com.google.common.util.concurrent.SettableFuture;
import io.netty.util.concurrent.Future;
import java.io.EOFException;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import java.util.Queue;
import java.util.concurrent.Semaphore;
import java.util.concurrent.atomic.AtomicIntegerFieldUpdater;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;
import org.opendaylight.netconf.api.FailedNetconfMessage;
import org.opendaylight.netconf.api.NetconfDocumentedException;
import org.opendaylight.netconf.api.NetconfMessage;
import org.opendaylight.netconf.api.NetconfTerminationReason;
import org.opendaylight.netconf.api.xml.XmlElement;
import org.opendaylight.netconf.api.xml.XmlNetconfConstants;
import org.opendaylight.netconf.api.xml.XmlUtil;
import org.opendaylight.netconf.client.NetconfClientDispatcher;
import org.opendaylight.netconf.client.NetconfClientSession;
import org.opendaylight.netconf.client.NetconfClientSessionListener;
import org.opendaylight.netconf.client.conf.NetconfClientConfiguration;
import org.opendaylight.netconf.client.conf.NetconfReconnectingClientConfiguration;
import org.opendaylight.netconf.sal.connect.api.RemoteDevice;
import org.opendaylight.netconf.sal.connect.api.RemoteDeviceCommunicator;
import org.opendaylight.netconf.sal.connect.netconf.util.NetconfMessageTransformUtil;
import org.opendaylight.netconf.sal.connect.util.RemoteDeviceId;
import org.opendaylight.yangtools.util.concurrent.FluentFutures;
import org.opendaylight.yangtools.yang.common.ErrorTag;
import org.opendaylight.yangtools.yang.common.ErrorType;
import org.opendaylight.yangtools.yang.common.QName;
import org.opendaylight.yangtools.yang.common.RpcResult;
import org.opendaylight.yangtools.yang.common.RpcResultBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class NetconfDeviceCommunicator
        implements NetconfClientSessionListener, RemoteDeviceCommunicator<NetconfMessage> {

    private static final Logger LOG = LoggerFactory.getLogger(NetconfDeviceCommunicator.class);

    protected final RemoteDevice<NetconfSessionPreferences, NetconfMessage, NetconfDeviceCommunicator> remoteDevice;
    private final Optional<UserPreferences> overrideNetconfCapabilities;
    protected final RemoteDeviceId id;
    private final Lock sessionLock = new ReentrantLock();

    private final Semaphore semaphore;
    private final int concurentRpcMsgs;

    private final Queue<Request> requests = new ArrayDeque<>();
    private NetconfClientSession currentSession;

    private final SettableFuture<NetconfDeviceCapabilities> firstConnectionFuture;
    private Future<?> taskFuture;

    // isSessionClosing indicates a close operation on the session is issued and
    // tearDown will surely be called later to finish the close.
    // Used to allow only one thread to enter tearDown and other threads should
    // NOT enter it simultaneously and should end its close operation without
    // calling tearDown to release the locks they hold to avoid deadlock.
    private static final AtomicIntegerFieldUpdater<NetconfDeviceCommunicator> CLOSING_UPDATER =
            AtomicIntegerFieldUpdater.newUpdater(NetconfDeviceCommunicator.class, "closing");
    private volatile int closing;

    public boolean isSessionClosing() {
        return closing != 0;
    }

    public NetconfDeviceCommunicator(
            final RemoteDeviceId id,
            final RemoteDevice<NetconfSessionPreferences, NetconfMessage, NetconfDeviceCommunicator> remoteDevice,
            final UserPreferences netconfSessionPreferences, final int rpcMessageLimit) {
        this(id, remoteDevice, Optional.of(netconfSessionPreferences), rpcMessageLimit);
    }

    public NetconfDeviceCommunicator(
            final RemoteDeviceId id,
            final RemoteDevice<NetconfSessionPreferences, NetconfMessage, NetconfDeviceCommunicator> remoteDevice,
            final int rpcMessageLimit) {
        this(id, remoteDevice, Optional.empty(), rpcMessageLimit);
    }

    private NetconfDeviceCommunicator(
            final RemoteDeviceId id,
            final RemoteDevice<NetconfSessionPreferences, NetconfMessage, NetconfDeviceCommunicator> remoteDevice,
            final Optional<UserPreferences> overrideNetconfCapabilities, final int rpcMessageLimit) {
        concurentRpcMsgs = rpcMessageLimit;
        this.id = id;
        this.remoteDevice = remoteDevice;
        this.overrideNetconfCapabilities = overrideNetconfCapabilities;
        firstConnectionFuture = SettableFuture.create();
        semaphore = rpcMessageLimit > 0 ? new Semaphore(rpcMessageLimit) : null;
    }

    @Override
    public void onSessionUp(final NetconfClientSession session) {
        sessionLock.lock();
        try {
            LOG.debug("{}: Session established", id);
            currentSession = session;

            NetconfSessionPreferences netconfSessionPreferences =
                                             NetconfSessionPreferences.fromNetconfSession(session);
            LOG.trace("{}: Session advertised capabilities: {}", id,
                    netconfSessionPreferences);

            if (overrideNetconfCapabilities.isPresent()) {
                final NetconfSessionPreferences sessionPreferences = overrideNetconfCapabilities
                        .get().getSessionPreferences();
                netconfSessionPreferences = overrideNetconfCapabilities.get().moduleBasedCapsOverrided()
                        ? netconfSessionPreferences.replaceModuleCaps(sessionPreferences)
                        : netconfSessionPreferences.addModuleCaps(sessionPreferences);

                netconfSessionPreferences = overrideNetconfCapabilities.get().nonModuleBasedCapsOverrided()
                        ? netconfSessionPreferences.replaceNonModuleCaps(sessionPreferences)
                        : netconfSessionPreferences.addNonModuleCaps(sessionPreferences);
                LOG.debug("{}: Session capabilities overridden, capabilities that will be used: {}", id,
                        netconfSessionPreferences);
            }

            remoteDevice.onRemoteSessionUp(netconfSessionPreferences, this);
            if (!firstConnectionFuture.isDone()) {
                firstConnectionFuture.set(netconfSessionPreferences.getNetconfDeviceCapabilities());
            }
        } finally {
            sessionLock.unlock();
        }
    }

    /**
     * Initialize remote connection.
     *
     * @param dispatcher {@code NetconfCLientDispatcher}
     * @param config     {@code NetconfClientConfiguration}
     * @return a ListenableFuture that returns success on first successful connection and failure when the underlying
     *         reconnecting strategy runs out of reconnection attempts
     */
    public ListenableFuture<NetconfDeviceCapabilities> initializeRemoteConnection(
            final NetconfClientDispatcher dispatcher, final NetconfClientConfiguration config) {

        final Future<?> connectFuture;
        if (config instanceof NetconfReconnectingClientConfiguration) {
            // FIXME: This is weird. If I understand it correctly we want to know about the first connection so as to
            //        forward error state. Analyze the call graph to understand what is going on here. We really want
            //        to move reconnection away from the socket layer, so that it can properly interface with sessions
            //        and generally has some event-driven state (as all good network glue does). There is a second story
            //        which is we want to avoid duplicate code, so it depends on other users as well.
            final var future = dispatcher.createReconnectingClient((NetconfReconnectingClientConfiguration) config);
            taskFuture = future;
            connectFuture = future.firstSessionFuture();
        } else {
            taskFuture = connectFuture = dispatcher.createClient(config);
        }

        connectFuture.addListener(future -> {
            if (!future.isSuccess() && !future.isCancelled()) {
                LOG.debug("{}: Connection failed", id, future.cause());
                remoteDevice.onRemoteSessionFailed(future.cause());
                if (!firstConnectionFuture.isDone()) {
                    firstConnectionFuture.setException(future.cause());
                }
            }
        });
        return firstConnectionFuture;
    }

    public void disconnect() {
        // If session is already in closing, no need to close it again
        if (currentSession != null && startClosing() && currentSession.isUp()) {
            currentSession.close();
        }
    }

    private void tearDown(final String reason) {
        if (!isSessionClosing()) {
            LOG.warn("It's curious that no one to close the session but tearDown is called!");
        }
        LOG.debug("Tearing down {}", reason);
        final List<UncancellableFuture<RpcResult<NetconfMessage>>> futuresToCancel = new ArrayList<>();
        sessionLock.lock();
        try {
            if (currentSession != null) {
                currentSession = null;
                /*
                 * Walk all requests, check if they have been executing
                 * or cancelled and remove them from the queue.
                 */
                final Iterator<Request> it = requests.iterator();
                while (it.hasNext()) {
                    final Request r = it.next();
                    if (r.future.isUncancellable()) {
                        futuresToCancel.add(r.future);
                        it.remove();
                    } else if (r.future.isCancelled()) {
                        // This just does some house-cleaning
                        it.remove();
                    }
                }

                remoteDevice.onRemoteSessionDown();
            }
        } finally {
            sessionLock.unlock();
        }

        // Notify pending request futures outside of the sessionLock to avoid unnecessarily
        // blocking the caller.
        for (final UncancellableFuture<RpcResult<NetconfMessage>> future : futuresToCancel) {
            if (Strings.isNullOrEmpty(reason)) {
                future.set(createSessionDownRpcResult());
            } else {
                future.set(createErrorRpcResult(ErrorType.TRANSPORT, reason));
            }
        }

        closing = 0;
    }

    private RpcResult<NetconfMessage> createSessionDownRpcResult() {
        return createErrorRpcResult(ErrorType.TRANSPORT,
                String.format("The netconf session to %1$s is disconnected", id.getName()));
    }

    private static RpcResult<NetconfMessage> createErrorRpcResult(final ErrorType errorType, final String message) {
        return RpcResultBuilder.<NetconfMessage>failed()
            .withError(errorType, ErrorTag.OPERATION_FAILED, message).build();
    }

    @Override
    public void onSessionDown(final NetconfClientSession session, final Exception exception) {
        // If session is already in closing, no need to call tearDown again.
        if (startClosing()) {
            if (exception instanceof EOFException) {
                LOG.info("{}: Session went down: {}", id, exception.getMessage());
            } else {
                LOG.warn("{}: Session went down", id, exception);
            }
            tearDown(null);
        }
    }

    @Override
    public void onSessionTerminated(final NetconfClientSession session, final NetconfTerminationReason reason) {
        // onSessionTerminated is called directly by disconnect, no need to compare and set isSessionClosing.
        LOG.warn("{}: Session terminated {}", id, reason);
        tearDown(reason.getErrorMessage());
    }

    @Override
    public void close() {
        // Cancel reconnect if in progress
        if (taskFuture != null) {
            taskFuture.cancel(false);
        }
        // Disconnect from device
        // tear down not necessary, called indirectly by the close in disconnect()
        disconnect();
    }

    @Override
    public void onMessage(final NetconfClientSession session, final NetconfMessage message) {
        /*
         * Dispatch between notifications and messages. Messages need to be processed
         * with lock held, notifications do not.
         */
        if (isNotification(message)) {
            processNotification(message);
        } else {
            processMessage(message);
        }
    }

    private void processMessage(final NetconfMessage message) {
        Request request = null;
        sessionLock.lock();

        try {
            request = requests.peek();
            if (request != null && request.future.isUncancellable()) {
                request = requests.poll();
                // we have just removed one request from the queue
                // we can also release one permit
                if (semaphore != null) {
                    semaphore.release();
                }
            } else {
                request = null;
                LOG.warn("{}: Ignoring unsolicited message {}", id,
                        msgToS(message));
            }
        } finally {
            sessionLock.unlock();
        }

        if (request == null) {
            // No matching request, bail out
            return;
        }


        if (message instanceof FailedNetconfMessage) {
            request.future.set(NetconfMessageTransformUtil.toRpcResult((FailedNetconfMessage) message));
            return;
        }

        LOG.debug("{}: Message received {}", id, message);

        if (LOG.isTraceEnabled()) {
            LOG.trace("{}: Matched request: {} to response: {}", id, msgToS(request.request), msgToS(message));
        }

        try {
            NetconfMessageTransformUtil.checkValidReply(request.request, message);
        } catch (final NetconfDocumentedException e) {
            LOG.warn("{}: Invalid request-reply match, reply message contains different message-id, "
                + "request: {}, response: {}", id, msgToS(request.request), msgToS(message), e);

            request.future.set(RpcResultBuilder.<NetconfMessage>failed()
                .withRpcError(NetconfMessageTransformUtil.toRpcError(e))
                .build());

            //recursively processing message to eventually find matching request
            processMessage(message);
            return;
        }

        try {
            NetconfMessageTransformUtil.checkSuccessReply(message);
        } catch (final NetconfDocumentedException e) {
            LOG.warn("{}: Error reply from remote device, request: {}, response: {}",
                id, msgToS(request.request), msgToS(message), e);

            request.future.set(RpcResultBuilder.<NetconfMessage>failed()
                .withRpcError(NetconfMessageTransformUtil.toRpcError(e))
                .build());
            return;
        }

        request.future.set(RpcResultBuilder.success(message).build());
    }

    private static String msgToS(final NetconfMessage msg) {
        return XmlUtil.toString(msg.getDocument());
    }

    @Override
    public ListenableFuture<RpcResult<NetconfMessage>> sendRequest(final NetconfMessage message, final QName rpc) {
        sessionLock.lock();
        try {
            if (semaphore != null && !semaphore.tryAcquire()) {
                LOG.warn("Limit of concurrent rpc messages was reached (limit: {}). Rpc reply message is needed. "
                    + "Discarding request of Netconf device with id: {}", concurentRpcMsgs, id.getName());
                return FluentFutures.immediateFailedFluentFuture(new NetconfDocumentedException(
                        "Limit of rpc messages was reached (Limit :" + concurentRpcMsgs
                        + ") waiting for emptying the queue of Netconf device with id: " + id.getName()));
            }

            return sendRequestWithLock(message, rpc);
        } finally {
            sessionLock.unlock();
        }
    }

    private ListenableFuture<RpcResult<NetconfMessage>> sendRequestWithLock(final NetconfMessage message,
                                                                            final QName rpc) {
        if (LOG.isTraceEnabled()) {
            LOG.trace("{}: Sending message {}", id, msgToS(message));
        }

        if (currentSession == null) {
            LOG.warn("{}: Session is disconnected, failing RPC request {}",
                    id, message);
            return FluentFutures.immediateFluentFuture(createSessionDownRpcResult());
        }

        final Request req = new Request(new UncancellableFuture<>(true), message);
        requests.add(req);

        currentSession.sendMessage(req.request).addListener(future -> {
            if (!future.isSuccess()) {
                // We expect that a session down will occur at this point
                LOG.debug("{}: Failed to send request {}", id,
                        XmlUtil.toString(req.request.getDocument()),
                        future.cause());

                if (future.cause() != null) {
                    req.future.set(createErrorRpcResult(ErrorType.TRANSPORT, future.cause().getLocalizedMessage()));
                } else {
                    req.future.set(createSessionDownRpcResult()); // assume session is down
                }
                req.future.setException(future.cause());
            } else {
                LOG.trace("Finished sending request {}", req.request);
            }
        });

        return req.future;
    }

    private void processNotification(final NetconfMessage notification) {
        if (LOG.isTraceEnabled()) {
            LOG.trace("{}: Notification received: {}", id, notification);
        }

        remoteDevice.onNotification(notification);
    }

    private static boolean isNotification(final NetconfMessage message) {
        if (message.getDocument() == null) {
            // We have no message, which mean we have a FailedNetconfMessage
            return false;
        }
        final XmlElement xmle = XmlElement.fromDomDocument(message.getDocument());
        return XmlNetconfConstants.NOTIFICATION_ELEMENT_NAME.equals(xmle.getName()) ;
    }

    private static final class Request {
        final UncancellableFuture<RpcResult<NetconfMessage>> future;
        final NetconfMessage request;

        private Request(final UncancellableFuture<RpcResult<NetconfMessage>> future,
                        final NetconfMessage request) {
            this.future = future;
            this.request = request;
        }
    }

    private boolean startClosing() {
        return CLOSING_UPDATER.compareAndSet(this, 0, 1);
    }
}
