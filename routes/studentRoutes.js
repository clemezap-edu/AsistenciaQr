const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/studentController');

// Ruta a la que apuntan los QR: /student/:id
router.get('/student/:id', ctrl.qrLanding);

module.exports = router;
