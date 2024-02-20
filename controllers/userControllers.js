const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const SECRET_KEY = "NOTESAPI";
require("dotenv").config();
console.log(process.env.SECRET_KEY)

const signup = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const existingUser = await userModel.findOne({ email: email });
    // const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User Already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await userModel.create({
      email: email,
      password: hashedPassword,
      username: username,
    });
    console.log("reee:", result);

    ///////////////////////////////PAYLOAD////////////////////////////SECRET KEY
    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.SECRET_KEY
    );
    console.log("token", token);
    res.status(201).json({ user: result, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ email });
    console.log("existing:", existingUser);
    // const existingUser = await user.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const matchPassword = await bcrypt.compare(password, existingUser.password);

    if (!matchPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.SECRET_KEY
    );
    console.log("signin", token);
    res.status(201).json({ user: existingUser, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { signup, signin };
