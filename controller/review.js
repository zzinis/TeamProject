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
                user_id: req.params.user_id,
                test_id: req.params.test_id,
            },
        });
        const user = await User.findOne({
            where: {
                id: req.params.user_id,
            },
        });

        if ((result, user)) {
            const reviewData = {
                //participation에 있는 user_id를 가져와서 넣어주기
                user_id: result.user_id,
                //axios 보낸거 받아서 content에 넣어주기
                content: req.body.content,
                //participation에 있는 result를 넣어주기
                result: result.result,
                //user에 있는 img를 넣어주기
                img: user.img,
                //participation에 있는 test_name을 넣어주기
                test_name: result.test_name,
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
