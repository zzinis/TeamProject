const db = require('../models');
const Participation = db.Participation;
const User = db.User;
const Review = db.Review;
// (GET) show all review
exports.CgetReview = (req, res) => {
    Review.findAll({
        where: req.query.selectedOption === 'All' ? {} : { test_name: req.query.selectedOption },
    }).then((result) => {
        res.send(result);
    });
};

// (POST) create a new review
exports.createReview = async (req, res) => {
    try {
        const result = await Participation.findOne({
            where: {
                user_id: req.body.userId,
                test_name: req.body.test_name,
            },
        });

        const user = await User.findOne({
            where: {
                id: req.body.userId,
            },
        });

        if (result && user) {
            const reviewData = {
                user_id: result.user_id,
                content: req.body.content,
                result: result.result,
                img: user.img,
                test_name: result.test_name,
            };

            const createdReview = await Review.create(reviewData);
            console.log('리뷰가 작성되었습니다:', createdReview);
            res.send({ result: true, data: createdReview });
        } else {
            console.error('참여하지 않은 테스트에 대한 리뷰를 작성할 수 없습니다.');
        }
    } catch (error) {
        console.error('리뷰 작성 중 오류가 발생했습니다:', error);
    }
};

// (PATCH) edit a specific review
// (PATCH) edit a specific review
exports.patchReview = (req, res) => {
    let review_id = req.params.review_id;
    let updatedContent = req.body.content; // 수정된 내용을 요청 본문(body)에서 가져옵니다.

    Review.update({ content: updatedContent }, { where: { review_id: review_id } })
        .then((result) => {
            res.send({ data: result });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send({ error: '리뷰 편집 중 오류가 발생했습니다.' });
        });
};

// (DELETE) remove a specific review
exports.deleteReview = (req, res) => {
    let review_id = req.params.review_id;
    console.log(review_id);
    Review.destroy({ where: { review_id: review_id } }).then((result) => {
        res.send({ data: result });
    });
};
