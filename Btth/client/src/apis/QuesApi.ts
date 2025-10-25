import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosConfig from "../utils/axiosConfig";
import type { Question, TestDetail } from "../types/type";

export const getAllQues = createAsyncThunk<Question[], number>(
    "ques/getAll",
    async (testId) => {
        const res = await axiosConfig.get(`api/tests/${testId}`);
        return res.data.quesDetail || [];
    }
);

export const addQues = createAsyncThunk<Question, { testId: number; newQues: Question }>(
    "ques/add",
    async ({ testId, newQues }) => {
        const testRes = await axiosConfig.get(`api/tests/${testId}`);
        const test: TestDetail = testRes.data;

        const updatedTest: TestDetail = {
            ...test,
            quesDetail: [...(test.quesDetail || []), newQues],
            quesCnt: (test.quesDetail?.length || 0) + 1,
        };

        await axiosConfig.put(`api/tests/${testId}`, updatedTest);
        return newQues;
    }
);

export const deleteQues = createAsyncThunk<number, { testId: number; quesId: number }>(
    "ques/delete",
    async ({ testId, quesId }) => {
        const testRes = await axiosConfig.get(`api/tests/${testId}`);
        const test: TestDetail = testRes.data;

        const updatedTest: TestDetail = {
            ...test,
            quesDetail: (test.quesDetail || []).filter((q) => q.id !== quesId),
            quesCnt: Math.max((test.quesDetail?.length || 1) - 1, 0),
        };

        await axiosConfig.put(`api/tests/${testId}`, updatedTest);
        return quesId;
    }
);

export const updateQues = createAsyncThunk<Question, { testId: number; ques: Question }>(
    "ques/update",
    async ({ testId, ques }) => {
        const testRes = await axiosConfig.get(`api/tests/${testId}`);
        const test: TestDetail = testRes.data;

        const updatedTest: TestDetail = {
            ...test,
            quesDetail: (test.quesDetail || []).map((q) =>
                q.id === ques.id ? ques : q
            ),
        };

        await axiosConfig.put(`api/tests/${testId}`, updatedTest);
        return ques;
    }
);
