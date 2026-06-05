import { useState } from 'react'
import axios from 'axios'

const API = 'http://localhost:3001'

export default function BugPage() {
  const [form, setForm] = useState({ title: '', category: 'Voice', severity: 'P2', description: '' })
  const [loading, setLoading] = useState(false)
  const [result, setResult]   = useState(null)
  const [error, setError]     = useState(null)

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

  const submitBug = async () => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const res = await axios.post(`${API}/api/bugs`, form)
      setResult(res.data.data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1 style={{ color: '#1A1A2E', marginBottom: '30px' }}>🐛 Bug Reporter</h1>

      <div style={{ background: 'white', padding: '30px', borderRadius: '10px', maxWidth: '500px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Bug Title</label>
        <input
          type="text"
          placeholder="e.g. Call not connecting"
          value={form.title}
          onChange={e => update('title', e.target.value)}
          style={{ width: '100%', padding: '10px', fontSize: '15px', borderRadius: '6px', border: '1px solid #ddd', marginBottom: '15px' }}
        />

        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Category</label>
        <select
          value={form.category}
          onChange={e => update('category', e.target.value)}
          style={{ width: '100%', padding: '10px', fontSize: '15px', borderRadius: '6px', border: '1px solid #ddd', marginBottom: '15px' }}
        >
          <option>Voice</option>
          <option>SMS</option>
          <option>API</option>
          <option>Webhook</option>
        </select>

        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Severity</label>
        <select
          value={form.severity}
          onChange={e => update('severity', e.target.value)}
          style={{ width: '100%', padding: '10px', fontSize: '15px', borderRadius: '6px', border: '1px solid #ddd', marginBottom: '15px' }}
        >
          <option>P1</option>
          <option>P2</option>
          <option>P3</option>
          <option>P4</option>
        </select>

        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Description</label>
        <textarea
          placeholder="Describe the bug in detail..."
          value={form.description}
          onChange={e => update('description', e.target.value)}
          rows={4}
          style={{ width: '100%', padding: '10px', fontSize: '15px', borderRadius: '6px', border: '1px solid #ddd', marginBottom: '15px' }}
        />

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
            <p><b>Category:</b> {result.category}</p>
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
    </div>
  )
}