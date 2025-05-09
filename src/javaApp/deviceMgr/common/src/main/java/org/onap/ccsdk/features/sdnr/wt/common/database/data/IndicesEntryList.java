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
package org.onap.ccsdk.features.sdnr.wt.common.database.data;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Michael Dürre
 *
 */
public class IndicesEntryList extends ArrayList<IndicesEntry> {

    /**
     * 
     */
    private static final long serialVersionUID = 1L;

    /**
     * @param index
     * @return
     */
    public IndicesEntry findByIndex(String index) {
        for (IndicesEntry e : this) {
            if (e.getName().equals(index)) {
                return e;
            }
        }
        return null;
    }

    /**
     * @param indices
     * @return
     */
    public IndicesEntryList subList(List<String> indices) {
        IndicesEntryList sublist = new IndicesEntryList();
        for (IndicesEntry e : this) {
            if (indices.contains(e.getName())) {
                sublist.add(e);
            }
        }
        return sublist;
    }

}
