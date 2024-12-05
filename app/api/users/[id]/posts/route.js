import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import { NextResponse } from "next/server";

// GET request handler
export const GET = async (req, { params }) =>  {
  try {
    // Connect to the database
    await connectToDB();

    // Find prompts created by the user
    const prompts = await Prompt.find({ creator: params.id }).populate("creator");

    // Return the prompts as JSON
    return NextResponse.json(prompts, { status: 200 });
  } catch (error) {
    console.error("Error fetching prompts:", error);
    return NextResponse.json(
      { message: "Failed to fetch prompts created by user" },
      { status: 500 }
    );
  }
}
