const bcrypt =require('bcrypt');
const UserModel = require("../Models/User");
const jwt=require('jsonwebtoken');

const signup=async(req,res) =>{
try {
    const{name,email,password}=req.body;
    const user=await UserModel.findOne({email});
    if(user){
        return res.status(400)
        .json({message:'user is already exist, you can login ',success:false});

    }
    const UserModel=new UserModel({name,email,password});
    UserModel.password=await bcrypt.hash(password,10);
    await UserModel.save();
    res.status(201).json({
        message:'signup sucessfully',
        success:true
    })
}

 catch (err){
    res.status(500).json({
        message:'Internal server error',
        success:false
    })
}
}

const login=async(req,res) =>{
    try {
        const{email,password}=req.body;
        const user=await UserModel.findOne({email});
        if(user){
            return res.status(403)
            .json({message:'Auth failed email or password is wrong ',success:false});
    
        }
        const ispassEqual=await bcrypt.compare(password,user.password);
        if(!ispassEqual){
            return res.status(403).json({message:'Auth failed email or password is wrong ',success:false})
        }
        const jwtToken=jwt.sign({email:user.email,_id:user._id},
            process.env.jwtToken,
            {expiresIn:'24H'}
        )
        res.status(200).json({
            message:'signup sucessfully',
            success:true,
            jwtToken,email,name:user.name
        })
    }
    
     catch (err){
        res.status(500).json({
            message:'Internal server error',
            success:false
        })
    }
    }
module.exports={signup,login}
