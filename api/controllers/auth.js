import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const login = async (req, res, next)=> {
  try {
    const {email, password} = req.body
    const user = await User.findOne({email})
    if (!user) return next(createError(404,"User not found"))
      
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) return next(createError(400, "Wrong password or username"))
    
    const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET, { expiresIn: '1h' })
    const { password: hashPassword, ...userData } = user._doc;

    await user.save()

    res.cookie("access_token", token, {
      httpOnly: true,
    }).status(200).json({message: "success", data: userData})
  } catch (err) {
    next(err)
  }
}
export const getLoggedInUser = async (req,res,next)=>{
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return next(createError(401, "You are not Authenticated"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const user = await User.findOne(
      { _id: userId },
      { firstName: 1, lastName: 1, registrationDate: 1 }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: "success", data: user });
  } catch (error) {
     res.status(500).json({ message: error.message });
  }
}

export const logout = async (req, res, next) => {
  try {
    res.clearCookie('access_token');
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    next(err);
  }
};
  
export const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const user = new User({firstName,lastName, email, password: hash });
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
   console.error("Error in register function:", error);
    next(error);
  }
};

