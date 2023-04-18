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

## Frontend UI Screenshots

Here are some screenshots of the frontend UI of my project.

<div style="flex-basis: 100%; margin-bottom: 20px;">
    <p style="text-align: center; font-weight: bold;">Login & Register Pages</p>
  </div>

<div style="display: flex; flex-wrap: nowrap; justify-content: space-between;">
    <img src="https://github.com/lavdimPireva/springboot-react-project/blob/main/screenshot/frontend_login_page.png?raw=true" alt="Login" width="40%" height="500">
    <img src="https://github.com/lavdimPireva/springboot-react-project/blob/main/screenshot/frontend_Register_page.png?raw=true" alt="Register" width="40%" height="500">
  </div>

  <div style="flex-basis: 100%; margin-bottom: 20px;">
    <p style="text-align: center; font-weight: bold;">Homepage</p>
    <img src="https://github.com/lavdimPireva/springboot-react-project/blob/main/screenshot/frontend_homepage.png" alt="Homepage" width="auto" height="auto">
  </div>

   <div style="flex-basis: 100%; margin-bottom: 20px;">
    <p style="text-align: center; font-weight: bold;">Shoe Details & Order Details Pages</p>
  </div>
  
  <div margin-bottom: 20px;">
    <img src="https://github.com/lavdimPireva/springboot-react-project/blob/main/screenshot/frontend_shoe_details.png" alt="Homepage" width="40%" height="560">  
    <img src="https://github.com/lavdimPireva/springboot-react-project/blob/main/screenshot/frontend_order_details.png" alt="Order Details" width="40%" height="560">
  </div>
  
   <div style="flex-basis: 100%; margin-bottom: 20px;">
    <p style="text-align: center; font-weight: bold;">Order Form</p>
    <img src="https://github.com/lavdimPireva/springboot-react-project/blob/main/screenshot/frontend_form_order.png" alt="OrderForm" width="auto" height="auto">
  </div>
  
</div>




























