import React from 'react'
import '../styles/admin.css'
import useRealtime from '../hooks/useRealtime'
import { getAllDoctors, getAllDepartments, getAllAppointments } from '../api/hospitalApi'
import { doctors as staticDoctors } from '../data/doctors'
import { departments as staticDepts } from '../data/departments'
import { Users, Building2, Activity, CalendarCheck } from 'lucide-react'
import { Link } from 'react-router-dom'

const services = [
  'OPD Services','ICU','Operation Theatre','X-Ray','ECG','Lab','Oxygen Supply','Medical Shop','Ambulance','Home Services'
]

export default function AdminDashboard(){
  const { connected } = useRealtime()

  const [doctors, setDoctors] = React.useState(staticDoctors)
  const [departments, setDepartments] = React.useState(staticDepts)
  const [appointmentCount, setAppointmentCount] = React.useState(0)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    Promise.allSettled([
      getAllDoctors(),
      getAllDepartments(),
      getAllAppointments(),
    ]).then(([docRes, deptRes, apptRes]) => {
      if (docRes.status === 'fulfilled') setDoctors(docRes.value)
      if (deptRes.status === 'fulfilled') setDepartments(deptRes.value)
      if (apptRes.status === 'fulfilled') setAppointmentCount(apptRes.value.length)
      setLoading(false)
    })
  }, [])

  let session = {}
  try { session = JSON.parse(localStorage.getItem('admin:session') || '{}') } catch(e){}
  const isDoctor = session.role === 'Doctor'

  const statCards = isDoctor ? [
    { label: 'Services', value: services.length, icon: Activity, color: '#8b5cf6' },
  ] : [
    { label: 'Doctors', value: loading ? '…' : doctors.length, icon: Users, color: '#3b82f6' },
    { label: 'Departments', value: loading ? '…' : departments.length, icon: Building2, color: '#10b981' },
    { label: 'Services', value: services.length, icon: Activity, color: '#8b5cf6' },
    { label: 'Appointments', value: loading ? '…' : appointmentCount, icon: CalendarCheck, color: '#f59e0b' },
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
                  <div className="td">Speciality</div>
                  <div className="td">Email</div>
                </div>
                {doctors.slice(0, 6).map((d, i) => (
                  <div className="tr" key={d.doctorId ?? d.id ?? i}>
                    <div className="td">{d.doctorName ?? d.name}</div>
                    <div className="td">{d.speciality ?? d.specialization ?? '—'}</div>
                    <div className="td">{d.email ?? '—'}</div>
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
          <div className="connection-status">
            <div className="connection-status__label">Server Status</div>
            <div className={`connection-status__value connection-status__value--${connected ? 'connected' : 'disconnected'}`}>
              {connected ? 'Connected' : 'Offline — Static data active'}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
