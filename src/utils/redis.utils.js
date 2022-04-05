const Redis = require("ioredis");
// Create a Redis instance.
// By default, it will connect to localhost:6379.
const redis = new Redis();

redis.set("mykey", "value"); // Returns a promise which resolves to "OK" when the command succeeds.

const setKey = (key, value) => {
  redis.set(key, value, "EX", 360);
};

const getValue = async (key) => {
  const username = await redis.get(key);
  return username;
};

module.exports = {
  setKey,
  getValue,
};
