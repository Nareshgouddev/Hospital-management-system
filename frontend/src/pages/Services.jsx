import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';
import '../styles/services.css';

const services = [
  {
    title: 'OPD Services',
    desc: 'Comprehensive outpatient consulting and treatment across various specializations.',
    image: 'https://res.cloudinary.com/dgcyqntse/image/upload/v1773738187/1773731578212_d8fsov.png'
  },
  {
    title: 'ICU',
    desc: 'Intensive care unit equipped with advanced life support systems and 24/7 monitoring.',
    image: 'https://res.cloudinary.com/dgcyqntse/image/upload/v1773738188/1773731576507_wtgl4e.png'
  },
  {
    title: 'Operation Theatre',
    desc: 'State-of-the-art operation theatres for safe and sterile surgical procedures.',
    image: 'https://res.cloudinary.com/dgcyqntse/image/upload/v1773738188/1773731575184_nozwbi.png'
  },
  {
    title: 'X-Ray',
    desc: 'High-quality digital X-Ray imaging for quick and accurate diagnostics.',
    image: 'https://res.cloudinary.com/dgcyqntse/image/upload/v1773738188/1773731573913_fop35p.png'
  },
  {
    title: 'ECG',
    desc: 'Electrocardiogram services for immediate heart condition assessment.',
    image: 'https://res.cloudinary.com/dgcyqntse/image/upload/v1773738187/1773731568048_ie6oye.png'
  },
  {
    title: 'Lab',
    desc: 'Fully equipped medical laboratory for comprehensive blood and pathology tests.',
    image: 'https://res.cloudinary.com/dgcyqntse/image/upload/v1773738188/1773731566417_lobnmz.png'
  },
  {
    title: 'Oxygen Supply',
    desc: 'Uninterrupted medical grade oxygen supply across triage and inpatient facilities.',
    image: 'https://res.cloudinary.com/dgcyqntse/image/upload/v1773738187/1773731565144_fdj6y7.png'
  },
  {
    title: 'Medical Shop',
    desc: 'In-house pharmacy stocked with all essential medicines and supplies.',
    image: 'https://res.cloudinary.com/dgcyqntse/image/upload/v1773738187/1773731563811_hwqwd4.png'
  },
  {
    title: 'Ambulance',
    desc: 'Rapid response ambulance services equipped with life-saving apparatus.',
    image: 'https://res.cloudinary.com/dgcyqntse/image/upload/v1773738187/1773731553278_egjihy.png'
  },
  {
    title: 'Lift Available',
    desc: 'Dedicated elevator access ensuring easy mobility for patients and stretchers.',
    image: 'https://res.cloudinary.com/dgcyqntse/image/upload/v1773738187/1773731517606_ayf4ur.png'
  },
  {
    title: 'Home Services',
    desc: 'Medical care, testing, and nursing services delivered at your doorstep.',
    image: 'https://res.cloudinary.com/dgcyqntse/image/upload/v1773754155/1773731424239_kff2rq.png'
  }
];

export default function Services() {
  return (
    <div className="services-page">
      <header className="services-hero">
        <div className="services-hero__inner">
          <h1 className="services-hero__title">Our Premium Services</h1>
          <p className="services-hero__text">
            We provide a wide range of medical services designed to meet all your healthcare needs under one roof.
          </p>
        </div>
      </header>

      <section className="services-section">
        <div className="services-grid">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="service-card"
            >
              <div className="service-card__media">
                <img
                  src={service.image}
                  alt={service.title}
                  className="service-card__image"
                  referrerPolicy="no-referrer"
                />
                <div className="service-card__overlay" />
              </div>
              <div className="service-card__body">
                <h3 className="service-card__title">{service.title}</h3>
                <p className="service-card__desc">{service.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="featured-service">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="featured-service__copy"
          >
            <span className="featured-service__kicker">Featured Service</span>
            <h2 className="featured-service__title">Advanced Telemedicine Services</h2>
            <p className="featured-service__text">
              Consult with our expert doctors from the comfort of your home. Our secure telemedicine platform allows you to have video consultations, share reports, and get prescriptions digitally.
            </p>
            <ul className="feature-list">
              {['Secure Video Calls', 'Digital Prescriptions', 'Report Sharing', 'Easy Scheduling'].map((item, i) => (
                <li key={i} className="feature-list__item">
                  <div className="feature-list__icon">
                    <Activity className="feature-list__icon-svg" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <button className="featured-service__button">
              Learn More About Telemedicine
            </button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="featured-service__visual"
          >
            <img
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000"
              alt="Telemedicine Service"
              className="featured-service__image"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
