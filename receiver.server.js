const express = require("express");
const app = express();
const port2 = process.env.PORT2 || 5000;
const RabbitMQ = require("./modules/RabbitMQ");
const messageBroker = new RabbitMQ();
messageBroker.receiveMessage();


app.listen(port2, function () {
  console.log("Server started on port: " + port2);
});