import mongoose from "mongoose";
import User from "./user";

const MenteeSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  student_id: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },

  course: {
    type: String,
    required: true,
    enum: [
      "Accounting and Finance",
      "Business Management",
      "Business of Football",
      "Sports Management",
      "Computer Science",
      "Cyber Security",
      "Digital Marketing",
      "Software Development",
      "Digital Content Production",
      "Sports Journalism",
      "Sports Media and Communications",
      "Exercise Studies",
      "Health, Exercise and Sport",
      "Physical Education",
      "Sports and Exercise Science",
      "Sports Coaching"
    ]
  },

  course_domain: {
    type: String,
    required: true,
    enum: ["Business", "Digital", "Media", "Sport"]
  },

  industry_interest: [{
    type: String,
    enum: [
      "Technology",
      "Finance",
      "Media",
      "Sports",
      "Health and Fitness",
      "Education",
      "Marketing",
      "Cybersecurity",
      "Software Development",
      "Journalism",
      "Coaching",
      "Business Management",
      "Entertainment",
      "Other"
    ],
    required: true
  }],

  short_term_goals: [{
    type: String,
    trim: true
  }],

  long_term_goals: [{
    type: String,
    trim: true
  }],

  skills_to_develop: [{
    type: String,
    enum: [
      "Programming",
      "Web Development",
      "Data Analysis",
      "Machine Learning",
      "Cybersecurity",
      "Digital Marketing",
      "Accounting",
      "Finance Management",
      "Journalism",
      "Video Production",
      "Sports Coaching",
      "Exercise Science",
      "Performance Analysis",
      "Public Speaking",
      "Leadership",
      "Project Management",
      "Docker",
      "Kubernetes",
      "Cloud Infrastructure",
      "Other"
    ],
    required: true
  }],

  expected_challenges: [{
    type: String,
    trim: true
  }],

  mentorship_style: [{
    type: String,
    enum: [
      "Hands-on guidance",
      "Structured meetings",
      "Occasional check-ins",
      "Pair programming",
      "Informal chats",
      "Other"
    ],
    required: true
  }],

  feedback_openness: {
    type: String,
    enum: ["Not open", "Neutral", "Open", "Very open"],
    required: true
  },

  interests: [{
    type: String,
    enum: [
      "Artificial Intelligence",
      "Blockchain",
      "Cloud Computing",
      "Infrastructure as Code",
      "Virtual Reality",
      "Sports Nutrition",
      "Sports Psychology",
      "Digital Content Creation",
      "E-commerce",
      "Social Media",
      "Fitness Training",
      "Youth Sports Development",
      "Music",
      "Film Production",
      "Entrepreneurship",
      "Other"
    ],
    required: true
  }],

  mentorship_goals: [{
    type: String,
    enum: [
      "Career development",
      "Building professional network",
      "CV and Interview preparation",
      "Developing technical skills",
      "Developing soft skills",
      "Real-world project experience",
      "Exploring further education",
      "Personal growth and confidence",
      "Other"
    ],
    required: true
  }],

  is_international_student: {
    type: Boolean,
    default: false
  },

  adjustments_required: {
    type: String,
    trim: true,
    default: ""
  },

  created_at: {
    type: Date,
    default: Date.now
  }
});

// Static method to find mentee by user email
MenteeSchema.statics.findByUserEmail = async function (email) {
  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    // Find the mentee by user ID
    const mentee = await this.findOne({ user_id: user._id }).populate("user_id", "name email role profileCompleted");
    if (!mentee) {
      throw new Error("Mentee not found");
    }

    return mentee;
  } catch (error) {
    throw error;
  }
};

const Mentee = mongoose.models.Mentee || mongoose.model("Mentee", MenteeSchema);
export default Mentee;
