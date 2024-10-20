import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
// import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
import { generateTokenAndSetCookie } from '../utils/generateToken.js'
export async function signup(req, res){ 
    try {
        console.log(req.body)
        const { email, password, username } = req.body
        if(!email || !password|| !username){
            return res.status(400).json({success:false, message: 'Please provide all fields'})}

            const emailRegex=  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if(!emailRegex.test(email)){
                return res.status(400).json({success:false, message: 'Please provide a valid email'})
            }

            if(password.length< 6){
                return res.status(400).json({success:false, message: 'Password must be at least 6 characters long'})
            }
            const existingUserByEmail = await User.findOne({email: email})
            if(existingUserByEmail){
                return res.status(400).json({success:false, message: 'Email already exists'})
            }
            const existingUserByUsername = await User.findOne({username: username})
            if(existingUserByUsername){
                return res.status(400).json({success:false, message: 'Username already exists'})
            }
            const salt = await bcryptjs.genSalt(10);
		    const hashedPassword = await bcryptjs.hash(password, salt);

            const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];

		const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

		const newUser = new User({
			email,
			password: hashedPassword,
			username,
			image,
		});
         
        generateTokenAndSetCookie(newUser._id, res);
		await newUser.save();

        // const token = jwt.sign({ id: userId }, ENV_VARS.JWT_SECRET, { expiresIn: '7d' });
        // res.cookie('jwt-netflix-token', token, {
        //      maxAge: 7 * 24 * 60 * 60 * 1000,
        //      httpOnly: true, // prevents XSS attacks cross-site scripting attacks, make it not accesed by js, only accesed by browser
        //      sameSite: "strict", // prevents CSRF attacks cross-site request forgery attacks
        //     secure: process.env.NODE_ENV  , //
        //     });

		res.status(201).json({
			success: true,
			user: {
				...newUser._doc,
				password: "",
			},
		});

        }
    catch (error) {
        console.log(" Error in singup controller: " + error.message)
        res.status(500).json({success: false, message: error.message});
    }
}
export async function login(req, res){ 
    try {
        const {email, password} = req.body

         if(!email || !password){
           return  res.status(400).json({success:false, message:"All fields ar required"})
         }

         const user = await User.findOne({email:email})
         if (!user){
          return  res.status(400).json({success:false, message:"Invalid Email or Password"})
         }

         const isPasswordCorrect= await bcryptjs.compare(password, user.password)
         if(!isPasswordCorrect){
          return  res.status(400).json({success:false, message:"Password is incorrect"})
         }

         generateTokenAndSetCookie(user._id,res)

        // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        // res.cookie('jwt-netflix-token', token, {
        //      maxAge: 7 * 24 * 60 * 60 * 1000,
        //      httpOnly: true, // prevents XSS attacks cross-site scripting attacks, make it not accesed by js, only accesed by browser
        //      sameSite: "strict", // prevents CSRF attacks cross-site request forgery attacks
        //     secure: process.env.NODE_ENV  , //
        //     });

         return res.status(200).json({success:true, 
            user:{
                   ...user._doc,
                   password:""
         } ,message: "logged in successfully"})
    } catch (error) {
        console.log("Error in login controller: " + error.message)
       return res.status(500).json({success:false, message: error.message});
    }
}
export async function logout(req, res){
    try{
      res.clearCookie("jwt-netflix-token");
      res.status(201).json({success:true, message:" logged out successfully"});
    } catch(error){
        console.log("Error in logout controller",error.message)
        res.status(500).json({success:false,message:"Internal Server Error"});
    }
}

export async function authCheck(req, res) {
	try {
		console.log("req.user:", req.user);
		res.status(200).json({ success: true, user: req.user });
	} catch (error) {
		console.log("Error in authCheck controller", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
}