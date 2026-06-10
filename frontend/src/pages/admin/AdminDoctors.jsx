import React from 'react'
import { Link } from 'react-router-dom'
import { doctors as initialDoctors } from '../../data/doctors'

export default function AdminDoctors(){
  const storageKey = 'admin:doctors'
  const [doctors, setDoctors] = React.useState(()=>{
    try{ const raw = localStorage.getItem(storageKey); return raw ? JSON.parse(raw) : (initialDoctors || []) }catch(e){ return (initialDoctors||[]) }
  })
  const [form, setForm] = React.useState({ name:'', specialty:'', email:'' })
  const [editingId, setEditingId] = React.useState(null)

  React.useEffect(()=>{
    function onEvent(e){
      const ev = e.detail
      if (ev && ev.title && ev.title.toLowerCase().includes('doctor')){
        setDoctors(prev => [ { id: Date.now(), name: ev.payload?.patient || 'New Doctor', specialty:'General', email:'' }, ...prev ])
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
    setForm({name:'',specialty:'',email:''})
  }

  function startEdit(d){ setEditingId(d.id); setForm({ name:d.name||'', specialty:d.specialty||'', email:d.email||'' }) }
  function cancelEdit(){ setEditingId(null); setForm({name:'',specialty:'',email:''}) }
  function deleteDoctor(id){ setDoctors(prev=>prev.filter(d=>d.id!==id)) }

  return (
    <div>
      <h2>Doctors</h2>
      <form onSubmit={addDoctor} style={{display:'flex',gap:'0.5rem',marginBottom:'1rem'}}>
        <input placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
        <input placeholder="Specialty" value={form.specialty} onChange={e=>setForm({...form,specialty:e.target.value})} />
        <input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
        <button className="btn">Add</button>
      </form>

      <div className="table table--four">
        <div className="tr header"><div className="td">Name</div><div className="td">Specialty</div><div className="td">Email</div></div>
        {doctors.map(d=> (
          <div className="tr" key={d.id}>
            {editingId === d.id ? (
              <>
                <div className="td"><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} /></div>
                <div className="td"><input value={form.specialty} onChange={e=>setForm({...form,specialty:e.target.value})} /></div>
                <div className="td"><input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} /></div>
                <div className="td"><button className="btn" onClick={addDoctor}>Save</button> <button className="btn muted" onClick={cancelEdit}>Cancel</button></div>
              </>
            ) : (
              <>
                <div className="td">{d.name}</div>
                <div className="td">{d.specialty}</div>
                <div className="td">{d.email||'n/a'}</div>
                <div className="td">
                  <button className="btn" onClick={()=>startEdit(d)}>Edit</button>
                  <button className="btn danger" onClick={()=>deleteDoctor(d.id)}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
