// import { createAsyncThunk } from '@reduxjs/toolkit';
// import axios from '../utils/axiosConfig';
// import type { Topic } from '../types/type';
//
// export const getAllTopics = createAsyncThunk(
//     'topics/getAllTopics',
//     async (_, { rejectWithValue }) => {
//         try {
//             const res = await axios.get('/api/topics');
//             return res.data;
//         } catch (err: any) {
//             return rejectWithValue(err.response?.data?.message || err.message);
//         }
//     }
// );
//
// export const addTopic = createAsyncThunk(
//     'topics/addTopic',
//     async ({ title, japanese }: { title: string; japanese: any }, { rejectWithValue }) => {
//         try {
//             const res = await axios.post('/api/topics', { title, japanese });
//             return res.data;
//         } catch (err: any) {
//             return rejectWithValue(err.response?.data?.message || err.message);
//         }
//     }
// );
//
// export const updateTopic = createAsyncThunk(
//     'topics/updateTopic',
//     async ({ id, title, japanese }: { id: number; title: string; japanese: any }, { rejectWithValue }) => {
//         try {
//             const res = await axios.put(`/api/topics/${id}`, { title, japanese });
//             return res.data;
//         } catch (err: any) {
//             return rejectWithValue(err.response?.data?.message || err.message);
//         }
//     }
// );
//
// export const deleteTopic = createAsyncThunk(
//     'topics/deleteTopic',
//     async (id: number, { rejectWithValue }) => {
//         try {
//             await axios.delete(`/api/topics/${id}`);
//             return id;
//         } catch (err: any) {
//             return rejectWithValue(err.response?.data?.message || err.message);
//         }
//     }
// );