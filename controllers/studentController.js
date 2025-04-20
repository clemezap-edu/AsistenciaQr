const attendance = require('../models/attendanceModel');
const path       = require('path');

exports.qrLanding = async (req, res) => {
  const { id } = req.params;
  const today   = new Date().toISOString().slice(0,10); // YYYY-MM-DD
  try{
    await attendance.markAttendance(id, today);
  } catch(err){
    console.error(err);
  }
  res.sendFile('confirm.html', { root: path.join(__dirname, '..', 'views') });
};
