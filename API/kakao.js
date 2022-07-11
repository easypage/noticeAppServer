const axios = require("axios");

const ACCESS_TOKEN =
  process.env.KAKAO ||
  "9GyBLQc5cSMnWG_d8FjJz4hXdYFk_4sM-CWxBGVgCj1zFwAAAYHXjglA";

const host = "https://attendancechecknotice.herokuapp.com/messageImg/";
const imgLateList = {
  late: [host + "late1.png", host + "late2.png", host + "late3.png"],
  absent: [host + "absent1.png", host + "absent2.png"],

  leaveEarly: [host + "leaveEarly1.png", host + "leaveEarly2.png"],
};

function getTemplate(name, state, reason, url, date, token) {
  const temp = {
    object_type: "feed",
    content: {
      title: "이유",
      description: reason,
      image_url: url,
      image_width: 640,
      image_height: 640,
      link: {
        web_url: "https://attendancechecknotice.herokuapp.com/",
        mobile_web_url: "https://attendancechecknotice.herokuapp.com/",
        android_execution_params: "contentId=100",

        ios_execution_params: "contentId=100",
      },
    },
    item_content: {
      profile_text: name,
      items: [
        {
          item: "종류",
          item_op: state,
        },
        {
          item: "날짜",
          item_op: date,
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
          web_url: `https://attendancechecknotice.herokuapp.com/calender/check?token=${token}`,
          mobile_web_url: `https://attendancechecknotice.herokuapp.com/calender/check?token=${token}`,
        },
      },
    ],
  };

  return "template_object=" + JSON.stringify(temp);
}

async function sendMessage(UserData) {
  let imglist;
  console.log("유저데이터");
  console.log(UserData);
  switch (UserData.state) {
    case "결석":
      imglist = imgLateList.absent;
      break;
    case "지각":
      imglist = imgLateList.late;
      break;
    case "조퇴":
      imglist = imgLateList.leaveEarly;
      break;
    default:
      return "실패";
      break;
  }

  imgUrl = imglist[Math.floor(Math.random() * imglist.length)];

  const template = getTemplate(
    UserData.name,
    UserData.state,
    UserData.reason,
    imgUrl,
    UserData.date,
    UserData.noticeToken
  );

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
    throw new Error(error, "에러발생");
  }
}

function getCheckTemplate(state, reason) {
  const temp = {
    object_type: "text",
    text: state + " : " + reason + " 승인되었습니다.",
    link: {
      web_url: "https://developers.kakao.com",
      mobile_web_url: "https://developers.kakao.com",
    },
  };

  return "template_object=" + JSON.stringify(temp);
}

async function sendCheckMessageTest(body) {
  const template = getCheckTemplate(body.state, body.reason);
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
    throw new Error(error, "에러발생");
  }
}
module.exports = {
  sendMessage: sendMessage,
  sendCheckMessageTest: sendCheckMessageTest,
};
