/*
 * ============LICENSE_START=======================================================
 * ONAP : ccsdk features
 * ================================================================================
* Copyright (C) 2024 RideNext Software Solutions. Pvt Ltd.  All rights reserved
* =================================================================================================
 * Copyright (C) 2020 highstreet technologies GmbH Intellectual Property.
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
package org.onap.ccsdk.features.sdnr.wt.netconfnodestateservice.impl.access.dom;

import java.util.Objects;
import org.opendaylight.mdsal.binding.dom.codec.api.BindingNormalizedNodeSerializer;
import org.opendaylight.yangtools.yang.parser.api.YangParserFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class DomContext {
    @SuppressWarnings("unused")
    private static final Logger LOG = LoggerFactory.getLogger(DomContext.class);

    private final YangParserFactory yangParserFactory;
    private final BindingNormalizedNodeSerializer bindingNormalizedNodeSerializer;

    public DomContext(YangParserFactory yangParserFactory, BindingNormalizedNodeSerializer bindingNormalizedNodeSerializer) {
        this.yangParserFactory = Objects.requireNonNull(yangParserFactory);
        this.bindingNormalizedNodeSerializer = Objects.requireNonNull(bindingNormalizedNodeSerializer);
    }

    public BindingNormalizedNodeSerializer getBindingNormalizedNodeSerializer() {
        return bindingNormalizedNodeSerializer;
    }

    public YangParserFactory getYangParserFactory() {
        return yangParserFactory;
    }

}
