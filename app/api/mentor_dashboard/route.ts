import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import Mentor from "@/models/mentor";

export async function GET(req: NextRequest) {
    try {
      await connectMongoDB();

      const session = await getServerSession(authOptions);
      if (!session || !session.user?.email) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }

      const email = session.user.email;

      const mentor = await Mentor.findByUserEmail(email);

      if (!mentor) {
        return NextResponse.json({ message: "Mentor data not found" }, { status: 404 });
      }

      return NextResponse.json({ mentor }, { status: 200 });
    } catch (error) {
      console.error("Error fetching mentor data:", error);
      return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
