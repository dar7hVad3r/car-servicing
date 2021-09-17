\! cls
DROP DATABASE IF EXISTS car_service;

CREATE DATABASE car_service;

USE car_service;

CREATE TABLE user(id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(100), email VARCHAR(100) UNIQUE, password VARCHAR(20), phone VARCHAR(12) UNIQUE, address VARCHAR(200), role VARCHAR(20));

CREATE TABLE schedule(id INT PRIMARY KEY AUTO_INCREMENT, user_id INT, vehicle_type VARCHAR(30), s_date DATE, s_time VARCHAR(20), wash VARCHAR(20), payment VARCHAR(10), wash_status VARCHAR(10), FOREIGN KEY (user_id) REFERENCES user(id));

CREATE TABLE c_service(id INT PRIMARY KEY AUTO_INCREMENT, type VARCHAR(20), price FLOAT);

insert into user values(default,"kushal","kushal@gmail.com","kushal","9988776655","beltorodi","admin");

insert into user values(default,"sangram","sangram@gmail.com","sangram","9876543210","besa","user");

insert into user values(default,"momin","momin@gmail.com","momin","8877665544","alandi","user");

insert into user values(default,"onkar","onkar@gmail.com","onkar","7766554433","vimannagar","user");


insert into c_service values(default,"hand car wash",100.00);

insert into c_service values(default,"machine dryer wash",150.00);

insert into c_service values(default,"normal wash",120.00);

insert into c_service values(default,"waterless car wash",125.50);


insert into schedule values(default,1,"car",null,"9.00 am","hand car wash","pending","done");

insert into schedule values(default,2,"bike",null,"11.00 am","normal wash","pending","pending");

insert into schedule values(default,3,"car",null,"1.00 pm","waterless car wash","pending","done");

insert into schedule values(default,4,"car",null,"3.00 pm","machine dryer wash","pending","pending");



