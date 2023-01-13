const express = require("express");
const xmlJs = require("xml-js");
const { Router } = express;
const router = new Router();
const RabbitMQ = require("../modules/RabbitMQ");
const DHCP = require("../modules/DHCP/fakeDHCPServer");

router.get("/send-message", async (req, res) => {
  try {
    /**
     * Fake call to a DHCP server returns modem data in xml.
     */
    const message = new DHCP().getMacAddress();

    const jsonMessage = xmlJs.xml2js(message, { compact: true, spaces: 4 });

    /**
     * Regex describing how mac-address should look like
     */
    const regex = new RegExp(
      /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})|([0-9a-fA-F]{4}\\.[0-9a-fA-F]{4}\\.[0-9a-fA-F]{4})$/
    );

    const macAddress = jsonMessage.modem["mac-address"]._text;

    if (regex.test(macAddress) === true) {
      const broker = new RabbitMQ();

      await broker.sendMessage(message);

      return res.status(202).send({status: "Accepted",
      message: `Successfully submitted modem to queue. MAC-address: ${macAddress}`});

    } else {
      return res
      .status(400)
      .send({
        status: "Bad Request",
        error: `Invalid MAC address: ${macAddress}`});
    }
  } catch (e) {
    return res.status(500).send({ status: "Internal Server Error" });
  }
});

module.exports = router;
