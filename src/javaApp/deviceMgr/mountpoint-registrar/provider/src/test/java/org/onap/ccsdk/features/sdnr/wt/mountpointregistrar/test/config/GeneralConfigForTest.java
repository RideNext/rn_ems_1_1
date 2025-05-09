/*
 * ============LICENSE_START========================================================================
 * ONAP : ccsdk feature sdnr wt
 * =================================================================================================
* Copyright (C) 2024 RideNext Software Solutions. Pvt Ltd.  All rights reserved
* =================================================================================================
 * Copyright (C) 2020 highstreet technologies GmbH Intellectual Property. All rights reserved.
 * =================================================================================================
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 * ============LICENSE_END==========================================================================
 */

package org.onap.ccsdk.features.sdnr.wt.mountpointregistrar.test.config;

import com.google.common.io.Files;
import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import org.onap.ccsdk.features.sdnr.wt.common.configuration.ConfigurationFileRepresentation;
import org.onap.ccsdk.features.sdnr.wt.mountpointregistrar.config.GeneralConfig;

public class GeneralConfigForTest implements AutoCloseable {

    // @formatter:off
    private static final String TESTCONFIG_CONTENT = "[general]\n"
            + "baseUrl=http://localhost:8181\n"
            + "sdnrUser=admin\n"
            + "sdnrPasswd=admin\n"
            + "";
    // @formatter:on

    private GeneralConfig cfg ;
    private String filename;

    public GeneralConfigForTest(String filename) throws IOException {

            Files.asCharSink(new File(filename), StandardCharsets.UTF_8).write(TESTCONFIG_CONTENT);
            ConfigurationFileRepresentation globalCfg = new ConfigurationFileRepresentation(filename);
            this.filename = filename;
            this.cfg = new GeneralConfig(globalCfg);

    }

    public GeneralConfig getCfg() {
        return cfg;
    }


    @Override
    public
    void close() {
        File file = new File(filename);
        if (file.exists()) {
            System.out.println("File exists, Deleting it");
            file.delete();
        }

    }
}
