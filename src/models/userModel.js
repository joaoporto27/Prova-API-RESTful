const pool = require('../config/database');

const getUsers = async (name) => {
   if (!name) {
    const result = await pool.query("SELECT * FROM users");
    return result.rows
   } else {
    const result = await pool.query(
        "SELECT * FROM users WHERE name ILIKE $1",
        [`%${name}%`]);
    return result.rows;
   }
};

const getUser = async (id) => {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0];
};

const createUser = async (name, email, photo) => { 
    const result = await pool.query(
        "INSERT INTO users (name, email, photo) VALUES ($1, $2, $3) RETURNING *",
        [name, email, photo]
    );
    return result.rows[0];
}

const updateUser = async (id, name, email, photo) => {
    const result = await pool.query(
        "UPDATE users SET name = $1, email = $2, photo = $3 WHERE id = $4 RETURNING *",
        [name, email, photo, id]
    );
    return result.rows[0];
}

const deleteUser = async (id) => {
    const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
    if (result.rowCount === 0) {
        return { error: "Usuário não encontrado." };
    }
    return { message: "Usuário deletado com sucesso." };
};


module.exports = {getUsers, getUser, createUser, updateUser, deleteUser};