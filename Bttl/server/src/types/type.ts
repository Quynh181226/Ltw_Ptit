export interface Category {
    id: number;
    name: string;
    image: string;
}

export type NewCategory = {
    name: string;
    image: string;
};

export interface Answer {
    id: number;
    questionId?: number;
    text: string;
    correct: boolean;
}

export interface Question {
    id: number;
    testId?: number;
    question: string;
    answers?: Answer[];
}

export interface Test {
    id: number;
    title: string;
    categoryId: number | null;
    duration: number;
    quesCnt: number;
    plays: number;
    quesDetail?: Question[];
}

export interface Course {
    id?: number;
    title: string;
    lessons: Lesson[];
    numberLessons: number;
    status: boolean;
    createdAt?: string;
}

export interface Lesson {
    id?: number;
    courseId: number;
    name: string;
    time: number;
    video?: any;
    document?: any;
    test?: any;
    pdf?: any;
    flash?: any;
    audio?: any;
    contents?: LessonContent[];
}

export interface Exam {
    id?: number;
    title: string;
    status: boolean;
    createdAt?: string;
    updatedAt?: string;
    exam?: ExamQuestion[];
}

export interface ExamQuestion {
    id?: number;
    examId: number;
    name: string;
    time: number;
    test1?: any; // Vocabulary test
    test2?: any; // Grammar test
    test3?: any; // Listening test
}

export interface Topic {
    id?: number;
    title: string;
    japanese: any;
    createdAt?: string;
}

export interface Result {
    id?: number;
    name: string;
    imgUrl?: string;
    birthDate?: string;
    overall: number;
    createdAt?: string;
}

export interface User {
    id: number | string;
    fullName: string;
    email: string;
    password: string;
    role: string;
    active: boolean;
    inactive: boolean;
    suspended: boolean;
    loginAttempts: number;
    lockUntil: string | number | null;
    waiting: boolean;
    avatar: string | null;
    phone?: string;
    gender?: string;
    birthDate?: string | null;
    class?: string;
}

export interface LessonContent {
    id?: number;
    lesson_id: number;
    type: "video" | "document" | "test" | "pdf" | "flash" | "audio";
    data: any;
    display_order?: number;
    created_at?: string;
}