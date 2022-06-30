const express = require("express"); // express 임포트
const router = express.Router();
const axios = require("axios");

// 카카오 토큰 > 토큰 받기 리프레쉬 토큰으로 교체
const ACCESS_TOKEN = "F35oMAbAFT7rPFnOP5-UGgF78jOuZsMQJaQ-QJolCilwnwAAAYGymMzG";

const imgLateList = ["https://attendancechecknotice.herokuapp.com/late.png"];

function getTemplate(massage) {
  const temp = {
    object_type: "feed",
    content: {
      title: "캘린더 테스트",
      description: massage,
      image_url: "https://attendancechecknotice.herokuapp.com/test.png",
      image_width: 640,
      image_height: 640,
      link: {
        web_url:
          "https://attendancechecknotice.herokuapp.com/calender/check?token=psbjuITVOHsh",
        mobile_web_url:
          "https://attendancechecknotice.herokuapp.com/calender/check?token=psbjuITVOHsh",
        android_execution_params: "contentId=100",

        ios_execution_params: "contentId=100",
      },
    },
    item_content: {
      items: [
        {
          item: "이유",
          item_op:
            "유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유유",
        },
      ],
    },
    social: {
      like_count: 999,
    },
    buttons: [
      {
        title: "승인하기",
        link: {
          web_url: `https://attendancechecknotice.herokuapp.com/calender/check?token=psbjuITVOHsh`,
          mobile_web_url:
            "https://attendancechecknotice.herokuapp.com/calender/check?token=psbjuITVOHsh",
        },
      },
    ],
  };

  return "template_object=" + JSON.stringify(temp);
}

router.use(function (req, res, next) {
  next();
});

router.get("/", async function (req, res) {
  res.send("카카오페이지입니다.");
});

// api로 분리
router.get("/massage", async function (req, res) {
  console.log("메세지실행됨");
  const template = getTemplate("안녕하세요");

  try {
    await axios
      .post("https://kapi.kakao.com/v2/api/talk/memo/default/send", template, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded charset=utf-8",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      })
      .catch((errer) => console.log(errer));
  } catch (error) {
    console.log("에러발생");
  }
  res.end();
});

module.exports = router;
