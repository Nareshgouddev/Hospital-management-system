/**
 * hospitalApi.js
 * Central API client for the Hospital Management System backend.
 * Set VITE_API_URL in Vercel environment variables to your Render backend URL.
 * e.g. VITE_API_URL=https://hospital-backend.onrender.com/hospital
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/hospital';


async function request(method, path, body) {
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' },
  };
  if (body !== undefined) {
    options.body = JSON.stringify(body);
  }

  const res = await fetch(`${BASE_URL}${path}`, options);

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed: ${res.status}`);
  }

  // Some DELETE endpoints return plain text
  const contentType = res.headers.get('Content-Type') || '';
  if (contentType.includes('application/json')) {
    return res.json();
  }
  return res.text();
}

// ─── USER ────────────────────────────────────────────────────────────────────

export const registerUser = (data) =>
  request('POST', '/user/register', {
    adminId: data.adminId,
    password: data.password,
    role: data.role,
  });

export const loginUser = (adminId, password) =>
  request('POST', '/login', { adminId, password });

// ─── DOCTORS ─────────────────────────────────────────────────────────────────

export const getAllDoctors = () => request('GET', '/doctor/all');

export const saveDoctor = (doctor) =>
  request('POST', '/doctor/save', {
    doctorName: doctor.doctorName,
    speciality: doctor.speciality,
    email: doctor.email,
    description: doctor.description,
  });

export const updateDoctor = (id, doctor) =>
  request('PUT', `/doctor/update/${id}`, {
    doctorName: doctor.doctorName,
    speciality: doctor.speciality,
    email: doctor.email,
    description: doctor.description,
  });

export const deleteDoctor = (id) => request('DELETE', `/doctor/delete/${id}`);

// ─── DEPARTMENTS ─────────────────────────────────────────────────────────────

export const getAllDepartments = () => request('GET', '/department/all');

export const saveDepartment = (dept) =>
  request('POST', '/department/save', {
    departmentName: dept.departmentName,
    description: dept.description,
  });

export const updateDepartment = (id, dept) =>
  request('PUT', `/department/update/${id}`, {
    departmentName: dept.departmentName,
    description: dept.description,
  });

export const deleteDepartment = (id) =>
  request('DELETE', `/department/delete/${id}`);

// ─── APPOINTMENTS ─────────────────────────────────────────────────────────────

export const getAllAppointments = () => request('GET', '/appointment/all');

export const saveAppointment = (appt) =>
  request('POST', '/appointment/save', {
    patientFullName: appt.patientFullName,
    phoneNumber: appt.phoneNumber,
    email: appt.email,
    gender: appt.gender,
    appointmentDate: appt.appointmentDate, // "YYYY-MM-DD"
    appointmentTime: appt.appointmentTime, // "HH:MM"
    message: appt.message,
    doctor: appt.doctorId ? { doctorId: appt.doctorId } : null,
  });

export const updateAppointmentStatus = (id, status) =>
  request('PUT', `/appointment/status/${id}/${status}`);

export const deleteAppointment = (id) =>
  request('DELETE', `/appointment/delete/${id}`);
