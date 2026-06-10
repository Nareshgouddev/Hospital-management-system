import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import React from 'react';
import '../styles/pages.css';

export default function Contact() {
  const [formData, setFormData] = React.useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="decor" />
        <div className="container">
          <div className="container-narrow">
            <h1 className="contact-title">
              Get in <span className="accent">Touch</span>
            </h1>
            <p className="contact-subtext">
              We are here to help. Reach out to us for any medical inquiries, feedback, or support.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="contact-content container">
        <div className="two-col-grid" style={{ alignItems: 'start' }}>
          
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Contact Information</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '2rem' }}>
              <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(37, 99, 235, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb' }}>
                  <MapPin size={28} />
                </div>
                <div>
                  <h4 style={{ fontWeight: 700, fontSize: '1.25rem', marginBottom: '0.25rem' }}>Location</h4>
                  <p style={{ color: '#4b5563', lineHeight: '1.5' }}>123 Health Avenue, Medical District<br/>Cityville, State 12345</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(37, 99, 235, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb' }}>
                  <Phone size={28} />
                </div>
                <div>
                  <h4 style={{ fontWeight: 700, fontSize: '1.25rem', marginBottom: '0.25rem' }}>Phone</h4>
                  <p style={{ color: '#4b5563', lineHeight: '1.5' }}>Emergency: +91 7702021224<br/>Reception: (555) 987-6543</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(37, 99, 235, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb' }}>
                  <Mail size={28} />
                </div>
                <div>
                  <h4 style={{ fontWeight: 700, fontSize: '1.25rem', marginBottom: '0.25rem' }}>Email</h4>
                  <p style={{ color: '#4b5563', lineHeight: '1.5' }}>support@medicareplus.com<br/>info@medicareplus.com</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{ background: '#fff', padding: '2.5rem', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.08)', border: '1px solid #f3f4f6' }}
          >
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '2rem' }}>Send Us a Message</h2>
            
            {isSubmitted ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', marginBottom: '1.5rem' }}>
                  <Send size={40} />
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#10b981', marginBottom: '0.5rem' }}>Message Sent!</h3>
                <p style={{ color: '#4b5563' }}>We will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#374151' }}>Full Name</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    style={{ width: '100%', padding: '0.875rem', borderRadius: '12px', border: '1px solid #d1d5db', outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box' }}
                    placeholder="John Doe"
                    onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#374151' }}>Email Address</label>
                  <input 
                    type="email" 
                    required 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    style={{ width: '100%', padding: '0.875rem', borderRadius: '12px', border: '1px solid #d1d5db', outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box' }}
                    placeholder="john@example.com"
                    onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#374151' }}>Subject</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    style={{ width: '100%', padding: '0.875rem', borderRadius: '12px', border: '1px solid #d1d5db', outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box' }}
                    placeholder="How can we help you?"
                    onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#374151' }}>Message</label>
                  <textarea 
                    rows={4} 
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    style={{ width: '100%', padding: '0.875rem', borderRadius: '12px', border: '1px solid #d1d5db', outline: 'none', transition: 'border-color 0.2s', resize: 'vertical', boxSizing: 'border-box' }}
                    placeholder="Your message here..."
                    onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%', padding: '1rem', borderRadius: '12px', background: '#2563eb', color: 'white', fontWeight: 700, fontSize: '1.1rem', border: 'none', cursor: 'pointer', marginTop: '0.5rem', transition: 'background 0.2s' }}
                  onMouseEnter={(e) => e.target.style.background = '#1d4ed8'}
                  onMouseLeave={(e) => e.target.style.background = '#2563eb'}
                >
                  Send Message <Send size={20} />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
