const express = require("express");

const configureMiddleware = require("../config/middleware.js");
const projectsRouter = require("../projects/projectsRouter.js");
const actionsRouter = require("../actions/actionsRouter.js");

const server = express()


configureMiddleware(server);


server.use("/projects", projectsRouter);
server.use("/actions", actionsRouter);



module.exports = server;