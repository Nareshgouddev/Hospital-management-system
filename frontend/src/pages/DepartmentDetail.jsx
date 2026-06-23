import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getAllDepartments, getAllDoctors } from '../api/hospitalApi';
import { departments as staticDepts } from '../data/departments';
import { doctors as staticDoctors } from '../data/doctors';
import { ArrowLeft, Stethoscope, Mail } from 'lucide-react';
import '../styles/pages.css';

export default function DepartmentDetail() {
  const { id } = useParams();
  const [department, setDepartment] = useState(null);
  const [relatedDoctors, setRelatedDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        // Try backend first
        const [depts, docs] = await Promise.all([getAllDepartments(), getAllDoctors()]);
        // Match by departmentId (numeric) or by index if from static data
        const dept = depts.find(d => String(d.departmentId) === String(id));
        if (dept) {
          setDepartment(dept);
          // Doctors whose speciality matches the department name (case-insensitive)
          const matched = docs.filter(doc =>
            (doc.speciality || '').toLowerCase().includes(dept.departmentName.toLowerCase()) ||
            dept.departmentName.toLowerCase().includes((doc.speciality || '').toLowerCase())
          );
          setRelatedDoctors(matched);
        } else {
          // Fall back to static data (matched by index/id)
          const staticDept = staticDepts.find(d => String(d.id) === String(id));
          if (staticDept) {
            setDepartment({ departmentName: staticDept.title, description: staticDept.description });
            setRelatedDoctors([]);
          } else {
            setNotFound(true);
          }
        }
      } catch {
        // Backend offline — use static data
        const staticDept = staticDepts.find(d => String(d.id) === String(id));
        if (staticDept) {
          setDepartment({ departmentName: staticDept.title, description: staticDept.description });
          const matched = staticDoctors.filter(doc =>
            (doc.specialization || '').toLowerCase().includes(staticDept.title.toLowerCase())
          );
          setRelatedDoctors(matched);
        } else {
          setNotFound(true);
        }
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#64748b' }}>Loading department...</p>
      </div>
    );
  }

  if (notFound) {
    return (
      <div style={{ minHeight: '50vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
        <h2>Department not found</h2>
        <Link to="/departments" style={{ color: '#2563eb' }}>← Back to Departments</Link>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="page-hero" style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)' }}>
        <div className="page-hero__inner">
          <Link to="/departments" className="dept-detail-back">
            <ArrowLeft size={16} /> All Departments
          </Link>
          <h1 className="page-hero__title">{department.departmentName}</h1>
          {department.description && (
            <p className="page-hero__desc">{department.description}</p>
          )}
        </div>
      </div>

      <div className="page-content">
        {/* Doctors in this department */}
        {relatedDoctors.length > 0 ? (
          <section className="dept-detail-doctors">
            <h2 className="dept-detail-section-title">
              <Stethoscope size={20} /> Our Specialists
            </h2>
            <div className="dept-detail-doctors-grid">
              {relatedDoctors.map((doc, i) => (
                <div className="dept-detail-doc-card" key={doc.doctorId || doc.id || i}>
                  <div className="dept-detail-doc-avatar">
                    {(doc.doctorName || doc.name || '?').charAt(0).toUpperCase()}
                  </div>
                  <div className="dept-detail-doc-info">
                    <h3>{doc.doctorName || doc.name}</h3>
                    <p className="dept-detail-doc-speciality">{doc.speciality || doc.specialization || department.departmentName}</p>
                    {doc.email && (
                      <a href={`mailto:${doc.email}`} className="dept-detail-doc-email">
                        <Mail size={13} /> {doc.email}
                      </a>
                    )}
                    {doc.description && (
                      <p className="dept-detail-doc-desc">{doc.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <div className="dept-detail-empty">
            <Stethoscope size={36} style={{ opacity: 0.25, marginBottom: '0.5rem' }} />
            <p>No doctors listed for this department yet.</p>
          </div>
        )}

        <div className="dept-detail-cta">
          <h3>Ready to consult a specialist?</h3>
          <p>Book an appointment with our {department.departmentName} team today.</p>
          <Link to="/appointment" className="emergency-cta__button">Book Appointment</Link>
        </div>
      </div>
    </div>
  );
}
