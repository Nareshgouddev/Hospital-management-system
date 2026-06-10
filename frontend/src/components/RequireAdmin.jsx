import { Navigate, useLocation } from 'react-router-dom'

export default function RequireAdmin({ children }) {
  const location = useLocation()
  let session = null
  try {
    const raw = localStorage.getItem('admin:session')
    session = raw ? JSON.parse(raw) : null
  } catch (e) {
    session = null
  }

  if (!session || session.role !== 'Admin') {
    return <Navigate to="/admin/login" state={{ from: location }} replace />
  }

  return children
}
