//*                             OM

//!     HERE WE DEAL WITH THE LOGIC OF AUTHENTICATION OF USERS LOGIN AND REGISTER


import User from "../models/User.js";

//now we will create the register controller
//*  we will just check the data received from the frontend and store it in the database  but when to store will be decided by routes

//! we have to keep in mind the syntax --> take the inputs and check whether all the inputs are there or not
//! then check if the user already exists or not
//! if not then create a new user and save it to the database
//! finally return a response to the frontend
//!if not then return appropriate error messages

export const register=async(req,res)=>{
    try{
        const {name,email,password,role,phone,address}=req.body;


        //basic validation
        if (!name || !email || !password || !phone || !address) {
            return res.status(400).json({ message: "All fields are required" });
        }

        //check if user already exists
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }


       //* now collecting all the data in one place and saving it to database


       const newUser=new User({
        name,
        email,
        password,
        role:role || 'patient',  //default role is patient
        phone,
        address,
       });

       await newUser.save();

       //!   so save is completed

       //* now we will return a json response to the frontend so that we can show info and continue various redirection in the frontend

       return res.status(201).json({
        user:{
            id:newUser._id,
            name:newUser.name,
            email:newUser.email,
            role:newUser.role,
            phone:newUser.phone,
            address:newUser.address,
        }
       });
    }catch(err){
        console.error("Error in register controller:",err);
        return res.status(500).json({message:"Server error"});
    }
};


//!                   REGISTER CONTROLLER COMPLETED 

//^                   BEGINNING OF LOGIN CONTROLLER


export const login=async(req,res)=>{{
    try{
        const{email,password}=req.body;

        //basic validation
        if(!email || !password){
            return res.status(400).json({message:"Email and password are required"});
        }

        //!    check if user exists

        const user=await User.findOne({email});  //!   finding user by email

        if(!user){
            return res.status(400).json({message:"Invalid email or password"});
        }

        if (user.password!==password){
            return res.status(400).json({message:"Invalid email or password"});
        }

        //* if login successful then

        return res.status(200).json({
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role,
                phone:user.phone,
                address:user.address,
            }
        });

    }catch(err){
        console.error("Error in login controller:",err);
        return res.status(500).json({message:"Server error"});
    }
}};



//!                   LOGIN CONTROLLER COMPLETED

        





