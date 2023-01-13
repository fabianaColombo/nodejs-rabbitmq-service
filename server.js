const express = require("express");
const app = express();
const port = process.env.PORT || 4000;

const sendMessage = require("./routes/sendMessage");

app.use(express.json());

app.get("/", (req, res) => res.send("Message sender running..."));
app.use("/api", sendMessage);

app.listen(port, function () {
  console.log("Server started on port: " + port);
});
