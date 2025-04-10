
import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from "@/lib/mongodb";
import Mentor from '@/models/mentor';
import Mentee from '@/models/mentee';
import mongoose from 'mongoose';

const getOverlapScore = (arr1: string[], arr2: string[], weight = 1): number => {
  const set1 = new Set(arr1.map((s) => s.toLowerCase()));
  const set2 = new Set(arr2.map((s) => s.toLowerCase()));
  const overlap = [...set1].filter((x) => set2.has(x));
  return overlap.length * weight;
};

const calculateScore = (mentee: any, mentor: any): number => {
  let score = 0;

  if (mentor.industry_experience.includes(mentee.industry)) {
    score += 3;
  }

  score += getOverlapScore(mentor.skills_offered, mentee.skills_to_develop, 2);
  score += getOverlapScore(mentor.challenges_faced, mentee.expected_challenges, 1);
  score += getOverlapScore(mentor.mentorship_style, mentee.mentorship_style, 1);
  score += getOverlapScore(mentor.interests, mentee.interests, 1);
  score += getOverlapScore(mentor.mentorship_motivation, mentee.mentorship_goals, 2);

  return score;
};

export async function POST(req: NextRequest) {
  await connectMongoDB();

  const { student_id } = await req.json();

  if (!student_id) {
    return NextResponse.json(
      { error: 'Please provide student_id in the request body.' },
      { status: 400 }
    );
  }

  try {
    const mentee = await Mentee.findOne({ student_id });
    if (!mentee) {
      return NextResponse.json({ error: 'Mentee not found.' }, { status: 404 });
    }

    const mentors = await Mentor.find({});

    type MentorType = {
      _id: mongoose.Types.ObjectId;
      name: string;
      email: string;
      company: string;
      job_role: string;
      industry_experience: string[];
      skills_offered: string[];
      challenges_faced: string[];
      mentorship_style: string[];
      feedback_openness: string;
      interests: string[];
      mentorship_motivation: string[];
    };

    let bestMatch: MentorType | null = null;
    let highestScore = -1;

    mentors.forEach((mentorDoc) => {
      const mentor = mentorDoc.toObject() as MentorType;
      const score = calculateScore(mentee, mentor);
      if (score > highestScore) {
        highestScore = score;
        bestMatch = mentor;
      }
    });

    if (!bestMatch) {
      return NextResponse.json({ error: 'No suitable mentor found.' }, { status: 404 });
    }

    return NextResponse.json({
      mentee,
      bestMentor: bestMatch,
      compatibilityScore: highestScore,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error during matching process.' }, { status: 500 });
  }
}
