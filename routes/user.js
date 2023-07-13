const express = require('express');
const controller = require('../controller/user');
const router = express.Router();
// GET localhost:8000/user/:id   (회원 정보 조회)
router.get('/user/:id', controller.getUser);
// PATCH localhost:8000/user (마이페이지 정보수정)
router.patch('/userpage', controller.CpatchUser);

// POST localhost:8000   (로그인)
router.post('/login', controller.CPostSignin);
// POST localhost:8000/signin  (회원가입)
router.post('/signin', controller.CPostUser);
// POST localhost:8000/logout  (로그아웃)
router.post('/logout', controller.Clogout);
// DELETE localhost:8000/todo/:todoId   (회원탈퇴)
router.delete('/signout', controller.CdeleteUser);

module.exports = router;
