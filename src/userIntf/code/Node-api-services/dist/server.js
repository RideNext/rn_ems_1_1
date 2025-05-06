"use strict";
/***
 * ################################################################################################
 * #                                                                                              #
 * #   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd]. All rights  reserved         #
 * #                                                                                              #
 * ################################################################################################
****/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var fileupload = require("express-fileupload");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3005;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(fileupload());
app.use('/proxyapi', require('./routes/myproxy'));
app.listen(PORT, () => console.log(`Express Server started on ${PORT}`));
