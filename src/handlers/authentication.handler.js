/* eslint-disable comma-dangle */
const services = require("../services/authentication.service");

const postCredential = async (req, res) => {
  const newCredential = {
    username: req.body.username,
    password: req.body.password,
  };
  await services.postCredentials(newCredential);
  res.send("posted").status(200);
};

const getCredentials = async (req, res) => {
  try {
    const credentials = await services.getCredentials();
    if (credentials.length === 0) {
      res.status(404).send("no credentials in list");
    }
    res.json(credentials).status(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const validateCredentials = async (req, res) => {
  // const { username } = req.body;
  // const { password } = req.body;
  const credentials = req.body;
  try {
    // const userResponse = await services.validateCredentials(
    //   credentials.username,
    //   credentials.password
    // );
    const token = await services.validateCredentials(
      credentials.username,
      credentials.password
    );
    res.header("token", token);
    res
      .json({
        token,
      })
      .status(200);
  } catch (err) {
    res.status(400).send({ "error message": err.message });
  }
};

const validateToken = async (req, res) => {
  try {
    const username = await services.validateToken(req.headers.token);
    res
      .json({
        username,
      })
      .status(200);
  } catch (err) {
    res
      .status(err.code)
      .json({ error: `there's somethong wrong! Error: ${err.message}` });
  }
};

module.exports = {
  postCredential,
  getCredentials,
  validateCredentials,
  validateToken,
};
