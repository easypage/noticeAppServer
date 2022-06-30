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
  datas.map((el) => {
    if (el.check === true) {
      return "이미 처리된 요청입니다.";
    }
  });
  CalenderModel.updateOne({ noticeToken: token }, { check: true }).then();
  return "성공하였습니다.";
}
async function createCal(name, state, reason, private, title, date) {
  const user = new CalenderModel({
    name: name,
    state: state,
    reason: reason,
    private: private,
    title: title,
    date: date,
    noticeToken: randomstring.generate(12),
    check: false,
  });
  await user
    .save()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.error(err);
    });
}

module.exports = { createCal: createCal, check: check };
