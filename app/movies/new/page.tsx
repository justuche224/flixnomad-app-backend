"use client";

import { useState } from "react";
import axios from "axios";

const AddMovie = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    image: "",
    name: "",
    year: "",
    details: "",
    downloadLinkName: "",
    downloadLink: "",
    trailer: "",
    genre: "",
    releaseDate: "",
    runtime: "",
    director: "",
    rated: "",
    type: "",
    quality: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const {
      image,
      name,
      year,
      details,
      downloadLinkName,
      downloadLink,
      trailer,
      genre,
      releaseDate,
      runtime,
      director,
      rated,
      type,
      quality,
    } = form;

    const downloadLinkObject = {
      name: downloadLinkName,
      link: downloadLink,
    };

    try {
      const response = await axios.post(
        "https://flixnomad-app-backend-express.onrender.com/api/movies",
        {
          image,
          name,
          year: parseInt(year),
          details,
          downloadLink: [downloadLinkObject],
          trailer,
          genre: genre.split(",").map((g) => g.trim()),
          releaseDate,
          runtime,
          director,
          rated,
          type,
          quality,
        }
      );

      console.log(response.data);
    } catch (error) {
      setError("Failed to add movie");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800 text-black">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-red-500">Add a Movie</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            name="name"
            placeholder="Movie Name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="number"
            name="year"
            placeholder="Year"
            value={form.year}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <textarea
            name="details"
            placeholder="Details"
            value={form.details}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            name="downloadLinkName"
            placeholder="Download Link Name"
            value={form.downloadLinkName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            name="downloadLink"
            placeholder="Download Link"
            value={form.downloadLink}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            name="trailer"
            placeholder="Trailer URL"
            value={form.trailer}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            name="genre"
            placeholder="Genre (comma separated)"
            value={form.genre}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            name="releaseDate"
            placeholder="Release Date"
            value={form.releaseDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            name="runtime"
            placeholder="Runtime"
            value={form.runtime}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            name="director"
            placeholder="Director"
            value={form.director}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            name="rated"
            placeholder="Rated"
            value={form.rated}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            name="type"
            placeholder="Type (movie/series)"
            value={form.type}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            name="quality"
            placeholder="Quality"
            value={form.quality}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-red-500 rounded-md hover:bg-red-600"
          >
            {loading ? "Loading..." : "Add Movie"}
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default AddMovie;
