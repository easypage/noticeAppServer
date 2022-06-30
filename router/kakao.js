const express = require("express"); // express 임포트
const router = express.Router();

router.use(function (req, res, next) {
  next();
});

router.get("/", async function (req, res) {
  res.send("카카오페이지입니다.");
});

module.exports = { router: router };
