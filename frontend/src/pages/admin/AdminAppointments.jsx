import React from 'react'
import { getAllAppointments, updateAppointmentStatus, deleteAppointment } from '../../api/hospitalApi'

const STATUS_OPTIONS = ['Pending', 'Confirmed', 'Cancelled', 'Completed']

const STATUS_COLORS = {
  Pending: '#f59e0b',
  Confirmed: '#10b981',
  Cancelled: '#ef4444',
  Completed: '#6366f1',
}

export default function AdminAppointments() {
  const [items, setItems] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState('')
  const [updating, setUpdating] = React.useState(null) // appointmentId being updated
  const [deleting, setDeleting] = React.useState(null) // appointmentId being deleted
  const [filterStatus, setFilterStatus] = React.useState('All')

  // Read session once — stable for the lifetime of this component
  const session = React.useMemo(() => {
    try { return JSON.parse(localStorage.getItem('admin:session') || '{}') } catch { return {} }
  }, [])
  const isDoctor = session.role === 'Doctor'

  React.useEffect(() => {
    fetchAppointments()
  }, [])

  async function fetchAppointments() {
    setLoading(true)
    setError('')
    try {
      const data = await getAllAppointments()
      setItems(data)
    } catch (err) {
      setError('Could not load appointments: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleStatusChange(id, newStatus) {
    setUpdating(id)
    try {
      const updated = await updateAppointmentStatus(id, newStatus)
      setItems(prev => prev.map(it => it.appointmentId === id ? updated : it))
    } catch (err) {
      setError('Status update failed: ' + err.message)
    } finally {
      setUpdating(null)
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this appointment? This cannot be undone.')) return
    setDeleting(id)
    try {
      await deleteAppointment(id)
      setItems(prev => prev.filter(it => it.appointmentId !== id))
    } catch (err) {
      setError('Delete failed: ' + err.message)
    } finally {
      setDeleting(null)
    }
  }

  // Doctors only see appointments assigned to them — matched by doctor.adminId or doctorName vs session.id
  let visibleItems = isDoctor
    ? items.filter(it =>
        it.doctor &&
        it.doctor.doctorName &&
        it.doctor.doctorName.toLowerCase() === (session.id || '').toLowerCase()
      )
    : items

  // Apply status filter
  if (filterStatus !== 'All') {
    visibleItems = visibleItems.filter(it => it.status === filterStatus)
  }

  function formatDate(dateStr) {
    if (!dateStr) return '—'
    try { return new Date(dateStr).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) } catch { return dateStr }
  }

  function formatTime(timeStr) {
    if (!timeStr) return '—'
    return timeStr.slice(0, 5) // HH:MM
  }

  const counts = STATUS_OPTIONS.reduce((acc, s) => {
    acc[s] = items.filter(it => it.status === s).length
    return acc
  }, {})

  return (
    <>
      <div className="admin-page-header">
        <h2>Manage Appointments</h2>
        <p>View and update patient appointment status.</p>
      </div>

      {/* Status summary chips */}
      {!isDoctor && (
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          {['All', ...STATUS_OPTIONS].map(s => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              style={{
                padding: '4px 14px',
                borderRadius: '999px',
                border: `1.5px solid ${s === 'All' ? '#64748b' : STATUS_COLORS[s] || '#64748b'}`,
                background: filterStatus === s ? (s === 'All' ? '#64748b' : STATUS_COLORS[s]) : 'transparent',
                color: filterStatus === s ? '#fff' : '#64748b',
                cursor: 'pointer',
                fontSize: '0.82rem',
                fontWeight: 600,
                transition: 'all .15s',
              }}
            >
              {s}{s !== 'All' && counts[s] !== undefined ? ` (${counts[s]})` : ''}
            </button>
          ))}
        </div>
      )}

      {error && <div className="admin-auth-card__error" style={{ margin: '0 0 1rem' }}>{error}</div>}

      <div className="admin-section">
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.75rem' }}>
          <button className="btn btn-outline" onClick={fetchAppointments}>↻ Refresh</button>
        </div>

        {loading ? (
          <p style={{ color: '#94a3b8', padding: '1rem' }}>Loading appointments...</p>
        ) : (
          <div className="table" style={{ '--cols': 8 }}>
            <div className="tr header">
              <div className="td">Patient</div>
              <div className="td">Phone</div>
              <div className="td">Doctor</div>
              <div className="td">Date</div>
              <div className="td">Time</div>
              <div className="td">Message</div>
              <div className="td">Status</div>
              <div className="td">Actions</div>
            </div>
            {visibleItems.map(it => (
              <div className="tr" key={it.appointmentId}>
                <div className="td">{it.patientFullName || '—'}</div>
                <div className="td">{it.phoneNumber || '—'}</div>
                <div className="td">{it.doctor?.doctorName || '—'}</div>
                <div className="td">{formatDate(it.appointmentDate)}</div>
                <div className="td">{formatTime(it.appointmentTime)}</div>
                <div className="td" title={it.message}>{it.message ? it.message.slice(0, 30) + (it.message.length > 30 ? '…' : '') : '—'}</div>
                <div className="td">
                  <select
                    value={it.status || 'Pending'}
                    disabled={updating === it.appointmentId}
                    onChange={e => handleStatusChange(it.appointmentId, e.target.value)}
                    className="admin-auth-field__select"
                    style={{
                      fontSize: '0.8rem',
                      padding: '4px 6px',
                      borderLeft: `3px solid ${STATUS_COLORS[it.status] || '#64748b'}`,
                    }}
                  >
                    {STATUS_OPTIONS.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div className="td">
                  <button
                    className="btn danger"
                    style={{ fontSize: '0.75rem', padding: '3px 10px' }}
                    disabled={deleting === it.appointmentId}
                    onClick={() => handleDelete(it.appointmentId)}
                  >
                    {deleting === it.appointmentId ? '…' : 'Delete'}
                  </button>
                </div>
              </div>
            ))}
            {visibleItems.length === 0 && (
              <div className="tr">
                <div className="td" style={{ gridColumn: '1/-1', textAlign: 'center', color: '#94a3b8' }}>
                  No appointments found{filterStatus !== 'All' ? ` with status "${filterStatus}"` : ''}.
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}
