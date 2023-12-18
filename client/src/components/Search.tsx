import { useState } from "react";
//import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
//import { movieSearched, movieFailure } from "../redux/movieSlice";
import { TypeMovie } from "../common/types";

function Search() {
   //const dispatch = useDispatch();
   const [search, setSearch] = useState("");
   // const { searhResult } = useSelector((state: any) => state.movie);
   const [searhResult, setSearhResult] = useState<TypeMovie[]>([]);
   const [loading, setLoading] = useState(false);

   const onSearchHandler = () => {
      setSearhResult([]);
      setLoading(true);
      

      let encodedSearchTerm = search;
      axios
         .get(`/api/v1/search/movies?with_genres=${encodedSearchTerm}`)
         .then((response) => {
            //dispatch(movieSearched(response.data));
            console.log(response.data.data);
            setSearhResult(response.data.data);
            setLoading(false);
         })
         .catch((err) => {
            //dispatch(movieFailure(err?.response?.data?.message));
            setSearhResult([]);
            setLoading(false);
         });
   };

   return (
      <div style={{ marginTop: "25px" }}>
         <input
            type="text"
            placeholder="Search"
            style={{ border: "1px solid #ddd", fontWeight: "bold", padding: "5px 10px", marginRight: "3px" }}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
         />
         <button type="button" style={{ border: "1px solid #ddd", fontWeight: "bold", padding: "5px 10px" }} onClick={onSearchHandler}>
            Search
         </button>
         <div className="flex flex-wrap gap-3">
            {loading && <h1>Loading...</h1>}
            {!loading &&
               searhResult &&
               searhResult.length > 0 &&
               searhResult?.map((movie: TypeMovie) => (
                  <Link to={`/movie-details/${movie.id}`}>
                     <img
                        src={
                           movie.poster_path
                              ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                              : "https://t3.ftcdn.net/jpg/04/62/93/66/360_F_462936689_BpEEcxfgMuYPfTaIAOC1tCDurmsno7Sp.jpg"
                        }
                        alt={movie.title}
                        key={movie.id}
                        width={"250px"}
                        style={{ marginTop: "20px", borderRadius: "5px", cursor: "pointer", border: "1px solid #ddd", height: "350px" }}
                     />
                  </Link>
               ))}
         </div>
      </div>
   );
}

export default Search;
