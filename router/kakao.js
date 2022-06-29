const express = require("express"); // express 임포트
const router = express.Router();
const axios = require("axios");

// 카카오 토큰 > 토큰 받기 리프레쉬 토큰으로 교체
const ACCESS_TOKEN = "MvRt2c9KY-FMpt-RyEfd5rielsv6DHCnaft7UlL5Cj11GwAAAYGt7N06";
const REST_API_KEY = "56abbacaf03c462f70b076d8e5ef1438";
const REDIRECT_URI = "http://localhost:5000/token";

const temp = {
  object_type: "feed",
  content: {
    title: "지각!",
    description: "사유",
    image_url:
      "https://mud-kage.kakao.com/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg",
    image_width: 640,
    image_height: 640,
    link: {
      web_url: "http://www.daum.net",
      mobile_web_url: "http://m.daum.net",
      android_execution_params: "contentId=100",

      ios_execution_params: "contentId=100",
    },
  },
  item_content: {
    items: [
      {
        item: "사유1",
        item_op: "점심이 맛없어요",
      },
      {
        item: "사유2",
        item_op: "피곤해요",
      },
    ],
  },
  social: {
    like_count: 999,
  },
  buttons: [
    {
      title: "웹으로 이동",
      link: {
        web_url: "http://naver.com",
        mobile_web_url: "http://naver.com",
      },
    },
  ],
};
const tempstring = "template_object=" + JSON.stringify(temp);

router.use(function (req, res, next) {
  next();
});

router.get("/", async function (req, res) {
  res.send("카카오페이지입니다.");
});

// api로 분리
router.get("/massage", async function (req, res) {
  console.log("메세지실행됨");
  try {
    await axios
      .post(
        "https://kapi.kakao.com/v2/api/talk/memo/default/send",
        tempstring,
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
  console.log(tempstring);
});

module.exports = router;
