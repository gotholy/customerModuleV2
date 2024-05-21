import jwt from "jsonwebtoken";
import User from "../models/user.model.js"
import { createError } from "./error.js";

export const authentication = (req, res, next)=>{
    console.log("Authenticating request...")
    const authHeader = req.header("authorization") || req.header("Authorization");
    console.log("authHeader: ", authHeader)
  
    if(authHeader?.startsWith('Bearer')){
        const token = authHeader.split(' ')[1]
        console.log("Token: ", token)
  
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
            console.log("Decoded: ", decoded)
            if(err){
                console.log("Error while verifying token: ", err)
                req.user = {};
                return next(createError(403, "Token is not valid!"));
            }
  
            const userFound = await User.findById(decoded.id).select({password: 0, refresh_token: 0}).exec()
            if (userFound) {
                console.log("User found: ", userFound)
                req.userFound = {...userFound.toObject({getters: true})}
                next()
            } else {
                console.log("User not found in database")
                req.userFound = {}
                next(createError(403, "User not found!"));
            }
        })
  
    }else{
        console.log("No Bearer token found in request headers")
        req.userFound = {}
        return next()
    }
}

export const verifyUser = (req, res, next)=>{
        if(req.userFound?.id ){
            next()
        } else {
            return next(createError(403, "You are not authorized!"));
        }
}
