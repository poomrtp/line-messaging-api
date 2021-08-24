'use strict';

const line = require('@line/bot-sdk');
const express = require('express');

// create LINE SDK config from env variables
const config = {
  channelAccessToken: 'tetl1NRl/1ump3bra4CmKSUx46jkjDZtlzzopBByP7o//wuavk66gOj/te/la9sr+A8rQhgxhlH/8+OjsAp4jLHYaQR+uybN2wQNEblDU3YKrjOIvA1VRghmuXWfYmZ5aGPkaR4m154DGDMNJoMi5QdB04t89/1O/w1cDnyilFU=',
  channelSecret: '852cc5085c7278c6c46faaddca020dff',
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// event handler
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  // create a echoing text message
  const echo = { type: 'text', text: event.message.text };

  // use reply API
  return client.replyMessage(event.replyToken, echo);
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});