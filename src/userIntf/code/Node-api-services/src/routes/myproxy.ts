 /***
  * ################################################################################################
  * #                                                                                              #
  * #   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd]. All rights  reserved         #
  * #                                                                                              #
  * ################################################################################################
 ****/

 import express, { Request, Response, Router } from 'express'
 import axios, { AxiosRequestConfig } from 'axios';
 
 import https from 'https';
 import path from 'path';
 import { error } from 'console';
 const SFTPClient = require('ssh2-sftp-client');
 const { Kafka } = require('kafkajs');
 import fs from 'fs';
import { exec } from 'child_process';
 const router: Router = express.Router();
 
 const baseurl='https://identity:8463'
 const elsurl = 'http://persistence:9200'
 
 
 const config: AxiosRequestConfig = {
     httpsAgent: new https.Agent({
         rejectUnauthorized: false
     })
 };
 
 const instance = axios.create({
     httpsAgent: new https.Agent({
         rejectUnauthorized: false
     })
 });
 
 // Configure Kafka
const kafka = new Kafka({
    clientId: 'MNSMessages',
    brokers: [`${process.env.NMS_KAFKA_IP}:9092`], 
  });


 // get Test Data
 router.get('/test', async (req: Request, res: Response) => {
     var response = {
         "employee": {
             "name": "TestUser",
             "salary": 56000,
             "married": true
         }
     }
     res.json(response);
 });
 

 const producer = kafka.producer();
