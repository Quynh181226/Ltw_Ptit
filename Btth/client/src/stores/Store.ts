import { configureStore } from "@reduxjs/toolkit";
import {userReducer} from "../slices/UserSlice.ts";
import {categoriesReducer} from '../slices/CategoriesSlice.ts';
import {testsReducer} from "../slices/TestsSlice.ts";
import {quesReducer} from "../slices/QuesSlice.ts";


export const Store = configureStore({
    reducer: {
        user: userReducer,
        categories: categoriesReducer,
        tests: testsReducer,
        ques: quesReducer
    },
    // devTools: true,
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;