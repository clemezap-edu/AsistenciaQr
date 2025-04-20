const fs     = require('fs');
const path   = require('path');
const excel  = require('exceljs');
const model  = require('../models/attendanceModel');

exports.dailyList = async (req, res) => {
  const { date } = req.query;
  const data = await model.getDailyList(date);
  res.json(data);
};

exports.dailyStats = async (req, res) => {
  const list = await model.getDailyList(req.query.date);
  const total   = list.length;
  const present = list.filter(r => r.present).length;
  const absent  = total - present;
  const percent = total ? Math.round(present/total*100) : 0;
  res.json({ total, present, absent, percent });
};

exports.exportExcel = async (req, res) => {
  const data = await model.getDailyList(req.query.date);
  const wb   = new excel.Workbook();
  const ws   = wb.addWorksheet('Asistencia');

  ws.columns = [
    { header: 'Nombre',      key: 'name',      width: 32 },
    { header: 'Matrícula',   key: 'studentId', width: 15 },
    { header: 'Asistencia',  key: 'present',   width: 12 }
  ];

  data.forEach(r => ws.addRow({
    ...r,
    present: r.present ? '✓' : '✗'
  }));

  const dir  = path.join(__dirname, '..', 'exports');
  if(!fs.existsSync(dir)) fs.mkdirSync(dir);
  const file = path.join(dir, `Asistencia_${req.query.date}.xlsx`);
  await wb.xlsx.writeFile(file);
  res.download(file, () => fs.unlinkSync(file));
};
