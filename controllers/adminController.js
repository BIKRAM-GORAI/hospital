//adminController.js
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
            phone,
        });

        await user.save();

        //creating doctor entry
        const doctor=new Doctor({
            user:user._id,
            //!referencing the user created above used for linking

            department,
            experience:Number(experience) || 0,//changing to number

            name, //duplicated in user schema//justf for understanding we are keeping it here
            //email, //duplicated in user schema//ignored
            //phone,//duplicated in user schema//ignored
        });
        //&  critical correction here we are not saving name,email,phone in doctor schema as they are already present in user schema or duplication may occour and data may not be properly edited in both places


        await doctor.save();//saving doctor entry

        return res.status(201).json({message:"Doctor created successfully", doctor});
    }catch(error){//fallback error handling
        console.error("Error in createDoctor controller:",error);
        return res.status(500).json({message:"Server error"});
    }
};



//! now we will write the code for fetching the doctors from the database and send it to frontend

export const listDoctors=async(req,res)=>{
    try{
        const doctors=await Doctor.find()
            .sort({createdAt:-1}) //sorting by most recent
            .populate("user","name email phone") //populating user field with name and email and phone from User model
            .lean(); //lean for better performance

        return res.json({doctors});

    }catch(error){
        console.error("Error in listDoctors controller:",error);
        return res.status(500).json({message:"Server error"});
    }
};


//&  it is a pretty simple code but it is new to me so i will write what each line does so that i can write it myself later

//!                     OUTPUT OF THE ABOVE PART WOULD BE LIKE THIS 
// [
//   {
//     "_id": "123",
//     "department": "Cardiologist",
//     "experience": 5,
//     "user": {
//       "name": "Dr. Arjun",
//       "email": "arjun@gmail.com",
//       "phone": "9876543210"
//     }
//   }
// ]


//^ SOME IMPORTANT TERMS HERE
//* populate(): This method is used to replace the specified field in the document (in this case, user) with the actual document from the referenced collection (User model). 

// 🧠 SUPER CLEAR REAL-LIFE EXAMPLE
// Think of it like this:

// Doctor record stores:
// “My user is Roll No 456”
// .populate() means:
// “Go find Roll No 456 and bring their full name, email, phone and show it here.”
// But the actual file still says:
// “Roll No 456”

//* lean(): This method is used to improve performance by returning plain JavaScript objects instead of Mongoose documents. This is useful when you don't need the full functionality of Mongoose documents.  