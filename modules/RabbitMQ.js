const amqp = require("amqplib/callback_api");

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
        var queue = "hello";
        var msg = "Hello world";

        channel.assertQueue(queue, {
          durable: false,
        });

        channel.sendToQueue(queue, Buffer.from(msg));
        console.log(" [x] Sent %s", msg);
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

        var queue = "hello";

        channel.assertQueue(queue, {
          durable: false,
        });

        console.log(
          " [*] Waiting for messages in %s. To exit press CTRL+C",
          queue
        );

        channel.consume(
          queue,
          function (msg) {
            console.log(" [x] Received %s", msg.content.toString());
          },
          {
            noAck: true,
          }
        );
      });
    });
  }
}

module.exports = RabbitMQ;