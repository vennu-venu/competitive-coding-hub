const exp = require("express");
const jwt = require("jsonwebtoken");

const newPostApiRoute = exp.Router();
newPostApiRoute.use(exp.json());
newPostApiRoute.post("/verify", async (req, res) => {
  const token = req.body.token;
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

newPostApiRoute.post("/add-doubt", async (req, res) => {
  const token = req.body.token;
  let postData = req.body.postDetails;
  let dbObj = req.app.locals.databaseObj;
  await jwt.verify(token, "cch", async (error, decodedObj) => {
    if (error) {
      console.log(error);
      res.send({ message: "Error in Token Verification", verification: false });
    } else {
      try {
        if (postData.isAnonymous) {
          await dbObj.collection("posts").insertOne(postData);
          res.send({
            message: "Anonymous doubt posted",
            verification: true,
            success: true,
          });
        } else {
          let obj = await dbObj
            .collection("users")
            .findOne({ email: { $eq: decodedObj.email } });
          await dbObj
            .collection("users")
            .updateOne(
              { email: { $eq: decodedObj.email } },
              { $inc: { no_of_posts: 1 } }
            );
          if (obj) {
            postData = {
              ...postData,
              user: obj.username,
              user_email: decodedObj.email,
            };
            await dbObj.collection("posts").insertOne(postData);
            res.send({
              message: "Doubt posted",
              verification: true,
              success: true,
            });
          }
        }
      } catch (error) {
        res.send({
          message: "Couldn't post the doubt",
          verification: true,
          success: false,
        });
        console.log("Error in Posting Doubt: ", error);
      }
    }
  });

  if (obj) {
    delete obj.password;
    res.send({ message: "User found", user: obj, success: true });
  } else {
    res.send({ message: "User not found", success: false });
  }
});

module.exports = newPostApiRoute;
