import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBars, faBell, faChevronRight, faPlusSquare, faUsers, faGraduationCap, faCog, faSignOutAlt,} from '@fortawesome/free-solid-svg-icons';
import { Dropdown, Menu } from 'antd';
import { useAppDispatch, useAppSelector } from '../hooks/Hook';
import { addExam } from '../apis/ExamApi.ts';
import Avatar from '../assets/avatar.svg';
import handleLogout from '../components/handleLogout';
import '../styles/d1.css';
// import '../styles/addDataExam.css';

const AddExam = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { currentUser } = useAppSelector((state) => state.user);
    const [examTitle, setExamTitle] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [darkMode, setDarkMode] = useState(false);

    const handleAddExam = async () => {
        if (examTitle.trim()) {
            await dispatch(addExam({ title: examTitle, status: false }));
            navigate('/addExam');
        }
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
            className={`font-[Poppins,sans-serif] m-0 p-0 box-border transition-colors duration-300 ${
                darkMode ? 'bg-[#37353E] text-[#FBFBFB]' : 'bg-[#eee] min-h-screen text-[#342E37]'
            }`}
        >
            <section
                className={`sidebar ${sidebarOpen ? '' : 'hide'} ${
                    darkMode ? 'dark' : ''
                } before:content-[''] before:absolute before:w-10 before:h-10 before:-top-10 before:right-0 before:rounded-full ${
                    darkMode ? 'before:shadow-[20px_20px_0_#111]' : 'before:shadow-[20px_20px_0_#F9F9F9]'
                }`}
            >
                <Link
                    to="#"
                    className="flex items-center h-14 font-bold text-2xl sticky top-0 left-0 z-[500] pb-5 box-content text-[#6B7597]"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="40px"
                        viewBox="0 -960 960 960"
                        width="60px"
                        fill="#6a7698"
                    >
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
                        <Link to="/categoryManagement" className={`menu-link group ${sidebarOpen ? '' : 'hide'} text-[#6B7597]`}>
                            <svg
                                className="min-w-[40px] flex justify-center group-hover:fill-[#6B7597] transition-colors duration-200"
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="#302E36"
                                viewBox="0 0 24 24"
                            >
                                <path d="M7 3a4 4 0 1 0 0 8 4 4 0 1 0 0-8M17 3a4 4 0 1 0 0 8 4 4 0 1 0 0-8M7 13a4 4 0 1 0 0 8 4 4 0 1 0 0-8M18 13h-2v3h-3v2h3v3h2v-3h3v-2h-3z"></path>
                            </svg>
                            {sidebarOpen && (
                                <span className="group-hover:text-[#6B7597] transition-colors duration-200">Category</span>
                            )}
                        </Link>
                    </div>
                    <div className="menu-item">
                        <Link to="/testManagement" className={`menu-link ${sidebarOpen ? '' : 'hide'} text-[#6B7597]`}>
                            <svg
                                className="min-w-[40px] flex justify-center"
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="#6B7597"
                                viewBox="0 0 24 24"
                            >
                                <path d="M4 2H2v19c0 .55.45 1 1 1h19v-2H4z"></path>
                                <path d="M7 10h11c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1H7c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1m10-2h-5V6h5zM8 6h2v2H8zM21 12H7c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1M8 14h6v2H8zm12 2h-4v-2h4z"></path>
                            </svg>
                            {sidebarOpen && <span>Test</span>}
                        </Link>
                    </div>
                    <div className="menu-item">
                        <Link to="/courseManagement" className={`menu-link ${sidebarOpen ? '' : 'hide'} text-[#6B7597]`}>
                            <i className="bx bxs-message-dots min-w-[40px] flex justify-center"></i>
                            {sidebarOpen && <span>Courses</span>}
                        </Link>
                    </div>
                    <div className="menu-item">
                        <Link to="/studentManagement" className={`menu-link ${sidebarOpen ? '' : 'hide'} hover:text-[#7F88A8]`}>
                            <FontAwesomeIcon icon={faUsers} className="min-w-[40px] flex justify-center" />
                            {sidebarOpen && <span>Student</span>}
                        </Link>
                    </div>
                    <div className="menu-item active">
                        <Link to="/examManagement" className={`menu-link ${sidebarOpen ? '' : 'hide'} text-[#6B7597]`}>
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
            <section
                className={`relative transition-all duration-300 ease-in-out ${
                    sidebarOpen ? 'w-[calc(100%-280px)] left-[280px]' : 'w-[calc(100%-60px)] left-[60px]'
                } max-[768px]:w-[calc(100%-60px)] max-[768px]:left-[60px]`}
            >
                <nav
                    className={`h-14 px-6 flex items-center gap-6 font-[Lato,sans-serif] sticky top-0 left-0 z-[1000] ${
                        darkMode ? 'bg-[#111]' : 'bg-[#F9F9F9]'
                    } before:content-[''] before:absolute before:w-10 before:h-10 before:-bottom-10 before:left-0 before:rounded-full ${
                        darkMode ? 'before:shadow-[-20px_-20px_0_#111]' : 'before:shadow-[-20px_-20px_0_#F9F9F9]'
                    }`}
                >
                    <FontAwesomeIcon
                        icon={faBars}
                        className={`cursor-pointer ${darkMode ? 'text-[#FBFBFB]' : 'text-[#342E37]'}`}
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
                        <label htmlFor="switch-mode" className={`switch-toggle ${darkMode ? 'dark' : ''}`}></label>
                        <Link to="#" className={`text-xl relative ${darkMode ? 'text-[#FBFBFB]' : 'text-[#342E37]'}`}>
                            <FontAwesomeIcon icon={faBell} />
                            <span
                                className={`absolute -top-[6px] -right-[6px] w-5 h-5 rounded-full border-2 font-bold text-xs flex justify-center items-center ${
                                    darkMode ? 'border-[#111] bg-[#6B7597] text-[#F9F9F9]' : 'border-[#F9F9F9] bg-[#6B7597] text-[#F9F9F9]'
                                }`}
                            >
                8
              </span>
                        </Link>
                        <Dropdown overlay={userMenu} trigger={['hover']}>
                            <img
                                src={currentUser?.avatar || Avatar}
                                alt="Avatar"
                                className="w-10 h-10 rounded-full cursor-pointer object-cover"
                            />
                        </Dropdown>
                    </div>
                </nav>
                <main className="w-full min-h-screen p-[36px_24px] font-[Poppins,sans-serif] max-h-[calc(100vh-56px)] overflow-y-auto">
                    <div className="head-title">
                        <div className="left">
                            <h1>Add Exam</h1>
                            <ul className="breadcrumb">
                                <li><Link to="/examManagement">Exams</Link></li>
                                <li><FontAwesomeIcon icon={faChevronRight} /></li>
                                <li><span className="active">Add Exam</span></li>
                            </ul>
                        </div>
                    </div>
                    <div className="table-data">
                        <div className="order">
                            <div className="head">
                                <h3>Create New Exam</h3>
                            </div>
                            <div className="form-input">
                                <input
                                    type="text"
                                    value={examTitle}
                                    onChange={(e) => setExamTitle(e.target.value)}
                                    placeholder="Nhập tiêu đề bài thi"
                                />
                                <button onClick={handleAddExam} className="btn-new">
                                    <FontAwesomeIcon icon={faPlusSquare} />
                                    <span className="status adding">Add Exam</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </div>
    );
};

export default AddExam;