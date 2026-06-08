import React from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import './Navbar.css'

const Navbar = () => {
  const [open, setOpen] = React.useState(false)

  const navItems = [
    { name: 'Dashboard', to: '/dashboard' },
    { name: 'Doctors', to: '/doctors' },
    { name: 'Appointments', to: '/appointments' },
    { name: 'Patients', to: '/patients' },
    { name: 'Settings', to: '/settings' },
  ]

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <Link to="/dashboard" className="navbar__brand">
          <img
            src="logo.jpeg"
            alt="Q9 Logo"
            className="navbar__logo"
          />
          <div className="navbar__titles">
            <div className="navbar__title">WellFound</div>
            <div className="navbar__subtitle">Management System</div>
          </div>
        </Link>

        <nav className="navbar__nav" aria-label="Primary">
          {navItems.map((item) => (
            <Link key={item.to} to={item.to} className="navbar__link">
              {item.name}
            </Link>
          ))}

          <Link to="/doctors/new" className="btn--primary">
            Add Doctor
          </Link>
        </nav>

        <div className="navbar__toggle">
          <button onClick={() => setOpen((v) => !v)} aria-label="Toggle menu" className="navbar__toggle-btn">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <div className="navbar__mobile">
          {navItems.map((item) => (
            <Link key={item.to} to={item.to} onClick={() => setOpen(false)} className="navbar__link">
              {item.name}
            </Link>
          ))}
          <Link to="/doctors/new" onClick={() => setOpen(false)} className="btn--primary">
            Add Doctor
          </Link>
        </div>
      )}
    </header>
  )
}

export default Navbar