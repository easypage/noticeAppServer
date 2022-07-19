const express = require("express"); // express 임포트
const router = express.Router();

const calendermongo = require("../API/calendarMongo");
const kakaoApi = require("../API/kakao");
const { response } = require("express");

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.use(function (req, res, next) {
  next();
});

// post 기본생성
router.post("/", async function (req, res) {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({ message: "failed: request does not exist" });
  }

  if (
    req.body.name === undefined ||
    req.body.state === undefined ||
    req.body.reason === undefined ||
    req.body.privateReason === undefined ||
    req.body.date === undefined
  ) {
    return res.status(401).send("data 값이 오지 않았거나 잘못 왔습니다.");
  }

  console.log("바디 확인");
  console.log(req.body);

  const response = await calendermongo.createCal(req.body);

  if (!response.check) {
    return res.status(500).send({ message: "create user fail" });
  }

  try {
    await kakaoApi.sendMessage(response.user);
  } catch (error) {
    return res
      .status(400)
      .send({ message: "메세지 보내는중 문제가 발생하였습니다." });
  }
  return res.status(200).send({ message: "successfully" });
});

router.get("/read", async function (req, res) {
  try {
    const data = await calendermongo.readCal();
    res.send({
      status: 200,
      data: data,
    });
  } catch (err) {
    res.status(500).send();
  }
});

router.post("/delete", async function (req, res) {
  console.log("/delete body 체크");
  console.log(req.body);
  if (req.body.token === undefined) {
    return res.status(401).send("data 값이 오지 않았거나 잘못 왔습니다.");
  }
  try {
    const del = await calendermongo.deleteCal(req.body.token);
    return res.send({ status: 200, data: del });
  } catch (error) {
    return res.status(500).send("오류");
  }
});

router.post("/update", async function (req, res) {
  console.log("/update body 체크");
  console.log(req.body);

  if (req.body.token === undefined || req.body.date === undefined) {
    return res.status(401).send("data 값이 오지 않았거나 잘못 왔습니다.");
  }
  try {
    const update = await calendermongo.updateCal(req.body);
    await kakaoApi.sendMessage(update);

    return res.send({ status: 200, data: "성공" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ data: "실패하였습니다." });
  }
});

router.get("/check", async function (req, res) {
  const calData = await calendermongo.findTokenData(req.query.token);
  const response = await calendermongo.check(req.query.token);
  console.log("check 쿼리 확인");
  console.log(req.query.token);

  console.log("calData확인");
  console.log(calData);

  if (!calData.check && calData !== undefined) {
    try {
      await kakaoApi.sendCheckMessageTest(calData);
    } catch (error) {
      return res
        .status(400)
        .send({ message: "메세지 보내는중 문제가 발생하였습니다." });
    }
  }
  res.writeHead(200, { "Content-Type": "text/html;charset=UTF-8" });
  res.write(`<script>alert("${response}")</script>`);
  res.write(
    "<script>location.href = 'kakaotalk://inappbrowser/close'</script>"
  );
  res.end();
});

module.exports = router;
