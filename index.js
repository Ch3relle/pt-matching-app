// requiring packages
const express = require('express');
const app = express();
const path = require('path');

const mongodb = require('mongodb');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const ejs = require('ejs');

require('dotenv').config();

app.use(express.urlencoded({extended: false}));

// connecting to MongoDB
mongodb.connect(process.env.DB_CONNECTION, { useUnifiedTopology: true}, async (err, client) => {
  const db = client.db();
  const results = await db.collection().find().toArray();
  console.log(results);
  client.close();
});


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
  res.send("This is the about page.");
});

// profile page
app.get("/profile", (req, res) => {
  res.send("This is your profile.");
});


// error handling: 404 Not Found
app.use((req, res, next) => {
  res.status(404).send("404 Not Found. Sorry, this page doesn't exist!");
  next();
});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
