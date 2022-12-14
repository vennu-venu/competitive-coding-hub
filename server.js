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

//Importing Apis
const loginApiRoute = require("./apis/loginApi");
const registerApiRoute = require("./apis/registerApi");
const homeApiRoute = require("./apis/homeApi");
const OTPApiRoute = require("./apis/OTPApi");
const forgotPasswordApiRoute = require("./apis/forgotPasswordApi");
const profileApi = require("./apis/profileApi")
const updateProfileApiRoute = require("./apis/updateProfileApi");
const myPostsApiRoute = require("./apis/myPostsApi");
const postsApiRoute = require("./apis/postsApi");
const newPostApiRoute = require("./apis/newpostApi");
const adminApiRoute = require("./apis/adminApi");

app.use("/login", loginApiRoute);
app.use("/register", registerApiRoute);
app.use("/verify-email", OTPApiRoute);
app.use("/forgot-password", forgotPasswordApiRoute);
app.use("/home", homeApiRoute);
app.use("/profile", profileApi);
app.use("/update-profile", updateProfileApiRoute);
app.use("/my-posts", myPostsApiRoute);
app.use("/posts", postsApiRoute);
app.use("/new-post", newPostApiRoute);
app.use("/admin", adminApiRoute);

app.use(exp.static(path.resolve(__dirname, "build")));
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "build", "index.html"));
});

// Handling unavailable path
app.use((req, res, next) => {
  console.log({ message: `The path ${req.url} is invalid.` });
});

// Assigning port number to the Server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server on port ${port}`));
