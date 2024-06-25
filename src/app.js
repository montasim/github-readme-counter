const express = require("express");
const countController = require("./countController");
const app = express();

// get the image
app.get("/count.svg", countController);

module.exports = app;
