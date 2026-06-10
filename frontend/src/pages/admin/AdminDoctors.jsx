import React from 'react'
import { doctors as initialDoctors } from '../../data/doctors'
import { Plus, Pencil, Trash2, X } from 'lucide-react'

export default function AdminDoctors(){
  const storageKey = 'admin:doctors'
  const [doctors, setDoctors] = React.useState(()=>{
    try{ const raw = localStorage.getItem(storageKey); return raw ? JSON.parse(raw) : (initialDoctors || []) }catch(e){ return (initialDoctors||[]) }
  })
  const [form, setForm] = React.useState({ name:'', specialty:'', email:'', description:'' })
  const [editingId, setEditingId] = React.useState(null)

  React.useEffect(()=>{
    function onEvent(e){
      const ev = e.detail
      if (ev && ev.title && ev.title.toLowerCase().includes('doctor')){
        setDoctors(prev => [ { id: Date.now(), name: ev.payload?.patient || 'New Doctor', specialty:'General', email:'', description:'' }, ...prev ])
      }
    }
    window.addEventListener('realtime:event', onEvent)
    return ()=> window.removeEventListener('realtime:event', onEvent)
  },[])

  // persist on change
  React.useEffect(()=>{ try{ localStorage.setItem(storageKey, JSON.stringify(doctors)) }catch(e){} },[doctors])

  function addDoctor(ev){
    ev.preventDefault()
    if (editingId){
      setDoctors(prev=>prev.map(d=> d.id===editingId ? { ...d, ...form } : d))
      setEditingId(null)
    } else {
      setDoctors(prev=>[{ id: Date.now(), ...form }, ...prev])
    }
    setForm({name:'',specialty:'',email:'',description:''})
  }

  function startEdit(d){ setEditingId(d.id); setForm({ name:d.name||'', specialty:d.specialty||d.specialization||'', email:d.email||'', description:d.description||'' }) }
  function cancelEdit(){ setEditingId(null); setForm({name:'',specialty:'',email:'',description:''}) }
  function deleteDoctor(id){ setDoctors(prev=>prev.filter(d=>d.id!==id)) }

  return (
    <>
      <div className="admin-page-header">
        <h2>Manage Doctors</h2>
        <p>Add, edit, or remove doctors from the hospital directory.</p>
      </div>

      <div className="admin-section">
        <form onSubmit={addDoctor} className="admin-form-row">
          <input placeholder="Doctor Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required />
          <input placeholder="Specialty" value={form.specialty} onChange={e=>setForm({...form,specialty:e.target.value})} />
          <input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
          <input placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} />
          <button className="btn" type="submit">
            {editingId ? 'Update' : 'Add Doctor'}
          </button>
          {editingId && <button type="button" className="btn muted" onClick={cancelEdit}>Cancel</button>}
        </form>

        <div className="table table--five">
          <div className="tr header">
            <div className="td">Name</div>
            <div className="td">Specialty</div>
            <div className="td">Email</div>
            <div className="td">Description</div>
            <div className="td">Actions</div>
          </div>
          {doctors.map(d=> (
            <div className="tr" key={d.id}>
              {editingId === d.id ? (
                <>
                  <div className="td"><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} /></div>
                  <div className="td"><input value={form.specialty} onChange={e=>setForm({...form,specialty:e.target.value})} /></div>
                  <div className="td"><input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} /></div>
                  <div className="td"><input value={form.description} onChange={e=>setForm({...form,description:e.target.value})} placeholder="Description" /></div>
                  <div className="td">
                    <button className="btn" onClick={addDoctor}>Save</button>
                    <button className="btn muted" onClick={cancelEdit} style={{marginLeft:4}}>Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <div className="td">{d.name}</div>
                  <div className="td">{d.specialty || d.specialization || '—'}</div>
                  <div className="td">{d.email||'—'}</div>
                  <div className="td">{d.description||'—'}</div>
                  <div className="td">
                    <button className="btn" onClick={()=>startEdit(d)} style={{marginRight:4}}>Edit</button>
                    <button className="btn danger" onClick={()=>deleteDoctor(d.id)}>Delete</button>
                  </div>
                </>
              )}
            </div>
          ))}
          {doctors.length === 0 && (
            <div className="tr"><div className="td" style={{gridColumn:'1/-1', textAlign:'center', color:'#94a3b8'}}>No doctors found. Add one above.</div></div>
          )}
        </div>
      </div>
    </>
  )
}
