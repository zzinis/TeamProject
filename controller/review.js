const db = require('../models');
const Participation = db.Participation;

const Review = db.Review;
// (GET) show all review
exports.CgetReview = (req, res) => {
    Review.findAll().then((result) => {
        console.log(result);
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

        console.log('hhhhhhhhhh', result);
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

// // (PATCH) edit a specific review
// exports.CpatchReview = (req, res) => {
//   let reviewId = req.params.reviewId;
//   //여기로 데이터 받아오기
//   Review.update({ title: "수정완료" }, { where: { id: reviewId } }).then(
//     (result) => {
//       res.send({ data: result });
//     }
//   );
// };

// // (DELETE) remove a specific review
// exports.CdeleteReview = (req, res) => {
//   let reviewId = req.params.reviewId;
//   console.log(reviewId);
//   Review.destroy({ where: { id: reviewId } }).then((result) => {
//     res.send({ data: result });
//   });
// };
