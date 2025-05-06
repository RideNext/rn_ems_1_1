
 /***
  * ################################################################################################
  * #                                                                                              #
  * #   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd]. All rights  reserved         #
  * #                                                                                              #
  * ################################################################################################
 ****/

import { requestRest, formEncode } from '../../../../framework/src/services/restService';
import { softwareManagementData  } from '../models/SoftwareManagementServer';
import { PostResponse, DeleteResponse, Result } from '../../../../framework/src/models';
import axios from "axios";

export const softwaremanagementServerResourcePath = "softwaremanagement";

type IndexablesoftwaremanagementServer = softwareManagementData & { [key: string]: any; };

class softwaremanagementService {
  public async insertsoftwaremanagementServer(server: IndexablesoftwaremanagementServer): Promise<any | null> {
    const baseUri = `${ window.location.origin }`;
    let result = ""
    return result || null;
  }

  /**
    * Updates data into the preprovider table.
    */
  public async updatesoftwaremanagementServer(server: IndexablesoftwaremanagementServer): Promise<any> {
    const baseUri = `${ window.location.origin }`;
    let result = ""
    return result || null;
  }
  /**
    * Deletes data from the preprovider table.
    */
  public async deletesoftwaremanagementServer(server: softwareManagementData): Promise<any> {
    const baseUri = `${ window.location.origin }`;
    let result = ""
    return result || null;
  }
  

}

export const SoftwaremanagementService = new softwaremanagementService;
export default SoftwaremanagementService;
