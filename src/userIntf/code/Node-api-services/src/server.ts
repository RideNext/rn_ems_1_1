
 /***
  * ################################################################################################
  * #                                                                                              #
  * #   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd]. All rights  reserved         #
  * #                                                                                              #
  * ################################################################################################
 ****/

import express, { Application } from 'express';
var fileupload = require("express-fileupload");

import cors from  'cors';

const app: Application = express();

const PORT = process.env.PORT || 3005;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(fileupload());
app.use('/proxyapi', require('./routes/myproxy'));

app.listen(PORT, () => console.log(`Express Server started on ${PORT}`));
