const express = require('express')
const bodyParser = require('body-parser')

require("dotenv").config()

const cors = require('cors')({ origin: true })
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors)

const port = process.env.PORT || 3000;

const { createClient } = require("@usewaypoint/client");
const client = createClient(process.env.API_KEY_USERNAME, process.env.API_KEY_PASSWORD);

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('Base url route')
})

//send post request
app.post("/sendemail", async (req, res) => {
    try {
      var string = "0123456789"
      var otp = ""
      var length = string.length
  
      for (let a = 0; a < 6; a++) {
        otp += string[Math.floor(Math.random() * length)]
      }

      await client.emailMessages.createTemplated({
        templateId: "wptemplate_YdMDDYRf9fFvugTh",
        to: req.body.email,
        variables: {
          "code": otp
        }
      });

      res.send({
        message: otp
      })
    } catch (error) {
      res.status(400).send({ message: error.message })
    }
  })

app.listen(port, "0.0.0.0", () => {
    console.log(`Server listening on port 5000`);
});