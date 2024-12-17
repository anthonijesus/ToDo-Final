import {saveTask, getTaskAll, getTaskSingle, taskUpdate, taskDelete} from '../models/task.model.js';
import {getUserSingle} from '../models/user.model.js';
// create Task
export const createTaskController = async (req, res) => {
    const { title, description, creator } = req.body;

    // Validaciones básicas
    if (!title || !description || !creator) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    try {
        const getUser = await getUserSingle(creator);

        // Si el usuario no existe en la BD, devuelve error
        if(!getUser){
            return res.status(401).json({ error: 'El usuario que intenta registrar la tarea no existe' });
        }

        const result = await saveTask(title, description, creator);

        res.status(201).send({
            id: result.insertId,
            title,
            description,
            creator
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al insertar la tarea en la base de datos', details: error.message });
    }
};

// get all tasks
export const getTasksController = async (req, res) => {
    
    try {
        const { creator, isCompleted } = req.query;
        
        if(!creator){
            return res.status(400).json({ error: 'Debe especificar el id del usuario' });
        }

        // Validación de isCompleted
        if (isCompleted !== undefined && isCompleted !== 'true' && isCompleted !== 'false') {
            return res.status(400).json({ error: 'El parámetro isCompleted debe ser "true" o "false"' });
          }
          
        let result;

    if(isCompleted !== undefined){
        const completedStatus = isCompleted === 'true' ? 1 : 0;
        result = await getTaskAll({ isCompleted: completedStatus, creator });
    }else{
        result = await getTaskAll({ creator  });
        if (result.length === 0) {
            return res.status(400).json({ message: 'No hay tareas disponibles' });
        }
    }
    res.status(200).json(result);
        
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las tareas', details: error.message });
    }
};

// get single task
export const getTasksByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        
        const result = await getTaskSingle(id);

        // Si la tarea no existe en la BD, devuelve error
        if (!result) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }

        res.status(200).json(result);

    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la tarea' });
    }
};

// update task
export const updateTaskController = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, isCompleted, creator } = req.body;

        //Trae de la BD la tarea para actualizarla
        const getTask = await getTaskSingle(id);

        // Si la tarea no existe en la BD, devuelve error
        if(!getTask){
            return res.status(401).json({ error: 'La tarea no existe' });
        }
        // Usar valores actuales si no se envían nuevos
        const updatedTitle = title ?? getTask.title;
        const updatedDescription = description ?? getTask.description;
        const updatedIsCompleted = isCompleted ?? getTask.isCompleted;
        const updatedCreator = creator?? getTask.creator;
       
        // Actualizar la tarea
        await taskUpdate(updatedTitle, updatedDescription, updatedIsCompleted, updatedCreator, id);

        const user = await getUserSingle(updatedCreator); 
        const creatorName = user ? user.name : "Usuario desconocido";

            res.status(201).send({
            id: parseInt(id), 
            title: updatedTitle, 
            description: updatedDescription,
            isCompleted: updatedIsCompleted, 
            creator: updatedCreator, 
            name: creatorName,
        });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error al actualizar la tareas' });
    }
};


// // delete task
export const deleteTaskController = async (req, res) => {
    try {
        const { id } = req.params;

        // Verificar que la tarea existe
        const getTask = await getTaskSingle(id);

        if (!getTask) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }

        // Eliminar la tarea
        await taskDelete(getTask.id);
        
        res.status(200).json({ message: 'Tarea eliminada correctamente' });
        
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la tarea' });
    }
};


