// index.js
// 기본 모듈및 설정
const express = require("express"); // express 임포트
const app = express(); // app생성
const PORT = process.env.PORT || 5000;
const cors = require("cors");

app.listen(PORT);

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// 이미지
app.use(express.static("public"));
// 라우터
const kakaoRouter = require("./router/kakao");
const calenderRouter = require("./router/calendar");

// router
app.use("/kakao", kakaoRouter.router);
app.use("/calender", calenderRouter);

// 유저 입력
app.get("/", function (req, res) {
  res.send("hello");
  res.end();
});
