import mongoose from "mongoose";

const MenteeOptionsSchema = new mongoose.Schema({
  courses: [String],
  courseDomains: [String],
  industries: [String],
  skills: [String],
  mentorshipStyles: [String],
  feedbackOptions: [String],
  interests: [String],
  goals: [String],
}, { timestamps: { updatedAt: true } });

export default mongoose.models.MenteeOptions || mongoose.model("MenteeOptions", MenteeOptionsSchema);

