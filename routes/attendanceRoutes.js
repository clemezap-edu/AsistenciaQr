const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/attendanceController');

router.get('/api/attendance',       ctrl.dailyList);
router.get('/api/attendance/stats', ctrl.dailyStats);
router.get('/api/attendance/export',ctrl.exportExcel);

module.exports = router;
