import mongoose from "mongoose";

const MentorSchema = new mongoose.Schema({
  name: String,
  email: String,
  company: String,
  job_role: String,
  industry_experience: [String],
  skills_offered: [String],
  challenges_faced: [String],
  mentorship_style: [String],
  feedback_openness: String,
  interests: [String],
  mentorship_motivation: [String]
});

export default mongoose.models.Mentors || mongoose.model("Mentors", MentorSchema);