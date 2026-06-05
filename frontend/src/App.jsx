import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import CallPage from './pages/CallPage'
import SmsPage from './pages/SmsPage'
import BugPage from './pages/BugPage'

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif' }}>

        {/* Sidebar */}
        <div style={{ width: '200px', background: '#1A1A2E', padding: '20px' }}>
          <h2 style={{ color: 'white', marginBottom: '30px' }}>🚀 Support Sim</h2>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <NavLink to="/call" style={({ isActive }) => ({
              color: isActive ? '#F22F46' : 'white',
              textDecoration: 'none',
              fontSize: '15px'
            })}>📞 Call</NavLink>
            <NavLink to="/sms" style={({ isActive }) => ({
              color: isActive ? '#F22F46' : 'white',
              textDecoration: 'none',
              fontSize: '15px'
            })}>💬 SMS</NavLink>
            <NavLink to="/bugs" style={({ isActive }) => ({
              color: isActive ? '#F22F46' : 'white',
              textDecoration: 'none',
              fontSize: '15px'
            })}>🐛 Bug Reporter</NavLink>
          </nav>
        </div>

        {/* Main content */}
        <div style={{ flex: 1, padding: '40px', background: '#F4F6F9' }}>
          <Routes>
            <Route path="/call"  element={<CallPage />} />
            <Route path="/sms"   element={<SmsPage />} />
            <Route path="/bugs"  element={<BugPage />} />
            <Route path="/"      element={<CallPage />} />
          </Routes>
        </div>

      </div>
    </BrowserRouter>
  )
}