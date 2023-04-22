# Shoe Store

A web-based shoe store application with React frontend and Spring Boot backend.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js v14 or higher
- npm v6 or higher
- Java 11 or higher
- Docker

### Installing

A step by step series of examples that tell you how to get a development environment running:

### Frontend

1. Navigate to the frontend folder
2. Run the following command to install the dependencies: npm install
3. Run the following command to start the frontend server: npm start

### Backend

1. Start a MongoDB container with Docker: docker run --name mongodb -p 27018:27017 -d mongo
2. Navigate to the backend folder
3. Run the following command to install the dependencies: ./mvnw clean install
4. Run the following command to start the backend server: ./mvnw spring-boot:run



## Features

- Browse shoe models and view details
- Add models to the cart
- Fill out a form with shipping information
- Submit the order
- Login and register pages for authentication

## Authentication

The application uses JSON Web Token (JWT) for authentication purposes. The token is signed using RSA algorithm, and the private RSA key is encrypted using AES algorithm. The encrypted private RSA key is saved in the MongoDB database, and the JWT token is saved in localstorage.


### Built With

- [React](https://reactjs.org/) - Frontend Library
- [Spring Boot](https://spring.io/projects/spring-boot) - Backend Framework
- [MongoDB](https://www.mongodb.com/) - NoSQL Database
- [Axios](https://github.com/axios/axios) - HTTP client for making API requests

