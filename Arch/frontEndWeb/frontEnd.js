const bodyParser = require('body-parser');
const fs = require('fs')
const express = require('express');

const DOM1_IP = '192.168.1.12';
const INDEX_PATH = "./webgui/index.html"
const ZAMZAM_INDEX_PATH = "./webgui/zomboid/index.html"

const PORT = 8888;
const app = express();

var jarvisInfo = {
    "uptime": 0
}
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// REST API --- START
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

app.post('/rest/1/jarvis/', function (req, res) {
    console.log(req.body)
    jarvisInfo["uptime"] = req.body["uptime"]
    res.status(200)
    res.send()
})

app.get('/rest/1/jarvis/', function (req, res) {
    res.status(200)
    res.contentType("application/json")
    res.send(JSON.stringify(jarvisInfo))
})
// REST API ---- END
app.listen(PORT, DOM1_IP, (err) => {
    if (err) {
        throw err;
    }
    console.log('Node Endpoints working :)');
});

function msToString(ms) {
    var d, h, m, s
    s = Math.floor(ms / 1000)
    m = Math.floor(s / 60)

}