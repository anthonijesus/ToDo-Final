import {Router} from 'express';

import { loginUserController, createUserController} from '../controller/authController.js';


const routerAuth = Router();

// Login User
routerAuth.post('/login', loginUserController);
// Register User
routerAuth.post('/user', createUserController);
export default routerAuth;