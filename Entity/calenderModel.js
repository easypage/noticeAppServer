const { default: mongoose } = require("mongoose");

const calenderSchema = new mongoose.Schema({
  name: { type: "string", required: true },
  state: String,
  reason: String,
  private: Boolean,
  title: String,
  date: String,
  noticeToken: String,
  check: Boolean,
});

const CalenderModel = mongoose.model("Calender", calenderSchema);

module.exports = CalenderModel;
