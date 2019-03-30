const mongoose = require("mongoose");

const studySchema = mongoose.Schema({
  title: { type: String, required: true },
  study: { type: String, required: true },
  description: { type: String, required: true },
  time: { type: String, required: true },
  approval: {type: String, require: true}
});



module.exports = mongoose.model("Study", studySchema);
