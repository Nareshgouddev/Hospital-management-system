import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminSidebar(){
  return (
    <aside className="admin-sidebar">
      <div className="brand">Q9 Admin</div>
      <nav className="admin-nav">
        <Link to="/admin" className="nav-item">Overview</Link>
        <Link to="/admin/doctors" className="nav-item">Doctors</Link>
        <Link to="/admin/departments" className="nav-item">Departments</Link>
        <Link to="/admin/appointments" className="nav-item">Appointments</Link>
        <Link to="/admin/services" className="nav-item">Services</Link>
        <Link to="/admin/settings" className="nav-item">Settings</Link>
      </nav>
    </aside>
  )
}
