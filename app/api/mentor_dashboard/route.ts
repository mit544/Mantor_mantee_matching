import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import Mentor from "@/models/mentor"; // Corrected the import to use the Mentor model

// This route is for fetching mentor data for the dashboard
export async function GET(req: NextRequest) {
    try {
      await connectMongoDB();

      // Get the session and validate it
      const session = await getServerSession(authOptions);
      if (!session || !session.user?.email) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }

      // Extract email from session
      const email = session.user.email;

      // Find the mentor details using the email
      const mentor = await Mentor.findByUserEmail(email);

      if (!mentor) {
        return NextResponse.json({ message: "Mentor data not found" }, { status: 404 });
      }

      // Return the mentor details
      return NextResponse.json({ mentor }, { status: 200 });
    } catch (error) {
      console.error("Error fetching mentor data:", error);
      return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
