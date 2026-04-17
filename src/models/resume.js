import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  name: String,
  email: String,
  phone: String,
  education: String,
  project: String,
  skills: [String],
  experience: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Resume = mongoose.model("Resume", resumeSchema);

export default Resume; 