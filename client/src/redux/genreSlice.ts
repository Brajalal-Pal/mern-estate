import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = { genres: [], loading: false, error: null };

const genreSlice = createSlice({
   name: "genre",
   initialState,
   reducers: {
      load: (state) => {
         state.loading = true;
      },
      success: (state, action: PayloadAction<any>) => {
         state.genres = action.payload;
         state.loading = false;
         state.error = null;
      },
      failure: (state, action: PayloadAction<any>) => {
         state.error = action.payload;
         state.loading = false;
      },
   },
});

export const { load, success, failure } = genreSlice.actions;
export default genreSlice.reducer;
