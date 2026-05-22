# 🎬 VidCraft — Full Stack Video Editing Service Platform

A complete MERN stack web application for booking professional video editing services, built as a final year college project.

## ✨ Features

### User Panel
- ✅ Register & Login with JWT authentication
- 🎬 Browse available video editing services
- 📋 Book services with full project details
- 📁 Upload project files (up to 100MB)
- 📊 View booking history & track status
- 📨 Contact form to reach admin

### Admin Panel
- 🔐 Secure admin login
- 📊 Analytics dashboard (users, bookings, revenue stats)
- 🎬 Add / Edit / Delete services
- 📋 View & manage all bookings
- 🔄 Update booking status (Pending → In Progress → Completed)
- ✉️ Read & reply to contact messages
- 🌱 One-click sample data seeding

### Technical Features
- 🎮 3D animated camera scene using Three.js
- 🎨 Custom CSS with black/white/red theme
- 📱 Responsive design (mobile-friendly)
- 🔒 JWT-based auth with role protection
- 📁 File upload with Multer

---

## 🗂️ Project Structure

```
video-platform/
├── backend/
│   ├── models/          # Mongoose schemas (User, Service, Booking, Contact)
│   ├── routes/          # Express route handlers
│   ├── middleware/       # JWT auth middleware
│   ├── uploads/         # Uploaded files (auto-created)
│   ├── .env.example     # Environment variable template
│   └── server.js        # Entry point
│
└── frontend/
    ├── public/
    └── src/
        ├── components/  # Navbar, Footer, ThreeScene
        ├── context/     # AuthContext (React Context)
        ├── pages/       # Home, Services, Booking, Contact, Login, Register, Dashboard
        │   └── admin/   # AdminDashboard, AdminServices, AdminBookings, AdminMessages
        ├── styles/      # global.css
        ├── utils/       # api.js (Axios instance)
        └── App.jsx      # Routing setup
```

---

## 🚀 Setup & Installation

### Prerequisites
- Node.js v18+ 
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- npm or yarn

---

### Step 1 — Clone & Setup Backend

```bash
cd video-platform/backend

# Install dependencies
npm install

# Create .env file from template
cp .env.example .env
```

Edit `.env` with your values:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/video-platform
JWT_SECRET=your_super_secret_key_here_make_it_long
ADMIN_EMAIL=admin@vidcraft.com
ADMIN_PASSWORD=admin123
```

> **MongoDB Atlas**: Replace MONGO_URI with your Atlas connection string.

---

### Step 2 — Setup Frontend

```bash
cd video-platform/frontend

# Install dependencies
npm install
```

---

### Step 3 — Start Both Servers

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev        # Uses nodemon (auto-restart)
# OR
npm start          # Production mode
```
> Backend runs on: http://localhost:5000

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
```
> Frontend runs on: http://localhost:5173

---

### Step 4 — Initialize Admin Account

After backend starts, run this **once** in your terminal or browser:

```bash
curl -X POST http://localhost:5000/api/auth/seed-admin
```

Or just visit: `http://localhost:5000/api/auth/seed-admin` in browser (POST via Postman).

---

### Step 5 — Seed Sample Services (Optional)

1. Login as admin at http://localhost:5173/login
   - Email: `admin@vidcraft.com`
   - Password: `admin123`
2. Go to Admin Dashboard
3. Click **"🌱 Seed Sample Services"** button
4. 6 sample services will be added automatically

---

## 🔑 Default Credentials

| Role  | Email               | Password |
|-------|---------------------|----------|
| Admin | admin@vidcraft.com  | admin123 |
| User  | (register yourself) | —        |

---

## 📡 API Endpoints

### Auth
| Method | Route                    | Access |
|--------|--------------------------|--------|
| POST   | /api/auth/register       | Public |
| POST   | /api/auth/login          | Public |
| GET    | /api/auth/me             | User   |
| POST   | /api/auth/seed-admin     | Public (run once) |

### Services
| Method | Route              | Access |
|--------|--------------------|--------|
| GET    | /api/services      | Public |
| POST   | /api/services      | Admin  |
| PUT    | /api/services/:id  | Admin  |
| DELETE | /api/services/:id  | Admin  |

### Bookings
| Method | Route                     | Access |
|--------|---------------------------|--------|
| POST   | /api/bookings             | User   |
| GET    | /api/bookings/my          | User   |
| GET    | /api/bookings/all         | Admin  |
| PUT    | /api/bookings/:id/status  | Admin  |
| DELETE | /api/bookings/:id         | Admin  |

### Contacts
| Method | Route              | Access |
|--------|--------------------|--------|
| POST   | /api/contacts      | Public |
| GET    | /api/contacts      | Admin  |
| PUT    | /api/contacts/:id  | Admin  |
| DELETE | /api/contacts/:id  | Admin  |

### Admin
| Method | Route                    | Access |
|--------|--------------------------|--------|
| GET    | /api/admin/dashboard     | Admin  |
| POST   | /api/admin/seed-services | Admin  |

---

## 🛠️ Tech Stack

| Layer    | Technology |
|----------|------------|
| Frontend | React 18, Vite, React Router v6 |
| 3D       | Three.js |
| HTTP     | Axios |
| Backend  | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Auth     | JWT (jsonwebtoken), bcryptjs |
| Upload   | Multer |
| Styling  | Custom CSS (no UI framework) |

---

## 🎓 Academic Information

**Project Title:** Full Stack Video Editing Service Platform  
**Tech Stack:** MERN (MongoDB, Express.js, React.js, Node.js)  
**Features:** Authentication, CRUD operations, File Upload, Role-based Access, 3D Elements  

---

## 📝 Notes

- File uploads are stored in `backend/uploads/` folder
- JWT tokens expire in 7 days
- The Vite dev proxy forwards `/api/*` requests to `http://localhost:5000`
- All admin routes are protected by `adminAuth` middleware
- CORS is configured for `http://localhost:5173` only
