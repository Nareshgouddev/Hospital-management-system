import React from 'react'

const initial = [ { id:1, patient:'John Smith', time: '10:00 AM', doctor:'Dr. Ana Ray' } ]

export default function AdminAppointments(){
  const storageKey = 'admin:appointments'
  const [items, setItems] = React.useState(()=>{
    try{ const raw = localStorage.getItem(storageKey); return raw ? JSON.parse(raw) : initial }catch(e){ return initial }
  })
  const [form, setForm] = React.useState({ patient:'', time:'', doctor:'' })
  const [editingId, setEditingId] = React.useState(null)

  React.useEffect(()=>{
    function onEvent(e){
      const ev = e.detail
      if (ev && ev.type === 'event'){
        if ((ev.title && ev.title.toLowerCase().includes('appointment')) || ev.payload?.patient) {
          setItems(prev=>[{ id: Date.now(), patient: ev.payload?.patient || 'Anonymous', time: ev.payload?.time || new Date().toLocaleTimeString(), doctor: ev.payload?.doctor || '—' }, ...prev])
        }
      }
    }
    window.addEventListener('realtime:event', onEvent)
    return ()=> window.removeEventListener('realtime:event', onEvent)
  },[])

  React.useEffect(()=>{ try{ localStorage.setItem(storageKey, JSON.stringify(items)) }catch(e){} },[items])

  function add(e){
    e.preventDefault()
    if (editingId){
      setItems(prev=>prev.map(it=> it.id===editingId ? { ...it, ...form } : it))
      setEditingId(null)
    } else {
      setItems(prev=>[{ id: Date.now(), ...form }, ...prev])
    }
    setForm({ patient:'', time:'', doctor:'' })
  }

  function startEdit(it){ setEditingId(it.id); setForm({ patient:it.patient||'', time:it.time||'', doctor:it.doctor||'' }) }
  function cancelEdit(){ setEditingId(null); setForm({ patient:'', time:'', doctor:'' }) }
  function deleteItem(id){ setItems(prev=>prev.filter(it=>it.id!==id)) }

  return (
    <>
      <div className="admin-page-header">
        <h2>Manage Appointments</h2>
        <p>View, add, edit, or cancel patient appointments.</p>
      </div>

      <div className="admin-section">
        <form onSubmit={add} className="admin-form-row">
          <input placeholder="Patient Name" value={form.patient} onChange={e=>setForm({...form,patient:e.target.value})} required />
          <input placeholder="Time" value={form.time} onChange={e=>setForm({...form,time:e.target.value})} required />
          <input placeholder="Doctor" value={form.doctor} onChange={e=>setForm({...form,doctor:e.target.value})} required />
          <button className="btn" type="submit">
            {editingId ? 'Update' : 'Add Appointment'}
          </button>
          {editingId && <button type="button" className="btn muted" onClick={cancelEdit}>Cancel</button>}
        </form>

        <div className="table table--four">
          <div className="tr header">
            <div className="td">Patient</div>
            <div className="td">Time</div>
            <div className="td">Doctor</div>
            <div className="td">Actions</div>
          </div>
          {items.map(it=> (
            <div className="tr" key={it.id}>
              {editingId === it.id ? (
                <>
                  <div className="td"><input value={form.patient} onChange={e=>setForm({...form,patient:e.target.value})} /></div>
                  <div className="td"><input value={form.time} onChange={e=>setForm({...form,time:e.target.value})} /></div>
                  <div className="td"><input value={form.doctor} onChange={e=>setForm({...form,doctor:e.target.value})} /></div>
                  <div className="td">
                    <button className="btn" onClick={add}>Save</button>
                    <button className="btn muted" onClick={cancelEdit} style={{marginLeft:4}}>Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <div className="td">{it.patient}</div>
                  <div className="td">{it.time}</div>
                  <div className="td">{it.doctor}</div>
                  <div className="td">
                    <button className="btn" onClick={()=>startEdit(it)} style={{marginRight:4}}>Edit</button>
                    <button className="btn danger" onClick={()=>deleteItem(it.id)}>Delete</button>
                  </div>
                </>
              )}
            </div>
          ))}
          {items.length === 0 && (
            <div className="tr"><div className="td" style={{gridColumn:'1/-1', textAlign:'center', color:'#94a3b8'}}>No appointments yet.</div></div>
          )}
        </div>
      </div>
    </>
  )
}
