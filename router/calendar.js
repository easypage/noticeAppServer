const express = require("express"); // express 임포트
const router = express.Router();

const calendermongo = require("../API/mongo");
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.use(function (req, res, next) {
  next();
});

router.get("/", async function (req, res) {
  if (Object.keys(req.body).length === 0) {
    return res.status(401).send({ message: "failed: request does not exist" });
  } else {
    console.log("있습니다.");
    return res.status(200).send({
      message: "successfully",
    });
  }
});
router.post("/create", async function (req, res) {});

module.exports = router;