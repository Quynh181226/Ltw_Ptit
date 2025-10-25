import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getAllTests, addTest, deleteTest, updateTest, getTest } from "../apis/TestApi";
import type { TestDetail, TestState } from "../types/type";

const initialState: TestState = {
    list: [],
    status: "idle",
    error: null,
    selectedTest: null
};

const TestsSlice = createSlice({
    name: "test",
    initialState,
    reducers: {
        setSelectedTest: (state, action: PayloadAction<TestDetail | null>) => {
            state.selectedTest = action.payload;
        },
        increasePlayCnt(state, action){
            const test=state.list.find(t=>t.id===action.payload);
            if(test) test.plays += 1;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllTests.pending, (state) => {
                state.status = "pending";
            })
            .addCase(getAllTests.fulfilled, (state, action: PayloadAction<TestDetail[]>) => {
                state.status = "success";
                state.list = action.payload;
            })
            .addCase(getAllTests.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Lỗi khi lấy danh sách test";
            })
            .addCase(addTest.fulfilled, (state, action: PayloadAction<TestDetail>) => {
                state.status = "success";
                state.list.push(action.payload);
                state.selectedTest = action.payload;
            })
            .addCase(deleteTest.fulfilled, (state, action: PayloadAction<number>) => {
                state.list = state.list.filter(t => t.id !== action.payload);
                if (state.selectedTest?.id === action.payload) {
                    state.selectedTest = null;
                }
            })
            .addCase(updateTest.fulfilled, (state, action: PayloadAction<TestDetail>) => {
                state.list = state.list.map(t => (t.id === action.payload.id ? action.payload : t));
                if (state.selectedTest?.id === action.payload.id) {
                    state.selectedTest = action.payload;
                }
            })
            .addCase(getTest.fulfilled, (state, action: PayloadAction<TestDetail>) => {
                state.selectedTest = action.payload;
            });
    },
});

export const { setSelectedTest } = TestsSlice.actions;
export const { increasePlayCnt } = TestsSlice.actions;
export const testsReducer = TestsSlice.reducer;