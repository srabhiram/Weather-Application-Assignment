import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { weatherData } from "../Interface/WeatherData";

interface WeatherState {
  weatherData: weatherData | null;
  loading: boolean;
  error: string | null;
}
const initialState: WeatherState = {
  weatherData: null,
  loading: false,
  error: null,
};

export const fetchweatherData = createAsyncThunk<weatherData, {lat:number,lon:number}>(
  "weatherData",
  async ({lat,lon}) => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${
        import.meta.env.VITE_API_KEY
      }&units=metric`
    );
    return response.data;
  }
);

const WeatherSlice = createSlice({
  name: "weatherData",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchweatherData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchweatherData.fulfilled, (state, action) => {
        state.loading = false;
        state.weatherData = action.payload;
        state.error = null;
      })
      .addCase(fetchweatherData.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload
          ? action.payload.toString()
          : "Failed to fetch data";
      });
  },
});

export default WeatherSlice.reducer;
