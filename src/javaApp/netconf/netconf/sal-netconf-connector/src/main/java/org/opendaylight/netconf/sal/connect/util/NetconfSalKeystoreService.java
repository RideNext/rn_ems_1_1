/*
 * Copyright (c) 2017 Cisco Systems, Inc. and others.  All rights reserved.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v1.0 which accompanies this distribution,
 * and is available at http://www.eclipse.org/legal/epl-v10.html
 */
package org.opendaylight.netconf.sal.connect.util;

import com.google.common.util.concurrent.FutureCallback;
import com.google.common.util.concurrent.ListenableFuture;
import com.google.common.util.concurrent.MoreExecutors;
import com.google.common.util.concurrent.SettableFuture;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;
import org.opendaylight.aaa.encrypt.AAAEncryptionService;
import org.opendaylight.mdsal.binding.api.DataBroker;
import org.opendaylight.mdsal.binding.api.WriteTransaction;
import org.opendaylight.mdsal.common.api.CommitInfo;
import org.opendaylight.mdsal.common.api.LogicalDatastoreType;
import org.opendaylight.yang.gen.v1.urn.opendaylight.netconf.keystore.rev171017.AddKeystoreEntryInput;
import org.opendaylight.yang.gen.v1.urn.opendaylight.netconf.keystore.rev171017.AddKeystoreEntryOutput;
import org.opendaylight.yang.gen.v1.urn.opendaylight.netconf.keystore.rev171017.AddKeystoreEntryOutputBuilder;
import org.opendaylight.yang.gen.v1.urn.opendaylight.netconf.keystore.rev171017.AddPrivateKeyInput;
import org.opendaylight.yang.gen.v1.urn.opendaylight.netconf.keystore.rev171017.AddPrivateKeyOutput;
import org.opendaylight.yang.gen.v1.urn.opendaylight.netconf.keystore.rev171017.AddPrivateKeyOutputBuilder;
import org.opendaylight.yang.gen.v1.urn.opendaylight.netconf.keystore.rev171017.AddTrustedCertificateInput;
import org.opendaylight.yang.gen.v1.urn.opendaylight.netconf.keystore.rev171017.AddTrustedCertificateOutput;
import org.opendaylight.yang.gen.v1.urn.opendaylight.netconf.keystore.rev171017.AddTrustedCertificateOutputBuilder;
import org.opendaylight.yang.gen.v1.urn.opendaylight.netconf.keystore.rev171017.Keystore;
import org.opendaylight.yang.gen.v1.urn.opendaylight.netconf.keystore.rev171017.KeystoreBuilder;
import org.opendaylight.yang.gen.v1.urn.opendaylight.netconf.keystore.rev171017.NetconfKeystoreService;
import org.opendaylight.yang.gen.v1.urn.opendaylight.netconf.keystore.rev171017.RemoveKeystoreEntryInput;
import org.opendaylight.yang.gen.v1.urn.opendaylight.netconf.keystore.rev171017.RemoveKeystoreEntryOutput;
import org.opendaylight.yang.gen.v1.urn.opendaylight.netconf.keystore.rev171017.RemoveKeystoreEntryOutputBuilder;
import org.opendaylight.yang.gen.v1.urn.opendaylight.netconf.keystore.rev171017.RemovePrivateKeyInput;
import org.opendaylight.yang.gen.v1.urn.opendaylight.netconf.keystore.rev171017.RemovePrivateKeyOutput;
import org.opendaylight.yang.gen.v1.urn.opendaylight.netconf.keystore.rev171017.RemovePrivateKeyOutputBuilder;
import org.opendaylight.yang.gen.v1.urn.opendaylight.netconf.keystore.rev171017.RemoveTrustedCertificateInput;
import org.opendaylight.yang.gen.v1.urn.opendaylight.netconf.keystore.rev171017.RemoveTrustedCertificateOutput;
import org.opendaylight.yang.gen.v1.urn.opendaylight.netconf.keystore.rev171017.RemoveTrustedCertificateOutputBuilder;
import org.opendaylight.yang.gen.v1.urn.opendaylight.netconf.keystore.rev171017._private.keys.PrivateKey;
import org.opendaylight.yang.gen.v1.urn.opendaylight.netconf.keystore.rev171017._private.keys.PrivateKeyKey;
import org.opendaylight.yang.gen.v1.urn.opendaylight.netconf.keystore.rev171017.keystore.entry.KeyCredential;
import org.opendaylight.yang.gen.v1.urn.opendaylight.netconf.keystore.rev171017.keystore.entry.KeyCredentialBuilder;
import org.opendaylight.yang.gen.v1.urn.opendaylight.netconf.keystore.rev171017.keystore.entry.KeyCredentialKey;
import org.opendaylight.yang.gen.v1.urn.opendaylight.netconf.keystore.rev171017.trusted.certificates.TrustedCertificate;
import org.opendaylight.yang.gen.v1.urn.opendaylight.netconf.keystore.rev171017.trusted.certificates.TrustedCertificateKey;
import org.opendaylight.yangtools.yang.binding.InstanceIdentifier;
import org.opendaylight.yangtools.yang.common.RpcResult;
import org.opendaylight.yangtools.yang.common.RpcResultBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class NetconfSalKeystoreService implements NetconfKeystoreService {

    private static final Logger LOG = LoggerFactory.getLogger(NetconfSalKeystoreService.class);

    private final DataBroker dataBroker;
    private final AAAEncryptionService encryptionService;

    private final InstanceIdentifier<Keystore> keystoreIid = InstanceIdentifier.create(Keystore.class);

    public NetconfSalKeystoreService(final DataBroker dataBroker,
                                     final AAAEncryptionService encryptionService) {
        LOG.info("Starting NETCONF keystore service.");

        this.dataBroker = dataBroker;
        this.encryptionService = encryptionService;

        initKeystore();
    }

    private void initKeystore() {
        final Keystore keystore = new KeystoreBuilder().build();

        final WriteTransaction writeTransaction = dataBroker.newWriteOnlyTransaction();
        writeTransaction.merge(LogicalDatastoreType.CONFIGURATION, keystoreIid, keystore);

        try {
            writeTransaction.commit().get();
            LOG.debug("init keystore done");
        } catch (InterruptedException | ExecutionException exception) {
            LOG.error("Unable to initialize Netconf key-pair store.", exception);
        }
    }

    @Override
    public ListenableFuture<RpcResult<RemoveKeystoreEntryOutput>> removeKeystoreEntry(
            final RemoveKeystoreEntryInput input) {
        LOG.debug("Removing keypairs: {}", input);

        final WriteTransaction writeTransaction = dataBroker.newWriteOnlyTransaction();

        for (final String id : input.getKeyId()) {
            writeTransaction.delete(LogicalDatastoreType.CONFIGURATION,
                    keystoreIid.child(KeyCredential.class, new KeyCredentialKey(id)));
        }

        final SettableFuture<RpcResult<RemoveKeystoreEntryOutput>> rpcResult = SettableFuture.create();

        writeTransaction.commit().addCallback(new FutureCallback<CommitInfo>() {
            @Override
            public void onSuccess(final CommitInfo result) {
                LOG.debug("remove-key-pair success. Input: {}", input);
                rpcResult.set(RpcResultBuilder.success(new RemoveKeystoreEntryOutputBuilder().build()).build());
            }

            @Override
            public void onFailure(final Throwable throwable) {
                LOG.warn("remove-key-pair failed. Input: {}", input, throwable);
                rpcResult.setException(throwable);
            }
        }, MoreExecutors.directExecutor());

        return rpcResult;
    }

    @Override
    public ListenableFuture<RpcResult<AddKeystoreEntryOutput>> addKeystoreEntry(final AddKeystoreEntryInput input) {
        LOG.debug("Adding keypairs: {}", input);

        final WriteTransaction writeTransaction = dataBroker.newWriteOnlyTransaction();
        final List<KeyCredential> keypairs = input.nonnullKeyCredential().values().stream()
                .map(keypair -> new KeyCredentialBuilder(keypair)
                        .setPrivateKey(encryptionService.encrypt(keypair.getPrivateKey()))
                        .setPassphrase(encryptionService.encrypt(keypair.getPassphrase()))
                        .build())
                .collect(Collectors.toList());

        for (KeyCredential keypair : keypairs) {
            writeTransaction.merge(LogicalDatastoreType.CONFIGURATION,
                    keystoreIid.child(KeyCredential.class, keypair.key()), keypair);
        }

        final SettableFuture<RpcResult<AddKeystoreEntryOutput>> rpcResult = SettableFuture.create();

        writeTransaction.commit().addCallback(new FutureCallback<CommitInfo>() {
            @Override
            public void onSuccess(final CommitInfo result) {
                LOG.debug("add-key-pair success. Input: {}", input);
                rpcResult.set(RpcResultBuilder.success(new AddKeystoreEntryOutputBuilder().build()).build());
            }

            @Override
            public void onFailure(final Throwable throwable) {
                LOG.warn("add-key-pair failed. Input: {}", input, throwable);
                rpcResult.setException(throwable);
            }
        }, MoreExecutors.directExecutor());

        return rpcResult;
    }

    @Override
    public ListenableFuture<RpcResult<AddTrustedCertificateOutput>> addTrustedCertificate(
            final AddTrustedCertificateInput input) {
        final WriteTransaction writeTransaction = dataBroker.newWriteOnlyTransaction();

        for (TrustedCertificate certificate : input.nonnullTrustedCertificate().values()) {
            writeTransaction.merge(LogicalDatastoreType.CONFIGURATION,
                    keystoreIid.child(TrustedCertificate.class, certificate.key()), certificate);
        }

        final SettableFuture<RpcResult<AddTrustedCertificateOutput>> rpcResult = SettableFuture.create();

        writeTransaction.commit().addCallback(new FutureCallback<CommitInfo>() {
            @Override
            public void onSuccess(final CommitInfo result) {
                LOG.debug("add-trusted-certificate success. Input: {}", input);
                rpcResult.set(RpcResultBuilder.success(new AddTrustedCertificateOutputBuilder().build()).build());
            }

            @Override
            public void onFailure(final Throwable throwable) {
                LOG.warn("add-trusted-certificate failed. Input: {}", input, throwable);
                rpcResult.setException(throwable);
            }
        }, MoreExecutors.directExecutor());

        return rpcResult;
    }

    @Override
    public ListenableFuture<RpcResult<RemoveTrustedCertificateOutput>> removeTrustedCertificate(
            final RemoveTrustedCertificateInput input) {
        final WriteTransaction writeTransaction = dataBroker.newWriteOnlyTransaction();

        for (final String name : input.getName()) {
            writeTransaction.delete(LogicalDatastoreType.CONFIGURATION,
                    keystoreIid.child(TrustedCertificate.class, new TrustedCertificateKey(name)));
        }

        final SettableFuture<RpcResult<RemoveTrustedCertificateOutput>> rpcResult = SettableFuture.create();

        writeTransaction.commit().addCallback(new FutureCallback<CommitInfo>() {
            @Override
            public void onSuccess(final CommitInfo result) {
                LOG.debug("remove-trusted-certificate success. Input: {}", input);
                rpcResult.set(RpcResultBuilder.success(new RemoveTrustedCertificateOutputBuilder().build()).build());
            }

            @Override
            public void onFailure(final Throwable throwable) {
                LOG.warn("remove-trusted-certificate failed. Input: {}", input, throwable);
                rpcResult.setException(throwable);
            }
        }, MoreExecutors.directExecutor());

        return rpcResult;
    }

    @Override
    public ListenableFuture<RpcResult<AddPrivateKeyOutput>> addPrivateKey(final AddPrivateKeyInput input) {
        final WriteTransaction writeTransaction = dataBroker.newWriteOnlyTransaction();

        for (PrivateKey key: input.nonnullPrivateKey().values()) {
            writeTransaction.merge(LogicalDatastoreType.CONFIGURATION,
                    keystoreIid.child(PrivateKey.class, key.key()), key);
        }

        final SettableFuture<RpcResult<AddPrivateKeyOutput>> rpcResult = SettableFuture.create();

        writeTransaction.commit().addCallback(new FutureCallback<CommitInfo>() {
            @Override
            public void onSuccess(final CommitInfo result) {
                LOG.debug("add-private-key success. Input: {}", input);
                rpcResult.set(RpcResultBuilder.success(new AddPrivateKeyOutputBuilder().build()).build());
            }

            @Override
            public void onFailure(final Throwable throwable) {
                LOG.warn("add-private-key failed. Input: {}", input, throwable);
                rpcResult.setException(throwable);
            }
        }, MoreExecutors.directExecutor());

        return rpcResult;
    }

    @Override
    public ListenableFuture<RpcResult<RemovePrivateKeyOutput>> removePrivateKey(final RemovePrivateKeyInput input) {
        final WriteTransaction writeTransaction = dataBroker.newWriteOnlyTransaction();

        for (final String name : input.getName()) {
            writeTransaction.delete(LogicalDatastoreType.CONFIGURATION,
                    keystoreIid.child(PrivateKey.class, new PrivateKeyKey(name)));
        }

        final SettableFuture<RpcResult<RemovePrivateKeyOutput>> rpcResult = SettableFuture.create();

        writeTransaction.commit().addCallback(new FutureCallback<CommitInfo>() {
            @Override
            public void onSuccess(final CommitInfo result) {
                LOG.debug("remove-private-key success. Input: {}", input);
                rpcResult.set(RpcResultBuilder.success(new RemovePrivateKeyOutputBuilder().build()).build());
            }

            @Override
            public void onFailure(final Throwable throwable) {
                LOG.warn("remove-private-key failed. Input: {}", input, throwable);
                rpcResult.setException(throwable);
            }
        }, MoreExecutors.directExecutor());

        return rpcResult;
    }
}
