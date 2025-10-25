import '../styles/d1.css'
// import '../styles/style.css'
// import {useState} from "react";
// import cate from "../assets/cate.png"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBell,
    faChevronRight,
    faFilter,
    faPlusSquare,
    faSearch,
    // faTachometerAlt
} from "@fortawesome/free-solid-svg-icons";
// import GridCirclePlusIcon from "../components/GridCirclePlusIcon.tsx";
// import 'boxicons/css/boxicons.min.css'

const Courses = () => {
    // const [openSideBar, setOpenSideBar] = useState<boolean>(false)
    return (
        <div>
            <section id="sidebar">
                {/*<a href="#" className="brand" id="brandLink">*/}
                    {/*<img src="../img/logoandtextlogo.svg" alt="logo" />*/}
                 <div className="titl">
                     <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#6a7698"><path d="M480-120q-18 0-34.5-6.5T416-146L163-400h113l197 197q2 2 3.5 2.5t3.5.5q2 0 3.5-.5t3.5-2.5l267-268q23-23 35-54.5t12-64.5q-2-69-46-118.5T645-758q-31 0-59.5 12T536-711l-27 29q-5 6-13 9.5t-16 3.5q-8 0-16-3.5t-14-9.5l-27-29q-21-23-49-36t-60-13q-54 0-93.5 34.5T167-640H85q17-85 79.5-142.5T314-840q48 0 90.5 19t75.5 53q32-34 74.5-53t90.5-19q100 0 167.5 74T880-590q0 49-17 94t-51 80L543-146q-13 13-29 19.5t-34 6.5Zm-5-360H80v-80h555q17 0 28.5-11.5T675-600q0-17-11.5-28.5T635-640q-14 0-25 7.5T596-611l-77-21q11-39 43-63.5t73-24.5q50 0 85 35t35 85q0 50-35 85t-85 35h-47q3 10 5 19.5t2 20.5q0 50-35 85t-85 35q-41 0-73-24.5T359-408l77-21q3 14 14 21.5t25 7.5q17 0 28.5-11.5T515-440q0-17-11.5-28.5T475-480Zm9 0Z"/></svg>
                     <h3>UniLife Hub</h3>
                 </div>
                {/*</a>*/}
                {/*side-menu top*/}
                <ul className="w-full mt-48">
                    <li>
                        <a id="dashboardLink">
                            <i className="bx bxs-dashboard"></i>
                            <span className="text">Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" id="topicLink" className="active">
                            <i className="bx bxs-shopping-bag-alt"></i>
                            <span className="text">Topic + word</span>
                        </a>
                    </li>
                    <li className="active">
                        <a>
                            {/*<img src={cate} className="ml-2"/>*/}
                            {/*<GridCirclePlusIcon/>*/}
                            <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                  fill="#000000" viewBox="0 0 24 24" >
                                <path d="M4 2H2v19c0 .55.45 1 1 1h19v-2H4z"></path><path d="M7 10h11c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1H7c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1m10-2h-5V6h5zM8 6h2v2H8zM21 12H7c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1M8 14h6v2H8zm12 2h-4v-2h4z"></path>
                            </svg>
                            <span>Category</span>
                        </a>
                    </li>
                    {/*<li className="active">*/}
                    {/*/!*<a href="#" id="messageLink">*!/*/}
                    {/*/!*      *!/*/}
                    {/*/!*    </a>*!/*/}
                    {/*</li>*/}
                    <div>
                        <i className="bx bxs-message-dots"></i>
                        <span className="text">Courses</span>
                    </div>
                    <li>
                        <a id="studentLink">
                            <i className="bx bxs-group"></i>
                            <span className="text">Student</span>
                        </a>
                    </li>
                    <li>
                        <a id="addExamLink">
                            <i className="bx bxs-graduation"></i>
                            <span className="text">Exam</span>
                        </a>
                    </li>
                </ul>

                <ul className="side-menu">
                    <li>
                        <a href="#" id="settingsLink">
                            <i className="bx bxs-cog"></i>
                            <span className="text">Settings</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" id="logoutLink">
                            <i className="bx bxs-log-out-circle"></i>
                            <span className="text">Logout</span>
                        </a>
                    </li>
                </ul>
            </section>

            <section id="content">
                <nav>
                    <i className="bx bx-menu"></i>
                    <div className="logo-admin">
                        <input type="checkbox" id="switch-mode" hidden />
                        <label htmlFor="switch-mode" className="switch-mode"></label>
                        <a href="#" className="notification">
                            {/*<i className="bx bxs-bell"></i>*/}
                            <FontAwesomeIcon icon={faBell} />
                            <span className="num">8</span>
                        </a>
                        <a href="#" className="profile">
                            <img src="../img/quanmario.png" alt="profile" />
                        </a>
                    </div>
                </nav>

                <main>
                    <div className="head-title">
                        <div className="left">
                            <h1>Courses</h1>
                            <ul className="breadcrumb">
                                <li><a href="#">Courses</a></li>
                                {/*<li><i className="bx bx-chevron-right"></i></li>*/}
                                <li><FontAwesomeIcon icon={faChevronRight} /></li>
                                <li><a className="active" href="#">Home</a></li>
                            </ul>
                        </div>

                        <div className="change-word">
                            <a id="btnAdd" className="btn-new">
                                {/*<i className="bx bxs-plus-square"></i>*/}
                                <FontAwesomeIcon icon={faPlusSquare} />
                                <span className="status.adding">Add New</span>
                            </a>
                        </div>
                    </div>

                    <form >
                        <div className="form-input">
                            <input type="search" placeholder="Search..."
                                // value={searchValue}
                                // onChange={e => setSearchValue(e.target.value)}
                            />
                            <button type="submit" className="search-btn">
                                {/*<i className="bx bx-search"></i>*/}
                                <FontAwesomeIcon icon={faSearch} />
                            </button>
                        </div>
                    </form>

                    <div className="table-data">
                        <div className="order">
                            <div className="head">
                                <h3>Courses</h3>
                                {/*<i className="bx bx-search"></i>*/}
                                <FontAwesomeIcon icon={faSearch} />
                                {/*<i className="bx bx-filter"></i>*/}
                                <FontAwesomeIcon icon={faFilter} />
                            </div>

                            <section id="SectionMainContent" className="content">


















                            </section>
                        </div>
                    </div>
                </main>
            </section>

        </div>
    )
}

