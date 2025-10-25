import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import CategoryManagement from "../pages/CategoryManagement";
import ProtectedRoute from "../components/ProtectedRoute";
import CreateTest from "../pages/CreateTest.tsx";
import TestManagement from "../pages/TestManagement.tsx";
import QuizTest from "../pages/QuizTest.tsx";
import ProfilePage from "../components/ProfilePage.tsx";
// import LessonList.tsx from "../pages/Courses.tsx";
import ProfileAdmin from "../components/ProfileAdmin.tsx";
import StudentManagement from "../pages/StudentManagement.tsx";
import {NotFound} from "../pages/NotFound.tsx";

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard"
                       element={
                           <ProtectedRoute>
                               <Dashboard />
                           </ProtectedRoute>
                       }
                />
                <Route path="/profilePage"
                       element={
                           <ProtectedRoute>
                               <ProfilePage />
                           </ProtectedRoute>
                       }
                />
                <Route path="/profileAdmin"
                       element={
                           <ProtectedRoute>
                               <ProfileAdmin />
                           </ProtectedRoute>
                       }
                />
                {/*<Route path="/course"*/}
                {/*       element={*/}
                {/*           <ProtectedRoute>*/}
                {/*               <LessonList.tsx />*/}
                {/*           </ProtectedRoute>*/}
                {/*       }*/}
                {/*/>*/}
                <Route path="/categoryManagement"
                       element={
                           <ProtectedRoute>
                               <CategoryManagement />
                           </ProtectedRoute>
                       }
                />
                <Route path="/testManagement"
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
                <Route path="/createTest"
                       element={
                           <ProtectedRoute>
                               <CreateTest />
                           </ProtectedRoute>
                       }
                />
                {/*???????*/}
                <Route path="/createTest/:id"
                       element={
                           <ProtectedRoute>
                               <CreateTest />
                           </ProtectedRoute>
                       }
                />
                <Route path="/quizTest/:id"
                       element={
                           <ProtectedRoute>
                               <QuizTest />
                           </ProtectedRoute>
                       }
                />
                <Route path="/quizExam/:id"
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

export default AppRouter;