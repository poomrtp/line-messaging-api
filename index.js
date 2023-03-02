"use strict";

const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");
const line = require("@line/bot-sdk");
require("dotenv").config();

const app = express();
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const channelAccessToken = process.env.ACCESS_TOKEN;
console.log({ channelAccessToken });

const client = new line.Client({
  channelAccessToken: channelAccessToken,
});

app.post("/send-message", async (req, res) => {
  console.log(req.body);
  const broadcastRes = await client.broadcast({
    type: "text",
    text: `Message: ${req.body.message}`,
  });
  console.log(broadcastRes);
  res.status(200).json(broadcastRes);
});

// listen on port
const port = process.env.PORT || 4011;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
module.exports = app;
