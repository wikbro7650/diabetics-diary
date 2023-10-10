const mongoose = require("mongoose");
const entrySchema = new mongoose.Schema({
  svg: Number,
  device: String,
  trend: Number,
  type: String,
  dateString: String,
  rawbg: Number,
  direction: String,
  date: Number,
  utcOffset: Number,
  sysTime: String,
});
entrySchema.set("toJSON", {
  transform: (doc, returnedObject) => {},
});
module.exports = mongoose.model("Entries", entrySchema);
