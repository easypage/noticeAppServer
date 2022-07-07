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
  let string = "승인하였습니다.";
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
  let res = { check: false, user: {} };
  const user = new CalenderModel({
    name: body.name,
    state: body.state,
    reason: body.reason,
    privateReason: body.privateReason,
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

async function readCal() {
  try {
    const CalenderData = await CalenderModel.find({});
    const privateData = CalenderData.map((calender) => {
      if (calender.privateReason === true) {
        calender.reason = "비공개";
      }
      return calender;
    });
    return privateData;
  } catch (err) {
    console.log("데이터 로드 에러 발생");
  }
}

async function deleteCal(token) {
  console.log(token);
  if (token === undefined) {
    return "토큰이 오지 않았습니다.";
  }
  try {
    const del = await CalenderModel.deleteOne({ noticeToken: token })
      .then((result) => {
        return "성공";
      })
      .catch((err) => {
        return "실패";
      });
    return del;
  } catch (error) {
    return "실패";
  }
}

async function updateCal(body) {
  try {
    const update = await CalenderModel.updateOne(
      { noticeToken: body.token },
      { date: body.date, check: false }
    ).catch((err) => {
      return "실패";
    });
    const userData = await CalenderModel.findOne({ noticeToken: body.token });
    return userData;
  } catch (error) {
    return "실패";
  }
}

async function findTokenData(token) {
  const userData = await CalenderModel.findOne({ noticeToken: token });
}
module.exports = {
  createCal: createCal,
  check: check,
  readCal: readCal,
  deleteCal: deleteCal,
  updateCal: updateCal,
  findTokenData: findTokenData,
};
