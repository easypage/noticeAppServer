const express = require("express"); // express 임포트
const router = express.Router();

const calendermongo = require("../API/mongo");
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.use(function (req, res, next) {
  next();
});

router.get("/", async function (req, res) {
  // calendermongo.createCal(
  //   "kim",
  //   "지각",
  //   "늦잠",
  //   false,
  //   "늦었습니다",
  //   "2022-06-12"
  // );

  console.log(req.body);
  res.send("캘린더 페이지입니다.");
});
router.post("/create", async function (req, res) {});

module.exports = router;
