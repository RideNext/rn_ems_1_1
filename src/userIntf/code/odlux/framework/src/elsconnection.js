var elasticsearch = require('elasticsearch');
var  baseurl =  window.configs.elsbaseurl;

var ELSclient = new elasticsearch.Client({
    host: baseurl,
    requestTimeout: Infinity, 
    keepAlive: true
});
module.exports = ELSclient;
