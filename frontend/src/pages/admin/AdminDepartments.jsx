import React from 'react'
import { departments as initial } from '../../data/department'

export default function AdminDepartments(){
  const storageKey = 'admin:departments'
  const [items, setItems] = React.useState(()=>{
    try{ const raw = localStorage.getItem(storageKey); return raw ? JSON.parse(raw) : (initial || []) }catch(e){ return (initial||[]) }
  })
  const [name, setName] = React.useState('')
  const [editingId, setEditingId] = React.useState(null)

  React.useEffect(()=>{
    function onEvent(e){
      const ev = e.detail
      if (ev && ev.title && ev.title.toLowerCase().includes('department')){
        setItems(prev=>[{ id: Date.now(), title: ev.payload?.patient||'New Dept', description: '' }, ...prev])
      }
    }
    window.addEventListener('realtime:event', onEvent)
    return ()=> window.removeEventListener('realtime:event', onEvent)
  },[])

  React.useEffect(()=>{ try{ localStorage.setItem(storageKey, JSON.stringify(items)) }catch(e){} },[items])

  function add(e){
    e.preventDefault()
    if (!name.trim()) return
    if (editingId){
      setItems(prev=>prev.map(it=> it.id===editingId ? { ...it, title:name } : it))
      setEditingId(null)
    } else {
      setItems(prev=>[{ id: Date.now(), title:name, description:'' }, ...prev])
    }
    setName('')
  }

  function startEdit(it){ setEditingId(it.id); setName(it.title||'') }
  function cancelEdit(){ setEditingId(null); setName('') }
  function deleteItem(id){ setItems(prev=>prev.filter(it=>it.id!==id)) }

  return (
    <>
      <div className="admin-page-header">
        <h2>Manage Departments</h2>
        <p>Add, rename, or remove hospital departments.</p>
      </div>

      <div className="admin-section">
        <form onSubmit={add} className="admin-form-row">
          <input
            placeholder="Department name"
            value={name}
            onChange={e=>setName(e.target.value)}
            required
          />
          <button className="btn" type="submit">
            {editingId ? 'Update' : 'Add Department'}
          </button>
          {editingId && <button type="button" className="btn muted" onClick={cancelEdit}>Cancel</button>}
        </form>

        <div className="table table--three">
          <div className="tr header">
            <div className="td">Title</div>
            <div className="td">Description</div>
            <div className="td">Actions</div>
          </div>
          {items.map(it=> (
            <div className="tr" key={it.id}>
              {editingId === it.id ? (
                <>
                  <div className="td"><input value={name} onChange={e=>setName(e.target.value)} /></div>
                  <div className="td">{it.description||'—'}</div>
                  <div className="td">
                    <button className="btn" onClick={add}>Save</button>
                    <button className="btn muted" onClick={cancelEdit} style={{marginLeft:4}}>Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <div className="td">{it.title}</div>
                  <div className="td">{it.description||'—'}</div>
                  <div className="td">
                    <button className="btn" onClick={()=>startEdit(it)} style={{marginRight:4}}>Edit</button>
                    <button className="btn danger" onClick={()=>deleteItem(it.id)}>Delete</button>
                  </div>
                </>
              )}
            </div>
          ))}
          {items.length === 0 && (
            <div className="tr"><div className="td" style={{gridColumn:'1/-1', textAlign:'center', color:'#94a3b8'}}>No departments found. Add one above.</div></div>
          )}
        </div>
      </div>
    </>
  )
}
