

```md
# 🚀 The Loo – Full Stack MERN Application

A complete **MERN stack project** that includes:

- **Frontend** (React / React Native)
- **Backend** (Node.js + Express + MongoDB)
- **Admin Dashboard** (React Admin Panel)

This application supports **authentication, admin controls, cloud image uploads, and secure API operations**.

---

## 📁 Project Structure

```

The-Loo/
│
├── backend/
│   ├── server.js
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── middleware/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── screens/
│   └── utils/
│
└── admin/
├── src/
├── components/
└── pages/

````

---

# ⚙️ Backend Setup (Node.js + Express)

### 🔧 Install dependencies
```bash
cd backend
npm install
````

### 📝 Create `.env` file

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_app_password
```

### ▶️ Run backend

```bash
npm start
```

---

# 🖥️ Frontend Setup (React / React Native)

### 🔧 Install dependencies

```bash
cd frontend
npm install
```

### 🔗 Update API Base URL (`src/utils/api.js`)

```js
export const BASE_URL = "https://your-backend-url.com";
```

### ▶️ Run frontend

```bash
npm start
```

---

# 🛠️ Admin Dashboard Setup (React)

### 🔧 Install dependencies

```bash
cd admin
npm install
```

### 🔗 Update API URL (`src/api/api.js`)

```js
export const BASE_URL = "https://your-backend-url.com";
```

### ▶️ Run Admin Panel

```bash
npm start
```

---

# 🚀 Deployment Guide

## 🔵 Backend Deployment (Render / Railway / Cyclic)

1. Upload backend folder
2. Add `.env` environment variables
3. Deploy as Web Service
4. Copy backend URL and update frontend/admin

---

## 🟣 Frontend Deployment (Vercel / Netlify)

1. Upload frontend
2. Add backend API URL
3. Deploy

---

## 🔴 Admin Panel Deployment (Vercel)

1. Upload admin folder
2. Add backend API URL
3. Deploy

---

# 📡 API Features

* User Signup / Login
* JWT Authentication
* Forgot Password (OTP Email)
* Cloudinary Image Upload
* Admin Role Access
* CRUD APIs
* Protected Routes

---

# 🧪 Testing APIs

### Backend Test

```http
GET /api/test
```

### User Login

```http
POST /api/auth/login
```

### Admin Test Route

```http
GET /api/admin/users
```

---

# 📦 Tech Stack

### 🖥️ Frontend

* React / React Native
* Axios
* AsyncStorage
* Lottie Animations

### ⚙️ Backend

* Node.js
* Express
* MongoDB
* Mongoose
* JWT
* Cloudinary

### 🛠️ Admin

* React
* Material UI
* Recharts
* Tailwind

---

# 👩‍💻 Author

**Vaishnavi Jaiswal**
Full Stack MERN Developer
India 🇮🇳

