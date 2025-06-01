# 🛒 Stack Store

**Stack Store** is a simple and educational e-commerce backend built with Node.js and TypeScript. The project showcases a clean architecture and best practices for building scalable REST APIs using Express, MongoDB, and modular code organization.

---

## 📁 Project Structure

```
stack-store/
├── src/
│   ├── config/         # Configuration files (e.g., database connection setup)
│   ├── controllers/    # Route handlers managing requests and responses
│   ├── database/       # Database initialization, migrations, or seed scripts
│   ├── middlewares/    # Custom Express middleware functions for validation, auth, etc.
│   ├── models/         # Mongoose schemas and data models
│   ├── routes/         # API route definitions and endpoints
│   ├── services/       # Business logic and interaction with data models
│   └── index.ts        # Application entry point
├── .env                # Environment variables (not committed)
├── .env.exp            # Example environment variables template
├── package.json        # Project dependencies and scripts
├── package-lock.json   # Exact dependency versions
├── tsconfig.json       # TypeScript configuration
└── README.md           # Project documentation
```

---

## 📦 Technologies Used

* **TypeScript** — Typed superset of JavaScript for safer code
* **Node.js** — JavaScript runtime environment
* **Express** — Web framework for Node.js
* **MongoDB** — NoSQL database for storing products and data
* **Mongoose** — MongoDB object modeling tool
* **Docker** *(optional)* — Containerization for deployment and development

---

## 🚀 Getting Started

Follow these steps to run the project locally:

### 1. Clone the repository

```bash
git clone https://github.com/jp9141joao/stack-store.git
cd stack-store
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory based on the example `.env.exp` file, and fill in your environment-specific settings:

```env
PORT=3000
DATABASE_URL=mongodb://localhost:27017/stackstore
JWT_SECRET=your_secret_key
```

### 4. Start the development server

```bash
npm run dev
```

The API will be available at: `http://localhost:3000`

---

## 📚 API Overview

The backend exposes CRUD operations for products including:

* Get all products
* Get product by ID or name
* Create new product
* Update existing product
* Delete product

---

## 🤝 Contributions

Feel free to open issues or submit pull requests. Contributions are welcome!
