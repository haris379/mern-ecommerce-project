# MERN Stack E-Commerce Website

A full-stack e-commerce web application built using the MERN stack. The project provides a complete shopping experience for customers along with an admin panel for managing products and orders.

## Features

### User Features

* User registration and login
* JWT-based authentication
* Browse available products
* View product details
* Add products to cart
* Update cart quantities
* Remove products from cart
* Checkout and address management
* Place orders
* Order confirmation

### Admin Features

* Admin authentication
* Admin dashboard
* Add new products
* View product list
* Edit existing products
* Delete products
* Manage product categories
* Manage products and inventory

## Tech Stack

### Frontend

* React.js
* React Router
* Tailwind CSS
* Axios
* JavaScript (ES6+)
* Vite

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt

## Project Structure

```text
E-Commerce/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api/
│   │   └── App.jsx
│   └── package.json
│
└── backend/
    ├── controllers/
    ├── models/
    ├── routes/
    ├── middleware/
    ├── server.js
    └── package.json
```

## Installation

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd E-Commerce
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Configure Environment Variables

Create a `.env` file inside the backend folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 4. Start the Backend

```bash
npm run dev
```

### 5. Install Frontend Dependencies

Open another terminal:

```bash
cd frontend
npm install
```

### 6. Start the Frontend

```bash
npm run dev
```

The application will then be available through the Vite development server.

## Application Workflow

```text
User
 │
 ├── Sign Up / Login
 │
 ├── Browse Products
 │
 ├── Add Product to Cart
 │
 ├── View Cart
 │
 ├── Checkout
 │
 ├── Add Address
 │
 └── Place Order


Admin
 │
 ├── Login
 │
 ├── Product List
 │
 ├── Add Product
 │
 ├── Edit Product
 │
 └── Delete Product
```

## API Modules

The backend REST API is organized into different modules:

* Authentication APIs
* Product APIs
* Cart APIs
* Order APIs
* Category APIs

## Authentication

The application uses JWT-based authentication to securely authenticate users. Passwords are encrypted using bcrypt before being stored in the database.

User roles are used to control access to admin functionality.

## Database

MongoDB is used as the primary database, with Mongoose providing schema definitions and database interaction.

Main collections include:

* Users
* Products
* Cart
* Orders
* Categories

## Future Improvements

* Product search
* Product filtering and sorting
* Product reviews and ratings
* Wishlist
* Payment gateway integration
* Order tracking
* Admin analytics dashboard
* Image upload functionality
* Pagination
* Email notifications

## License

This project was developed for learning and portfolio purposes.

## Author

**Muhammad Haris**

MERN Stack Developer
