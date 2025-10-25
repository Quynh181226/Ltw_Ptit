import { createAsyncThunk } from "@reduxjs/toolkit"
import axiosConfig from "../utils/axiosConfig"
import type { Exam } from "../types/type"

export const getAllExams = createAsyncThunk("exam/getAll", async () => {
    const res = await axiosConfig.get("api/exams")
    return res.data
})

export const addExam = createAsyncThunk("exam/add", async (newExam: Exam) => {
    const { id, ...examWithoutId } = newExam
    const res = await axiosConfig.post("api/exams", examWithoutId)
    return res.data
})

export const deleteExam = createAsyncThunk("exam/delete", async (id: number) => {
    await axiosConfig.delete(`api/exams/${id}`)
    return id
})

export const updateExam = createAsyncThunk("exam/update", async (exam: Exam) => {
    const res = await axiosConfig.put(`api/exams/${exam.id}`, exam)
    return res.data
})

export const getExam = createAsyncThunk("exam/get", async (id: number) => {
    const res = await axiosConfig.get(`api/exams/${id}`)
    return res.data
})
