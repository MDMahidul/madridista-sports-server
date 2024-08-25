# Madridista Sports Backend Server

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
  - [User](#user)
  - [Product](#product)
  - [Cart](#cart)
  - [Order](#order)
- [Error Handling](#error-handling)
- [Live Link](#live-link)

## Introduction

This project is a backend server for a sports goods e-commerce website. It provides RESTful API endpoints for managing users, products,and orders. The server handles product CURD operation, cart items and order processes.

## Features

- User authentication (signup, login)
- Role-based access control (super admin,admin, user)
- CRUD operations for products (super admin and admin only)
- CRUD operations for carts (user only)
- Order management
  - Placed order
  - Get oreder data
- Error handling

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- TypeScript
- JWT (JSON Web Tokens) for authentication
- Zod for data validation
- HTTP Status for status code
- bcrypt for password hashing

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB

### Installation

#### 1. Clone the repository:

```bash
git clone https://github.com/MDMahidul/madridista-sports-server
cd madridista-sports-server
```

#### 2. Install dependencies:

```bash
npm install
```

### Configuration

Create a .env file in the root directory and add the following environment variables:

```bash
NODE_ENV =choose_development_or_production
PORT=5000
DATABASE_URL=MongoDB_URL
BCRYPT_SALT_ROUNDS=12
JWT_ACCESS_SECRET= jwt_secret
JWT_ACCESS_EXPIRES_IN= expire_time
RESET_PASS_UI_LINK=frontend_URL/reset-password
JWT_ACCESS_EXPIRES_IN=1d
JWT_REFRESH_EXPIRES_IN=365d
SUPER_ADMIN_PASSWORD = super_admin_password

```

### Running the server

To start the server in development mode:

```bash
npm run start:dev
```

To start the server in production mode:

```bash
npm run start:prod
```

## API Endpoints

### User

- **Sign Up**

  - **Route**: /api/auth/signup (POST)
  - **Request Body**:
    ```json
    {
      "user": {
        "name": "Mr. User",
        "gender": "male",
        "email": "user2@xaemple.com",
        "contactNo": "1234567890",
        "address": "123 Main St, Anytown, AT 12345",
        "password": "user123",
        "role": "user"
      }
    }
    ```

- **User Login**

  - **Route**: /api/user/user-signup (POST)
  - **Request Body**:

    ```json
    {
      "email": "john@example.com",
      "password": "password123"
    }
    ```

- **Get Profile**

  - **Route**: /api/users/profile (GET)
  - **Request Headers**: Authorization: jwt_token

- **Update Profile**
  - **Route**: /api/users/update-user-profile (PUT)
  - **Request Headers**: Authorization: jwt_token
  - **Request Body**:
    ```json
    {
      "user": {
        "name": "Clark Kent"
      }
    }
    ```

### Product

- **Add Product**
  - **Route**: /api/product/add-product (POST)
  - **Request Body**:
    ```json
    {
      "name": "NIVIA Ultra Football Stud",
      "brand": "nivia",
      "category": "football",
      "price": 80,
      "ratings": 4.3,
      "quantity": 15,
      "off": 15,
      "description": "Sample product description",
      "imageLink": "https://shorturl.at/sQWMc",
      "isDeleted": false
    }
    ```
  - **Response**:
    ```json
    {
      "success": true,
      "statusCode": 200,
      "message": "Product added successfully!",
      "data": {
        "name": "NIVIA Ultra Football Stud",
        "brand": "nivia",
        "category": "football",
        "price": 80,
        "ratings": 4.3,
        "quantity": 15,
        "off": 15,
        "description": "Sample product description",
        "imageLink": "https://shorturl.at/sQWMc",
        "isDeleted": false,
        "_id": "66918d7e1a6dd60f3077d6e0",
        "createdAt": "2024-07-12T20:09:34.652Z",
        "updatedAt": "2024-07-12T20:09:34.652Z",
        "__v": 0
      }
    }
    ```
- **Get All Products**

  - **Route**: /api/product/all-products (GET)
  - **Route**: /api/product/all-products?name=p_name (user can search products by name)
  - **Route**: /api/product/all-products?category=p_category (user can search or filter products by category)
  - **Response**:

    ```json
    {
      "success": true,
      "statusCode": 200,
      "message": "Products data retrieved successfully",
      "data": [
        {
          product data....
        },
        ...other data...
      ]
    }

    ```

- **Get Single Product**
  - **Route**: /api/product/get-product/:id (GET)
  - **Response**:
    ```json
    {
      "success": true,
      "statusCode": 200,
      "message": "Product data retrieved successfully",
      "data": [
        {
          "name": "NIVIA Ultra Football Stud",
          "brand": "nivia",
          "category": "football",
          "price": 80,
          "ratings": 4.3,
          "quantity": 15,
          "off": 15,
          "description": "Sample product description",
          "imageLink": "https://shorturl.at/sQWMc",
          "isDeleted": false,
          "_id": "66918d7e1a6dd60f3077d6e0",
          "createdAt": "2024-07-12T20:09:34.652Z",
          "updatedAt": "2024-07-12T20:09:34.652Z",
          "__v": 0
        }
      ]
    }
    ```
- **Update Product**
  - **Route**: /api/product/update-product/:id (PUT)
  - **Request Body**:
    ```json
    {
      "quantity": 25
    }
    ```
  - **Response**:
    ```json
    {
      "success": true,
      "statusCode": 200,
      "message": "Product updated successfully",
      "data": {
        "_id": "66912f2fdaeb240cc2656afa",
        "name": "Real madrid home kit",
        "brand": "addidas",
        "category": "football",
        "price": 100,
        "ratings": 4.5,
        "quantity": 50,
        "off": 20,
        "description": "Sample product description",
        "imageLink": "https://shorturl.at/MqJpq",
        "isDeleted": false,
        "createdAt": "2024-07-12T13:27:11.582Z",
        "updatedAt": "2024-07-15T17:40:02.508Z",
        "__v": 0
      }
    }
    ```
- **Delete Product (soft delete)**
  - **Route**: /api/product/delete-product/:id (DELETE)
  - **Response**:
    ```json
    {
      "success": true,
      "statusCode": 200,
      "message": "Product deleted successfully",
      "data": {
        "name": "NIVIA Ultra Football Stud",
        "brand": "nivia",
        "category": "football",
        "price": 80,
        "ratings": 4.3,
        "quantity": 15,
        "off": 15,
        "description": "Sample product description",
        "imageLink": "https://shorturl.at/sQWMc",
        "isDeleted": true,
        "_id": "66918d7e1a6dd60f3077d6e0",
        "createdAt": "2024-07-12T20:09:34.652Z",
        "updatedAt": "2024-07-12T20:09:34.652Z",
        "__v": 0
      }
    }
    ```

### Cart

- **Add To Cart**
  - **Route**: /api/cart/add-to-cart (POST)
  - **Request Headers**: Authorization: jwt_token
  - **Request Body**:
    ```json
    {
      "items": [
        {
          "product": "6693b7e2f6131984689ee15a",
          "quantity": 1
        }
      ]
    }
    ```
- **Get All Cart**
  - **Route**: /api/cart/get-cart (GET)
  - **Request Headers**: Authorization: jwt_token
- **Update Cart Item**
  - **Route**: /api/cart/update-cart (PATCH)
  - **Request Headers**: Authorization: jwt_token
  - **Request Body**:
    ```json
    {
      "productId": "6693f021393bb69b060b0e51",
      "quantity": 2
    }
    ```
- **Remove Item From Cart**

  - **Route**: /api/cart/remove-cart (PUT)
  - **Request Headers**: Authorization: jwt_token
  - **Request Body**:
    ```json
    {
      "productId": "6693b7e2f6131984689ee15a"
    }
    ```

- **Clear Cart**
  - **Route**: /api/cart/clear-cart (PUT)
  - **Request Headers**: Authorization: jwt_token

### Order:

- **Placed Order**

  - **Route**: /api/order/add-order (POST)
  - **Request Headers**: Authorization: jwt_token
  -**Item Data**: Cart items will be add automatically to the order item list and cart data will be clear
  - **Request Body**:
    ```json
    {
      "phoneNumber": "1234567890",
      "address": "123 Main Street, Anytown, USA",
      "paymentMethod": "Credit Card"
    }

    ```
- **Get Order Data**

  - **Route**: /api/order/get-user-order (GET)
  - **Request Headers**: Authorization: jwt_token


## Error Handling

Errors are handled using custom error classes and middleware. Common errors include:

- **Not Found Route**:

  - Implemented a global "Not Found" handler for unmatched routes. When a route is not found, it will respond with a generic message: "Not Found."
  - **Response**:
    `json
{
  "success": false,
  "statusCode": 404,
  "message": "Not Found"
}
`

- **Error Handling**:

  - Implemented error handling throughout the application. Used global error handling middleware to catch and handle errors, providing appropriate error responses error messages.
  - **Sample Error Response**:
    ```json
    {
      "success": false,
      "message": "Duplicate Data found!",
      "errorMessages": [
        {
          "path": "",
          "message": "...."
        }
      ],
      "stack": "error stack"
    }
    ```

- **No Data Found**:
  - When finding data, if the database collection is empty or does not match any data, returned a generic message: "No data found."
  - **Response**:
    ```json
    {
      "success": false,
      "message": "No Data Found",
      "errorMessages": [
        {
          "path": "_id",
          "message": "Cast to ObjectId failed for value \"666db45e50a08e33c557db7\" (type string) at path \"_id\" for model \"Product\""
        }
      ],
      "stack": "error stack"
    }
    ```

### Live Project Link

Click here: [Madridista Sports Service](https://madridista-sports-server.vercel.app)

```

```
