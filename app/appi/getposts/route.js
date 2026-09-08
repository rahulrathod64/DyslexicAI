import { NextResponse } from "next/server";
import Posts from "@/models/Posts"; // This should point to your Story schema file
import connectDb from "@/lib/connectDb";

export async function POST(req) {
  await connectDb();
  try {
    const username = 'dhangarr.cs23'; // Replace this if you later want dynamic usernames
    const posts = await Posts.find({ username });
    console.log("post: ",posts)

    // Flatten the arrays of stories
    const stories = [];
    // const stories = {
    //   title: posts.title,
    //   videoLinks: posts.videoLinks,
    //   description: posts.description,
    // }
    posts.forEach(post => {
      const { title, description, videoLinks } = post;

        stories.push({
          title,
          description,
          videoLinks
        });
    });
    
    return NextResponse.json({ status: 200, message: "Posts received successfully", stories});

  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: 500, error: "Server Error" });
  }
}
