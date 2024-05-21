export const credentials = (req, res, next) => {
    const origin = req.headers.origin
  
    if(process.env.ALLOWED_ORIGIN.includes(origin)){
      res.header('Access-Control-Allow-Origin', true)
      res.header('Access-Control-Allow-Credentials', true)
    }
  
    next()
  }