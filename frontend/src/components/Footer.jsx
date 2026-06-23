import { Link } from 'react-router-dom';
import { Globe, MessageSquare, Share2, Link2, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">

        <div className="site-footer__grid">

          {/* Brand */}
          <div className="site-footer__brand-col">
            <Link to="/" className="site-footer__brand">
              <div className="site-footer__logo-wrap">
                <img
                  src="/logo.jpeg"
                  alt="Hospital Logo"
                  className="site-footer__logo-img"
                />
              </div>
              <div className="site-footer__brand-text">
                <span className="site-footer__brand-name">Q9 Multy Speciality</span>
                <span className="site-footer__brand-sub">Hospital</span>
              </div>
            </Link>

            <p className="site-footer__desc">
              Providing world-class healthcare services with a patient-first approach.
              Our mission is to improve lives through advanced medical technology and compassionate care.
            </p>

            <div className="site-footer__socials">
              {[Globe, MessageSquare, Share2, Link2].map((Icon, i) => (
                <a key={i} href="#" className="site-footer__social-link">
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="site-footer__links-col">
            <h3 className="site-footer__heading">Quick Links</h3>
            <ul className="site-footer__list">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/doctors">Our Doctors</Link></li>
              <li><Link to="/departments">Departments</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/appointment">Book Appointment</Link></li>
            </ul>
          </div>

          {/* Departments */}
          <div className="site-footer__links-col">
            <h3 className="site-footer__heading">Departments</h3>
            <ul className="site-footer__list">
              <li><Link to="/departments">Cardiology</Link></li>
              <li><Link to="/departments">Neurology</Link></li>
              <li><Link to="/departments">Orthopedics</Link></li>
              <li><Link to="/departments">Pediatrics</Link></li>
              <li><Link to="/departments">Dermatology</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="site-footer__links-col">
            <h3 className="site-footer__heading">Contact Us</h3>
            <ul className="site-footer__contact-list">
              <li>
                <MapPin />
                <span>
                  D.No: 10-21/1/6, Sriramanagar,<br />
                  Near Petrol Bunk, Opp. GVMC Park,<br />
                  Lankelapalem, Anakapalli Dist - 531019
                </span>
              </li>
              <li>
                <Phone />
                <span>
                  +91 7702021224<br />
                  +91 7672021224
                </span>
              </li>
              <li>
                <Mail />
                <span>q9hospital2026@gmail.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="site-footer__bottom">
          <p>© {new Date().getFullYear()} Q9 Multy Speciality Hospital. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
}