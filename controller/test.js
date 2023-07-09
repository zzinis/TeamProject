const db = require('../models');
const Test = db.Test;
// (GET) show all review
exports.CgetTest = (req, res) => {
    Test.findAll().then((result) => {
        res.send(result);
    });
};
