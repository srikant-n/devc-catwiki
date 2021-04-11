require("dotenv").config();
const path = require("path");
const express = require("express");
// const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
const catRouter = require("./src/catRoutes");
const apiRouter = require("./src/apiRoutes");
const catsDao = require("./src/catDao");

const port = process.env.PORT || 5000;
const env = process.env.NODE_ENV || "development";

const app = express();
app.use(express.static(path.join(__dirname, "dist")));

const dbPath =
  env === "production"
    ? process.env.DB_PATH
    : env === "development"
    ? process.env.DB_PATH_DEV
    : process.env.DB_PATH_TEST;

app.use("/cats", catRouter);
app.use("/api", apiRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

MongoClient.connect(dbPath, { poolSize: 50, wtimeout: 2500, useNewUrlParser: true, useUnifiedTopology: true })
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async (client) => {
    await catsDao.injectDB(client);
    console.log("DB Connected");
  });

module.exports = app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
