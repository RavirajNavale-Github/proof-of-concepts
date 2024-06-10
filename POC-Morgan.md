# Proof of Concept [POC] Document for Morgan NPM package (Middleware)

# Introduction

Morgan is a popular HTTP request logger middleware for Node.js. It simplifies logging requests to the console, making it easier to debug and monitor web applications. Morgan provides various logging formats, supports custom formats. This documentation provides an overview of Morgan, including installation, setup, and examples of using different logging formats. It also includes a scenario demonstrating the use of all HTTP methods.

# Requirements

To use Morgan, you need the following:
Node.js installed on your system.
A basic understanding of Node.js and Express.js.
A code editor (e.g., Visual Studio Code)

# Installation and Setup

Step 1: Initialize a Node.js Project
First, create a new directory for your project and initialize a new Node.js project:

```bash

mkdir morgan-demo
cd morgan-demo
npm init -y

```

Step 2: Install Express and Morgan
Next, install the Express and Morgan packages:

```bash

npm install express morgan axios

```

Step 3: Create the Server File
Create a new file named ‘index.js’ in your project directory. This file will contain the Express server setup and Morgan configuration.

# Implementation

Basic Setup

Open ‘index.js’ and add the following code to set up an Express server with Morgan:

```js

Const express = require(‘express’);
Const morgan = require(‘morgan’);

Const app = express();

//use morgan middleware
app.use(morgan(‘dev’));

//routes
app.get(‘/’, (req, res) => {
res.send(‘Hello World’)});

//assigning port
app.listen(5000, () => {console.log(‘Server is running on port 5000’)});

```

# Log Formats

Morgan supports several predefined formats, and you can also create custom formats.

Common Formats
'combined': Standard Apache combined log output.
'common': Standard Apache common log output.
'dev': Concise output colored by response status.
'short': Shorter than 'dev', including response time.
'tiny': Minimal output.

```js
//Using 'combined' format
app.use(morgan("combined"));

// Using 'common' format
app.use(morgan("common"));

// Using 'short' format
app.use(morgan("short"));

// Using 'tiny' format
app.use(morgan("tiny"));
```

Custom Format

You can create a custom format by providing a format string or a function.

```js
// Custom format string
app.use(morgan(":method :url:status:res[content-length]- :response-time ms"));

// Custom format function
app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens["response-time"](req, res),
      "ms",
    ].join(" ");
  })
);
```

# Using HTTP Methods

Here's a demonstration how to use Morgan with various HTTP methods:

```js

const express = require(‘express’);
const morgan = require(‘morgan’);
const axios = require("axios");

const const app = express();
const port = 8000;

const apiUrl = "https://ravirajnavale-mock-server-app.onrender.com/users";

//Middleware
app.use(express.json());

// Use Morgan middleware
app.use(morgan("tiny"));

// GET route
app.get("/users", async (req, res) => {
  try {
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get route for single user
app.get("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const response = await axios(`${apiUrl}/${id}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// POST route
app.post("/users", async (req, res) => {
  try {
    const newUser = req.body;
    const response = await axios.post(apiUrl, newUser);
    res.status(201).json(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// PUT route
app.put("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedUser = req.body;
    const response = await axios.put(`${apiUrl}/${id}`, updatedUser);
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// DELETE route
app.delete("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await axios.delete(`${apiUrl}/${id}`);
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//Assigning port to server
app.listen(port, () => {
  console.log(`Server is listening to port ${port}`);
});

```

Try this code in your code editor (Visual Studio). And try with all logging formats provided ans see the outputs, this will helps you in monitoring and debugging.

# Summary

Morgan is an easy-to-use logging middleware for Node.js. It supports various predefined formats and allows custom formats, enabling you to log HTTP requests effectively. This POC demonstrates the basic usage, different log formats and handling all HTTP methods in a Node.js application.
By integrating Morgan into your application, you can gain valuable insights into your web application's behaviour, performance, and issues, leading to better debugging and monitoring.
