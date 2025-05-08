/**
 * ============LICENSE_START========================================================================
 * ONAP : ccsdk feature sdnr wt odlux
 * =================================================================================================
 * Copyright (C) 2019 highstreet technologies GmbH Intellectual Property. All rights reserved.
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
export type userServer = {
   id: string;
   firstName: string;
   lastName: string;
   email: string;
   username :string;
   password :string;
   confirmPassword :string;
   mappedRoles: string[];
   mappedGroups: string;
   availableRoles: string[];
   maproleid : string[];
   avlroleid: string[];
   edittype:String
  // userId: string;
  //newPassword :string;
    
} 

export type XmlFileInfo = {
   filename: string;
   version: string;
} 

export type userServerVersionInfo = {
   users: string;
   server: string;
   
   nexmls: XmlFileInfo[]; 
} 

export type ODLConfig = {
   User: string;
   Password: string;
   Port: number;
   Protocol: "http" | "https";
   Server: string;
   Trustall: boolean;
}; 

export const BusySymbol = Symbol("Busy");

export type userConfig = {
   Name: string;
   DeviceIp: string;
   DevicePort: number;
   DeviceType: number;
   TrapPort: number;
   NcUsername: string;
   NcPassword: string;
   NcPort: number;
   NeXMLFile: string;
   ODLConfig: ODLConfig[];
}

export type userConfigResponse = userConfig & {
   IsNCConnected: boolean;
   IsNeConnected: boolean;
   autorun: boolean;
   fwactive: boolean;
   islocked: boolean;
   ncconnections:{}[];
   pid: number;
   // extended properties
   [BusySymbol]: boolean;
} 

export type userServerDevice = {
  id: number;       // DeviceType
  device: string; 
  vendor: string;
  version: string;
  xml: string;      // NeXMLFile
}

/*type UserData = userServer & {
   roles: string[];
   userIds: string;
};*/