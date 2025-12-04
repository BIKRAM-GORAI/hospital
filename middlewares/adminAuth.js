import dotenv from 'dotenv';
dotenv.config();

const ADMIN_SECRET = process.env.ADMIN_SECRET;


export default function adminAuth(req, res, next) {

    //*it creates a middleware function adminAuth where it takes 3 things req,res,next ->request response and next middlewareor routes

    const header=req.headers["x-admin-secret"];

    //!x-admin-secret is a custom header we will send from frontend
    //^  example   x-admin-secret: mySuperSecretKey

    if(!ADMIN_SECRET){
        return res.status(500).json({message:"Admin secret not configured or missing in backend"});
    }
    if(!header || header!==ADMIN_SECRET){

        //!checks if any secret key is sent from the frntend and if it matches the one stored in backend

        return res.status(401).json({message:"Unauthorized: Invalid admin secret"});
    }

    next();
    //^if everything is fine it calls next() to proceed to the next middleware or route handler*/
}




// 🔐 What This Middleware Does in Simple Words

// ✅ It checks:
// Is the admin secret set on the server?
// Did the user send the correct admin secret in headers?
// ✅ If YES → Access allowed
// ❌ If NO → Access blocked