// requiring packages
const express = require('express');
const app = express();
const path = require('path');

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const ejs = require('ejs');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('dotenv').config();

app.use(express.urlencoded({ extended: false }));

// mongodb connection
const uri = process.env.DB_CONNECTION;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



// static files
app.use(express.static(__dirname + "/public"));

// templating engine ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// routes
// homepage
app.get("/", (req, res) => {
  res.render("home");
});

// about page
app.get("/about", (req, res) => {
  res.render("about");
});

// profile page
app.get("/profile", (req, res) => {
  res.render("profile");
});


// error handling: 404 Not Found
app.use((req, res, next) => {
  res.status(404).send("404 Not Found. Sorry, this page doesn't exist!");
  next();
});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
