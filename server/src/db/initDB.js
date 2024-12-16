import { pool } from "./db_mysql.js";

const createTables = async () => {
    try {
        // Crear la tabla `users`
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                user_id INT AUTO_INCREMENT PRIMARY KEY, 
                username VARCHAR(255) UNIQUE NOT NULL, 
                name VARCHAR(255) NOT NULL, 
                email VARCHAR(255) UNIQUE NOT NULL, 
                password VARCHAR(255) NOT NULL,
                estado BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
        `);

        // Crear la tabla `tasks`
        await pool.query(`
            CREATE TABLE IF NOT EXISTS tasks (  
                id INT AUTO_INCREMENT PRIMARY KEY, 
                title VARCHAR(255) NOT NULL, 
                description TEXT NOT NULL, 
                isCompleted BOOLEAN DEFAULT FALSE, 
                estado BOOLEAN DEFAULT TRUE, 
                creator INT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (creator) REFERENCES users(id) ON DELETE CASCADE
            );
        `);

        console.log("Tablas creadas exitosamente.");
    } catch (error) {
        console.error("Error al crear las tablas:", error);
    }
}

createTables();