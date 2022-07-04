const { default: mongoose } = require("mongoose");

const calenderSchema = new mongoose.Schema({
  name: { type: "string", required: true },
  state: String,
  reason: String,
  privateReason: Boolean,
  date: Date,
  noticeToken: String,
  check: Boolean,
});

const CalenderModel = mongoose.model("Calender", calenderSchema);

module.exports = CalenderModel;
