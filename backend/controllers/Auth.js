const User = require('../models/UserSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.signup = async (req,res) => {
    try {
        const {name,email,account_type,password,confirmPassword} = req.body;

        if(!name || !email || !account_type || !password || !confirmPassword)
        {
            return res.status(404).json({
                success : false,
                message : 'give all details',
            });
        }


        if(password !== confirmPassword) {
            return res.status(500).json({
                success : false,
                message : 'both passwords are not matched',
            });
        }

        const hashedpassword = await bcrypt.hash(password,10);

        const details = await User.create(
            { 
                name : name,
                email : email,
                account_type : account_type,
                password : hashedpassword,
        });

        return res.status(200).json({
            success : true,
            message : 'welcome user !!!',
            details : details,
        });
    }catch(error) {
        return res.status(500).json({
            success : false,
            message : 'server error at sign up',
        });
    }
}

exports.signin = async (req,res) => {
    try {
        const {email , password} = req.body;

        if(!email || !password)
        {
            return res.status(404).json({
                success : false,
                message : 'give all details',
            });
        }


        const details = await User.findOne({email : email});

        if(!details) {
            return res.status(401).json({
                success : false,
                message : 'register first',
            });
        }

        if(await bcrypt.compare(password,details.password))
        {

            // token and cookies develop kro then send to frontend
            const payload = {
                userid : details._id,
                email : details.email,
                account_type : details.account_type,
            }
            const token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn : "5h",
            });    

            return res.cookie('token',token,{
                httpOnly: true,
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            }).status(200).json({
                success : true,
                message: 'login successfully',
                token,
                details,
            })
        }else {
            return res.status(401).json({
                success : false,
                message : 'enter correct details',
            });
        }
    }catch(error) {
        return res.status(500).json({
            success : false,
            message : 'server error at sign in',
        });
    }
}