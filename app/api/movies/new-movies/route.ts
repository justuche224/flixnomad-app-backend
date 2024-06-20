import NewMovie from "@/models/newMovie";
import { connectToDB } from "@/utils/connectToDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  await connectToDB();

  try {
    const newMovies = await NewMovie.find();
    return new NextResponse(JSON.stringify(newMovies), { status: 200 });
  } catch (err: any) {
    return new NextResponse(err.message, { status: 500 });
  }
};
