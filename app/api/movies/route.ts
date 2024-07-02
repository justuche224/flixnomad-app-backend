import Movie from "@/models/movies";
import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/connectToDB";

export const GET = async (req: NextRequest, res: NextResponse) => {
  await connectToDB();

  const page = parseInt(req.nextUrl.searchParams.get("page") as string) || 1;
  const perPage =
    parseInt(req.nextUrl.searchParams.get("perPage") as string) || 10;
  const type = req.nextUrl.searchParams.get("type") as string | undefined;
  const year =
    parseInt(req.nextUrl.searchParams.get("year") as string) || undefined;

  const filter: any = {};
  if (type) filter.type = { $regex: new RegExp(type, "i") }; // Case-insensitive search
  if (year) filter.year = year;
  // console.log(filter);

  try {
    const movies = await Movie.find(filter)
      .skip((page - 1) * perPage)
      .limit(perPage);

    const total = await Movie.countDocuments(filter);

    return new Response(
      JSON.stringify({
        movies,
        pagination: {
          total,
          page,
          perPage,
          totalPages: Math.ceil(total / perPage),
        },
      }),
      { status: 200 }
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ message: err.message }), {
      status: 500,
    });
  }
};
