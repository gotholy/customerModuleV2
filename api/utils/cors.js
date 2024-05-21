export const corsOptions = {
    origin: (origin, callback) => {
      if(process.env.ALLOWED_ORIGIN.includes(origin) || !origin){
        callback(null, true)
      }else{
        callback(new Error('Not allowed by CORS'))
      }
    }
  }