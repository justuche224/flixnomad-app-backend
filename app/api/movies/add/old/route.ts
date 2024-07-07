import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/connectToDB";
import Movie from "@/models/movies";

export async function POST(req: NextRequest) {
  // console.log("hey pips");

  const requiredFields = [
    "image",
    "name",
    "year",
    "details",
    "downloadLink",
    "trailer",
    "genre",
    "releaseDate",
    "runtime",
    "director",
    "rated",
    "type",
    "quality",
  ];

  // Parse the request body
  let data;
  try {
    data = await req.json();
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid request body" },
      { status: 400 }
    );
  }

  // Check if all required fields are present
  for (const field of requiredFields) {
    if (
      !data[field] ||
      (Array.isArray(data[field]) && data[field].length === 0)
    ) {
      return NextResponse.json(
        { message: `Missing required field: ${field}` },
        { status: 400 }
      );
    }
  }

  // Convert releaseDate to ISO format
  let formattedReleaseDate;
  try {
    const [day, month, year] = data.releaseDate.split(" / ").map(Number);
    formattedReleaseDate = new Date(year, month - 1, day).toISOString();
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid release date format! it should be 01 / 02 / 2027" },
      { status: 400 }
    );
  }

  // Connect to the database
  await connectToDB();

  try {
    // Create a new movie instance with the provided data
    const newMovie = new Movie({
      image: data.image,
      name: data.name,
      year: parseInt(data.year),
      details: data.details,
      downloadLink: data.downloadLink,
      trailer: data.trailer,
      genre: data.genre,
      releaseDate: formattedReleaseDate,
      runtime: data.runtime,
      director: data.director,
      rated: data.rated,
      type: data.type,
      trending: false,
      quality: data.quality,
    });

    // Save the new movie to the database
    await newMovie.save();
    // console.log(newMovie);

    return NextResponse.json(
      { message: "Movie added successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Failed to add movie:", error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
