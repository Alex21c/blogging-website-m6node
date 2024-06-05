import e from "express";
import morgan from "morgan";
import UserRoutes from "./Routes/User.Routes.mjs";
import PostRoutes from "./Routes/Post.Routes.mjs";
import 'dotenv/config';
import passport from "passport";

import AuthJwtMiddleware from "./Middlewares/AuthJwtMiddleware.mjs";

// creating an express server
const app = e();
const PORT = 4000;

// Request Loggin
app.use(morgan('dev'));


// Auth
passport.use(AuthJwtMiddleware);



// Routes
app.use('/user', UserRoutes);
app.use('/post', passport.authenticate('jwt', { session: false }), PostRoutes);

// launching server
app.listen(PORT, ()=>{
  console.log(`ExpressJS server is up and running at port: ${PORT}`);
})