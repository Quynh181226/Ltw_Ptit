import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosConfig from "../utils/axiosConfig";
import type { TestDetail } from "../types/type";

export const getAllTests = createAsyncThunk("test/getAll", async () => {
    const res = await axiosConfig.get("api/tests");
    return res.data;
});

export const addTest = createAsyncThunk("test/add", async (newTest: TestDetail) => {
    const { id, ...testWithoutId } = newTest;
    const res = await axiosConfig.post("api/tests", testWithoutId);
    return res.data;
});

export const deleteTest = createAsyncThunk("test/delete", async (id: number) => {
    await axiosConfig.delete(`api/tests/${id}`);
    return id;
});

export const updateTest = createAsyncThunk("test/update", async (test: TestDetail) => {
    const res = await axiosConfig.put(`api/tests/${test.id}`, test);
    return res.data;
});

export const getTest = createAsyncThunk("test/get", async (id: number)=>{
    const res=await axiosConfig.get(`api/tests/${id}`);


    console.log("API response for getTest:", res.data);


    return res.data;
})
