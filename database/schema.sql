CREATE DATABASE IF NOT EXISTS uber_eats;
USE uber_eats;

CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Restaurants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    cuisine VARCHAR(50) NOT NULL,
    category VARCHAR(50) NOT NULL, 
    location VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL,  
    phone_number VARCHAR(20) NOT NULL, 
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    business_hours VARCHAR(255) NOT NULL,
    rating FLOAT DEFAULT 0.0,
    image_url VARCHAR(255),
    price_range ENUM('$', '$$', '$$$') NOT NULL DEFAULT '$',
    delivery_time VARCHAR(20) NOT NULL,
    is_open BOOLEAN DEFAULT TRUE
);

CREATE TABLE Orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    userEmail VARCHAR(100) NOT NULL,  -- New field
    restaurantId INT NOT NULL,
    restaurantName VARCHAR(100) NOT NULL, -- New field
    totalAmount FLOAT NOT NULL,
    status ENUM('Pending', 'Preparing', 'Delivered') DEFAULT 'Pending',
    estimatedDeliveryTime VARCHAR(20),
    paymentMethod ENUM('Credit Card', 'Cash', 'Online') NOT NULL,
    items JSON NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES Users(id),
    FOREIGN KEY (restaurantId) REFERENCES Restaurants(id)
);

CREATE TABLE IF NOT EXISTS Dishes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    ingredients TEXT,
    image VARCHAR(255),
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(50) NOT NULL,
    restaurantId INT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (restaurantId) REFERENCES Restaurants(id)
);

