import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CityData } from "../Interface/Types";
import axios from "axios";

interface Citystate {
  data: CityData[];
  loading: boolean;
  error: string | null;
}

const initialState: Citystate = {
  data: [],
  loading: true,
  error: null,
};

export const fetchCityData = createAsyncThunk(
  "data/fetchCiityData",
  async () => {
    const response = await axios.get(
      "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=100&refine=cou_name_en%3A%22India%22"
    );
    return response.data.results;
  }
);

const citySlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCityData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCityData.fulfilled, (state, action: PayloadAction<CityData[]>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCityData.rejected, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch data';
      });
  },
});

export default citySlice.reducer;
