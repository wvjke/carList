import { configureStore } from "@reduxjs/toolkit";
import { carsReducer } from "./slices/cars";
import { themeReducer } from "./slices/theme";

const store = configureStore({
    reducer: {
        cars: carsReducer,
        theme: themeReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export default store;