//  const produce = async () => {
//    await producer.connect();
//    await producer.send({
//      topic: 'my-topic',
//      messages: [{ value: 'Hello from React App!' }],
//    });
//    //await producer.disconnect();
//  };
 
 //produce().catch(console.error);


 router.post('/SendMessageToNMS', async (req, res) => {
    const  message  = req.body.message;
    var msg =JSON.stringify(message);
    const topic= req.body.topic;
    console.log(process.env.NMS_KAFKA_IP)
    console.log(req.body)
    console.log(producer)    
    try {
      await producer.connect();
      await producer.send({
        topic: topic,
        messages: [{ value: msg }],
      });
      res.status(200).send('Message sent to Kafka topic');
      await producer.disconnect();
    } catch (error) {
      res.status(500).send('Error sending message to Kafka topic');
      await producer.disconnect();
    }
  });
 
 ///Update Node related details
 router.post('/updateDeviceDetails', async (req: Request, res: Response) => {
     const softWareVer = req.body.softwareVersion;
     const  serialNumber = req.body.serialNumber;
     const nodeId = req.body.nodeId;
     const vendorDetails = req.body.vendorDetails;
     const modelNumber= req.body.modelNumber;
     axios.post(elsurl + '/networkelement-connection-v7/_update_by_query?conflicts=proceed',
         {
             "query": {
                 "match": {
                     "node-id": nodeId
                 }
             },
             
             "script": {
                 "source": "if (ctx._source == null) { ctx._source = new HashMap(); } ctx._source.putAll(params.data)",
                 "lang": "painless",
                 "params": {
                   "data": {
                     "software-version" : softWareVer,
                     "serial-number" : serialNumber,
                     "vendor-details" : vendorDetails,
                     "model-number" : modelNumber,
                   }
                 }
                }
         }).then(({ data }) => {
           //  console.log("setStartupConfigStatus updates is : "+ data.updated);
             res.json(data);
         }).catch((error) => {
             console.error(error);
         })
 }) 

 router.get('/getconnectionlistdata/', function (req: any, res) {
    axios.get(elsurl + '/networkelement-connection-v7/_count').then(({ data }) => {
        const fieldsToReturn = ['is-required', 'node-id', 'core-model-capability','port','device-type','host','id','status','software-version',
            'serial-number','vendor-details','model-number','HeartBeatStatus','DeviceStatus',"password","tls-key"
        ];
        axios.get(`${elsurl}/networkelement-connection-v7/_search`, {
            params: {
                size: data.count,
                _source: fieldsToReturn.join(','), // Specify which fields to return
            }
        }).then(({data})=>{
            res.json(data || null);
        });
        }).catch((error) => {
            console.error(error);
            res.json("error")
        })
  });
      //Get Request from connectionlog - v7 index data
      router.get('/getconnectionloglistdata/', async function (req: any, res) {
        try {
            const countResponse = await axios.get(elsurl + '/connectionlog-v7/_count');
            const dataResponse = await axios.get(`${elsurl}/connectionlog-v7/_search`, {
                params: {
                    size: countResponse.data.count,
                }
            });
            res.json(dataResponse.data || null);
        } catch (error) {
            console.error(error);
        }
    });
 
 ///Update Node related details
 router.post('/updateHeartBeatStatus', async (req: Request, res: Response) => {
     const heartBeatStatus = req.body.heartBeatStatus;
     const nodeId = req.body.nodeId;
     axios.post(elsurl + '/networkelement-connection-v7/_update_by_query?conflicts=proceed',
         {
             "query": {
                 "term": {
                     "node-id.keyword": nodeId
                 }
             },
             
             "script": {
                 "source": "if (ctx._source == null) { ctx._source = new HashMap(); } ctx._source.putAll(params.data)",
                 "lang": "painless",
                 "params": {
                   "data": {
                     "HeartBeatStatus" : heartBeatStatus
                   }
                 }
                }
         }).then(({ data }) => {
	 //  console.log("setStartupConfigStatus updates is : "+ data.updated);
             res.json(data);
         }).catch((error) => {
             console.error(error);
         })
 })




 router.post('/updateDeviceDetailsToPreProvider', async (req: Request, res: Response) => {
    const softWareVer = req.body.softwareVersion;
    const  serialNumber = req.body.serialNumber;
    const nodeId = req.body.nodeId;
    const vendorDetails = req.body.vendorDetails;
    const modelNumber= req.body.modelNumber;
    axios.post(elsurl + '/pre_provider/_update_by_query?conflicts=proceed',
        {
            "query": {
                "term": {
                  "PNFID.keyword": nodeId
                }
              },
            "script": {
                "source": "if (ctx._source == null) { ctx._source = new HashMap(); } ctx._source.putAll(params.data)",
                "lang": "painless",
                "params": {
                  "data": {
                    "software-version" : softWareVer,
                    "serial-number" : serialNumber,
                    "vendor-details" : vendorDetails,
                    "model-number" : modelNumber,
                  }
                }
               }
        }).then(({ data }) => {
          //  console.log("setStartupConfigStatus updates is : "+ data.updated);
            res.json(data);
        }).catch((error) => {
            console.error(error);
	    res.status(409).send({"err":error});
        })
})
 
  ///Get getStartupConfigFlag Status
  router.get('/getDeviceDetailsFromPreProvider/:id', function (req: any, res) {
    axios.post(elsurl + '/pre_provider/_search',
        {
            query: {
                match: {
                    "PNFID": req.params.id,
                },
            },
        }).then(({ data }) => {
            //console.log(data);
            res.json(data.hits.hits[0] && data.hits.hits[0]._source && data.hits.hits[0]._source);
        }).catch((error) => {
            console.error(error);
        })
});
 
 ///Update SatrtUpConfig Stataus 
 router.post('/setStartupConfigStatus', async (req: Request, res: Response) => {
     const status = req.body.status;
     const nodeId = req.body.nodeId;
     axios.post(elsurl + '/networkelement-connection-v7/_update_by_query?conflicts=proceed',
         {
             "query": {
                 "match": {
                     "node-id": nodeId
                 }
             },
             "script": {
                 "source": "ctx._source.isStartUpdone=" + "'" + status + "'",
                 "lang": "painless"
             }
         }).then(({ data }) => {
           //  console.log("setStartupConfigStatus updates is : "+ data.updated);
             res.json(data);
         }).catch((error) => {
             console.error(error);
         })
 });
 


 ///Get getStartupConfigFlag Status
 router.get('/getStartupConfigStatus/:id', function (req: any, res) {
    axios.post(elsurl + '/networkelement-connection-v7/_search',
        {
            query: {
                match: {
                    "node-id": req.params.id,
                },
            },
        }).then(({ data }) => {
            //console.log(data);
           res.json(data.hits.hits[0] && data.hits.hits[0]?._source && data.hits.hits[0]?._source["is-start-updone"]?.toLowerCase() == "yes" ? data.hits.hits[0]?._source["is-start-updone"] : "no");
        }).catch((error) => {
            console.error(error);
           res.status(500).json({
                   message: 'Failed to  get StartupConfig Status',
                   error: error.message,
               });
        })
});
 
 ///Get Profile Data
 router.get('/getprofilemappingfile/:id', function (req: any, res) {
     //axios.post(elsurl + '/profilenodemapping/_search',
     axios.post(elsurl + '/pre_provider/_search',
         {
             query: {
                 match: {
                     "_id": req.params.id,
                 },
             },
         }).then(({ data }) => {
             //console.log(data);
             res.json(data.hits.hits[0] ? data.hits.hits[0]._source.FILENAME : null);
         }).catch((error) => {
             console.error(error);
             if (error.response.data.error.type && error.response.data.error.type == 'index_not_found_exception') {
                 axios.put(elsurl + '/pre_provider/')
                     .then((res) => {
                         console.log(res);
                     }).catch((err) => {
                         console.log(err);
                     })
             }
         })
 });
 
 ///Add or Update profile Nodefile
 router.post('/AddUpdateprofileNodefile', function (req: any, res) {
     axios.post(elsurl + '/profilenodemapping/_search',
         {
             query: {
                 match: {
                     "NodeId": req.body.nodeid,
                 },
             },
         }).then(({ data }) => {
             //console.log(data);
             if (data.hits.hits[0] && data.hits.hits[0]._source.FileName) {
                 axios.post(elsurl + '/profilenodemapping/_update_by_query?conflicts=proceed',
                     {
                         "query": {
                             "match": {
                                 "NodeId": req.body.nodeid,
                             }
                         },
                         "script": {
                             "source": "ctx._source.FileName=" + "'" + req.body.filename + "'",
                             "lang": "painless"
                         }
                     }
                 ).then((resupdate) => {
                     console.log("profilenodemapping Update: ");
                     return resupdate.data.result
                 })
             }
             else {
                 axios.post(elsurl + '/profilenodemapping/_doc',
                     {
                         "FileName": req.body.filename,
                         "NodeId": req.body.nodeid
                     }
                 ).then((resupdate) => {
                     console.log("profilenodemapping Added ");
                     return resupdate.data.result
                 })
             }
         }).catch((error) => {
            // console.error(error);
             if (error.response.data.error.type && error.response.data.error.type == 'index_not_found_exception') {
                 axios.put(elsurl + '/profilenodemapping/').then((res) => {
                     axios.post(elsurl + '/profilenodemapping/_doc',
                         {
                          "FileName": req.body.filename,
                          "NodeId": req.body.nodeid
                         }
                     ).then((resupdate) => {
                         console.log("profilenodemapping Added ");
                          resupdate.data.result;
                     })
 
                 }).catch((err) => {
                     console.log(err);
                 })
             }
         })
 });
 
 ///delete  profile Nodefile
 router.post('/deleteProfileNodefile', function (req: any, res) {
     axios.post(elsurl + '/profilenodemapping/_delete_by_query',
         {
             query: {
                 match: {
                     "NodeId": req.body.nodeid,
                 },
             },
         }).then(({ data }) => {
             console.log(data);
             res.json(data);
         }).catch((error) => {
             console.error(error);
         })
 });
 
 router.post('/softwaremanagement', async (req, res) => {
     try {
         // Fetch the document
         let name = null;
         let SectorID=req.body.DeviceType==="RRH"? req.body.SectorID:"0";

         console.log("node service enetered")
         if( req.body.Event.split('_')[2] === 'download' || req.body.Event.split('_')[2] === 'install' ){
           name = "download"
         }
         else{
           name = "activate"
         }
         if(((req.body.Status === 'COMPLETED' && req.body.Result === 'SUCCESS') || (req.body.Result === 'FAILED'))){
           await axios.post(elsurl + "/software_management/_update_by_query?conflicts=proceed", {
             script: {
                 source: "ctx._source.status = params.value",
                 lang: "painless",
                 params: {
                     value: "completed"
                 }
               },
             query: {
                 bool: {
                 must: [
                       { match: { _id: req.body.NodeId + "_" + name+ "_"+SectorID} }, // Ensures you update only the document with the specific ID
                       { match: { status: "inprogress" } } // Ensures you update only documents with status 'inprogress'
                     ]
                   }
                 }
           });
 
         } 
         const response = await axios.get(`${elsurl}/software_management/_doc/${req.body.NodeId}_${name}_${SectorID}`);
         const { deviceType,sectorID,slot, prevversion, curversion } = response.data._source;
 
         // Update the document
         const updateResponse = await axios.post(`${elsurl}/software_management/_update/${req.body.NodeId}_${name}_${SectorID}`, {
             script: {
                 source: `ctx._source[params.slotName] = [params.updateData];`,
                 lang: 'painless',
                 params: {
                     slotName: slot, 
                     updateData: {
                         NodeId: req.body.NodeId,
                         Event: req.body.Event,
                         Status: req.body.Status,
                         Result: req.body.Result
                     }
                 }
             }
         });
         console.log("response updated")
 
         // Create message based on the event type
         let msg = '';
         const eventType = req.body.Event.split('_')[2];
         const status = req.body.Status;
         const result = req.body.Result;
         const error_msg =  req.body.Error_msg;
         if(result === 'FAILED'){
            msg = error_msg;
         }
         else if (eventType === 'download') {
             msg = `Software download ${response.data._source.release} ${status}`;
         } else if (eventType === 'install') {
             msg = `Software install from ${prevversion} to ${response.data._source.release.split('.')[0]} ${status}`;
         } else if (eventType === 'active' || eventType === 'activate') {
             msg = `Software activate from ${prevversion} to ${curversion} ${status}`;
         }

         console.log("software management logs:"+ req.body.Error_msg);
         console.log("software management logs req.body :"+ req.body);
         console.log("software management logs req.body.DeviceType :"+ req.body.DeviceType);
         console.log("software management logs req.body.SectorID :"+ req.body.SectorID  );
         let randomID=Math.floor((Math.random() * 10) + 1)*10
         // Post to the sm_history index
         const historyResponse = await axios.post(`${elsurl}/sm_history/_update/${req.body.NodeId}`, {
       script: {
         source: `
             if (ctx._source.history == null) {
               ctx._source.history = [];
             }
               ctx._source.history.add(params.data);`,
         lang: "painless",
         params: {
           data: {
             id:new Date().getTime() * 1000,
             deviceType : req.body.DeviceType,
             sectorID : req.body.SectorID === "NA" ? -1: req.body.SectorID,
             Slot: slot,
             Event: "Software "+ eventType,
             TimeStamp: new Date().getTime() * 1000,
             Status: req.body.Status,
             Result: req.body.Result,
             Error: msg
           },
         },
       },
       upsert: {
         history: [
           {
             id:new Date().getTime() * 1000,
             deviceType : req.body.DeviceType,
             sectorID : req.body.SectorID === "NA" ? -1: req.body.SectorID,
             Slot: slot,
             Event: "Software " + eventType,
             TimeStamp: new Date().getTime() * 1000,
             Status: req.body.Status,
             Result: req.body.Result,
             Error: msg
           },
         ],
       },
     });
        // Send a success response
        res.status(200).json({ message: 'Document updated and data posted to another index successfully', data: historyResponse.data });
     } catch (error) {
         console.error(error);
         res.status(500).json({ error: 'An error occurred during the process' });
     }
 });
 
 ///Get Profile Data
 router.get('/profiledata', async (req: Request, res: Response) => {
     const response = await instance.get(elsurl + "/profilemanagement/_doc/_search")
         .then(({ data }) => {
             //console.log(data);
             res.json(data.hits.hits.map((hit: { _source: any; }) => hit._source));
         }).catch((error: any) => {
             console.error(error);
             res.status(500).json({
                message: 'Failed to get profiledata data',
                error: error.message, });
         })
 });

  /////   Save Profile Data
  router.post('/createProfiledata', (req: any, res: Response) => {
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files ? req.files.file : null;
    // Use the mv() method to place the file somewhere on your server
    let filePath = path.join(__dirname, '../..', 'pnffiles', req.files.file.name);
    sampleFile.mv(filePath, async function (err: any) {
        if (err) {
            console.error(err);
            res.status(500).json({
                message: 'Failed to create profile data',
                error: err.message, });
        }
        //es.send('File uploaded!');
        const response = await instance.post(elsurl + '/profilemanagement/_doc',
            {
                id: req.body.ProfileName,
                FileName: req.body.FileName,
                ProfileName: req.body.ProfileName,
                DeviceType: req.body.DeviceType
              }).then(() => {
                //console.log(data);
                res.status(200).json({
                    message: 'Profile data created successfully',
                });
            }).catch((error: { message: any; }) => {
                console.error(error);
                res.status(500).json({
                message: 'Failed to create profile data',
                error: error.message, });
            })

    });
})
  
