const db = require('../models');
const Test = db.Test;
// (GET) show all review
exports.CgetTest = (req, res) => {
    Test.findAll().then((result) => {
        console.log('test테이블 확인용입니당', result);
        res.send(result);
    });
};
