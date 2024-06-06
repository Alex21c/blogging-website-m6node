import CustomError from "../Utils/CustomError.mjs";

export default function postInputValidationMiddleware(req, res, next){
  const {title, keywords} = req.body;

  // is title provided?
    if(!title){
      next(new CustomError(400, 'title not provided!'));
      return;
    }

  // are keywords supplied?
    if(!keywords){
      next(new CustomError(400, 'keywords not provided!'));
      return;
    }
    if(keywords.length === 0 ){
      next(new CustomError(400, 'keywords not provided (empty array)!'));
      return;
    }
    
  next();
}