import { departments } from '../data/departments';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/pages.css';

export default function Departments() {
  return (
    <div className="department-page">

      {/* Header */}
      <div className="dept-header">
        <div className="container">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="dept-title">
            Our Specialists
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="dept-subtitle">
            Comprehensive medical services across all major specialties.
          </motion.p>
        </div>
      </div>

      {/* Grid */}
      <div className="dept-grid-wrapper container">
        <div className="dept-grid">

          {departments.map((dept, i) => (
            <motion.div key={dept.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Link to={`/departments/${dept.id}`}>
                <div className="dept-card">
                  <img src={dept.image} alt={dept.title} className="dept-card-img" />
                  <div className="dept-card-overlay" />
                  <div className="dept-card-text">
                    <h3 className="dept-card-title">{dept.title}</h3>
                    <p className="dept-card-desc">{dept.description}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}

        </div>

        {/* Info Section */}
        <div className="dept-info-panel">
          <div className="container">
            <div className="dept-info-grid">

              <div>
                <h2 className="dept-info-title">Can't find what you're looking for?</h2>
                <p className="dept-info-desc">We offer many more specialized services.</p>

                <div style={{display:'flex',gap:12,flexWrap:'wrap',marginTop:12}}>
                  <a href="tel:+917702021224" className="btn-primary">Call Help Desk</a>
                  <Link to="/contact" className="btn-outline">Contact Us</Link>
                </div>
              </div>

              <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:12}}>
                {['Emergency Care','Diagnostic Lab','Pharmacy','Rehabilitation','Health Checkups','Telemedicine'].map((item,i)=>(
                  <div key={i} className="info-chip">{item}</div>
                ))}
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}