/////   Update Profile Data
  router.put('/updateProfiledata', (req: any, res: Response) => {
    if (!req.files || Object.keys(req.files).length === 0 || (!req.body.ProfileName && req.body.ProfileName==="" || (!req.body.FileName && req.body.FileName===""))){
       console.log('Bad request, File,ProfileName and FileName are medatory fields');
        return res.status(400).json({
                 message: 'Bad request, File,ProfileName and FileName are medatory fields'
                })
        }
    let sampleFile = req.files ? req.files.file : null;
    // Use the mv() method to place the file somewhere on your server
    let filePath = path.join(__dirname, '../..', 'pnffiles', req.files.file.name);
    sampleFile.mv(filePath, async function (err: any) {
        if (err) {
            console.error(err);
            return res.status(500).json({
                message: 'Failed to updated profile data',
                error: err.message, });
        }
        //res.send('File uploaded!');
        const response =axios.post(elsurl + '/profilemanagement/_update_by_query',
            {
              "script": {
                    "source": "ctx._source['ProfileName']='" + req.body.ProfileName + "';"
                    + "ctx._source['DeviceType']='" + req.body.DeviceType + "';"
                    + "ctx._source['id']='" + req.body.ProfileName + "';"
                        + " ctx._source['FileName']='" + req.body.FileName + "'"
                },
                "query": {
                    "match": {
                        "id": req.body.id
                    }
                }
            }).then(() => {
                //console.log(data);
                res.status(200).json({
                    message: 'Profile data updated successfully',
                });
            }).catch((error: { message: any; }) => {
                console.error(error);
                res.status(500).json({
                message: 'Failed to updated profile data',
                error: error.message, });
            })

    });
})

