require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const logger = require('morgan');
app.use(logger('dev'));

// Avoid coding repetitive .ejs extensions
app.set("view engine", "ejs");

//Read the public folder
app.use(express.static('public'));

// Body parser used to be on its own
// but now part of express module
// This is the body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//we need this to find the index.html file and 
app.use(express.static("../client"));

// Connection
const mongoose = require("mongoose");
// const DB = process.env.DB
// const URI = process.env.URI
// Same as above, but shorthand
// NOTE: destructuring
// const { DB, URI } = process.env;
// const url = `${URI}/${DB}`;

// let connectionObject = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   authSource: "admin",
//   user: "acc",
//   pass: "acc_rocks_2020",
// };

// mongoose
//   .connect(url, connectionObject)
//   .then(() => console.log(`Connected to the ${DB} database`))
//   .catch((err) => console.log(`Issues connecting to the ${DB} database`));

// Blueprints - Schema
// const formSchema = new mongoose.Schema({
//   fname: String,
//   age: {
//     type: Number,
//     min: 10,
//     max: 20,
//     required: true,
//   },
//   password: {
//     type: String,
//     required: [true, "need password"],
//   },
//   gender: String,
//   status: String,
//   date: Date,
//   address: String,
// });

// // and Model
// const FormModel = new mongoose.model("forms", formSchema);

// // Write queries

app.get("/", (req, res) => {
  res.render("home");
});
app.get("/home", (req, res) => {
  res.render("home");
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/contact", (req, res) => {
  res.render("contact");
});
app.get("/landing", (req, res) => {
  res.render("landing_page");
});

csv({ separator: '\t' });

const csv = require('csv-parser')
const fs = require('fs')
const results = [];

fs.createReadStream('data.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    console.log(results);
    // [
    //   { NAME: 'Daffy Duck', AGE: '24' },
    //   { NAME: 'Bugs Bunny', AGE: '22' }
    // ]
  });
// Source: https://www.npmjs.com/package/csv-parser

// app.get("/home", (req, res) => {
//   res.render("home.ejs");
// });

// app.post("/sendData", (req, res) => {
//   let tempObj = {};
//   for (doggy in req.body) {
//     tempObj[doggy] = req.body[doggy];
//   }

//   FormModel.create(tempObj, (error, result) => {
//     if (error) res.send(error.message);
//     // res.send(result);
//     res.redirect("/result");
//   });
// });

// app.get("/result", (req, res) => {
//   FormModel.find({}, (err, results) => {
//     if (err) res.send(err);
//     res.render("results.ejs", { data: results });
//   });
// });

app.get("/*", (req, res) => {
  res.render("error");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Mongo App listening on port ${port}`));