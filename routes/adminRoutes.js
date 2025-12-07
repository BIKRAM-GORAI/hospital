//adminRoutes.js
import express from 'express';

import  {createDoctor,listDoctors,deleteDoctor,setDoctorBlacklist} from '../controllers/adminController.js';

//!importing the createDoctor block from adminController.js

import adminAuth from '../middlewares/adminAuth.js';   

//!importing the adminAuth middleware to protect this route

const router=express.Router();//creating express router

//^ we are importing the adminAuth middleware to protect this route

router.post('/doctors',adminAuth,createDoctor);  // when we write /doctors ->this name must match with the name used in frontend while making request like api/admin/doctors


//!flow is-> server.js -> adminRoutes.js -> adminAuth.js -> adminController.js

//^ we are using adminAuth middleware here to protect this route so that only authorized admin can create doctor

router.get('/doctors',adminAuth,listDoctors);//points to listDoctors controller function
//we use get becauswe we are fetching the list of doctors
//and not actually modifying anything or adding anything to the database


router.delete("/doctors/:id",adminAuth,deleteDoctor);
//route for deleting a doctor by id
//:id is a route parameter which will be replaced by actual doctor id while making request


router.patch("/doctors/:id/blacklist",adminAuth,setDoctorBlacklist);
//route for blacklisting a doctor by id
//we are using patch method because we are updating a field(blacklisted) of the doctor document

export default router;





//*IMPORTANT SYNTAX

// Router Method,   HTTP Method   ,CRUD Operation,    Purpose


// router.get()=>      GET,    Read,           Retrieve data from the server. Used for fetching a list of resources or a single resource.

// router.post()=>     POST,   Create,         Send data to the server to create a new resource.

// router.put()=>      PUT,    Update (Full),   "Update/replace an entire existing resource. If the resource doesn't exist, it may create it."

// router.patch()=>    PATCH,  Update (Partial),  Apply partial modifications to an existing resource. Only sends the data that needs to change.

// router.delete()=>   DELETE,    Delete,        Remove a specified resource from the server.



//* PUT vs. PATCH (The Update Difference)
// This is the most common point of confusion:

// router.put() (PUT): Used for a full replacement. If a User document has fields name, email, and age, and you use PUT but only send name and email, the age field will be removed/set to null on the server. You must send the complete resource representation.

// router.patch() (PATCH): Used for a partial update. If you only want to change the email, you send a PATCH request with only the new email field. All other fields (name, age) are left untouched.