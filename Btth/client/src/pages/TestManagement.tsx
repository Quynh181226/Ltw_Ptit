// import Header1 from '../components/Header1';
// import { Button } from "antd";
import TableTest from "../components/TableTest.tsx";
import "../styles/testmana.css";
// import HandleLogout from "../components/handleLogout.tsx";
// import { useState } from "react";
import {useNavigate} from "react-router-dom";
import { useState } from "react";
// import { Button } from "antd";
// import TableCategory from "../components/TableCategory";
// import ModalAddEditCategory from "../components/ModalAddEditCategory";
// import ModalDeleteCategory from "../components/ModalDeleteCategory";
// import type { Category } from "../types/type";
// import Header1 from "../components/Header1";
// import Footer from "../components/Footer";
// import HandleLogout from "../components/handleLogout.tsx";
import { useAppSelector } from "../hooks/Hook";
// import {getAllCategories} from "../apis/CateApi.ts";
// import LoadingProcess from "../components/LoadingProcess.tsx";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
    faPlusSquare,
    faSearch,
    faFilter,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/d1.css"
import {Dropdown, Menu} from "antd";
import Avatar from "../assets/Avatar.svg";
import handleLogout from "../components/handleLogout.tsx";
// import {useAppSelector} from "../hooks/Hook.ts";
// interface AdminProps {
//     onLogout: () => void;
//     // onSearch?: (text: string) => void;
// }
const TestManagement = () => {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
    const [darkMode, setDarkMode] = useState<boolean>(false);

    const { currentUser } = useAppSelector((state) => state.user);


    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");




    const userMenu = (
        <Menu className="w-72 p-4 rounded-lg shadow-lg border border-gray-200">
            <Menu.Item key="user-info" disabled>
                <div className="flex items-center gap-4">
                    {/*<Avatar*/}

                    {/*   */}
                    {/*/>*/}
                    <img
                        src={currentUser?.avatar || Avatar}
                        className="w-10 h-10 rounded-full cursor-pointer"
                        // src="/assets/avatar.svg"
                        // size={40}
                        // icon={<FontAwesomeIcon icon={faUser} />}
                    >
                    </img>
                    <div>
                        {/*CHO NAY CAN CHECK LAI currentUser?.fullName*/}
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
                <span onClick={handleLogout}
                      className="text-red-900 font-semibold hover:bg-gray-100 block px-2 py-1 rounded">

                    {/*<i className='bx bxs-log-out'></i>*/}




                    Đăng xuất
                </span>
            </Menu.Item>
        </Menu>
    )
    return (
        <div
            className={`font-[Poppins,sans-serif] m-0 p-0 box-border transition-colors duration-300 ${
                darkMode ? "bg-[#37353E] text-[#FBFBFB] min-h-screen " : "bg-[#eee] min-h-screen text-[#342E37]"
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
                            <i className="bx bxs-dashboard !ml-2.5 flex min-w-[30px] "></i>

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
                            <svg className="min-w-[40px] flex justify-center group-hover:fill-[#6B7597] transition-colors duration-200" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill={darkMode ? "#F9F9F9" : "#302E36"} viewBox="0 0 24 24"><path d="M7 3a4 4 0 1 0 0 8 4 4 0 1 0 0-8M17 3a4 4 0 1 0 0 8 4 4 0 1 0 0-8M7 13a4 4 0 1 0 0 8 4 4 0 1 0 0-8M18 13h-2v3h-3v2h3v3h2v-3h3v-2h-3z"></path></svg>
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
                            <svg className="min-w-[40px] flex justify-center"  xmlns="http://www.w3.org/2000/svg"    width="20"
                                 height="20"
                                 fill="#6B7597" viewBox="0 0 24 24" >
                                <path d="M4 2H2v19c0 .55.45 1 1 1h19v-2H4z"></path><path d="M7 10h11c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1H7c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1m10-2h-5V6h5zM8 6h2v2H8zM21 12H7c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1M8 14h6v2H8zm12 2h-4v-2h4z"></path>
                            </svg>
                            {sidebarOpen && <span>Test</span>}
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
                            className={`menu-link ${sidebarOpen ? "" : "hide"} hover:text-[#7F88A8] ${
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
                            <img src={currentUser?.avatar || Avatar} alt="Avatar" className="w-10 h-10 rounded-full cursor-pointer object-cover"/>
                        </Dropdown>
                    </div>
                </nav>

                <main className="w-full p-[36px_24px] font-[Poppins,sans-serif] max-h-[calc(100vh-56px)] overflow-y-auto">
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                        <div>
                            <h1 className="text-[36px] font-semibold mb-[10px]">Test management</h1>
                            <div className="flex items-center gap-4">
                                <span className="text-[#AAAAAA] pointer-events-none">Test </span>
                                <FontAwesomeIcon icon={faChevronRight} />
                                <Link to="#" className="text-[#6B7597]">
                                    Home
                                </Link>
                            </div>
                        </div>
                        <div className="flex gap-[10px]">
                            {/*<Link*/}
                            {/*    to="#"*/}
                            {/*    className="px-5 py-[10px] rounded-[5px] text-base bg-[#6B7597] text-[#F9F9F9] transition-all duration-300 hover:bg-[#84ea71] hover:text-[#F9F9F9] flex items-center gap-2"*/}
                            {/*>*/}

                            <button
                                onClick={()=>navigate("/createTest")}
                                className="px-5 py-[10px] rounded-[5px] cursor-pointer text-base bg-[#6B7597] text-[#F9F9F9] transition-all duration-300 hover:bg-[#565D7C] hover:text-[#F9F9F9] flex items-center gap-2"
                            >
                                <FontAwesomeIcon icon={faPlusSquare} />
                                Add New</button>
                            {/*</Link>*/}
                        </div>
                    </div>

                    {/*<form className="w-full mr-auto mt-5">*/}
                    {/*    <div className="flex items-center h-9">*/}
                    {/*        <input type="search" placeholder="Search..." className="flex-grow px-4 h-full border-2 border-[#6B7597] bg-[#eee] rounded-[36px_0_0_36px] outline-none w-full max-[576px]:hidden"/>*/}
                    {/*        <button type="submit" className="w-9 h-full flex justify-center items-center bg-[#6B7597] text-[#F9F9F9] text-lg border-none outline-none rounded-[0_36px_36px_0] cursor-pointer max-[576px]:bg-transparent max-[576px]:text-[#342E37] max-[576px]:w-auto max-[576px]:h-auto form-[.show]:w-9 form-[.show]:h-full form-[.show]:bg-[#DB504A] form-[.show]:text-[#F9F9F9] form-[.show]:rounded-[0_36px_36px_0]">*/}
                    {/*            <FontAwesomeIcon icon={faSearch} />*/}
                    {/*        </button>*/}
                    {/*    </div>*/}
                    {/*</form>*/}

                    <form className="w-full mr-auto mt-5">
                        <div className="flex items-center h-9">
                            <input type="search" placeholder="Search..." className={`max-[576px]:hidden flex-grow px-4 h-full border-2 rounded-[36px_0_0_36px] outline-none w-full transition-colors duration-300
                                   ${darkMode
                                   ? "bg-[#302E36] border-[#888] text-[#F9F9F9] placeholder-[#B0B0B0]"
                                   : "bg-[#eee] border-[#6B7597] text-[#302E36] placeholder-[#6B7597]"}`}
                            />
                            <button
                                type="submit"
                                className={`w-9 h-full flex justify-center items-center text-lg border-none outline-none rounded-[0_36px_36px_0] cursor-pointer transition-colors duration-300         max-[576px]:bg-transparent max-[576px]:text-[#342E37] max-[576px]:w-auto max-[576px]:h-auto form-[.show]:w-9 form-[.show]:h-full form-[.show]:bg-[#DB504A] form-[.show]:text-[#F9F9F9] form-[.show]:rounded-[0_36px_36px_0]
                                    ${darkMode
                                    ? "bg-[#6B7597] text-[#F9F9F9]"
                                    : "bg-[#6B7597] text-[#F9F9F9]"
                                }`}
                            >
                                <FontAwesomeIcon icon={faSearch} />
                            </button>
                        </div>
                    </form>


                    <div className="flex flex-wrap gap-6 mt-6 w-full">
                        <div
                            className={`flex-grow basis-[500px] rounded-[20px] p-6 ${
                                darkMode ? "bg-[#302E36]" : "bg-[#F9F9F9]"
                            }`}
                        >
                            <div className="flex justify-end gap-2 mb-6 min-w-[420px]">
                                <svg className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill={darkMode ? "#F9F9F9" : "#302E36"} viewBox="0 0 24 24"><path d="M18 2a2 2 0 1 0 0 4 2 2 0 1 0 0-4M18 9a2 2 0 1 0 0 4 2 2 0 1 0 0-4M3 19c0 1.65 1.35 3 3 3s3-1.35 3-3c0-1.3-.84-2.4-2-2.82V7.82C8.16 7.41 9 6.31 9 5c0-1.65-1.35-3-3-3S3 3.35 3 5c0 1.3.84 2.4 2 2.82v8.37c-1.16.41-2 1.51-2 2.82Zm3 1c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1M6 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1M15 19c0 1.65 1.35 3 3 3s3-1.35 3-3-1.35-3-3-3-3 1.35-3 3m3-1c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1"></path></svg>
                                <FontAwesomeIcon icon={faFilter} className="cursor-pointer"/>
                            </div>
                            <section className="content">


                                <div className="lg:px-30 px-12 overflow-x-auto sm:w-full">
                                    {/*<h2 className="text-2xl font-semibold my-5">Test Management</h2>*/}

                                    <div className="flex md:items-center justify-between mb-5 gap-4">
                                        <div className="flex flex-col sm:flex-row gap-3">
                                            <select
                                                id="select-op"
                                                value={sort}
                                                onChange={(e) => setSort(e.target.value)}
                                                className={`w-35 md:w-50 ml-18 sm:m-0 h-10.5 border rounded-md p-2 outline-none transition-colors
                                                   ${darkMode
                                                    ? "bg-[#2A282F] border-gray-600 text-gray-200 focus:ring-2 focus:ring-[#6B7597]"
                                                    : "bg-white border-gray-300 text-gray-700 focus:ring-2 focus:ring-blue-500"
                                                }`}
                                            >
                                                <option value="">All</option>
                                                <option value="title">Test name</option>
                                                <option value="duration">Play time (increase)</option>
                                            </select>

                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    id="inputSearch"
                                                    placeholder="Search by name"
                                                    value={search}
                                                    onChange={(e) => setSearch(e.target.value)}
                                                    className={`w-53 md:w-full border rounded-md p-2 pl-10 outline-none transition-colors
                                                         ${darkMode
                                                        ? "bg-[#2A282F] border-gray-600 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-[#6B7597]"
                                                        : "bg-white border-gray-300 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
                                                    }`}
                                                />
                                                <i
                                                    className={`fa-solid fa-magnifying-glass absolute left-3 top-1/2 transform -translate-y-1/2
                                                      ${darkMode ? "text-gray-400" : "text-gray-400"}`}
                                                ></i>
                                            </div>
                                        </div>
                                    </div>

                                    <TableTest search={search} sort={sort} darkMode={darkMode} />



                                </div>

                            </section>
                        </div>
                    </div>
                </main>
            </section>
        </div>
    );
};

export default TestManagement;