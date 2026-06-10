import React from 'react'

export default function AdminRealtimeFeed({ events = [], limit = 8 }){
  return (
    <aside className="realtime-panel">
      <h3 className="realtime-title">Live Activity</h3>
      <div className="realtime-list">
        {events.slice(0, limit).map((e, i) => (
          <div key={e.id || i} className="realtime-item">
            <div className="realtime-item__title">{e.title || e.payload?.type || 'Event'}</div>
            <div className="realtime-item__meta">{e.payload?.patient || e.payload?.time || ''}</div>
          </div>
        ))}
        {events.length === 0 && <div className="realtime-empty">No recent activity</div>}
      </div>
    </aside>
  )
}
