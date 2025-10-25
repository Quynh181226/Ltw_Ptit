// import Header1 from "../components/Header1";
// import Footer from "../components/Footer.tsx";
// import SectionAddTest from "../components/SectionAddTest.tsx";
// import HandleLogout from "../components/handleLogout.tsx";
import { useParams } from "react-router-dom";
// import { useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "../hooks/Hook";
import {getAllTests, getTest} from "../apis/TestApi";
import { setSelectedTest } from "../slices/TestsSlice";

import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTachometerAlt,
    faShoppingBag,
    faComments,
    faUsers,
    faGraduationCap,
    faCog,
    faSignOutAlt,
    faBars,
    faBell,
    faChevronRight,
    // faPlusSquare,
    // faSearch,
    // faFilter,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/d1.css"
import {Dropdown, Menu} from "antd";
import Avatar from "../assets/Avatar.svg";
// import SectionAddTest from "../components/SectionAddTest.tsx";
// import {useAppSelector} from "../hooks/Hook.ts";
// interface AdminProps {
//     onLogout: () => void;
//     // onSearch?: (text: string) => void;
// }


import { Form, Input, Select, InputNumber } from "antd";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import ModalAddEditQues from "./ModalAddEditQues";
// import TableQues from "./TableQues";
import type { RootState } from "../stores/Store";
import { useAppDispatch, useAppSelector } from "../hooks/Hook";
import { addTest, updateTest } from "../apis/TestApi";
import type { Question, TestDetail } from "../types/type";
import {toast} from "react-toastify";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusSquare} from "@fortawesome/free-solid-svg-icons";
import TableQues from "../components/TableQues.tsx";
import ModalAddEditQues from "../components/ModalAddEditQues.tsx";
import handleLogout from "../components/handleLogout.tsx";


