const exp = require("express");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const Filter = require("bad-words");

const postsApiRoute = exp.Router();
postsApiRoute.use(exp.json());
postsApiRoute.post("/verify-and-retrieve", async (req, res) => {
  let dbObj = req.app.locals.databaseObj;
  const token = req.body.token;
  const post_id = req.body.post_id;
  await jwt.verify(token, process.env.SECRETKEY, async (error, decodedObj) => {
    if (error) {
      res.send({
        message: "Error in Token Verification",
        success: false,
        verification: false,
      });
    } else {
      try {
        let ObjectId = require("mongodb").ObjectId;
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
  let replyData = req.body.replyData;
  const filter = new Filter();
  if (
    replyData.reply !== filter.clean(replyData.reply) ||
    replyData.reply_code !== filter.clean(replyData.reply_code)
  ) {
    res.send({
      message: "Your reply has some abusive content",
      abusive_content: true,
      verification: true
    });
  } else {
    await jwt.verify(token, process.env.SECRETKEY, async (error, decodedObj) => {
      if (error) {
        res.send({
          message: "Error in Token Verification",
          success: false,
          verification: false,
        });
      } else {
        try {
          let ObjectId = require("mongodb").ObjectId;
          let obj = await dbObj
            .collection("users")
            .findOne({ email: { $eq: decodedObj.email } });
          replyData = { ...replyData, user: obj.username };
          await dbObj
            .collection("posts")
            .updateOne(
              { _id: { $eq: ObjectId(post_id) } },
              { $push: { replies: replyData } }
            );
          res.send({
            message: "Reply Sent",
            success: true,
            verification: true,
          });
          try {
            let postObj = await dbObj
              .collection("posts")
              .findOne({ _id: { $eq: ObjectId(post_id) } });
            if (replyData.user !== postObj.user && !postObj.isAnonymous) {
              const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                  user: process.env.CCH_EMAIL,
                  pass: process.env.CCH_PASS,
                },
              });

              let userObj = await dbObj
                .collection("users")
                .findOne({ email: { $eq: postObj.user_email } });

              var mailOptions = {
                from: "competitive.coding.hub@gmail.com",
                to: postObj.user_email,
                subject:
                  "Competitive Coding Hub | Response from " +
                  replyData.user +
                  " | " +
                  postObj.title,
                text:
                  "Hello " +
                  userObj.first_name +
                  " " +
                  userObj.last_name +
                  "\n\n" +
                  replyData.user +
                  " has replied to your post with the title, " +
                  postObj.title +
                  "\n\n\n\n" +
                  replyData.reply +
                  "\n\n" +
                  replyData.reply_code +
                  "\n\n\n\n#ask  #learn  #code",
              };

              transporter.sendMail(mailOptions, async function (error, info) {
                if (error) {
                  console.log("Error in sending Mail: ", error);
                }
              });
            }
          } catch (error) {
            console.log("Error in Sending Reply Mail: ", error);
          }
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
  }
});

module.exports = postsApiRoute;
