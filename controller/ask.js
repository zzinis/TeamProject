const db = require('../models');
const Ask = db.Ask;

//GET (문의 페이지에 user_id일치하는 문의 글 보여주기)
exports.CgetAsk = (req, res) => {
    // console.log('user_id', req.query.user_id);
    Ask.findAll({
        where: {
            user_id: req.query.user_id,
        },
        order: [['ask_id', 'DESC']],
    }).then((result) => {
        res.send(result);
    });
};

//POST (문의 페이지 문의글 등록)
exports.CpostAsk = (req, res) => {
    Ask.create({
        user_id: req.body.user_id,
        title: req.body.title,
        content: req.body.content,
    }).then((result) => {
        res.send({ result, result: true });
    });
};

//PATCH (문의 페이지 문의글 수정)
exports.CpatchAsk = (req, res) => {
    Ask.update({ content: req.body.content, title: req.body.title }, { where: { ask_id: req.body.editId } })
        .then((result) => {
            res.send(result);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send({ error: '리뷰 편집 중 오류가 발생했습니다.' });
        });
};

// (DELETE) (문의 페이지 문의글 삭제)
exports.CdelAsk = (req, res) => {
    let post_id = req.params.ask_id;
    Ask.destroy({ where: { ask_id: post_id } }).then(() => {
        res.send({ result: true, data: post_id });
    });
};
