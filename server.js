var express = require("express"),
    request = require("request"),
    morgan = require("morgan");

var app = express();
var logger = morgan("combined");
app.use(logger);
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.post('/*', function (req, res) {
    req.pipe(request.post("http://pitstop.dilimanlabs.com"+req.url, {form: req.body})).pipe(res);
});

app.get('/*', function (req, res) {
    req.pipe(request.post("http://pitstop.dilimanlabs.com"+req.url)).pipe(res);
});

app.listen(5050);

console.log("Magic happens at 5050...");