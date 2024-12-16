import {verifyUser, getUserAll, getUserSingle, userUpdate, userDelete} from '../models/user.model.js';

import dotenv from "dotenv";
dotenv.config(); // Carga las variables de entorno



// get all user
export const getUsersController = async (req, res) => {
    try {
        const result = await getUserAll();
         if (result.length === 0) {
             return res.status(404).json({ message: 'No hay usuarios disponibles' });
         }
         
        res.status(200).json(result.map(row => ({
            user_id: row.user_id,
            username: row.username,
            email: row.email,
            name: row.name,
            estado: row.estado,
            created_at: row.created_at,
            updated_at: row.updated_at        
        })));
    } catch (error) {
        //console.error('Error:', error.message);
        res.status(500).json({ error: 'Error al obtener los usuarios', details: error.message });
    }
};

// get single user
export const getUserByIdController = async (req, res) => {
    try {
        const { user_id } = req.params;
        const result = await getUserSingle(user_id);

        // Si el usuario no existe en la BD, devuelve error
        if (!result) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.status(200).json({
            user_id: result.user_id,
            username: result.username,
            email: result.email,
            name: result.name,
            estado: result.estado,
            created_at: result.created_at,
            updated_at: result.updated_at           
        });

    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
};

// update user
export const updateUserController = async (req, res) => {
    try {
        const { user_id } = req.params;
        const { username, name, email, password } = req.body;

        //Trae de la BD el usuario para actualizarlo
        const getUser = await getUserSingle(user_id);

        // Si el usuario no existe en la BD, devuelve error
        if(!getUser){
            return res.status(401).json({ error: 'El usuario no existe' });
        }
        // Usar valores actuales si no se envían nuevos
        const updatedUsername = username ?? getUser.username;
        const updatedName = name ?? getUser.name;
        const updatedEmail = email ?? getUser.email;
        const updatedPassword = password ?? getUser.password;
        
        // Verificar si el nombre de usuario o el email ya existe
        if(username || email){
            const existingUser = await verifyUser(username, email);
            if(existingUser){
                if (user_id != existingUser.user_id) {
                    return res.status(400).json({ error: 'El username o email ya estan en uso' });
                }
            }
        }
        
        // Actualizar la tarea
        await userUpdate(updatedUsername, updatedName, updatedEmail, updatedPassword, Number(user_id));

        res.status(201).send({
            message: 'Usuario actualizado correctamente',
            user_id: parseInt(user_id),
            username: updatedUsername,
            name: updatedName,
            email : updatedEmail,
        });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Error al actualizar Usuario' });
    }
};


// // delete user
export const deleteUserController = async (req, res) => {
    try {
        const { user_id } = req.params;

        // Verificar que el usuario existe
        const getUser = await getUserSingle(user_id);

        if (!getUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Eliminar la tarea
        await userDelete(getUser.user_id);
        res.status(200).json({ message: 'Usuario eliminado correctamente' });
        
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
};

//Login user




