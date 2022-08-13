const exp = require("express");
const registerApiRoute = exp.Router();
registerApiRoute.use(exp.json());
const bcrypt = require("bcryptjs");

registerApiRoute.post("/create", async (req, res) => {
  userDetails = req.body;
  username = userDetails.username;
  email = userDetails.email;
  // Getting DB Object
  let dbObj = req.app.locals.databaseObj;
  // Getting Data
  let obj = await dbObj
    .collection("users")
    .findOne({ username: { $eq: username } });
  if (obj != null) {
    res.send({ message: "Username already exists", success: false });
  } else {
    obj = await dbObj.collection("users").findOne({ email: { $eq: email } });

    if (obj != null) {
      res.send({ message: "Email is already registered", success: false });
    } else {
      let hashpw = await bcrypt.hash(userDetails.password, 5);
      userDetails.password = hashpw;
      delete userDetails.cpassword;
      dbObj
        .collection("users")
        .insertOne(userDetails)
        .then((created) => {
          res.send({
            message: "Account created successfully !!",
            success: true,
          });
        })
        .catch((err) => {
          console.log("Error in creating account ", err);
        });
    }
  }
});

// Export registerApiRoute
module.exports = registerApiRoute;
