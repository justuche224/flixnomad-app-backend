import { NextRequest, NextResponse } from "next/server";
import Movie from "@/models/movies";
import { connectToDB } from "@/utils/connectToDB";

export const GET = async (req: NextRequest, res: NextResponse) => {
  await connectToDB();

  try {
    // Aggregate all genres from the movies collection
    const genres = await Movie.aggregate([
      { $unwind: "$genre" },
      { $group: { _id: null, uniqueGenres: { $addToSet: "$genre" } } },
      { $project: { _id: 0, uniqueGenres: 1 } },
    ]);

    // Extract the uniqueGenres array
    const uniqueGenres = genres[0]?.uniqueGenres || [];

    return new Response(JSON.stringify({ genres: uniqueGenres }), {
      status: 200,
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ message: err.message }), {
      status: 500,
    });
  }
};
