import {verifyUser, saveUser} from '../models/user.model.js';
import bcrypt from 'bcrypt';
import {generateToken} from '../db/jwt.js';



export const loginUserController = async (req, res) => {
    const { username, password } = req.body;

    // Validaciones básicas
    if (!username || !password) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }
    
    try {
        // Verificar si el usuario existe
        const user = await verifyUser(username, null);
        
        if (!user) {
            return res.status(401).json({ message: 'Usuario No Encontrado' });
        }
        
        // Verificar contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password); 
        
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }
        
        // Generar un token JWT
        const token = generateToken(user.id, user.username);
        
        res.status(200).json({
            user_id: user.user_id,
            username: user.username,
            email: user.email,
            name: user.name,
            token
        });

    } catch (error) {
        return res.status(401).json({ error: 'Credenciales inválida' });
    }
}

// create User
export const createUserController = async (req, res) => {
    const { username, name, email, password } = req.body;

    // Validaciones básicas
    if (!username || !name || !password ||!email) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    if (typeof username !== 'string' || typeof name !== 'string') {
        return res.status(400).json({ error: 'Los campos "username", "name" deben ser cadenas de texto' });
    }

    try {
        // Verificar si el nombre de usuario o el email ya existe
        const existingUser = await verifyUser(username, email);
        
        if (existingUser) {
            return res.status(400).json({ error: 'El nombre de usuario o email ya existen' });
        }

         // Insertar el usuario en la base de datos
        const result = await saveUser(username, name, email, password);
        
        //Generar un token JWT
        const token = generateToken(result.insertId, username);

        res.status(201).send({
            user_id: result.insertId,
            username,
            name,
            email,
            token
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al insertar el usuario en la base de datos', details: error.message });
    }
};