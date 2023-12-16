import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { load, success, failure } from "../redux/genreSlice";
import { TypeGenre } from "../common/types";

function Home() {
   const dispatch = useDispatch();
   const [genres, setGenres] = useState<TypeGenre[]>([]);

   useEffect(() => {
      const loadGenres = async () => {
         dispatch(load());
         axios
            .get("/api/v1/movie/genres")
            .then((response) => {
               dispatch(success(response.data));
               setGenres(response.data.data);
            })
            .catch((err) => {
               dispatch(failure(err?.response?.data?.message));
               setGenres([]);
            });
      };

      loadGenres();
      return () => {
         setGenres([]);
      };
   }, []);

   return (
      <div style={{ width: "90%", marginLeft: "auto", marginRight: "auto" }}>
         <h1 className="text-3xl font-semibold text-center my-7">Popular Movie Genres</h1>
         <div className="flex flex-wrap gap-3">
            {genres.map((genre: TypeGenre) => (
               <Link to={`/genre-details/${genre.id}`} key={genre.id}>
                  {genre.name}
               </Link>
            ))}
         </div>
      </div>
   );
}

export default Home;