///Delete Profile Data
  router.delete('/deleteProfiledata/:ProfileName', async (req: Request, res: Response) => {
    axios.post(elsurl + '/profilemanagement/_delete_by_query',
        {
          "query": {
            "match": {
              "ProfileName": req.params.ProfileName
            }
          }
        }).then(() => {
            //console.log(data);
            res.status(200).json({
                message: 'Profile data deleted successfully',
            });
        }).catch((error: { message: any; }) => {
            console.error(error);
            res.status(500).json({
            message: 'Failed to deleted profile data',
            error: error.message, });
        })
    });

 
 router.get('/performancedata', async (req: Request, res: Response) => {
     const response = await instance.get(elsurl + '/pm_data/_doc/_search')
         .then(({ data }) => {
             //console.log(data);
             res.json(data.hits.hits.map((hit: { _source: any; }) => hit._source));
         }).catch((error) => {
             console.error(error);
             res.status(500).json({
                message: 'Failed to get performance data',
                error: error.message, });
         })
 });
 
 
 router.get('/isNodeWhitelisted/:id', function (req: any, res) {
   axios.post(elsurl + '/pre_provider/_search',
       {
           query: {
               match: {
                   "PNFID.keyword": req.params.id,
               },
           },
       }).then(({ data }) => {
           //console.log(data);
           res.json(data.hits.hits[0] ? data.hits.hits[0]._source.PNFID : null);
       }).catch((error) => {
           console.error(error);
           res.json("error")
       })
 });

 
 
 router.delete('/faultcurrentdelete/:id', async (req, res) => {
   try {
     const id = req.params.id;
     const response = await axios.delete(elsurl + `/faultcurrent-v7/_doc/${id}`);
     
     // Log the response from Elasticsearch
    // console.log(response.data);
     
     // Send a success response back to the client
     res.status(200).json({ message: `Document with ID ${id} deleted successfully` });
   } catch (error:any) {
     // Handle errors if the delete request fails
     console.error('Error deleting document:', error.message);
     res.status(500).json({ error: 'Internal Server Error' });
   }
 });
   //Get Request from faultlog-v7 - v7 index data
   router.get('/getfaultlogdata', async (req: Request, res: Response) => {
    const response = await instance.get(elsurl + "/faultlog-v7/_doc/_search")
        .then(({ data }) => {
            res.json(data.hits.hits.map((hit: { _source: any; }) => hit._source));
        }).catch((error) => {
            console.error(error);
        })
});

