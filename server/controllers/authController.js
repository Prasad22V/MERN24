// *-------------------
// Registration Logic

const User = require("../models/userModel");

// *-------------------
const register = async (req, res) => {
  try {
    // const data = req.body;
    console.log(req.body);
    const { username, email, phone, password } = req.body;

    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(400).json({ msg: "email already exists" });
    }

    const userCreated = await User.create({ username, email, phone, password });

    // res.status(201).json({ message: "User registered successfully" });
    res.status(201).json({ msg: userCreated });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { register };
