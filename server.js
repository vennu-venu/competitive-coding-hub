// Creating Server
const exp = require("express");
const app = exp();

var cors = require("cors");
app.use(cors());

// Import the path module
const path = require("path");

// Importing MogoClient
const mc = require("mongodb").MongoClient;

require("dotenv").config();

const dburl = process.env.DATABASE_URL;

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
const homeApiRoute = require("./apis/tokenVerificationApi");

app.use("/login", loginApiRoute);
app.use("/register", registerApiRoute);
app.use("/home", homeApiRoute[0]);

// Handling unavailable path
app.use((req, res, next) => {
  console.log({ message: `The path ${req.url} is invalid.` });
});

// Assigning port number to the Server
const port = 5000;
app.listen(port, () => console.log(`Server on port ${port}`));
