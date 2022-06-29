const express = require("express"); // express 임포트
const router = express.Router();
const axios = require("axios");

// 카카오 토큰 > 토큰 받기 리프레쉬 토큰으로 교체
const ACCESS_TOKEN = "OXaqt675SueItio8xnPR84Dwb3cXURYxaOh84xCrCilw0QAAAYGnu_5P";
const REST_API_KEY = "56abbacaf03c462f70b076d8e5ef1438";
const REDIRECT_URI = "http://localhost:5000/token";

var dataString = `template_object={
  "object_type": "text",
  "text": "됬다!! .",
  "link": {
      "web_url": "https://developers.kakao.com"
  },
  "button_title": "바로 확인"
}`;

router.use(function (req, res, next) {
  next();
});

router.get("/", async function (req, res) {
  res.send("카카오페이지입니다.");
});

// api로 분리
router.get("/massage", async function (req, res) {
  try {
    await axios
      .post(
        "https://kapi.kakao.com/v2/api/talk/memo/default/send",
        dataString,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded charset=utf-8",
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      )
      .catch((errer) => console.log(errer));
  } catch (error) {
    console.log("에러발생");
  }
});

module.exports = router;
