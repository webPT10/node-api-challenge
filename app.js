const express = require("express");
const app = express();

//imported __Router
const actionRouter = require('./Routers/actionRouter');
const projectRouter = require('./Routers/projectRouter');

app.use(express.json());

app.use("/api", actionRouter);
app.use("api/", projectRouter);

module.exports = app;
