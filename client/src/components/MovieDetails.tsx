import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TypeMovie } from "../common/types";
import { useParams } from "react-router-dom";

const MovieDetails = () => {
   const { id } = useParams();
   const { movies } = useSelector((state: any) => state.movie);
   const { genres } = useSelector((state: any) => state.genre);
   const [movie, setMovie] = useState<TypeMovie>();

   const getGenres = (genre_ids: number[] | undefined) => {
      if (genre_ids) {
         let result = genres.data.filter((genre: any) => genre_ids.includes(genre.id));
         return result.map((genre: any) => genre.name).join(", ");
      } else {
         return "";
      }
   };

   useEffect(() => {
      const getMovies = async () => {
         if (movies.data && movies.data.length > 0) {
            let filteredMovie = movies.data.filter((movie: TypeMovie) => movie.id === Number(id));
            setMovie(filteredMovie[0]);
            return;
         } else {
            setMovie(undefined);
         }
      };

      getMovies();
      return () => {
         setMovie(undefined);
      };
   }, []);

   return (
      <div style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}>
         <div className="flex flex-row">
            <img
               src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
               alt={movie?.title}
               key={movie?.id}
               width={"450px"}
               style={{ marginTop: "20px", borderRadius: "5px", cursor: "pointer" }}
            />
            <div style={{ padding: "20px" }}>
               <p style={{ fontWeight: "700", fontSize: "2.2rem", marginTop: "80px", fontFamily: "'Source Sans Pro', Arial,sans-serif" }}>
                  {movie?.title} ({movie?.release_date.split("-")[0]})
               </p>
               <p>
                  <p
                     style={{
                        border: "1px solid #ddd",
                        fontWeight: "bold",
                        marginRight: "2px",
                        width: "20px",
                        textAlign: "center",
                        display: "inline-block",
                     }}
                  >
                     R
                  </p>
                  <span>{movie?.release_date}</span>
                  <span style={{ marginLeft: "10px" }}>{getGenres(movie?.genre_ids)}</span>
               </p>
               <p style={{ fontWeight: "bold", marginTop: "20px" }}>Overview</p>
               <p>{movie?.overview}</p>
            </div>
         </div>
      </div>
   );
};

export default MovieDetails;
