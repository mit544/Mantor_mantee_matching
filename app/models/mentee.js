import mongoose from "mongoose";

const MenteeSchema = new mongoose.Schema({
  student_id: String,
  name: String,
  course: String,
  industry: String,
  short_term_goals: [String],
  long_term_goals: [String],
  skills_to_develop: [String],
  expected_challenges: [String],
  mentorship_style: [String],
  feedback_openness: String,
  interests: [String],
  mentorship_goals: [String]
});

export default mongoose.models.Mentee || mongoose.model("Mentee", MenteeSchema);
