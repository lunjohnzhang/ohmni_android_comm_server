var express = require('express');
var port = process.env.PORT || 3000;
var app = express();
app.get('/', function (req, res) {
    res.send(JSON.stringify({ Hello: 'World'}));
});
app.get('/android', function (req, res) {
    console.log("message gotten from android");
    console.log(req);
    res.send(JSON.stringify(
        {
            Android: "message gotten"
        }));
});
app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
});