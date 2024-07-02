import { NextRequest, NextResponse } from "next/server";
import Movie from "@/models/movies";
import { connectToDB } from "@/utils/connectToDB";

export const GET = async (req: NextRequest, res: NextResponse) => {
  await connectToDB();

  const { searchParams } = new URL(req.url);
  const genre = searchParams.get("genre");

  if (!genre) {
    return new Response(JSON.stringify({ message: "Genre is required" }), {
      status: 400,
    });
  }

  try {
    const movies = await Movie.find({
      genre: { $regex: new RegExp(genre, "i") },
    });

    return new Response(JSON.stringify({ movies }), {
      status: 200,
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ message: err.message }), {
      status: 500,
    });
  }
};
