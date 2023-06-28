import { ICar } from "./../../Components/CarList/types";
import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface ICarState {
    cars: {
        items: ICar[];
        filteredItems: ICar[];
        status: "loading" | "loaded" | "error";
    };
}

export const fetchCars = createAsyncThunk("cars/fetchCars", async () => {
    const { data } = await axios.get(
        "https://cars-791d0-default-rtdb.europe-west1.firebasedatabase.app/cars.json"
    );
    return data.filter((item: ICar) => item);
});

const initialState: ICarState = {
    cars: {
        items: [],
        filteredItems: [],
        status: "loading",
    },
};

const carsSlice = createSlice({
    name: "cars",
    initialState,
    reducers: {
        filterCars: (state, action: PayloadAction<string>) => {
            state.cars.filteredItems = state.cars.items.filter((item) =>
                item.company
                    .toLowerCase()
                    .includes(action.payload.toLowerCase())
            );
        },
        deleteCar: (state, action: PayloadAction<number>) => {
            state.cars.items = state.cars.items.filter(
                (item) => item.id !== action.payload
            );
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCars.pending, (state: ICarState) => {
            state.cars.items = [];
            state.cars.status = "loading";
        }),
            builder.addCase(
                fetchCars.fulfilled,
                (state: ICarState, action: PayloadAction<ICar[]>) => {
                    state.cars.items = action.payload;
                    state.cars.status = "loaded";
                }
            ),
            builder.addCase(fetchCars.rejected, (state: ICarState) => {
                state.cars.items = [];
                state.cars.status = "error";
            });
    },
});

export const { filterCars, deleteCar } = carsSlice.actions;
export const carsReducer = carsSlice.reducer;
