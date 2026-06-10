import AppointmentForm from '../components/AppointmentCard';
import { Calendar, Clock, ShieldCheck, Phone } from 'lucide-react';
import '../styles/appointment.css';

export default function Appointment() {
  return (
    <div className="appointment-page">
      {/* Header */}
      <div className="appointment-page__hero">
        <div className="appointment-page__hero-inner">
          <h1 className="appointment-page__hero-title">Book Your Appointment</h1>
          <p className="appointment-page__hero-text">
            Take the first step towards better health. Fill out the form below and our team will get back to you to confirm your visit.
          </p>
        </div>
      </div>

      <div className="appointment-page__content">
        <div className="appointment-page__grid">
          {/* Form Column */}
          <div>
            <AppointmentForm />
          </div>

          {/* Info Column */}
          <div className="appointment-page__sidebar">
            <div className="appointment-page__info-card">
              <h3 className="appointment-page__info-title">Why Book With Us?</h3>
              <div className="appointment-page__info-list">
                {[
                  { icon: Calendar, title: 'Easy Scheduling', desc: 'Choose your preferred date and time for consultation.' },
                  { icon: Clock, title: 'Minimal Wait Time', desc: 'We value your time and strive to keep appointments on schedule.' },
                  { icon: ShieldCheck, title: 'Secure & Private', desc: 'Your medical information is handled with complete confidentiality.' },
                ].map((item, i) => (
                  <div key={i} className="appointment-page__info-item">
                    <div className="appointment-page__info-icon">
                      <item.icon />
                    </div>
                    <div className="appointment-page__info-copy">
                      <h4>{item.title}</h4>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="appointment-page__emergency-card">
              <h3 className="appointment-page__emergency-title">Need Emergency Help?</h3>
              <p className="appointment-page__emergency-text">If you have a medical emergency, please call our 24/7 hotline immediately.</p>
              <a
                href="tel:+15551234567"
                className="appointment-page__emergency-link"
              >
                <Phone /> +91  7702021224
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
