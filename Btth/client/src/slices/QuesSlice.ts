import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getAllQues, addQues, deleteQues, updateQues } from "../apis/QuesApi";
import type { Question, QuesState } from "../types/type";

const initialState: QuesState = {
    list: [],
    status: "idle",
    error: null,
};

const QuesSlice = createSlice({
    name: "ques",
    initialState,
    reducers: {
        resetQues: (state) => {
            state.list = [];
            state.status = "idle";
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllQues.pending, (state) => {
                state.status = "pending";
            })
            .addCase(getAllQues.fulfilled, (state, action: PayloadAction<Question[]>) => {
                state.status = "success";
                state.list = action.payload;
            })
            .addCase(getAllQues.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Lỗi khi lấy danh sách câu hỏi";
            })

            .addCase(addQues.fulfilled, (state, action: PayloadAction<Question>) => {
                state.list.push(action.payload);
            })

            .addCase(deleteQues.fulfilled, (state, action: PayloadAction<number>) => {
                state.list = state.list.filter((q) => q.id !== action.payload);
            })

            .addCase(updateQues.fulfilled, (state, action: PayloadAction<Question>) => {
                state.list = state.list.map((q) =>
                    q.id === action.payload.id ? action.payload : q
                );
            });
    },
});

export const { resetQues } = QuesSlice.actions;
export const quesReducer = QuesSlice.reducer;
