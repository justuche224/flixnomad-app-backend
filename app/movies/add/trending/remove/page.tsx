"use client";

import { ApiMovie } from "@/actions/get-all-movies";
import Loader from "@/components/Loader/Loader";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaClock, FaFolder } from "react-icons/fa";

const Page = () => {
  const [movies, setMovies] = useState<ApiMovie[]>([]);
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);
  const [doing, setDoing] = useState(false);

  const handleTrendingToggle = async (movieId: string) => {
    setDoing(true);
    try {
      const response = await axios.post(
        `/api/movies/add/trending?id=${movieId}`
      );
      alert("Removed");
      // console.log(response);
      // Remove the movie from the UI
      setMovies((prevMovies) =>
        prevMovies.filter((movie) => movie._id !== movieId)
      );
    } catch (error) {
      alert("Error Adding");
    } finally {
      setDoing(false);
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("/api/movies/trending");
        setMovies(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching movies!");
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="fixed top-0 grid place-content-center min-h-screen min-w-full bg-[#ffffff15]">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1 className="text-center text-3xl">{error}</h1>
      </main>
    );
  }

  return (
    <>
      <h1 className="text-3xl text-center mt-10 underline">Add to Trending</h1>
      <div
        className="w-full"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
        }}
      >
        {movies.map((movie: ApiMovie) => (
          <div
            key={movie._id}
            className="my-5 mx-2 rounded-lg p-2 bg-[#090e3b]"
          >
            <Link href={`/movies/${movie._id}`}>
              <div>
                <h2 className="font-bold text-xl">{movie.name}</h2>
                <p className="text-xs font-bold my-1">
                  <span className="mr-1">
                    <FaClock size={15} className="inline text-red-500 mr-1" />
                    {format(new Date(movie.releaseDate), "PP")}
                  </span>
                  <span>
                    <FaFolder size={15} className="inline text-red-500 mr-1" />
                    {movie.genre.join(", ")}
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
            <div className="pt-2">
              <button
                disabled={doing}
                onClick={() => handleTrendingToggle(movie._id)}
                className="bg-red-500 px-2 py-1 rounded hover:bg-red-600 hover:rounded-sm duration-300 cursor-pointer"
              >
                Remove Trending
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Page;
