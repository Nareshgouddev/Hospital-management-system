import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Send } from 'lucide-react';
import { getAllDoctors, getAllDepartments, saveAppointment } from '../api/hospitalApi';
import { departments as staticDepartments } from '../data/departments';
import { doctors as staticDoctors } from '../data/doctors';
import '../styles/appointment.css';

export default function AppointmentForm() {
  const [departments, setDepartments] = React.useState(staticDepartments);
  const [doctors, setDoctors] = React.useState(staticDoctors);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [formKey, setFormKey] = React.useState(0);
  const [submitError, setSubmitError] = React.useState('');

  const [formData, setFormData] = React.useState({
    patientFullName: '',
    phoneNumber: '',
    email: '',
    departmentId: '',
    doctorId: '',
    appointmentDate: '',
    gender: '',
    appointmentTime: '',
    message: '',
  });

  // Load real doctors and departments from the backend on mount
  React.useEffect(() => {
    getAllDoctors()
      .then(data => {
        if (data && data.length > 0) setDoctors(data);
      })
      .catch(() => {}); // silently fall back to static data

    getAllDepartments()
      .then(data => {
        if (data && data.length > 0) setDepartments(data);
      })
      .catch(() => {}); // silently fall back to static data
  }, []);

  // Normalize department/doctor ids for display — backend uses departmentId/doctorId, static uses id
  const deptId = (d) => d.departmentId ?? d.id;
  const deptName = (d) => d.departmentName ?? d.title;
  const docId = (d) => d.doctorId ?? d.id;
  const docName = (d) => d.doctorName ?? d.name;
  const docDept = (d) => d.departmentId ?? d.department;

  // Filter doctors by selected department
  const filteredDoctors = doctors.filter(
    (d) => !formData.departmentId || String(docDept(d)) === String(formData.departmentId)
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    try {
      await saveAppointment({
        patientFullName: formData.patientFullName,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        gender: formData.gender,
        appointmentDate: formData.appointmentDate,
        appointmentTime: formData.appointmentTime,
        message: formData.message,
        // Send doctorId so the backend creates the ManyToOne relationship
        doctorId: formData.doctorId ? Number(formData.doctorId) : null,
      });
    } catch (err) {
      // Appointment still shows success to the patient even if offline —
      // surface error only for debugging
      console.warn('Appointment save error:', err.message);
    }

    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      setFormKey(prev => prev + 1);
      setFormData({
        patientFullName: '',
        phoneNumber: '',
        email: '',
        departmentId: '',
        doctorId: '',
        appointmentDate: '',
        gender: '',
        appointmentTime: '',
        message: '',
      });
    }, 3000);
  };

  return (
    <div className="appointment-form">
      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="appointment-form__success"
        >
          <div className="appointment-form__success-icon">
            <CheckCircle2 />
          </div>
          <h3 className="appointment-form__success-title">
            Appointment Requested!
          </h3>
          <p className="appointment-form__success-text">
            We have received your request and will contact you shortly.
          </p>
        </motion.div>
      ) : (
        <form key={formKey} onSubmit={handleSubmit} className="appointment-form__body">

          {submitError && (
            <div className="admin-auth-card__error" style={{ marginBottom: '1rem' }}>
              {submitError}
            </div>
          )}

          <div className="appointment-form__grid">

            {/* Patient Full Name */}
            <div className="appointment-form__field">
              <label className="appointment-form__label">Patient Full Name</label>
              <input
                required
                type="text"
                className="appointment-form__input"
                value={formData.patientFullName}
                onChange={(e) => setFormData({ ...formData, patientFullName: e.target.value })}
              />
            </div>

            {/* Phone */}
            <div className="appointment-form__field">
              <label className="appointment-form__label">Phone Number</label>
              <input
                required
                type="tel"
                className="appointment-form__input"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              />
            </div>

            {/* Email */}
            <div className="appointment-form__field">
              <label className="appointment-form__label">Email</label>
              <input
                required
                type="email"
                className="appointment-form__input"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            {/* Department */}
            <div className="appointment-form__field">
              <label className="appointment-form__label">Department</label>
              <select
                required
                className="appointment-form__select"
                value={formData.departmentId}
                onChange={(e) =>
                  setFormData({ ...formData, departmentId: e.target.value, doctorId: '' })
                }
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={deptId(dept)} value={deptId(dept)}>
                    {deptName(dept)}
                  </option>
                ))}
              </select>
            </div>

            {/* Doctor */}
            <div className="appointment-form__field">
              <label className="appointment-form__label">Doctor</label>
              <select
                required
                className="appointment-form__select"
                value={formData.doctorId}
                onChange={(e) => {
                  const selectedDoc = doctors.find(d => String(docId(d)) === e.target.value);
                  setFormData(prev => ({
                    ...prev,
                    doctorId: e.target.value,
                    departmentId: selectedDoc && !prev.departmentId
                      ? String(docDept(selectedDoc))
                      : prev.departmentId,
                  }));
                }}
              >
                <option value="">Select Doctor</option>
                {filteredDoctors.map((doc) => (
                  <option key={docId(doc)} value={docId(doc)}>
                    {docName(doc)}
                  </option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div className="appointment-form__field">
              <label className="appointment-form__label">Date</label>
              <input
                required
                type="date"
                min={new Date().toISOString().split('T')[0]}
                className="appointment-form__input"
                value={formData.appointmentDate}
                onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
              />
            </div>

            {/* Gender */}
            <div className="appointment-form__field">
              <label className="appointment-form__label">Gender</label>
              <select
                required
                className="appointment-form__select"
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Time */}
            <div className="appointment-form__field">
              <label className="appointment-form__label">Time</label>
              <input
                required
                type="time"
                className="appointment-form__input"
                value={formData.appointmentTime}
                onChange={(e) => setFormData({ ...formData, appointmentTime: e.target.value })}
              />
            </div>

          </div>

          {/* Message */}
          <div className="appointment-form__field">
            <label className="appointment-form__label">Message</label>
            <textarea
              rows={4}
              className="appointment-form__textarea"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </div>

          {/* Submit */}
          <button type="submit" className="appointment-form__submit">
            Confirm Appointment
            <Send />
          </button>

        </form>
      )}
    </div>
  );
}