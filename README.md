# 🎮 GameShipperz

**GameShipperz** is a full-stack, gaming-oriented e-commerce and article-based platform. It provides a seamless experience for enthusiasts to browse, search, and purchase the latest video games, consoles, and high-performance gaming PCs, while also staying up to date with the latest gaming news and mini-articles.

## 🚀 The React Migration (V2.0)

Originally built with Vanilla HTML, CSS, and JavaScript, the frontend of GameShipperz has been completely rewritten and migrated to **React (Vite)** to create a lightning-fast Single Page Application (SPA). 

### ✨ What's New in V2.0?
- **Component-Based Architecture:** Replaced repetitive HTML files with reusable React components (Navbar, Footer, Product Cards).
- **Client-Side Routing:** Implemented `react-router-dom` for instant page transitions without browser reloads.
- **Global Authentication:** Replaced local `useEffect` checks with the **React Context API** (`AuthContext`) for seamless, app-wide login state management.
- **Protected Routes:** Built a `<ProtectedRoute>` wrapper to automatically redirect unauthorized users away from secure pages like the Cart.
- **Custom Hooks:** Extracted repetitive data-fetching logic into a reusable `useProducts` custom hook.
- **Tailwind CSS v4:** Migrated traditional CSS to Tailwind utility classes, maintaining the signature dark theme while improving maintainability.
- **Modern UX:** Replaced jarring native browser `alert()` popups with sleek, animated notifications using `react-hot-toast`.
- **Localized Loading States:** Swapped full-page blocking loaders with localized `<Loader />` components that only cover data grids while preserving the UI skeleton.
- **Environment Variables:** Secured API endpoints using `.env` configurations for seamless local testing and production deployment.

## 🛠️ Tech Stack

**Frontend (React SPA):**
* React 18 (Vite)
* Tailwind CSS v4
* React Router DOM
* React Hot Toast (Notifications)

**Backend (REST API):**
* Node.js & Express.js
* MongoDB (Mongoose)
* JWT (JSON Web Tokens)
* Bcrypt (Password Hashing)
* Cors & Dotenv

## ✨ Key Features

* **Secure Authentication:** User signup and login system utilizing bcrypt for password hashing and JSON Web Tokens (JWT) for secure session management.
* **Dynamic Product Catalog:** Browse dedicated sections for Games, Consoles, and Gaming PCs fetched dynamically from the MongoDB backend.
* **Gaming Articles:** A dedicated content section for the latest mini-articles and news in the gaming world.
* **Advanced Filtering & Sorting:** Real-time search, brand/platform filtering, and price sorting capabilities for all products.
* **Interactive Cart Management:** Add items, view cart totals, and remove products instantly. The cart state is securely linked to the authenticated user.
* **Responsive UI/UX:** A sleek, dark-themed user interface that looks great on both desktop and mobile devices.


## 🚀 Installation & Setup

To run this project locally, follow these steps:

### Prerequisites
* [Node.js](https://nodejs.org/) installed
* A [MongoDB](https://www.mongodb.com/) URI (Local or Atlas)

### 1. Clone the repository
```bash
git clone https://github.com/ramanbhatia3/GameShipperz-MERN.git

cd GameShipperz-MERN
```

### 2. Backend Setup

Navigate to the backend directory, install dependencies, and set up your environment variables.

```bash
cd backend

npm install
```

Create a .env file in the backend folder and add the following:

```bash
PORT = 1234

MONGO_URL = your_mongodb_connection_string

TOKEN = your_custom_jwt_secret_key
```

Start the server:

```bash
npm run server
```

The backend should now be running on http://localhost:1234

### 3. Frontend Setup (React)

Open a new terminal window and navigate to the frontend directory.

```bash
cd frontend

npm install
```

Create a .env file in the root of the frontend folder to connect to your backend:

```bash
VITE_API_BASE_URL = http://localhost:1234
```

Start the Vite development server:

```bash
npm run dev
```

The frontend should now be running on http://localhost:5173 (or the port Vite provides).

---

If you found this project helpful or interesting, feel free to leave a ⭐ on the repository!