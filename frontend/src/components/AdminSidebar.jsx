import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Users, Building2, CalendarCheck, LogOut, Activity } from 'lucide-react'

export default function AdminSidebar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('admin:session')
    navigate('/admin/login', { replace: true })
  }

  const links = [
    { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
    { to: '/admin/doctors', icon: Users, label: 'Doctors' },
    { to: '/admin/departments', icon: Building2, label: 'Departments' },
    { to: '/admin/appointments', icon: CalendarCheck, label: 'Appointments' },
  ]

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar__header">
        <div className="admin-sidebar__logo">
          <Activity />
        </div>
        <div className="admin-sidebar__brand">
          <span className="admin-sidebar__title">Wellness Village</span>
          <span className="admin-sidebar__subtitle">Admin Panel</span>
        </div>
      </div>

      <nav className="admin-sidebar__nav">
        <div className="admin-sidebar__section-label">Main Menu</div>
        {links.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              `admin-sidebar__link${isActive ? ' admin-sidebar__link--active' : ''}`
            }
          >
            <link.icon className="admin-sidebar__icon" />
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="admin-sidebar__footer">
        <button className="admin-sidebar__logout" onClick={handleLogout}>
          <LogOut className="admin-sidebar__icon" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}
