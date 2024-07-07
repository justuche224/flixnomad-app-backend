import Movie from "@/models/movies";
import { connectToDB } from "@/utils/connectToDB";

// Define types
export type ApiMovie = {
  __v: number;
  _id: string;
  createdAt: string;
  details: string;
  director: string;
  downloadLink: DownloadLink[];
  genre: string[];
  image: string;
  name: string;
  quality: string;
  rated: string;
  releaseDate: string;
  runtime: string;
  trailer: string;
  type: string;
  trending: boolean;
  year: number;
};

export interface DownloadLink {
  name: string;
  link: string;
}

export interface Pagination {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

export interface MoviesApiResponse {
  movies: ApiMovie[];
  pagination: Pagination;
}

// Function to fetch movies
type FetchMoviesProps = {
  page?: number;
  perPage?: number;
  type?: string;
  year?: number;
};

export const fetchMovies = async (
  props: FetchMoviesProps
): Promise<MoviesApiResponse | null> => {
  const page = props.page || 1;
  const perPage = props.perPage || 10;
  const type = props.type || undefined;
  const year = props.year || undefined;

  const filter: any = {};
  if (type) filter.type = { $regex: new RegExp(type, "i") }; // Case-insensitive search
  if (year) filter.year = year;

  try {
    await connectToDB();

    const movies = await Movie.find(filter)
      .skip((page - 1) * perPage)
      .limit(perPage);

    const total = await Movie.countDocuments(filter);

    const pagination: Pagination = {
      total,
      page,
      perPage,
      totalPages: Math.ceil(total / perPage),
    };

    return {
      movies,
      pagination,
    };
  } catch (error) {
    console.error("Error fetching movies:", error);
    return null;
  }
};
