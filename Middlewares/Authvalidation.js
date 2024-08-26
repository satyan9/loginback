const joi=require('joi');
 const signupvalidation =(req,res,next)=>{
    const schema =joi.object({
        name:joi.string.min(3).max(100).required(),
        email:joi.stringemail().required(),
        password:joi.string().min(4).max(100).required()
    });
    const {error} = schema.validate(req.body);
    if(error){
      return res.status(400)
      .json({message:"Bad reuest",error})  
    }
    next();
 }

 const loginvalidation =(req,res,next)=>{
    const schema =joi.object({
        email:joi.stringemail().required(),
        password:joi.string().min(4).max(100).required()
    });
    const {error} = schema.validate(req.body);
    if(error){
      return res.status(400)
      .json({message:"Bad reuest",error})  
    }
    next();
 }
 module.exports={
    signupvalidation,loginvalidation
 }