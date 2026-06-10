import React from 'react'
import '../styles/admin.css'
import AdminSidebar from '../components/AdminSidebar'
import AdminTopbar from '../components/AdminTopbar'
import AdminRealtimeFeed from '../components/AdminRealtimeFeed'
import useRealtime from '../hooks/useRealtime'
import { doctors } from '../data/doctors'
import { departments } from '../data/department'

const services = [
  'OPD Services','ICU','Operation Theatre','X-Ray','ECG','Lab','Oxygen Supply','Medical Shop','Ambulance','Home Services'
]

export default function AdminDashboard(){
  const { connected, events, stats: liveStats } = useRealtime()
  const [localStats, setLocalStats] = React.useState({
    doctors: doctors.length,
    departments: departments.length,
    services: services.length,
    appointments: 128
  })

  React.useEffect(()=>{
    if (liveStats && Object.keys(liveStats).length) {
      setLocalStats(prev => ({ ...prev, ...liveStats }))
    }
  }, [liveStats])

  return (
    <div className="admin-root">
      <AdminSidebar />
      <div className="admin-main">
        <AdminTopbar />
        <main className="admin-content">
          <div style={{display:'flex', gap:'1rem', alignItems:'flex-start'}}>
            <div style={{flex:1}}>
              <h1 className="admin-title">Admin Dashboard</h1>

              <section className="admin-stats">
                <div className="stat-card">
                  <div className="stat-value">{localStats.doctors}</div>
                  <div className="stat-label">Doctors</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">{localStats.departments}</div>
                  <div className="stat-label">Departments</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">{localStats.services}</div>
                  <div className="stat-label">Services</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">{localStats.appointments}</div>
                  <div className="stat-label">Appointments</div>
                </div>
              </section>

              <section className="admin-section">
                <h2>Recent Doctors</h2>
                <div className="table">
                  <div className="tr header">
                    <div className="td">Name</div>
                    <div className="td">Specialty</div>
                    <div className="td">Email</div>
                  </div>
                  {doctors.slice(0,6).map(d=> (
                    <div className="tr" key={d.id}>
                      <div className="td">{d.name}</div>
                      <div className="td">{d.specialty || d.department || '—'}</div>
                      <div className="td">{d.email || 'n/a'}</div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="admin-section">
                <h2>Quick Actions</h2>
                <div className="actions">
                  <button className="btn">Add Doctor</button>
                  <button className="btn btn-outline">Add Department</button>
                  <button className="btn btn-outline">Manage Services</button>
                </div>
              </section>
            </div>

            <div style={{width:320}}>
              <AdminRealtimeFeed events={events} />
              <div style={{marginTop: '1rem', padding: '0.75rem', background:'#fff', borderRadius:8}}>
                <div style={{fontWeight:700}}>Connection</div>
                <div style={{color: connected? '#16a34a':'#ef4444' }}>{connected? 'Connected':'Disconnected — running mock updates'}</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
