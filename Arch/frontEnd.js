const http = require('express');

const DOM1_IP = '192.168.1.12';
const PORT = 8888;

const express = require('express');
const app = express();

//pre-flight requests
app.options('/', function (req, res) {
    res.send(200);
});

app.listen(PORT, DOM1_IP, (err) => {
    if (err) {
        throw err;
    }
    console.log('Node Endpoints working :)');
});