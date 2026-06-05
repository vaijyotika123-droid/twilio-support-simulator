import { useState } from 'react'
import axios from 'axios'

const API = 'http://localhost:3001'

export default function CallPage() {
  const [to, setTo]           = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult]   = useState(null)
  const [error, setError]     = useState(null)

  const makeCall = async () => {
    console.log('button clicked', to)
    setLoading(true)
    setError(null)
    setResult(null)

    try {
        console.log('making API call to', `${API}/api/call`)
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
      <h1 style={{ color: '#1A1A2E', marginBottom: '30px' }}>📞 Initiate Call</h1>

      <div style={{ background: 'white', padding: '30px', borderRadius: '10px', maxWidth: '500px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
          Phone Number
        </label>
        <input
          type="text"
          placeholder="+91XXXXXXXXXX"
          value={to}
          onChange={e => setTo(e.target.value)}
          style={{ width: '100%', padding: '10px', fontSize: '15px', borderRadius: '6px', border: '1px solid #ddd', marginBottom: '15px' }}
        />

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
    </div>
  )
}