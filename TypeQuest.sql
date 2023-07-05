USE TypeQuest;

-- 사용자 테이블 생성
DROP TABLE IF EXISTS user;
CREATE TABLE user (
  id VARCHAR(10) NOT NULL PRIMARY KEY,
  pw VARCHAR(200) NOT NULL,
  name VARCHAR(10) NOT NULL,
  email VARCHAR(50) NOT NULL
);

-- 사용자 데이터 삽입
INSERT INTO user (id, pw, name, email)
VALUES
  ('testuser1', 'password1', '홍길동', 'gildong00@naver.com'),
  ('testuser2', 'password2', '김철수', 'sooo@gmail.com'),
  ('testuser3', 'password3', '박영희', 'yhyh@naver.com');

-- 테스트 테이블 생성
DROP TABLE IF EXISTS test;
CREATE TABLE test (
  test_id INT AUTO_INCREMENT PRIMARY KEY,
  test_name VARCHAR(30) NOT NULL
);

-- 테스트 데이터 삽입
INSERT INTO test (test_name) VALUES ('유튜버Test');
INSERT INTO test (test_name) VALUES ('여행Test');
INSERT INTO test (test_name) VALUES ('ㅇㅇTest 3');

-- 참가 테이블 생성
DROP TABLE IF EXISTS participation;
CREATE TABLE participation (
  participation_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id VARCHAR(10) NOT NULL,
  test_id INT NOT NULL,
  participation_date DATE NOT NULL,
  result VARCHAR(30),
  FOREIGN KEY (user_id) REFERENCES user(id),
  FOREIGN KEY (test_id) REFERENCES test(test_id)
);

-- 참가 데이터 삽입
INSERT INTO participation (user_id, test_id, participation_date, result)
VALUES
  ('testuser1', 1, '2023-07-01', '개그유튜버'),
  ('testuser1', 1, '2023-07-02', '동물 유튜'),
  ('testuser3', 1, '2023-07-03', '요리유튜버'),
  ('testuser2', 2, '2023-07-04', '강릉'),
  ('testuser1', 2, '2023-07-04', '여수');

-- 타입 테이블 생성
DROP TABLE IF EXISTS type;
CREATE TABLE type (
  type_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  img INT NOT NULL,
  content TEXT NOT NULL
);

-- 리뷰 테이블 생성
DROP TABLE IF EXISTS review;
CREATE TABLE review (
  review_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id VARCHAR(10),
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES user(id)
  
);
ALTER TABLE review ADD COLUMN result VARCHAR(30);

-- 리뷰 데이터에 참가 테이블의 result 값 추가
INSERT INTO review (user_id, content)
SELECT r.user_id, r.result
FROM participation p
JOIN review r ON p.user_id = r.user_id;
