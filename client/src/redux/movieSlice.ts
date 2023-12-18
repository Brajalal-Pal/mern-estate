import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = { movies: [], loading: false, error: null, searhResult: [] };

const movieSlice = createSlice({
   name: "movie",
   initialState,
   reducers: {
      loadMovie: (state) => {
         state.loading = true;
      },
      movieSuccess: (state, action: PayloadAction<any>) => {
         state.movies = action.payload;
         state.loading = false;
         state.error = null;
      },
      movieSearched: (state, action: PayloadAction<any>) => {
         state.searhResult = action.payload;
         state.loading = false;
         state.error = null;
      },
      movieFailure: (state, action: PayloadAction<any>) => {
         state.error = action.payload;
         state.loading = false;
      },
   },
});

export const { loadMovie, movieSuccess, movieSearched, movieFailure } = movieSlice.actions;
export default movieSlice.reducer;
