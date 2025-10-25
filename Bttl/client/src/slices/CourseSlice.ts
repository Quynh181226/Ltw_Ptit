import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {getAllCourses, addCourse, updateCourse, deleteCourse, addLesson, addLessonContent, updateLessonContent} from '../apis/CourseApi';
import type { Course, Lesson, LessonContent } from '../types/type';

type LessonContentType = "video" | "document" | "test" | "pdf" | "flash" | "audio";

interface CourseState {
    list: Course[];
    status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
    error: string | null;
}

const initialState: CourseState = {
    list: [],
    status: 'idle',
    error: null,
};

const CourseSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Handle getAllCourses
            .addCase(getAllCourses.pending, (state) => {
                state.status = 'pending';
                state.error = null;
            })
            .addCase(getAllCourses.fulfilled, (state, action: PayloadAction<Course[]>) => {
                state.status = 'fulfilled';
                state.list = action.payload;
            })
            .addCase(getAllCourses.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload as string;
            })

            // Handle addCourse
            .addCase(addCourse.pending, (state) => {
                state.status = 'pending';
                state.error = null;
            })
            .addCase(addCourse.fulfilled, (state, action: PayloadAction<Course>) => {
                state.status = 'fulfilled';
                state.list.push(action.payload);
            })
            .addCase(addCourse.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload as string;
            })

            .addCase(updateCourse.fulfilled, (state, action: PayloadAction<Course>) => {
                state.status = 'fulfilled';
                const index = state.list.findIndex((course) => course.id === action.payload.id);
                if (index !== -1) {
                    state.list[index] = action.payload;
                }
            })
            .addCase(updateCourse.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload as string;
            })

            .addCase(deleteCourse.fulfilled, (state, action: PayloadAction<number>) => {
                state.status = 'fulfilled';
                state.list = state.list.filter((course) => course.id !== action.payload);
            })
            .addCase(deleteCourse.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload as string;
            })

            // Handle addLesson
            .addCase(addLesson.fulfilled, (state, action: PayloadAction<{ courseId: number; lesson: Lesson }>) => {
                state.status = 'fulfilled';
                const { courseId, lesson } = action.payload;
                const course = state.list.find((c) => c.id === courseId);
                if (course && lesson.id) {
                    course.lessons = [...(course.lessons || []), lesson];
                    course.numberLessons = (course.numberLessons || 0) + 1;
                }
            })
            .addCase(addLesson.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload as string;
            })

            // Handle addLessonContent
            // .addCase(addLessonContent.fulfilled, (state, action: PayloadAction<{ courseId: number; lessonId: number; type: string; data: any }>) => {
            //     state.status = 'fulfilled';
            //     const course = state.list.find((c) => c.id === action.payload.courseId);
            //     if (course) {
            //         const lesson = course.lessons.find((l) => l.id === action.payload.lessonId);
            //         if (lesson) {
            //             if (!lesson.contents) lesson.contents = [];
            //             lesson.contents.push({ ...action.payload.data, type: action.payload.type });
            //         }
            //     }
            // })
            .addCase(addLessonContent.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                const { courseId, lessonId, type, data } = action.payload;
                const course = state.list.find((c) => c.id === courseId);
                if (course) {
                    const lesson = course.lessons.find((l) => l.id === lessonId);
                    if (lesson) {
                        if (!lesson.contents) lesson.contents = [];
                        lesson.contents.push({ lesson_id: lessonId, type: type as LessonContentType, data });
                    }
                }
            })
            .addCase(addLessonContent.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload as string;
            })
            .addCase(updateLessonContent.fulfilled, (state, action: PayloadAction<{ courseId: number; lessonId: number; type: string; data: any }>) => {
                state.status = 'fulfilled';
                const { courseId, lessonId, type, data } = action.payload;
                const course = state.list.find((c) => c.id === courseId);

                if (course) {
                    const lesson = course.lessons.find((l) => l.id === lessonId);
                    if (lesson) {
                        if (!lesson.contents) lesson.contents = [];

                        const existingContentIndex = lesson.contents.findIndex((c: LessonContent) => c.type === type);

                        if (existingContentIndex !== -1) {
                            lesson.contents[existingContentIndex] = {
                                ...lesson.contents[existingContentIndex],
                                data
                            };
                        } else {
                            lesson.contents.push({ lesson_id: lessonId, type: type as LessonContentType, data });
                        }
                    }
                }
            })
            .addCase(updateLessonContent.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload as string;
            })
    },
});

export const courseReducer = CourseSlice.reducer;