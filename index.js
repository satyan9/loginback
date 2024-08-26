const express = require('express');
const PORT = process.env.PORT || 8000;

const bcrypt = require('bcryptjs');
const cors = require('cors');
const bodyparser = require('body-parser');
const user=require('./models/userSchema')

const dotenv = require('dotenv');
const app =express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
require('./db');
app.use(bodyparser.json());



app.get('/',cors(),(req,res)=>{
    res.json({
        message:'okey it works sss'
    })
})
app.post('/', async (req, res) => {
    const { email } = req.body;
    try {
        const userRecord = await user.collection.findOne({ email: email });

        if (userRecord) {
            res.json(("exist"));
        } else {
            res.json("notexist");
        }
    } catch (e) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/', async (req, res) => {
    const { email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await user.collection.updateOne(
            { email: email },
            { $set: { password: hashedPassword } }
        );

        if (result.modifiedCount > 0) {
            res.json("exist");
        } else {
            res.json("notexist");
        }
    } catch (e) {
        res.status(500).json({ message: 'Internal server error' });
    }
});





app.post('/', async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find the user by email
        const userRecord = await user.collection.findOne({ email: email });

        if (userRecord) {
            // Compare the provided password with the hashed password stored in the database
            const isPasswordCorrect = await bcrypt.compare(password, userRecord.password);

            if (isPasswordCorrect) {
                res.json("exist");
            } else {
                res.json("notexist");
            }
        } else {
            res.json("notexist");
        }
    } catch (e) {
        res.json(e);
    }
});


app.post('/register', async(req,res)=>{
    try{
        //console.log(req.body);

        const{name,password,email,phonenumber}=req.body;
        const check = await user.collection.findOne({email:email})
        if(check){
            res.json("exist");
        }
        else{
        let newUser = new user({
            name:name,
            password:password,
            email:email,
            phonenumber:phonenumber
        })
        await newUser.save();
        res.json({
            message:'okey'
        }).status(200)
    }
    } 
    catch(e){
        res.json({
            message:'error in register from backend '
        })
    }
})

app.listen(PORT, () => {
    console.log('server running at '+PORT);
});
