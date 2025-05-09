/*-
 * ============LICENSE_START======================================================================
* Copyright (C) 2024 RideNext Software Solutions. Pvt Ltd.  All rights reserved
* ==================================================================================
 * Copyright (C) 2018 NOKIA Intellectual Property, 2018-2023 Nordix Foundation. All rights reserved.
 * ===============================================================================================
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 * ============LICENSE_END========================================================================
 */

package org.oran.datafile.model;

import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;

@Builder
@EqualsAndHashCode
public class FilePublishInformation {

    String productName;

    String vendorName;

    long lastEpochMicrosec;

    @Getter
    String sourceName;

    long startEpochMicrosec;

    String timeZoneOffset;

    String compression;

    String fileFormatType;

    String fileFormatVersion;

    @Getter
    String name;

    String changeIdentifier;

    String objectStoreBucket;
}
