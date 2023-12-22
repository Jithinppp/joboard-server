const mongoose = require("mongoose");
const { Schema } = mongoose;

const JobSchema = new Schema(
  {
    title: String,
    company: String,
    publishedDate: Date,
    expireDate: Date,
    experience: Number,
    description: String,
    requiredSkills: [String],
    location: String,
    salary: Number,
    benefitsAndPerks: [String],
    industryType: String,
    employmentType: String,
    education: String,
    workMode: String,
  },
  { strictQuery: false }
);

module.exports = mongoose.model("Job", JobSchema);
