const express = require("express");

const middleware = require("../config/middleware.js");

const server = express();

middleware(server);

module.exports = server;
