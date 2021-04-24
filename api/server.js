require("dotenv").config({ path: __dirname + "/../.env" });
const express = require("express");
const app = express();
const port = 8080;
const accountSid = process.env["A_SID"];
const authToken = process.env["AUTH_TOKEN"];
const client = require("twilio")(accountSid, authToken);

/**
 * @purpose: send a message to a phone number saying that you booked an appointment
 * @queryParam: message (string, required)
 * @queryParam: phone (string, required, must be valid phone number)
 */
app.get("/", (req, res) => {
  const message = req.query.message;
  if (message === undefined) {
    res.send("message nil");
    return;
  }
  const phone = req.query.phone;
  if (phone === undefined) {
    res.send("phone nil");
    return;
  }
  const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  if (!re.test(phone)) {
    res.send("phone invalid");
    return;
  }

  client.messages
    .create({
      body: message,
      from: "+14422464745",
      to: phone,
    })
    .then((message) => console.log(message.sid))
    .catch((err) => console.log(err));

  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
