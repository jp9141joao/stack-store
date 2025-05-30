# 🛒 Stack Store

**Stack Store** is a basic e-commerce backend project built for educational purposes. It demonstrates the structure of a simple Node.js application using TypeScript and follows best practices for organizing controllers, routes, services, and middleware.

## 📁 Project Structure

```
stack-store/
├── src/
│   ├── config/         # Configuration files (e.g., database connection)
│   ├── controllers/    # Request handlers
│   ├── database/       # Database initialization or seed files
│   ├── middlewares/    # Custom Express middlewares
│   ├── models/         # Database models or schemas
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   └── index.ts        # Entry point
├── .env                # Environment variables
├── .env.exp            # Example environment file
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

## 📦 Technologies Used

* **TypeScript**
* **Node.js**
* **Express**
* **MongoDB** (or another DB, depending on your `.env`)
* **Docker** (optional, for containerization)

## 🚀 Getting Started

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

Create a `.env` file based on `.env.exp`:

```env
PORT=3000
DATABASE_URL=mongodb://localhost:27017/stackstore
JWT_SECRET=your_secret_key
```

### 4. Start the development server

```bash
npm run dev
```

Visit: `http://localhost:3000`

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
