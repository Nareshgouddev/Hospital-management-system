import React from 'react'
import '../styles/admin.css'
// import AdminRealtimeFeed from '../components/AdminRealtimeFeed'
import useRealtime from '../hooks/useRealtime'
import { doctors } from '../data/doctors'
import { departments } from '../data/department'
import { Users, Building2, Activity, CalendarCheck } from 'lucide-react'
import { Link } from 'react-router-dom'

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

  let session = {}
  try { session = JSON.parse(localStorage.getItem('admin:session') || '{}') } catch(e){}
  const isDoctor = session.role === 'Doctor'

  const statCards = isDoctor ? [
    { label: 'My Appointments', value: 8, icon: CalendarCheck, color: '#3b82f6' },
    { label: 'My Patients', value: 24, icon: Users, color: '#10b981' },
    { label: 'Services', value: localStats.services, icon: Activity, color: '#8b5cf6' },
    { label: 'Pending Reports', value: 3, icon: Activity, color: '#f59e0b' },
  ] : [
    { label: 'Doctors', value: localStats.doctors, icon: Users, color: '#3b82f6' },
    { label: 'Departments', value: localStats.departments, icon: Building2, color: '#10b981' },
    { label: 'Services', value: localStats.services, icon: Activity, color: '#8b5cf6' },
    { label: 'Appointments', value: localStats.appointments, icon: CalendarCheck, color: '#f59e0b' },
  ]

  return (
    <>
      <h1 className="admin-title">Dashboard Overview</h1>

      <section className="admin-stats">
        {statCards.map((stat, i) => (
          <div key={i} className="stat-card">
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </section>

      <div style={{display:'flex', gap:'1.5rem', alignItems:'flex-start'}}>
        <div style={{flex:1, minWidth: 0}}>
          {!isDoctor && (
            <section className="admin-section">
              <h2>Recent Doctors</h2>
              <div className="table">
                <div className="tr header">
                  <div className="td">Name</div>
                  <div className="td">Specialty</div>
                  <div className="td">Department</div>
                </div>
                {doctors.slice(0,6).map(d=> (
                  <div className="tr" key={d.id}>
                    <div className="td">{d.name}</div>
                    <div className="td">{d.specialization || '—'}</div>
                    <div className="td">{d.department || '—'}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="admin-section">
            <h2>Quick Actions</h2>
            <div className="actions">
              {!isDoctor && <Link to="/admin/doctors" className="btn">Manage Doctors</Link>}
              {!isDoctor && <Link to="/admin/departments" className="btn btn-outline">Manage Departments</Link>}
              <Link to="/admin/appointments" className="btn btn-outline">View Appointments</Link>
            </div>
          </section>
        </div>
        
        <div style={{width:320, flexShrink:0}}>
          {/* <AdminRealtimeFeed events={events} /> */}
          <div className="connection-status">
            <div className="connection-status__label">Server Status</div>
            <div className={`connection-status__value connection-status__value--${connected ? 'connected' : 'disconnected'}`}>
              {connected ? 'Connected' : 'Offline — Mock data active'}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
