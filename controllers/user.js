const db = require('../models');
const User = db.User;
const bcrypt = require('bcrypt');
const saltRounds = 10;

// 로그인
exports.CPostSignin = (req, res) => {
    const { id, pw } = req.body;

    User.findOne({ where: { id: id } })
        .then((user) => {
            if (!user) {
                console.log('로그인 실패: 사용자 정보가 일치하지 않습니다.');
                res.status(401).json({ message: '로그인에 실패했습니다.' });
                return;
            }

            // 비밀번호 일치 여부를 확인
            bcrypt.compare(pw, user.pw, (err, result) => {
                if (err) {
                    console.error('비밀번호 비교 실패:', err);
                    res.status(500).json({ message: '로그인에 실패했습니다.' });
                    return;
                }

                if (result) {
                    // 로그인 성공 시 세션에 사용자 정보 저장
                    req.session.user = user;

                    // 쿠키 생성
                    res.cookie('myCookie', 'cookie value', {
                        maxAge: 3600000, // 쿠키 유효 기간 (예: 1시간)
                        httpOnly: true, // 클라이언트에서 쿠키에 접근하지 못하도록 설정
                    });

                    console.log('로그인 성공');
                    res.status(200).json({ message: '로그인에 성공했습니다.' });
                } else {
                    console.log('로그인 실패: 비밀번호가 일치하지 않습니다.');
                    res.status(401).json({ message: '로그인에 실패했습니다.' });
                }
            });
        })
        .catch((error) => {
            console.error('로그인 실패:', error);
            res.status(500).json({ message: '로그인에 실패했습니다.' });
        });
};

// 로그아웃 요청을 처리하는 함수
exports.Clogout = (req, res) => {
    // 쿠키 삭제
    res.clearCookie('myCookie');
    // 세션 삭제
    req.session.destroy((err) => {
        if (err) {
            console.error('세션 삭제 실패:', err);

            res.send({ message: '로그아웃에 실패했습니다.' });
        } else {
            // 로그아웃 성공 메시지를 응답으로 전송
            res.send({ message: '로그아웃 되셨습니다.' });
        }
    });
};

// 공백이 있나 없나 체크
function checkSpace(str) {
    if (str.search(/\s/) != -1) {
        return false;
    } else {
        return true;
    }
}

// 특수 문자가 있나 없나 체크
function checkSpecial(str) {
    var special_pattern = /[`~!@#$%^&*|\\\'\";:\/?]/gi;

    if (special_pattern.test(str) == true) {
        return true;
    } else {
        return false;
    }
}

// 비밀번호 패턴 체크 (8자 이상, 문자, 숫자, 특수문자 포함여부 체크)
function checkPasswordPattern(str) {
    var pattern1 = /[0-9]/; // 숫자
    var pattern2 = /[a-zA-Z]/; // 문자
    var pattern3 = /[~!@#$%^&*()_+|<>?:{}]/; // 특수문자

    if (!pattern1.test(str) || !pattern2.test(str) || !pattern3.test(str) || str.length < 8) {
        return false;
    } else {
        return true;
    }
}

// 회원가입
exports.CPostUser = async (req, res) => {
    let id, pw, name, email;
    //데이터 유효성 검사
    if (
        checkSpace(req.body.id) &&
        checkSpace(req.body.pw) &&
        checkSpecial(req.body.pw) &&
        checkPasswordPattern(req.body.pw)
    ) {
        id = req.body.id;
    } else {
        //잘못된 형식의 id, pw가 입력 됐을 경우
        res.status(409).json({ msg: 'id 또는 pw의 형식이 잘못되었습니다', result: false });
        return false;
    }
    //DB에 저장되어있는 id가져오기
    let result;
    await User.findAll().then((queryResult) => {
        result = queryResult;
    });

    //아이디 중복 확인
    const duplicatedId = result.find((user) => user.id === id);
    if (duplicatedId) {
        await res.status(409).json({ msg: '이미 사용 중인 아이디입니다.', result: false });
        return false;
    } else {
        email = req.body.email; //아이디 중복확인 성공 시 이메일 중복확인을 위한 변수 할당
    }

    //이메일 중복 확인, 암호화, db추가
    const duplicatedEmail = result.find((user) => user.email === email);
    if (duplicatedEmail) {
        await res.status(409).json({ msg: '이미 회원가입 하셨습니다', result: false });
        return false;
    } else {
        pw = req.body.pw;
        name = req.body.name;

        //비밀번호 암호화
        const hashedPassword = bcrypt.hashSync(pw, 10).substring(0, 255);
        await User.create({
            id: id,
            pw: hashedPassword,
            name: name,
            email: email,
        }).then((result) => {
            res.status(200).json({ message: '회원가입에 성공했습니다.', result: true });
        });
    }
};

// (DELETE) 회원탈퇴
exports.CdeleteUser = (req, res) => {
    const userPw = req.params.todoId;
    Todo.destroy({ where: { id: todoId } }).then((result) => {
        res.send({ data: result });
    });
};
