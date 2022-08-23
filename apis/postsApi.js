const exp = require("express");
const jwt = require("jsonwebtoken");

const postsApiRoute = exp.Router();
postsApiRoute.use(exp.json());
postsApiRoute.post("/verify-and-retrieve", async (req, res) => {
  let dbObj = req.app.locals.databaseObj;
  const token = req.body.token;
  const post_id = req.body.post_id;
  await jwt.verify(token, "cch", async (error, decodedObj) => {
    if (error) {
      res.send({
        message: "Error in Token Verification",
        success: false,
        verification: false,
      });
    } else {
      try {
        let ObjectId = require('mongodb').ObjectId; 
        let obj = await dbObj
          .collection("posts")
          .findOne({ _id: { $eq: ObjectId(post_id) } });
        res.send({
          message: "Data retrieved",
          post: obj,
          success: true,
          verification: true,
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

postsApiRoute.post("/post-reply", async (req, res) => {
  let dbObj = req.app.locals.databaseObj;
  const token = req.body.token;
  const post_id = req.body.post_id;
  const replyData = req.body.replyData;
  await jwt.verify(token, "cch", async (error, decodedObj) => {
    if (error) {
      res.send({
        message: "Error in Token Verification",
        success: false,
        verification: false,
      });
    } else {
      try {
        let ObjectId = require('mongodb').ObjectId; 
        await dbObj
          .collection("posts")
          .updateOne({ _id: { $eq: ObjectId(post_id) } }, {$push: {replies: replyData}});
        res.send({
          message: "Reply Sent",
          success: true,
          verification: true,
        });
      } catch (error) {
        res.send({
          message: "Couldn't send the Reply",
          success: false,
          verification: true,
        });
        console.log("Error in sending Reply: ", error);
      }
    }
  });
});

module.exports = postsApiRoute;
