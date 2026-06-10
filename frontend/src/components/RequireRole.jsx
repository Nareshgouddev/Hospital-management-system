import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

export default function RequireRole({ children, roles }) {
  const location = useLocation()
  let session = null
  try {
    const raw = localStorage.getItem('admin:session')
    session = raw ? JSON.parse(raw) : null
  } catch (e) {
    session = null
  }

  if (!session || !roles.includes(session.role)) {
    // If not authorized for this specific role, redirect back to dashboard
    return <Navigate to="/admin" replace />
  }

  return children
}
