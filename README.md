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
  - [Product](#product)
  - [Order](#order)
- [Error Handling](#error-handling)
- [Live Link](#live-link)

## Introduction
This project is a backend server for a sports goods e-commerce website. It provides RESTful API endpoints for managing products,and orders. The server handles product CURD operation, cart items and order processes.

## Features
- So far there is no authentication
- Role-only one role both user and admin
- CRUD operations for products
- Cart Items management
  - Add product to cart
  - Checkout order with user information
- Error handling

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- TypeScript
- Zod for data validation
- HTTP Status for status code

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
NODE_ENV = choose_development_or_production
PORT= 5000
DATABASE_URL= MongoDB_URL

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
### Product
-  **Add Product**
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
            "quantity":25
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

### Order Routes:
=======
    ### Order Routes:
- **Create Order**
    - **Route**: /api/order/add-order (POST)
    - Customer information and cart items will come from body
    - Product's quantity will be updated accordint to order quantity
    - **Request Body**:
        
        ```json
        {
          "customerName": "MD. MAHIDUL ISLAM",
          "email": "mmbmahidul007@gmail.com",
          "phone": "1710611980",
          "address": "Dhaka",
          "cartItems": [
              {
                  "_id": "66912f2fdaeb240cc2656afa",
                  "name": "Real madrid home kit",
                  "price": 100,
                  "quantity": 2,
                  "imageLink": "https://shorturl.at/MqJpq"
              },
              ....other items....
          ]
        }
        
        ```
        
    - **Response**:
        
        ```json
      {
          "success": true,
          "statusCode": 200,
          "message": "Order placed successfully!",
          "data": {
              "customerName": "MD. MAHIDUL ISLAM",
              "email": "mmbmahidul007@gmail.com",
              "phone": "1710611980",
              "address": "Dhaka",
              "cartItems": [
                  {
                      "_id": "66912f2fdaeb240cc2656afa",
                      "name": "Real madrid home kit",
                      "imageLink": "https://shorturl.at/MqJpq",
                      "price": 100,
                      "quantity": 2
                  }
              ],
              "_id": "6693adacf6131984689ee0d7",
              "createdAt": "2024-07-14T10:51:24.547Z",
              "updatedAt": "2024-07-14T10:51:24.547Z",
              "__v": 0
          }
      }
        ```

## Error Handling
Errors are handled using custom error classes and middleware. Common errors include:

- **Not Found Route**:
    - Implemented a global "Not Found" handler for unmatched routes. When a route is not found, it will respond with a generic message: "Not Found."
    - **Response**:
            
            ```json
            {
              "success": false,
              "statusCode": 404,
              "message": "Not Found"
            }
            ```

- **Error Handling**:
    - Implemented error handling throughout the application. Used global error handling middleware to catch and handle errors, providing appropriate error responses  error messages.
            
            
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
            
        
        
