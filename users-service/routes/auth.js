const express = require("express");
const User = require("../model/User");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser");

const JWT_SECRET = "Dilipcool";

//ROUTE 1 : Create user using POST : "api/auth/createuser" No auth required
router.post(
  "/createuser",
  [
    body("name", "Must contain min 3 letters").isLength({ min: 3 }),
    body("email", "Enter the valid Email").isEmail(),
    body("password", "Must contain min 5 letters").isLength({ min: 4 }),
  ],
  async (req, res) => {
    const result = validationResult(req);
    let success = false;
    //if Details are not valid
    if (!result.isEmpty()) {
      return res.send({ success, errors: result.array() });
    }

    try {
      //for finding the user in the database
      let user = await User.findOne({ email: req.body.email });
      //for user already exist error
      if (user) {
        return res
          .status(400)
          .json({ success, error: "Sorry this User name is already exist" });
      }
      //Hashing password
      const salt = await bcrypt.genSalt(10); //added salt
      const secpass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secpass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      // res.json(user);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      //another error as internal server error
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//ROUTE 2: Login user using POST : "api/auth/Login" No auth required
router.post(
  "/Login",
  [
    body("email", "Enter the valid Email").isEmail(),
    body("password", "password cannaot be blank").exists(),
  ],
  async (req, res) => {
    const result = validationResult(req);
    //if Details are not valid
    if (!result.isEmpty()) {
      return res.send({ errors: result.array() });
    }
    const { email, password } = req.body;
    let success = false;
    try {
      let user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res
          .status(400)
          .json({ success, error: "Please login with correct credentials" });
      }
      const passwordcompare = await bcrypt.compare(password, user.password);
      if (!passwordcompare) {
        return res
          .status(400)
          .json({ success, error: "Please login with correct credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET, { expiresIn: '1h' }); // Adjust the expiration time as needed
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      //another error as internal server error
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//ROUTE 3: get Login user details using POST : "api/auth/getuser"  auth required
router.post("/getuser", fetchUser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    //another error as internal server error
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
