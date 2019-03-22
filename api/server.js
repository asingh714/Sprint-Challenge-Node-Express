const express = require("express");

const middleware = require("../config/middleware.js");
const projectsRouter = require("../projects/projects-router");
const actionsRouter = require("../actions/actions-router");


const server = express();

middleware(server);

server.use("/projects", projectsRouter);
server.use("/actions", actionsRouter);


module.exports = server;