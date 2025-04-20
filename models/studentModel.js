const db = require('../config/database');

exports.getAll = async () => {
  const [rows] = await db.execute('SELECT id, name FROM students ORDER BY name');
  return rows;
};

exports.add = async (id, name) => {
  const sql = 'INSERT IGNORE INTO students (id, name) VALUES (?, ?)';
  const [{ affectedRows }] = await db.execute(sql, [id, name]);
  return affectedRows === 1;
};

exports.remove = async id => {
  const [{ affectedRows }] = await db.execute('DELETE FROM students WHERE id = ?', [id]);
  return affectedRows === 1;
};

exports.exists = async id => {
  const [[row]] = await db.execute('SELECT 1 FROM students WHERE id = ? LIMIT 1', [id]);
  return !!row;
};
