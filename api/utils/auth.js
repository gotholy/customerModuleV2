import { createError } from "./error.js";


export const auth= (req,res,next)=>{
    console.log(req.user);
    if(req.user?.id ){
        next()
    } else {
        return next(createError(403, "You are not authorized!"));
    }
}