import { pool } from "../db/db_mysql.js";

export const saveTask = async (title, description, creator) => {
  const result = await pool.query(
    "INSERT INTO tasks (title, description, creator) VALUES (?,?,?)",
    [title, description, creator]
  );

  return result[0];
};

export const getTaskAll = async (filters = {}) => {
  
  // Base de la consulta
  let query =
    "SELECT * FROM tasks INNER JOIN users ON tasks.creator = users.user_id WHERE tasks.estado = 1 AND users.estado = 1";

  // Array de parámetros para la consulta
  const params = [];

  // Filtrar por creator si está definido
  if (filters.creator !== undefined) {
    query += " AND tasks.creator = ?";
    params.push(filters.creator); // Agrega el valor de creator al array
  }

  // Filtrar por isCompleted si está definido
  if (filters.isCompleted !== undefined) {
    query += " AND tasks.isCompleted = ?";
    params.push(filters.isCompleted); // Agrega el valor de isCompleted al array
  }

  // Agregar ordenamiento
  query += " ORDER BY tasks.created_at DESC";

  // Ejecutar la consulta
  const [result] = await pool.query(query, params);

  // Mapear el resultado y devolverlo
  return result.map((task) => {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      isCompleted: task.isCompleted,
      estado: task.estado,
      user_id: task.user_id,
      name: task.name,
      created_at: task.created_at,
      updated_at: task.updated_at,
    };
  });
};


export const getTaskSingle = async (id) => {
  const [result] = await pool.query(
    "SELECT * FROM tasks WHERE id =? AND estado = 1",
    [id]
  );
  return result[0];
};

export const taskUpdate = async (title, description, isCompleted, creator, id) => {
  
  const result = await pool.query(
    "UPDATE tasks SET title =?, description =?, isCompleted=?, creator=? WHERE id =?",
    [title, description, isCompleted, creator, id]
  );

  return result[0];
};

export const taskDelete = async (id) => {
  const [result] = await pool.query("UPDATE tasks SET estado = 0 WHERE id =?", [
    id,
  ]);

  return result[0];
};
