const express = require('express');
const controller = require('../controller/ask');
const router = express.Router();

// GET localhost:8000/ask
router.get('/ask', controller.CgetAsk);
// POST localhost:8000/ask
router.post('/ask', controller.CpostAsk);
// PATCH localhost:8000/ask
router.patch('/ask', controller.CpatchAsk);
// // DELETE localhost:8000/ask/:ask_id
router.delete('/ask/:ask_id', controller.CdelAsk);

module.exports = router;
