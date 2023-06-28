import { configureStore } from "@reduxjs/toolkit";
import { carsReducer } from "./slices/cars";

const store = configureStore({
    reducer: {
        cars: carsReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export default store;
