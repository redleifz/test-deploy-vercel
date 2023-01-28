const express = require("express");
const app = express();
const port = 5000;
require("dotenv").config();

app.get("/", (req, res) => {
    res.send('Hi')
});

app.post("/api/name", (req, res) => {
    let json = req.body
    res.send(`Hi : ${json.name} `)
});




app.post("/api/sendline", (req, res) => {
  let json = req.body;

  request(
    {
      method: "POST",
      uri: "https://notify-api.line.me/api/notify",
      header: {
        "Content-Type": "multipart/form-data",
      },
      auth: {
        bearer: process.env.LineToken,
      },
      form: {
        // message: `Message from : ${json.name} `
        message: `Message from : ${json.name} , Phone Number : ${json.phoneNumber} , Email : ${json.email} , Subject : ${json.subject} , Message : ${json.message} `,
      },
    },
    (err, httpResponse, body) => {
      if (err) {
        res.send(err);
      } else {
        res.send(body);
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
