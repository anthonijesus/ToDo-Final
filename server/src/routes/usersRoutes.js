import {Router} from 'express';
import { getUsersController, getUserByIdController, updateUserController, deleteUserController} from '../controller/usersController.js';


const routerUsers = Router();

//get all Users
routerUsers.get('/user', getUsersController);

// get single User
routerUsers.get('/user/:user_id', getUserByIdController);

// update User
routerUsers.put('/user/:user_id', updateUserController);

// // delete User
routerUsers.delete('/user/:user_id', deleteUserController);


export default routerUsers;