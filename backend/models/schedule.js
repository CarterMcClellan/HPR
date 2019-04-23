const mongoose = require("mongoose");

const scheduleSchema = mongoose.Schema({
  openings: String,
  study_title: String,
  user_email: Array
});

module.exports = mongoose.model("Schedule", scheduleSchema);
