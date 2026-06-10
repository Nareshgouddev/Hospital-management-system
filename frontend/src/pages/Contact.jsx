import { motion } from 'framer-motion';
import { Users, Heart } from 'lucide-react';
import '../styles/pages.css';

export default function About() {
  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="decor" />
        <div className="container">
          <div className="container-narrow">
            <h1 className="contact-title">
              Dedicated to Your <span className="accent">Health and Well-being</span>
            </h1>
            <p className="contact-subtext">
              Since our founding in 1995, MediCare Plus has been at the forefront of medical excellence, providing compassionate care and innovative treatments to our community.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="contact-content container">
        <div className="two-col-grid">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Over 25 Years of Medical Excellence</h2>
            <div className="lead-text">
              <p>
                MediCare Plus Hospital started as a small clinic with a big dream: to bring world-class healthcare to everyone. Today, we are a multi-specialty hospital with over 500 beds and 150+ specialists.
              </p>
              <p>
                Our commitment to patient safety and clinical quality has earned us numerous awards and international accreditations. We continuously invest in the latest medical technologies, from robotic surgery to advanced diagnostic imaging.
              </p>
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-icon"><Users className="h-5 w-5 text-blue-600" /></div>
                  <span className="stat-text">150+ Specialists</span>
                </div>
                <div className="stat-item">
                  <div className="stat-icon"><Heart className="h-5 w-5 text-blue-600" /></div>
                  <span className="stat-text">50k+ Happy Patients</span>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="image-wrapper"
          >
            <img
              src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1000"
              alt="Hospital Interior"
              className="rounded-3xl large-shadow"
              referrerPolicy="no-referrer"
            />
            <div className="experience-badge">
              <div className="text-4xl font-bold" style={{color:'#2563eb',marginBottom:6}}>25+</div>
              <div className="text-sm" style={{color:'#6b7280',fontWeight:700,letterSpacing:'0.08em'}}>Years of Experience</div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
