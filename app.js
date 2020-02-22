const express = require("express");
const app = express();

//imported __Router

app.use(express.json());

app.use("/api", actionRouter);
app.use("api/", projectRouter);

module.exports = app;
