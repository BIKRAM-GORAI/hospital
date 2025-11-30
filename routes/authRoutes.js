//*                           OM

//!   ROUTES WORKS LIKE TRAFFIC LIGHTS ,IT TELLS WHICH CONTROLLER TO CALL WHEN A REQUEST COMES FROM FRONTEND


import express from "express";
import{register,login} from "../controllers/authControllers.js";

const router=express.Router();
//&  CREATING ROUTER OBJECT FROM EXPRESS  */


//^   REGISTER ROUTE
router.post("/register",register);

//    /register is summoned from frontend when user hits register button and it calls register controller


//^   LOGIN ROUTE
router.post("/login",login);

//    /login is summoned from frontend when user hits login button and it calls login controller


export default router;
//&  EXPORTING ROUTER SO THAT IT CAN BE USED IN SERVER.JS  */