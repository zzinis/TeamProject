const db = require('../models/Review');
const Participation = require('../models/Participation');

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
    console.log('req.params.user_id', req.body.user_id);
    try {
        const result = await Participation.findOne({
            where: {
                user_id: req.body.user_id,
                test_id: req.body.test_id,
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
            console.log('참가 테이블에서 해당 사용자 및 테스트에 대한 결과를 찾을 수 없습니다.');
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
