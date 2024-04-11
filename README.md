# Project Overview

Welcome to our stunning MERN application project! This project involves building a modern web application with interactive features. Below, you'll find the URLs for the client and server applications, along with the required tech stacks.

### Clone the Github Repo
```sh
git clone git@github.com:vinayak700/FullStack-Assessment.git
```

### Client Application

🚀 **[Client URL](https://chimerical-palmier-5f97df.netlify.app)**

The client application is built using React, providing a dynamic and interactive user interface. It offers seamless navigation and responsiveness across devices.

### Server Application

🔧 **[Server URL](https://fullstack-assessment-1.onrender.com)**

The server application is powered by Node.js and Express.js, providing robust backend APIs for handling user requests and interacting with the database. MongoDB is used as the database to store user data securely.

## Project Setup Guide

This guide covers the setup process for both the Client and Server sides of your application.

## Client Setup

### Installing Dependencies

```sh
npm install
```
## Environment Variables

To set up environment variables, follow these steps:

1. Create a `.env` file inside your client root directory.

2. Open the `.env` file using a text editor.

3. Add the following environment variables in the `.env` file:

   ```plaintext
   REACT_SERVER_URL=http://localhost:8080/api/v1
### Starting the Client

To start the client, follow these steps:

1. Navigate to the Client directory:

    ```sh
    cd ./Client
    ```

2. Then start the client:

    ```sh
    npm run start
    ```
## Server Setup

### Installing Dependencies

To install dependencies for the server, run the following command:

```sh
npm install
```

## Environment Variables

1. Navigate to the Server directory:

```sh
cd ./Server
```

## Create .env File and Add Environment Variables

1. Navigate to your Server directory.

2. Create a `.env` file inside your Server directory.

3. Add the following environment variables to the `.env` file:

```plaintext
MONGODB_URL=YOUR_MONGOATLAS_KEY
JWT_SECRET_KEY=YOUR_SECRET_KEY
CLOUDINARY_CLOUD_NAME=YOUR_CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY=YOUR_CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET=YOUR_CLOUDINARY_SECRET_KEY
RESEND_API_KEY=YOUR_RESEND_API_KEY
```
## Starting the Server

To start the server, run the following command:

```sh
npm run start
```

## Tech Stacks

- **Frontend**: React
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Image Storage**: Cloudinary
- **Authentication**: JWT (JSON Web Tokens)
- **Encryption**: bcrypt
- **Email Service**: Resend

These tech stacks ensure a modern, scalable, and secure web application that meets the highest standards of performance and user experience.

Let's build something amazing together!
