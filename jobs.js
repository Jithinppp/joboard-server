const mongoose = require("mongoose");
const { Schema } = mongoose;

const JobSchema = new Schema({
  title: String,
  company: String,
  publishedOn: Date,
  expireDate: Date,
  experience: Number,
  desc: String,
  requiredSkills: [String],
  location: String,
  salary: Number,
  benefitsAndPerks: [String],
  role: String,
  industryType: String,
  employmentType: String,
  education: String,
});

module.exports = mongoose.model("Job", JobSchema);
