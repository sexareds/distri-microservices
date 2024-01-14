const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const User = require("../model/User");

const createUser = async (req, res) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ success: false, errors: result.array() });
    }

    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, error: "This email is already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const data = { user: { id: user.id } };
    const authToken = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "1h" });

    return res.json({ success: true, authToken });
  } catch (error) {
    console.error("Error in createUser:", error);
    return res.status(500).send("Internal server error");
  }
};

const login = async (req, res) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ success: false, errors: result.array() });
    }

    const { email, password } = req.body;
    let user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid email or password" });
    }

    const data = { user: { id: user.id } };
    const authToken = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "1h" });

    return res.json({ success: true, authToken });
  } catch (error) {
    console.error("Error in login:", error);
    return res.status(500).send("Internal server error");
  }
};

const getUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    return res.json({ success: true, user });
  } catch (error) {
    console.error("Error in getUser:", error);
    return res.status(500).send("Internal server error");
  }
};

module.exports = {
  createUser,
  login,
  getUser,
};
