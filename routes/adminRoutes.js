//adminRoutes.js
import express from 'express';

import  {createDoctor,listDoctors} from '../controllers/adminController.js';

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


export default router;
