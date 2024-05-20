import jwt from "jsonwebtoken";
import User from "../models/user.model.js"

import { createError } from "./error.js";

export const authentication = (req, res, next)=>{
    const authHeader = req.header.authorization || req.header.authorization 

    if(authHeader?.startsWith('Bearer')){
        const token = authHeader.split(' ')[1]

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
            if(err){
                req.user = {};
                return next(createError(403, "Token is not valid!"));
            }

            const userFound = await User.findById(decoded.id).select({password: 0, refresh_token: 0}).exec()
            if (userFound) {
                req.user = {...userFound.toObject({getters: true})}
                next()
            } else {
                req.user = {}
                next(createError(403, "User not found!"));
            }
        })

    }else{
        req.user = {}
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