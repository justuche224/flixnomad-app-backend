import Movie from "@/models/movies";
import { NextRequest } from "next/server";
import { connectToDB } from "@/utils/connectToDB";

export const GET = async (req: NextRequest) => {
  // Connect to the database
  await connectToDB();

  for (let i = 0; i < 50; i++) {
    try {
      // Generate mock movie data
      const mockMovieData = {
        details: `This is a mock detail for movie ${i + 1}.`,
        director: `Director ${i + 1}`,
        downloadLink: [
          {
            name: `720p`,
            link: `https://flixnomad.s3.eu-north-1.amazonaws.com/movies/Trigger.Warning.2024.480p.LOOPFLIX.mkv`,
          },
          {
            name: `1080p`,
            link: `https://example.com/download/movie${i + 1}_1080p.mp4`,
          },
        ],
        genre: [`Genre ${i % 5}`, `Genre ${(i + 1) % 5}`], // Cycle through 5 genres
        image:
          i % 2 === 0
            ? `https://flixnomad.s3.eu-north-1.amazonaws.com/photos/trigger+warning+2024.jpeg`
            : `https://flixnomad.s3.eu-north-1.amazonaws.com/photos/entrapment-1999.jpeg`,
        name: `Mock Movie Title ${i + 1}`,
        quality: `480p`,
        rated: `PG-${i % 13}`, // Generate a rating like PG-1, PG-2, etc.
        releaseDate: new Date().toISOString(),
        runtime: `1h ${90 + i}m`, // Different runtime for each movie
        trailer: `Njx6KkInKao`,
        type: i % 2 === 0 ? "Movie" : "Series", // Alternate between "Movie" and "Series"
        year: 2020 + (i % 5), // Cycle through 5 years
      };

      // Create a new movie instance with the mock data
      const movie = new Movie(mockMovieData);

      // Save the new movie to the database
      const newMovie = await movie.save();

      // Optionally log the result or handle it as needed
      console.log(
        `Successfully saved ${mockMovieData.type.toLowerCase()} ${i + 1}`
      );
    } catch (err: any) {
      console.error(`Failed to save ${i + 1}:`, err.message);
      return new Response(JSON.stringify({ message: err.message }), {
        status: 500,
      });
    }
  }

  // Return a success response after all movies have been processed
  return new Response(
    JSON.stringify({ message: "Mock movies and series created successfully" }),
    { status: 200 }
  );
};
