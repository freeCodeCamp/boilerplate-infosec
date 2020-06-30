const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
// DO NOT EDIT ABOVE THIS LINE
// Exercise 12
// Require BCrypt here

const myPlaintextPassword = "freeCodeCamp";
const saltRounds = 12;

// Exercise 13
//START_ASYNC

//END_ASYNC

// Exercise 14
//START_SYNC

//END_SYNC

// DO NOT EDIT UNDER THIS LINE
app.use(function(req, res, next) {
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, content-type, Accept"
  });
  app.disable("x-powered-by");
  next();
});

app.get("/file/*?", function(req, res, next) {
  if (req.params[0] === ".env") {
    return next({ status: 401, message: "ACCESS DENIED" });
  }
  fs.readFile(path.join(__dirname, req.params[0]), function(err, data) {
    if (err) {
      return next(err);
    }
    res.type("txt").send(data.toString());
  });
});

const main = require("./myApp.js");
app.get("/app-info", function(req, res) {
  // list middlewares mounted on the '/' camper's app
  const appMainRouteStack = main._router.stack
    .filter(s => s.path === "")
    .map(l => l.name)
    // filter out express default middlewares
    .filter(
      n => !(n === "query" || n === "expressInit" || n === "serveStatic")
    );

  // filter out CORS Headers
  const hs = Object.keys(res._headers).filter(
    h => !h.match(/^access-control-\w+/)
  );
  const hObj = {};
  hs.forEach(h => {
    hObj[h] = res._headers[h];
  });
  delete res._headers["strict-transport-security"];
  res.json({ headers: hObj, appStack: appMainRouteStack });
});

app.get("/package.json", function(req, res, next) {
  fs.readFile(__dirname + "/package.json", function(err, data) {
    if (err) return next(err);
    res.type("txt").send(data.toString());
  });
});

app.get("/server.js", function(req, res, next) {
  fs.readFile(__dirname + "/server.js", function(err, data) {
    if (err) return next(err);
    res.type("txt").send(data.toString());
  });
});

app.use(function(req, res, next) {
  res
    .status(404)
    .type("txt")
    .send("Not Found");
});

module.exports = app;
