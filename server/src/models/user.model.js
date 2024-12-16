import {pool} from '../db/db_mysql.js';
import bcrypt from 'bcrypt';

export const verifyUser = async (username, email) => {
    const [result] = await pool.query('SELECT * FROM users WHERE username =? OR email =?', [username, email]);
    
    return result[0];
}

export const saveUser = async (username, name, email, password) => {
    
    const Passwordhashed = await bcrypt.hash(password, 10);
    
    const result = await pool.query('INSERT INTO users (username, name, email, password) VALUES (?,?,?,?)', [username, name, email, Passwordhashed]);

    return result[0];
}

export const getUserAll = async () => {
    const [result] = await pool.query('SELECT * FROM users WHERE estado = 1');
    return result;
}

export const getUserSingle = async (user_id) => {
    const [result] = await pool.query('SELECT * FROM users WHERE user_id =? AND estado = 1', [user_id]);
    return result[0];
}

export const userUpdate = async (username, name, email, password, user_id) => {

    const Passwordhashed = await bcrypt.hash(password, 10);
    
    if(password === '' || password === null || password === undefined){ 
        const result = await pool.query('UPDATE users SET username =?, name =?, email =? WHERE user_id =?', [username, name, email, user_id]);
        return result[0];
    }else{
        const result = await pool.query('UPDATE users SET username =?, name =?, email =?, password =? WHERE user_id =?', [username, name, email, Passwordhashed, user_id]);
        return result[0];
    } 
}

export const userDelete = async (user_id) => {
    const [result] = await pool.query('UPDATE users SET estado = 0 WHERE user_id =?', [user_id]);

    return result[0];
}





