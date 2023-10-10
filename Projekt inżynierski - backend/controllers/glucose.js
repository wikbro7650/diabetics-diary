const glucoseRouter = require("express").Router();
const Entries = require("../models/glucose");

glucoseRouter.get("/", async (req, res) => {
  const entries = await (await Entries.find({}).sort({ date: -1 })).reverse();
  console.log(entries);
  //   console.log(res.json(entries.map((entry) => entry.toJSON())));
  return res.json(entries.map((entry) => entry.toJSON()));
});
module.exports = glucoseRouter;
