📦 Product Management System

A full-stack Product Management System built with MySQL, Express.js, React (Vite), and Bootstrap.
The system supports CRUD operations, soft delete with restore (30-day limit), search, sorting, pagination, and a reusable table component.

🌐 Live Demo

Check out the live application here:
Product Management System

🚀 Features
Backend (Node.js + Express + MySQL)

CRUD operations for products

Soft delete using deleted_at timestamp

Restore product within 30 days

MySQL trigger to prevent restore after 30 days

RESTful API design

Secure parameterized SQL queries

Frontend (Vite + React + Bootstrap)

Product listing with:

Search / filter

Column sorting

Pagination

Toggle between Active and Deleted products

Add / Edit products using modal

Restore soft-deleted products

🏗 Tech Stack
Backend

Node.js

Express.js

MySQL

mysql2

dotenv

cors

Frontend

React (Vite)

Bootstrap

Axios

📂 Project Structure
product-management-system/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   └── productController.js
│   │   ├── models/
│   │   │   └── productModel.js
│   │   ├── routes/
│   │   │   └── productRoutes.js
│   │   └── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── productApi.js
│   │   ├── components/
│   │   │   ├── DataTable.jsx
│   │   │   ├── ProductModal.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   └── ErrorAlert.jsx
│   │   ├── pages/
│   │   │   └── Products.jsx
│   │   └── App.jsx
│   └── package.json
│
└── README.md

🗄 Database Schema
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  deleted_at TIMESTAMP NULL DEFAULT NULL
);

⏳ Restore Protection Trigger (30 Days)
DELIMITER $$

CREATE TRIGGER prevent_old_restore
BEFORE UPDATE ON products
FOR EACH ROW
BEGIN
  IF OLD.deleted_at IS NOT NULL
     AND NEW.deleted_at IS NULL
     AND OLD.deleted_at < NOW() - INTERVAL 30 DAY
  THEN
    SIGNAL SQLSTATE '45000'
    SET MESSAGE_TEXT = 'Restore period expired (30 days)';
  END IF;
END$$

DELIMITER ;

🔌 API Endpoints
Method	Endpoint	Description
GET	/api/products	Get active products
GET	/api/products?deleted=true	Get deleted products
POST	/api/products	Add new product
PUT	/api/products/:id	Update product
DELETE	/api/products/:id	Soft delete product
PUT	/api/products/:id/restore	Restore product (≤30 days)
🖥 Frontend Reusable Table

The DataTable component:

Accepts columns and data as props

Supports:

Search filtering

Column sorting

Pagination

Can be reused for any entity

Example:

<DataTable
  columns={columns}
  data={products}
  pageSize={5}
/>

▶️ Running the Project
Backend
cd backend
npm install
npm run dev

Frontend
cd frontend
npm install
npm run dev

📌 Environment Variables

Create a .env file in backend:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=product_db
PORT=3000

Reusable DataTable component

Error and loading handling
