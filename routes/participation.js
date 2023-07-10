const express = require('express');
const controller = require('../controller/participation');
const router = express.Router();

// POST localhost:8000/participation/test_name
router.post('/participation', controller.createParticipation);
module.exports = router;
