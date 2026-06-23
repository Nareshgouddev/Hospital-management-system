import React, { useState } from 'react';
import { getAllAppointments } from '../api/hospitalApi';
import { Search, Calendar, Clock, User, Phone, Mail, CheckCircle, XCircle, AlertCircle, Loader } from 'lucide-react';
import '../styles/pages.css';

const STATUS_META = {
  Pending:   { color: '#f59e0b', bg: '#fef3c7', icon: AlertCircle },
  Confirmed: { color: '#10b981', bg: '#d1fae5', icon: CheckCircle },
  Cancelled: { color: '#ef4444', bg: '#fee2e2', icon: XCircle },
  Completed: { color: '#6366f1', bg: '#ede9fe', icon: CheckCircle },
};

export default function AppointmentHistoryPage() {
  const [search, setSearch] = useState('');
  const [searchType, setSearchType] = useState('email'); // 'email' | 'phone'
  const [results, setResults] = useState(null); // null = not searched yet
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSearch(e) {
    e.preventDefault();
    if (!search.trim()) return;
    setLoading(true);
    setError('');
    setResults(null);
    try {
      const all = await getAllAppointments();
      const filtered = all.filter(appt => {
        const val = (searchType === 'email' ? appt.email : appt.phoneNumber) || '';
        return val.toLowerCase().includes(search.trim().toLowerCase());
      });
      setResults(filtered);
    } catch (err) {
      setError('Could not fetch appointments. Please try again later.');
    } finally {
      setLoading(false);
    }
  }

  function formatDate(dateStr) {
    if (!dateStr) return '—';
    try {
      return new Date(dateStr).toLocaleDateString('en-IN', {
        day: '2-digit', month: 'long', year: 'numeric',
      });
    } catch { return dateStr; }
  }

  function formatTime(timeStr) {
    if (!timeStr) return '—';
    const [h, m] = timeStr.split(':');
    const hour = parseInt(h, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const h12 = hour % 12 || 12;
    return `${h12}:${m} ${ampm}`;
  }

  return (
    <div className="page-wrapper">
      {/* Hero */}
      <div className="page-hero" style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)' }}>
        <div className="page-hero__inner">
          <h1 className="page-hero__title">Appointment History</h1>
          <p className="page-hero__desc">
            Look up your past and upcoming appointments by email or phone number.
          </p>
        </div>
      </div>

      <div className="page-content">
        {/* Search form */}
        <div className="appt-history-search-card">
          <h2 className="appt-history-search-card__title">Find Your Appointments</h2>
          <form onSubmit={handleSearch} className="appt-history-form">
            <div className="appt-history-form__row">
              <div className="appt-history-form__toggle">
                <button
                  type="button"
                  className={searchType === 'email' ? 'active' : ''}
                  onClick={() => setSearchType('email')}
                >
                  <Mail size={14} /> Email
                </button>
                <button
                  type="button"
                  className={searchType === 'phone' ? 'active' : ''}
                  onClick={() => setSearchType('phone')}
                >
                  <Phone size={14} /> Phone
                </button>
              </div>
              <input
                type={searchType === 'email' ? 'email' : 'tel'}
                placeholder={searchType === 'email' ? 'Enter your email address' : 'Enter your phone number'}
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="appt-history-form__input"
                required
              />
              <button type="submit" className="appt-history-form__btn" disabled={loading}>
                {loading ? <Loader size={16} className="spin" /> : <Search size={16} />}
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </form>
        </div>

        {/* Error state */}
        {error && (
          <div className="appt-history-error">
            <XCircle size={18} /> {error}
          </div>
        )}

        {/* Results */}
        {results !== null && (
          <div className="appt-history-results">
            {results.length === 0 ? (
              <div className="appt-history-empty">
                <Search size={40} style={{ opacity: 0.3, marginBottom: '0.75rem' }} />
                <p>No appointments found for that {searchType}.</p>
                <p style={{ fontSize: '0.85rem', opacity: 0.6 }}>Make sure you enter the same {searchType} you used when booking.</p>
              </div>
            ) : (
              <>
                <p className="appt-history-results__count">
                  Found <strong>{results.length}</strong> appointment{results.length !== 1 ? 's' : ''}
                </p>
                <div className="appt-history-cards">
                  {results.map(appt => {
                    const meta = STATUS_META[appt.status] || STATUS_META.Pending;
                    const StatusIcon = meta.icon;
                    return (
                      <div className="appt-history-card" key={appt.appointmentId}>
                        <div className="appt-history-card__header" style={{ borderLeftColor: meta.color }}>
                          <div>
                            <div className="appt-history-card__name">
                              <User size={14} /> {appt.patientFullName || '—'}
                            </div>
                            <div className="appt-history-card__doctor">
                              Dr. {appt.doctor?.doctorName || 'Not assigned'}
                            </div>
                          </div>
                          <span
                            className="appt-history-card__badge"
                            style={{ color: meta.color, background: meta.bg }}
                          >
                            <StatusIcon size={12} /> {appt.status || 'Pending'}
                          </span>
                        </div>

                        <div className="appt-history-card__body">
                          <div className="appt-history-card__row">
                            <Calendar size={14} />
                            <span>{formatDate(appt.appointmentDate)}</span>
                          </div>
                          <div className="appt-history-card__row">
                            <Clock size={14} />
                            <span>{formatTime(appt.appointmentTime)}</span>
                          </div>
                          {appt.message && (
                            <div className="appt-history-card__message">
                              <em>"{appt.message}"</em>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
