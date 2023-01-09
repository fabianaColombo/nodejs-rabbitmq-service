const express = require("express");
const { Router } = express;
const router = new Router();
const RabbitMQ = require("../modules/RabbitMQ");

router.get("/send-message", async (req, res) => {
  try {

    const broker = new RabbitMQ();
    const send = await broker.sendMessage();

    console.log("what is send", send);
    
    return res.status(202).send("hello");
  } catch (e) {
    return res.status(500).send({ status: "Internal Server Error" });
  }
});

module.exports = router;
