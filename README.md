# Task Manager - Full Stack Application

A modern, full-featured task management application with authentication, dark mode, and real-time updates.

## 🚀 Features

- ✅ User authentication with Auth0
- ✅ Create, read, update, and delete tasks
- ✅ Mark tasks as complete/incomplete
- ✅ Filter tasks (All, Active, Completed)
- ✅ Search functionality
- ✅ Edit tasks inline
- ✅ Task statistics dashboard
- ✅ Dark mode with persistence
- ✅ Toast notifications
- ✅ Responsive design

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- Auth0 React SDK
- React Hot Toast

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- JWT authentication
- CORS

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- Auth0 account

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
AUTH0_DOMAIN=your_auth0_domain
```

4. Start server:
```bash
node server.js
```

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```
VITE_AUTH0_DOMAIN=your_auth0_domain
VITE_AUTH0_CLIENT_ID=your_auth0_client_id
VITE_AUTH0_AUDIENCE=http://localhost:5000
```

4. Start development server:
```bash
npm run dev
```

## 🌐 Usage

1. Open `http://localhost:5173` in your browser
2. Log in with Auth0
3. Start managing your tasks!

## 📝 License

MIT

## 👨‍💻 Author

Elton Bleta
