import React from 'react'
import { getAllDepartments, saveDepartment, updateDepartment, deleteDepartment } from '../../api/hospitalApi'

export default function AdminDepartments() {
  const [items, setItems] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState('')
  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [editingId, setEditingId] = React.useState(null)
  const [saving, setSaving] = React.useState(false)

  React.useEffect(() => {
    fetchDepartments()
  }, [])

  async function fetchDepartments() {
    setLoading(true)
    setError('')
    try {
      const data = await getAllDepartments()
      setItems(data)
    } catch (err) {
      setError('Could not load departments: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim()) return
    setSaving(true)
    setError('')
    try {
      if (editingId) {
        // Use the real PUT /department/update/{id} endpoint
        const updated = await updateDepartment(editingId, { departmentName: name.trim(), description: description.trim() })
        setItems(prev => prev.map(it => it.departmentId === editingId ? updated : it))
        setEditingId(null)
      } else {
        const created = await saveDepartment({ departmentName: name.trim(), description: description.trim() })
        setItems(prev => [created, ...prev])
      }
      setName('')
      setDescription('')
    } catch (err) {
      setError('Save failed: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this department?')) return
    try {
      await deleteDepartment(id)
      setItems(prev => prev.filter(it => it.departmentId !== id))
    } catch (err) {
      setError('Delete failed: ' + err.message)
    }
  }

  function startEdit(it) {
    setEditingId(it.departmentId)
    setName(it.departmentName || '')
    setDescription(it.description || '')
  }

  function cancelEdit() {
    setEditingId(null)
    setName('')
    setDescription('')
  }

  return (
    <>
      <div className="admin-page-header">
        <h2>Manage Departments</h2>
        <p>Add, rename, or remove hospital departments.</p>
      </div>

      {error && <div className="admin-auth-card__error" style={{ margin: '0 0 1rem' }}>{error}</div>}

      <div className="admin-section">
        <form onSubmit={handleSubmit} className="admin-form-row">
          <input
            placeholder="Department name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <input
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          />
          <button className="btn" type="submit" disabled={saving}>
            {saving ? 'Saving...' : editingId ? 'Update' : 'Add Department'}
          </button>
          {editingId && (
            <button type="button" className="btn muted" onClick={cancelEdit}>
              Cancel
            </button>
          )}
        </form>

        {loading ? (
          <p style={{ color: '#94a3b8', padding: '1rem' }}>Loading departments...</p>
        ) : (
          <div className="table table--three">
            <div className="tr header">
              <div className="td">Name</div>
              <div className="td">Description</div>
              <div className="td">Actions</div>
            </div>
            {items.map(it => (
              <div className="tr" key={it.departmentId}>
                {editingId === it.departmentId ? (
                  <>
                    <div className="td"><input value={name} onChange={e => setName(e.target.value)} required /></div>
                    <div className="td"><input value={description} onChange={e => setDescription(e.target.value)} required /></div>
                    <div className="td">
                      <button className="btn" onClick={handleSubmit} disabled={saving}>Save</button>
                      <button className="btn muted" onClick={cancelEdit} style={{ marginLeft: 4 }}>Cancel</button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="td">{it.departmentName}</div>
                    <div className="td">{it.description || '—'}</div>
                    <div className="td">
                      <button className="btn" onClick={() => startEdit(it)} style={{ marginRight: 4 }}>Edit</button>
                      <button className="btn danger" onClick={() => handleDelete(it.departmentId)}>Delete</button>
                    </div>
                  </>
                )}
              </div>
            ))}
            {items.length === 0 && (
              <div className="tr">
                <div className="td" style={{ gridColumn: '1/-1', textAlign: 'center', color: '#94a3b8' }}>
                  No departments found. Add one above.
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}
