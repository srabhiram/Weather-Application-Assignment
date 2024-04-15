import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CityData } from "../Interface/CityData";

interface CityState {
  data: CityData[];
  loading: boolean;
  error: string | null;
}

const initialState: CityState = {
  data: [],
  loading: true,
  error: null,
};

export const fetchCityData = createAsyncThunk<CityData[]>(
  "data/fetchCityData",
  async () => {
    const response = await axios.get(
      "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=100"
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
      .addCase(fetchCityData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchCityData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? action.payload.toString()
          : "Failed to fetch data";
      });
  },
});

export default citySlice.reducer;
