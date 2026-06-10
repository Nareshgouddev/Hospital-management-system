import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Bell, LogOut, User } from 'lucide-react'

export default function AdminTopbar() {
  const navigate = useNavigate()
  let session = null
  try {
    const raw = localStorage.getItem('admin:session')
    session = raw ? JSON.parse(raw) : null
  } catch (e) {
    session = null
  }

  const handleLogout = () => {
    localStorage.removeItem('admin:session')
    navigate('/admin/login', { replace: true })
  }

  return (
    <header className="admin-topbar">
      <div className="admin-topbar__left">
        <h2 className="admin-topbar__greeting">
          Welcome back, <span className="admin-topbar__name">{session?.id || 'Admin'}</span>
        </h2>
      </div>
      <div className="admin-topbar__right">
        <div className="admin-topbar__search">
          <Search className="admin-topbar__search-icon" />
          <input className="admin-topbar__search-input" placeholder="Search anything..." />
        </div>
        <button className="admin-topbar__icon-btn" title="Notifications">
          <Bell />
          <span className="admin-topbar__badge">3</span>
        </button>
        <div className="admin-topbar__user">
          <div className="admin-topbar__avatar">
            <User />
          </div>
          <span className="admin-topbar__user-name">{session?.id || 'Admin'}</span>
        </div>
        <button className="admin-topbar__icon-btn admin-topbar__logout" onClick={handleLogout} title="Logout">
          <LogOut />
        </button>
      </div>
    </header>
  )
}
