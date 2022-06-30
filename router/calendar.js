const express = require("express"); // express 임포트
const router = express.Router();

const calendermongo = require("../API/mongo");
const kakaoApi = require("../API/kakao");

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.use(function (req, res, next) {
  next();
});

router.post("/", async function (req, res) {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({ message: "failed: request does not exist" });
  }
  console.log(req.body);
  await calendermongo
    .createCal(req.body)
    .catch((err) => {
      console.log("cal오류 발생");
      return res.status(400).send({ message: `failed: create user 메세지` });
    })
    .then((result) => {
      console.log("cal성공");
      console.log(result);
    });

  await kakaoApi.sendMessage(req.body);
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

  res.writeHead(200, { "Content-Type": "text/html;charset=UTF-8" });
  res.write(`<script>alert("${response}")</script>`);
  res.write(
    "<script>location.href = 'kakaotalk://inappbrowser/close'</script>"
  );
  res.end();
});

router.get("/test", async function (req, res) {
  kakaoApi.sendMessage();
});

module.exports = router;
