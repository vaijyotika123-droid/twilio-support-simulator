require('dotenv').config()
const twilio = require('twilio')

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

client.calls.create({
  to: '+919511562492',       // your verified personal number
  from: process.env.TWILIO_PHONE_NUMBER,
  twiml: '<Response><Say>Hello! Your Twilio setup is working.</Say></Response>'
})
.then(call => console.log('✅ Call initiated! SID:', call.sid))
.catch(err => console.log('❌ Error:', err.message))