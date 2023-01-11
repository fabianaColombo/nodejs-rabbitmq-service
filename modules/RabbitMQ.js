const amqp = require("amqplib/callback_api");
const xmlJs = require("xml-js");

class RabbitMQ {
  constructor() {}

  async sendMessage() {
    amqp.connect("amqp://localhost", function (error0, connection) {
      if (error0) {
        throw error0;
      }
      connection.createChannel(function (error1, channel) {
        if (error1) {
          throw error1;
        }
        var queue = "hello2";
        var msg = process.argv.slice(2).join(' ') || "Hello World!.";

        channel.assertQueue(queue, {
          durable: true,
        });

        channel.sendToQueue(queue, Buffer.from(msg), { persistent: true });
        console.log(" [x] Sent %s", msg);
        //process.stdout.write(` [x] Sent ${msg}`);
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

        var queue = "hello2";

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
            var secs = msg.content.toString().split(".").length - 1;

            console.log(" [x] Received %s", msg.content.toString());
            setTimeout(function () {
              channel.ack(msg);
              console.log(" [x] Done");
            }, secs * 10000);
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
