import express from 'express';
import cors from 'cors';
import routerAuth from './routes/authRoutes.js';
import routerTasks from './routes/tasksRoutes.js';
import routerUsers from './routes/usersRoutes.js';
import { verifyToken } from './middlewares/auth.middlewares.js';


const app = express();

// Configurar CORS para permitir solicitudes desde el frontend
app.use(cors());

// Middlewares
app.use(express.json());

app.use('/api', routerAuth);


app.use(verifyToken); // Verifica el token de autenticación

// Endpoint para usuarios
app.use('/api', routerUsers);

// Endpoints de las tasks
app.use('/api', routerTasks);

app.use((req, res, next) => {
    res.status(400).json({ message: 'endpoint not found' });
});


    
app.listen(process.env.API_PORT);
console.log(`Server running on port`, process.env.API_PORT)