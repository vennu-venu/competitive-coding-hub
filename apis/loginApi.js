const exp = require("express");
const loginApiRoute = exp.Router();
loginApiRoute.use(exp.json());
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

loginApiRoute.post("/check", async (req, res) => {
  userCredentialDetails = req.body;
  email = userCredentialDetails.email;
  password = userCredentialDetails.password;

  // Getting DB Object
  let dbObj = req.app.locals.databaseObj;
  // Getting Data
  let obj = await dbObj.collection("users").findOne({ email: { $eq: email } });
  if (obj == null) {
    res.send({ message: "Email doesn't exist", success: false });
  } else {
    let result = await bcrypt.compare(password, obj.password);
    if (result) {
      let signedToken = await jwt.sign(
        { username: userCredentialDetails.username },
        "cch",
        { expiresIn: 200 }
      );
      res.send({
        message: "Successful Login !!",
        success: true,
        jwt: signedToken,
      });
    } else {
      res.send({ message: "Wrong Password", success: false });
    }
  }
});

// Export loginApiRoute
module.exports = loginApiRoute;
