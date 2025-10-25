import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosConfig from "../utils/axiosConfig";
import type { Category, TestDetail } from "../types/type";

export const fetchTests = createAsyncThunk("dashboard/fetchTests", async () => {
      const response = await axiosConfig.get<TestDetail[]>("api/tests");
      return response.data;
    }
);

export const fetchCategories = createAsyncThunk(
    "dashboard/fetchCategories",
    async () => {
      const response = await axiosConfig.get<Category[]>("api/categories");
      return response.data;
    }
);

// export const increasePlays= createAsyncThunk("", (id: number)=>{
//     try {
//
//     }
// })

export const increasePlays = async (testId: number, currentPlays: number) => {
    try {
        const response = await axiosConfig.patch(`api/tests/${testId}`, {
            plays: currentPlays + 1,
        });
        return response.data;
    } catch (error) {
        console.error("Error increasing plays:", error);
        throw error;
    }
};
