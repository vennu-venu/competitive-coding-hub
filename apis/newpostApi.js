const exp = require("express");
const jwt = require("jsonwebtoken");
const Filter = require("bad-words");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.CCH_EMAIL,
    pass: process.env.CCH_PASS,
  },
});

const newPostApiRoute = exp.Router();
newPostApiRoute.use(exp.json());
newPostApiRoute.post("/verify", async (req, res) => {
  const token = req.body.token;
  await jwt.verify(token, process.env.SECRETKEY, (error, decodedObj) => {
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
    await jwt.verify(token, process.env.SECRETKEY, async (error, decodedObj) => {
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
            let volunteers = await dbObj.collection("volunteers").find().toArray();
            for(let volunteer of volunteers) {
              var mailOptions = {
                from: "competitive.coding.hub@gmail.com",
                to: volunteer.email,
                subject: "Competitive Coding Hub | New Post on Competitive Coding Hub",
                text:
                  "Hello Volunteer" +
                  "\n\nNew Anonymous Post on Competitive Coding Hub\n\n" +
                  postData.title +
                  "\n\n" +
                  postData.problem_desc +
                  "\n\n" +
                  postData.code + 
                  "\n\n#ask  #learn  #code",
              }; 

              transporter.sendMail(mailOptions, async function (error, info) {
                if (error) {
                  console.log("Error in sending OTP: ", error);
                }
              });
            }
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
              let volunteers = await dbObj.collection("volunteers").find().toArray();
            
            for(let volunteer of volunteers) {
              var mailOptions = {
                from: "competitive.coding.hub@gmail.com",
                to: volunteer.email,
                subject: "Competitive Coding Hub | New Post on Competitive Coding Hub",
                text:
                  "Hello Volunteer" +
                  "\n\nNew Post on Competitive Coding Hub by " + obj.first_name + " " + obj.last_name + "\n\n" +
                  postData.title +
                  "\n\n" +
                  postData.problem_desc +
                  "\n\n" +
                  postData.code + 
                  "\n\n#ask  #learn  #code",
              }; 

              transporter.sendMail(mailOptions, async function (error, info) {
                if (error) {
                  console.log("Error in sending OTP: ", error);
                }
              });
            }
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
