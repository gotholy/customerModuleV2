import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const login = async (req, res, next)=> {
  try {
      
    const user = await User.findOne({email: req.body.email})
    if (!user) return next(createError(404,"User not found"))
      
    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
    if (!isPasswordCorrect) return next(createError(400, "Wrong password or username"))
    
    const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET, { expiresIn: '1h' })
    const { password ,...otherDetails } = user._doc;

    user.updated_at = new Date()
    await user.save()

    res.cookie("access_token", token, {
      httpOnly: true,
    }).status(200).json({...otherDetails})
  } catch (err) {
    next(err)
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

