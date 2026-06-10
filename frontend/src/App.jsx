import Navbar from './components/Navbar'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Department from './pages/Department'
import Doctors from './pages/DoctorListPage'
import Appointment from './pages/BookAppointment'
import AppointmentHistory from './pages/AppointmentHistorypage'
import Contact from './pages/Contact'
import About from './pages/About'
import Services from './pages/Services'
import AdminDashboard from './pages/AdminDashboard'
import AdminDoctors from './pages/admin/AdminDoctors'
import AdminDepartments from './pages/admin/AdminDepartments'
import AdminAppointments from './pages/admin/AdminAppointments'

const App = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/departments" element={<Department />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/appointments" element={<AppointmentHistory />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/doctors" element={<AdminDoctors />} />
          <Route path="/admin/departments" element={<AdminDepartments />} />
          <Route path="/admin/appointments" element={<AdminAppointments />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App