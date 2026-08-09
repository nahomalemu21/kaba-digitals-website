import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

const BountyApp = lazy(() => import('./bounty/BountyApp.jsx'))
const isBountyRoute = window.location.pathname === '/bounty' || window.location.pathname.startsWith('/bounty/')

if (isBountyRoute) {
  document.title = 'Kaba Bounty — Create Content. Earn per View.'
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {isBountyRoute ? (
      <Suspense fallback={<div style={{ minHeight: '100vh', background: '#f4f0e7' }} />}>
        <BountyApp />
      </Suspense>
    ) : (
      <App />
    )}
  </React.StrictMode>
)
