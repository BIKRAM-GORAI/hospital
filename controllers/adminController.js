import User from "../models/User.js";  //!importing user model
import Doctor from "../models/Doctor.js";//!importing doctor model
import dotenv from "dotenv";
dotenv.config();

//!controller to create a new doctor

//*so the plan is to create 2 schema objects one in user and one in doctor
//*beacuse for storing login info we need user schema and for storing doctor specific info we need doctor schema

//^logic is pretty complicated but it will ease as we progress

export const createDoctor=async(req,res)=>{
    try{
        const {name,department,experience=0,email="",phone=""}=req.body;
        
        //basic validation
        if(!name || !department || !email || !phone)
        {
            return res.status(400).json({message:"Name, department, email and phone are required"});
        }

        //check if doctor with same email already exists
        if(email){
            const existingDoctor=await User.findOne({email});
            if(existingDoctor){
                return res.status(400).json({message:"Doctor with this email already exists"});
            }
        }
        //creating user entry
        const user=new User({
            name,
            email,
            password:process.env.TEMP_DOCTOR_PASSWORD || "changeme", //default password for now
            role:"doctor",
        });

        await user.save();

        //creating doctor entry
        const doctor=new Doctor({
            user:user._id,
            //!referencing the user created above used for linking
            name,
            department,
            experience:Number(experience) || 0,//changing to number
            email,
            phone,
        });
        await doctor.save();//saving doctor entry

        return res.status(201).json({message:"Doctor created successfully", doctor});
    }catch(error){//fallback error handling
        console.error("Error in createDoctor controller:",error);
        return res.status(500).json({message:"Server error"});
    }
};

        