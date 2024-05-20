import jwt from "jsonwebtoken";
import { createError } from "./error.js"
import User from "../models/user.model.js";

export const verifyToken = (req, res, next)=>{
    const token = req.cookies.access_token;
    if(!token){
        return next(createError(401, "You are not Authenticated"))
    }
    jwt.verify(token,process.env.JWT_SECRET,(err, user)=>{
        if(err) return next(createError(403, "Token is not valid!"));
        req.user = user;
        next()
    })
}

export const verifyUser = (req, res, next)=>{
    verifyToken(req,res,next, ()=> {
        if(req.user.id === req.params.id){
            next()
        } else {
            return next(createError(403, "You are not authorized!"));
        }
    })
}



export const requireLoggin = (req, res, next)=>{
    const token = req.cookies.access_token;
    if (token) {
        try {
            const _id = jwt.verify(token, process.env.JWT_SECRET).payload;
            User.findOne({_id})
                .then(next())
                .catch((err) => {
                    console.log(err);
                    return res.status(401).json({message: "error", code: "unauthenticated-access"});
                })
        } catch (error) {
            console.log(error);
            return res.status(400).json({message: "error", code: "token-expired", error});
        }
    } else {
        return res.status(401).json({message: "error", code: "unauthenticated-access"});
    }
}