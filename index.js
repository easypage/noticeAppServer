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
app.use("/kakao", kakaoRouter);
app.use("/calender", calenderRouter);

// 유저 입력
app.get("/", async function (req, res) {
  if (req === {}) {
    res.status(401).send({ message: "failed: request does not exist" });
  } else {
    res.status(200).send({
      message: "successfully",
    });
  }
  res.end();
});
// 승인하기
app.get("/check", async function (req, res) {
  User.updateOne({ noticeToken: "lt9HRkV0KHQr" }, { check: true }).then();

  const datas = await User.find({ noticeToken: "lt9HRkV0KHQr" });
  datas.map((el) => {});

  res.write("<script>alert('success')</script>");
  res.write(
    "<script>location.href = 'kakaotalk://inappbrowser/close'</script>"
  );
  res.end();
});
// test용 json
app.get("/json", async function (req, res) {
  const Users = [];

  const datas = await User.find({});

  datas.map((el) => {
    Users.push({ title: el.title, date: el.date });
  });

  res.json({ ok: true, Users });
});
