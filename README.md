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
    <img src="https://github.com/lavdimPireva/springboot-react-project/blob/main/screenshot/frontend_shoe_details.png" alt="Homepage" width="35%" height="520">  
    <img src="https://github.com/lavdimPireva/springboot-react-project/blob/main/screenshot/frontend_order_details.png" alt="Order Details" width="35%" height="520">
  </div>
  
   <div style="flex-basis: 100%; margin-bottom: 20px;">
    <p style="text-align: center; font-weight: bold;">Order Form</p>
    <img src="https://github.com/lavdimPireva/springboot-react-project/blob/main/screenshot/frontend_form_order.png" alt="OrderForm" width="auto" height="auto">
  </div>
  
</div>

## Backend Part

In our project, we use Mongodb to store user data. When a user registers, they fill the registration form, as shown above in UI frontend screenshots. 
Once the user clicks on the ‘register’ button, their information is saved in MongoDB. The following screenshot displays an example of how the user’s data is stored in the database.

<div style="flex-basis: 100%; margin-bottom: 20px;">
    <p style="text-align: center; font-weight: bold;">User data into mongodb</p>
    <img src="https://github.com/lavdimPireva/springboot-react-project/blob/main/screenshot/mongo_db_user_stored.png" alt="mongodb_user" width="60%" height="60%">
  </div>
  

Below you can find a snippet code that shows how a user object is created and saved into database. As you can see the password is encoded using BCrypt Algorithm by calling the “passwordEncoder.encode()” method.

```java
var user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();

        userRepository.save(user);    
```

In another class file in our project, we defines some @Beans that we create in order to use throughout the project and one of them is for password encryption as below : 

```java
  @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
```

### JWT PROCESS

<div style="flex-basis: 100%; margin-bottom: 20px;">
    <p style="text-align: center; font-weight: bold;">JSON WEB TOKEN FLOW</p>
    <img src="https://github.com/lavdimPireva/springboot-react-project/blob/main/screenshot/jwt_token_process.png" alt="jwt" width="60%" height="60%">
  </div>
  
Once the user is stored in Mongodb, we generate a JSON Web Token (JWT) and send it back to the user. The idea of using JWT is to allow user to makes
subsequent requests without having to re-enter their credentials again and again so using his token we know their grant privileges.

In order to implement JWT, we use RSA algorithm to as signature algorithm. This approach has been selected because it is a widely recognized and secure technique for generating JWT tokens.

First in the moment when app is being executed we use a class generator that generate private and public keys of RSA. The code below show us how the keys are being generated:

```java
  KeyPairGenerator keyGen = KeyPairGenerator.getInstance("RSA");
        keyGen.initialize(2048);
        KeyPair keyPair = keyGen.generateKeyPair();
        this.privateKey = keyPair.getPrivate();
        this.publicKey = keyPair.getPublic();
```

The public key in PEM format would be something like below : 

<div style="flex-basis: 100%; margin-bottom: 20px;">
    <p style="text-align: center; font-weight: bold;">RSA PUBLIC KEY</p>
    <img src="https://github.com/lavdimPireva/springboot-react-project/blob/main/screenshot/RSA_PUBLIC_KEY.png" alt="mongodb_user" width="60%" height="60%">
  </div>

After this we use the private key for signature and we sent back this token to the client. The snippet code below show how we use private key and how we put other claims in order to make a valid jwt token : 

```java
   public String generateToken(Map<String, Object> extraClaim, UserDetails userDetails) {
        
        return Jwts
                .builder()
                .setClaims(extraClaim)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 24 * 60 * 60 * 1000))
                .signWith(keyGenerator.getPrivateKey(), SignatureAlgorithm.RS256)
                .compact();
    }
```

When the token is back to the client, in our react app we grab that token and set into local storage of our browser.

```jsx
   const newUser = {
      name: name,
      surname: surname,
      email: email,
      password: password,
    };

    axios
      .post("http://localhost:8080/api/v1/auth/register", newUser)
      .then((res) => {
        if (res.status === 200) {
          console.log("User registered successfully");
          localStorage.setItem("token", res.data.token);
          navigate("/login");
        }
      })
      .catch((err) => {
        console.error("Error registering user:", err);
      });
  };
```


<div style="flex-basis: 100%; margin-bottom: 20px;">
    <p style="text-align: center; font-weight: bold;">JWT TOKEN SAVED INTO LOCAL STORAGE</p>
    <img src="https://github.com/lavdimPireva/springboot-react-project/blob/main/screenshot/localStorage.png" alt="mongodb_user" width="auto" height="auto">
  </div>

### USING POSTMAN

Now that we have token we can make another request that is secured in our backend. In those subsequent requests we have to include the token in our req like below :







  

    
      




















