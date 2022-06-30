const axios = require("axios");

const ACCESS_TOKEN = "F35oMAbAFT7rPFnOP5-UGgF78jOuZsMQJaQ-QJolCilwnwAAAYGymMzG";

const imgLateList = {
  late: [
    "https://attendancechecknotice.herokuapp.com/late1.png",
    "https://attendancechecknotice.herokuapp.com/late2.png",
  ],
  absent1: ["https://attendancechecknotice.herokuapp.com/absent1.png"],
  checkout: ["https://attendancechecknotice.herokuapp.com/checkout1.png"],
};

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

async function sendMessage(UserData) {
  const name = "late";

  const imglist = imgLateList[`${name}`];
  imgUrl = imglist[Math.floor(Math.random() * imglist.length)];

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
    console.log(error);
    console.log("에러발생");
  }
}
module.exports = {
  sendMessage: sendMessage,
  imgCheck: imgCheck,
};
