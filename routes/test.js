const express = require('express');
const controller = require('../controller/test');
const router = express.Router();

// GET localhost:8000/test
router.get('/test', controller.CgetTest);

module.exports = router;
