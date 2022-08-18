const exp = require("express");
const jwt = require("jsonwebtoken");

const profileApiRoute = exp.Router();
profileApiRoute.use(exp.json());
profileApiRoute.post("/verify", async (req, res) => {
  token = req.body.token;
  await jwt.verify(token, "cch", (error, decodedObj) => {
    if (error) {
      console.log(error);
      res.send({ message: "Error in Token Verification", success: false });
    } else {
      res.send({
        message: "Successful Authorization",
        success: true,
        email: decodedObj.email,
      });
    }
  });
});

profileApiRoute.get("/get-user/:username", async (req, res) => {
  let dbObj = req.app.locals.databaseObj;
  let obj = await dbObj
    .collection("users")
    .findOne({username: {$eq: req.params.username}});
  if(obj) {
    delete obj.password;
    res.send({message: "User found", user: obj, success: true});
  }
  else {
    res.send({message: "User not found", success: false});
  }
});

module.exports = profileApiRoute;
