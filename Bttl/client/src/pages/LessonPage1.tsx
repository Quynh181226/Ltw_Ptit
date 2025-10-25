import { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/Hook";
import { getAllCourses } from "../apis/CourseApi";
import { Lesson } from "../types/type";
import LoadingProcess from '../components/LoadingProcess';
// import Header from "../components/Header";
import Footer from "../components/Footer";
import handleLogout from "../components/handleLogout";
import {BiChevronLeft, BiChevronRight} from "react-icons/bi";
import Header2 from "../components/Header2.tsx";
import Footer1 from "../components/Footer1.tsx";

const LessonPage1 = () => {
    const { courseId } = useParams<{ courseId: string }>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { list: courses, status, error } = useAppSelector((state) => state.courses);
    const { currentUser } = useAppSelector((state) => state.user);

    const course = courses.find((c) => c.id === Number(courseId));

    useEffect(() => {
        if (courses.length === 0) {
            dispatch(getAllCourses());
        }
    }, [dispatch, courses.length]);

    const checkAllSubCollection = (dataLesson: Lesson[], i: number): [number, number, number] => {
        let percentCourse = 0;
        const fields: (keyof Lesson)[] = ["video", "document", "test", "pdf", "flash", "audio"];
        fields.forEach((field) => {
            if (dataLesson[i][field] && Object.keys(dataLesson[i][field]!).length > 0) {
                percentCourse += 100 / 6;
            }
        });
        const video = dataLesson[i].video && Object.keys(dataLesson[i].video!).length > 0 ? 1 : 0;
        const test = dataLesson[i].test && Object.keys(dataLesson[i].test!).length > 0 ? 1 : 0;
        return [Math.round(percentCourse), video, test];
    };

    const handleCardClick = (lessonId: number | undefined) => {
        if (!lessonId || !course) {
            // alert("Lesson ID or Course is missing.");
            return;
        }
        navigate(`/learn/${course.id}/${lessonId}`);
    };

    if (status === "pending") return <LoadingProcess />;
    // if (error) return <div className="p-6 text-red-600">{error}</div>;
    if (!course) return <div className="p-6">Course not found</div>;

    return (
       <>
           <Header2 onLogout={handleLogout} />
           <div className="bg-[#FAFBFC]">
               <main className="ml-20 mr-20]">
                   <div className="flex items-center justify-between gap-4 flex-wrap mb-6">
                       <div>
                           <h1 className="text-[33px] font-semibold mb-[10px]">{course.title}</h1>
                           <div className="flex items-center gap-2">
                               <div className="flex items-centertext-gray-300">
                                   <BiChevronLeft />
                                   <BiChevronRight />
                               </div>
                               <Link to="/homePage" className="text-[#AAAAAA] hover:text-[#6B7597]">Trang chủ</Link>
                               <span>/</span>
                               <Link to="/homePage" className="text-[#AAAAAA] hover:text-[#6B7597]">Khóa học</Link>
                               <span>/</span>
                               <span className="text-[#6B7597]">{course.title}</span>
                           </div>
                       </div>
                   </div>

                   {/* Lesson List */}
                   <div className="flex flex-wrap mt-6 w-full">
                       <div className="flex-grow basis-[500px] rounded-[20px] p-6 ">
                           <section className="content flex flex-wrap items-center justify-center gap-[10%]">
                               {course.lessons.map((lesson, index) => {
                                   const [progress, video, test] = checkAllSubCollection(course.lessons, index);
                                   return (
                                       <Link to="/video"
                                           key={`${course.id}-${lesson.id || index}`}
                                           onClick={() => handleCardClick(lesson.id)}
                                           className="cursor-pointer border border-sky-100 mb-3 mt-5 w-[345px] h-43 bg-white rounded-lg shadow-[0_4px_8px_rgba(0,0,0,0.1)] p-4 text-left transition-all duration-300 hover:border hover:border-[#6B7597] hover:-translate-y-1 hover:shadow-[0_6px_12px_rgba(0,0,0,0.15)]"
                                       >
                                           <div className="text-sm text-[#646464] mb-2">Bài học</div>
                                           <div className="text-xl font-semibold text-[#555] mb-3">{lesson.name}</div>
                                           <div className="text-sm text-[#666] mb-4">
                                               {video} Video • {lesson.time} phút • {test} bài test
                                           </div>
                                           <div className="flex items-start gap-4">
                                               <div className="flex-1 bg-[#d9e6f5] rounded overflow-hidden mb-2 h-[10px] w-1/2">
                                                   <div
                                                       className="h-full rounded-lg transition-width duration-300 border-[3.5px] border-[#6B7597] bg-[#6B7597]"
                                                       style={{ width: `${progress}%` }}
                                                   />
                                               </div>
                                               <div className="text-sm font-bold text-[#6B7597] ml-[5px] whitespace-nowrap mb-[5px]">
                                                   {progress}% hoàn thành
                                               </div>
                                           </div>
                                       </Link>
                                   );
                               })}
                           </section>
                       </div>
                   </div>
               </main>
               <div className="mt-115"></div>
               <Footer1 />
           </div>
       </>
    );
};

export default LessonPage1;