import { NextResponse } from "next/server";
import Parent from "@/models/Parent";
import connectDb from "@/lib/connectDb";

export async function POST(req) {
  await connectDb();
  try {
    const body = await req.json();
    const { email, username, password } = body;
    // const { username, password } = body;

    const exists = await Parent.findOne({ email });
    if (exists) return NextResponse.json({ status: 400, error: "Parents Exists" });

    const parent = await Parent.create({ email, studentUsername:username, password });
    return NextResponse.json({ status: 200, error: "Parent created" });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: 500, error: "Server Error" });
  }
}