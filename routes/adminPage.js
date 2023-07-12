const express = require('express');
const controller = require('../controller/adminPage');
const router = express.Router();

//관리자 페이지
// GET localhost:8000/admin
router.get('/adminpage', controller.CgetAdminPage);
module.exports = router;
