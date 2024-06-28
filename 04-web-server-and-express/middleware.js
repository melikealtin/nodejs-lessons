const express = require('express');
const app = express();

function logRequest(req, res, next) {
    console.log("logRequest middleware: request received");
    next();
}

function addRequestTime(req, res, next) {
    console.log("addRequestTime middleware");
    req.time = Date.now();
    next();
}

function handleRequest(req, res) {
    console.log("handleRequest middleware: processing request");
    console.log("root route " + req.time);
    res.send("request completed at time: " + req.time);
}

app.use(logRequest);
app.use(addRequestTime);

console.log("starting the server...");

app.get('/', handleRequest);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
});
