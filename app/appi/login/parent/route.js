import { NextResponse } from "next/server";
import Parent from "@/models/Parent";
import connectDb from "@/lib/connectDb";

export async function POST(req) {
  await connectDb();
  try {
    const body = await req.json();
    const { email,username, password } = body;

    if ( !email || !username || !password) {
      return NextResponse.json({ status: 400, error: "All fields are required" });
    }

    const parent = await Parent.findOne({ email,studentUsername:username, password });
    if (parent) {
      return NextResponse.json({ status: 200, message: "Parent authenticated successfully" });
    }
    return NextResponse.json({ status: 400, error: "Parent doesn't exist" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: 500, error: "Server Error" });
  }
}

// export default async function handler(req, res) {
//     if (req.method !== "POST") return res.status(405).end();
  
//     const { email, username, password } = req.body;
//     try {
//       await connectDb();
//       const user = await Parent.findOne({ email,username, password });
//       if (!user) return res.status(401).json({ error: "Invalid credentials" });
  
//       return res.status(200).json({ message: "Login successful", user });
//     } catch (err) {
//       return res.status(500).json({ error: "Server error" });
//     }
// }