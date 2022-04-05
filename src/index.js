const express = require("express");
const env = require("dotenv");
const bodyParser = require("body-parser");
const { health } = require("./routes/health.route");
const { authRouter } = require("./routes/credential.route");

env.config();
const app = express();

const port = process.env.PORT || 4000;
const host = process.env.HOST || "localhost";
app.use(bodyParser.json());
app.use("/health", health);
app.use("/login", authRouter);

app.listen(port, host, () => {
  // eslint-disable-next-line no-console
  console.log(`server listening at http://${host}:${port}`);
});
