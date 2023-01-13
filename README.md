# Message Queue Service
A microservice using RabbitMQ as a message broker to handle message queues.

Main functionalities:
- Simulates a DHCP server that returns the information of one cable modem per time (ip, mac-address and modem-type) in XML format. 
- A REST API endpoint (GET request) that calls the DHCP server, checks the validity of the MAC-address format and places the XML message in the queue.
- A consumer that continuously run (on separate server) printing queued messages and acknowledgements

## Getting Started

These instructions will cover how to start the application in development

### Prerequisities

#### General
* Node.js
* Git
* An IDE like Visual Code Studio
* Docker installed in your desktop 

###### To install Docker.

* [Windows](https://docs.docker.com/windows/started)
* [OS X](https://docs.docker.com/mac/started/)
* [Linux](https://docs.docker.com/linux/started/)


### How to run this application

Clone the repo and install the dependencies.

```bash
git clone https://github.com/fabianaColombo/nodejs-rabbitmq-service.git
cd nodejs-rabbitmq-service
```

```bash
npm install
```

Create a .env file in the root of the repository containing 

#### Locally run servers from terminal

Open 3 terminal windows:

1. Will run RabbitMQ server.
Make sure Docker desktop application is available and opened. This script runs a docker image.

```bash
npm run broker
```

2. Will run the sender server (where the GET request is) on Port 4000.

```bash
npm run sender
```

Open [http://localhost:4000](http://localhost:4000) and verify the server is running. If all is correct, you should see "Message sender running...".

3. Will run the receiver server on Port 5000.

```bash
npm run receiver
```

Open [http://localhost:5000](http://localhost:5000) and verify the server is running. If all is correct, you should see "Message receiver running...".
Your terminal window should also have print: "[*] Waiting for messages in hello2. To exit press CTRL+C"

#### Test the queue

1. Use the Postman collection provided in the documents section below.
2. Select the GET request: Trigger send message to RabbitMQ
3. Make sure the 3 servers mentioned in the section above are running and start sending requests.

- As the MAC-address returned by our fake DHCP server is random and not all of them has a valid format, the response can alternate between 202 Accepted and 400 Bad Request.
- If server fails, a 500 Internal Error will be returned.
- If the message is successfully placed in the queue (Postman displayes status 202), the sender should print <pre><code>[x] Sent "xml message"</code></pre> and receiver should print <pre><code>[x] Received "xml message"</code></pre>
- As a simulation of a slow process, there is a delay in the message consumer, if all works well, a few seconds later the receiver should acknowledge and print <pre><code>[x] Done </code></pre>

## API Documentation

* [Postman Collection](https://www.postman.com/gold-sunset-933698/workspace/fabiana-personal-workspace/collection/14882644-0d3e8e01-25a7-4897-9be9-efa9df177735?action=share&creator=14882644)
* [Github Repository](https://github.com/fabianaColombo/nodejs-rabbitmq-service)


## Author

* **Fabiana Colombo** - *Orders Service* - [Github - fabianaColombo](https://github.com/fabianaColombo)

