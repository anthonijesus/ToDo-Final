import { createPool } from "mysql2/promise";
import dotenv from "dotenv";
//require("dotenv").config();

dotenv.config(); // Carga las variables de entorno

//console.log(process.env)
export const pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});



 

