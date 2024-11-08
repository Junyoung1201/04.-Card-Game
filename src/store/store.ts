import { configureStore } from "@reduxjs/toolkit";
import { gameSlice } from "./game";

export const store = configureStore({
    reducer: {
        game: gameSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>