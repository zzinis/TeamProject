const db = require('../models');
const User = db.User;

//POST (관리자 페이지코드로 로그인)
exports.CpostAdminLogin = (req, res) => {
    console.log(req.body.code);
    User.findAll({
        where: { pw: req.body.code },
    }).then((result) => {
        res.send(result);
    });
};
