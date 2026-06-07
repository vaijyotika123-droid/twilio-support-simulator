import { useState } from 'react'
import axios from 'axios'

const API = 'http://localhost:3001'

export default function BugPage() {
  const [form, setForm] = useState({ title: '', severity: '', description: '' })
  const [loading, setLoading] = useState(false)
  const [result, setResult]   = useState(null)
  const [error, setError]     = useState(null)

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

  const submitBug = async () => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      console.log('Submitting bug report:', form)
      const res = await axios.post(`${API}/api/bugs`, form)
      setResult(res.data.data)
      console.log('Received response:', res.data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 style={{ color: '#1A1A2E', marginBottom: '30px' }}>Bug Reporter</h2>

      <div
  style={{
    background: '#FFFFFF',
    padding: '32px',
    borderRadius: '12px',
    border: '1px solid #E5E7EB',
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
    maxWidth: '800px',
    marginBottom: '30px'
  }}
>
  

  <label
  style={{
    display: 'block',
    marginBottom: '8px',
    fontWeight: '600',
    fontSize: '14px',
    color: '#111827'
  }}
>
  Bug Title
</label>

<select
  value={form.title}
  onChange={e => update('title', e.target.value)}
  style={{
    width: '100%',
    maxWidth: '450px',
    padding: '12px',
    fontSize: '14px',
    color: '#111827',
    backgroundColor: '#FFFFFF',
    border: '1px solid #D1D5DB',
    borderRadius: '8px',
    marginBottom: '20px',
    colorScheme: 'light',
    boxSizing: 'border-box'
  }}
>
  <option value="" disabled>
    Select a bug
  </option>

  <option value="Invalid 'To' Phone Number">
    Invalid 'To' Phone Number
  </option>

  <option value="Authentication Failed">
    Authentication Failed
  </option>

  <option value="TwiML Parse Error">
    TwiML Parse Error
  </option>

  <option value="Webhook Not Firing">
    Webhook Not Firing
  </option>
</select>

      
<label
  style={{
    display: 'block',
    marginBottom: '8px',
    fontWeight: '600',
    fontSize: '14px',
    color: '#111827'
  }}
>
  Severity
</label>

<select
  value={form.severity}
  onChange={e => update('severity', e.target.value)}
  style={{
    width: '100%',
    maxWidth: '450px',
    padding: '12px',
    fontSize: '14px',
    color: '#111827',
    backgroundColor: '#FFFFFF',
    border: '1px solid #D1D5DB',
    borderRadius: '8px',
    marginBottom: '20px',
    colorScheme: 'light',
    boxSizing: 'border-box'
  }}
>
  <option value="" disabled>
    Select severity
  </option>

  <option value="P1">P1</option>
  <option value="P2">P2</option>
  <option value="P3">P3</option>
  <option value="P4">P4</option>
</select>

<label
  style={{
    display: 'block',
    marginBottom: '8px',
    fontWeight: '600',
    fontSize: '14px',
    color: '#111827'
  }}
>
  Description
</label>

<textarea
  placeholder="Describe the bug in detail..."
  value={form.description}
  onChange={e => update('description', e.target.value)}
  rows={5}
  style={{
    width: '100%',
    maxWidth: '450px',
    padding: '12px',
    fontSize: '14px',
    color: '#111827',
    backgroundColor: '#FFFFFF',
    border: '1px solid #D1D5DB',
    borderRadius: '8px',
    marginBottom: '20px',
    colorScheme: 'light',
    boxSizing: 'border-box',
    resize: 'vertical'
  }}
/>
</div>
        <button
          onClick={submitBug}
          disabled={loading || !form.title || !form.description}
          style={{ background: '#F22F46', color: 'white', border: 'none', padding: '12px 30px', borderRadius: '6px', fontSize: '15px', cursor: 'pointer' }}
        >
          {loading ? 'Submitting...' : 'Submit Bug'}
        </button>

        {/* Result — shows video link */}
        {result && (
          <div style={{ marginTop: '20px', padding: '15px', background: '#D5F5E3', borderRadius: '6px' }}>
            <p>✅ Bug submitted!</p>
            <p><b>ID:</b> #{result.id}</p>
          
            <p><b>Severity:</b> {result.severity}</p>
            <p style={{ marginTop: '10px', fontWeight: 'bold' }}>📹 Suggested Fix Video:</p>
            <a href={result.videoUrl} target="_blank" rel="noreferrer"
              style={{ color: '#1A73E8' }}>
              Watch walkthrough →
            </a>
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