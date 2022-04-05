const express = require("express");
const handler = require("../handlers/health.handler");

const health = express.Router();

health.get("/", handler.health);
module.exports = { health };
