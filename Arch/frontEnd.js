const bodyParser = require('body-parser');
const fs = require('fs')
const express = require('express');

const DOM1_IP = '192.168.1.12';
const INDEX_PATH = "./webgui/index.html"
const ZAMZAM_INDEX_PATH = "./webgui/index.html"

const PORT = 8888;
const app = express();

app.use(bodyParser.json());

app.get('/', function (req, res) {
    webpageURL = fs.readFileSync(INDEX_PATH)
    res.status(200)
    res.contentType("text/html")
    res.send(webpageURL)
});
app.get('/zomboid/', function (req, res) {
    webpageURL = fs.readFileSync(ZAMZAM_INDEX_PATH)
    res.status(200)
    res.contentType("text/html")
    res.send(webpageURL)
});

app.listen(PORT, DOM1_IP, (err) => {
    if (err) {
        throw err;
    }
    console.log('Node Endpoints working :)');
});