// const { Redis } = require("ioredis");
const tokenUtils = require("../utils/token.utils");
const redis = require("../utils/redis.utils");
const db = require("../../models");
const InputError = require("../error/InputError");

const postCredentials = async (newCredential) => {
  await db.credentials.create({
    username: newCredential.username,
    password: newCredential.password,
  });
};

const getCredentials = async () => {
  const credentials = await db.credentials.findAll({
    attributes: ["username", "password"],
  });
  return credentials;
};

const validateCredentials = async (username = "", password = "") => {
  const user = await db.credentials.findAll({
    where: {
      username,
    },
  });
  if (user.length === 0) {
    throw new InputError("Bad request", "User does not exist", 400);
  }

  const userDetails = await db.credentials.findAll({
    where: {
      username,
      password,
    },
  });
  if (userDetails.length !== 0) {
    const token = tokenUtils.createToken(username);
    redis.setKey(token, username);
    // console.log(typeof token);
    return token;
  }
  if (userDetails.length === 0) {
    throw new InputError("not authorized", "wrong password", 401);
  }
  return "logged in";
};

const validateToken = async (token) => {
  const user = await redis.getValue(token);
  return user;
};

module.exports = {
  postCredentials,
  getCredentials,
  validateCredentials,
  validateToken,
};

// get token from user and then use that token to get username
