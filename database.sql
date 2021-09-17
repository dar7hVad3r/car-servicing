\! cls
DROP DATABASE IF EXISTS car_service;

CREATE DATABASE car_service;

USE car_service;

CREATE TABLE user(id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(100), email VARCHAR(100) UNIQUE, password VARCHAR(20), phone VARCHAR(12) UNIQUE, address VARCHAR(200), role VARCHAR(20));

CREATE TABLE schedule(id INT PRIMARY KEY AUTO_INCREMENT, user_id INT, vehicle_type VARCHAR(30), s_date DATE, s_time VARCHAR(20), wash VARCHAR(20), payment VARCHAR(10), wash_status VARCHAR(10), FOREIGN KEY (user_id) REFERENCES user(id));

CREATE TABLE c_service(id INT PRIMARY KEY AUTO_INCREMENT, type VARCHAR(20), price FLOAT);