//get software versions compatibility data
router.get('/getsoftwareversionsdata', async(req,res) => {
    const response = await instance.get(elsurl + "/software_versions/_doc/_search")
    .then(({ data }) => {
        res.json(data.hits.hits.map( (hit: {_source: any}) => hit._source));
    }).catch((error) => {
        console.error(error);
    })
})

router.get('/getfaultcurrentdata', async (req: Request, res: Response) => {
    const response = await instance.get(elsurl + "/faultcurrent-v7/_search", {
        params: {
            _source: 'severity,timestamp,node-id,counter,object-id,problem'
        }
    })
    .then(({ data }) => {
        res.json(data.hits.hits.map((hit: { _source: any; }) => hit._source));
    })
    .catch((error) => {
        console.error(error);
        res.status(500).send("Error fetching fault current data");
    });
});
 
 const data2 = {
     client_id: 'admin-cli',
     grant_type: 'password',
     username: "admin",
     password: 'Kp8bJ4SXszM0WXlhak3eHlcse2gAw84vaoGGmJvUy2U'
 };
 
 const customHeaders2 = {
     'Authorization': 'Basic ' + btoa('admin' + ':' + 'Kp8bJ4SXszM0WXlhak3eHlcse2gAw84vaoGGmJvUy2U'),
     'content-type': 'application/x-www-form-urlencoded',
     'accept': 'application/json'
 };
 
 // Get Token
 router.post('/gettoken', async (req: Request, res: Response) => {
     const kcurl = baseurl + '/auth/realms/master/protocol/openid-connect/token';
     const tokenHeaders = {
         'Authorization': 'Basic ' + btoa(req.body.username + ':' + req.body.password),
         'content-type': 'application/x-www-form-urlencoded',
         'accept': 'application/json'
     };
     const response = await instance.post(kcurl, data2, {
         headers: tokenHeaders,
     }).then(({ data }) => {
         //console.log(data);
         res.json(data);
     }).catch((error) => {
         console.error(error);
     })
 });
 
 // Get all Users
 router.post('/getusers', async (req: Request, res: Response) => {
     const tokenHeaders = {
         'Authorization': 'Basic ' + btoa(req.body.username + ':' + req.body.password),
         'content-type': 'application/x-www-form-urlencoded',
         'accept': 'application/json'
     };
     const kcurl = baseurl + '/auth/realms/master/protocol/openid-connect/token';
     const response = await instance.post(kcurl, data2, {
         headers: tokenHeaders,
     }).then(({ data }) => {
         // console.log(data);
         // res.json(data);
         const elsurl = baseurl + '/auth/admin/realms/onap/users';
         const response = instance.get(elsurl, {
             headers: {
                 'content-type': 'application/json',
                 'accept': 'application/json',
                 'Authorization': 'bearer ' + data.access_token
             },
         }).then(({ data }) => {
             // console.log(data);
             res.json(data);
         }).catch((error) => {
             console.error(error);
         });
     }).catch((error) => {
         console.error(error);
     })
 });
 
 
 // up load files
 router.post('/upload', (req: any, res: Response) => {
     if (!req.files || Object.keys(req.files).length === 0) {
         return res.status(400).send('No files were uploaded.');
     }
     // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
     let sampleFile = req.files ? req.files.file : null;
     // Use the mv() method to place the file somewhere on your server
     let filePath = path.join(__dirname, '../..', 'pnffiles', req.files.file.name);
     sampleFile.mv(filePath, function (err: any) {
         if (err) {
             console.error(err);
             return res.status(500).send(err);
         }
         res.send('File uploaded!');
     });
 })
 
  router.post('/delete', (req: any, res: Response) => {
    // Use the mv() method to place the file somewhere on your server
    if(req.body.filename != ""){
        let filePath = path.join(__dirname, '../..', 'pnffiles', req.body.filename);
    fs.unlink(filePath, (err:any) => {
        if (err) {
            console.error('Error deleting file:', err);
            return res.status(500).send('Failed to delete the file.');
        }
        res.send('File deleted successfully.');
    });
    }
})
 
 // down load files
 router.get('/download', function (req: any, res) {
     const file = path.join(__dirname, '../..', 'pnffiles', req.query.fileName);
     res.download(file); // Set disposition and send it.
 });
 
 router.post('/listfiles', async (req, res) => {
     const sftp = new SFTPClient();
     console.log("entered");
     console.log(req.body.host);
     console.log(req.body.username);
     console.log(req.body.password);
     console.log(req.body.path);
   
     try {
       await sftp.connect({
         host: req.body.host,
         port: req.body.port || 22,  // default to 22 for SFTP
         username: req.body.username,
         password: req.body.password,
       });
   
       const list = await sftp.list(req.body.path);
       res.json(list);
     } catch (error) {
       res.status(500).send(error);
     } finally {
       sftp.end();
     }
   });
   
 // statechange domain 
 router.post('/statechange', function(req, res) {
     console.log(elsurl)
     axios.post(`${elsurl}/cell_status/_update/${req.body.nodeId}`, 
       {
         script: {
           source: `
             if (ctx._source.cellStatusdata == null) {
               ctx._source.cellStatusdata = [];
             }
             boolean found = false;
             for (int i = 0; i < ctx._source.cellStatusdata.size(); i++) {
               if (ctx._source.cellStatusdata.get(i).cellId == params.data.cellId) {
                 ctx._source.cellStatusdata.set(i, params.data);
                 found = true;
                 break;
               }
             }
             if (!found) {
               ctx._source.cellStatusdata.add(params.data);
             }
           `,
           lang: 'painless',
           params: {
             data: {
               cellId: req.body.cellId,
               cellstatus: req.body.newState,
               oldstatus: req.body.oldState
             }
           }
         },
         upsert: {
           cellStatusdata: [
             {
               cellId: req.body.cellId,
               cellstatus: req.body.newState,
               oldstatus: req.body.oldState
             }
           ]
         }
       }
     )
     .then((data) => {
       res.json("Success");
     })
     .catch((err) => {
       console.log(err);
       res.status(500).json({ error: 'An error occurred' });
     });
   });

   router.get('/run-script', async (req: Request, res: Response): Promise<void> => {
    // Replace this with the actual path to your script
    const scriptPath = '/app/nodeServer/dockerStats.sh';
  
    try {
      // Use exec to run the script and return a promise
      const data = await new Promise<string>((resolve, reject) => {
        exec(`bash ${scriptPath}`, (error: Error | null, stdout: string, stderr: string) => {
          if (error) {
            reject(`Error executing script: ${stderr}`);
          } else {
            resolve(stdout);
          }
        });
      });
  
      res.json({ message: "Success", output: data });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while running the script', details: err });
    }
  });
  
router.post('/networkelement', function(req, res) {
    console.log(elsurl);
    axios.post(`${elsurl}/networkelement-connection-v7/_update/${req.body.nodeId}`,
      {
        script: {
          source: `
            ctx._source.DeviceStatus = params.newState;
          `,
          lang: 'painless',
          params: {
            newState: req.body.newState
          }
        },
        upsert: {
            DeviceStatus: req.body.newState
        }
      }
    )
    .then((data) => {
      res.json("Success");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'An error occurred' });
    });
});
   
 
 module.exports = router;
 
 
