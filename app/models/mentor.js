import mongoose from "mongoose";
import User from "./user";

const MentorSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  expertise: {
    type: [String],
    required: true,
  },
  availability: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    trim: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// Static method to find mentor by user email
MentorSchema.statics.findByUserEmail = async function (email) {
  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    // Find the mentor by user ID
    const mentor = await this.findOne({ user_id: user._id }).populate("user_id", "name email role profileCompleted");
    if (!mentor) {
      throw new Error("Mentor not found");
    }

    return mentor;
  } catch (error) {
    throw error;
  }
};

const Mentor = mongoose.models.Mentor || mongoose.model("Mentor", MentorSchema);
export default Mentor;
