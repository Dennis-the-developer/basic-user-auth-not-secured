import { Router } from "express";
import { signupUser, loginUser } from "../controller/userController.js";



// define route
const userRouter = Router();

// userlogin and signup
userRouter.post('/user/signup', signupUser);
userRouter.post('/user/login', loginUser);

export default userRouter;