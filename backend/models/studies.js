const mongoose = require("mongoose");

// (creator) mongoose is being used to handle identifying who created what object
//    ref in this case is a field which specifies which schema we use to hold some
//    of the object information
const studySchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  start_time: { type: String, required: true },
  end_time: { type: String, required: true },
  approval: {type: String, require: true},
  creator: { type: String, required: true }
});



module.exports = mongoose.model("Study", studySchema);
