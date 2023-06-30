import { createSlice } from "@reduxjs/toolkit";

export type Theme = "light" | "dark";

export interface ITheme {
    activeTheme: Theme;
}

const initialState: ITheme = {
    activeTheme: localStorage.getItem("theme") === "dark" ? "dark" : "light",
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        changeActiveTheme: (state) => {
            state.activeTheme === "dark"
                ? ((state.activeTheme = "light"),
                  localStorage.setItem("theme", "light"))
                : ((state.activeTheme = "dark"),
                  localStorage.setItem("theme", "dark"));
            localStorage;
        },
    },
});

export const { changeActiveTheme } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
