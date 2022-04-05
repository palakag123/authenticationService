const { createHmac } = require("crypto");
const env = require("dotenv");

env.config();

const createToken = (user) => {
  const secret = process.env.SECRET;
  const hash = createHmac("sha256", secret).update(user).digest("hex");
  return hash;
};

module.exports = {
  createToken,
};
