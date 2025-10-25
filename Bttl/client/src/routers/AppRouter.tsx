import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import CategoryManagement from '../pages/CategoryManagement';
import ProtectedRoute from '../components/ProtectedRoute';
import CreateTest from '../pages/CreateTest.tsx';
import TestManagement from '../pages/TestManagement.tsx';
import QuizTest from '../pages/QuizTest.tsx';
import ProfilePage from '../components/ProfilePage.tsx';
import ProfileAdmin from '../components/ProfileAdmin.tsx';
import StudentManagement from '../pages/StudentManagement.tsx';
import CourseManagement from '../pages/CourseManagement.tsx';
import LessonPage from '../pages/LessonPage.tsx';
import AddDataForLesson from '../pages/AddDataForLesson.tsx';
import { HomePage } from '../pages/HomePage.tsx';
import BubbleGame from '../pages/BubbleGame.tsx';
import WatchTimer from '../pages/WatchTimer.tsx';
import Weather from '../pages/Weather.tsx';
import NoteBoard from '../pages/NoteBoard.tsx';
import LessonPage1 from '../pages/LessonPage1.tsx';
import { Video1 } from '../component1/Video1.tsx';
import { Video2 } from '../component1/Video2.tsx';
import {NewVoca} from '../component1/NewVoca.tsx';
import AllCourse from '../component1/AllCourse.tsx';
import Introduce from '../pages/Introduce.tsx';
import KaiwaAIChat from '../pages/KaiwaAIChat.tsx';
import NoteBook from '../pages/NoteBook.tsx';
import Calculate from '../pages/Calculate.tsx';
import { FeedbackForm } from '../pages/FeedbackForm.tsx';
import { Infor, Infor1, Infor10, Infor11, Infor2, Infor3, Infor4, Infor5, Infor6, Infor7, Infor8, Infor9 } from '../pages/Infor.tsx';
import FinalTest from '../component1/FinalTest.tsx';
import { NotFound } from '../pages/NotFound.tsx';
import Hiragana from '../component1/Hiragana.tsx';
import Katakana from '../component1/Katakana.tsx';
import CountNumber from '../component1/CountNumber.tsx';

export const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/homePage"
                    element={
                        <ProtectedRoute>
                            <HomePage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/bubbleGame"
                    element={
                        <ProtectedRoute>
                            <BubbleGame />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/watchTimer"
                    element={
                        <ProtectedRoute>
                            <WatchTimer />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/weather"
                    element={
                        <ProtectedRoute>
                            <Weather />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/noteBoard"
                    element={
                        <ProtectedRoute>
                            <NoteBoard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/noteBook"
                    element={
                        <ProtectedRoute>
                            <NoteBook />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/calculate"
                    element={
                        <ProtectedRoute>
                            <Calculate />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/introduce"
                    element={
                        <ProtectedRoute>
                            <Introduce />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/hiragana"
                    element={
                        <ProtectedRoute>
                            <Hiragana />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/katakana"
                    element={
                        <ProtectedRoute>
                            <Katakana />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/countNumber"
                    element={
                        <ProtectedRoute>
                            <CountNumber />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/finalTest"
                    element={
                        <ProtectedRoute>
                            <FinalTest />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/feedbackForm"
                    element={
                        <ProtectedRoute>
                            <FeedbackForm />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/infor"
                    element={
                        <ProtectedRoute>
                            <Infor />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/infor1"
                    element={
                        <ProtectedRoute>
                            <Infor1 />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/infor2"
                    element={
                        <ProtectedRoute>
                            <Infor2 />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/infor3"
                    element={
                        <ProtectedRoute>
                            <Infor3 />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/infor4"
                    element={
                        <ProtectedRoute>
                            <Infor4 />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/infor5"
                    element={
                        <ProtectedRoute>
                            <Infor5 />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/infor6"
                    element={
                        <ProtectedRoute>
                            <Infor6 />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/infor7"
                    element={
                        <ProtectedRoute>
                            <Infor7 />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/infor8"
                    element={
                        <ProtectedRoute>
                            <Infor8 />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/infor9"
                    element={
                        <ProtectedRoute>
                            <Infor9 />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/infor10"
                    element={
                        <ProtectedRoute>
                            <Infor10 />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/infor11"
                    element={
                        <ProtectedRoute>
                            <Infor11 />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/video"
                    element={
                        <ProtectedRoute>
                            <Video1 />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/flashcard"
                    element={
                        <ProtectedRoute>
                            <Video1 />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/test"
                    element={
                        <ProtectedRoute>
                            <Video1 />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/slide"
                    element={
                        <ProtectedRoute>
                            <Video1 />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/book"
                    element={
                        <ProtectedRoute>
                            <Video1 />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/audio"
                    element={
                        <ProtectedRoute>
                            <Video1 />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/video2"
                    element={
                        <ProtectedRoute>
                            <Video2 />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/newVoca"
                    element={
                        <ProtectedRoute>
                            <NewVoca />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/kaiwaAIChat"
                    element={
                        <ProtectedRoute>
                            <KaiwaAIChat />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/user/lesson/:courseId"
                    element={
                        <ProtectedRoute>
                            <LessonPage1 />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/allCourse"
                    element={
                        <ProtectedRoute>
                            <AllCourse />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/profilePage"
                    element={
                        <ProtectedRoute>
                            <ProfilePage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/profileAdmin"
                    element={
                        <ProtectedRoute>
                            <ProfileAdmin />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/categoryManagement"
                    element={
                        <ProtectedRoute>
                            <CategoryManagement />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/testManagement"
                    element={
                        <ProtectedRoute>
                            <TestManagement />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/studentManagement"
                    element={
                        <ProtectedRoute>
                            <StudentManagement />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/courseManagement"
                    element={
                        <ProtectedRoute>
                            <CourseManagement />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/lesson/:courseId"
                    element={
                        <ProtectedRoute>
                            <LessonPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/addDataForLesson/:courseId/:lessonId"
                    element={
                        <ProtectedRoute>
                            <AddDataForLesson />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/createTest"
                    element={
                        <ProtectedRoute>
                            <CreateTest />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/createTest/:id"
                    element={
                        <ProtectedRoute>
                            <CreateTest />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/quizTest/:id"
                    element={
                        <ProtectedRoute>
                            <QuizTest />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/quizExam/:id"
                    element={
                        <ProtectedRoute>
                            <QuizTest />
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};