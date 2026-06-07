// ── Setup ──────────────────────────────────────────
require('dotenv').config()
const express = require('express')
const cors    = require('cors')
const twilio  = require('twilio')

const app    = express()
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// ── In-memory logs ──────────────────────────────────
const callLogs = []
const smsLogs  = []
const bugLogs = []

// ── 1. Make a call ─────────────────────────────────
app.post('/api/call', async (req, res) => {
  const { to } = req.body

  try {
    const call = await client.calls.create({
      to:   to,
      from: process.env.TWILIO_PHONE_NUMBER,
      twiml: '<Response><Say>Hello! This is your support simulator.</Say></Response>',
      statusCallback: `${process.env.NGROK_URL}/webhook/call-status`,
      statusCallbackMethod: 'POST',
      statusCallbackEvent: ['initiated', 'ringing', 'answered', 'completed']
    })

    const log = { sid: call.sid, to, status: call.status, time: new Date() }
    callLogs.push(log)

    res.json({ success: true, data: log })

  } catch (err) {
    console.log('Twilio call error:', err.message)
    res.json({ success: false, error: err.message })
  }
})

// ── 2. Send SMS ─────────────────────────────────────
app.post('/api/sms', async (req, res) => {
  const { to, message } = req.body

  try {
    const sms = await client.messages.create({
      body: message,
      to:   to,
      from: process.env.TWILIO_PHONE_NUMBER,
      statusCallback: `${process.env.NGROK_URL}/webhook/sms-status`
    })

    const log = { sid: sms.sid, to, message, status: sms.status, time: new Date() }
    smsLogs.push(log)

    res.json({ success: true, data: log })

  } catch (err) {
    console.log('Twilio SMS error:', err.message)
    res.json({ success: false, error: err.message })
  }
})

// ── 3. Get all logs ─────────────────────────────────
app.get('/api/logs', (req, res) => {
  res.json({
    calls: callLogs,
    sms:   smsLogs
  })
})

// ── 4. Submit a bug ─────────────────────────────────
app.post('/api/bugs', (req, res) => {
  console.log('Received bug report:', req.body)
  const { title, severity, description } = req.body

  // video map — you'll replace these URLs with your real Loom links later
  const videoMap = {
    "Invalid 'To' Phone Number":   'https://www.loom.com/share/824325de61844eae8872e0955181a588',
    'Authentication Failed':     'https://www.loom.com/share/f800d06a58044c6c8a2fa7ae94f8c70d',
    'TwiML Parse Error':     'https://www.loom.com/share/36723f6c464341c9a5a95478bb8f03bd',
    'Webhook Not Firing': 'https://www.loom.com/share/b55dbbda5f224359ada122a2c40c0cdb',
  }

  const bug = {
    id:          bugLogs.length + 1,
    title,
    severity,
    description,
    videoUrl:    videoMap[title] || 'https://loom.com/share/folder/e19d7059506d436c860a21637b96a8cc',
    time:        new Date()
  }

  bugLogs.push(bug)
  res.json({ success: true, data: bug })
})


// ── 5. Call status webhook ──────────────────────────
app.post('/webhook/call-status', (req, res) => {
  const { CallSid, CallStatus, Duration } = req.body
  console.log(`Call ${CallSid} → ${CallStatus} (duration: ${Duration}s)`)

  const call = callLogs.find(c => c.sid === CallSid)
  if (call) {
    call.status   = CallStatus
    call.duration = Duration
  }

  res.sendStatus(200)
})

// ── 6. SMS status webhook ───────────────────────────
app.post('/webhook/sms-status', (req, res) => {
  const { MessageSid, MessageStatus } = req.body
  console.log(`SMS ${MessageSid} → ${MessageStatus}`)

  const sms = smsLogs.find(s => s.sid === MessageSid)
  if (sms) {
    sms.status = MessageStatus
  }

  res.sendStatus(200)
})

// ── Start server ────────────────────────────────────
const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))