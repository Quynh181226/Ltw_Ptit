// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import '../src/styles/style.css'; // Assuming the CSS is saved in a separate file
// import 'https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css';
//
// const App: React.FC = () => {
//     return (
//         <html lang="en">
//         <head>
//             <meta charSet="UTF-8" />
//             <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//             <title>MankaiHub</title>
//         </head>
//         <body>
//         {/* SIDEBAR */}
//         <section id="sidebar">
//             <a href="#" className="brand" id="brandLink">
//                 <img src="../img/logoandtextlogo.svg" alt="logo" />
//             </a>
//             <ul className="side-menu top">
//                 <li>
//                     <a id="dashboardLink">
//                         <i className="bx bxs-dashboard"></i>
//                         <span className="text">Dashboard</span>
//                     </a>
//                 </li>
//                 <li>
//                     <a href="#" id="topicLink" className="active">
//                         <i className="bx bxs-shopping-bag-alt"></i>
//                         <span className="text">Topic + word</span>
//                     </a>
//                 </li>
//                 <li className="active">
//                     <a href="#" id="messageLink">
//                         <i className="bx bxs-message-dots"></i>
//                         <span className="text">Courses</span>
//                     </a>
//                 </li>
//                 <li>
//                     <a id="studentLink">
//                         <i className="bx bxs-group"></i>
//                         <span className="text">Student</span>
//                     </a>
//                 </li>
//                 <li>
//                     <a id="addExamLink">
//                         <i className="bx bxs-graduation"></i>
//                         <span className="text">Exam</span>
//                     </a>
//                 </li>
//             </ul>
//             <ul className="side-menu">
//                 <li>
//                     <a href="#" id="settingsLink">
//                         <i className="bx bxs-cog"></i>
//                         <span className="text">Settings</span>
//                     </a>
//                 </li>
//                 <li>
//                     <a href="#" id="logoutLink">
//                         <i className="bx bxs-log-out-circle"></i>
//                         <span className="text">Logout</span>
//                     </a>
//                 </li>
//             </ul>
//         </section>
//
//         {/* CONTENT */}
//         <section id="content">
//             {/* NAVBAR */}
//             <nav>
//                 <i className="bx bx-menu"></i>
//                 <div className="logo-admin">
//                     <input type="checkbox" id="switch-mode" hidden />
//                     <label htmlFor="switch-mode" className="switch-mode"></label>
//                     <a href="#" className="notification">
//                         <i className="bx bxs-bell"></i>
//                         <span className="num">8</span>
//                     </a>
//                     <a href="#" className="profile">
//                         <img src="../img/quanmario.png" alt="profile" />
//                     </a>
//                 </div>
//             </nav>
//             {/* NAVBAR */}
//
//             {/* MAIN */}
//             <main>
//                 <div className="head-title">
//                     <div className="left">
//                         <h1>Courses</h1>
//                         <ul className="breadcrumb">
//                             <li>
//                                 <a href="#">Courses</a>
//                             </li>
//                             <li>
//                                 <i className="bx bx-chevron-right"></i>
//                             </li>
//                             <li>
//                                 <a className="active" href="#">
//                                     Home
//                                 </a>
//                             </li>
//                         </ul>
//                     </div>
//                     <div className="change-word">
//                         <a id="btnAdd" className="btn-new">
//                             <i className="bx bxs-plus-square"></i>
//                             <span className="status adding">Add New</span>
//                         </a>
//                     </div>
//                 </div>
//                 <form action="#">
//                     <div className="form-input">
//                         <input type="search" placeholder="Search..." />
//                         <button type="submit" className="search-btn">
//                             <i className="bx bx-search"></i>
//                         </button>
//                     </div>
//                 </form>
//                 {/* Main Content */}
//                 <div className="table-data">
//                     <div className="order">
//                         <div className="head">
//                             <h3>Courses</h3>
//                             <i className="bx bx-search"></i>
//                             <i className="bx bx-filter"></i>
//                         </div>
//                         <section id="SectionMainContent" className="content">
//                             {/* Static sample card */}
//                             <div className="card">
//                                 <div className="header-card">
//                                     <div className="content">
//                                         <div className="title-section">
//                                             <div className="label">Courses</div>
//                                             <div className="title">Title: Sample LessonList.tsx</div>
//                                         </div>
//                                         <div className="info">
//                                             <div className="label">0 Bài</div>
//                                             <div className="dot"></div>
//                                             <div className="label waitingAlert">Chờ duyệt</div>
//                                         </div>
//                                     </div>
//                                     <div className="icon-card">
//                                         <div className="grid-lines-card"></div>
//                                         <div className="icon-content-card">
//                                             <img src="../img/imgCourse.svg" alt="Frame" />
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="button-container">
//                                     <button className="button-card">
//                         <span>
//                           Xem chi tiết{' '}
//                             <img className="arbtn" src="../img/arrow-right.svg" alt="arrow-right" />
//                         </span>
//                                     </button>
//                                 </div>
//                             </div>
//                         </section>
//                     </div>
//                 </div>
//             </main>
//             {/* MAIN */}
//         </section>
//
//         <div id="overlay" className="overlay"></div>
//         <div className="add-course-modal" id="addCourseModal">
//             <div className="add-course-modal-content">
//                 <div className="add-course-modal-header">
//                     <h3>Thêm khóa học mới</h3>
//                     <button id="closeAddCourseModal" className="close-modal-btn">
//                         <svg
//                             width="24"
//                             height="24"
//                             viewBox="0 0 24 24"
//                             fill="none"
//                             xmlns="http://www.w3.org/2000/svg"
//                         >
//                             <path
//                                 d="M18 6L6 18"
//                                 stroke="currentColor"
//                                 strokeWidth="2"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                             />
//                             <path
//                                 d="M6 6L18 18"
//                                 stroke="currentColor"
//                                 strokeWidth="2"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                             />
//                         </svg>
//                     </button>
//                 </div>
//                 <div className="add-course-modal-body">
//                     <div className="form-group">
//                         <label htmlFor="courseTitle">
//                             Tên khóa học <span className="required">*</span>
//                         </label>
//                         <input type="text" id="courseTitle" placeholder="Nhập tên khóa học..." />
//                     </div>
//                     <div className="add-word-modal-footer">
//                         <button id="cancelAddWord" className="secondary-btn">
//                             Hủy bỏ
//                         </button>
//                         <button id="saveNewWord" className="primary-btn">
//                             Thêm mới
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//         </body>
//         </html>
//     );
// };
//
// const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
// root.render(<App />);