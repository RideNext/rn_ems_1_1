#!/bin/bash

# Copyright 2025 Tejas Networks
# Copyright 2024 RideNext Software Solutions Pvt Ltd.
# Copyright 2021 highstreet technologies GmbH and others
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

# generate a new private key
openssl genrsa -out client.key 2048 2>/dev/null

# create a new Certificate Signing Request
openssl req -new -sha256 -key client.key -subj "/C=IN/ST=KARNATAKA/L=BENGALURU/O=Tejas/OU=NMS/CN=tejasnetworks.com/emailAddress=manishti@tejasnetworks.com" -out client.csr 2>/dev/null

# sign the certificate with our own CA
openssl x509 -req -in client.csr -CA ca.pem -CAkey ca.key -CAcreateserial -out client.crt -days 3650 -sha256 2>/dev/null
rm client.csr

exit 0
