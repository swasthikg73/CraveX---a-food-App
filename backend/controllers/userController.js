import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

//create Token
const createToken = async (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//login user
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "Invalid credentials.." });
    }
    const ispasswordProper = await bcrypt.compare(password, user.password);

    if (!ispasswordProper) {
      return res.json({ success: false, message: "Invalid credentials.." });
    }

    const token = await createToken(user.id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error..!" });
  }
};

//register
const register = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    const exists = await userModel.findOne({ email });
    //Check user email is exists
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    //validating email format & strong password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter valid email" });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    //Hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = await createToken(user.id);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error..!" });
  }
};

export { login, register };
