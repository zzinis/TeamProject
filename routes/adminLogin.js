const express = require('express');
const controller = require('../controller/adminLogin');
const router = express.Router();

// POST localhost:8000/adminLogin
router.post('/adminLogin', controller.CpostAdminLogin);

module.exports = router;
