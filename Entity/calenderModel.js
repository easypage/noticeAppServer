const { default: mongoose } = require("mongoose");

const calenderSchema = new mongoose.Schema({
  name: { type: "string", required: true },
  state: {
    type: "String",
    enum: {
      values: ["지각", "결석", "조퇴"],
      message: "{VALUE} 잘못된 값입니다.",
    },
  },
  reason: String,
  privateReason: Boolean,
  date: String,
  noticeToken: String,
  check: Boolean,
});

const CalenderModel = mongoose.model("Calender", calenderSchema);

module.exports = CalenderModel;
