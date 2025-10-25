import { configureStore } from "@reduxjs/toolkit";
import {userReducer} from "../slices/UserSlice.ts";
import {categoriesReducer} from '../slices/CategoriesSlice.ts';
import {testsReducer} from "../slices/TestsSlice.ts";
import {quesReducer} from "../slices/QuesSlice.ts";
import {courseReducer} from "../slices/CourseSlice.ts";
import {examReducer} from "../slices/ExamSlice.ts";
// import {topicReducer} from "../slices/TopicSlice.ts";


export const Store = configureStore({
    reducer: {
        user: userReducer,
        categories: categoriesReducer,
        tests: testsReducer,
        ques: quesReducer,
        courses: courseReducer,
        exams: examReducer,
        // topics: topicReducer
    },
    // devTools: true,
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;