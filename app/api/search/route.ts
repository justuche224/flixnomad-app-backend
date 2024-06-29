import Movie from "@/models/movies";
import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/connectToDB";
import { escapeRegExp } from "lodash";

export const GET = async (req: NextRequest, res: NextResponse) => {
  await connectToDB();

  const searchTerm =
    (req.nextUrl.searchParams.get("searchTerm") as string) || "";

  try {
    // 1. Escape User Input (Sanitize for Regular Expressions)
    const escapedSearch = escapeRegExp(searchTerm);

    // 2. Tokenize the search query
    const searchTokens = escapedSearch.split(" ");

    // 3. Construct the regular expression
    const searchRegex = new RegExp(searchTokens.join("|"), "i"); // Case-insensitive

    // 4. Query the MongoDB Collection
    const movies = await Movie.find({ name: { $regex: searchRegex } })
      .sort({ createdAt: -1 })
      .exec();

    return new Response(JSON.stringify({ movies }), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ message: err.message }), {
      status: 500,
    });
  }
};
