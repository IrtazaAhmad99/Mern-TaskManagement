# Task Manager MERN App

A Mern-stack task management system with authentication, OTP verification, role-based access, and real-time updates using Socket.io. 

## Tech Stack
- React.js
- Node.js
- Express.js
- MongoDB
- Socket.io
- JWT Authentication
- Tailwind CSS

## Features
- User registration & login
- OTP email verification (10 min expiry)
- Resend OTP functionality
- JWT authentication
- Role-based access (Admin/User)
- Task CRUD operations
- Real-time task updates (Socket.io)
- Admin user management

## Installation

### Backend
cd Backend
npm install
nodemon server.js

### Frontend
cd Frontend
npm install  
npm run dev

## Environment Variables

Create `.env` file:

PORT=5000;
MONGO_URI="mongodb+srv://iratzaahmad3321_db_user:OapyBacHJ6rJj7C3@cluster0.qaycrm1.mongodb.net/?appName=Cluster0";
JWT_SECRET="WI2KLO44THBFXG0"

EMAIL_USER="iratzaahmad3321@gmail.com";
EMAIL_PASS="zwic lfxz zgav gcrt";

