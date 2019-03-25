const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  authentication: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);
// potential bug around unique validator and duplicate authentication status'

module.exports = mongoose.model("User", userSchema);
