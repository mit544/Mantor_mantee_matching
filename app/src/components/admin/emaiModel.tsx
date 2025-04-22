"use client";

import React from "react";
import { Button } from "@heroui/button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface EmailIntroModalProps {
    isOpen: boolean;
    onClose: () => void;
    mentor: {
        name: string;
        email: string;
        company: string;
        job_role: string;
        industry_experience: string[];
        expertise_courses: string[];
        skills_offered: string[];
        challenges_faced: string;
        mentorship_style: string[];
        feedback_openness: string;
        interests: string[];
        mentorship_motivation: string[];
        adjustments_required?: string;
    };
    mentee: {
        name: string;
        student_id: string;
        course: string;
        course_domain: string;
        industry_interest: string[];
        short_term_goals: string[];
        long_term_goals: string[];
        skills_to_develop: string[];
        expected_challenges: string;
        mentorship_style: string[];
        feedback_openness: string;
        interests: string[];
        mentorship_goals: string[];
        is_international_student: boolean;
        adjustments_required?: string;
    };
}

export default function EmailIntroModal({
    isOpen,
    onClose,
    mentor,
    mentee,
}: EmailIntroModalProps) {
    if (!isOpen) return null;

    const handleSendEmail = async () => {
        const mainMessage = `Hi both,

We're delighted that you have decided to take part in the UA92 Mentoring Programme for 2024/25. I'm sure that this will be an enjoyable and productive experience for you both!

${mentor.name} – your mentee is ${mentee.name}, a ${mentee.course} student.

${mentee.name} – your mentor is ${mentor.name}, who works as a ${mentor.job_role} at ${mentor.company}.

Now that you have received your contact information, feel free to reach out to each other and start organising your meetings. As discussed, these can be face to face or via Teams at a mutually agreeable time.

Just a reminder that if you need any ideas for content for your sessions, a range of resources can be accessed via the padlets.

Mentor padlet: https://padlet.com/ua92/mentoring-support-board-x9anwwfdm1weewxs

Student padlet: https://padlet.com/ua92padlet/mentoring-support-board-for-students-e29uk9nplgsc6fcl

Don't hesitate to get in contact with us if you have any further enquiries or issues.`;

        const bestWishes = `Best wishes,
MentorSync Team`;

        try {
            const response = await fetch("/api/introduction_email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    to: [mentor.email, mentee.student_id],
                    subject: "You've Been Matched!",
                    mainMessage,
                    bestWishes,
                }),
            });

            if (response.ok) {
                toast.success("Email has been sent successfully!");
            } else {
                toast.error("Failed to send email.");
            }
        } catch (error) {
            toast.error("An error occurred while sending the email.");
        }

        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
                <h3 className="text-xl font-bold mb-4 text-primary">Send Introduction Email</h3>

                <p className="mb-4">
                    You're about to send an introduction email to:<br />
                    <strong>Mentee:</strong> {mentee.name} (<em>{mentee.student_id}</em>)<br />
                    <strong>Mentor:</strong> {mentor.name} (<em>{mentor.email}</em>)
                </p>

                <textarea
                    className="w-full border border-gray-300 rounded-lg p-3 mb-4"
                    rows={10}
                    defaultValue={`Hi both,

We're delighted that you have decided to take part in the UA92 Mentoring Programme for 2024/25. I'm sure that this will be an enjoyable and productive experience for you both!

${mentor.name} – your mentee is ${mentee.name}, a ${mentee.course} student.

${mentee.name} – your mentor is ${mentor.name}, who works as a ${mentor.job_role} at ${mentor.company}.

Now that you have received your contact information, feel free to reach out to each other and start organising your meetings. As discussed, these can be face to face or via Teams at a mutually agreeable time.

Just a reminder that if you need any ideas for content for your sessions, a range of resources can be accessed via the padlets.

Mentor padlet: https://padlet.com/ua92/mentoring-support-board-x9anwwfdm1weewxs

Student padlet: https://padlet.com/ua92padlet/mentoring-support-board-for-students-e29uk9nplgsc6fcl

Don't hesitate to get in contact with us if you have any further enquiries or issues.`}
                />

                <div className="flex justify-end gap-3">
                    <Button
                        onPress={onClose}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
                    >
                        Cancel
                    </Button>
                    <Button
                        onPress={() => { handleSendEmail() }}
                        className="bg-primary text-white hover:bg-opacity-90 py-2 px-4 rounded"
                    >
                        Send Email
                    </Button>
                </div>
            </div>
        </div>
    );
}
