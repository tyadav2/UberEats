# UberEATS Full-Stack Prototype  

## Overview  
This project is a prototype of **UberEATS**, developed using **React.js** for the frontend and **Node.js (Express.js) with MySQL** for the backend. It supports two user personas: **Customers** and **Restaurants**, providing features such as authentication, profile management, order placement, and tracking.

## Features  

### Customer Features  
- **Signup/Login** – Secure authentication with bcrypt.js and Express-session  
- **Profile Page** – Update user details, profile picture, and country (dropdown)  
- **Restaurant Dashboard** – Browse restaurant details and menus, add dishes to cart  
- **Favorites** – Mark and view favorite restaurants  
- **Order Management** – Place orders and track status  

### Restaurant Features  
- **Signup/Login** – Secure authentication for restaurant owners  
- **Profile Management** – Update restaurant details, images, and contact info  
- **Menu Management** – Add, edit, and view dishes  
- **Orders Management** – View, filter, and update order statuses

### Steps to run the application

#### Start Server
- **Ensure you have MySQL running
- **Add the credentials to your DB in a .env in backend directory
- **Create a database uber_eats in MySQL
- **Navigate to the backend directory and run "npm i"
- **Use "node server.js" to start backend

#### Start Client
- **Navigate to frontend directory
- **Run "npm i"
- **Use "npm start" to start the service
