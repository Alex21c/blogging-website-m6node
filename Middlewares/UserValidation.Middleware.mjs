import validator from "validator";
import CustomError from "../Utils/CustomError.mjs";

export default function inputValidationMiddleware(req, res, next){
  const {email, password} = req.body;

  // is it valid email?
    if(!email){
      next(new CustomError(400, 'email not provided!'));
      return;
    }else if(!validator.isEmail(email)){
      next(new CustomError(400, 'email is invalid!'));
      return;
    }

  // is password supplied?
    if(!password){
      next(new CustomError(400, 'password not provided!'));
      return;
    }
    
  next();
}