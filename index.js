// index.js
const express = require("express"); // express 임포트
const app = express(); // app생성
const PORT = process.env.PORT || 5000;
const MONGOURL =
  process.env.MONGOURL ||
  "mongodb+srv://minib:root@cluster0.y8vrqhs.mongodb.net/?retryWrites=true&w=majority";
const cors = require("cors");
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

const kakaoRouter = require("./router/kakao");

// 몽구스 연결
const mongoose = require("mongoose");
const User = require("./Entity/userModel");
var randomstring = require("randomstring");

app.listen(PORT);

mongoose
  .connect(MONGOURL, {
    // useNewUrlPaser: true
    // useUnifiedTofology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then(() => console.log("MongoDB conected"))
  .catch((err) => {
    console.log(err);
  });

app.use("/kakao", kakaoRouter);
// 유저 입력
app.get("/", async function (req, res) {
  // const user = new User({
  //   name: "kim",
  //   state: "지각",
  //   reason: "프로젝트 서버 배포!",
  //   private: false,
  //   title: "3",
  //   date: "2022-06-25",
  //   noticeToken: randomstring.generate(12),
  //   check: false,
  // });
  // await user
  //   .save()
  //   .then((result) => {
  //     console.log(result);
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //   });

  res.send("hello world!!");
});

app.get("/check", async function (req, res) {
  User.updateOne({ noticeToken: "lt9HRkV0KHQr" }, { check: true }).then();

  const datas = await User.find({ noticeToken: "lt9HRkV0KHQr" });
  datas.map((el) => {
    console.log(el);
  });

  res.write("<script>alert('success')</script>");

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
