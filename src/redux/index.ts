import { configureStore } from "@reduxjs/toolkit";
import CitySlice from "./CitySlice";

const store = configureStore({
    reducer: CitySlice
})
export type IRootState = ReturnType<typeof store.getState>
export default store;