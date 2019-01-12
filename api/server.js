const express = require("express");

const configureMiddleware = require("../config/middleware.js");
const projectsRouter = require("../projects/projectsRouter.js");

const server = express()





server.use("/projects", projectsRouter);


configureMiddleware(server);



module.exports = server;