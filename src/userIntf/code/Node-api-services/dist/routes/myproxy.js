"use strict";
/***
 * ################################################################################################
 * #                                                                                              #
 * #   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd]. All rights  reserved         #
 * #                                                                                              #
 * ################################################################################################
****/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const https_1 = __importDefault(require("https"));
const path_1 = __importDefault(require("path"));
const SFTPClient = require('ssh2-sftp-client');
const { Kafka } = require('kafkajs');
const fs_1 = __importDefault(require("fs"));
const child_process_1 = require("child_process");
const router = express_1.default.Router();
const baseurl = 'https://identity:8463';
const elsurl = 'http://persistence:9200';
const config = {
    httpsAgent: new https_1.default.Agent({
        rejectUnauthorized: false
    })
};
const instance = axios_1.default.create({
    httpsAgent: new https_1.default.Agent({
        rejectUnauthorized: false
    })
});
// Configure Kafka
const kafka = new Kafka({
    clientId: 'MNSMessages',
    brokers: [`${process.env.NMS_KAFKA_IP}:9092`],
});
// get Test Data
router.get('/test', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var response = {
        "employee": {
            "name": "TestUser",
            "salary": 56000,
            "married": true
        }
    };
    res.json(response);
}));
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
router.post('/SendMessageToNMS', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const message = req.body.message;
    var msg = JSON.stringify(message);
    const topic = req.body.topic;
    console.log(process.env.NMS_KAFKA_IP);
    console.log(req.body);
    console.log(producer);
    try {
        yield producer.connect();
        yield producer.send({
            topic: topic,
            messages: [{ value: msg }],
        });
        res.status(200).send('Message sent to Kafka topic');
        yield producer.disconnect();
    }
    catch (error) {
        res.status(500).send('Error sending message to Kafka topic');
        yield producer.disconnect();
    }
}));
///Update Node related details
router.post('/updateDeviceDetails', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const softWareVer = req.body.softwareVersion;
    const serialNumber = req.body.serialNumber;
    const nodeId = req.body.nodeId;
    const vendorDetails = req.body.vendorDetails;
    const modelNumber = req.body.modelNumber;
    axios_1.default.post(elsurl + '/networkelement-connection-v7/_update_by_query?conflicts=proceed', {
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
                    "software-version": softWareVer,
                    "serial-number": serialNumber,
                    "vendor-details": vendorDetails,
                    "model-number": modelNumber,
                }
            }
        }
    }).then(({ data }) => {
        //  console.log("setStartupConfigStatus updates is : "+ data.updated);
        res.json(data);
    }).catch((error) => {
        console.error(error);
    });
}));
router.get('/getconnectionlistdata/', function (req, res) {
    axios_1.default.get(elsurl + '/networkelement-connection-v7/_count').then(({ data }) => {
        const fieldsToReturn = ['is-required', 'node-id', 'core-model-capability', 'port', 'device-type', 'host', 'id', 'status', 'software-version',
            'serial-number', 'vendor-details', 'model-number', 'HeartBeatStatus', 'DeviceStatus', "password", "tls-key"
        ];
        axios_1.default.get(`${elsurl}/networkelement-connection-v7/_search`, {
            params: {
                size: data.count,
                _source: fieldsToReturn.join(','), // Specify which fields to return
            }
        }).then(({ data }) => {
            res.json(data || null);
        });
    }).catch((error) => {
        console.error(error);
        res.json("error");
    });
});
//Get Request from connectionlog - v7 index data
router.get('/getconnectionloglistdata/', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const countResponse = yield axios_1.default.get(elsurl + '/connectionlog-v7/_count');
            const dataResponse = yield axios_1.default.get(`${elsurl}/connectionlog-v7/_search`, {
                params: {
                    size: countResponse.data.count,
                }
            });
            res.json(dataResponse.data || null);
        }
        catch (error) {
            console.error(error);
        }
    });
});
///Update Node related details
router.post('/updateHeartBeatStatus', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const heartBeatStatus = req.body.heartBeatStatus;
    const nodeId = req.body.nodeId;
    axios_1.default.post(elsurl + '/networkelement-connection-v7/_update_by_query?conflicts=proceed', {
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
                    "HeartBeatStatus": heartBeatStatus
                }
            }
        }
    }).then(({ data }) => {
        //  console.log("setStartupConfigStatus updates is : "+ data.updated);
        res.json(data);
    }).catch((error) => {
        console.error(error);
    });
}));
router.post('/updateDeviceDetailsToPreProvider', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const softWareVer = req.body.softwareVersion;
    const serialNumber = req.body.serialNumber;
    const nodeId = req.body.nodeId;
    const vendorDetails = req.body.vendorDetails;
    const modelNumber = req.body.modelNumber;
    axios_1.default.post(elsurl + '/pre_provider/_update_by_query?conflicts=proceed', {
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
                    "software-version": softWareVer,
                    "serial-number": serialNumber,
                    "vendor-details": vendorDetails,
                    "model-number": modelNumber,
                }
            }
        }
    }).then(({ data }) => {
        //  console.log("setStartupConfigStatus updates is : "+ data.updated);
        res.json(data);
    }).catch((error) => {
        console.error(error);
        res.status(409).send({ "err": error });
    });
}));
///Get getStartupConfigFlag Status
router.get('/getDeviceDetailsFromPreProvider/:id', function (req, res) {
    axios_1.default.post(elsurl + '/pre_provider/_search', {
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
    });
});
///Update SatrtUpConfig Stataus 
router.post('/setStartupConfigStatus', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const status = req.body.status;
    const nodeId = req.body.nodeId;
    axios_1.default.post(elsurl + '/networkelement-connection-v7/_update_by_query?conflicts=proceed', {
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
    });
}));
///Get getStartupConfigFlag Status
router.get('/getStartupConfigStatus/:id', function (req, res) {
    axios_1.default.post(elsurl + '/networkelement-connection-v7/_search', {
        query: {
            match: {
                "node-id": req.params.id,
            },
        },
    }).then(({ data }) => {
        var _a, _b, _c, _d;
        //console.log(data);
        res.json(data.hits.hits[0] && ((_a = data.hits.hits[0]) === null || _a === void 0 ? void 0 : _a._source) && ((_c = (_b = data.hits.hits[0]) === null || _b === void 0 ? void 0 : _b._source["is-start-updone"]) === null || _c === void 0 ? void 0 : _c.toLowerCase()) == "yes" ? (_d = data.hits.hits[0]) === null || _d === void 0 ? void 0 : _d._source["is-start-updone"] : "no");
    }).catch((error) => {
        console.error(error);
        res.status(500).json({
            message: 'Failed to  get StartupConfig Status',
            error: error.message,
        });
    });
});
///Get Profile Data
router.get('/getprofilemappingfile/:id', function (req, res) {
    //axios.post(elsurl + '/profilenodemapping/_search',
    axios_1.default.post(elsurl + '/pre_provider/_search', {
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
            axios_1.default.put(elsurl + '/pre_provider/')
                .then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            });
        }
    });
});
///Add or Update profile Nodefile
router.post('/AddUpdateprofileNodefile', function (req, res) {
    axios_1.default.post(elsurl + '/profilenodemapping/_search', {
        query: {
            match: {
                "NodeId": req.body.nodeid,
            },
        },
    }).then(({ data }) => {
        //console.log(data);
        if (data.hits.hits[0] && data.hits.hits[0]._source.FileName) {
            axios_1.default.post(elsurl + '/profilenodemapping/_update_by_query?conflicts=proceed', {
                "query": {
                    "match": {
                        "NodeId": req.body.nodeid,
                    }
                },
                "script": {
                    "source": "ctx._source.FileName=" + "'" + req.body.filename + "'",
                    "lang": "painless"
                }
            }).then((resupdate) => {
                console.log("profilenodemapping Update: ");
                return resupdate.data.result;
            });
        }
        else {
            axios_1.default.post(elsurl + '/profilenodemapping/_doc', {
                "FileName": req.body.filename,
                "NodeId": req.body.nodeid
            }).then((resupdate) => {
                console.log("profilenodemapping Added ");
                return resupdate.data.result;
            });
        }
    }).catch((error) => {
        // console.error(error);
        if (error.response.data.error.type && error.response.data.error.type == 'index_not_found_exception') {
            axios_1.default.put(elsurl + '/profilenodemapping/').then((res) => {
                axios_1.default.post(elsurl + '/profilenodemapping/_doc', {
                    "FileName": req.body.filename,
                    "NodeId": req.body.nodeid
                }).then((resupdate) => {
                    console.log("profilenodemapping Added ");
                    resupdate.data.result;
                });
            }).catch((err) => {
                console.log(err);
            });
        }
    });
});
///delete  profile Nodefile
router.post('/deleteProfileNodefile', function (req, res) {
    axios_1.default.post(elsurl + '/profilenodemapping/_delete_by_query', {
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
    });
});
router.post('/softwaremanagement', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch the document
        let name = null;
        let SectorID = req.body.DeviceType === "RRH" ? req.body.SectorID : "0";
        console.log("node service enetered");
        if (req.body.Event.split('_')[2] === 'download' || req.body.Event.split('_')[2] === 'install') {
            name = "download";
        }
        else {
            name = "activate";
        }
        if (((req.body.Status === 'COMPLETED' && req.body.Result === 'SUCCESS') || (req.body.Result === 'FAILED'))) {
            yield axios_1.default.post(elsurl + "/software_management/_update_by_query?conflicts=proceed", {
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
                            { match: { _id: req.body.NodeId + "_" + name + "_" + SectorID } }, // Ensures you update only the document with the specific ID
                            { match: { status: "inprogress" } } // Ensures you update only documents with status 'inprogress'
                        ]
                    }
                }
            });
        }
        const response = yield axios_1.default.get(`${elsurl}/software_management/_doc/${req.body.NodeId}_${name}_${SectorID}`);
        const { deviceType, sectorID, slot, prevversion, curversion } = response.data._source;
        // Update the document
        const updateResponse = yield axios_1.default.post(`${elsurl}/software_management/_update/${req.body.NodeId}_${name}_${SectorID}`, {
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
        console.log("response updated");
        // Create message based on the event type
        let msg = '';
        const eventType = req.body.Event.split('_')[2];
        const status = req.body.Status;
        const result = req.body.Result;
        const error_msg = req.body.Error_msg;
        if (result === 'FAILED') {
            msg = error_msg;
        }
        else if (eventType === 'download') {
            msg = `Software download ${response.data._source.release} ${status}`;
        }
        else if (eventType === 'install') {
            msg = `Software install from ${prevversion} to ${response.data._source.release.split('.')[0]} ${status}`;
        }
        else if (eventType === 'active' || eventType === 'activate') {
            msg = `Software activate from ${prevversion} to ${curversion} ${status}`;
        }
        console.log("software management logs:" + req.body.Error_msg);
        console.log("software management logs req.body :" + req.body);
        console.log("software management logs req.body.DeviceType :" + req.body.DeviceType);
        console.log("software management logs req.body.SectorID :" + req.body.SectorID);
        let randomID = Math.floor((Math.random() * 10) + 1) * 10;
        // Post to the sm_history index
        const historyResponse = yield axios_1.default.post(`${elsurl}/sm_history/_update/${req.body.NodeId}`, {
            script: {
                source: `
             if (ctx._source.history == null) {
               ctx._source.history = [];
             }
               ctx._source.history.add(params.data);`,
                lang: "painless",
                params: {
                    data: {
                        id: new Date().getTime() * 1000,
                        deviceType: req.body.DeviceType,
                        sectorID: req.body.SectorID === "NA" ? -1 : req.body.SectorID,
                        Slot: slot,
                        Event: "Software " + eventType,
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
                        id: new Date().getTime() * 1000,
                        deviceType: req.body.DeviceType,
                        sectorID: req.body.SectorID === "NA" ? -1 : req.body.SectorID,
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred during the process' });
    }
}));
///Get Profile Data
router.get('/profiledata', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield instance.get(elsurl + "/profilemanagement/_doc/_search")
        .then(({ data }) => {
        //console.log(data);
        res.json(data.hits.hits.map((hit) => hit._source));
    }).catch((error) => {
        console.error(error);
        res.status(500).json({
            message: 'Failed to get profiledata data',
            error: error.message,
        });
    });
}));
/////   Save Profile Data
router.post('/createProfiledata', (req, res) => {
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files ? req.files.file : null;
    // Use the mv() method to place the file somewhere on your server
    let filePath = path_1.default.join(__dirname, '../..', 'pnffiles', req.files.file.name);
    sampleFile.mv(filePath, function (err) {
        return __awaiter(this, void 0, void 0, function* () {
            if (err) {
                console.error(err);
                res.status(500).json({
                    message: 'Failed to create profile data',
                    error: err.message,
                });
            }
            //es.send('File uploaded!');
            const response = yield instance.post(elsurl + '/profilemanagement/_doc', {
                id: req.body.ProfileName,
                FileName: req.body.FileName,
                ProfileName: req.body.ProfileName,
                DeviceType: req.body.DeviceType
            }).then(() => {
                //console.log(data);
                res.status(200).json({
                    message: 'Profile data created successfully',
                });
            }).catch((error) => {
                console.error(error);
                res.status(500).json({
                    message: 'Failed to create profile data',
                    error: error.message,
                });
            });
        });
    });
});
/////   Update Profile Data
router.put('/updateProfiledata', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0 || (!req.body.ProfileName && req.body.ProfileName === "" || (!req.body.FileName && req.body.FileName === ""))) {
        console.log('Bad request, File,ProfileName and FileName are medatory fields');
        return res.status(400).json({
            message: 'Bad request, File,ProfileName and FileName are medatory fields'
        });
    }
    let sampleFile = req.files ? req.files.file : null;
    // Use the mv() method to place the file somewhere on your server
    let filePath = path_1.default.join(__dirname, '../..', 'pnffiles', req.files.file.name);
    sampleFile.mv(filePath, function (err) {
        return __awaiter(this, void 0, void 0, function* () {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    message: 'Failed to updated profile data',
                    error: err.message,
                });
            }
            //res.send('File uploaded!');
            const response = axios_1.default.post(elsurl + '/profilemanagement/_update_by_query', {
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
            }).catch((error) => {
                console.error(error);
                res.status(500).json({
                    message: 'Failed to updated profile data',
                    error: error.message,
                });
            });
        });
    });
});
///Delete Profile Data
router.delete('/deleteProfiledata/:ProfileName', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    axios_1.default.post(elsurl + '/profilemanagement/_delete_by_query', {
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
    }).catch((error) => {
        console.error(error);
        res.status(500).json({
            message: 'Failed to deleted profile data',
            error: error.message,
        });
    });
}));
router.get('/performancedata', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield instance.get(elsurl + '/pm_data/_doc/_search')
        .then(({ data }) => {
        //console.log(data);
        res.json(data.hits.hits.map((hit) => hit._source));
    }).catch((error) => {
        console.error(error);
        res.status(500).json({
            message: 'Failed to get performance data',
            error: error.message,
        });
    });
}));
router.get('/isNodeWhitelisted/:id', function (req, res) {
    axios_1.default.post(elsurl + '/pre_provider/_search', {
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
        res.json("error");
    });
});
router.delete('/faultcurrentdelete/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const response = yield axios_1.default.delete(elsurl + `/faultcurrent-v7/_doc/${id}`);
        // Log the response from Elasticsearch
        // console.log(response.data);
        // Send a success response back to the client
        res.status(200).json({ message: `Document with ID ${id} deleted successfully` });
    }
    catch (error) {
        // Handle errors if the delete request fails
        console.error('Error deleting document:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
//Get Request from faultlog-v7 - v7 index data
router.get('/getfaultlogdata', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield instance.get(elsurl + "/faultlog-v7/_doc/_search")
        .then(({ data }) => {
        res.json(data.hits.hits.map((hit) => hit._source));
    }).catch((error) => {
        console.error(error);
    });
}));
//get software versions compatibility data
router.get('/getsoftwareversionsdata', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield instance.get(elsurl + "/software_versions/_doc/_search")
        .then(({ data }) => {
        res.json(data.hits.hits.map((hit) => hit._source));
    }).catch((error) => {
        console.error(error);
    });
}));
router.get('/getfaultcurrentdata', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield instance.get(elsurl + "/faultcurrent-v7/_search", {
        params: {
            _source: 'severity,timestamp,node-id,counter,object-id,problem'
        }
    })
        .then(({ data }) => {
        res.json(data.hits.hits.map((hit) => hit._source));
    })
        .catch((error) => {
        console.error(error);
        res.status(500).send("Error fetching fault current data");
    });
}));
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
router.post('/gettoken', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const kcurl = baseurl + '/auth/realms/master/protocol/openid-connect/token';
    const tokenHeaders = {
        'Authorization': 'Basic ' + btoa(req.body.username + ':' + req.body.password),
        'content-type': 'application/x-www-form-urlencoded',
        'accept': 'application/json'
    };
    const response = yield instance.post(kcurl, data2, {
        headers: tokenHeaders,
    }).then(({ data }) => {
        //console.log(data);
        res.json(data);
    }).catch((error) => {
        console.error(error);
    });
}));
// Get all Users
router.post('/getusers', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenHeaders = {
        'Authorization': 'Basic ' + btoa(req.body.username + ':' + req.body.password),
        'content-type': 'application/x-www-form-urlencoded',
        'accept': 'application/json'
    };
    const kcurl = baseurl + '/auth/realms/master/protocol/openid-connect/token';
    const response = yield instance.post(kcurl, data2, {
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
    });
}));
// up load files
router.post('/upload', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files ? req.files.file : null;
    // Use the mv() method to place the file somewhere on your server
    let filePath = path_1.default.join(__dirname, '../..', 'pnffiles', req.files.file.name);
    sampleFile.mv(filePath, function (err) {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }
        res.send('File uploaded!');
    });
});
router.post('/delete', (req, res) => {
    // Use the mv() method to place the file somewhere on your server
    if (req.body.filename != "") {
        let filePath = path_1.default.join(__dirname, '../..', 'pnffiles', req.body.filename);
        fs_1.default.unlink(filePath, (err) => {
            if (err) {
                console.error('Error deleting file:', err);
                return res.status(500).send('Failed to delete the file.');
            }
            res.send('File deleted successfully.');
        });
    }
});
// down load files
router.get('/download', function (req, res) {
    const file = path_1.default.join(__dirname, '../..', 'pnffiles', req.query.fileName);
    res.download(file); // Set disposition and send it.
});
router.post('/listfiles', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sftp = new SFTPClient();
    console.log("entered");
    console.log(req.body.host);
    console.log(req.body.username);
    console.log(req.body.password);
    console.log(req.body.path);
    try {
        yield sftp.connect({
            host: req.body.host,
            port: req.body.port || 22, // default to 22 for SFTP
            username: req.body.username,
            password: req.body.password,
        });
        const list = yield sftp.list(req.body.path);
        res.json(list);
    }
    catch (error) {
        res.status(500).send(error);
    }
    finally {
        sftp.end();
    }
}));
// statechange domain 
router.post('/statechange', function (req, res) {
    console.log(elsurl);
    axios_1.default.post(`${elsurl}/cell_status/_update/${req.body.nodeId}`, {
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
    })
        .then((data) => {
        res.json("Success");
    })
        .catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'An error occurred' });
    });
});
router.get('/run-script', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Replace this with the actual path to your script
    const scriptPath = '/app/nodeServer/dockerStats.sh';
    try {
        // Use exec to run the script and return a promise
        const data = yield new Promise((resolve, reject) => {
            (0, child_process_1.exec)(`bash ${scriptPath}`, (error, stdout, stderr) => {
                if (error) {
                    reject(`Error executing script: ${stderr}`);
                }
                else {
                    resolve(stdout);
                }
            });
        });
        res.json({ message: "Success", output: data });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while running the script', details: err });
    }
}));
router.post('/networkelement', function (req, res) {
    console.log(elsurl);
    axios_1.default.post(`${elsurl}/networkelement-connection-v7/_update/${req.body.nodeId}`, {
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
    })
        .then((data) => {
        res.json("Success");
    })
        .catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'An error occurred' });
    });
});
module.exports = router;
