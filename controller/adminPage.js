const db = require('../models');
const Ask = db.Ask;

//GET (관리자 페이지에 문의 글 보여주기)
exports.CgetAdminPage = (req, res) => {
    Ask.findAll({
        order: [['ask_id', 'DESC']],
    }).then((result) => {
        res.send(result);
    });
};
