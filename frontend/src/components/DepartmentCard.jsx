import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import '../styles/cards.css';

export default function DepartmentCard({ department }) {
  const IconComponent = Icons[department.icon];

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="department-card"
    >
      <div className="department-card__icon">
        {IconComponent && <IconComponent />}
      </div>
      <h3 className="department-card__title">
        {department.title}
      </h3>
    </motion.div>
  );
}
