import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// create token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_TOKEN);
};

// login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User doesn't exists! Please register.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = createToken(user._id);

    res.json({ success: true, token, message: "Logged In!" });
  } catch (error) {}
};

// register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // checking user exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists!" });
    }

    // validate data
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please provide a valid email!",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password! More than 8 characters.",
      });
    }

    // hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);

    res.json({ success: true, token, message: "Registration successfull!" });
  } catch (error) {
    console.log("Error in registerUser: ", error);
    res.json({ success: false, message: "Something went wrong!" });
  }
};

// user details
// const getUser = async (req, res) => {
//   try {
//     const { email } = req.body;

//     const user = await userModel.findOne({ email }).select("-password");
//     res.json({ success: true, data: user });
//   } catch (error) {
//     console.log("Error in getUser: ", error);
//     res.json({ success: false, message: "Something went wrong! ", error });
//   }
// };

const getUser = async (req, res) => {
  try {
    const { token } = req.body; // Get token from the request body

    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "Token is required!" });
    }

    // Decode the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_TOKEN); // Make sure the secret key is provided

    console.log(decoded);

    // Fetch user data using the decoded userId (or email)
    const user = await userModel.findById(decoded.userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }

    res.json({ success: true, userData: user });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ success: false, message: "Something went wrong!" });
  }
};

export { loginUser, registerUser, getUser };
