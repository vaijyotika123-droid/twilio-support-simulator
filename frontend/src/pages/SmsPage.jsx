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
      const res = await axios.post(`${API}/api/sms`, { to, message })
      setResult(res.data.data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }


  return (
    <div>
      <h2 style={{ color: '#1A1A2E', marginBottom: '30px' }}>Send SMS</h2>

      <div style={{ marginBottom: '24px' }}>
  <label
    style={{
      display: 'block',
      marginBottom: '8px',
      fontSize: '14px',
      fontWeight: '600',
      color: '#111827'
    }}
  >
    Phone Number
  </label>

  <input
    type="text"
    placeholder="+91XXXXXXXXXX"
    value={to}
    onChange={e => setTo(e.target.value)}
    style={{
      width: '50%',
      maxWidth: '450px',
      padding: '12px 16px',
      border: '1px solid #D1D5DB',
      borderRadius: '8px',
      fontSize: '14px',
      color: '#111827',
      backgroundColor: '#FFFFFF',
      boxSizing: 'border-box',
      colorScheme: 'light'
    }}
    />
  </div>

        <label
  style={{
    display: 'block',
    marginBottom: '8px',
    fontWeight: '600',
    fontSize: '14px',
    color: '#111827'
  }}
>
  Message
</label>

<textarea
  placeholder="Type your message..."
  value={message}
  onChange={e => setMessage(e.target.value)}
  rows={5}
  style={{
    width: '50%',
    maxWidth: '450px',
    padding: '12px',
    fontSize: '14px',
    color: '#111827',
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    border: '1px solid #D1D5DB',
    colorScheme: 'light',
    boxSizing: 'border-box',
    resize: 'vertical'
  }}
/>

<p
  style={{
    fontSize: '12px',
    color: message.length > 160 ? '#DC2626' : '#6B7280',
    marginTop: '6px',
    marginBottom: '20px'
  }}
>
  {message.length}/160 characters
</p>

      
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
    
  )
}