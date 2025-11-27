

```md
# 🚀 The-Loo – Full Stack MERN Application

A complete MERN (MongoDB, Express, React, Node.js) project including:

- **Frontend (React / React Native)**
- **Backend (Node.js + Express + MongoDB)**
- **Admin Dashboard (React Admin Panel)**

The app supports **user authentication, admin management, full API integration, and real-time operations**.

---

## 📁 Project Structure

```

root/
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

# ⚙️ Backend Setup (Node.js + Express + MongoDB)

### **Install Dependencies**
```bash
cd backend
npm install
````

### **Create .env file**

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=xxxxx
CLOUDINARY_API_KEY=xxxxx
CLOUDINARY_API_SECRET=xxxxx
```

### **Run Backend**

```bash
npm start
```

---

# 🖥️ Frontend Setup (React / React Native)

### **Install Dependencies**

```bash
cd frontend
npm install
```

### **Update API Base URL**

Inside:
`frontend/src/utils/api.js`

```
export const BASE_URL = "https://yourdeployedbackend.com";
```

### **Run Frontend**

```bash
npm start
```

---

# 🛠️ Admin Dashboard Setup

### **Install Dependencies**

```bash
cd admin
npm install
```

### **Update API URL**

Inside:
`admin/src/api/api.js`

```
export const BASE_URL = "https://yourdeployedbackend.com";
```

### **Run Admin Panel**

```bash
npm start
```

---

# 🚀 Deployment Guide

## 🔵 Backend Deployment (Render / Railway / Cyclic)

1. Upload backend folder
2. Add `.env` variables
3. Enable Web Service
4. Copy deployed backend URL

---

## 🟣 Frontend Deployment (Vercel / Netlify)

1. Upload frontend folder
2. Update API base URL
3. Deploy

---

## 🔴 Admin Panel Deployment (Vercel)

1. Upload admin folder
2. Update API URL
3. Deploy

---

# 📡 API Features

* User Signup / Login
* JWT Authentication
* Admin role-based access
* Cloudinary image upload
* CRUD API
* Secure protected routes

---

# 🧪 API Testing

### **Backend Test**

```
GET /api/test
```

### **Login Test**

```
POST /api/auth/login
```

### **Admin Test**

```
GET /api/admin/users
```

---

# 📦 Tech Stack

### **Frontend**

* React / React Native
* Axios
* Async Storage
* Lottie Animations

### **Backend**

* Node.js
* Express
* MongoDB
* Mongoose
* JWT
* Cloudinary

### **Admin Panel**

* React
* Recharts
* Material UI / Tailwind

---

# ✨ Author

**Vaishnavi Jaiswal**
Full Stack MERN Developer
India 🇮🇳

---

```


