# ⚙ EcoTrack Backend – CommonJS Version

This is the backend server for the EcoTrack Admin Panel, converted from ESM to CommonJS for wider compatibility.

---

##  Tech Stack

- **Node.js** with **Express.js**
- **MongoDB** with **Mongoose**
- **JWT** for authentication
- **bcryptjs** for password hashing
- **dotenv** for environment variables

---

##  Getting Started

### 1. **Clone the repository**

```bash
git clone https://github.com/EcoTrack-projectSMISKIs/EcoTrack-Admin-webside.git
cd EcoTrack-Admin-webside/backend
```

### 2. **Install dependencies**

```bash
npm install
```

---

##  Environment Variables

Create a `.env` file inside the `backend/` folder and add the following:

```env
PORT=5003
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

---

##  Run the server

```bash
node server.js
```

---

##  Folder Structure

```
backend/
├── config/            # MongoDB connection
├── controllers/       # Route handlers (User, Admin, News)
├── middleware/        # Authentication middleware
├── models/            # Mongoose schemas
├── routes/            # Express route files
├── server.js          # Entry point
```

---

##  API Endpoints

### Admin Auth

- `POST /api/admin/login`

### Users

- `POST /api/users/register`
- `POST /api/users/login`
- `GET /api/users/users` _(Protected)_
- `PUT /api/users/:id`
- `DELETE /api/users/:id`

### News

- `GET /api/news`
- `POST /api/news`
- `PUT /api/news/:id`
- `DELETE /api/news/:id`

---

##  Notes

- All endpoints returning sensitive data (like users) are protected by JWT.
- This version uses **CommonJS** syntax (`require/module.exports`) instead of ESM (`import/export`).

---
