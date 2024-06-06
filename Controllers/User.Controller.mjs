import UserModel from "../Models/User.Model.mjs";
import CustomError from "../Utils/CustomError.mjs";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
/**
 * Generates a new JWT token.
 *
 * @param {Object} doc - Contains user information as contained in the users collection.
 * @param {string} doc._id - The user ID.
 * @returns {string} - The generated JWT token prefixed with "Bearer ".
 */
function genNewJwtToken(doc=null){
  try {
    if(doc === null){
      throw new Error('empty doc supplied to genNewJwtToken()');
    }
    return "Bearer " + jwt.sign({
      _id: doc._id
    }, process.env.JWT_SECRET_KEY, {expiresIn: process.env.USER_SESSION_EXPIRES_AFTER});
  } catch (error) {
    throw error;
  }
}

async function getHashedPassword(passwordPlainText=null){
  try {
    if(passwordPlainText === null){
      throw new Error('empty password provided for getHashedPassword');
    }
    const saltRounds = 10;
    return await bcrypt.hash(passwordPlainText, saltRounds);
    
  } catch (error) {
    throw error; 
  }
}

const signUp = async (req, res, next)=>{
  try {
    
    // Step #1: check if email already exist in DB, if so, throw an error indicating user alreay exist in DB  
      const {email} = req.body;
      const queryResponse = await UserModel.findOne({email: email});
      if(queryResponse){
        // throw error
          next(new CustomError(400, 'User already exist!'))
          return;
      }

    // Step #2.1 Hash the password using bcrypt      
      req.body.password = await getHashedPassword(req.body.password);
      

    // Step #2.2: insert data into db
      const doc = new UserModel(req.body);
      doc.save();

    // Step #3: Create a JWT token having userID inside payload
      const Authorization = genNewJwtToken(doc);

    // Step #4: return a success message along with JWT token
      res.status(201).json({
        success: true,
        message: "Account created successfully !",
        Authorization
      })
  } catch (error) {
    next(new CustomError(500, error.message));
  }
};


const login = async (req, res, next)=>{
  try {
    
    // Step #1: find matching email, hashed password inside DB, if doesn't exist throw error indicating wrong email or password            
      const doc = await UserModel.findOne({email: req.body.email});
      if(doc === null){
        next(new CustomError(400, 'Invalid Credentials !'));
        return;
      }

    // Step #2: IS password valid?

      if(! await bcrypt.compare(req.body.password, doc.password)){
        next(new CustomError(400, 'Invalid Credentials!'));
        return;
      }

    // Step #3: if user is valid, then generate JWT token having userID inside payload
      const Authorization = genNewJwtToken(doc);
      
    // Step #4: return a success message along with JWT token
      res.json({
        success: true,
        Authorization
      })
  } catch (error) {
    next(new CustomError(500, error.message))
  }



};

const logout = (req, res, next)=>{
  // Delete the token from local storage
  res.json({
    success: true,
    message: "req received logout"
  })
};

const UserController = {
  signUp,
  login,
  logout
};


export default UserController;