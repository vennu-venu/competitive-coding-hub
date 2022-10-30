const exp = require("express");
const adminApiRoute = exp.Router();
adminApiRoute.use(exp.json());
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const ObjectId = require("mongodb").ObjectId;
require('dotenv').config();

adminApiRoute.post("/login", async (req, res) => {
  console.log(process.env.SECRETKEY);
  let username = req.body.username;
  let password = req.body.password;

  let dbObj = req.app.locals.databaseObj;
  let obj = await dbObj
    .collection("admins")
    .findOne({ username: { $eq: username } });
  if (obj == null) {
    res.send({
      message: "Username doesn't exist",
      success: false,
    });
  } else {
    let result = await bcrypt.compare(password, obj.password);
    if (result) {
      let signedToken = await jwt.sign(
        {
          username,
          role: "admin",
        },
        process.env.SECRETKEY,
        {
          expiresIn: "4h",
        }
      );
      res.send({
        message: "Successful Login !!",
        success: true,
        jwt: signedToken,
        username,
      });
    } else {
      res.send({
        messsage: "Wrong Password",
        success: false,
      });
    }
  }
});

adminApiRoute.get("/verify", async(req, res) => {
  const token = req.headers.authorization;
  let dbObj = req.app.locals.databaseObj;
  await jwt.verify(token, process.env.SECRETKEY, async (err, decodedObj) => {
    if(err) {
      res.send({
        message: "Error in Token Verification",
        success: false,
        verification: false,
      });
    }
    else {
      res.send({
        message: "Valid token",
        success: true,
        role: decodedObj.role
      });
    }
  })
})

adminApiRoute.get("/get-volunteers", async (req, res) => {
  const token = req.headers.authorization;
  let dbObj = req.app.locals.databaseObj;
  await jwt.verify(token, process.env.SECRETKEY, async (err, decodedObj) => {
    if(err) {
      res.send({
        message: "Error in Token Verification",
        success: false
      });
    }
    else {
      if(decodedObj.role === 'admin') {
        const volunteers = await dbObj.collection("volunteers").find().toArray();
        res.send({
          message: "Data fetched",
          success: true,
          volunteers
        })
      }
      else{
        res.send({
          message: "Unauthorised request",
          success: false
        })
      }
    }
  })
})

adminApiRoute.post("/add-volunteer", async (req, res) => {
  const token = req.headers.authorization;
  let dbObj = req.app.locals.databaseObj;
  await jwt.verify(token, process.env.SECRETKEY, async (err, decodedObj) => {
    if(err) {
      res.send({
        message: "Error in Token Verification",
        success: false
      });
    }
    else {
      if(decodedObj.role === 'admin') {
        let obj = await dbObj.collection("volunteers").findOne({email: {$eq: req.body.email}});
        if(obj == null) {
          await dbObj.collection("volunteers").insertOne(req.body);
          res.send({
            message: "Volunteer added Successfully",
            success: true,
          })
        }
        else {
          res.send({
            message: "Volunteer already exist",
            success: false,
          })
        }
      }
      else{
        res.send({
          message: "Unauthorised request",
          success: false
        })
      }
    }
  })
})

adminApiRoute.delete("/remove-volunteer/:id", async (req, res) => {
  const token = req.headers.authorization;
  let dbObj = req.app.locals.databaseObj;
  await jwt.verify(token, process.env.SECRETKEY, async (err, decodedObj) => {
    if(err) {
      res.send({
        message: "Error in Token Verification",
        success: false
      });
    }
    else {
      if(decodedObj.role === 'admin') {
        try{
          const response = await dbObj.collection("volunteers").deleteOne({_id: {$eq: ObjectId(req.params.id)}});
          console.log(response, ObjectId(req.params.id));
          res.send({
            message: "Volunteer was removed",
            success: true
          })
        }
        catch(error) {
          console.log("Error in removing volunteer", error);
          res.send({
            message: "Couldn't remove the Volunteer",
            success: false
          })
        }
      }
      else{
        res.send({
          message: "Unauthorised request",
          success: false
        })
      }
    }
  })
})

module.exports = adminApiRoute;
