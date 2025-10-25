export interface Category {
    id: number;
    name: string;
    image: string;
}

export interface Answer {
    id: number;
    questionId: number;
    text: string;
    correct: boolean;
}

export interface Question {
    id: number;
    testId: number;
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
    lockUntil: string | null;
    waiting: boolean;
    avatar: string | null;
    phone?: string;
    gender?: string;
    birthDate?: string | null;
    class?: string;
}