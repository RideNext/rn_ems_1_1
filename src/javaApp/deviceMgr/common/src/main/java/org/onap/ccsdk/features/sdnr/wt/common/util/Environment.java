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
package org.onap.ccsdk.features.sdnr.wt.common.util;

import java.net.Inet4Address;
import java.net.UnknownHostException;
import java.util.Map;

public class Environment {

    public static String getVar(String v) {
        return getVar(v, null);
    }
    public static String getVar(String v, String defaultValue) {
        if (v.equals("$HOSTNAME")) {
            String s = null;
            try {
                s = Inet4Address.getLocalHost().getHostName();
            } catch (UnknownHostException e) {

            }
            if (s != null && s.length() > 0)
                return s;
        }
        Map<String, String> env = System.getenv();
        for (String envName : env.keySet()) {
            if (envName != null && envName.equals(v))
                return env.get(envName);
        }
        return defaultValue;
    }
}
