const db = require('../config/database');

exports.markAttendance = async (studentId, date) => {
	const sql = `INSERT IGNORE INTO attendance (student_id, entry_date)
              VALUES (?, CURDATE())`;
	await db.execute(sql, [studentId]);
};

exports.getDailyList = async date => {
  const [rows] = await db.execute(`
    SELECT s.name, s.id AS studentId,
           CASE WHEN a.student_id IS NULL THEN 0 ELSE 1 END AS present
    FROM students s
    LEFT JOIN attendance a
      ON s.id = a.student_id AND a.entry_date = ?
    ORDER BY s.name;
  `, [date]);
  return rows;
};