const CreateTest = () => {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
    const [darkMode, setDarkMode] = useState<boolean>(false);
    const { currentUser } = useAppSelector((state) => state.user);
    const { id } = useParams<{ id?: string }>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { categories: categoryList } = useAppSelector((state) => state.categories);
    const { selectedTest, list: tests } = useAppSelector((state) => state.tests);

    const [modalOpen, setModalOpen] = useState(false);
    const [editQues, setEditQues] = useState<Question | null>(null);
    const [currTest, setCurrTest] = useState<TestDetail>({
        id: 0,
        title: "",
        categoryId: 0,
        duration: 0,
        quesCnt: 0,
        quesDetail: [],
        plays: 0,
    });
    const [form] = Form.useForm();
    const [testTitleErr, setTestTitleErr] = useState<string | null>(null);
    const [durationError, setDurationError] = useState<string | null>(null);

    // Tải danh sách test và chi tiết test khi có id
    useEffect(() => {
        // Tải danh sách test để validate title
        dispatch(getAllTests());
        if (id) {
            const testId = parseInt(id, 10);
            // Gọi getTest để lấy chi tiết test
            dispatch(getTest(testId));
        } else {
            // Reset khi tạo test mới
            dispatch(setSelectedTest(null));
        }
    }, [id, dispatch]);

    // Đồng bộ selectedTest với currTest
    useEffect(() => {
        if (selectedTest) {


            // Debug
            console.log("selectedTest:", selectedTest);
            setCurrTest({
                ...selectedTest,



                // Đảm bảo quesDetail là mảng
                quesDetail: selectedTest.quesDetail || [],
            });
            form.setFieldsValue({
                testName: selectedTest.title,
                category: selectedTest.categoryId,
                time: selectedTest.duration,
            });
        } else {
            setCurrTest({
                id: 0,
                title: "",
                categoryId: 0,
                duration: 0,
                quesCnt: 0,
                quesDetail: [],
                plays: 0,
            });
            form.resetFields();
        }

        // Debug dữ liệu
        console.log("currTest:", currTest);
    }, [selectedTest, form]);

    const handleAddQues = () => {
        setEditQues(null);
        setModalOpen(true);
    };

    const handleEditQues = (ques: Question) => {
        setEditQues(ques);
        setModalOpen(true);
    };

    const handleSaveQues = (updatedQues: Question[]) => {
        setCurrTest({
            ...currTest,
            quesDetail: updatedQues,
            quesCnt: updatedQues.length,
        });
        setModalOpen(false);
    };

    const handleDeleQues = (quesId: number) => {
        const updatedQues = currTest.quesDetail.filter((q) => q.id !== quesId);
        setCurrTest({
            ...currTest,
            quesDetail: updatedQues,
            quesCnt: updatedQues.length,
        });
    };

    const validateTestTitle = (value: string) => {
        if (!value || value.trim().length < 2) {
            setTestTitleErr("Test name must be >= 2 characters");
            return false;
        }
        if (
            tests.some(
                (t) =>
                    t.title.toLowerCase() === value.toLowerCase() &&
                    (!currTest || t.id !== currTest.id)
            )
        ) {
            setTestTitleErr("The test name already exists");
            return false;
        }
        setTestTitleErr(null);
        return true;
    };

    const validateDuration = (val: number) => {
        if (!val || val <= 0 || val > 120) {
            setDurationError("WatchTimer.tsx must be 1-120 minutes");
            return false;
        }
        setDurationError(null);
        return true;
    };

    const onFinish = async (values: any) => {
        const questionsList = currTest.quesDetail || [];
        if (questionsList.length === 0) {
            toast.error("The test requires at least one question");
            return;
        }

        const isTitleValid = validateTestTitle(values.testName);
        const isDurationValid = validateDuration(values.time);

        if (!isTitleValid || !isDurationValid) {
            return;
        }

        const testData: TestDetail = {
            id: currTest.id,
            title: values.testName,
            categoryId: values.category,
            duration: values.time,
            quesCnt: questionsList.length,
            quesDetail: questionsList,
            plays: currTest.plays || 0,
        };

        try {
            if (currTest.id === 0) {
                await dispatch(addTest(testData)).unwrap();
                toast.success("Test created success!!");
            } else {
                await dispatch(updateTest(testData)).unwrap();
                toast.success("Test updated success!!");
            }
            navigate("/testManagement");
        } catch (err: any) {
            toast.error(`Error saving test: ${err.message}`);
        }
    };

    const userMenu = (
        <Menu className="w-72 p-4 rounded-lg shadow-lg border border-gray-200">
            <Menu.Item key="user-info" disabled>
                <div className="flex items-center gap-4">
                    <img
                        src={currentUser?.avatar || Avatar}
                        className="w-10 h-10 rounded-full cursor-pointer"
                        alt="Avatar"
                    />
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
            <Menu.Item key="signout" className="flex flex-row gap-2">
                <span
                    onClick={handleLogout}
                    className="text-red-900 font-semibold hover:bg-gray-100 block px-2 py-1 rounded"
                >
                    Đăng xuất
                </span>
            </Menu.Item>
        </Menu>
    );

    return (
        <div
            className={`min-h-screen font-[Poppins,sans-serif] m-0 p-0 box-border transition-colors duration-300 ${
                darkMode ? "bg-[#37353E] text-[#FBFBFB]" : "bg-[#eee] min-h-screen text-[#342E37]"
            }`}
        >
            <section
                className={`
                sidebar ${sidebarOpen ? "" : "hide"} ${
                    darkMode ? "dark" : ""
                } before:content-[''] before:absolute before:w-10 before:h-10 before:-top-10 before:right-0 before:rounded-full ${
                    darkMode
                        ? "before:shadow-[20px_20px_0_#111]"
                        : "before:shadow-[20px_20px_0_#F9F9F9]"
                }`}
            >
                <Link
                    to="#"
                    className="flex items-center h-14 font-bold text-2xl sticky top-0 left-0 z-[500] pb-5 box-content text-[#6B7597]"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="60px" fill="#6a7698"><path d="M480-120q-18 0-34.5-6.5T416-146L163-400h113l197 197q2 2 3.5 2.5t3.5.5q2 0 3.5-.5t3.5-2.5l267-268q23-23 35-54.5t12-64.5q-2-69-46-118.5T645-758q-31 0-59.5 12T536-711l-27 29q-5 6-13 9.5t-16 3.5q-8 0-16-3.5t-14-9.5l-27-29q-21-23-49-36t-60-13q-54 0-93.5 34.5T167-640H85q17-85 79.5-142.5T314-840q48 0 90.5 19t75.5 53q32-34 74.5-53t90.5-19q100 0 167.5 74T880-590q0 49-17 94t-51 80L543-146q-13 13-29 19.5t-34 6.5Zm-5-360H80v-80h555q17 0 28.5-11.5T675-600q0-17-11.5-28.5T635-640q-14 0-25 7.5T596-611l-77-21q11-39 43-63.5t73-24.5q50 0 85 35t35 85q0 50-35 85t-85 35h-47q3 10 5 19.5t2 20.5q0 50-35 85t-85 35q-41 0-73-24.5T359-408l77-21q3 14 14 21.5t25 7.5q17 0 28.5-11.5T515-440q0-17-11.5-28.5T475-480Zm9 0Z"/></svg>

                    {/*UniLife Hub*/}
                    {sidebarOpen && <span className="ml-2">UniLife Hub</span>}
                </Link>

                <div className="menu top">
                    <div className="menu-item min-w-[40px] flex justify-center">
                        <Link
                            to="#"
                            className={`menu-link ${sidebarOpen ? "" : "hide"} hover:text-[#7F88A8] ${
                                darkMode ? "dark" : ""
                            }`}
                        >
                            {/*<FontAwesomeIcon*/}
                            {/*    icon={faComments}*/}
                            {/*    className="min-w-[40px] flex justify-center"*/}
                            {/*/>*/}
                            <i className="bx bxs-dashboard !ml-2.5 flex min-w-[30px]"></i>

                            {sidebarOpen && <span>Dashboard</span>}
                        </Link>
                    </div>
                    <div className="menu-item">
                        <Link
                            to="/categoryManagement"
                            className={`menu-link group ${sidebarOpen ? "" : "hide"} ${
                                darkMode ? "dark" : ""
                            }`}
                        >
                            <svg
                                className="min-w-[40px] flex justify-center fill-black group-hover:fill-[#6B7597] transition-colors duration-200"
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                            >
                                <path d="M7 3a4 4 0 1 0 0 8 4 4 0 1 0 0-8M17 3a4 4 0 1 0 0 8 4 4 0 1 0 0-8M7 13a4 4 0 1 0 0 8 4 4 0 1 0 0-8M18 13h-2v3h-3v2h3v3h2v-3h3v-2h-3z"></path>
                            </svg>
                            {sidebarOpen && (
                                <span className="group-hover:text-[#6B7597] transition-colors duration-200">
                                Category
                              </span>
                            )}
                        </Link>
                    </div>

                    <div className="menu-item active">
                        <Link
                            to="/testManagement"
                            className={`menu-link ${sidebarOpen ? "" : "hide"}  text-[#6B7597] ${
                                darkMode ? "dark" : ""
                            }`}
                        >
                            {/*<FontAwesomeIcon*/}
                            {/*    icon={faComments}*/}
                            {/*    className="min-w-[40px] flex justify-center"*/}
                            {/*/>*/}
                            <svg className="min-w-[40px] flex justify-center"  xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                 fill="#6B7597" viewBox="0 0 24 24" >
                                <path d="M4 2H2v19c0 .55.45 1 1 1h19v-2H4z"></path><path d="M7 10h11c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1H7c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1m10-2h-5V6h5zM8 6h2v2H8zM21 12H7c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1M8 14h6v2H8zm12 2h-4v-2h4z"></path>
                            </svg>
                            {sidebarOpen && <span>Question</span>}
                        </Link>
                    </div>
                    <div className="menu-item">
                        <Link
                            to="/studentManagement"
                            className={`menu-link ${sidebarOpen ? "" : "hide"} hover:text-[#7F88A8] ${
                                darkMode ? "dark" : ""
                            }`}
                        >
                            <FontAwesomeIcon
                                icon={faUsers}
                                className="min-w-[40px] flex justify-center"
                            />
                            {sidebarOpen && <span>Student</span>}
                        </Link>
                    </div>
                    <div className="menu-item">
                        <Link
                            to="/examManagement"
                            className={`menu-link ${sidebarOpen ? "" : "hide"} hover:text-[#7F88A8] ${
                                darkMode ? "dark" : ""
                            }`}
                        >
                            <FontAwesomeIcon
                                icon={faGraduationCap}
                                className="min-w-[40px] flex justify-center"
                            />
                            {sidebarOpen && <span>Exam</span>}
                        </Link>
                    </div>
                </div>

                <div className="menu">
                    <div className="menu-item">
                        <Link
                            to="#"
                            className={`menu-link ${sidebarOpen ? "" : "hide"} hover:text-[#7F88A8]  ${
                                darkMode ? "dark" : ""
                            }`}
                        >
                            <FontAwesomeIcon
                                icon={faCog}
                                className="min-w-[40px] flex justify-center"
                            />
                            {sidebarOpen && <span>Settings</span>}
                        </Link>
                    </div>
                    <div className="menu-item">
                        <Link
                            to="/login"
                            className={`menu-link ${sidebarOpen ? "" : "hide"} text-red-700 hover:text-red-800 ${
                                darkMode ? "dark" : ""
                            }`}







                            onClick={handleLogout}
                        >
                            <FontAwesomeIcon
                                icon={faSignOutAlt}
                                className="min-w-[40px] flex justify-center"
                            />
                            {sidebarOpen && <span>Logout</span>}
                        </Link>
                    </div>
                </div>
            </section>

            <section
                className={`relative transition-all duration-300 ease-in-out ${
                    sidebarOpen
                        ? "w-[calc(100%-280px)] left-[280px]"
                        : "w-[calc(100%-60px)] left-[60px]"
                } max-[768px]:w-[calc(100%-60px)] max-[768px]:left-[200px]`}
            >
                {/* NAVBAR */}
                <nav
                    className={`h-14 px-6 flex items-center gap-6 font-[Lato,sans-serif] sticky top-0 left-0 z-[1000] ${
                        darkMode ? "bg-[#111]" : "bg-[#F9F9F9]"
                    } before:content-[''] before:absolute before:w-10 before:h-10 before:-bottom-10 before:left-0 before:rounded-full ${
                        darkMode
                            ? "before:shadow-[-20px_-20px_0_#111]"
                            : "before:shadow-[-20px_-20px_0_#F9F9F9]"
                    }`}
                >
                    <FontAwesomeIcon
                        icon={faBars}
                        className={`cursor-pointer ${darkMode ? "text-[#FBFBFB]" : "text-[#342E37]"}`}
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    />
                    <div className="flex items-center gap-[10px] ml-auto mr-5">
                        <input
                            type="checkbox"
                            id="switch-mode"
                            hidden
                            checked={darkMode}
                            onChange={() => setDarkMode(!darkMode)}
                        />
                        <label
                            htmlFor="switch-mode"
                            className={`switch-toggle ${darkMode ? "dark" : ""}`}
                        ></label>
                        <Link to="#" className={`text-xl relative ${darkMode ? "text-[#FBFBFB]" : "text-[#342E37]"}`}>
                            <FontAwesomeIcon icon={faBell} />
                            <span
                                className={`absolute -top-[6px] -right-[6px] w-5 h-5 rounded-full border-2 font-bold text-xs flex justify-center items-center ${
                                    darkMode
                                        ? "border-[#111] bg-[#6B7597] text-[#F9F9F9]"
                                        : "border-[#F9F9F9] bg-[#6B7597] text-[#F9F9F9]"
                                }`}
                            >
                8
              </span>
                        </Link>
                        {/*<Link to="#" className="relative">*/}
                        {/*    <img*/}
                        {/*        src="../img/quanmario.png"*/}
                        {/*        alt="profile"*/}
                        {/*        className="w-9 h-9 object-cover rounded-full"*/}
                        {/*    />*/}
                        {/*</Link>*/}
                        <Dropdown overlay={userMenu} trigger={['hover']}>
                            {/*<Avatar*/}
                            {/*    size={40}*/}
                            {/*    icon={<FontAwesomeIcon icon={faUser} />}*/}
                            {/*    className="cursor-pointer"*/}
                            {/*/>*/}
                            {/*<div*/}
                            {/*    className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-400  cursor-pointer hover:bg-gray-400 transition"*/}
                            {/*>*/}
                            {/*    /!*<FontAwesomeIcon icon={faUser} className="text-lg" />*!/*/}
                            {/*    /!*<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343"><path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"/></svg>*!/*/}
                            {/*    <svg xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="30px" fill="#434343"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17-62.5t47-43.5q60-30 124.5-46T480-440q67 0 131.5 16T736-378q30 15 47 43.5t17 62.5v112H160Zm320-400q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm160 228v92h80v-32q0-11-5-20t-15-14q-14-8-29.5-14.5T640-332Zm-240-21v53h160v-53q-20-4-40-5.5t-40-1.5q-20 0-40 1.5t-40 5.5ZM240-240h80v-92q-15 5-30.5 11.5T260-306q-10 5-15 14t-5 20v32Zm400 0H320h320ZM480-640Z"/></svg>*/}
                            {/*</div>*/}
                            <img
                                src={currentUser?.avatar || Avatar}
                                alt="Avatar"
                                className="w-10 h-10 rounded-full cursor-pointer object-cover"
                            />
                        </Dropdown>
                    </div>
                </nav>

                {/* MAIN */}
                <main className="w-full p-[36px_24px] font-[Poppins,sans-serif] max-h-[calc(100vh-56px)] overflow-y-auto">
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                        <div>
                            <h1 className="text-[36px] font-semibold mb-[10px]">Test</h1>
                            <div className="flex items-center gap-4">
                                <span className="text-[#AAAAAA] pointer-events-none">Test detail</span>
                                <FontAwesomeIcon icon={faChevronRight} />
                                <Link to="/testManagement" className="text-[#6B7597]">
                                    Test
                                </Link>
                            </div>
                        </div>
                        {/*<div className="flex gap-[10px]">*/}
                        {/*    /!*<Link*!/*/}
                        {/*    /!*    to="#"*!/*/}
                        {/*    /!*    className="px-5 py-[10px] rounded-[5px] text-base bg-[#6B7597] text-[#F9F9F9] transition-all duration-300 hover:bg-[#84ea71] hover:text-[#F9F9F9] flex items-center gap-2"*!/*/}
                        {/*    /!*>*!/*/}

                        {/*    <button*/}
                        {/*        onClick={() => {*/}
                        {/*            setCode("Add");*/}
                        {/*            setSelectedCategory(undefined);*/}
                        {/*            setOpenAddEdit(true);*/}
                        {/*        }}*/}
                        {/*        className="px-5 py-[10px] rounded-[5px] cursor-pointer text-base bg-[#6B7597] text-[#F9F9F9] transition-all duration-300 hover:bg-[#84ea71] hover:text-[#F9F9F9] flex items-center gap-2"*/}
                        {/*    >*/}
                        {/*        <FontAwesomeIcon icon={faPlusSquare} />*/}
                        {/*        Add New</button>*/}
                        {/*    /!*</Link>*!/*/}
                        {/*</div>*/}
                    </div>

                    {/*<form className="w-full mr-auto mt-5">*/}
                    {/*    /!*<div className="flex items-center h-9">*!/*/}
                    {/*    /!*    <input*!/*/}
                    {/*    /!*        type="search"*!/*/}
                    {/*    /!*        placeholder="Search..."*!/*/}
                    {/*    /!*        className="flex-grow px-4 h-full border-2 border-[#6B7597] bg-[#eee] rounded-[36px_0_0_36px] outline-none w-full max-[576px]:hidden"*!/*/}
                    {/*    /!*    />*!/*/}
                    {/*    /!*    <button*!/*/}
                    {/*    /!*        type="submit"*!/*/}
                    {/*    /!*        className="w-9 h-full flex justify-center items-center bg-[#6B7597] text-[#F9F9F9] text-lg border-none outline-none rounded-[0_36px_36px_0] cursor-pointer max-[576px]:bg-transparent max-[576px]:text-[#342E37] max-[576px]:w-auto max-[576px]:h-auto form-[.show]:w-9 form-[.show]:h-full form-[.show]:bg-[#DB504A] form-[.show]:text-[#F9F9F9] form-[.show]:rounded-[0_36px_36px_0]"*!/*/}
                    {/*    /!*    >*!/*/}
                    {/*    /!*        <FontAwesomeIcon icon={faSearch} />*!/*/}
                    {/*    /!*    </button>*!/*/}
                    {/*    /!*</div>*!/*/}
                    {/*</form>*/}

                    <div className="flex flex-wrap gap-6 mt-6 w-full">
                        <div
                            className={`flex-grow basis-[500px] rounded-[20px] p-6 ${
                                darkMode ? "bg-[#302E36]" : "bg-[#F9F9F9]"
                            }`}
                        >
                            {/*<div className="flex justify-end gap-4 mb-6 min-w-[420px]">*/}
                            {/*    /!*<h3 className="mr-auto text-2xl font-semibold">Category Management</h3>*!/*/}
                            {/*    <FontAwesomeIcon icon={faSearch} className="cursor-pointer" />*/}
                            {/*    <FontAwesomeIcon icon={faFilter} className="cursor-pointer" />*/}
                            {/*</div>*/}
                            <section className={`content ${darkMode ? "text-[#F9F9F9]" : "text-[#342E37]"}`}>



                                {/*<div className="lg:px-30 px-12">*/}
                                {/*    <SectionAddTest />*/}
                                {/*</div>*/}

                                <h2 className="text-2xl font-semibold mb-4">
                                    {currTest.id ? "Edit the test" : "Create the test"}
                                </h2>

                                <Form form={form} layout="vertical" className="space-y-4" onFinish={onFinish}>
                                    <Form.Item
                                        label={<span className={darkMode ? "text-[#F9F9F9]" : "text-gray-700"}>Test name</span>}
                                        name="testName"
                                        validateStatus={testTitleErr ? "error" : ""}
                                        help={testTitleErr}
                                    >
                                        <Input
                                            size="large"
                                            placeholder="Fill in the test name"
                                            onChange={(e) => validateTestTitle(e.target.value)}
                                            className={darkMode ? "bg-[#2A282F] border-gray-600 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-[#6B7597]" : "bg-white border-gray-300 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-500"}
                                        />
                                    </Form.Item>

                                    <div className="flex gap-4">
                                        <Form.Item
                                            label={<span className={darkMode ? "text-[#F9F9F9]" : "text-gray-700"}>Category</span>}
                                            name="category"
                                        >
                                            <Select
                                                placeholder="Select category"
                                                size="large"
                                                className={darkMode ? "bg-[#2A282F] border-gray-600 text-gray-200" : "bg-white border-gray-300 text-gray-700"}
                                            >
                                                {categoryList.map(c => (
                                                    <Select.Option key={c.id} value={c.id}>
                                                        <div className="flex items-center">
                                                            <img src={c.image} alt={c.name} className="w-6 h-6 mr-2 object-cover" />
                                                            {c.name}
                                                        </div>
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                        </Form.Item>

                                        <Form.Item
                                            label={<span className={darkMode ? "text-[#F9F9F9]" : "text-gray-700"}>Time (minutes)</span>}
                                            name="time"
                                            validateStatus={durationError ? "error" : ""}
                                            help={durationError}
                                        >
                                            <InputNumber
                                                min={1}
                                                max={120}
                                                size="large"
                                                className={`w-full ${darkMode ? "bg-[#2A282F] border-gray-600 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-[#6B7597]" : "bg-white border-gray-300 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-500"}`}
                                                onChange={(val) => validateDuration(val as number)}
                                            />
                                        </Form.Item>
                                    </div>

                                    <h3 className="text-xl font-semibold mt-6">Question Management</h3>
                                    <div className="flex justify-between mb-6">
                                        <div className="flex gap-[10px]">
                                            <button
                                                onClick={handleAddQues}
                                                type="button"
                                                className={`px-5 py-[10px] rounded-[5px] cursor-pointer text-base transition-all duration-300 flex items-center gap-2 ${
                                                    darkMode ? "bg-[#6B7597] text-[#F9F9F9] hover:bg-[#565D7C]" : "bg-[#6B7597] text-[#F9F9F9] hover:bg-[#565D7C]"
                                                }`}
                                            >
                                                <FontAwesomeIcon icon={faPlusSquare} />
                                                Add Question
                                            </button>
                                        </div>
                                        <button
                                            type="submit"
                                            className={`px-5 py-[10px] rounded-[5px] cursor-pointer text-base transition-all duration-300 flex items-center gap-2 ${
                                                darkMode ? "bg-[#6B7597] text-[#F9F9F9] hover:bg-[#565D7C]" : "bg-[#6B7597] text-[#F9F9F9] hover:bg-[#565D7C]"
                                            }`}
                                        >
                                            Save test
                                        </button>
                                    </div>
                                </Form>

                                <TableQues
                                    testId={currTest.id}
                                    questions={currTest.quesDetail}
                                    onEdit={handleEditQues}
                                    darkMode={darkMode}
                                    onDelete={currTest.id === 0 ? handleDeleQues : undefined}
                                />

                                {modalOpen && (
                                    <ModalAddEditQues
                                        open={modalOpen}
                                        onClose={() => setModalOpen(false)}
                                        testData={currTest}
                                        editData={editQues}
                                        onSave={handleSaveQues}
                                    />
                                )}




                            </section>
                        </div>
                    </div>
                </main>
            </section>
        </div>
    );
};

export default CreateTest;