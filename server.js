// Creating Server
const exp = require("express");
const app = exp();

var cors = require('cors');
app.use(cors());

// Import the path module
const path = require("path");

// Importing MogoClient
const mc = require("mongodb").MongoClient;

// Database URL
const dburl =
  "mongodb+srv://competitive-coding-hub:c3c3h8@cluster0.lyozsln.mongodb.net/?retryWrites=true&w=majority";

let dbObj; // DB Object declared globally.
// Connect to MongoDB Atlas
mc.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((client) => {
    // Get DB Object
    dbObj = client.db("cch");
    // Making DB Object available for Apis
    app.locals.databaseObj = dbObj;
    console.log("Connected to DataBase successfully !!");
  })
  .catch((err) => {
    console.log("Error in DB connect ", err);
  });

//Importing Login and Register Apis
const loginApiRoute = require("./apis/loginApi");
const registerApiRoute = require("./apis/registerApi");

app.use("/login", loginApiRoute);
app.use("/register", registerApiRoute);

// Handling unavailable path
app.use((req, res, next) => {
  console.log({ message: `The path ${req.url} is invalid.` });
});

// Assigning port number to the Server
const port = 5000;
app.listen(port, () => console.log(`Server on port ${port}`));
