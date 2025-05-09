/*
 * ============LICENSE_START=======================================================
 * ONAP : ccsdk features
 * ================================================================================
* Copyright (C) 2024 RideNext Software Solutions. Pvt Ltd.  All rights reserved
* =================================================================================================
 * Copyright (C) 2019 highstreet technologies GmbH Intellectual Property.
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
package org.onap.ccsdk.features.sdnr.wt.dataprovider.test;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;
import java.util.Arrays;
import java.util.List;
import org.junit.Test;
import org.mockito.Mockito;
import org.onap.ccsdk.features.sdnr.wt.common.database.queries.QueryBuilder;
import org.onap.ccsdk.features.sdnr.wt.dataprovider.database.elasticsearch.data.rpctypehelper.QueryByFilter;
import org.onap.ccsdk.features.sdnr.wt.dataprovider.model.types.YangHelper2;
import org.opendaylight.yang.gen.v1.urn.opendaylight.params.xml.ns.yang.data.provider.rev201110.EntityInput;
import org.opendaylight.yang.gen.v1.urn.opendaylight.params.xml.ns.yang.data.provider.rev201110.SortOrder;
import org.opendaylight.yang.gen.v1.urn.opendaylight.params.xml.ns.yang.data.provider.rev201110.entity.input.Filter;
import org.opendaylight.yang.gen.v1.urn.opendaylight.params.xml.ns.yang.data.provider.rev201110.entity.input.FilterBuilder;
import org.opendaylight.yang.gen.v1.urn.opendaylight.params.xml.ns.yang.data.provider.rev201110.entity.input.FilterKey;
import org.opendaylight.yang.gen.v1.urn.opendaylight.params.xml.ns.yang.data.provider.rev201110.entity.input.Sortorder;
import org.opendaylight.yang.gen.v1.urn.opendaylight.params.xml.ns.yang.data.provider.rev201110.entity.input.SortorderBuilder;
import org.opendaylight.yang.gen.v1.urn.opendaylight.params.xml.ns.yang.data.provider.rev201110.entity.input.SortorderKey;

public class TestFilterConversion extends Mockito {

    private static final String PROPERTY = "node-id";
    private static final String PROPERTY2 = "_id";
    private static final String PROPERTY3 = "timestamp";

    @Test
    public void testQuestionMark1() {
        EntityInput input = mock(EntityInput.class);
        List<Filter> filters = Arrays.asList(new FilterBuilder().setProperty(PROPERTY).setFiltervalue("si?ba").build());
        when(input.getFilter()).thenReturn(YangHelper2.getListOrMap(FilterKey.class, filters));

        QueryBuilder query = new QueryByFilter(input).getQueryBuilderByFilter();
        System.out.println(query.toJSON());

        assertTrue(query.toJSON().contains("{1,1}"));
        assertNotNull(new QueryByFilter(input).getQueryBuilderByFilter(PROPERTY));

    }

    @Test
    public void testQuestionMarkExcpetion() {
        EntityInput input = mock(EntityInput.class);
        List<Filter> filters = Arrays.asList(new FilterBuilder().setProperty(PROPERTY).setFiltervalue("si?ba").build());
        when(input.getFilter()).thenReturn(YangHelper2.getListOrMap(FilterKey.class, filters));
        try {
            new QueryByFilter(input).getSearchRequestByFilter("test1", "test2", "test3", "test4", false);
            fail();
        } catch (IllegalArgumentException e) { // fails if type not correct

        }

    }

    @Test
    public void testQuestionMark2() {
        EntityInput input = mock(EntityInput.class);
        List<Filter> filters = Arrays.asList(new FilterBuilder().setProperty(PROPERTY).setFiltervalue("si?ba").build(),
                new FilterBuilder().setProperty(PROPERTY2).setFiltervalue("abc").build());
        when(input.getFilter()).thenReturn(YangHelper2.getListOrMap(FilterKey.class, filters));
        QueryBuilder query = new QueryByFilter(input).getQueryBuilderByFilter();
        System.out.println(query.toJSON());
        assertNotNull(new QueryByFilter(input).getQueryBuilderByFilter(PROPERTY2));
    }

    @Test
    public void testQuestionMark3() {
        EntityInput input = mock(EntityInput.class);
        List<Filter> filters = Arrays.asList(new FilterBuilder().setProperty(PROPERTY).setFiltervalue("si?ba").build(),
                new FilterBuilder().setProperty(PROPERTY3).setFiltervalue("<2019-06-13T15:00:12.0Z").build());
        List<Sortorder> sortorder =
                Arrays.asList(new SortorderBuilder().setProperty(PROPERTY).setSortorder(SortOrder.Ascending).build());
        when(input.getFilter()).thenReturn(YangHelper2.getListOrMap(FilterKey.class, filters));
        when(input.getSortorder()).thenReturn(YangHelper2.getListOrMap(SortorderKey.class, sortorder));

        assertNotNull(new QueryByFilter(input).getQueryBuilderByFilter(PROPERTY));
    }

    @Test
    public void testSortorder() {
        EntityInput input = mock(EntityInput.class);
        List<Sortorder> sortorder = Arrays
                .asList(new SortorderBuilder().setProperty("source-type").setSortorder(SortOrder.Ascending).build());
        when(input.getSortorder()).thenReturn(YangHelper2.getListOrMap(SortorderKey.class, sortorder));
        QueryBuilder query = new QueryByFilter(input).getQueryBuilderByFilter();
        System.out.println(query.toJSON());
    }
}
