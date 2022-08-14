const exp = require("express");
const jwt = require("jsonwebtoken");

const tokenVerificationApiRoute = exp.Router();
tokenVerificationApiRoute.use(exp.json());
tokenVerificationApiRoute.post("/verify", async (req, res) => {
  token = req.body.token;
  await jwt.verify(token, "cch", (error, decodedObj) => {
    if (error) {
      console.log(error);
      res.send({ message: "Error in Token Verification", success: false });
    } else {
        res.send({ message: "Successful Authorization", success: true, email: decodedObj.email });
    }
  });
});

module.exports = [tokenVerificationApiRoute];
