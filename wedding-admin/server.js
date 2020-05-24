var express = require('express');
var proxy = require('http-proxy-middleware');

var app = express();

app.use('/manage', proxy({target: 'http://192.168.1.101:3300', changeOrigin: true}));
app.listen(3000);
