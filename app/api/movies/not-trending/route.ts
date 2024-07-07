import Movie from "@/models/movies";
import { connectToDB } from "@/utils/connectToDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  await connectToDB();
  try {
    const trendingMovies = await Movie.find({ trending: "false" });
    return new NextResponse(JSON.stringify(trendingMovies), { status: 200 });
  } catch (err: any) {
    return new NextResponse(err.message, { status: 500 });
  }
};
