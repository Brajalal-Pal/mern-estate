import { Request, Response, NextFunction } from "express";
import Movie from "../model/movie";
import axios from "axios";

export const getMovies = async (req: Request, res: Response) => {
  const movies = await Movie.find();

  if (movies.length === 0) {
    const url = `${process.env.TMDB_API_URL}/discover/movie?api_key=${process.env.TMDB_API_KEY}& language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;

    console.log("Loading from external api with url = ", url);

    axios.get(url).then(async (response) => {
      const _movies = response.data.results;
      console.log("3. Movies", _movies);

      const promises = _movies.map((movie: any) => {
        const newMovie = new Movie(movie);
        return newMovie.save();
      });

      await Promise.all(promises);

      res.json({
        message: "success",
        data: _movies,
      });
    });
  } else {
    console.log("Loading from database");

    res.json({
      message: "success",
      data: movies,
    });
  }
};

export const getMoviesByQuery = async (req: Request, res: Response) => {
  const { query } = req.query;
  //const movies = await Movie.find({ title: { $regex: query, $options: "i" }});

  if (query) {
    //console.log("process.env.TMDB_API_KEY", process.env.TMDB_API_KEY);
    const url = `${process.env.TMDB_API_URL}/search/movie?query=${query}&api_key=${process.env.TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;
    //console.log("Loading from external api", url);

    axios
      .get(url, {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.TMDB_API_READ_ACCES_TOKEN}` },
      })
      .then(async (response) => {
        const _movies = response.data.results;
        //console.log("3. Movies", _movies);

        res.json({
          message: "success",
          data: _movies,
        });
      })
      .catch((error) => {
        console.log("error", error.message);
      });
  } else {
    console.log("Loading from database");

    res.json({
      message: "success",
      data: [],
    });
  }
};

// Make it generic
export const getAllMovies = async (req: Request, res: Response, next: NextFunction) => {
  const { with_genres, include_adult, include_video, sort_by, with_origin_country, with_original_language, year } =
    req.query;
  try {
    // const movies: typeof Movie[] = []; // await Movie.find();
    let baseUrl = "https://api.themoviedb.org/3/discover/movie?language=en-US&page=1&sort_by=popularity.desc";
    let url = "";

    if (with_genres) {
      let l = with_genres.toString().split(",").join("%2");
      url = `&with_genres=${l}`;
    }

    if (include_adult) {
      url = `${url}&include_adult=${include_adult}`;
    } else {
      url = `${url}&include_adult=false`;
    }

    if (include_video) {
      url = `${url}&include_video=${include_video}`;
    } else {
      url = `${url}&include_video=false`;
    }

    if (sort_by) {
      url = `${url}&sort_by=${sort_by}`;
    }

    if (with_origin_country) {
      url = `${url}&with_origin_country=${with_origin_country}`;
    }

    if (with_original_language) {
      url = `${url}&with_original_language=${with_original_language}`;
    }

    if (year) {
      url = `${url}&year=${year}`;
    }

    const finalUrl = `${baseUrl}${url}&api_key=${process.env.TMDB_API_KEY}`;

    console.clear();
    console.log("-----------------------------------");
    console.log("Loading from external api", finalUrl);
    console.log("-----------------------------------");

    axios
      .get(finalUrl, {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.TMDB_API_READ_ACCES_TOKEN}` },
      })
      .then(async (response) => {
        const _movies = response.data.results;
        //console.log("3. Movies", _movies);

        // const promises = _movies.map(async (movie: any) => {
        //   let findMovie = await Movie.find({ id: movie.id });
        //   if (findMovie.length === 0) {
        //     const newMovie = new Movie(movie);
        //     return newMovie.save();
        //   } else {
        //     return findMovie;
        //   }
        // });

        // await Promise.all(promises);

        res.json({
          message: "success",
          data: _movies,
        });
      });
  } catch (error: any) {
    console.log("Something went wrong");
  }
};
