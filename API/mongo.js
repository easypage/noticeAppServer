// mongo
const MONGOURL =
  process.env.MONGOURL ||
  "mongodb+srv://minib:root@cluster0.y8vrqhs.mongodb.net/?retryWrites=true&w=majority";

const mongoose = require("mongoose");

const CalenderModel = require("../Entity/calenderModel");
var randomstring = require("randomstring");

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

// // 승인하기
// app.get("/check", async function (req, res) {

// });

async function check(token) {
  const datas = await CalenderModel.find({ noticeToken: token });
  let string = "성공하였습니다.";
  datas.map((el) => {
    console.log(el.check);
    if (el.check === true) {
      string = "이미 처리된 요청입니다.";
    }
  });

  CalenderModel.updateOne({ noticeToken: token }, { check: true }).then();
  return string;
}
async function createCal(body) {
  console.log(body);

  let res = { check: false, user: {} };
  const user = new CalenderModel({
    name: body.name,
    state: body.state,
    reason: body.reason,
    privateReason: body.privateReason,
    title: body.title,
    date: body.date,
    noticeToken: randomstring.generate(12),
    check: false,
  });

  await user
    .save()
    .then((result) => {
      res.user = result;
      res.check = true;
    })
    .catch((err) => {
      console.log("실패했습니다.");
    });

  return res;
}

module.exports = { createCal: createCal, check: check };
