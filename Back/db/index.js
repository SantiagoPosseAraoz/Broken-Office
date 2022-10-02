require("dotenv").config();
const mongoose = require("mongoose");

const client = mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Succesfully db connected"))
  .catch((err) => console.error(err));

module.exports = client;
