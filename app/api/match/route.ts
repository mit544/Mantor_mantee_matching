import connectMongoDB from "@/lib/mongodb";
import Mentor from "@/models/mentor";
import Mentee from "@/models/mentee";
import { NextResponse } from "next/server";

// Cosine Similarity Function
const cosineSimilarity = (vectorA: number[], vectorB: number[]): number => {
  const dotProduct = vectorA.reduce((sum, val, i) => sum + val * vectorB[i], 0);
  const magnitudeA = Math.sqrt(vectorA.reduce((sum, val) => sum + val * val, 0));
  const magnitudeB = Math.sqrt(vectorB.reduce((sum, val) => sum + val * val, 0));
  return magnitudeA && magnitudeB ? dotProduct / (magnitudeA * magnitudeB) : 0;
};

// Convert mentor/mentee attributes into a numerical vector
const createFeatureVector = (user: any) => {
  return [
    user.industry ? 1 : 0, // Industry match (Binary)
    (user.short_term_goals && Array.isArray(user.short_term_goals)) ? user.short_term_goals.length : 0, // Number of goals
    (user.skills_to_develop && Array.isArray(user.skills_to_develop)) ? user.skills_to_develop.length : 0, // Number of skills
    (user.mentorship_style && Array.isArray(user.mentorship_style)) ? user.mentorship_style.length : 0, // Preferred mentorship styles
    (user.interests && Array.isArray(user.interests)) ? user.interests.length : 0, // Interests
    user.feedback_openness === "Very Open" ? 1 : 0, // Feedback openness
  ];
};

// Find Top N Matches using KNN
const findTopMentorsKNN = (mentee: any, mentors: any[], k = 3) => {
  let menteeVector = createFeatureVector(mentee);
  
  let scores = mentors.map((mentor) => ({
    mentor,
    score: cosineSimilarity(menteeVector, createFeatureVector(mentor)),
  }));

  // Sort mentors by highest similarity score
  scores.sort((a, b) => b.score - a.score);

  return scores.slice(0, k); // Return top K matches
};

// API Route
export async function POST(req: Request) {
  try {
    await connectMongoDB();

    const { student_id } = await req.json();
    if (!student_id) {
      return NextResponse.json({ message: "Student ID is required" }, { status: 400 });
    }

    // Fetch mentee details
    const mentee = await Mentee.findOne({ student_id });
    if (!mentee) {
      return NextResponse.json({ message: "Mentee not found" }, { status: 404 });
    }

    // Fetch all mentors
    const mentors = await Mentor.find();
    if (mentors.length === 0) {
      return NextResponse.json({ message: "No mentors available" }, { status: 404 });
    }

    // Find top 3 mentor matches
    const topMentors = findTopMentorsKNN(mentee, mentors, 3);

    return NextResponse.json({ mentee, bestMatches: topMentors }, { status: 200 });
  } catch (error) {
    console.error("Error in matching:", error);
    return NextResponse.json({ message: "Server Error", error }, { status: 500 });
  }
}
