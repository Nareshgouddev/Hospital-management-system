import '../styles/pages.css'

export default function AppointmentHistorypage() {
  return (
    <div className="container page-layout">
      <div style={{textAlign:'center', padding:'4rem 0'}}>
        <h1 style={{fontSize: '1.75rem', fontWeight:700}}>Your Appointments</h1>
        <p style={{color:'#64748b'}}>You can see past and upcoming appointments here.</p>
      </div>

      <div style={{maxWidth: '48rem', margin: '0 auto', textAlign:'center', padding:'2rem'}}>
        <p>No appointment history to show yet.</p>
      </div>
    </div>
  )
}
