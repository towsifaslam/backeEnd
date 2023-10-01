const notFound = (req,res,next)=>{
  const error = new Error(`not found: ${req.orginalUrl}`);
  res.status(404);
  next(error)
}

const erroHandler = (err,req,res,next)=>{
  const statusCode = req.statusCode === 200 ? 500:res.statusCode;
  res.status(statusCode);
  res.json({
    message: err?.message,
    stack: err?.stack,
  })
}


module.exports = {notFound,erroHandler}