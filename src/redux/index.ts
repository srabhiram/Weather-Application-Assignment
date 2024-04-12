import { configureStore } from "@reduxjs/toolkit";
import CitySlice from "./CitySlice";

const store = configureStore({
    reducer: CitySlice
})
export default store;