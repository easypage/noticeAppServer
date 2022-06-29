const express = require("express"); // express 임포트
const router = express.Router();

module.exports = router;

router.use(function (req, res, next) {
  next();
});

router.get("/", async function (req, res) {
  var filename = "late.png";
  fs.readFile(filename, function (err, data) {
    res.writeHead(200, { "Context-Type": "image/png" });
    res.write(data);
    res.end();
  });

  res.send("이미지페이지");
});
