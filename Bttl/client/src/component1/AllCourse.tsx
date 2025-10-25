import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/Hook";
import { getAllCourses } from "../apis/CourseApi";
import LoadingProcess from '../components/LoadingProcess';
import Header from "../components/Header";
// import Footer from "../components/Footer";
import handleLogout from "../components/handleLogout";
import CourseCard1 from "../components/CourseCard1.tsx";
// import ChevronContainer from "../assets/ChevronContainer.svg";
import {BiChevronLeft, BiChevronRight} from "react-icons/bi";
import Footer1 from "../components/Footer1.tsx";

const AllCourse = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { list: courses, status, error } = useAppSelector((state) => state.courses);

    useEffect(() => {
        dispatch(getAllCourses());
    }, [dispatch]);

    if (status === "pending") return <LoadingProcess />;
    // if (error) return <div className="p-6 text-red-600">{error}</div>;

    return (
        <>
            <Header onLogout={handleLogout} />
            <div className="bg-[#FAFBFC]">
                <main className="ml-20 mr-20">
                    <div className="flex items-center justify-between gap-4 flex-wrap mb-6">
                        <div>
                            <h1 className="text-[33px] font-semibold mb-[10px]">Tất cả khóa học</h1>
                            <div className="flex items-center gap-2">
                                <div className="flex items-centertext-gray-300">
                                    <BiChevronLeft />
                                    <BiChevronRight />
                                </div>
                                <Link to="/homePage" className="text-[#AAAAAA] hover:text-[#6B7597]">Trang chủ</Link>
                                <span>/</span>
                                <span className="text-[#6B7597]">Khóa học</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-15">
                        {courses.map((course: any) => (
                            <CourseCard1
                                key={course.id}
                                course={course}
                                onClick={() => {
                                    localStorage.setItem('IdCourse', course.id.toString());
                                    navigate(`/user/lesson/${course.id}`);
                                }}
                            />
                        ))}
                    </div>
                </main>
                <Footer1 />
            </div>
        </>
    );
};

export default AllCourse;
