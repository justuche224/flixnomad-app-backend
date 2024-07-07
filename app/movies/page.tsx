import {
  fetchMovies,
  MoviesApiResponse,
  ApiMovie,
} from "@/actions/get-all-movies";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { FaClock, FaFolder } from "react-icons/fa";

const Page = async () => {
  const moviesResponse = await fetchMovies({ page: 1, perPage: 15 });

  if (!moviesResponse) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1 className="text-center text-3xl">Error fetching movies!</h1>
      </main>
    );
  }

  const { movies, pagination } = moviesResponse;

  return (
    <div
      className="w-full"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
      }}
    >
      {movies.map((movie: ApiMovie) => (
        <div key={movie._id} className="my-5 mx-2 rounded-lg p-2 bg-[#090e3b]">
          <Link href={`/movies/${movie._id}`}>
            <div>
              <h2 className="font-bold text-xl">{movie.name}</h2>
              <p className=" text-xs font-bold my-1">
                <span className="mr-1">
                  <FaClock size={15} className="inline text-red-500 mr-1" />
                  {format(new Date(movie.releaseDate), "PP")}
                </span>
                <span className="">
                  <FaFolder size={15} className="inline text-red-500 mr-1" />
                  {movie.genre.map((genre) => `${genre}, `)}
                </span>
              </p>
            </div>
            <div className="flex w-full gap-3">
              <div className="mr-1 min-w-[100px]">
                <Image
                  src={movie.image}
                  width={100}
                  height={200}
                  alt={movie.name}
                  className="rounded-lg m-2"
                />
              </div>
              <div className="pt-2">
                <p className="text-sm">{movie.details}</p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Page;
