# 🧠 QuestsHub – Backend API

> 🚀 Backend service for **QuestsHub**, a gamified platform where developers complete coding quests, submit GitHub links, and track real progress over time.

This is the **backend API**, built with **Node.js**, **Express**, and **MongoDB** using Mongoose.

---

## 🚀 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **JWT Authentication**
- **Argon2 (password hashing)**
- **Zod (validation)**
- **Role-based access (Admin & Developer)**

---

## 📦 Features

- 🔐 Secure JWT auth system Access

---

## ⚙️ Getting Started

### 📁 Clone the repo

```bash
git clone https://github.com/itsbrijeshio/QuestsHub-Backend
cd QuestsHub-Backend
```

### 📦 Install dependencies

```bash
npm install
```

### ⚙️ Setup environment

Create a `.env.dev` file:

```env
NODE_ENV=development
PORT=3000
MONGODB_URL=mongodb://localhost:27017/quests-hub
JWT_SECRET=HZWTpvkA7PxnDywZgebHUH9RnFLnxf2D
JWT_EXPIRES_IN=3
FRONTEND_URL=http://localhost:5173
```

### ▶️ Run the dev server

```bash
npm run dev
```

---

## 🔐 Authentication Endpoints

| Method | Route                | Access | Description             |     |
| ------ | -------------------- | ------ | ----------------------- | --- |
| POST   | `/api/auth/register` | Public | Register a new user     |     |
| POST   | `/api/auth/login`    | Public | Login and receive token |     |
| POST   | `/api/auth/me`       | Auth   | Get current user info   |     |

## 🧾 License

This project is open-source and available under the [MIT License].

---

## 👏 Contributing

Feel free to fork, improve, and submit PRs. Issues welcome!

---

## 📫 Contact

Made by [Brijesh](https://github.com/itsbrijeshio) — feel free to reach out if you have questions or suggestions!
