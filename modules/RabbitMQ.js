const amqp = require("amqplib/callback_api");

class RabbitMQ {
  constructor() {}

  async sendMessage(msg) {
    amqp.connect("amqp://localhost", function (error0, connection) {
      if (error0) {
        throw error0;
      }
      connection.createChannel(function (error1, channel) {
        if (error1) {
          throw error1;
        }
        const queue = "dhcp-notifications";
        
        channel.assertQueue(queue, {
          durable: true,
        });
        
        channel.sendToQueue(queue, Buffer.from(msg), { persistent: true });
        console.log(` [x] Sent ${msg}`);
      });
    });
  }

  async receiveMessage() {
    amqp.connect("amqp://localhost", function (error0, connection) {
      if (error0) {
        throw error0;
      }
      connection.createChannel(function (error1, channel) {
        if (error1) {
          throw error1;
        }

        const queue = "dhcp-notifications";

        channel.assertQueue(queue, {
          durable: true,
        });

        console.log(
          " [*] Waiting for messages in %s. To exit press CTRL+C",
          queue
        );

        channel.consume(
          queue,
          function (msg) {
            const secs = msg.content.toString().split(".").length - 1;

            console.log(" [x] Received %s", msg.content.toString());
            setTimeout(function () {
              channel.ack(msg);
              console.log(" [x] Done");
            }, secs * 1000);
          },
          {
            noAck: false,
          }
        );
      });
    });
  }
}

module.exports = RabbitMQ;
