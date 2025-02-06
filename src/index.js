const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { Port } = require("./configs/serverConfig");
const { dbStart } = require("./configs/dbConfig");
const Api = require("./routes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


async function startServer() {
  
  await dbStart();

  app.use("/tweet", Api);

  app.listen(Port, async () => {
    console.log(`Server start at port ${Port}`);
  });

 
}

startServer();
