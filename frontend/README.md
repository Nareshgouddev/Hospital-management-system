# 🏥 Hospital Appointment App

A React frontend for booking doctor appointments.  
Connect it to a Spring Boot backend running at `http://localhost:8080`.

---

## 🚀 How to Run

```bash
npm install
npm run dev
```

Make sure your Spring Boot backend is running before you open the app.

---

## 📁 Project Structure — What Each File Does

---

### `public/index.html`
The single HTML page that loads the entire React app.  
You don't need to edit this file.

---

### `src/main.jsx`
The **starting point** of the React app.  
It picks up the `<div id="root">` from index.html and mounts the App inside it.  
You don't need to edit this file either.

---

### `src/App.jsx`
The **brain of routing**.  
This is where you define which URL shows which page.  
Example: `/login` → LoginPage, `/doctors` → DoctorListPage.  
Also wraps the whole app with `AuthProvider` so every page knows if the user is logged in.

---

## 📂 `src/api/` — Backend Communication

These files are the **only place** where HTTP calls to Spring Boot are made.  
No page should call the backend directly — always go through these files.

| File | What it does |
|---|---|
| `authApi.js` | Calls `/auth/register` and `/auth/login` endpoints |
| `doctorApi.js` | Calls `/doctors` to get all doctors or one doctor by ID |
| `appointmentApi.js` | Calls `/appointments/book` to book and `/appointments/my` to get history |

---

## 📂 `src/context/` — Global State

### `AuthContext.jsx`
Stores the **logged-in user's info and JWT token** so every page can access it.  
After login, the token is saved here and in `localStorage`.  
After logout, it is cleared from both.  
Think of it as a global variable that any component can read.

---

## 📂 `src/components/` — Reusable UI Pieces

These are small building blocks used inside pages.

| File | What it does |
|---|---|
| `Navbar.jsx` | Top navigation bar shown on every page. Has links to Doctors, Appointments, Login, Logout |
| `ProtectedRoute.jsx` | Guards pages that need login. If user is not logged in, redirects to `/login` automatically |
| `DoctorCard.jsx` | Displays one doctor's name, specialization, hours, and a Book button |
| `AppointmentCard.jsx` | Displays one appointment's doctor name, date, and status |

---

## 📂 `src/pages/` — One File Per Screen

Each file = one full screen the user sees.

| File | Feature | What it does |
|---|---|---|
| `RegisterPage.jsx` | 5.1 | Shows a form with Name, Email, Password. On submit, calls `authApi.registerUser()` and redirects to login |
| `LoginPage.jsx` | 5.2 | Shows Email and Password fields. On submit, calls `authApi.loginUser()`, saves the token, redirects to doctor list |
| `DoctorListPage.jsx` | 5.3 | Fetches all doctors from backend and displays them using `DoctorCard` components |
| `BookAppointmentPage.jsx` | 5.4 | Shows a date picker for the selected doctor. On confirm, calls `appointmentApi.bookAppointment()` |
| `AppointmentHistoryPage.jsx` | 5.5 | Fetches and displays all past appointments of the logged-in user |

---

## 📂 `src/hooks/` — Custom Hooks (Helper Logic)

Hooks extract reusable logic out of pages so pages stay clean.

| File | What it does |
|---|---|
| `useAuth.js` | Shortcut to read user and token from AuthContext. Used in Navbar and ProtectedRoute |
| `useDoctors.js` | Fetches the doctor list and stores it in state. Used in DoctorListPage |

---

## 📂 `src/utils/` — Utility Helpers

### `axiosInstance.js`
Creates a pre-configured Axios client with:
- **Base URL** set to `http://localhost:8080/api`
- **JWT interceptor** that automatically adds `Authorization: Bearer <token>` to every request

Every `api/` file imports this instead of plain `axios`.

---

## 📄 `.env`
Stores environment config. Currently holds the backend base URL.

```
REACT_APP_API_BASE_URL=http://localhost:8080
```

Change this when you deploy to production.

---

## 🔐 How Authentication Works (Simple Flow)

```
User fills Login form
    → LoginPage calls authApi.loginUser()
        → Spring Boot returns JWT token
            → Token saved in AuthContext + localStorage
                → User can now access protected pages
```

When user hits a protected page without login:
```
ProtectedRoute checks token
    → No token found
        → Redirects to /login
```

---

## 🔗 API Endpoints Expected from Spring Boot

| Method | Endpoint | Used In |
|---|---|---|
| POST | `/api/auth/register` | RegisterPage |
| POST | `/api/auth/login` | LoginPage |
| GET | `/api/doctors` | DoctorListPage |
| GET | `/api/doctors/{id}` | BookAppointmentPage |
| POST | `/api/appointments/book` | BookAppointmentPage |
| GET | `/api/appointments/my` | AppointmentHistoryPage |

---

## 🛠️ Tech Stack

| Tool | Purpose |
|---|---|
| React 19 | UI framework |
| React Router v6 | Page navigation |
| Axios | HTTP calls to Spring Boot |
| Context API | Global login state |

---

## 📌 Pages and Their Routes

| URL | Page | Login Required? |
|---|---|---|
| `/register` | RegisterPage | No |
| `/login` | LoginPage | No |
| `/doctors` | DoctorListPage | No |
| `/book/:doctorId` | BookAppointmentPage | ✅ Yes |
| `/appointments` | AppointmentHistoryPage | ✅ Yes |
