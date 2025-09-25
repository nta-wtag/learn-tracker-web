import User from "../model/user.model.js";
import bcryptjs from 'bcryptjs';
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export async function signup(req, res){
    try{
        const {email, password, role, username} = req.body;
        if(!email || !password || !role || !username){
            return res.status(400).json({
                success: false,
                message: "All fields are mandatory"
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({
                success: false,
                message: "Invalid email"
            });
        }

        if(password.length < 6){
            return res.status(400).json({
                success: false,
                message: "Password must be at least of 6 characters"
            });
        }

        const existingUserByEmail = await User.findOne({
            email: email
        });

        if(existingUserByEmail){
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        const PROFILE_PICS = [
            '/avatar1.png',
            '/avatar2.png',
            '/avatar3.png',
            '/avatar4.png',
            '/avatar5.png',
            '/avatar6.png',
            '/avatar7.png',
            '/avatar8.png',
        ];

        const avatar = PROFILE_PICS[
            Math.floor(Math.random() * PROFILE_PICS.length)
        ];

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            email,
            password,
            role,
            username,
            avatar,
        });

        generateTokenAndSetCookie(newUser._id, res);
        await newUser.save();
        res.status(201).json({
            success: true,
            user: {
                ...newUser._doc,
                password: "",
            }
        });
    }
    catch(e){
        console.error("Signup error:", e.message);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}

export async function login(req, res){
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "All fields are mandatory"
            });
        }

        const user = await User.findOne({
            email: email
        }).select("+password")

        if(!user){
            return res.status(404).json({
                success: false,
                message: "Invalid credentials"
            });
        }
        console.log(password)
        console.log(user.password)

        const isPasswordCorrect = await bcryptjs.compare(password, user.password);

        if(!isPasswordCorrect){
            return res.status(400).json({
                success: false,
                message: "Invalid password"
            });
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            user: {
                ...user._doc,
                password: "",
            },
        });
    }
    catch(e){
        console.log(e)
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}

export async function logout(req, res){
    try{
        res.clearCookie(
            'jwt-learn-tracker'
        );

        res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });
    }
    catch(e){
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}

export async function authCheck(req, res){
    try{
        res.status(200).json({
            success: true,
            user: req.user
        });
    }
    catch(e){
        res.status(500).json({
            success: false,
            message: `Server error${e.message}`
        });
    }
}