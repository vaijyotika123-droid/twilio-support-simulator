import { useState } from 'react'
import axios from 'axios'

const API = 'http://localhost:3001'

export default function SmsPage() {
  const [to, setTo]           = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult]   = useState(null)
  const [error, setError]     = useState(null)

  const sendSms = async () => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
        console.log('sending API message to', `${API}/api/sms`, { to, message })
      const res = await axios.post(`${API}/api/sms`, { to, message })
      setResult(res.data.data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const templates = [
    'Your ticket has been opened. We will respond within 24 hours.',
    'Your issue has been resolved. Please let us know if you need anything else.',
    'Following up on your recent support request. Is everything working?'
  ]

  return (
    <div>
      <h1 style={{ color: '#1A1A2E', marginBottom: '30px' }}>💬 Send SMS</h1>

      <div style={{ background: 'white', padding: '30px', borderRadius: '10px', maxWidth: '500px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Phone Number</label>
        <input
          type="text"
          placeholder="+91XXXXXXXXXX"
          value={to}
          onChange={e => setTo(e.target.value)}
          style={{ width: '100%', padding: '10px', fontSize: '15px', borderRadius: '6px', border: '1px solid #ddd', marginBottom: '15px' }}
        />

        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Message</label>
        <textarea
          placeholder="Type your message..."
          value={message}
          onChange={e => setMessage(e.target.value)}
          rows={4}
          style={{ width: '100%', padding: '10px', fontSize: '15px', borderRadius: '6px', border: '1px solid #ddd', marginBottom: '5px' }}
        />
        <p style={{ fontSize: '12px', color: message.length > 160 ? 'red' : '#888', marginBottom: '15px' }}>
          {message.length}/160 characters
        </p>

        {/* Templates */}
        <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>Quick Templates:</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '15px' }}>
          {templates.map((t, i) => (
            <button
              key={i}
              onClick={() => setMessage(t)}
              style={{ background: '#EEF2FF', border: 'none', padding: '8px', borderRadius: '6px', cursor: 'pointer', textAlign: 'left', fontSize: '12px' }}
            >
              {t}
            </button>
          ))}
        </div>

        <button
          onClick={sendSms}
          disabled={loading || !to || !message}
          style={{ background: '#F22F46', color: 'white', border: 'none', padding: '12px 30px', borderRadius: '6px', fontSize: '15px', cursor: 'pointer' }}
        >
          {loading ? 'Sending...' : 'Send SMS'}
        </button>

        {result && (
          <div style={{ marginTop: '20px', padding: '15px', background: '#D5F5E3', borderRadius: '6px' }}>
            <p>✅ SMS sent!</p>
            <p><b>SID:</b> {result.sid}</p>
            <p><b>Status:</b> {result.status}</p>
          </div>
        )}

        {error && (
          <div style={{ marginTop: '20px', padding: '15px', background: '#FDECEA', borderRadius: '6px' }}>
            <p>❌ {error}</p>
          </div>
        )}
      </div>
    </div>
  )
}