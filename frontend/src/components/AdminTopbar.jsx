import React from 'react'

export default function AdminTopbar(){
  return (
    <header className="admin-topbar">
      <div className="topbar-left">Administrator</div>
      <div className="topbar-right">
        <input className="topbar-search" placeholder="Search..." />
        <div className="topbar-user">Admin</div>
      </div>
    </header>
  )
}
