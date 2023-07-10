const db = require('../models');
const Participation = db.Participation;

const Review = db.Review;
// (GET) show all review
exports.CgetReview = (req, res) => {
    Review.findAll().then((result) => {
        // console.log(result);
        res.send(result);
    });
};

// (POST) create a new review
exports.createReview = async (req, res) => {
    try {
        const result = await Participation.findOne({
            where: {
                user_id: req.params.user_id,
                test_id: req.params.test_id,
            },
        });

        if (result) {
            const reviewData = {
                user_id: result.user_id,
                content: req.body.content,
                result: result.result,
            };

            const createdReview = await Review.create(reviewData);
            console.log('리뷰가 작성되었습니다:', createdReview);
        } else {
            console.error('참여하지 않은 테스트에 대한 리뷰는 작성할 수 없습니다.');
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
