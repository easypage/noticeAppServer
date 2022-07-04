const express = require("express"); // express 임포트
const router = express.Router();

const calendermongo = require("../API/mongo");
const kakaoApi = require("../API/kakao");
const { response } = require("express");

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.use(function (req, res, next) {
  next();
});

router.post("/", async function (req, res) {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({ message: "failed: request does not exist" });
  }
  console.log("바디 확인");
  console.log(req.body);

  const response = await calendermongo.createCal(req.body);

  if (!response.check) {
    return res.status(400).send({ message: "create user fail" });
  }
  console.log("리스폰스 확인");
  console.log(response.user);
  try {
    await kakaoApi.sendMessage(response.user);
  } catch (error) {
    console.log(e);
  }
  return res.status(200).send({ message: "successfully" });
});

router.post("/create", async function (req, res) {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({ message: "failed: request does not exist" });
  } else {
    await calendermongo
      .createCal(req.body)
      .catch((err) => {
        return res.status(400).send({ message: "failed" });
      })
      .then((res) => {
        return res.status(200).send({
          message: "successfully",
        });
      });
  }
});

router.get("/check", async function (req, res) {
  const response = await calendermongo.check(req.query.token);
  console.log("check 쿼리 확인");
  console.log(req.url);
  console.log(req.query.token);
  res.writeHead(200, { "Content-Type": "text/html;charset=UTF-8" });
  res.write(`<script>alert("${response}")</script>`);
  res.write(
    "<script>location.href = 'kakaotalk://inappbrowser/close'</script>"
  );
  res.end();
});

router.get("/read", async function (req, res) {
  try {
    const data = await calendermongo.readCal();
    res.send(data);
  } catch (err) {
    console.log("에러발생");
    res.status(500).send();
  }
});

router.get("/test", async function (req, res) {});

module.exports = router;
