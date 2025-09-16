# Sutra – Student Performance Tracker

Sutra is a comprehensive **web application** designed to streamline student performance tracking for universities and colleges. It allows students, faculty, admins, and parents to access relevant academic information, manage assignments, upload marks, and monitor progress efficiently.

---

## **Table of Contents**
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

---

## **Features**

- **Role-based Access**: Different dashboards and permissions for students, faculty, admins, and parents.
- **Student Dashboard**: View marks, assignments, and academic progress.
- **Faculty Dashboard**: Upload marks, manage assignments, and track submissions.
- **Admin Panel**: Manage users, roles, and overall system settings.
- **Parent Dashboard**: Monitor student performance.
- **Secure Authentication**: JWT-based login and signup.
- **Responsive UI**: Works on desktop and mobile devices.

---

## **Tech Stack**

### **Frontend**
- React.js with Hooks and Context API
- React Router v6 for routing
- Axios for API calls
- Tailwind CSS for styling (or custom CSS)

### **Backend**
- Node.js with Express.js
- Prisma ORM with PostgreSQL
- JWT Authentication
- bcrypt for password hashing
- Node-cron for background tasks (optional)

### **Deployment**
- Frontend: Vercel / Netlify
- Backend: Render / Railway
- Database: Managed PostgreSQL

---

## **Installation**

1. **Clone the repository**
```bash
git clone https://github.com/SChandini31/sutra.git
cd sutra
