const exp = require("express");
const jwt = require("jsonwebtoken");
const Filter = require("bad-words");

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
  const filter = new Filter();
  if (
    postData.title !== filter.clean(postData.title) ||
    postData.problem_desc !== filter.clean(postData.problem_desc) ||
    postData.code !== filter.clean(postData.code)
  ) {
    res.send({
      message: "There is some abusive content in the post",
      abusive_content: true,
    });
  } else {
    await jwt.verify(token, "cch", async (error, decodedObj) => {
      if (error) {
        console.log(error);
        res.send({
          message: "Error in Token Verification",
          verification: false,
        });
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
                { $set: { no_of_posts: parseInt(obj.no_of_posts) } }
              );
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
  }
});

module.exports = newPostApiRoute;
