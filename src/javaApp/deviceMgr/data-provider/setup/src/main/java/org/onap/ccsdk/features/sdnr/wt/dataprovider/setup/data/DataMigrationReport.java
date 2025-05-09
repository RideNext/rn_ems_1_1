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
package org.onap.ccsdk.features.sdnr.wt.dataprovider.setup.data;

import java.util.ArrayList;
import java.util.List;

public class DataMigrationReport {

    private boolean completed;
    private final List<String> logs;
    private final List<String> errors;

    public void setCompleted(boolean s) {
        this.completed = s;
    }

    public boolean completed() {
        return this.completed;
    }

    public void log(String format, Object... params) {
        this.logs.add(String.format(format, params));
    }

    public void error(String format, Object... params) {
        this.errors.add(String.format(format, params));
    }

    public DataMigrationReport() {
        this.completed = false;
        this.logs = new ArrayList<>();
        this.errors = new ArrayList<>();
    }

    @Override
    public String toString() {
        return "DataMigrationReport [completed=" + completed + ", logs=" + logs + ", errors=" + errors + "]";
    }

}
