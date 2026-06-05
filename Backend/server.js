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

// ── In-memory logs (no database needed) ────────────
const callLogs = []
const smsLogs  = []
const bugLogs  = []

// ── 1. Make a call ─────────────────────────────────

app.post('/api/call', async (req, res) => {
    console.log('call endpoint hit', req.body)
  const { to } = req.body

  try {
    const call = await client.calls.create({
      to:   to,
      from: process.env.TWILIO_PHONE_NUMBER,
      twiml: '<Response><Say>Hello! This is your support simulator.</Say></Response>',
      statusCallback: 'https://shredder-designate-arrest.ngrok-free.dev/webhook/call-status',
  statusCallbackMethod: 'POST'
    })

    const log = { sid: call.sid, to, status: call.status, time: new Date() }
    callLogs.push(log)

    res.json({ success: true, data: log })

  }  catch (err) {
    console.log('Twilio error:', err.message)
    res.json({ success: false, error: err.message })
  }
})
// ── 2. Send SMS ─────────────────────────────────────
app.post('/api/sms', async (req, res) => {
    console.log('sms endpoint hit', req.body)
  const { to, message } = req.body

  try {
    const sms = await client.messages.create({
        
      body: message,
      to:   to,
      from: process.env.TWILIO_PHONE_NUMBER,
      statusCallback: 'https://shredder-designate-arrest.ngrok-free.dev/webhook/sms-status'

    })

    const log = { sid: sms.sid, to, message, status: sms.status, time: new Date() }
    smsLogs.push(log)

    res.json({ success: true, data: log })

  }  catch (err) {
  console.log('SMS error:', err.message)
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
  const { title, category, severity, description } = req.body

  const videoMap = {
    'Voice':   'https://loom.com/your-voice-video',
    'SMS':     'https://loom.com/your-sms-video',
    'API':     'https://loom.com/your-api-video',
    'Webhook': 'https://loom.com/your-webhook-video',
  }

  const bug = {
    id:       bugLogs.length + 1,
    title,
    category,
    severity,
    description,
    videoUrl: videoMap[category] || 'https://loom.com/general',
    time:     new Date()
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

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))