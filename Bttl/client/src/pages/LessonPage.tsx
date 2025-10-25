import { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBars, faBell, faChevronRight, faPlusSquare, faSearch, faFilter, faCog, faGraduationCap, faUsers, faSignOutAlt, faCheckDouble, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import { Dropdown, Menu } from "antd";
import { useAppDispatch, useAppSelector } from "../hooks/Hook";
import { getAllCourses, updateCourse, deleteCourse, addLesson } from "../apis/CourseApi";
import Avatar from "../assets/avatar.svg";
import handleLogout from "../components/handleLogout";
import { Lesson } from "../types/type";
import LoadingProcess from '../components/LoadingProcess';
import LessonList from "./LessonList.tsx";

const LessonPage = () => {
    const { courseId } = useParams<{ courseId: string }>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { list: courses, status, error } = useAppSelector((state) => state.courses);
    const { currentUser } = useAppSelector((state) => state.user);
    const [showModal, setShowModal] = useState(false);
    const [lessonTitle, setLessonTitle] = useState("");
    const [timeLesson, setTimeLesson] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
    const [darkMode, setDarkMode] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState("");

    const course = courses.find((c) => c.id === Number(courseId));

    // useEffect(() => {
    //     dispatch(getAllCourses());
    // }, [dispatch]);
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

    const handleAddLesson = async () => {
        if (!lessonTitle || !timeLesson || !courseId) {
            alert("Vui lòng điền đầy đủ thông tin.")
            return
        }

        try {
            await dispatch(
                addLesson({
                    courseId: Number(courseId),
                    lesson: { name: lessonTitle, time: Number(timeLesson) }
                })
            ).unwrap()

            setShowModal(false)
            setLessonTitle("")
            setTimeLesson("")
        } catch (err) {
            console.error("Lỗi thêm bài học:", err)
            alert("Có lỗi xảy ra khi thêm bài học.")
        }
    }

    const handleConfirm = async () => {
        if (!course) return;
        try {
            await dispatch(
                updateCourse({
                    id: course.id,
                    title: course.title,
                    lessons: course.lessons,
                    numberLessons: course.numberLessons,
                    status: true,
                })
            ).unwrap();
            navigate("/courseManagement");
        } catch (error) {
            console.error("Failed to confirm course:", error);
            alert("An error occurred while confirming the course.");
        }
    };

    const handleDelete = async () => {
        if (!course) return;
        try {
            await dispatch(deleteCourse(course.id)).unwrap();
            navigate("/courseManagement");
        } catch (error) {
            console.error("Failed to delete course:", error);
            alert("An error occurred while deleting the course.");
        }
    };

    const handleCardClick = (lessonId: number | undefined) => {
        if (!lessonId || !course) {
            alert("Lesson ID or Course is missing.");
            return;
        }
        navigate(`/addDataForLesson/${course.id}/${lessonId}`);
    };

    const userMenu = (
        <Menu className="w-72 p-4 rounded-lg shadow-lg border border-gray-200">
            <Menu.Item key="user-info" disabled>
                <div className="flex items-center gap-4">
                    <img src={currentUser?.avatar || Avatar} className="w-10 h-10 rounded-full cursor-pointer" alt="Avatar" />
                    <div>
                        <h3 className="text-base font-semibold text-gray-800">{currentUser?.fullName}</h3>
                        <span className="text-sm text-gray-500">{currentUser?.email}</span>
                    </div>
                </div>
            </Menu.Item>
            <Menu.Item key="info">
                <Link to="/profileAdmin" className="text-gray-700 font-semibold hover:bg-gray-100 block px-2 py-1 rounded">
                    Thông Tin
                </Link>
            </Menu.Item>
            <Menu.Item key="signout">
        <span onClick={handleLogout} className="text-red-900 font-semibold hover:bg-gray-100 block px-2 py-1 rounded">
          Đăng xuất
        </span>
            </Menu.Item>
        </Menu>
    );

    if (status === "pending") return <LoadingProcess />;
    if (error) return <div className="p-6 text-red-600">{error}</div>;
    if (!course) return <div className="p-6">Course not found</div>;

    return (
        <div className={`font-[Poppins,sans-serif] m-0 p-0 box-border transition-colors duration-300 ${
                darkMode ? 'bg-[#37353E] text-[#FBFBFB]' : 'bg-[#eee] min-h-screen text-[#37353E]'
            }`}
        >
            <section className={`sidebar ${sidebarOpen ? '' : 'hide'} ${darkMode ? 'dark' : ''} before:content-[''] before:absolute before:w-10 before:h-10 before:-top-10 before:right-0 before:rounded-full ${
                    darkMode ? 'before:shadow-[20px_20px_0_#111]' : 'before:shadow-[20px_20px_0_#F9F9F9]'
                }`}
            >
                <Link to="#" className="flex items-center h-14 font-bold text-2xl sticky top-0 left-0 z-[500] pb-5 box-content text-[#6B7597]">
                    <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="60px" fill="#6a7698">
                        <path d="M480-120q-18 0-34.5-6.5T416-146L163-400h113l197 197q2 2 3.5 2.5t3.5.5q2 0 3.5-.5t3.5-2.5l267-268q23-23 35-54.5t12-64.5q-2-69-46-118.5T645-758q-31 0-59.5 12T536-711l-27 29q-5 6-13 9.5t-16 3.5q-8 0-16-3.5t-14-9.5l-27-29q-21-23-49-36t-60-13q-54 0-93.5 34.5T167-640H85q17-85 79.5-142.5T314-840q48 0 90.5 19t75.5 53q32-34 74.5-53t90.5-19q100 0 167.5 74T880-590q0 49-17 94t-51 80L543-146q-13 13-29 19.5t-34 6.5Zm-5-360H80v-80h555q17 0 28.5-11.5T675-600q0-17-11.5-28.5T635-640q-14 0-25 7.5T596-611l-77-21q11-39 43-63.5t73-24.5q50 0 85 35t35 85q0 50-35 85t-85 35h-47q3 10 5 19.5t2 20.5q0 50-35 85t-85 35q-41 0-73-24.5T359-408l77-21q3 14 14 21.5t25 7.5q17 0 28.5-11.5T515-440q0-17-11.5-28.5T475-480Zm9 0Z" />
                    </svg>
                    {sidebarOpen && <span className="ml-2">UniLife Hub</span>}
                </Link>
                <div className="menu top">
                    <div className="menu-item min-w-[40px] flex justify-center">
                        <Link to="#" className={`menu-link ${sidebarOpen ? '' : 'hide'} hover:text-[#7F88A8]`}>
                            <i className="bx bxs-dashboard !ml-2.5 flex min-w-[30px]"></i>
                            {sidebarOpen && <span>Dashboard</span>}
                        </Link>
                    </div>
                    <div className="menu-item">
                        <Link to="/categoryManagement" className={`menu-link group ${sidebarOpen ? '' : 'hide'} hover:text-[#7F88A8]`}>
                            <svg className="min-w-[40px] flex justify-center fill-current group-hover:text-[#6B7597]" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill={darkMode ? '#F9F9F9' : '#302E36'} viewBox="0 0 24 24">
                                <path d="M7 3a4 4 0 1 0 0 8 4 4 0 1 0 0-8M17 3a4 4 0 1 0 0 8 4 4 0 1 0 0-8M7 13a4 4 0 1 0 0 8 4 4 0 1 0 0-8M18 13h-2v3h-3v2h3v3h2v-3h3v-2h-3z"></path>
                            </svg>
                            {sidebarOpen && <span className="group-hover:text-[#6B7597]">Category</span>}
                        </Link>
                    </div>
                    <div className="menu-item">
                        <Link to="/testManagement" className={`menu-link group ${sidebarOpen ? '' : 'hide'}`}>
                            <svg className="min-w-[40px] flex justify-center fill-current group-hover:text-[#6B7597]" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill={darkMode ? '#F9F9F9' : '#302E36'} viewBox="0 0 24 24">
                                <path d="M4 2H2v19c0 .55.45 1 1 1h19v-2H4z"></path><path d="M7 10h11c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1H7c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1m10-2h-5V6h5zM8 6h2v2H8zM21 12H7c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1M8 14h6v2H8zm12 2h-4v-2h4z"></path>
                            </svg>
                            {sidebarOpen && <span className="group-hover:text-[#6B7597]">Test</span>}
                        </Link>
                    </div>
                    <div className="menu-item active">
                        <Link to={`/lesson/${courseId}`} className={`menu-link group ${sidebarOpen ? '' : 'hide'} flex items-center gap-2 text-[#6B7597] hover:text-[#7F88A8]`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="min-w-[40px] flex justify-center fill-current group-hover:text-[#7F88A8]">
                                <path d="M20 4h-8.59L10 2.59C9.63 2.22 9.11 2 8.59 2H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2M4 18v-8h16v8z" />
                            </svg>
                            {sidebarOpen && <span>Lessons</span>}
                        </Link>
                    </div>
                    <div className="menu-item">
                        <Link to="/studentManagement" className={`menu-link ${sidebarOpen ? '' : 'hide'} hover:text-[#7F88A8]`}>
                            <FontAwesomeIcon icon={faUsers} className="min-w-[40px] flex justify-center" />
                            {sidebarOpen && <span>Student</span>}
                        </Link>
                    </div>
                    <div className="menu-item">
                        <Link to="/examManagement" className={`menu-link ${sidebarOpen ? '' : 'hide'} hover:text-[#7F88A8]`}>
                            <FontAwesomeIcon icon={faGraduationCap} className="min-w-[40px] flex justify-center" />
                            {sidebarOpen && <span>Exam</span>}
                        </Link>
                    </div>
                </div>
                <div className="menu">
                    <div className="menu-item">
                        <Link to="#" className={`menu-link ${sidebarOpen ? '' : 'hide'} hover:text-[#7F88A8]`}>
                            <FontAwesomeIcon icon={faCog} className="min-w-[40px] flex justify-center" />
                            {sidebarOpen && <span>Settings</span>}
                        </Link>
                    </div>
                    <div className="menu-item">
                        <Link to="/login" className={`menu-link ${sidebarOpen ? '' : 'hide'} text-red-700 hover:text-red-800`} onClick={handleLogout}>
                            <FontAwesomeIcon icon={faSignOutAlt} className="min-w-[40px] flex justify-center" />
                            {sidebarOpen && <span>Logout</span>}
                        </Link>
                    </div>
                </div>
            </section>

            <section className={`relative transition-all duration-300 ease-in-out ${sidebarOpen ? "w-[calc(100%-280px)] left-[280px]" : "w-[calc(100%-60px)] left-[60px]"} max-[768px]:w-[calc(100%-60px)] max-[768px]:left-[60px]`}>
                <nav className={`h-14 px-6 flex items-center gap-6 font-[Lato,sans-serif] sticky top-0 left-0 z-[1000] ${darkMode ? 'bg-[#111]' : 'bg-[#F9F9F9]'} before:content-[''] before:absolute before:w-10 before:h-10 before:-bottom-10 before:left-0 before:rounded-full ${darkMode ? 'before:shadow-[-20px_-20px_0_#111]' : 'before:shadow-[-20px_-20px_0_#F9F9F9]'}`}>
                    <FontAwesomeIcon icon={faBars} className={`cursor-pointer ${darkMode ? 'text-[#FBFBFB]' : 'text-[#342E37]'}`} onClick={() => setSidebarOpen(!sidebarOpen)} />
                    <div className="flex items-center gap-[10px] ml-auto mr-5">
                        <input type="checkbox" id="switch-mode" hidden checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
                        <label htmlFor="switch-mode" className={`switch-toggle ${darkMode ? 'dark' : ''}`}></label>
                        <Link to="#" className={`text-xl relative ${darkMode ? 'text-[#FBFBFB]' : 'text-[#342E37]'}`}>
                            <FontAwesomeIcon icon={faBell} />
                            <span className={`absolute -top-[6px] -right-[6px] w-5 h-5 rounded-full border-2 font-bold text-xs flex justify-center items-center ${darkMode ? 'border-[#111] bg-[#6B7597] text-[#F9F9F9]' : 'border-[#F9F9F9] bg-[#6B7597] text-[#F9F9F9]'}`}>
                                8
                            </span>
                        </Link>
                        <Dropdown overlay={userMenu} trigger={['hover']}>
                            <img src={currentUser?.avatar || Avatar} alt="Avatar" className="w-10 h-10 rounded-full cursor-pointer object-cover" />
                        </Dropdown>
                    </div>
                </nav>

                <main className="w-full min-h-screen p-[36px_24px] font-[Poppins,sans-serif] max-h-[calc(100vh-56px)] overflow-y-auto">
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                        <div>
                            <h1 className="text-[36px] font-semibold mb-[10px]">Lesson Management</h1>
                            <div className="flex items-center gap-4">
                                <Link to="/courseManagement" className="text-[#AAAAAA] hover:text-[#6B7597]">Courses</Link>
                                <FontAwesomeIcon icon={faChevronRight} />
                                <span className="text-[#6B7597]">{course.title}</span>
                            </div>
                        </div>

                        <div className="flex gap-[10px]">
                            <button onClick={() => setShowModal(true)} className="px-5 py-3.5 rounded-[5px] cursor-pointer text-base bg-[#6B7597] text-[#F9F9F9] transition-all duration-300 hover:bg-[#565D7C] hover:text-[#F9F9F9] flex items-center gap-2">
                                <FontAwesomeIcon icon={faPlusSquare} />
                                Add New
                            </button>

                            <button onClick={handleConfirm} className="px-2.5 py-3.5 rounded-[5px] cursor-pointer text-sm border-2 border-[#6B7597] text-[#6B7597] bg-[#E4E6ED]  hover:bg-[#c8cbe0]  flex items-center gap-2"><FontAwesomeIcon icon={faCheckDouble} />Confirm Course</button>

                            <button onClick={handleDelete} className="px-2.5 py-3.5 rounded-[5px] cursor-pointer text-base bg-red-700 text-[#F9F9F9] transition-all duration-300 hover:bg-red-800 hover:text-[#F9F9F9] flex items-center gap-2">
                                <FontAwesomeIcon icon={faTrashAlt} />
                                Delete Course
                            </button>
                        </div>
                    </div>



                    <form className="w-full mr-auto mt-5">
                        <div className="flex items-center h-9 max-[576px]:h-8">
                            <input type="search" placeholder="Search..." className={`flex-grow px-4 h-full border-2 rounded-l-[36px] outline-none w-full transition-colors duration-300 max-[576px]:text-sm max-[576px]:px-3 max-[576px]:rounded-l-[28px] /* Co nhỏ trên mobile */
                                ${darkMode
                                ? "bg-[#302E36] border-[#888] text-[#F9F9F9] placeholder-[#B0B0B0]"
                                : "bg-gray-100 border-[#6B7597] text-[#302E36] placeholder-[#6B7597]"
                            }`}
                            />
                            <button type="submit" className={`w-9 h-full flex justify-center items-center text-lg border-none outline-none rounded-r-[36px] cursor-pointer transition-colors duration-300  max-[576px]:w-8 max-[576px]:rounded-r-[28px] max-[576px]:text-base 
                               ${darkMode
                                ? "bg-[#6B7597] text-[#F9F9F9]"
                                : "bg-[#6B7597] text-white"
                            }`}
                            >
                                <FontAwesomeIcon icon={faSearch} />
                            </button>
                        </div>
                    </form>

                    {/*Less list*/}
                    <LessonList
                        lessons={course.lessons}
                        searchValue={searchValue}
                        darkMode={darkMode}
                        onLessonClick={handleCardClick}
                        checkAllSubCollection={checkAllSubCollection}
                    />

                    {showModal && (
                        <div className="fixed inset-0 bg-black/50 z-[10000] flex items-start justify-center pt-5">
                            <div className="relative bg-white rounded-lg shadow-lg w-[500px] max-h-[90vh] overflow-y-auto animate-[fadeIn_0.3s_ease] z-[10001]">
                                <div className="flex justify-between items-center px-5 py-3 border-b border-gray-200">
                                    <h2 className="text-[18px] text-gray-800 font-semibold">Thêm bài học mới</h2>
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="p-1 cursor-pointer text-gray-500 hover:text-gray-800 transition-colors"
                                    >
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="p-5">
                                    <div className="mb-4">
                                        <label htmlFor="lessonTitle" className="block mb-2 text-[14px] font-medium text-gray-800">
                                            Tiêu đề bài học <span className="text-red-600">*</span>
                                        </label>
                                        <input
                                            id="lessonTitle"
                                            type="text"
                                            value={lessonTitle}
                                            onChange={(e) => setLessonTitle(e.target.value)}
                                            placeholder="Nhập tiêu đề bài học..."
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-[14px] focus:outline-none focus:border-[#6B7597] focus:ring-2 focus:ring-[#7F88A8]/20 transition"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="timeLesson" className="block mb-2 text-[14px] font-medium text-gray-800">
                                            Thời lượng (phút) <span className="text-red-600">*</span>
                                        </label>
                                        <input
                                            id="timeLesson"
                                            type="number"
                                            value={timeLesson}
                                            onChange={(e) => setTimeLesson(e.target.value)}
                                            placeholder="Nhập thời gian (phút)..."
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-[14px] focus:outline-none focus:border-[#6B7597] focus:ring-2 focus:ring-[#7F88A8]/20 transition"
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end gap-3 px-5 py-3 border-t border-gray-200">
                                    <button onClick={() => setShowModal(false)} className="cursor-pointer px-4 py-2 text-[14px] font-medium rounded-md border border-gray-300 bg-gray-100 text-gray-800 hover:bg-gray-200 transition">
                                        Hủy bỏ
                                    </button>
                                    <button onClick={handleAddLesson} className="px-4 py-2 text-[14px] cursor-pointer font-medium rounded-md bg-[#6B7597] text-white hover:bg-[#7F88A8] transition">
                                        Thêm mới
                                    </button>
                                </div>
                            </div>
                            <style>
                                {`
                                  @keyframes fadeIn {
                                    from { opacity: 0; transform: translateY(-20px); }
                                    to { opacity: 1; transform: translateY(0); }
                                  }
                                `}
                            </style>
                        </div>
                    )}
                </main>
            </section>
        </div>
    );
};

export default LessonPage;