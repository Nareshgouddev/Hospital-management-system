import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserRound } from 'lucide-react';
import '../styles/cards.css';

export default function DoctorCard({ doctor }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="doctor-card"
    >
      <div className="doctor-card__icon">
        <UserRound />
      </div>
      <h3 className="doctor-card__name">{doctor.name}</h3>
      <p className="doctor-card__specialty">{doctor.specialization}</p>

      <div className="doctor-card__footer">
        <Link
          to="/appointment"
          className="doctor-card__link"
        >
          Book Appointment
        </Link>
      </div>
    </motion.div>
  );
}
