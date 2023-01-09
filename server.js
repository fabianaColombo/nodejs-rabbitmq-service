const express = require("express");
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, function () {
  console.log("Server started on port: " + port);
});