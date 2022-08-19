const exp = require("express");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const forgotPasswordApiRoute = exp.Router();
forgotPasswordApiRoute.use(exp.json());

forgotPasswordApiRoute.post("/send-otp", async (req, res) => {
  const email = req.body.email;
  let dbObj = req.app.locals.databaseObj;
  let obj = await dbObj.collection("users").findOne({ email: { $eq: email } });
  if (obj == null) {
    res.send({ message: "Email doesn't exist", success: false });
  } else {
    if (!obj.isVerified) {
      res.send({ message: "Email has not been verified", success: false });
    } else {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.CCH_EMAIL,
            pass: process.env.CCH_PASS,
          },
        });

        let otp = Math.floor(Math.random() * 1000000);

        while (otp <= 100000) {
          otp = Math.floor(Math.random() * 1000000);
        }

        var mailOptions = {
          from: "competitive.coding.hub@gmail.com",
          to: email,
          subject: "Competitive Coding Hub | OTP to Change the Password",
          text:
            "Hello " +
            obj.first_name +
            " " +
            obj.last_name +
            "\n\nYour OTP to change the password of Competitive Coding Hub Account is \n\n" +
            otp +
            "\n\nOTP expires in 5 minutes" +
            "\n\n#ask  #learn  #code",
        };

        transporter.sendMail(mailOptions, async function (error, info) {
          if (error) {
            console.log("Error in sending OTP: ", error);
            res.send({ message: "Error in sending OTP", success: false });
          } else {
            res.send({
              message: "OTP has been sent to your Email",
              email: email,
              success: true,
            });
            await dbObj
              .collection("users")
              .updateOne(
                { email: { $eq: email } },
                { $set: { userOTP: otp, OTPSentAt: Date.now() } }
              );
          }
        });
      } catch (error) {
        console.log("Error in Sending OTP: ", error);
      }
    }
  }
});

forgotPasswordApiRoute.post("/verify-otp", async (req, res) => {
  const email = req.body.email;
  const otp = req.body.otp;
  let dbObj = req.app.locals.databaseObj;
  let obj = await dbObj.collection("users").findOne({ email: { $eq: email } });
  if (otp === obj.userOTP + "") {
    if (Date.now() <= parseInt(obj.OTPSentAt + 1000 * 60 * 5)) {
      await dbObj
        .collection("users")
        .updateOne({ email: { $eq: email } }, { $set: { isVerified: true } });
      await dbObj
        .collection("users")
        .updateOne(
          { email: { $eq: email } },
          { $unset: { userOTP: "", OTPSentAt: "" } }
        );
      let signedToken = await jwt.sign({ email: email }, "cch", {
        expiresIn: "10m",
      });
      res.send({
        message: "OTP has been verified",
        jwt: signedToken,
        success: true,
      });
    } else {
      res.send({ message: "Your OTP was expired", success: false });
    }
  } else {
    res.send({ message: "Invalid OTP", success: false });
  }
});

forgotPasswordApiRoute.post("/change-password", async (req, res) => {
  const token = req.body.token;
  const password = req.body.password;
  let dbObj = req.app.locals.databaseObj;
  let hashpw = await bcrypt.hash(password, 5);
  await jwt.verify(token, "cch", async (error, decodedObj) => {
    if (error) {
      console.log(error);
      res.send({ message: "Password could not be changed", success: false });
    } else {
      const email = decodedObj.email;
      await dbObj
        .collection("users")
        .updateOne({ email: { $eq: email } }, { $set: { password: hashpw } });
      res.send({ message: "Your password has been changed", success: true });
    }
  });
});

module.exports = forgotPasswordApiRoute;