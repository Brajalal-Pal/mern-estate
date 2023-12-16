import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { loadMovie, movieSuccess, movieFailure } from "../redux/movieSlice";
import { TypeMovie } from "../common/types";
import Search from "../components/Search";
import Genre from "../components/Genre";

function Netblix() {
   const dispatch = useDispatch();
   const { movies } = useSelector((state: any) => state.movie);
   const [movieList, setMovieList] = useState<TypeMovie[]>([]);

   useEffect(() => {
      const getMovies = async () => {
         // console.log("movies", movies);

         if (movies.data && movies.data.length > 0) {
            // console.log("Loaded movies from redux store");
            setMovieList(movies.data);
            return;
         } else {
            // console.log("Loading movies from API call");
            dispatch(loadMovie());
            axios
               .get("/api/v1/discover/movies")
               .then((response) => {
                  dispatch(movieSuccess(response.data));
                  setMovieList(response.data);
               })
               .catch((err) => {
                  dispatch(movieFailure(err?.response?.data?.message));
                  setMovieList([]);
               });
         }
      };

      getMovies();

      return () => {
         // cleanup
         setMovieList([]);
      };
   }, []);

   return (
      <div style={{ width: "90%", marginLeft: "auto", marginRight: "auto" }}>
         <Genre />
         <Search />
         <h1 className="text-3xl font-semibold text-center my-7">Trending top 20 Movies</h1>
         <div className="flex flex-wrap gap-3">
            {movieList.map((movie: TypeMovie) => (
               <Link to={`/movie-details/${movie.id}`}>
                  <img
                     src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                     alt={movie.title}
                     key={movie.id}
                     width={"250px"}
                     style={{ marginTop: "20px", borderRadius: "5px", cursor: "pointer" }}
                  />
               </Link>
            ))}
         </div>
      </div>
   );
}

export default Netblix;
