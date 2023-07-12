const express = require('express');
const controller = require('../controller/adminPage');
const router = express.Router();

//관리자 페이지
// GET localhost:8000/adminpage
router.get('/adminpage', controller.CgetAdminPage);
// POST localhost:8000/adminpage
router.patch('/adminpage', controller.CpatchAdminPage);

// DELETE localhost:8000/adminpage
router.delete('/adminpage', controller.CdelAdminPage);
module.exports = router;
