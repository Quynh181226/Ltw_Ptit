import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Category, CategoriesState } from "../types/type";
import { getAllCategories, addCategory, editCategory, deleteCategory } from "../apis/CateApi";

const initialState: CategoriesState = {
    categories: [],
    loading: false,
    error: null,
};

const CategoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                getAllCategories.fulfilled,
                (state, action: PayloadAction<Category[]>) => {
                    state.loading = false;
                    state.categories = action.payload;
                }
            )
            .addCase(getAllCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch categories";
            })

            .addCase(addCategory.fulfilled, (state, action: PayloadAction<Category>) => {
                state.categories.push(action.payload);
            })

            .addCase(editCategory.fulfilled, (state, action: PayloadAction<Category>) => {
                const index = state.categories.findIndex(
                    (c) => c.id === action.payload.id
                );
                if (index !== -1) state.categories[index] = action.payload;
            })

            .addCase(deleteCategory.fulfilled, (state, action: PayloadAction<number>) => {
                state.categories = state.categories.filter(
                    (c) => c.id !== action.payload
                );
            });
    },
});

export const categoriesReducer = CategoriesSlice.reducer;
