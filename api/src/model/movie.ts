import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    audult: { type: Boolean, required: true, default: false },
    backdrop_path: { type: String },
    genre_ids: { type: Array },
    id: { type: Number, required: true },
    original_language: { type: String },
    original_title: { type: String },
    overview: { type: String },
    popularity: { type: Number },
    poster_path: { type: String },
    release_date: { type: String },
    title: { type: String },
    video: { type: Boolean },
    vote_average: { type: Number },
    vote_count: { type: Number },
  },
  {
    timestamps: true,
  }
);

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
