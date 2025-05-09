/*
 * Copyright (c) 2016 Cisco Systems, Inc. and others.  All rights reserved.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v1.0 which accompanies this distribution,
 * and is available at http://www.eclipse.org/legal/epl-v10.html
 */
package org.opendaylight.restconf.nb.rfc8040.jersey.providers.patch;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertThrows;

import java.io.InputStream;
import javax.ws.rs.core.MediaType;
import org.junit.BeforeClass;
import org.junit.Test;
import org.opendaylight.restconf.common.errors.RestconfDocumentedException;
import org.opendaylight.restconf.nb.rfc8040.jersey.providers.test.AbstractBodyReaderTest;
import org.opendaylight.restconf.nb.rfc8040.jersey.providers.test.XmlBodyReaderTest;
import org.opendaylight.yangtools.yang.common.ErrorTag;
import org.opendaylight.yangtools.yang.model.api.EffectiveModelContext;

public class XmlPatchBodyReaderTest extends AbstractBodyReaderTest {
    private static EffectiveModelContext schemaContext;

    private final XmlPatchBodyReader xmlToPatchBodyReader;

    public XmlPatchBodyReaderTest() throws Exception {
        super(schemaContext);
        xmlToPatchBodyReader = new XmlPatchBodyReader(schemaContextHandler, mountPointService);
    }

    @Override
    protected MediaType getMediaType() {
        return new MediaType(MediaType.APPLICATION_XML, null);
    }

    @BeforeClass
    public static void initialization() {
        schemaContext = schemaContextLoader("/instanceidentifier/yang", schemaContext);
    }

    @Test
    public void moduleDataTest() throws Exception {
        mockBodyReader("instance-identifier-patch-module:patch-cont/my-list1=leaf1", xmlToPatchBodyReader, false);
        checkPatchContext(xmlToPatchBodyReader.readFrom(null, null, null, mediaType, null,
            XmlBodyReaderTest.class.getResourceAsStream("/instanceidentifier/xml/xmlPATCHdata.xml")));
    }

    /**
     * Test trying to use Patch create operation which requires value without value. Error code 400 should be returned.
     */
    @Test
    public void moduleDataValueMissingNegativeTest() throws Exception {
        mockBodyReader("instance-identifier-patch-module:patch-cont/my-list1=leaf1", xmlToPatchBodyReader, false);
        final InputStream inputStream = XmlBodyReaderTest.class.getResourceAsStream(
            "/instanceidentifier/xml/xmlPATCHdataValueMissing.xml");
        final RestconfDocumentedException ex = assertThrows(RestconfDocumentedException.class,
            () -> xmlToPatchBodyReader.readFrom(null, null, null, mediaType, null, inputStream));
        assertEquals(ErrorTag.MALFORMED_MESSAGE, ex.getErrors().get(0).getErrorTag());
    }

    /**
     * Test trying to use value with Patch delete operation which does not support value. Error code 400 should be
     * returned.
     */
    @Test
    public void moduleDataNotValueNotSupportedNegativeTest() throws Exception {
        mockBodyReader("instance-identifier-patch-module:patch-cont/my-list1=leaf1", xmlToPatchBodyReader, false);
        final InputStream inputStream = XmlBodyReaderTest.class.getResourceAsStream(
            "/instanceidentifier/xml/xmlPATCHdataValueNotSupported.xml");
        final RestconfDocumentedException ex = assertThrows(RestconfDocumentedException.class,
            () -> xmlToPatchBodyReader.readFrom(null, null, null, mediaType, null, inputStream));
        assertEquals(ErrorTag.MALFORMED_MESSAGE, ex.getErrors().get(0).getErrorTag());
    }

    /**
     * Test of Yang Patch with absolute target path.
     */
    @Test
    public void moduleDataAbsoluteTargetPathTest() throws Exception {
        mockBodyReader("", xmlToPatchBodyReader, false);
        checkPatchContext(xmlToPatchBodyReader.readFrom(null, null, null, mediaType, null,
            XmlBodyReaderTest.class.getResourceAsStream("/instanceidentifier/xml/xmlPATCHdataAbsoluteTargetPath.xml")));
    }

    /**
     * Test using Patch when target is completely specified in request URI and thus target leaf contains only '/' sign.
     */
    @Test
    public void modulePatchCompleteTargetInURITest() throws Exception {
        mockBodyReader("instance-identifier-patch-module:patch-cont", xmlToPatchBodyReader, false);
        checkPatchContext(xmlToPatchBodyReader.readFrom(null, null, null, mediaType, null,
            XmlBodyReaderTest.class.getResourceAsStream(
                "/instanceidentifier/xml/xmlPATCHdataCompleteTargetInURI.xml")));
    }

    /**
     * Test of Yang Patch merge operation on list. Test consists of two edit operations - replace and merge.
     */
    @Test
    public void moduleDataMergeOperationOnListTest() throws Exception {
        mockBodyReader("instance-identifier-patch-module:patch-cont/my-list1=leaf1", xmlToPatchBodyReader, false);
        final InputStream inputStream = XmlBodyReaderTest.class.getResourceAsStream(
            "/instanceidentifier/xml/xmlPATCHdataMergeOperationOnList.xml");
        checkPatchContext(xmlToPatchBodyReader.readFrom(null, null, null, mediaType, null, inputStream));
    }

    /**
     * Test of Yang Patch merge operation on container. Test consists of two edit operations - create and merge.
     */
    @Test
    public void moduleDataMergeOperationOnContainerTest() throws Exception {
        mockBodyReader("instance-identifier-patch-module:patch-cont", xmlToPatchBodyReader, false);
        final InputStream inputStream = XmlBodyReaderTest.class
                .getResourceAsStream("/instanceidentifier/xml/xmlPATCHdataMergeOperationOnContainer.xml");
        checkPatchContext(xmlToPatchBodyReader.readFrom(null, null, null, mediaType, null, inputStream));
    }

    /**
     * Test of Yang Patch on the top-level container with empty URI for data root.
     */
    @Test
    public void modulePatchTargetTopLevelContainerWithEmptyURITest() throws Exception {
        mockBodyReader("", xmlToPatchBodyReader, false);
        final InputStream inputStream = XmlBodyReaderTest.class
                .getResourceAsStream("/instanceidentifier/xml/xmlPATCHTargetTopLevelContainerWithEmptyURI.xml");
        checkPatchContext(xmlToPatchBodyReader.readFrom(null, null, null, mediaType, null, inputStream));
    }
}
