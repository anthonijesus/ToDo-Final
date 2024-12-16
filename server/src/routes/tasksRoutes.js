import {Router} from 'express';
import {getTasksController, getTasksByIdController, createTaskController, updateTaskController, deleteTaskController} from '../controller/tasksController.js';

const routerTasks = Router();

// get all tasks
routerTasks.get('/task', getTasksController);

// get single task
routerTasks.get('/task/:id', getTasksByIdController);

// create task
routerTasks.post('/task', createTaskController);

// update task
routerTasks.put('/task/:id', updateTaskController);

// delete task
routerTasks.delete('/task/:id', deleteTaskController);


export default routerTasks;