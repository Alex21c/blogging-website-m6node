import e from "express";
import morgan from "morgan";
import UserRoutes from "./Routes/User.Routes.mjs";
import PostRoutes from "./Routes/Post.Routes.mjs";
import 'dotenv/config';
import mongoose from "mongoose";
import passport from "./PassportJS/passport-config.mjs";

try {
  
  // creating an express server
    const app = e();
    const PORT = 4000;

  // Request logging
    app.use(morgan('dev'));
  
  // fetching requests from body of req
    app.use(e.json());

  // Making connection with database   
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
    .then(()=>{
      console.log('Connection Established with Database!');
    })
    .catch((error)=>{
      throw new Error('Unable to connect to DB, Exiting...');
    });

  // linking passport
    app.use(passport.initialize());
 
  
  
  // Routes
    app.use('/user', UserRoutes);
    app.use('/post', PostRoutes);
  // error handling middleware
    app.use((err,req,res,next)=>{
      const customMessage = err.customMessage ? err.customMessage : "INTERNAL SERVER ERROR: " + err.message;
      res.status(err.statusCode || 500).json({success: false, message: customMessage});
    });

  // launching server
    app.listen(PORT, ()=>{
      console.log(`ExpressJS server is up and running at port: ${PORT}`);
    })
  
} catch (error) {
  console.log('ERROR: ', error.message );
}


