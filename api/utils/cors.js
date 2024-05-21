import { allowedOrigins } from "./allowed_origins.js"

// export const corsOptions = {
//     origin: (origin, callback) => {
//       if(allowedOrigins.allincludes(origin) || !origin){
//         callback(null, true)
//       }else{
//         callback(new Error('Not allowed by CORS'))
//       }
//     }
//   }
export const corsOptions = {
  origin: allowedOrigins,
  credentials: true
}