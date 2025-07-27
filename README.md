<!-- markdownlint-disable MD012 MD026 MD001 MD022 MD032 MD029 MD019 MD034 MD031 MD047 MD040 MD009 MD058 MD024  -->

# 📚 Library Management API

A **RESTful API** built using **Express**, **TypeScript**, and **MongoDB (Mongoose)** to manage a simple Library Management System. The API allows users to perform operations on books and borrow records with robust validation, business logic, and aggregation features.

## 🧱 Live demo: [Library Management API](https://phl-2-assignment-03-zeta.vercel.app)


## 🚀 Features

- CRUD operations for books
- Borrow book functionality with availability checks
- Aggregated borrow summary using MongoDB pipeline
- Mongoose middleware, static/instance methods implemented
- Filtering, sorting, and pagination on book retrieval
- Schema validation and centralized error handling


## 🛠 Tech Stack

- **Backend Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Validation**: Mongoose schema validation
- **API Format**: RESTful with JSON


## 📁 Project Structure
```
📁 library-management-api
├── 📁 src
│   ├── 📁 config
│   ├── 📁 controllers
│   ├── 📁 middlewares
│   ├── 📁 models
│   ├── 📁 routes
│   ├── 📁 validations
│   └── 📄server.ts
├── 📁 tests
└── 📁 docs
├── 📄 .env
├── 📄 .gitignore
├── 📄 package.json
├── 📄 tsconfig.json
├── 📄 README.md
└── 📄 LICENSE
```

## 📦 Installation & Setup
```bash
# Clone the repository
git clone 

# Navigate into the project directory
cd library-management-api

# Install dependencies
npm install

# Create .env file and configure your MongoDB URI
cp .env.example .env

# Build TypeScript files
npm run build

# Start the server
npm run start
```

## 🌐 API Endpoints
### 📘 Books
### ➕ Create a Book
`POST /api/books`
```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}
```

## 📚 Get All Books
`GET /api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5`

**Supports**:
- Filtering by genre
- Sorting by field
- Pagination via limit

#### 📖 Get Book by ID
`GET /api/books/:bookId`

#### ✏️ Update Book
`PUT /api/books/:bookId`

#### ❌ Delete Book
`DELETE /api/books/:bookId`


## 🔄 Borrow
#### ✅ Borrow a Book
`POST /api/borrow`
```json
{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```
**Business Logic**:

- Ensures enough copies available
- Updates available status if copies reach 0
- Reduces book copies count accordingly

#### 📊 Borrowed Books Summary
`GET /api/borrow`

**Uses aggregation pipeline to summarize**:
- Total quantity borrowed per book
- Includes book title and ISBN

## ⚙️ Validation & Error Handling
All API responses follow a consistent structure:

### ✅ Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### ❌ Error Response
```json
{
  "message": "Validation failed",
  "success": false,
  "error": {
    "name": "ValidationError",
    "errors": {
      "copies": {
        "message": "Copies must be a positive number",
        ...
      }
    }
  }
}
```

### ✨ Highlights
- ✅ Mongoose Middleware (pre, post)
- ✅ Static/Instance Methods for book availability control
- ✅ Aggregation Pipeline for borrow summary
- ✅ Filtering, Sorting & Pagination support
- ✅ Modular Project Structure

### 📌 `Genre` Options
Books must have a `genre` value of:

`FICTION`
`NON_FICTION`
`SCIENCE`
`HISTORY`
`BIOGRAPHY`
`FANTASY`

### 🧪 Run in Development
```bash
# Start development server with nodemon
npm run dev
```

## 👤 Author
[E-mail](mailto:ashagar619@gmail.com) - [GitHub](https://github.com/shagar619) - [LinkedIn](https://www.linkedin.com/in/shagar619)