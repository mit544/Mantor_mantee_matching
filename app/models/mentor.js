import mongoose from "mongoose";

const MentorSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },

  company: {
    type: String,
    required: true,
    trim: true
  },

  job_role: {
    type: String,
    required: true,
    trim: true
  },

  industry_experience: [{
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

  expertise_courses: [{
    type: String,
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
      "Sports Coaching",
      "Other"
    ],
    required: true
  }],

  skills_offered: [{
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

  challenges_faced: [{
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

  mentorship_motivation: [{
    type: String,
    enum: [
      "Share industry experience",
      "Support career growth",
      "Build talent pipeline",
      "Networking",
      "Develop leadership skills",
      "Personal fulfilment",
      "Contribute to community",
      "Other"
    ],
    required: true
  }],

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

export default mongoose.models.Mentor || mongoose.model("Mentor", MentorSchema);
