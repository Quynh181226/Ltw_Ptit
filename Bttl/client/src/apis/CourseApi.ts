import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../utils/axiosConfig'
import type { Course } from '../types/type'

export const getAllCourses = createAsyncThunk(
    'courses/getAllCourses',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get('api/courses');
            return res.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

export const addCourse = createAsyncThunk(
    'courses/addCourse',
    async (course: Omit<Course, 'id' | 'createdAt'>, { rejectWithValue }) => {
        try {
            const res = await axios.post('api/courses', course)
            return res.data
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || err.message)
        }
    }
)

export const updateCourse = createAsyncThunk(
    'courses/updateCourse',
    async (course: Course, { rejectWithValue }) => {
        try {
            if (!course.id) throw new Error('Course ID is missing')
            const res = await axios.put(`api/courses/${course.id}`, course)
            return res.data
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || err.message)
        }
    }
)

export const deleteCourse = createAsyncThunk(
    'courses/deleteCourse',
    async (id: number | undefined, { rejectWithValue }) => {
        try {
            if (!id) throw new Error('Course ID is missing')
            await axios.delete(`api/courses/${id}`)
            return id
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || err.message)
        }
    }
)

export const addLesson = createAsyncThunk(
    'courses/addLesson',
    async (
        { courseId, lesson }: { courseId: number; lesson: { name: string; time: number } },
        { rejectWithValue }
    ) => {
        try {
            const res = await axios.post(`api/courses/${courseId}/lessons`, lesson)
            return { courseId, lesson: res.data }
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || err.message)
        }
    }
)

export const addLessonContent = createAsyncThunk(
    'courses/addLessonContent',
    async (
        { courseId, lessonId, type, data }: { courseId: number; lessonId: number; type: string; data: any },
        { rejectWithValue }
    ) => {
        try {
            const res = await axios.post(`/api/courses/${courseId}/lessons/${lessonId}/contents`, {
                type,
                data,
            });
            return { courseId, lessonId, type, data: res.data };
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

export const updateLessonContent = createAsyncThunk(
    'courses/updateLessonContent',
    async (
        { courseId, lessonId, type, data }: { courseId: number; lessonId: number; type: string; data: any },
        { rejectWithValue }
    ) => {
        try {
            const res = await axios.put(`/api/courses/${courseId}/lessons/${lessonId}/contents`, {
                type,
                data,
            });
            return { courseId, lessonId, type, data: res.data };
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);