import Movie from "@/models/movies";
import { connectToDB } from "@/utils/connectToDB";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const id = req.nextUrl.searchParams.get("id");

  if (!id) {
    return new NextResponse("Movie ID is required", { status: 400 });
  }
  console.log("about to connect");

  await connectToDB();
  console.log("connected");

  try {
    console.log(id);

    const movie = await Movie.findById(id);

    // console.log(movie);

    if (!movie) {
      return new NextResponse("Movie not found", { status: 404 });
    }

    // Toggle trending status
    console.log(movie.trending);

    if (movie.trending == "true") {
      movie.trending = false;
    } else {
      movie.trending = true;
    }

    console.log(movie.trending);
    // Save updated movie
    await movie.save();
    console.log(movie);

    return new NextResponse(JSON.stringify(movie), { status: 200 });
  } catch (err: any) {
    return new NextResponse(err.message, { status: 500 });
  }
};
