const mongoose = require("mongoose");

// (creator) mongoose is being used to handle identifying who created what object
//    ref in this case is a field which specifies which schema we use to hold some
//    of the object information
const studySchema = mongoose.Schema({
  title: { type: String, required: true },
  participants : { type: Array, required: true}
});

module.exports = mongoose.model("partStudy", studySchema);
