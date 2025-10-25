import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAllExams, addExam, updateExam, deleteExam } from '../apis/ExamApi';
import type { Exam } from '../types/type';

interface ExamState {
    list: Exam[];
    status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
    error: string | null;
}

const initialState: ExamState = {
    list: [],
    status: 'idle',
    error: null,
};

const ExamSlice = createSlice({
    name: 'exams',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllExams.pending, (state) => {
                state.status = 'pending';
                state.error = null;
            })
            .addCase(getAllExams.fulfilled, (state, action: PayloadAction<Exam[]>) => {
                state.status = 'fulfilled';
                state.list = action.payload;
            })
            .addCase(getAllExams.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload as string;
            })
            .addCase(addExam.pending, (state) => {
                state.status = 'pending';
                state.error = null;
            })
            .addCase(addExam.fulfilled, (state, action: PayloadAction<Exam>) => {
                state.status = 'fulfilled';
                state.list.push(action.payload);
            })
            .addCase(addExam.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload as string;
            })
            .addCase(updateExam.fulfilled, (state, action: PayloadAction<Exam>) => {
                state.status = 'fulfilled';
                const index = state.list.findIndex((exam) => exam.id === action.payload.id);
                if (index !== -1) {
                    state.list[index] = action.payload;
                }
            })
            .addCase(updateExam.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload as string;
            })
            .addCase(deleteExam.fulfilled, (state, action: PayloadAction<number>) => {
                state.status = 'fulfilled';
                state.list = state.list.filter((exam) => exam.id !== action.payload);
            })
            .addCase(deleteExam.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload as string;
            });
    },
});

export const examReducer = ExamSlice.reducer;
// export default examSlice.reducer;