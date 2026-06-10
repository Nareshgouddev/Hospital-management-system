import { motion } from 'framer-motion';
import { Users, Heart } from 'lucide-react';
import '../styles/pages.css';

export default function About() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero__glow"></div>
        <div className="container about-hero__inner">
          <div className="about-hero__copy">
            <h1 className="about-hero__title">
              Dedicated to Your <span className="about-hero__accent">Health and Well-being</span>
            </h1>
            <p className="about-hero__text">
              Since our founding in 1995, MediCare Plus has been at the forefront of medical excellence, providing compassionate care and innovative treatments to our community.
            </p>
          </div>
        </div>
      </section>


      {/* Content Section */}
      <section className="about-content container">
        <div className="about-grid">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="about-section-title">Over 25 Years of Medical Excellence</h2>
            <div className="about-body">
              <p>
                MediCare Plus Hospital started as a small clinic with a big dream: to bring world-class healthcare to everyone. Today, we are a multi-specialty hospital with over 500 beds and 150+ specialists.
              </p>
              <p>
                Our commitment to patient safety and clinical quality has earned us numerous awards and international accreditations. We continuously invest in the latest medical technologies, from robotic surgery to advanced diagnostic imaging.
              </p>
              <div className="about-facts">
                <div className="about-fact">
                  <div className="about-fact__icon">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <span>150+ Specialists</span>
                </div>
                <div className="about-fact">
                  <div className="about-fact__icon">
                    <Heart className="h-5 w-5 text-blue-600" />
                  </div>
                  <span>50k+ Happy Patients</span>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="about-image"
          >
            <img
              src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1000"
              alt="Hospital Interior"
              className="about-image__photo"
              referrerPolicy="no-referrer"
            />
            <div className="about-image__badge">
              <div className="about-image__years">25+</div>
              <div className="about-image__label">Years of Experience</div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
