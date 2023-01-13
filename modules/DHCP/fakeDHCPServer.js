const networkData = require("./dummyNetworkData");
const xmlJs = require("xml-js");

class DHCP {
  constructor() {}

  getMacAddress() {
    const response =
      networkData[Math.floor(Math.random() * networkData.length)];

    const options = { compact: true, ignoreComment: true, spaces: 4 };
    
    const xmlMessage = xmlJs.json2xml(
      {
        _declaration: { _attributes: { version: "1.0", encoding: "utf-8" } },
        modem: response,
      },
      options
    );
    return xmlMessage;
  }
}

module.exports = DHCP;
