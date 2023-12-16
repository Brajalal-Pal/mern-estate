// import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import axios from "axios";
import { Link } from "react-router-dom";

// import { load, success, failure } from "../redux/genreSlice";
import { TypeGenre } from "../common/types";

function Genre() {
   //    const dispatch = useDispatch();
   //    const [genres, setGenres] = useState<TypeGenre[]>([]);
   const { genres } = useSelector((state: any) => state.genre);

   console.log(genres);

   //    useEffect(() => {
   //       const loadGenres = async () => {
   //          dispatch(load());
   //          axios
   //             .get("/api/v1/movie/genres")
   //             .then((response) => {
   //                dispatch(success(response.data));
   //                setGenres(response.data.data);
   //             })
   //             .catch((err) => {
   //                dispatch(failure(err?.response?.data?.message));
   //                setGenres([]);
   //             });
   //       };

   //       loadGenres();
   //       return () => {
   //          setGenres([]);
   //       };
   //    }, []);

   return (
      <div style={{ width: "90%", marginLeft: "auto", marginRight: "auto" }}>
         <h1 className="text-3xl font-semibold text-center my-7">Popular Movie Genres</h1>
         <div className="flex flex-wrap gap-3">
            {genres.data.map((genre: TypeGenre) => (
               <Link to={`/movies-by-genre/${genre.id}`} key={genre.id}>
                  {genre.name}
               </Link>
            ))}
         </div>
      </div>
   );
}

export default Genre;
