import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/user";
import connectMongoDB from "@/lib/mongodb";

export async function POST(req: Request) {
  const { email, password, role } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
  }

  await connectMongoDB();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ message: "User already exists" }, { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    email,
    password: hashedPassword,
    role: role || "mentee",
  });

  return NextResponse.json({ message: "User registered", user: newUser }, { status: 201 });
}
