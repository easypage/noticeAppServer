const axios = require("axios");

const ACCESS_TOKEN = "F35oMAbAFT7rPFnOP5-UGgF78jOuZsMQJaQ-QJolCilwnwAAAYGymMzG";

const imgLateList = {
  late: [
    "https://attendancechecknotice.herokuapp.com/late1.png",
    "https://attendancechecknotice.herokuapp.com/late2.png",
  ],
  absent: ["https://attendancechecknotice.herokuapp.com/absent1.png"],

  leaveEarly: ["https://attendancechecknotice.herokuapp.com/leaveEarly1.png"],
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
      title_image_text: state,
      title_image_category: date,
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
  }

  imgUrl = imglist[Math.floor(Math.random() * imglist.length)];
  console.log(imgUrl);

  const template = getTemplate(
    UserData.name,
    UserData.state,
    UserData.reason,
    imgUrl,
    UserData.date,
    UserData.token
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
  }
}
module.exports = {
  sendMessage: sendMessage,
};
