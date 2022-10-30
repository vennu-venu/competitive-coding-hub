const exp = require("express");
const jwt = require("jsonwebtoken");

const homeApiRoute = exp.Router();
homeApiRoute.use(exp.json());
homeApiRoute.post("/verify-and-retrieve", async (req, res) => {
  let dbObj = req.app.locals.databaseObj;
  const token = req.body.token;
  await jwt.verify(token, process.env.SECRETKEY, async (error, decodedObj) => {
    if (error) {
      res.send({
        message: "Error in Token Verification",
        success: false,
        verification: false,
      });
    } else {
      try {
        let userData = await dbObj
          .collection("users")
          .findOne({ email: { $eq: decodedObj.email } });
        delete userData.password;
        await dbObj
          .collection("posts")
          .find({})
          .toArray(async (error, result) => {
            if (error) {
              res.send({
                message: "Couldn't retrieve the Data",
                success: false,
                verification: true,
              });
            } else {
              res.send({
                message: "Data retrieved",
                posts: result,
                user: userData,
                success: true,
                verification: true,
              });
            }
          });
      } catch (error) {
        res.send({
          message: "Couldn't retrieve the  Data",
          success: false,
          verification: true,
        });
        console.log("Error in fetching Data: ", error);
      }
    }
  });
});

module.exports = homeApiRoute;
