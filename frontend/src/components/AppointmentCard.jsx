import React from 'react';
import { motion } from 'framer-motion';
import { departments } from '../data/departments';
import { doctors } from '../data/doctors';
import { CheckCircle2, Send } from 'lucide-react';
import '../styles/appointment.css';

export default function AppointmentForm() {
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [formKey, setFormKey] = React.useState(0);

  const [formData, setFormData] = React.useState({
    name: '',
    phone: '',
    email: '',
    department: '',
    doctor: '',
    date: '',
    gender:'',
    time: '',
    message: ''
  });

  // ✅ Filter doctors based on department
  const filteredDoctors = doctors.filter(
    (d) => !formData.department || d.department === formData.department
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Appointment Data:', formData);

    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);

      // 🔥 force new form
      setFormKey(prev => prev + 1);

      setFormData({
        name: '',
        phone: '',
        email: '',
        department: '',
        doctor: '',
        date: '',
        gender:'',
        time: '',
        message: ''
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

          <div className="appointment-form__grid">

            {/* Name */}
            <div className="appointment-form__field">
              <label className="appointment-form__label">Patient Full Name</label>
              <input
                required
                type="text"
                className="appointment-form__input"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            {/* Phone */}
            <div className="appointment-form__field">
              <label className="appointment-form__label">Phone Number</label>
              <input
                required
                type="tel"
                className="appointment-form__input"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
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
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            {/* Department */}
            <div className="appointment-form__field">
              <label className="appointment-form__label">Department</label>
              <select
                required
                className="appointment-form__select"
                value={formData.department}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    department: e.target.value,
                    doctor: ''
                  })
                }
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Doctor */}
            <div className="appointment-form__field">
              <label className="appointment-form__label">Doctor</label>
              <select
                required
                disabled={!formData.department}
                className="appointment-form__select"
                value={formData.doctor}
                onChange={(e) =>
                  setFormData({ ...formData, doctor: e.target.value })
                }
              >
                <option value="">Select Doctor</option>
                {filteredDoctors.map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    {doc.name}
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
                min={new Date().toISOString().split("T")[0]}
                className="appointment-form__input"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />
            </div>
            {/* Gender */}
            <div className="appointment-form__field">
              <label className="appointment-form__label">Gender</label>
              <input
                required
                type="text"
                className="appointment-form__input"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            {/* Time */}
            <div className="appointment-form__field">
              <label className="appointment-form__label">Time</label>
              <input
                required
                type="time"
                className="appointment-form__input"
                value={formData.time}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
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
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="appointment-form__submit"
          >
            Confirm Appointment
            <Send />
          </button>

        </form>
      )}
    </div>
  );
}