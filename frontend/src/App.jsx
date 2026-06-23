import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Department from './pages/Department'
import DepartmentDetail from './pages/DepartmentDetail'
import Doctors from './pages/DoctorListPage'
import Appointment from './pages/BookAppointment'
import AppointmentHistory from './pages/AppointmentHistorypage'
import Contact from './pages/Contact'
import About from './pages/About'
import Services from './pages/Services'

// Admin
import Login from './pages/Login'
import RegisterPage from './pages/RegisterPage'
import RequireAdmin from './components/RequireAdmin'
import AdminLayout from './components/AdminLayout'
import AdminDashboard from './pages/AdminDashboard'
import AdminDoctors from './pages/admin/AdminDoctors'
import AdminDepartments from './pages/admin/AdminDepartments'
import AdminAppointments from './pages/admin/AdminAppointments'
import RequireRole from './components/RequireRole'

const App = () => {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  return (
    <div>
      {/* Hide Navbar and Footer on admin pages */}
      {!isAdminRoute && <Navbar />}
      <main>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/departments" element={<Department />} />
          <Route path="/departments/:id" element={<DepartmentDetail />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/appointments" element={<AppointmentHistory />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />

          {/* Admin auth routes (no sidebar/topbar) */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/register" element={<RegisterPage />} />

          {/* Protected admin routes with layout */}
          <Route
            path="/admin"
            element={
              <RequireAdmin>
                <AdminLayout />
              </RequireAdmin>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="doctors" element={<RequireRole roles={['Admin']}><AdminDoctors /></RequireRole>} />
            <Route path="departments" element={<RequireRole roles={['Admin']}><AdminDepartments /></RequireRole>} />
            <Route path="appointments" element={<AdminAppointments />} />
          </Route>

          {/* 404 — catch all */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  )
}

export default App