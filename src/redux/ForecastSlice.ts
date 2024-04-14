import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { forecastDATA } from "../Interface/ForecastData";

interface ForecastState {
  forecastData: forecastDATA | null;
  loading: boolean;
  error: string | null;
}

const initialState: ForecastState = {
  forecastData: null,
  loading: false,
  error: null,
};

export const fetchForecastData = createAsyncThunk<forecastDATA, {lat:number,lon:number}>(
  "forecastData",
  async ({lat,lon}) => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${
        import.meta.env.VITE_API_KEY
      }`
    );
    console.log(lat,lon)
    console.log(response.data)
    return response.data;
    
  }
);

const ForecastSlice = createSlice({
  name: "ForecastData",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchForecastData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchForecastData.fulfilled, (state, action) => {
        state.loading = false;
        state.forecastData = action.payload;
        state.error = null;
      })
      .addCase(fetchForecastData.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload
          ? action.payload.toString()
          : "Failed to fetch data";
      });
  },
});

export default ForecastSlice.reducer;
