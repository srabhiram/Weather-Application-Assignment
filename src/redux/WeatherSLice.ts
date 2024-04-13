import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { weatherData } from "../Interface/weather";

interface WeatherState {
  weatherData: weatherData | null;
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState= {
  weatherData: null,
  loading: false,
  error: null,
};

export const fetchweatherData = createAsyncThunk<weatherData>(
  "weatherData",
  async () => {
    const response = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?id=1253095&appid=${
        import.meta.env.VITE_API_KEY
      }`
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
        state.loading = false;
        state.error = action.payload
          ? action.payload.toString()
          : "Failed to fetch data";
      });
  },
});

export default WeatherSlice.reducer;
