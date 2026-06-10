import { doctors } from '../data/doctors';
import DoctorCard from '../components/DoctorCard';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import React from 'react';
import '../styles/pages.css';

export default function Doctors() {
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredDoctors = doctors.filter(doc => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="doctors-page">
      {/* Header */}
      <div className="doctors-header">
        <div className="container">
          <h1 className="doctors-title">Our Expert Doctors</h1>
          <p className="doctors-sub">Meet our team of highly qualified medical professionals dedicated to your well-being.</p>
        </div>
      </div>

      <div className="container" style={{marginTop:-32}}>
        {/* Search Bar */}
        <div className="search-wrapper">
          <div style={{position:'relative'}}>
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search by name or specialization..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Doctors Grid */}
        {filteredDoctors.length > 0 ? (
          <div className="doctors-grid">
            {filteredDoctors.map((doctor, i) => (
              <motion.div key={doctor.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <DoctorCard doctor={doctor} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <p>No doctors found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
