/*
 * Copyright (c) 2016 Cisco Systems, Inc. and others.  All rights reserved.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v1.0 which accompanies this distribution,
 * and is available at http://www.eclipse.org/legal/epl-v10.html
 */
package org.opendaylight.restconf.nb.rfc8040.streams.listeners;

import com.google.common.util.concurrent.ListenableFuture;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.time.OffsetDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import javax.xml.stream.XMLOutputFactory;
import javax.xml.stream.XMLStreamException;
import javax.xml.stream.XMLStreamWriter;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMResult;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import org.opendaylight.mdsal.common.api.LogicalDatastoreType;
import org.opendaylight.mdsal.dom.api.DOMDataBroker;
import org.opendaylight.mdsal.dom.api.DOMDataTreeWriteTransaction;
import org.opendaylight.restconf.nb.rfc8040.Rfc8040;
import org.opendaylight.restconf.nb.rfc8040.handlers.SchemaContextHandler;
import org.opendaylight.yangtools.util.xml.UntrustedXML;
import org.opendaylight.yangtools.yang.common.QName;
import org.opendaylight.yangtools.yang.data.api.schema.NormalizedNode;
import org.opendaylight.yangtools.yang.data.api.schema.stream.NormalizedNodeStreamWriter;
import org.opendaylight.yangtools.yang.data.api.schema.stream.NormalizedNodeWriter;
import org.opendaylight.yangtools.yang.data.codec.xml.XMLStreamNormalizedNodeStreamWriter;
import org.opendaylight.yangtools.yang.model.api.EffectiveModelContext;
import org.opendaylight.yangtools.yang.model.api.SchemaPath;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

/**
 * Abstract class for processing and preparing data.
 */
abstract class AbstractNotificationsData {
    private static final Logger LOG = LoggerFactory.getLogger(AbstractNotificationsData.class);
    private static final TransformerFactory TF = TransformerFactory.newInstance();
    private static final XMLOutputFactory OF = XMLOutputFactory.newInstance();

    private final String localName;

    protected SchemaContextHandler schemaHandler;
    private DOMDataBroker dataBroker;

    AbstractNotificationsData(final QName lastQName) {
        localName = lastQName.getLocalName();
    }

    /**
     * Data broker for delete data in DS on close().
     *
     * @param dataBroker creating new write transaction for delete data on close
     * @param schemaHandler for formatting notifications
     */
    @SuppressWarnings("checkstyle:hiddenField")
    // FIXME: this is pure lifecycle nightmare just because ...
    public void setCloseVars(final DOMDataBroker dataBroker, final SchemaContextHandler schemaHandler) {
        this.dataBroker = dataBroker;
        this.schemaHandler = schemaHandler;
    }

    /**
     * Delete data in DS.
     */
    // FIXME: here we touch datastore, which probably should be done by whoever instantiated us or created the resource,
    //        or they should be giving us the transaction
    protected ListenableFuture<?> deleteDataInDS() {
        final DOMDataTreeWriteTransaction wTx = dataBroker.newWriteOnlyTransaction();
        wTx.delete(LogicalDatastoreType.OPERATIONAL, Rfc8040.restconfStateStreamPath(localName));
        return wTx.commit();
    }

    /**
     * Formats data specified by RFC3339.
     *
     * @param now time stamp
     * @return Data specified by RFC3339.
     */
    protected static String toRFC3339(final Instant now) {
        return DateTimeFormatter.ISO_OFFSET_DATE_TIME.format(OffsetDateTime.ofInstant(now, ZoneId.systemDefault()));
    }

    /**
     * Creates {@link Document} document.
     *
     * @return {@link Document} document.
     */
    protected static Document createDocument() {
        return UntrustedXML.newDocumentBuilder().newDocument();
    }

    /**
     * Write normalized node to {@link DOMResult}.
     *
     * @param normalized
     *            data
     * @param context
     *            actual schema context
     * @param schemaPath
     *            schema path of data
     * @return {@link DOMResult}
     */
    protected DOMResult writeNormalizedNode(final NormalizedNode normalized, final EffectiveModelContext context,
            final SchemaPath schemaPath) throws IOException, XMLStreamException {
        final Document doc = UntrustedXML.newDocumentBuilder().newDocument();
        final DOMResult result = new DOMResult(doc);
        NormalizedNodeWriter normalizedNodeWriter = null;
        NormalizedNodeStreamWriter normalizedNodeStreamWriter = null;
        XMLStreamWriter writer = null;

        try {
            writer = OF.createXMLStreamWriter(result);
            normalizedNodeStreamWriter = XMLStreamNormalizedNodeStreamWriter.create(writer, context, schemaPath);
            normalizedNodeWriter = NormalizedNodeWriter.forStreamWriter(normalizedNodeStreamWriter);

            normalizedNodeWriter.write(normalized);

            normalizedNodeWriter.flush();
        } finally {
            if (normalizedNodeWriter != null) {
                normalizedNodeWriter.close();
            }
            if (normalizedNodeStreamWriter != null) {
                normalizedNodeStreamWriter.close();
            }
            if (writer != null) {
                writer.close();
            }
        }

        return result;
    }

    /**
     * Generating base element of every notification.
     *
     * @param doc
     *            base {@link Document}
     * @return element of {@link Document}
     */
    protected Element basePartDoc(final Document doc) {
        final var notificationElement = NotificationFormatter.createNotificationElement(doc);
        doc.appendChild(notificationElement);
        return notificationElement;
    }

    /**
     * Generating of {@link Document} transforming to string.
     *
     * @param doc
     *            {@link Document} with data
     * @return - string from {@link Document}
     */
    protected String transformDoc(final Document doc) {
        final ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {
            final Transformer transformer = TF.newTransformer();
            transformer.setOutputProperty(OutputKeys.OMIT_XML_DECLARATION, "no");
            transformer.setOutputProperty(OutputKeys.METHOD, "xml");
            transformer.setOutputProperty(OutputKeys.INDENT, "yes");
            transformer.setOutputProperty(OutputKeys.ENCODING, "UTF-8");
            transformer.setOutputProperty("{http://xml.apache.org/xslt}indent-amount", "4");
            transformer.transform(new DOMSource(doc), new StreamResult(out));
        } catch (final TransformerException e) {
            // FIXME: this should raise an exception
            final String msg = "Error during transformation of Document into String";
            LOG.error(msg, e);
            return msg;
        }

        return new String(out.toByteArray(), StandardCharsets.UTF_8);
    }
}
