
 /***
  * ################################################################################################
  * #                                                                                              #
  * #   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd]. All rights  reserved         #
  * #                                                                                              #
  * ################################################################################################
 ****/

import { requestRest, formEncode } from '../../../../framework/src/services/restService';
import { providerdata  } from '../models/preproviderServer';
import { PostResponse, DeleteResponse, Result } from '../../../../framework/src/models';
import axios from "axios";

export const preproviderServerResourcePath = "providerAppTest-server";

type IndexablepreproviderServer = providerdata & { [key: string]: any; };

class PreproviderService {
  public async insertpreproviderServer(server: IndexablepreproviderServer): Promise<PostResponse | null> {

    //console.log(server)
    let result = null;
   const baseUri = `${ window.location.origin }`;
   if(server.DeviceType === "RRU"){
    await axios.post(baseUri+`/pre_provider/_doc/${server.PNFID}`,
      {
        "DeviceType": server.DeviceType,
        "PNFID" : server.PNFID,
        "IP_ADDRESS" : server.IP_ADDRESS,
        "USERNAME": server.USERNAME,
        "PASSWORD":server.PASSWORD,
        "PREPROVIDER_CONF" : server.PREPROVIDER_CONF,
        "PORT_NUMBER":server.PORT_NUMBER,
        "FILENAME": server.FILENAME,
        "SSHKey": server.SSHKey
      }).then((res) => {
        result=res;
      }).catch((error) => {
      result=error.message;
    });
  }
  else{
    await axios.post(baseUri+`/pre_provider/_doc/${server.PNFID}`,
      {
        "DeviceType": server.DeviceType,
        "PNFID" : server.PNFID,
        "IP_ADDRESS" : server.IP_ADDRESS,
        "USERNAME": server.USERNAME,
        "PASSWORD":server.PASSWORD,
        "PREPROVIDER_CONF" : server.PREPROVIDER_CONF,
        "PORT_NUMBER":server.PORT_NUMBER,
        "FILENAME": server.FILENAME
      }).then((res) => {
        result=res;
      }).catch((error) => {
      result=error.message;
    });
  }
    return result || null;
  }

  /**
    * Updates data into the preprovider table.
    */
  public async updatepreproviderServer(server: IndexablepreproviderServer): Promise<PostResponse | null> {
    console.log(server)
    const baseUri = `${ window.location.origin }`;
    let result = null;
    try {
      if (server.oldPNFID != null) {
        await axios.delete(`${baseUri}/pre_provider/_doc/${server.oldPNFID}`);   
      }
  
      if(server.DeviceType === "RRU"){
        await axios.post(baseUri+`/pre_provider/_doc/${server.PNFID}`,
          {
            "DeviceType": server.DeviceType,
            "PNFID" : server.PNFID,
            "IP_ADDRESS" : server.IP_ADDRESS,
            "USERNAME": server.USERNAME,
            "PASSWORD":server.PASSWORD,
            "PREPROVIDER_CONF" : server.PREPROVIDER_CONF,
            "PORT_NUMBER":server.PORT_NUMBER,
            "FILENAME": server.FILENAME,
            "SSHKey": server.SSHKey
          }).then((res) => {
            result=res;
          }).catch((error) => {
          result=error.message;
        });
      }
      else{
        await axios.post(baseUri+`/pre_provider/_doc/${server.PNFID}`,
          {
            "DeviceType": server.DeviceType,
            "PNFID" : server.PNFID,
            "IP_ADDRESS" : server.IP_ADDRESS,
            "USERNAME": server.USERNAME,
            "PASSWORD":server.PASSWORD,
            "PREPROVIDER_CONF" : server.PREPROVIDER_CONF,
            "PORT_NUMBER":server.PORT_NUMBER,
            "FILENAME": server.FILENAME
          }).then((res) => {
            result=res;
          }).catch((error) => {
          result=error.message;
        });
      }
    } catch (error) {
      console.error("Error updating data in Elasticsearch:", error);
    }
    return result || null;
  }
  /**
    * Deletes data from the preprovider table.
    */
  public async deletepreproviderServer(server: providerdata): Promise<DeleteResponse | null> {
 const baseUri = `${ window.location.origin }`;
 let result = null;
 await axios
 .delete(`${baseUri}/pre_provider/_doc/${server.PNFID}`)
 .then((response) => {
   console.log("Data deleted from Elasticsearch:", response.data); 
 })
 .catch((error) => {
   console.error("Error deleting data from Elasticsearch:", error);
   
 });
    return result || null;
  }
  
  public async importpreproviderServer(server: providerdata): Promise<any> {
    const baseUri = `${ window.location.origin }`;
    let result = ""
    return result || null;
  }

  // public async getpreproviderServerById(serverId: string): Promise<providerdata | null> {
  //   alert('getpreproviderServerById');
  //   const path = `/restconf/operations/data-provider:read-pre_provider-server-list`;
  //   const data = { "filter": [{ "property": "id", "filtervalue": serverId }] }
  //   const result = await requestRest<Result<providerdata>>(path, { method: "POST", body: JSON.stringify({ input: data }) });

  //   if (result && result["data-provider:output"].data[0]) {
  //     const firstResult = result["data-provider:output"].data[0];
  //     return {
  //       PNFID: firstResult.PNFID,
  //       IP_ADDRESS:firstResult.IP_ADDRESS,
  //       PORT_NUMBER: firstResult.PORT_NUMBER,
  //       USERNAME: firstResult.USERNAME,
  //       PASSWORD: firstResult.PASSWORD,
  //       PREPROVIDER_CONF: firstResult.PREPROVIDER_CONF,
  //       oldPNFID:firstResult.oldPNFID,
  //       FILENAME:firstResult.FILENAME
  //     }
  //   }
  //   else {
  //     return null;
  //   }
  // }

}

export const preproviderService = new PreproviderService;
export default preproviderService;
