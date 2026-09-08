import { NextResponse } from "next/server";
import User from "@/models/User";
import connectDb from "@/lib/connectDb";

// API route for POST /api/signup/user
export async function POST(req) {
  await connectDb();
  try {
    const body = await req.json();
    const { username, email, password } = body;

    if (!username || !email || !password) {
      return NextResponse.json({ status: 400, error: "All fields are required" });
    }


    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json({ status: 400, error: "User already exists" });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    return NextResponse.json({ status: 200, message: "User created successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: 500, error: "Server Error" });
  }
}
