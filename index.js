'use strict'

const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')
const cors = require('cors')
const line = require('@line/bot-sdk')

const app = express()
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

const channelAccessToken = 'tetl1NRl/1ump3bra4CmKSUx46jkjDZtlzzopBByP7o//wuavk66gOj/te/la9sr+A8rQhgxhlH/8+OjsAp4jLHYaQR+uybN2wQNEblDU3YKrjOIvA1VRghmuXWfYmZ5aGPkaR4m154DGDMNJoMi5QdB04t89/1O/w1cDnyilFU='
// const userId = 'U13945b1db404eb0a165c89443456c4dd' // Poom
// const userId = 'Uaaf14f36b42c705086d031990eacdafc' // Mark
// const userId = 'U5680a895a2b295852d11e70904e52257' // Pook
const usersId = [
  { id: 'U13945b1db404eb0a165c89443456c4dd' },
  // { id: 'Uaaf14f36b42c705086d031990eacdafc' },
  // { id: 'U5680a895a2b295852d11e70904e52257' },
]


const client = new line.Client({
  channelAccessToken: channelAccessToken
});

app.post('/send-message', (req, res) => {
  console.log(req.body)
  // send all user list
  usersId.forEach((userId, index) => {
    const message = {
      type: 'text',
      text: `No:${++index} Message: ${req.body.message}`
    }
    client.pushMessage(userId.id, message)
  })
})

// listen on port
const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log(`listening on ${port}`)
})
module.exports = app
