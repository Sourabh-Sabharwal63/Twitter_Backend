const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { Port } = require("./configs/serverConfig");
const { dbStart } = require("./configs/dbConfig");
const Api = require("./routes");
const passport = require("passport");
const { passportAuth } = require("./configs/jwtMiddleware");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
passportAuth(passport);

async function startServer() {
  await dbStart();

  app.use("/tweet", Api);

  app.listen(Port, async () => {
    console.log(`Server start at port ${Port}`);
  });
}

startServer();
