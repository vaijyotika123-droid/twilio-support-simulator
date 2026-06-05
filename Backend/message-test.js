// Download the helper library from https://www.twilio.com/docs/node/install
require('dotenv').config()
const twilio = require('twilio')

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

async function createMessage() {
  const message = await client.messages.create({
    body: "You Did It! I am proud of you! This is a test message from Twilio.",
    from: process.env.TWILIO_PHONE_NUMBER,
    to: "+919511562492",
  });

  console.log(message.body);
}

createMessage();