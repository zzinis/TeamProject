const db = require('../models');
const User = db.User;
const bcrypt = require('bcrypt');

// POST (관리자 페이지코드로 로그인)
exports.CpostAdminLogin = (req, res) => {
    console.log(req.body, '확인');
    User.findAll({
        where: { id: 'MANAGER' },
    }).then((manager) => {
        if (manager.length > 0) {
            console.log('매니져', manager);
            const storedPassword = manager[0].dataValues.pw;
            console.log(storedPassword, '비번');
            bcrypt.compare(req.body.code, storedPassword, (err, result) => {
                if (err) {
                    console.error(err);
                    res.send(false);
                } else {
                    console.log(result, '확인');
                    res.send(result); //true 할당된다
                }
            });
        } else {
            res.send(false);
        }
    });
};
