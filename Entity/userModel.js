const { default: mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: "string", required: true },
  state: String,
  reason: String,
  private: Boolean,
  title: String,
  date: String,
  noticeToken: String,
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
