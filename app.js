var http = require('http');
const express = require('express');
const enableWs = require('express-ws')
var overlayWs = null;
// var ws = require('websocket'); 

// set up http server
var port = process.env.PORT || 3000;
const app = express();

enableWs(app)

app.ws('/echo', (ws, req) => {
    ws.on('message', msg => {
        console.log("message from client: " + msg);
        overlayWs = ws;
        const message = "Connection to overlay established"
        console.log(message);
        ws.send(message);
    });

    // called when the connection is closed
    ws.on('close', () => {
        console.log('Socket connection closed');
    });
})


app.get('/', function (req, res) {
    res.send(JSON.stringify({ Hello: 'World'}));
});
app.post('/android', function (req, res) {
    console.log("message gotten from android");
    console.log(req);
    res.send(JSON.stringify(
        {
            server: "message gotten"
        }));
    try {
        overlayWs.send("gotten message from Android and I am forwarding the message to you");
    } catch (error) {
        console.log("Send websocket message failed");
    }
});


app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
});
