import mongoose from "mongoose";

const MentorOptionsSchema = new mongoose.Schema({
  industries: [String],
  expertise: [String],
  skills: [String],
  mentorshipStyles: [String],
  interests: [String],
  motivations: [String],
}, { timestamps: { updatedAt: true } });

export default mongoose.models.MentorOptions || mongoose.model("MentorOptions", MentorOptionsSchema);

