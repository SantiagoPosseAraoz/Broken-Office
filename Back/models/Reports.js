const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  name: {
    type: String,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
  },
  name: {
    type: String,
  },
  title: {
    type: String,
  },
  admin: {
    type: String,
    default: "No admin.",
  },
  location: {
    type: String,
    // required: true,
  },
  companyRole: {
    type: String,
    required: false,
  },
  state: {
    type: String,
    default: "pending",
  },
  image: {
    type: String,
    required: false,
  },
  date: {
    type: String,
    required: false,
  },
  description: {
    type: String,
  },
  priority: {
    type: String,
  },
  country: {
    type: String,
  },
  coord: {
    type: Array,
    required: false,
  },
  tags: {
    type: Array,
    required: false,
  },
  messages: {
    type: Array,
    required: false,
  },
  profilephoto:{
    
  }
});

module.exports = mongoose.model("Reports", ReportSchema);
