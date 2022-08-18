const exp = require("express");
const jwt = require("jsonwebtoken");

const homeApiRoute = exp.Router();
homeApiRoute.use(exp.json());
homeApiRoute.post("/verify", async (req, res) => {
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

homeApiRoute.get("/get-posts", async (req, res) => {
  let dbObj = req.app.locals.databaseObj;
  await dbObj.collection("posts").find({}).toArray(async (error, result) => {
    if(error) {
      res.send({message: "Couldn't retrieve the Data", success: false});
    }
    else {
      res.send({message: "Data retrieved", result, success: true});
    }
  });
})

module.exports = homeApiRoute;
