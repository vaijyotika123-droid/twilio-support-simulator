import { useState } from 'react'
import axios from 'axios'

const API = 'http://localhost:3001'

export default function CallPage() {
  const [to, setTo]           = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult]   = useState(null)
  const [error, setError]     = useState(null)

  const makeCall = async () => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const res = await axios.post(`${API}/api/call`, { to })
      setResult(res.data.data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 style={{ color: '#1A1A2E', marginBottom: '30px' }}>Initiate Call</h2>

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
      maxWidth: '350px',
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

       
        <button
          onClick={makeCall}
          disabled={loading || !to}
          style={{ background: '#F22F46', color: 'white', border: 'none', padding: '12px 30px', borderRadius: '6px', fontSize: '15px', cursor: 'pointer' }}
        >
          {loading ? 'Calling...' : 'Initiate Call'}
        </button>

        {/* Success */}
        {result && (
          <div style={{ marginTop: '20px', padding: '15px', background: '#D5F5E3', borderRadius: '6px' }}>
            <p>✅ Call initiated!</p>
            <p><b>SID:</b> {result.sid}</p>
            <p><b>Status:</b> {result.status}</p>
            <p><b>Time:</b> {new Date(result.time).toLocaleTimeString()}</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div style={{ marginTop: '20px', padding: '15px', background: '#FDECEA', borderRadius: '6px' }}>
            <p>❌ {error}</p>
          </div>
        )}
      </div>
    
  )
}