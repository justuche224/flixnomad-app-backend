import Movie from "@/models/movies";
import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/connectToDB";
import { escapeRegExp } from "lodash";

export const GET = async (req: NextRequest, res: NextResponse) => {
  await connectToDB();

  const searchTerm =
    (req.nextUrl.searchParams.get("searchTerm") as string) || "";
  // console.log("Search Term:", searchTerm);

  try {
    // 1. Escape User Input (Sanitize for Regular Expressions)
    const escapedSearch = escapeRegExp(searchTerm);
    // console.log("Escaped Search:", escapedSearch);

    // 2. Tokenize the search query
    const searchTokens = escapedSearch.split(" ");
    // console.log("Search Tokens:", searchTokens);

    // 3. Construct the regular expression
    const searchRegex = new RegExp(searchTokens.join("|"), "i"); // Case-insensitive
    // console.log("Search Regex:", searchRegex);

    // 4. Query the MongoDB Collection
    const movies = await Movie.find({ name: { $regex: searchRegex } })
      .sort({ createdAt: -1 })
      .exec();

    // console.log("Movies Found:", movies);

    return new Response(JSON.stringify({ movies }), { status: 200 });
  } catch (err: any) {
    // console.error("Error:", err.message);
    return new Response(JSON.stringify({ message: err.message }), {
      status: 500,
    });
  }
};
