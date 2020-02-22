const express = require("express");
const app = express();

//imported __Router
const actionRouter = require("./Routers/actionRouter");
const projectRouter = require("./Routers/projectRouter");

app.use(express.json());

// app.use("/api", actionRouter);
app.use("/api", projectRouter);

app.get("/", (req, res) => {
  res.send(`<h2>Hey-o, Lambda! Working API!<h2>`);
});

module.exports = app;
