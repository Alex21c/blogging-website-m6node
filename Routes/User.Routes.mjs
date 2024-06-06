import e from "express";
import UserController from "../Controllers/User.Controller.mjs";
import inputValidationMiddleware from "../Middlewares/UserValidation.Middleware.mjs";
const UserRoutes = e.Router();


UserRoutes.post('/sign-up', inputValidationMiddleware, UserController.signUp);
UserRoutes.post('/login', inputValidationMiddleware, UserController.login);
UserRoutes.post('/logout', UserController.logout);

export default UserRoutes;