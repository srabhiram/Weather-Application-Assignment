import { configureStore } from "@reduxjs/toolkit";
import CitySlice from "./CitySlice";
import WeatherSLice from "./WeatherSLice";

const store = configureStore({
    reducer: {CitySlice,WeatherSLice}
})
export type IRootState = ReturnType<typeof store.getState>
export default store;