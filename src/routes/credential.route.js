const express = require("express");

const authRouter = express.Router();

const handler = require("../handlers/authentication.handler");

authRouter.post("/", handler.postCredential);
authRouter.post("/validate", handler.validateCredentials);
authRouter.get("/", handler.getCredentials);
authRouter.get("/validateToken", handler.validateToken);
module.exports = {
  authRouter,
};
