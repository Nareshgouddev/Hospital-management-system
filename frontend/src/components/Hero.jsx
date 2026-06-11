import { Link } from 'react-router-dom';
import { Phone, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import '../styles/home.css';

export default function Hero() {
  return (
    <section className="hero-section">

      <div className="hero-bg">
        <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2000" alt="Hospital" />
        <div className="hero-bg__overlay"></div>
      </div>

      <div className="hero-content">
        <div className="hero-inner">
          <div className="hero-center">
            <motion.div
              className="hero-card"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="hero-kicker">About Our Hospital</p>
              <h1 className="hero-title">
                Welcome to <br />
                <span className="hero-accent">Wellness village Speciality Hospital</span>
              </h1>

              <p className="hero-subtext">
                Expert care, advanced technology, and a commitment to your health and well-being at our modern hospital.
              </p>

              <div className="hero-ctas">
                <Link to="/appointment" className="hero-cta hero-cta--primary">Book Appointment <Calendar /></Link>
                <a href="tel:+919398997732" className="hero-cta hero-cta--secondary">Emergency Contact <Phone /></a>
              </div>

            </motion.div>
          </div>
        </div>
      </div>

      <div className="hero-stats">
        <div className="hero-stats__inner">
          {[ { label: 'Qualified Doctors', value: '150+' }, { label: 'Success Rate', value: '99%' }, { label: 'Modern Rooms', value: '500+' }, { label: 'Happy Patients', value: '50k+' } ].map((stat,i)=> (
            <div key={i} className="hero-stat">
              <div className="hero-stat__value">{stat.value}</div>
              <div className="hero-stat__label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}