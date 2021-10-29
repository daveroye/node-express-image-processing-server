const express = require("express");
const path = require("path");
const router = require("./src/router");

const app = express();

const pathToIndex = path.resolve(__dirname, "../client/index.html");

app.use(route="/", router);

app.use(express.static(path.resolve(__dirname, "uploads")));

app.use(route="/*", (request, response) => {
    response.sendFile(pathToIndex);
});
module.exports = app;
