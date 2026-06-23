import React from 'react'
import { getAllDoctors, saveDoctor, updateDoctor, deleteDoctor } from '../../api/hospitalApi'

export default function AdminDoctors() {
  const [doctors, setDoctors] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState('')
  const [form, setForm] = React.useState({ doctorName: '', speciality: '', email: '', description: '' })
  const [editingId, setEditingId] = React.useState(null)
  const [saving, setSaving] = React.useState(false)

  React.useEffect(() => {
    fetchDoctors()
  }, [])

  async function fetchDoctors() {
    setLoading(true)
    setError('')
    try {
      const data = await getAllDoctors()
      setDoctors(data)
    } catch (err) {
      setError('Could not load doctors from server. ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(ev) {
    ev.preventDefault()
    setSaving(true)
    setError('')
    try {
      if (editingId) {
        // Use the real PUT /doctor/update/{id} endpoint
        const updated = await updateDoctor(editingId, form)
        setDoctors(prev => prev.map(d => d.doctorId === editingId ? updated : d))
        setEditingId(null)
      } else {
        const created = await saveDoctor(form)
        setDoctors(prev => [created, ...prev])
      }
      setForm({ doctorName: '', speciality: '', email: '', description: '' })
    } catch (err) {
      setError('Save failed: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this doctor? This action cannot be undone.')) return
    try {
      await deleteDoctor(id)
      setDoctors(prev => prev.filter(d => d.doctorId !== id))
    } catch (err) {
      setError('Delete failed: ' + err.message)
    }
  }

  function startEdit(d) {
    setEditingId(d.doctorId)
    setForm({
      doctorName: d.doctorName || '',
      speciality: d.speciality || '',
      email: d.email || '',
      description: d.description || '',
    })
  }

  function cancelEdit() {
    setEditingId(null)
    setForm({ doctorName: '', speciality: '', email: '', description: '' })
  }

  return (
    <>
      <div className="admin-page-header">
        <h2>Manage Doctors</h2>
        <p>Add, edit, or remove doctors from the hospital directory.</p>
      </div>

      {error && <div className="admin-auth-card__error" style={{ margin: '0 0 1rem' }}>{error}</div>}

      <div className="admin-section">
        {/* Add / Edit Form */}
        <form onSubmit={handleSubmit} className="admin-form-row">
          <input
            placeholder="Doctor Name *"
            value={form.doctorName}
            onChange={e => setForm({ ...form, doctorName: e.target.value })}
            required
          />
          <input
            placeholder="Speciality"
            value={form.speciality}
            onChange={e => setForm({ ...form, speciality: e.target.value })}
          />
          <input
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
          <input
            placeholder="Description"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
          />
          <button className="btn" type="submit" disabled={saving}>
            {saving ? 'Saving...' : editingId ? 'Update Doctor' : 'Add Doctor'}
          </button>
          {editingId && (
            <button type="button" className="btn muted" onClick={cancelEdit}>
              Cancel
            </button>
          )}
        </form>

        {loading ? (
          <p style={{ color: '#94a3b8', padding: '1rem' }}>Loading doctors...</p>
        ) : (
          <div className="table table--five">
            <div className="tr header">
              <div className="td">Name</div>
              <div className="td">Speciality</div>
              <div className="td">Email</div>
              <div className="td">Description</div>
              <div className="td">Actions</div>
            </div>
            {doctors.map(d => (
              <div className="tr" key={d.doctorId}>
                {editingId === d.doctorId ? (
                  <>
                    <div className="td"><input value={form.doctorName} onChange={e => setForm({ ...form, doctorName: e.target.value })} /></div>
                    <div className="td"><input value={form.speciality} onChange={e => setForm({ ...form, speciality: e.target.value })} /></div>
                    <div className="td"><input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
                    <div className="td"><input value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} /></div>
                    <div className="td">
                      <button className="btn" onClick={handleSubmit} disabled={saving}>Save</button>
                      <button className="btn muted" onClick={cancelEdit} style={{ marginLeft: 4 }}>Cancel</button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="td">{d.doctorName}</div>
                    <div className="td">{d.speciality || '—'}</div>
                    <div className="td">{d.email || '—'}</div>
                    <div className="td">{d.description || '—'}</div>
                    <div className="td">
                      <button className="btn" onClick={() => startEdit(d)} style={{ marginRight: 4 }}>Edit</button>
                      <button className="btn danger" onClick={() => handleDelete(d.doctorId)}>Delete</button>
                    </div>
                  </>
                )}
              </div>
            ))}
            {doctors.length === 0 && (
              <div className="tr">
                <div className="td" style={{ gridColumn: '1/-1', textAlign: 'center', color: '#94a3b8' }}>
                  No doctors found. Add one above.
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}