export default Courses
// import { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//     faBell,
//     faChevronRight,
//     faFilter,
//     faPlusSquare,
//     faSearch,
// } from "@fortawesome/free-solid-svg-icons";
// import Avatar from "../assets/avatar.svg";
//
// const ACCENT = "#6B7597";
//
// const Courses: React.FC = () => {
//     const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
//     const [darkMode, setDarkMode] = useState<boolean>(false);
//
//     return (
//         <div
//             className={`flex min-h-screen transition-colors duration-300`}
//             style={{
//                 background: darkMode ? "#060714" : "#F5F5F6",
//                 color: darkMode ? "#FBFBFB" : "#342E37",
//             }}
//         >
//             {/* SIDEBAR */}
//             <aside
//                 id="sidebar"
//                 className={`flex flex-col justify-between transition-all duration-300 ${
//                     sidebarOpen ? "w-[270px]" : "w-[72px]"
//                 }`}
//                 style={{
//                     background: darkMode ? "#111" : "#FFFFFF",
//                     boxShadow: "0 6px 18px rgba(20,20,20,0.04)",
//                 }}
//             >
//                 {/* TOP: logo + menu */}
//                 <div>
//                     <div
//                         className="flex items-center gap-3 p-5"
//                         style={{ borderBottomLeftRadius: 28, borderBottomRightRadius: 28 }}
//                     >
//                         <div
//                             className="flex items-center justify-center rounded-full"
//                             style={{
//                                 width: 44,
//                                 height: 44,
//                                 background: darkMode ? "#0f0f12" : "#fff",
//                                 boxShadow: "inset 0 2px 6px rgba(0,0,0,0.03)",
//                             }}
//                         >
//                             {/* logo (replace src if you have local) */}
//                             <svg
//                                 width="28"
//                                 height="28"
//                                 viewBox="0 0 24 24"
//                                 fill={ACCENT}
//                                 xmlns="http://www.w3.org/2000/svg"
//                             >
//                                 <path d="M12 2C8 2 5 5 5 9s3 7 7 7 7-3 7-7-3-7-7-7z" />
//                             </svg>
//                         </div>
//
//                         {sidebarOpen && (
//                             <div className="flex flex-col">
//                 <span style={{ fontWeight: 700, color: ACCENT }}>
//                   Mankai
//                 </span>
//                                 <small style={{ color: "#9aa0ab" }}>Academy</small>
//                             </div>
//                         )}
//                     </div>
//
//                     {/* Menu list */}
//                     <ul className="mt-6 space-y-3 px-3">
//                         {[
//                             { icon: "bxs-dashboard", label: "Dashboard" },
//                             { icon: "bxs-book-content", label: "Topic + word", active: true },
//                             { icon: "bxs-graduation", label: "Courses" },
//                             { icon: "bxs-group", label: "Student" },
//                             { icon: "bxs-book", label: "Exam" },
//                         ].map((it, i) => (
//                             <li
//                                 key={i}
//                                 className={`flex items-center gap-3 cursor-pointer transition-all ${
//                                     it.active ? "" : "hover:translate-x-1"
//                                 }`}
//                             >
//                                 <a
//                                     className="flex items-center w-full rounded-full py-3 px-3"
//                                     style={{
//                                         background: it.active
//                                             ? darkMode
//                                                 ? "rgba(107,117,151,0.08)"
//                                                 : "#fff"
//                                             : "transparent",
//                                         boxShadow: it.active
//                                             ? "0 6px 18px rgba(107,117,151,0.06)"
//                                             : "none",
//                                         borderRadius: 9999,
//                                     }}
//                                     href="#"
//                                 >
//                                     <i
//                                         className={`bx ${it.icon} text-xl`}
//                                         style={{ color: it.active ? ACCENT : "#4b5563", minWidth: 28 }}
//                                     />
//                                     {sidebarOpen && (
//                                         <span
//                                             style={{
//                                                 color: it.active ? ACCENT : undefined,
//                                                 fontWeight: 500,
//                                             }}
//                                         >
//                       {it.label}
//                     </span>
//                                     )}
//                                 </a>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//
//                 {/* BOTTOM: settings + logout */}
//                 <div className="mb-6 px-3">
//                     <ul className="space-y-3">
//                         <li>
//                             <a
//                                 href="#"
//                                 className="flex items-center gap-3 rounded-full py-3 px-3 hover:translate-x-1 transition-all"
//                                 style={{ color: "#4b5563" }}
//                             >
//                                 <i className="bx bxs-cog text-xl" />
//                                 {sidebarOpen && <span>Settings</span>}
//                             </a>
//                         </li>
//                         <li>
//                             <a
//                                 href="#"
//                                 className="flex items-center gap-3 rounded-full py-3 px-3 text-red-500"
//                             >
//                                 <i className="bx bxs-log-out-circle text-xl" />
//                                 {sidebarOpen && <span>Logout</span>}
//                             </a>
//                         </li>
//                     </ul>
//                 </div>
//             </aside>
//
//             {/* MAIN */}
//             <div className="flex-1 flex flex-col">
//                 {/* NAVBAR */}
//                 <nav
//                     className="flex items-center justify-between px-6 py-3"
//                     style={{
//                         background: darkMode ? "#0b0b0c" : "transparent",
//                     }}
//                 >
//                     <div className="flex items-center gap-4">
//                         <i
//                             className="bx bx-menu text-2xl cursor-pointer"
//                             onClick={() => setSidebarOpen((s) => !s)}
//                             style={{ color: "#333" }}
//                         />
//                     </div>
//
//                     <div className="flex items-center gap-4">
//                         {/* switch mode */}
//                         <label className="relative inline-flex items-center cursor-pointer">
//                             <input
//                                 type="checkbox"
//                                 className="sr-only"
//                                 checked={darkMode}
//                                 onChange={() => setDarkMode((s) => !s)}
//                             />
//                             <div
//                                 className="w-11 h-6 rounded-full"
//                                 style={{
//                                     background: darkMode ? ACCENT : "#e6e9ec",
//                                     position: "relative",
//                                 }}
//                             />
//                             <div
//                                 style={{
//                                     position: "absolute",
//                                     left: darkMode ? 26 : 4,
//                                     top: 6,
//                                     width: 18,
//                                     height: 18,
//                                     borderRadius: 9999,
//                                     background: "#fff",
//                                     transition: "left .2s",
//                                     boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
//                                 }}
//                             />
//                         </label>
//
//                         {/* bell */}
//                         <div style={{ position: "relative" }}>
//                             <FontAwesomeIcon icon={faBell} />
//                             <span
//                                 style={{
//                                     position: "absolute",
//                                     top: -6,
//                                     right: -8,
//                                     background: ACCENT,
//                                     color: "#fff",
//                                     width: 18,
//                                     height: 18,
//                                     borderRadius: 9999,
//                                     display: "flex",
//                                     alignItems: "center",
//                                     justifyContent: "center",
//                                     fontSize: 11,
//                                 }}
//                             >
//                 8
//               </span>
//                         </div>
//
//                         {/* avatar */}
//                         <div>
//                             <img
//                                 src={Avatar}
//                                 alt="avatar"
//                                 className="w-9 h-9 rounded-full object-cover"
//                             />
//                         </div>
//                     </div>
//                 </nav>
//
//                 {/* PAGE CONTENT */}
//                 <main className="p-8">
//                     {/* Header & Add */}
//                     <div className="flex items-center justify-between mb-6">
//                         <div>
//                             <h1 className="text-3xl font-semibold">Topic</h1>
//                             <div className="flex items-center gap-2 mt-2 text-sm" style={{ color: "#9aa0ab" }}>
//                                 <span>Topic</span>
//                                 <FontAwesomeIcon icon={faChevronRight} />
//                                 <span style={{ color: ACCENT, fontWeight: 600 }}>Home</span>
//                             </div>
//                         </div>
//
//                         <button
//                             className="flex items-center gap-2 py-2 px-4 rounded-md"
//                             style={{
//                                 background: ACCENT,
//                                 color: "#fff",
//                                 boxShadow: "0 8px 20px rgba(107,117,151,0.12)",
//                             }}
//                         >
//                             <FontAwesomeIcon icon={faPlusSquare} />
//                             <span>Add New</span>
//                         </button>
//                     </div>
//
//                     {/* Search (right under breadcrumb) */}
//                     <div
//                         className="w-full max-w-lg mb-6"
//                         style={{
//                             display: "flex",
//                             alignItems: "center",
//                             background: "#fff",
//                             borderRadius: 999,
//                             overflow: "hidden",
//                             border: "1px solid rgba(107,117,151,0.15)",
//                             boxShadow: "0 8px 24px rgba(16,24,40,0.04)",
//                         }}
//                     >
//                         <input
//                             type="text"
//                             placeholder="Search..."
//                             className="flex-1 px-4 py-3 text-sm outline-none"
//                             style={{ background: "transparent" }}
//                         />
//                         <button
//                             className="px-4 py-3"
//                             style={{ background: ACCENT, color: "#fff", borderRadius: 999 }}
//                         >
//                             <FontAwesomeIcon icon={faSearch} />
//                         </button>
//                     </div>
//
//                     {/* Card / Table area with big rounded left top corner */}
//                     <div
//                         className="p-6"
//                         style={{
//                             background: darkMode ? "#0b0b0c" : "#fff",
//                             borderRadius: 18,
//                             boxShadow: "0 12px 30px rgba(20,20,20,0.05)",
//                         }}
//                     >
//                         <div className="flex items-center justify-between mb-4">
//                             <h3 className="text-lg font-semibold">Topic</h3>
//                             <div className="flex items-center gap-3 text-gray-500">
//                                 <FontAwesomeIcon icon={faSearch} />
//                                 <FontAwesomeIcon icon={faFilter} />
//                             </div>
//                         </div>
//
//                         <div style={{ overflowX: "auto" }}>
//                             <table className="w-full text-left" style={{ minWidth: 600 }}>
//                                 <thead>
//                                 <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
//                                     <th className="py-3">Chủ đề</th>
//                                     <th className="py-3">Số lượng từ</th>
//                                     <th className="py-3">Action</th>
//                                 </tr>
//                                 </thead>
//                                 <tbody>
//                                 <tr>
//                                     <td colSpan={3} className="py-10 text-center" style={{ color: "#9aa0ab" }}>
//                                         (Trống)
//                                     </td>
//                                 </tr>
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                 </main>
//             </div>
//         </div>
//     );
// };
//
// export default Courses;
// import { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//     faBell,
//     faChevronRight,
//     faFilter,
//     faPlusSquare,
//     faSearch,
// } from "@fortawesome/free-solid-svg-icons";
// import Avatar from "../assets/avatar.svg";
//
// const ACCENT = "#6B7597";
//
// const Courses: React.FC = () => {
//     const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
//     const [darkMode, setDarkMode] = useState<boolean>(false);
//
//     return (
//         <div
//             className="flex min-h-screen transition-colors duration-300"
//             style={{
//                 background: darkMode ? "#060714" : "#F5F5F6",
//                 color: darkMode ? "#FBFBFB" : "#342E37",
//             }}
//         >
//             {/* WRAPPER trắng bo cong chứa cả sidebar + navbar */}
//             <div
//                 className={`flex flex-col transition-all duration-300 rounded-r-[3rem] shadow-lg ${
//                     sidebarOpen ? "w-[320px]" : "w-[96px]"
//                 }`}
//                 style={{
//                     background: darkMode ? "#111" : "#fff",
//                     boxShadow: "0 6px 20px rgba(20,20,20,0.05)",
//                 }}
//             >
//                 {/* LOGO + MENU */}
//                 <div className="flex items-center justify-between p-5">
//                     <div className="flex items-center gap-3">
//                         <div
//                             className="flex items-center justify-center rounded-full"
//                             style={{
//                                 width: 44,
//                                 height: 44,
//                                 background: darkMode ? "#0f0f12" : "#fff",
//                                 boxShadow: "inset 0 2px 6px rgba(0,0,0,0.05)",
//                             }}
//                         >
//                             <svg
//                                 width="26"
//                                 height="26"
//                                 viewBox="0 0 24 24"
//                                 fill={ACCENT}
//                                 xmlns="http://www.w3.org/2000/svg"
//                             >
//                                 <path d="M12 2C8 2 5 5 5 9s3 7 7 7 7-3 7-7-3-7-7-7z" />
//                             </svg>
//                         </div>
//
//                         {sidebarOpen && (
//                             <div className="flex flex-col leading-tight">
//                                 <span style={{ fontWeight: 700, color: ACCENT }}>Mankai</span>
//                                 <small style={{ color: "#9aa0ab" }}>Academy</small>
//                             </div>
//                         )}
//                     </div>
//
//                     <i
//                         className="bx bx-menu text-2xl cursor-pointer"
//                         onClick={() => setSidebarOpen((s) => !s)}
//                         style={{ color: ACCENT }}
//                     />
//                 </div>
//
//                 {/* SIDEBAR MENU */}
//                 <nav className="flex flex-col mt-3 space-y-3 px-3">
//                     {[
//                         { icon: "bxs-dashboard", label: "Dashboard" },
//                         { icon: "bxs-book-content", label: "Topic + word", active: true },
//                         { icon: "bxs-graduation", label: "Courses" },
//                         { icon: "bxs-group", label: "Student" },
//                         { icon: "bxs-book", label: "Exam" },
//                     ].map((it, i) => (
//                         <a
//                             key={i}
//                             href="#"
//                             className={`flex items-center gap-3 rounded-full py-3 px-4 transition-all ${
//                                 it.active ? "shadow-sm" : "hover:translate-x-1"
//                             }`}
//                             style={{
//                                 background: it.active
//                                     ? darkMode
//                                         ? "rgba(107,117,151,0.08)"
//                                         : "#fff"
//                                     : "transparent",
//                                 boxShadow: it.active
//                                     ? "0 6px 18px rgba(107,117,151,0.06)"
//                                     : "none",
//                             }}
//                         >
//                             <i
//                                 className={`bx ${it.icon} text-xl`}
//                                 style={{ color: it.active ? ACCENT : "#4b5563", minWidth: 28 }}
//                             />
//                             {sidebarOpen && (
//                                 <span
//                                     style={{
//                                         color: it.active ? ACCENT : undefined,
//                                         fontWeight: 500,
//                                     }}
//                                 >
//                   {it.label}
//                 </span>
//                             )}
//                         </a>
//                     ))}
//                 </nav>
//
//                 {/* BOTTOM */}
//                 <div className="mt-auto mb-6 px-3">
//                     <a
//                         href="#"
//                         className="flex items-center gap-3 rounded-full py-3 px-3 hover:translate-x-1 transition-all text-gray-600"
//                     >
//                         <i className="bx bxs-cog text-xl" />
//                         {sidebarOpen && <span>Settings</span>}
//                     </a>
//                     <a
//                         href="#"
//                         className="flex items-center gap-3 rounded-full py-3 px-3 text-red-500"
//                     >
//                         <i className="bx bxs-log-out-circle text-xl" />
//                         {sidebarOpen && <span>Logout</span>}
//                     </a>
//                 </div>
//             </div>
//
//             {/* MAIN */}
//             <div className="flex-1 flex flex-col">
//                 {/* NAVBAR (nằm liền khối trắng luôn) */}
//                 <nav
//                     className="flex items-center justify-between px-8 py-4 shadow-sm rounded-bl-[2rem]"
//                     style={{
//                         background: darkMode ? "#111" : "#fff",
//                         borderBottom: "1px solid rgba(0,0,0,0.05)",
//                     }}
//                 >
//                     <div className="flex items-center gap-4">
//                         {/* Darkmode toggle */}
//                         <label className="relative inline-flex items-center cursor-pointer">
//                             <input
//                                 type="checkbox"
//                                 className="sr-only"
//                                 checked={darkMode}
//                                 onChange={() => setDarkMode((s) => !s)}
//                             />
//                             <div
//                                 className="w-11 h-6 rounded-full"
//                                 style={{
//                                     background: darkMode ? ACCENT : "#e6e9ec",
//                                     position: "relative",
//                                 }}
//                             />
//                             <div
//                                 style={{
//                                     position: "absolute",
//                                     left: darkMode ? 26 : 4,
//                                     top: 6,
//                                     width: 18,
//                                     height: 18,
//                                     borderRadius: 9999,
//                                     background: "#fff",
//                                     transition: "left .2s",
//                                     boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
//                                 }}
//                             />
//                         </label>
//                     </div>
//
//                     <div className="flex items-center gap-4">
//                         {/* bell */}
//                         <div className="relative">
//                             <FontAwesomeIcon icon={faBell} color={ACCENT} />
//                             <span
//                                 className="absolute -top-2 -right-2 text-[11px] font-semibold"
//                                 style={{
//                                     background: ACCENT,
//                                     color: "#fff",
//                                     width: 18,
//                                     height: 18,
//                                     borderRadius: 9999,
//                                     display: "flex",
//                                     alignItems: "center",
//                                     justifyContent: "center",
//                                 }}
//                             >
//                 8
//               </span>
//                         </div>
//
//                         <img
//                             src={Avatar}
//                             alt="avatar"
//                             className="w-9 h-9 rounded-full object-cover"
//                         />
//                     </div>
//                 </nav>
//
//                 {/* PAGE CONTENT */}
//                 <main className="p-8">
//                     <div className="flex items-center justify-between mb-6">
//                         <div>
//                             <h1 className="text-3xl font-semibold text-[#342E37]">Topic</h1>
//                             <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
//                                 <span>Topic</span>
//                                 <FontAwesomeIcon icon={faChevronRight} />
//                                 <span style={{ color: ACCENT, fontWeight: 600 }}>Home</span>
//                             </div>
//                         </div>
//
//                         <button
//                             className="flex items-center gap-2 py-2 px-4 rounded-md shadow-sm"
//                             style={{
//                                 background: ACCENT,
//                                 color: "#fff",
//                                 boxShadow: "0 8px 20px rgba(107,117,151,0.12)",
//                             }}
//                         >
//                             <FontAwesomeIcon icon={faPlusSquare} />
//                             <span>Add New</span>
//                         </button>
//                     </div>
//
//                     {/* Search box */}
//                     <div
//                         className="w-full max-w-lg mb-6 flex items-center bg-white rounded-full overflow-hidden"
//                         style={{
//                             border: "1px solid rgba(107,117,151,0.15)",
//                             boxShadow: "0 8px 24px rgba(16,24,40,0.04)",
//                         }}
//                     >
//                         <input
//                             type="text"
//                             placeholder="Search..."
//                             className="flex-1 px-4 py-3 text-sm outline-none bg-transparent"
//                         />
//                         <button
//                             className="px-4 py-3"
//                             style={{ background: ACCENT, color: "#fff", borderRadius: 999 }}
//                         >
//                             <FontAwesomeIcon icon={faSearch} />
//                         </button>
//                     </div>
//
//                     {/* Table */}
//                     <div
//                         className="p-6 bg-white rounded-3xl shadow-sm"
//                         style={{
//                             borderRadius: 20,
//                             boxShadow: "0 12px 30px rgba(20,20,20,0.05)",
//                         }}
//                     >
//                         <div className="flex items-center justify-between mb-4">
//                             <h3 className="text-lg font-semibold">Topic</h3>
//                             <div className="flex items-center gap-3 text-gray-500">
//                                 <FontAwesomeIcon icon={faSearch} />
//                                 <FontAwesomeIcon icon={faFilter} />
//                             </div>
//                         </div>
//
//                         <div style={{ overflowX: "auto" }}>
//                             <table className="w-full text-left" style={{ minWidth: 600 }}>
//                                 <thead>
//                                 <tr style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
//                                     <th className="py-3">Chủ đề</th>
//                                     <th className="py-3">Số lượng từ</th>
//                                     <th className="py-3">Action</th>
//                                 </tr>
//                                 </thead>
//                                 <tbody>
//                                 <tr>
//                                     <td
//                                         colSpan={3}
//                                         className="py-10 text-center text-gray-400 text-sm"
//                                     >
//                                         (Trống)
//                                     </td>
//                                 </tr>
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                 </main>
//             </div>
//         </div>
//     );
// };
//
// export default Courses;
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//     faTachometerAlt,
//     faShoppingBag,
//     faComments,
//     faUsers,
//     faGraduationCap,
//     faCog,
//     faSignOutAlt,
//     faBars,
//     faBell,
//     faChevronRight,
//     faPlusSquare,
//     faSearch,
//     faFilter,
// } from "@fortawesome/free-solid-svg-icons";
//
// const Courses = () => {
//     return (
//         <div className="bg-[#eee] font-[Poppins,sans-serif] m-0 p-0 box-border">
//             {/* SIDEBAR */}
//             {/*<section className="fixed top-0 left-0 w-[280px] h-full bg-[#F9F9F9] z-[2000] font-[Lato,sans-serif] transition-all duration-300 ease-in-out scrollbar-none data-[hide=true]:w-[60px]">*/}
//             <section
//                 className="
//     fixed top-0 left-0 w-[280px] h-full bg-[#F9F9F9] z-[2000]
//     font-[Lato,sans-serif] transition-all duration-300 ease-in-out
// +   before:content-[''] before:absolute before:w-10 before:h-10
// +   before:-top-10 before:right-0 before:rounded-full
// +   before:shadow-[20px_20px_0_#F9F9F9]
//   "
//             >
//
//             <a href="#" className="flex items-center h-14 text-[#ec754a] font-bold text-2xl sticky top-0 left-0 bg-[#F9F9F9] z-[500] pb-5 box-content">
//                     <img src="../img/logoandtextlogo.svg" alt="logo" className="h-9 object-cover ml-5" />
//                 </a>
//
//                 <ul className="w-full mt-12">
//                     <li className="h-12 bg-transparent ml-[6px] rounded-[48px_0_0_48px] p-1">
//                         <a href="#" className="w-full h-full bg-[#F9F9F9] flex items-center rounded-[48px] text-base text-[#342E37] whitespace-nowrap hover:text-[#ec754a] data-[hide=true]:w-[40px] transition-all duration-300">
//                             <FontAwesomeIcon icon={faTachometerAlt} className="min-w-[40px] flex justify-center" />
//                             <span>Dashboard</span>
//                         </a>
//                     </li>
//                     <li className="h-12 bg-transparent ml-[6px] rounded-[48px_0_0_48px] p-1 before:content-[''] before:absolute before:w-10 before:h-10 before:-top-10 before:right-0 before:rounded-full before:shadow-[20px_20px_0_#eee] before:-z-[1] after:content-[''] after:absolute after:w-10 after:h-10 after:-bottom-10 after:right-0 after:rounded-full after:shadow-[20px_-20px_0_#eee] after:-z-[1]">
//                         <a href="#" className="w-full h-full bg-[#F9F9F9] flex items-center rounded-[48px] text-base text-[#342E37] whitespace-nowrap hover:text-[#ec754a]  data-[hide=true]:w-[40px] transition-all duration-300">
//                             <FontAwesomeIcon icon={faShoppingBag} className="min-w-[40px] flex justify-center" />
//                             <span>Topic + word</span>
//                         </a>
//                     </li>
//                     <li className="h-12 bg-[#eee] relative ml-[6px] rounded-[48px_0_0_48px] p-1 before:content-[''] before:absolute before:w-10 before:h-10 before:-top-10 before:right-0 before:rounded-full before:shadow-[20px_20px_0_#eee] before:-z-[1] after:content-[''] after:absolute after:w-10 after:h-10 after:-bottom-10 after:right-0 after:rounded-full after:shadow-[20px_-20px_0_#eee] after:-z-[1]">
//                         <a href="#" className="w-full h-full bg-[#F9F9F9] flex items-center rounded-[48px] text-base text-[#ec754a] whitespace-nowrap data-[hide=true]:w-[40px] transition-all duration-300">
//                             <FontAwesomeIcon icon={faComments} className="min-w-[40px] flex justify-center" />
//                             <span>Courses</span>
//                         </a>
//                     </li>
//                     <li className="h-12 bg-transparent ml-[6px] rounded-[48px_0_0_48px] p-1">
//                         <a href="#" className="w-full h-full bg-[#F9F9F9] flex items-center rounded-[48px] text-base text-[#342E37] whitespace-nowrap hover:text-[#ec754a] data-[hide=true]:w-[40px] transition-all duration-300">
//                             <FontAwesomeIcon icon={faUsers} className="min-w-[40px] flex justify-center" />
//                             <span>Student</span>
//                         </a>
//                     </li>
//                     <li className="h-12 bg-transparent ml-[6px] rounded-[48px_0_0_48px] p-1">
//                         <a href="#" className="w-full h-full bg-[#F9F9F9] flex items-center rounded-[48px] text-base text-[#342E37] whitespace-nowrap  hover:text-[#ec754a] data-[hide=true]:w-[40px] transition-all duration-300">
//                             <FontAwesomeIcon icon={faGraduationCap} className="min-w-[40px] flex justify-center" />
//                             <span>Exam</span>
//                         </a>
//                     </li>
//                 </ul>
//
//                 <ul className="w-full mt-12 ">
//                     <li className="h-12 bg-transparent ml-[6px] rounded-[48px_0_0_48px] p-1">
//                         <a href="#" className="w-full h-full bg-[#F9F9F9] flex items-center rounded-[48px] text-base text-[#342E37] whitespace-nowrap  data-[hide=true]:w-[40px] transition-all duration-300">
//                             <FontAwesomeIcon icon={faCog} className="min-w-[40px] flex justify-center" />
//                             <span>Settings</span>
//                         </a>
//                     </li>
//                     <li className="h-12 bg-transparent ml-[6px] rounded-[48px_0_0_48px] p-1">
//                         <a href="#" className="w-full h-full bg-[#F9F9F9] flex items-center rounded-[48px] text-base text-[#DB504A] whitespace-nowrap data-[hide=true]:w-[40px] transition-all duration-300">
//                             <FontAwesomeIcon icon={faSignOutAlt} className="min-w-[40px] flex justify-center" />
//                             <span>Logout</span>
//                         </a>
//                     </li>
//                 </ul>
//             </section>
//
//             {/* CONTENT */}
//             <section className="relative w-[calc(100%-280px)] left-[280px] transition-all duration-300 ease-in-out data-[hide=true]:w-[calc(100%-60px)] data-[hide=true]:left-[60px] max-[768px]:w-[calc(100%-60px)] max-[768px]:left-[200px]">
//                 {/* NAVBAR */}
//                 <nav className="h-14 bg-[#F9F9F9] px-6 flex items-center gap-6 font-[Lato,sans-serif] sticky top-0 left-0 z-[1000] before:content-[''] before:absolute before:w-10 before:h-10 before:-bottom-10 before:left-0 before:rounded-full before:shadow-[-20px_-20px_0_#F9F9F9]">
//                     <FontAwesomeIcon icon={faBars} className="cursor-pointer text-[#342E37]" />
//                     <div className="flex items-center gap-[10px] ml-auto mr-5">
//                         <input type="checkbox" id="switch-mode" hidden />
//                         <label
//                             htmlFor="switch-mode"
//                             className="block min-w-[50px] h-[25px] rounded-full bg-[#eee] cursor-pointer relative before:content-[''] before:absolute before:top-[2px] before:left-[2px] before:bottom-[2px] before:w-[calc(25px-4px)] before:bg-[#ec754a] before:rounded-full before:transition-all before:duration-300 checked:before:left-[calc(100%-(25px-4px)-2px)]"
//                         ></label>
//                         <a href="#" className="text-[#342E37] text-xl relative">
//                             <FontAwesomeIcon icon={faBell} />
//                             <span className="absolute -top-[6px] -right-[6px] w-5 h-5 rounded-full border-2 border-[#F9F9F9] bg-[#DB504A] text-[#F9F9F9] font-bold text-xs flex justify-center items-center">
//                 8
//               </span>
//                         </a>
//                         <a href="#" className="relative">
//                             <img src="../img/quanmario.png" alt="profile" className="w-9 h-9 object-cover rounded-full" />
//                         </a>
//                     </div>
//                 </nav>
//
//                 {/* MAIN */}
//                 <main className="w-full p-[36px_24px] font-[Poppins,sans-serif] max-h-[calc(100vh-56px)] ">
//                     <div className="flex items-center justify-between gap-4 flex-wrap">
//                         <div>
//                             <h1 className="text-[36px] font-semibold mb-[10px] text-[#342E37]">Courses</h1>
//                             <ul className="flex items-center gap-4">
//                                 <li className="text-[#342E37]">
//                                     <a href="#" className="text-[#AAAAAA] pointer-events-none">
//                                         Courses
//                                     </a>
//                                 </li>
//                                 <li>
//                                     <FontAwesomeIcon icon={faChevronRight} />
//                                 </li>
//                                 <li>
//                                     <a href="#" className="text-[#ec754a]">
//                                         Home
//                                     </a>
//                                 </li>
//                             </ul>
//                         </div>
//                         <div className="flex gap-[10px]">
//                             <a href="#" className="px-5 py-[10px] rounded-[5px] text-base bg-[#ec754a] text-[#F9F9F9] transition-all duration-300 hover:bg-[#84ea71] hover:text-[#F9F9F9] flex items-center gap-2">
//                                 <FontAwesomeIcon icon={faPlusSquare} />
//                                 <span>Add New</span>
//                             </a>
//                         </div>
//                     </div>
//
//                     <form className="w-full mr-auto mt-5">
//                         <div className="flex items-center h-9">
//                             <input
//                                 type="search"
//                                 placeholder="Search..."
//                                 className="flex-grow px-4 h-full border-2 border-[#ec754a] bg-[#eee] rounded-[36px_0_0_36px] outline-none w-full text-[#342E37] max-[576px]:hidden"
//                             />
//                             <button
//                                 type="submit"
//                                 className="w-9 h-full flex justify-center items-center bg-[#ec754a] text-[#F9F9F9] text-lg border-none outline-none rounded-[0_36px_36px_0] cursor-pointer max-[576px]:bg-transparent max-[576px]:text-[#342E37] max-[576px]:w-auto max-[576px]:h-auto form-[.show]:w-9 form-[.show]:h-full form-[.show]:bg-[#DB504A] form-[.show]:text-[#F9F9F9] form-[.show]:rounded-[0_36px_36px_0]"
//                             >
//                                 <FontAwesomeIcon icon={faSearch} />
//                             </button>
//                         </div>
//                     </form>
//
//                     <div className="flex flex-wrap gap-6 mt-6 w-full text-[#342E37] ">
//                         <div className="flex-grow basis-[500px] rounded-[20px] bg-[#F9F9F9] p-6">
//                             <div className="flex items-center gap-4 mb-6 min-w-[420px]">
//                                 <h3 className="mr-auto text-2xl font-semibold">Courses</h3>
//                                 <FontAwesomeIcon icon={faSearch} className="cursor-pointer" />
//                                 <FontAwesomeIcon icon={faFilter} className="cursor-pointer" />
//                             </div>
//                             <section className="content"></section>
//                         </div>
//                     </div>
//                 </main>
//             </section>
//         </div>
//     );
// };
//
// export default Courses;

// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//     faTachometerAlt,
//     faShoppingBag,
//     faComments,
//     faUsers,
//     faGraduationCap,
//     faCog,
//     faSignOutAlt,
//     faBars,
//     faBell,
//     faChevronRight,
//     faPlusSquare,
//     faSearch,
//     faFilter,
// } from "@fortawesome/free-solid-svg-icons";
// import "../styles/d1.css"
// import {Dropdown, Menu} from "antd";
// import Avatar from "../assets/avatar.svg";
// import {useAppSelector} from "../hooks/Hook.ts";
// import handleLogout from "../components/handleLogout.tsx";
// // interface AdminProps {
// //     onLogout: () => void;
// //     // onSearch?: (text: string) => void;
// // }
// const Courses = () => {
//     const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
//     const [darkMode, setDarkMode] = useState<boolean>(false);
//
//     const { currentUser } = useAppSelector((state) => state.user);
//
//     const userMenu = (
//         <Menu className="w-72 p-4 rounded-lg shadow-lg border border-gray-200">
//             <Menu.Item key="user-info" disabled>
//                 <div className="flex items-center gap-4">
//                     {/*<Avatar*/}
//
//
//
//
//
//                     {/*   */}
//                     {/*/>*/}
//                     <img
//                         src={currentUser?.avatar || Avatar}
//                         className="w-10 h-10 rounded-full cursor-pointer"
//                         // src="/assets/avatar.svg"
//                         // size={40}
//                         // icon={<FontAwesomeIcon icon={faUser} />}
//                     >
//                     </img>
//                     <div>
//                         {/*CHO NAY CAN CHECK LAI currentUser?.fullName*/}
//                         <h3 className="text-base font-semibold text-gray-800">{currentUser?.fullName}</h3>
//                         <span className="text-sm text-gray-500">{currentUser?.email}</span>
//                     </div>
//                 </div>
//             </Menu.Item>
//             <Menu.Item key="info">
//                 <Link to="/profileAdmin" className="text-gray-700 font-semibold hover:bg-gray-100 block px-2 py-1 rounded">
//                     Thông Tin
//                 </Link>
//             </Menu.Item>
//             <Menu.Item key="signout" className="flex flex-row gap-2">
//                 <span
//                     onClick={() => {
//                         handleLogout(); // Gọi hàm đăng xuất
//                          // Gọi prop onLogout
//                     }}
//                       className="text-red-900 font-semibold hover:bg-gray-100 block px-2 py-1 rounded">
//
//                     {/*<i className=Lập Trình Web'bx bxs-log-out'></i>*/}
//
//
//
//
//                     Đăng xuất
//                 </span>
//             </Menu.Item>
//         </Menu>
//     )
//     return (
//         <div
//             className={`overflow-x-auto font-[Poppins,sans-serif] m-0 p-0 box-border transition-colors duration-300 ${
//                 darkMode ? "bg-[#060714] text-[#FBFBFB]" : "bg-[#eee] text-[#342E37]"
//             }`}
//         >
//             {/* SIDEBAR */}
//             <section
//                 className={`sidebar ${sidebarOpen ? "" : "hide"} ${
//                     darkMode ? "dark" : ""
//                 } before:content-[''] before:absolute before:w-10 before:h-10 before:-top-10 before:right-0 before:rounded-full ${
//                     darkMode
//                         ? "before:shadow-[20px_20px_0_#111]"
//                         : "before:shadow-[20px_20px_0_#F9F9F9]"
//                 }`}
//             >
//                 <Link
//                     to="#"
//                     className="flex items-center h-14 font-bold text-2xl sticky top-0 left-0 z-[500] pb-5 box-content text-[#6B7597]"
//                 >
//                     {/*<img src="../img/logoandtextlogo.svg" alt="logo" className="h-9 object-cover ml-5" />*/}
//                 </Link>
//
//                 <div className="menu top">
//                     <div className="menu-item">
//                         <Link
//                             to="#"
//                             className={`menu-link ${sidebarOpen ? "" : "hide"} hover:text-[#84ea71] ${
//                                 darkMode ? "dark" : ""
//                             }`}
//                         >
//                             <FontAwesomeIcon
//                                 icon={faTachometerAlt}
//                                 className="min-w-[40px] flex justify-center"
//                             />
//                             {sidebarOpen && <span>Dashboard</span>}
//                         </Link>
//                     </div>
//                     <div className="menu-item active">
//                         <Link
//                             to="#"
//                             className={`menu-link ${sidebarOpen ? "" : "hide"} text-[#6B7597] ${
//                                 darkMode ? "dark" : ""
//                             }`}
//                         >
//                             <FontAwesomeIcon
//                                 icon={faShoppingBag}
//                                 className="min-w-[40px] flex justify-center"
//                             />
//                             {sidebarOpen && <span>Topic + word</span>}
//                         </Link>
//                     </div>
//                     <div className="menu-item active">
//                         <Link
//                             to="#"
//                             className={`menu-link ${sidebarOpen ? "" : "hide"} text-[#6B7597] ${
//                                 darkMode ? "dark" : ""
//                             }`}
//                         >
//                             <FontAwesomeIcon
//                                 icon={faComments}
//                                 className="min-w-[40px] flex justify-center"
//                             />
//                             {sidebarOpen && <span>Courses</span>}
//                         </Link>
//                     </div>
//                     <div className="menu-item">
//                         <Link
//                             to="#"
//                             className={`menu-link ${sidebarOpen ? "" : "hide"} hover:text-[#84ea71] ${
//                                 darkMode ? "dark" : ""
//                             }`}
//                         >
//                             <FontAwesomeIcon
//                                 icon={faUsers}
//                                 className="min-w-[40px] flex justify-center"
//                             />
//                             {sidebarOpen && <span>Student</span>}
//                         </Link>
//                     </div>
//                     <div className="menu-item">
//                         <Link
//                             to="#"
//                             className={`menu-link ${sidebarOpen ? "" : "hide"} hover:text-[#84ea71] ${
//                                 darkMode ? "dark" : ""
//                             }`}
//                         >
//                             <FontAwesomeIcon
//                                 icon={faGraduationCap}
//                                 className="min-w-[40px] flex justify-center"
//                             />
//                             {sidebarOpen && <span>Exam</span>}
//                         </Link>
//                     </div>
//                 </div>
//
//                 <div className="menu">
//                     <div className="menu-item">
//                         <Link
//                             to="#"
//                             className={`menu-link ${sidebarOpen ? "" : "hide"} ${
//                                 darkMode ? "dark" : ""
//                             }`}
//                         >
//                             <FontAwesomeIcon
//                                 icon={faCog}
//                                 className="min-w-[40px] flex justify-center"
//                             />
//                             {sidebarOpen && <span>Settings</span>}
//                         </Link>
//                     </div>
//                     <div className="menu-item">
//                         <Link
//                             to="#"
//                             className={`menu-link ${sidebarOpen ? "" : "hide"} text-[#DB504A] ${
//                                 darkMode ? "dark" : ""
//                             }`}
//                         >
//                             <FontAwesomeIcon
//                                 icon={faSignOutAlt}
//                                 className="min-w-[40px] flex justify-center"
//                             />
//                             {sidebarOpen && <span>Logout</span>}
//                         </Link>
//                     </div>
//                 </div>
//             </section>
//
//             {/* CONTENT */}
//             <section
//                 className={`relative transition-all duration-300 ease-in-out ${
//                     sidebarOpen
//                         ? "w-[calc(100%-280px)] left-[280px]"
//                         : "w-[calc(100%-60px)] left-[60px]"
//                 } max-[768px]:w-[calc(100%-60px)] max-[768px]:left-[200px]`}
//             >
//                 {/* NAVBAR */}
//                 <nav
//                     className={`h-14 px-6 flex items-center gap-6 font-[Lato,sans-serif] sticky top-0 left-0 z-[1000] ${
//                         darkMode ? "bg-[#111]" : "bg-[#F9F9F9]"
//                     } before:content-[''] before:absolute before:w-10 before:h-10 before:-bottom-10 before:left-0 before:rounded-full ${
//                         darkMode
//                             ? "before:shadow-[-20px_-20px_0_#111]"
//                             : "before:shadow-[-20px_-20px_0_#F9F9F9]"
//                     }`}
//                 >
//                     <FontAwesomeIcon
//                         icon={faBars}
//                         className={`cursor-pointer ${darkMode ? "text-[#FBFBFB]" : "text-[#342E37]"}`}
//                         onClick={() => setSidebarOpen(!sidebarOpen)}
//                     />
//                     <div className="flex items-center gap-[10px] ml-auto mr-5">
//                         <input
//                             type="checkbox"
//                             id="switch-mode"
//                             hidden
//                             checked={darkMode}
//                             onChange={() => setDarkMode(!darkMode)}
//                         />
//                         <label
//                             htmlFor="switch-mode"
//                             className={`switch-toggle ${darkMode ? "dark" : ""}`}
//                         ></label>
//                         <Link to="#" className={`text-xl relative ${darkMode ? "text-[#FBFBFB]" : "text-[#342E37]"}`}>
//                             <FontAwesomeIcon icon={faBell} />
//                             <span
//                                 className={`absolute -top-[6px] -right-[6px] w-5 h-5 rounded-full border-2 font-bold text-xs flex justify-center items-center ${
//                                     darkMode
//                                         ? "border-[#111] bg-[#6B7597] text-[#F9F9F9]"
//                                         : "border-[#F9F9F9] bg-[#6B7597] text-[#F9F9F9]"
//                                 }`}
//                             >
//                 8
//               </span>
//                         </Link>
//                         {/*<Link to="#" className="relative">*/}
//                         {/*    <img*/}
//                         {/*        src="../img/quanmario.png"*/}
//                         {/*        alt="profile"*/}
//                         {/*        className="w-9 h-9 object-cover rounded-full"*/}
//                         {/*    />*/}
//                         {/*</Link>*/}
//                         <Dropdown overlay={userMenu} trigger={['hover']}>
//                             {/*<Avatar*/}
//                             {/*    size={40}*/}
//                             {/*    icon={<FontAwesomeIcon icon={faUser} />}*/}
//                             {/*    className="cursor-pointer"*/}
//                             {/*/>*/}
//                             {/*<div*/}
//                             {/*    className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-400  cursor-pointer hover:bg-gray-400 transition"*/}
//                             {/*>*/}
//                             {/*    /!*<FontAwesomeIcon icon={faUser} className="text-lg" />*!/*/}
//                             {/*    /!*<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343"><path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"/></svg>*!/*/}
//                             {/*    <svg xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="30px" fill="#434343"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17-62.5t47-43.5q60-30 124.5-46T480-440q67 0 131.5 16T736-378q30 15 47 43.5t17 62.5v112H160Zm320-400q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm160 228v92h80v-32q0-11-5-20t-15-14q-14-8-29.5-14.5T640-332Zm-240-21v53h160v-53q-20-4-40-5.5t-40-1.5q-20 0-40 1.5t-40 5.5ZM240-240h80v-92q-15 5-30.5 11.5T260-306q-10 5-15 14t-5 20v32Zm400 0H320h320ZM480-640Z"/></svg>*/}
//                             {/*</div>*/}
//                             <img
//                                 src={currentUser?.avatar || Avatar}
//                                 alt="Avatar"
//                                 className="w-10 h-10 rounded-full cursor-pointer object-cover"
//                             />
//                         </Dropdown>
//                     </div>
//                 </nav>
//
//                 {/* MAIN */}
//                 <main className="w-full p-[36px_24px] font-[Poppins,sans-serif] max-h-[calc(100vh-56px)] overflow-y-auto">
//                     <div className="flex items-center justify-between gap-4 flex-wrap">
//                         <div>
//                             <h1 className="text-[36px] font-semibold mb-[10px]">Courses</h1>
//                             <div className="flex items-center gap-4">
//                                 <span className="text-[#AAAAAA] pointer-events-none">Courses</span>
//                                 <FontAwesomeIcon icon={faChevronRight} />
//                                 <Link to="#" className="text-[#6B7597]">
//                                     Home
//                                 </Link>
//                             </div>
//                         </div>
//                         <div className="flex gap-[10px]">
//                             <Link
//                                 to="#"
//                                 className="px-5 py-[10px] rounded-[5px] text-base bg-[#6B7597] text-[#F9F9F9] transition-all duration-300 hover:bg-[#84ea71] hover:text-[#F9F9F9] flex items-center gap-2"
//                             >
//                                 <FontAwesomeIcon icon={faPlusSquare} />
//                                 <span>Add New</span>
//                             </Link>
//                         </div>
//                     </div>
//
//                     <form className="w-full mr-auto mt-5">
//                         <div className="flex items-center h-9">
//                             <input
//                                 type="search"
//                                 placeholder="Search..."
//                                 className="flex-grow px-4 h-full border-2 border-[#6B7597] bg-[#eee] rounded-[36px_0_0_36px] outline-none w-full max-[576px]:hidden"
//                             />
//                             <button
//                                 type="submit"
//                                 className="w-9 h-full flex justify-center items-center bg-[#6B7597] text-[#F9F9F9] text-lg border-none outline-none rounded-[0_36px_36px_0] cursor-pointer max-[576px]:bg-transparent max-[576px]:text-[#342E37] max-[576px]:w-auto max-[576px]:h-auto form-[.show]:w-9 form-[.show]:h-full form-[.show]:bg-[#DB504A] form-[.show]:text-[#F9F9F9] form-[.show]:rounded-[0_36px_36px_0]"
//                             >
//                                 <FontAwesomeIcon icon={faSearch} />
//                             </button>
//                         </div>
//                     </form>
//
//                     <div className="flex flex-wrap gap-6 mt-6 w-full">
//                         <div
//                             className={`flex-grow basis-[500px] rounded-[20px] p-6 ${
//                                 darkMode ? "bg-[#111]" : "bg-[#F9F9F9]"
//                             }`}
//                         >
//                             <div className="flex items-center gap-4 mb-6 min-w-[420px]">
//                                 <h3 className="mr-auto text-2xl font-semibold">Courses</h3>
//                                 <FontAwesomeIcon icon={faSearch} className="cursor-pointer" />
//                                 <FontAwesomeIcon icon={faFilter} className="cursor-pointer" />
//                             </div>
//                             <section className="content">
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//                             </section>
//                         </div>
//                     </div>
//                 </main>
//             </section>
//         </div>
//     );
// };
//
// export default Courses;