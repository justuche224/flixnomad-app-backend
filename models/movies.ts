import { Document, Schema, models, model } from "mongoose";

interface IDownloadLink {
  name: string;
  link: string;
}

interface IMovie extends Document {
  image: string;
  name: string;
  year: number;
  details: string;
  downloadLink: IDownloadLink[];
  trailer: string;
  genre: string[];
  releaseDate: string;
  runtime: string;
  director: string;
  rated: string;
  type: string;
  quality: string;
  createdAt: Date;
  trending: boolean;
}

const DownloadLinkSchema: Schema = new Schema({
  name: { type: String, required: true },
  link: { type: String, required: true },
});

const MovieSchema: Schema = new Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  year: { type: Number, required: true },
  details: { type: String, required: true },
  downloadLink: { type: [DownloadLinkSchema], required: true },
  trailer: { type: String, required: true },
  genre: { type: [String], required: true },
  releaseDate: { type: String, required: true },
  runtime: { type: String, required: true },
  director: { type: String, required: true },
  rated: { type: String, required: true },
  type: { type: String, required: true },
  quality: { type: String, required: true },
  trending: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Movie = models?.Movie || model<IMovie>("Movie", MovieSchema);

export default Movie;
