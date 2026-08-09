import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

const BountyApp = lazy(() => import('./bounty/BountyApp.jsx'))
const BountyAdmin = lazy(() => import('./bounty/BountyAdmin.jsx'))
const isBountyAdminRoute = window.location.pathname === '/bounty/admin' || window.location.pathname.startsWith('/bounty/admin/')
const isBountyRoute = window.location.pathname === '/bounty' || window.location.pathname.startsWith('/bounty/')

if (isBountyAdminRoute) {
  document.title = 'Kaba Bounty — Admin'
} else if (isBountyRoute) {
  document.title = 'Kaba Bounty — Create Content. Earn per View.'
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {isBountyAdminRoute ? (
      <Suspense fallback={<div style={{ minHeight: '100vh', background: '#171915' }} />}>
        <BountyAdmin />
      </Suspense>
    ) : isBountyRoute ? (
      <Suspense fallback={<div style={{ minHeight: '100vh', background: '#f4f0e7' }} />}>
        <BountyApp />
      </Suspense>
    ) : (
      <App />
    )}
  </React.StrictMode>
)
