import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { to, subject, mainMessage, bestWishes } = await req.json();

    if (!to || !subject || !mainMessage || !bestWishes) {
      return NextResponse.json(
        { error: "Missing 'to', 'subject', 'mainMessage', or 'bestWishes' fields" },
        { status: 400 }
      );
    }

    const emailResponse = await resend.emails.send({
      from: "MentorSync <onboarding@resend.dev>",
      to,
      subject,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; background-color: #f9f9f9; border-radius: 10px; border: 1px solid #ddd;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #e31c3d; font-size: 24px; margin: 0;">🎉 You've Been Matched! 🎉</h1>
            <p style="color: #555; font-size: 16px; margin: 5px 0;">Welcome to the UA92 Mentoring Programme</p>
          </div>
          <div style="background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
            <p style="font-size: 16px; line-height: 1.6; margin: 0;">${mainMessage.replace(/\n/g, "<br/>")}</p>
          </div>
          <div style="margin-top: 20px; text-align: center;">
            <p style="font-size: 14px; color: #555; line-height: 1.6; margin: 0;">${bestWishes.replace(/\n/g, "<br/>")}</p>
          </div>
          <div style="margin-top: 20px; text-align: center;">
            <a href="https://padlet.com/ua92/mentoring-support-board-x9anwwfdm1weewxs" style="display: inline-block; margin: 10px; padding: 10px 20px; background-color: #e31c3d; color: #fff; text-decoration: none; border-radius: 5px; font-size: 14px;">Mentor Resources</a>
            <a href="https://padlet.com/ua92padlet/mentoring-support-board-for-students-e29uk9nplgsc6fcl" style="display: inline-block; margin: 10px; padding: 10px 20px; background-color: #0073e6; color: #fff; text-decoration: none; border-radius: 5px; font-size: 14px;">Student Resources</a>
          </div>
          <div style="margin-top: 20px; text-align: center; font-size: 12px; color: #888;">
            <p style="margin: 0;">If you have any questions, feel free to contact us at <a href="mailto:support@mentorsync.com" style="color: #0073e6; text-decoration: none;">support@mentorsync.com</a>.</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data: emailResponse });
  } catch (error: any) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      { error: "Failed to send email", details: error.message },
      { status: 500 }
    );
  }
}
