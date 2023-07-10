const db = require('../models');
const Participation = db.Participation;
// 테스트 데이터 저장 API
exports.createParticipation = (req, res) => {
    const { user_id, test_name, result } = req.body;

    // Participation 모델을 통해 테스트 데이터 저장
    Participation.create({ user_id, test_name, result })
        .then((createdParticipation) => {
            console.log('테스트 결과 저장됨:', createdParticipation);
            res.send({ message: '테스트 결과가 저장되었습니다.' });
        })
        .catch((error) => {
            console.error('테스트 결과 저장 오류:', error);
            res.status(500).send({ message: '테스트 결과 저장 중 오류가 발생했습니다.' });
        });
};
