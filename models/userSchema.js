const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name:{required:true,type:String},
    email:{required:true,type:String},
    phonenumber:{required:true,type:String},
    password:{required:true,type:String}

},{timestamps:true})

userSchema.pre('save',async function(next) {
    const user=this;
    if(user.isModified('password')){
       user.password=await bcrypt.hash(user.password,10); 
    }
})

module.exports = mongoose.model('user',userSchema);


