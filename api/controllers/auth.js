import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const login = async (req, res, next)=> {
  try {
    const {email, password } = req.body

    if(!email || !password) return res.status(422).json({'message': 'Invalid fields'})
    
    const user = await User.findOne({email}).exec()
  
    if(!user) return res.status(401).json({message: "Email or password is incorrect"})
  
    const match = await bcrypt.compare(password, user.password)
  
    if(!match) return res.status(401).json({message: "Email or password is incorrect"})
  
    const accessToken = jwt.sign(
      {
        id: user.id
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '1800s'
      }
    )
  
    const refreshToken = jwt.sign(
      {
        id: user.id
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: '1d'
      }
    )
  
    user.refresh_token = refreshToken
    await user.save()
  
    res.cookie('refresh_token', refreshToken, {httpOnly: true, sameSite: 'None', secure: true, maxAge: 24*60*60*1000})
    res.json({access_token: accessToken})
    // const {email, password } = req.body
    // const user = await User.findOne({email: req.body.email}).exec()
    // if (!user) return next(createError(404,"User not found"))
    // if(!email || !password) return next(createError(422, "Invalid Inputs"))
      
    // const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
    // if (!isPasswordCorrect) return next(createError(400, "Wrong password or username"))
    
    // const accessToken = jwt.sign({ id: user._id}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
    // const refreshToken = jwt.sign({id: user.id},process.env.REFRESH_TOKEN_SECRET,{ expiresIn: '1d'})

    // user.refresh_token = refreshToken
    // await user.save()

    // res.cookie('refresh_token', refreshToken, {httpOnly: true, sameSite: 'None', secure: true, maxAge: 24*60*60*1000})
    // res.json({access_token: accessToken})

  } catch (err) {
    next(err)
  }
}

export const getLoggedInUser = async (req, res, next) => {
  try {
    const user = req.user
    return res.status(200).json(user)
  } catch (err) {
     next(err)
  }
};

export const logout = async (req, res, next) => {
  console.log('logout called');
  try {
    const cookies = req.cookies
    console.log(cookies);
    if(!cookies.refreshToken)return res.status(204)
    
    const refreshToken = cookies.refresh_token
    const user = await User.findOne({refresh_token: refreshToken}).exec()
    if(!user){
      res.clearCookie('refresh_token', {httpOnly: true, sameSite: 'None', secure: true})
      return res.sendStatus(200)
    }

    user.refresh_token = null
    await user.save()
    res.clearCookie('refresh_token', {httpOnly: true, sameSite: 'None', secure: true})
    res.status(200).json('Logout done')
  } catch (err) {
    next(err);
  }
};

export const refresh = async (req, res, next) => {
  try {
    const cookies = req.cookies
    if(!cookies.refresh_token) return res.sendStatus(401)

    const refreshToken = cookies.refresh_token

    const user = await User.findOne({refresh_token: refreshToken}).exec()

    if(!user) return res.sendStatus(403)

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
      if(err || user.id !== decoded.id) return res.sendStatus(403)

      const accessToken = jwt.sign({ id: decoded.id },process.env.ACCESS_TOKEN_SECRET,{ expiresIn: '1800s' })
      res.json({access_token: accessToken})
    }
  )
  } catch (err) {
    next(err)
  }
}
  
export const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const userExist = await User.exists({email}).exec()

    if(userExist) return res.status(409)

    const user = new User({firstName,lastName, email, password: hash });
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
   console.error("Error in register function:", error);
    next(error);
  }
};

