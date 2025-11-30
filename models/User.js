import mongoose from 'mongoose';    //*importing mongoose package






/*  //!  1st commit 
* User Schema
^ name,email,password,role,phone,address,timestamps(automatically created)
& password is not hashed for now
// 
*/


//  *   the schema is how the data is stored in the database

const userSchemsa = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },

        password: {
            type: String,//storing as plain text for now
            required: true,
        },

        role:
        {
            type: String,
            enum: ['admin', 'doctor', 'patient'],  //cannot enter any other value
            default: 'patient',
            required: true,
        },

        phone: {
            type: String,
            trim: true,
            default: "",
        },

        address: {
            type: String,
            trim: true,
            default: "",
        },

        },


        {
            timestamps: true,   //* Automatically adds createdAt and updatedAt fields
        }
    );
    
    const User = mongoose.model('User', userSchemsa);
    
    export default User;

