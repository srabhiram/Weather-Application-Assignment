import { configureStore } from "@reduxjs/toolkit";
import CitySlice from "./CitySlice";
import WeatherSLice from "./WeatherSLice";
import ForecastSlice from "./ForecastSlice";

const store = configureStore({
    reducer: {CitySlice,WeatherSLice,ForecastSlice}
})
export type IRootState = ReturnType<typeof store.getState>
export default store;