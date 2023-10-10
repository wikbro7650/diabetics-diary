const express = require("express");

const mongoose = require("mongoose");

const glucoseRouter = require("./controllers/glucose");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://pyrtkovsky:123_Norbert_123@cluster0.gpj1kj1.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Error connecting to DB", err.message);
  });

app.use("/api", glucoseRouter);
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
