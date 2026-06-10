import Hero from '../components/Hero';
import '../styles/home.css';
import { departments as initialDepartments } from '../data/department';
import { doctors as initialDoctors } from '../data/doctors';
import React from 'react';
import DoctorCard from '../components/DoctorCard';
import { motion } from 'framer-motion';
import { Shield, Users, Zap, Heart, Quote, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  { icon: Zap, title: '24/7 Emergency', desc: 'Round-the-clock emergency medical services with rapid response teams.' },
  { icon: Users, title: 'Qualified Doctors', desc: 'Expert medical professionals with years of experience in various fields.' },
  { icon: Shield, title: 'Advanced Tech', desc: 'Equipped with the latest medical technology for precise diagnosis.' },
  { icon: Heart, title: 'Patient Care', desc: 'Compassionate care focused on patient comfort and recovery.' },
];
// accents replaced by inline gradients in the feature cards

const testimonials = [
  { name: 'John Smith', role: 'Patient', text: 'The care I received was exceptional. The doctors and staff were professional and caring throughout my recovery.' },
  { name: 'Sarah Williams', role: 'Patient', text: 'State-of-the-art facilities and very knowledgeable doctors. Highly recommended.' },
  { name: 'Michael Brown', role: 'Patient', text: 'Booking was seamless. The pediatric team is wonderful. Truly a world-class hospital.' },
  { name: 'Anjali Reddy', role: 'Patient', text: 'Doctors explained everything clearly and treatment was excellent.' },
  { name: 'Rahul Kumar', role: 'Patient', text: 'Very clean hospital with friendly staff and quick service.' },
  { name: 'Priya Sharma', role: 'Patient', text: 'Highly satisfied with the care and attention provided.' },
];


export default function Home() {
  const [departments, setDepartments] = React.useState(initialDepartments);
  const [doctors, setDoctors] = React.useState(initialDoctors);

  React.useEffect(() => {
    try {
      const rawDept = localStorage.getItem('admin:departments');
      if (rawDept) setDepartments(JSON.parse(rawDept));
      
      const rawDoc = localStorage.getItem('admin:doctors');
      if (rawDoc) setDoctors(JSON.parse(rawDoc));
    } catch (e) {}
  }, []);

  return (
    <div className="home-page">

      <Hero />

      <section className="container">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="emergency-cta">
          <div>
            <h2>24/7 Emergency Service Available</h2>
            <p>Rapid response teams and life support ambulances ready for critical situations.</p>
          </div>
          <a href="tel:+917702021224" className="emergency-cta__button"><Phone /> Call Now</a>
        </motion.div>
      </section>

      <section className="container">
        <div className="features-grid">
          {features.map((feature,i)=>(
            <div key={i} className="feature-card">
              <div className="feature-accent" style={{background: ["linear-gradient(90deg,#3b82f6,#60a5fa)","linear-gradient(90deg,#10b981,#34d399)","linear-gradient(90deg,#8b5cf6,#a78bfa)","linear-gradient(90deg,#ef4444,#fb923c)"][i]}}></div>
              <div className="feature-icon"><feature.icon /></div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-24">
        <div className="container">
          <div className="section-header">
            <h2>Specialists In</h2>
            <p>Explore our specialized medical experts equipped with advanced care.</p>
          </div>
          <div className="dept-grid">
            {departments.slice(0,6).map(dept=> (
              <Link to={`/departments/${dept.id}`} key={dept.id}>
                <div className="dept-card">
                  <img src={dept.image} alt={dept.title} />
                  <div className="dept-card__body">
                    <h3 className="dept-card__title">{dept.title}</h3>
                    <p className="dept-card__desc">{dept.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div style={{textAlign:'center', marginTop:'1.25rem'}}>
            <Link to="/departments" className="emergency-cta__button">View All Departments</Link>
          </div>
        </div>
      </section>

      <section className="container">
        <div style={{textAlign:'center', marginBottom:'1.5rem'}}>
          <h2>Meet Our Specialists</h2>
          <p>Our expert doctors provide the best care.</p>
        </div>
        <div className="doctors-grid">
          {doctors.slice(0,4).map(d=> <DoctorCard key={d.id} doctor={d} />)}
        </div>
        <div style={{textAlign:'center', marginTop:'1rem'}}>
          <Link to="/doctors" className="emergency-cta__button">View All Doctors</Link>
        </div>
      </section>

      <section className="container">
        <div className="cta-section">
          <h2>Ready to Schedule Your Visit?</h2>
          <p>Book your appointment with our expert team today.</p>
          <Link to="/appointment">Book Appointment Now</Link>
        </div>
      </section>

      <section className="container">
        <div style={{textAlign:'center', margin:'2rem 0'}}>
          <h2>What Our Patients Say</h2>
        </div>
        <div className="testimonials-wrapper">
          <div style={{display:'flex', gap:'1rem', overflowX:'auto', paddingBottom:'1rem'}}>
            {[...testimonials,...testimonials].map((t,i)=>(
              <motion.div key={i} initial={{opacity:0}} whileInView={{opacity:1}} transition={{delay: i*0.05}} className="testimonial-card">
                <Quote style={{opacity:0.2, marginBottom:'0.75rem'}} />
                <p style={{fontStyle:'italic', marginBottom:'0.75rem'}}>&quot;{t.text}&quot;</p>
                <h4 style={{margin:0,fontWeight:700}}>{t.name}</h4>
                <p style={{color:'#2563eb'}}>{t.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}