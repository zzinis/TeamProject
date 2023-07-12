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

//PATCH (관리자 페이지에 문의 글 댓글 달기)
exports.CpatchAdminPage = async (req, res) => {
    const ask_id = req.body.ask_id;
    const manager_msg = req.body.comment;
    console.log('ask_id ', ask_id);
    console.log('manager_msg ', manager_msg);

    Ask.update({ manager_msg: manager_msg }, { where: { ask_id: ask_id } })
        .then(() => {
            // 수정된 행의 데이터를 조회
            return Ask.findByPk(ask_id);
        })
        .then((updatedAsk) => {
            res.send(updatedAsk);
        })
        .catch((error) => {
            console.error('댓글 수정에 실패했습니다:', error);
            res.status(500).json({ error: '댓글 수정에 실패했습니다.' });
        });
};
