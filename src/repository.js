const { Pool } = require('pg');
const { nanoid } = require('nanoid');

const pool = new Pool();

const validateEmail = async (email) => {
  const result = await pool.query('SELECT id FROM users WHERE email = $1', [
    email,
  ]);

  if (result.rowCount === 0) {
    return true;
  }

  return false;
};

const createUser = async (user) => {
  const id = nanoid();
  const result = await pool.query(
    'INSERT INTO users(id, name, email, password) VALUES($1, $2, $3, $4) RETURNING id',
    [id, user.name, user.email, user.password]
  );

  if (result.rows.length === 0) {
    return '';
  }

  return result.rows[0].id;
};

module.exports = { validateEmail, createUser };
