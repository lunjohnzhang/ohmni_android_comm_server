var http = require('http');
const express = require('express');
const enableWs = require('express-ws')
var bodyParser = require('body-parser')

var overlayWs = null;
// var ws = require('websocket'); 

// set up http server
var port = process.env.PORT || 3000;
const app = express();

// configure the server
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
enableWs(app)

app.ws('/echo', (ws, req) => {
    ws.on('message', msg => {
        console.log("message from client: " + msg);
        overlayWs = ws;
        const message = "Connection to overlay established"
        console.log(message);
        ws.send(message);
    });
})


app.get('/', function (req, res) {
    res.send(JSON.stringify({ Hello: 'World'}));
});
app.post('/android', function (req, res) {
    console.log("message gotten from android");

    console.log(req.body);
    res.send(JSON.stringify(req.body));

    // forward the message from Android app to the overlay
    try {
        overlayWs.send(JSON.stringify(req.body));
    } catch (error) {
        console.log("Send websocket message failed");
    }
});


app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
});
