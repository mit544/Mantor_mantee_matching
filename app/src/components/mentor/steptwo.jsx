"use client";

import React from "react";

export default function MentorStepTwo({ formData, setFormData, renderMultiSelectInput }) {
  const industryOptions = [
    "Technology", "Finance", "Media", "Sports", "Health and Fitness", "Education",
    "Marketing", "Cybersecurity", "Software Development", "Journalism", "Coaching",
    "Business Management", "Entertainment", "Other",
  ];

  const expertiseOptions = [
    "Accounting and Finance", "Business Management", "Business of Football", "Sports Management",
    "Computer Science", "Cyber Security", "Digital Marketing", "Software Development",
    "Digital Content Production", "Sports Journalism", "Sports Media and Communications",
    "Exercise Studies", "Health, Exercise and Sport", "Physical Education",
    "Sports and Exercise Science", "Sports Coaching", "Other",
  ];

  const skillsOptions = [
    "Programming", "Web Development", "Data Analysis", "Machine Learning", "Cybersecurity",
    "Digital Marketing", "Accounting", "Finance Management", "Journalism", "Video Production",
    "Sports Coaching", "Exercise Science", "Performance Analysis", "Public Speaking", "Leadership",
    "Project Management", "Docker", "Kubernetes", "Cloud Infrastructure", "Other",
  ];

  const mentorshipStyleOptions = [
    "Hands-on guidance", "Structured meetings", "Occasional check-ins", "Pair programming",
    "Informal chats", "Other",
  ];

  return (
    <div className="space-y-6">
      {renderMultiSelectInput("industry_experience", industryOptions, "Industry Experience")}
      {renderMultiSelectInput("expertise_courses", expertiseOptions, "Expertise Courses")}
      {renderMultiSelectInput("skills_offered", skillsOptions, "Skills Offered")}
      {renderMultiSelectInput("mentorship_style", mentorshipStyleOptions, "Mentorship Style")}
    </div>
  );
}
