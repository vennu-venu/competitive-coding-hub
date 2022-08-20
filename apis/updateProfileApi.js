const exp = require("express");
const jwt = require("jsonwebtoken");

const updateProfileApiRoute = exp.Router();
updateProfileApiRoute.use(exp.json());
updateProfileApiRoute.post("/verify-and-get-user", async (req, res) => {
  token = req.body.token;
  await jwt.verify(token, "cch", async (error, decodedObj) => {
    if (error) {
      res.send({ message: "Error in Token Verification", verification: false });
    } else {
      const email = decodedObj.email;
      let dbObj = req.app.locals.databaseObj;
      let userData = await dbObj
        .collection("users")
        .findOne({ email: { $eq: email } });
      delete userData.password;
      res.send({
        message: "Succesful Request",
        verification: true,
        user: userData,
      });
    }
  });
});

updateProfileApiRoute.post("/change", async (req, res) => {
  const email = req.body.email;
  let data = req.body;
  delete data.email;
  let dbObj = req.app.locals.databaseObj;
  try {
    await dbObj
      .collection("users")
      .updateOne({ email: { $eq: email } }, { $set: data });
    res.send({ message: "Successfully Updated" });
  } catch (error) {
    res.send({ message: "Couldn't update" });
  }
});

module.exports = updateProfileApiRoute;
