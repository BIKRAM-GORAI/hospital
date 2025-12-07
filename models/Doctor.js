//Doctor.js
import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId, ref:'User'},

    //* since we have made 2 things separate(User and Doctor), we need to reference User here . one is for storing doctor information for business purposes and other user model is for authentication and authorization purpose

    

    name:{type:String, required:true,default:""},
    department:{type:String, required:true,default:""},

    experience:{type:Number, required:true,default:0}, 

    

    blacklisted:{type:Boolean, default:false},
    //  *  to mark if a doctor is blacklisted or not
},
{
    timestamps:true,
}
);

const Doctor=mongoose.model('Doctor',doctorSchema);

export default Doctor;