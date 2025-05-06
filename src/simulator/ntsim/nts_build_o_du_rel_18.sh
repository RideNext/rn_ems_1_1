#!/bin/bash

################################################################################
# Copyright (C) 2024 RideNext Software Solutions. Pvt Ltd
# Copyright 2023 highstreet technologies GmbH
#
# Licensed under the Apache License, Version 2.0 (the 'License');
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an 'AS IS' BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
################################################################################

source .env
# ./deploy/o-ran-du-rel-18/get_3gpp_yangs.sh
docker-compose -f nts-ng-docker-image-build-ubuntu.yaml build  --no-cache  --build-arg NTS_BUILD_DATE=$(date -u +'%Y-%m-%dT%H:%M:%SZ') --build-arg NTS_BUILD_VERSION=$NTS_BUILD_VERSION nts-ng-base nts-ng-o-ran-du-rel-18

CURWRK=${PWD}

pushd "deploy/o-ran-du-rel-18"
du_ver=$1
if [[ -z $du_ver ]];then
  du_ver1=$(date +%s )
  du_ver="${du_ver1: -3}"
fi	

  echo " BUILDING DU SIMULATOR VERSION: $du_ver"
  docker build --no-cache  -t du-simulator:$du_ver  -f  local.Dockerfile .

popd

cd ${CURWRK}
