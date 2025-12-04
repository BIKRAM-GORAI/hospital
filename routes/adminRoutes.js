import express from 'express';

import  {createDoctor} from '../controllers/adminController.js';

//!importing the createDoctor block from adminController.js

import adminAuth from '../middlewares/adminAuth.js';   

//!importing the adminAuth middleware to protect this route

const router=express.Router();//creating express router

//^ we are importing the adminAuth middleware to protect this route

router.post('/create-doctor',adminAuth,createDoctor);


//!flow is-> server.js -> adminRoutes.js -> adminAuth.js -> adminController.js

//^ we are using adminAuth middleware here to protect this route so that only authorized admin can create doctor


export default router;
