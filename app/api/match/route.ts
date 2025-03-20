import connectMongoDB from "../../lib/mongodb";
import Mentor from "@/models/mentor";
import Mentee from "@/models/mentee";
import { NextResponse } from "next/server";

const calculateMatchScore = (mentee:any, mentor:any) => {
  let score = 0;

  // Industry Alignment (30%)
  if (mentor.industry_experience.includes(mentee.industry)) score += 30;

  // Career Goals Match (20%)
  if (mentee.short_term_goals.some((goal:any) => mentor.skills_offered.includes(goal))) score += 20;

  // Skills Match (20%)
  if (mentee.skills_to_develop.some((skill:any) => mentor.skills_offered.includes(skill))) score += 20;

  // Mentorship Style Match (15%)
  if (mentee.mentorship_style.some((style:any) => mentor.mentorship_style.includes(style))) score += 15;

  // Additional Interests (10%)
  if (mentee.interests.some((interest:any) => mentor.interests.includes(interest))) score += 10;

  // Openness to Feedback (5%)
  if (mentee.feedback_openness === mentor.feedback_openness) score += 5;

  return score;  // Total score out of 100
};

export async function POST(req: Request) {
  try {
    await connectMongoDB();

    const { student_id } = await req.json();
    if (!student_id) {
      return NextResponse.json({ message: "Student ID is required" }, { status: 400 });
    }

    // Use findOne instead of findById for student_id lookup
    const mentee = await Mentee.findOne({ student_id });
    if (!mentee) {
      return NextResponse.json({ message: "Mentee not found" }, { status: 404 });
    }

    const mentors = await Mentor.find();
    let bestMatch = null;
    let highestScore = 0;

    mentors.forEach((mentor) => {
      const score = calculateMatchScore(mentee, mentor);
      if (score > highestScore) {
        highestScore = score;
        bestMatch = mentor;
      }
    });

    if (!bestMatch) {
      return NextResponse.json({ message: "No suitable mentor found" }, { status: 404 });
    }

    return NextResponse.json({ mentee, bestMatch, score: highestScore }, { status: 200 });
  } catch (error) {
    console.error("Error in matching:", error);
    return NextResponse.json({ message: "Server Error", error }, { status: 500 });
  }
}