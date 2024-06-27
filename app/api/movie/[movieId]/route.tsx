import Movie from "@/models/movies";
import { NextRequest } from "next/server";
import { connectToDB } from "@/utils/connectToDB";

export const GET = async (
  req: NextRequest,
  { params }: { params: { movieId: string } }
) => {
  const { movieId } = params;
  await connectToDB();
  //   console.log("movieId", movieId);

  try {
    // console.log("hi");

    const movie = await Movie.findById(movieId);
    console.log(typeof movie);

    if (!movie) {
      return new Response(JSON.stringify({ message: "Movie not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(movie), {
      status: 200,
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
};
