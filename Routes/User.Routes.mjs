import e from "express";
import UserController from "../Controllers/User.Controller.mjs";

const UserRoutes = e.Router();


UserRoutes.post('/sign-up', UserController.signUp);
UserRoutes.post('/login', UserController.login);
UserRoutes.post('/logout', UserController.logout);

export default UserRoutes;