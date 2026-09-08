import { NextResponse } from "next/server";
import Posts from "@/models/Posts"; // Make sure the model file is named Story.js and exports the schema correctly
import connectDb from "@/lib/connectDb";

export async function POST(req) {
  await connectDb();
  try {
    const body = await req.json();
    const { videoLinks, title, description } = body;
    console.log("Info: ",videoLinks,title,description)
    // if (!videoLinks  || !title || !description) {
    //     console.log("yaha se hua")
    //   return NextResponse.json({ status: 400, error: "All fields must be arrays and are required" });
    // }

    // Assuming the username is hardcoded as in your previous code
    const username = 'dhangarr.cs23';

    await Posts.create({
      username,
      videoLinks,
      title,
      description
    });
    console.log("yaha aaya");
    return NextResponse.json({ status: 200, message: "Post created"});
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: 500, error: "Server Error" });
  }
}
