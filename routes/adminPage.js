const express = require('express');
const controller = require('../controller/adminPage');
const router = express.Router();

//관리자 페이지
// GET localhost:8000/adminpage
router.get('/adminpage', controller.CgetAdminPage);
// POST localhost:8000/adminpage
router.post('/adminpage', controller.CpatchAdminPage);
module.exports = router;
