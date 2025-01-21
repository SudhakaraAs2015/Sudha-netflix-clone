import { User } from "../models/UserModel.js";
import { generateTokenAndSetCookie } from "../utils/generateTokens.js";
import bcryptjs from "bcryptjs";

// Signup controller
const signup = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // Check if all fields are provided
    if (!email || !password || !username) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all the fields" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid Email" });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    // Check if email already exists
    const existingUserByEmail = await User.findOne({ email:email });
    if (existingUserByEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    // Check if username already exists
    const existingUserByUsername = await User.findOne({ username : username });
    if (existingUserByUsername) {
      return res
        .status(400)
        .json({ success: false, message: "Username already exists" });
    }
    // Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Set default profile picture
    const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

    // Create new user
    const newUser = new User({
      email,
      username,
      password: hashedPassword,
      image,
    });

    // Generate JWT token and set cookie

    generateTokenAndSetCookie(newUser._id.toString, res);
    // Save the user to the database
    await newUser.save();

    // Remove password from response
    res.status(201).json({
      success: true,
      user: {
        ...newUser._doc, // Conver Mongoose document to JS Object
        password: "",
      },
    });
  } catch (error) {
    console.error("Error in signup", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// Login controller
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send({ success: false, message: "Please fill all the fields" });
    }
    const user = await User.findOne({ email : email });
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "Invalid credentials" });
    }
    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(404)
        .send({ success: false, message: "Invalid credentials" });
    }

    generateTokenAndSetCookie(user._id, res);
    res.status(200).send({
      success: true,
      user: {
        ...user._doc,
        password: "",
      },
    });
  } catch (error) {
    console.log("Error in Login", error.message);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
};

// Logout controller
const logout = async (req, res) => {
  try {
    res.clearCookie("jwt-netflix");
    res.status(200).send({ success: true, message: "Logged out successfullt" });
  } catch (error) {
    console.log("Error in Logout", error.message);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
};


const authCheck = async (req, res) =>{
  try {

		res.status(200).json({ success: true, user: req.user });
	} catch (error) {
		console.log("Error in authCheck controller", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
}


export { signup, login, logout, authCheck};
