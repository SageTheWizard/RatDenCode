const http = require('express');
const bodyParser = require('body-parser');

const DOM1_IP = '192.168.1.12';
const PORT = 8888;

const express = require('express');
const app = express();

app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.status = 200
    res.json({ "despa": "cito" })
});

app.listen(PORT, DOM1_IP, (err) => {
    if (err) {
        throw err;
    }
    console.log('Node Endpoints working :)');
});