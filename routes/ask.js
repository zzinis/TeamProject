const express = require('express');
const controller = require('../controller/ask');
const router = express.Router();

// GET localhost:8000/ask
router.get('/ask', controller.CgetAsk);
// POST localhost:8000/ask
router.post('/ask', controller.CpostAsk);
module.exports = router;
