import handleLogout from "../components/handleLogout.tsx";
import Footer from "../components/Footer.tsx";
import ChevronContainer from "../assets/ChevronContainer.svg";
import Avatar from "../assets/Avatar.svg";
import Streaks from "../assets/Streaks.svg";
import Design1 from "../assets/Design 1.svg";
import courseImg from "../assets/courseImg.png";
import Bookmark2 from "../assets/bookmark-2.svg";
import imgClock from "../assets/imgClock.webp";
import imgNote from "../assets/imgNote.webp";
import imgCaculate from "../assets/imgCaculate.png";
import Image4 from "../assets/image 4.svg";
import Group4 from "../assets/Group 4.svg";
import imgWeather from "../assets/imgWeather.webp";
import imgGame from "../assets/imgGame.png";
import Hat from "../assets/hat.svg";
import Object1 from "../assets/Object 1.svg";
import ChevronLeft from "../assets/Chevron-left.svg";
import ChevronRight from "../assets/Chevron-right.svg";
import BackgroundNav from "../assets/backgroundNav.svg";
import {Link, useNavigate} from "react-router-dom";
import Header from "../components/Header.tsx";
// import QuizList from "../components/QuizList.tsx";
import Dashboard from "./Dashboard.tsx";
import {useAppDispatch, useAppSelector} from "../hooks/Hook.ts";
import {useEffect, useState} from "react";
import {getAllCourses} from "../apis/CourseApi.ts";
import CourseCard1 from "../components/CourseCard1.tsx";
import LoadingProcess from "../components/LoadingProcess.tsx";
import {getAllUsers} from "../apis/UserApi.ts";
import cup from "../assets/cup.svg";

export const HomePage = () => {
    const navigate=useNavigate();
    const dispatch = useAppDispatch();
    const [rankedUsers, setRankedUsers] = useState<any[]>([]);
    const { users } = useAppSelector((state) => state.user);
    const { currentUser } = useAppSelector((state) => state.user);
    const { list: courses, status, error } = useAppSelector((state) => state.courses);

    useEffect(() => {
        dispatch(getAllUsers());
        dispatch(getAllCourses());
    }, [dispatch]);

    useEffect(() => {
        if (users.length > 0) {
            const usersWithPoints = users.map(user => ({
                ...user,
                points: Math.floor(Math.random() * 100) + 1,
                streaks: Math.floor(Math.random() * 5) + 1,
                // weeks: `${Math.floor(Math.random() * 4) + 1}/4`
            }));

            const sortedUsers = usersWithPoints.sort((a, b) => b.points - a.points);
            setRankedUsers(sortedUsers);
        }
    }, [users]);

    const topThree = rankedUsers.slice(0, 3);
    const remainingUsers = rankedUsers.slice(3);

    const getRankColor = (rank: number) => {
        switch (rank) {
            case 1: return 'bg-yellow-400';
            case 2: return 'bg-gray-400';
            case 3: return 'bg-orange-400';
            default: return 'bg-blue-400';
        }
    };

    const getRankIcon = (rank: number) => {
        if (rank <= 3) {
            return <img className="hp-crown absolute w-6 h-4 top-[-12px] left-0 rotate-[-15deg]" src={Hat} alt="crown" />;
        }
        return null;
    };

    return (
        <>
            <Header onLogout={handleLogout} />
            <main className="ml-20 mr-20 ">
                <div className="mb-[-40px] bg-cover bg-center w-full aspect-[16/4] rounded-bl-[16px] rounded-br-[16px] p-4 mt-25.5  animate-slide-down opacity-0 translate-y-[-100px] animation-fill-mode-forwards duration-800 ease-out"
                    style={{ backgroundImage: `url(${BackgroundNav})` }}
                >
                    <div className=" text-left mt-16 box-border">
                        <nav className="text-white pb-2.5 flex flex-row gap-2">
                            <img alt="Icon" src={ChevronContainer} className="hp-nav-img invert brightness-0"/>
                            <Link to="/homePage" className="hover:text-blue-50">Trang chủ</Link> / <a>Khoá học online</a>
                        </nav>
                        <div className="w-[514px] h-[184px] rounded-[16px] bg-white p-4 flex flex-col gap-4">
                            <div className="flex gap-4">
                                <div className="shadow-sm bg-gray-200 rounded-full w-[54px] h-[54px] flex justify-center items-center">
                                    <img src={currentUser?.avatar || Avatar} alt="Icon" className="h-[50px] rounded-full object-cover"/>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-[26px] text-[#3D3D3D]" id="nameUser">
                                        {currentUser?.fullName}
                                    </h3>
                                    <div className="flex flex-wrap gap-x-2 text-[14px] text-gray-500">
                                        <span id="emailUser">{currentUser?.email}</span>
                                        {/*<span id="homeTown">Đông Anh, Hà Thành</span>*/}
                                    </div>
                                </div>
                            </div>

                            {/* Thông tin thống kê */}
                            <div className="w-full py-4 px-[54px] rounded-md pb-2 bg-[#F5F3F8] flex justify-around items-center text-[#7E86A2]">
                                {/* Streak */}
                                <div className="flex flex-col items-center justify-center text-center gap-[6px]">
                                    <h3 className="text-[#4A5068] font-bold text-[16px] flex items-center gap-1">
                                        <img src={Streaks} alt="" />
                                        <strong id="rankingUser" className="text-[#6B7597]">54</strong>
                                    </h3>
                                    <span className="text-[#7E86A2]">Streak</span>
                                </div>

                                {/* Divider */}
                                <div className="text-[#9AA1BA]">|</div>

                                {/* Bảng xếp hạng */}
                                <div className="flex flex-col items-center justify-center text-center gap-[6px]">
                                    <h3 className="text-[#4A5068] font-bold text-[16px] flex items-center gap-1">
                                        <img src={Design1} alt="" />
                                        <strong id="rankingUser" className="text-[#6B7597]">10</strong>
                                    </h3>
                                    <span className="text-[#7E86A2]">Bảng Xếp Hạng</span>
                                </div>

                                {/* Divider */}
                                <div className="text-[#9AA1BA]">|</div>

                                {/* Điểm kinh nghiệm */}
                                <div className="flex flex-col items-center justify-center text-center gap-[6px]">
                                    <h3 className="text-[#4A5068] font-bold text-[16px] flex items-center gap-1">
                                        <img src={Object1} alt="" />
                                        <strong className="text-[#6B7597]">10</strong>
                                    </h3>
                                    <span className="text-[#7E86A2]">Điểm kinh nghiệm</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <h1 className="text-3xl font-bold">
                    Khoá học cơ bản <span />
                </h1>
                <section className="flex gap-4 mt-6">
                    <div className="w-1/2 bg-white h-[220px] rounded-[16px] p-4 border border-[#DDDDDD] flex flex-col justify-between relative">
                        <span className="hp-course-span text-[#676767] font-light">Khoá học</span>
                        <h3 className="text-xl font-semibold">Tiếng nhật sơ cấp</h3>
                        <div className="flex items-center gap-4 mt-3">
                            <div className="w-1/3 h-2.5 bg-[#D6DAE4] rounded-[30px] flex items-center">
                                <div className="w-[43%] h-2 rounded-[30px] bg-[#7E86A2] border-2 border-[#6B7597] transition-all duration-300"></div>
                            </div>

                            <span className="hp-progress-text text-xs text-[#6B7597] font-medium">
                                40% hoàn thành{" "}
                                <span className="hp-dot text-[#8B93AF]">•</span>{" "}
                                còn 4 bài chưa học
                            </span>
                        </div>
                        <div className="flex items-center">
                            <button className="px-4 h-[50px] rounded-[16px] border border-[#6B7597] bg-white text-[#6B7597] font-bold text-[16px] shadow-[0_3px_0_0_#4E5670] cursor-pointer hover:bg-[#ECEFF7] transition">
                                <Link to="/hiragana">
                                    Tiếp tục học
                                </Link>
                            </button>
                        </div>
                        <div className="absolute right-5 top-4 w-[77px] h-[77px] rounded-[10px] border-[1px] border-[#343434] rotate-[-5deg]  shadow-[4px_3.5px_0_#343434]  flex items-center justify-center overflow-hidden">
                            <img src={courseImg} alt="" />
                        </div>
                    </div>
                    <div className="hp-section-main-box w-1/2 bg-white h-[220px] rounded-[16px] p-4 border border-[#DDDDDD] flex flex-col justify-between relative">
                        <span className="hp-course-span text-[#676767] font-light">Khoá học</span>
                        <h3 className="hp-course-h3 text-xl font-semibold">Danh sách video tiếng nhật </h3>
                        <div className="flex items-center gap-4 mt-3">
                            <div className="hp-bar-process w-1/3 h-2.5 bg-[#D6DAE4] rounded-[30px] flex items-center">
                                <div className="hp-bar-process-active w-[23%] h-2 rounded-[30px] bg-[#7E86A2] border-2 border-[#6B7597] transition-all duration-300"></div>
                            </div>

                            <span className="hp-progress-text text-xs text-[#6B7597] font-medium">
                                20% hoàn thành{" "}
                                <span className="hp-dot text-[#8B93AF]">•</span>{" "}
                                còn 5 video chưa học
                            </span>
                        </div>

                        <div className="flex items-center">
                            <button className="px-4 h-[50px] rounded-[16px] border border-[#6B7597] bg-white text-[#6B7597] font-bold text-[16px] shadow-[0_3px_0_0_#4E5670] cursor-pointer hover:bg-[#ECEFF7] transition">
                                <Link to="/video2">
                                    Tiếp tục học
                                </Link>
                            </button>
                        </div>
                        <div className="absolute right-5 top-4 w-[77px] h-[77px] rounded-[10px] border-[1px] border-[#343434] rotate-[-5deg]  shadow-[4px_3.5px_0_#343434]  flex items-center justify-center overflow-hidden">
                            <img src={courseImg} alt="" />
                        </div>
                    </div>
                </section>
                <h1 className="text-3xl font-bold mt-12 mb-[-8px]">
                   Test theo chủ đề <span />
                </h1>
                <Dashboard />
                <section className="flex justify-between mt-12 w-full">
                    <div className="hp-section-main-2-box-1 w-[68%] flex flex-col gap-6">
                        <div className="hp-section-main-2-box-1-1 w-full bg-white rounded-[16px] p-4 border border-[#DDDDDD] flex flex-col gap-4">
                            <div className="hp-container-1 flex items-center gap-4">
                                <div className="hp-box-icon-container w-14 h-14 bg-[#F9F6F2] flex justify-center items-center rounded-[8px]">
                                    <img src={Bookmark2} alt="icon" className="w-6" />
                                </div>
                                <div className="hp-container-12">
                                    <h3 className="hp-container-h3 text-lg">Tên bài học</h3>
                                    <span className="hp-container-span text-[#3D3D3D] font-normal">
                                    Bài giảng chuẩn hoá bởi chuyên gia hàng đầu
                                  </span>
                                </div>
                            </div>
                            <div className="hp-container-box-13 w-full h-[180px] border border-[#DDDD] rounded-[16px] mt-4 p-4 flex flex-col justify-end relative overflow-hidden">
                                <div className="hp-container-box-13-in flex flex-col justify-end gap-5">
                                    <span className="hp-span-1 text-[#8C95B1] text-2xl font-bold">Watch Timer</span>
                                    <span className="hp-span-2 text-[#676767] text-sm font-normal">
                                        Luyện tập hội thoại Tiếng Nhật mọi lúc mọi nơi với AI
                                      </span>
                                    <button className="relative w-[163px] h-[50px] border-2 border-[#5D678A] rounded-[16px] shadow-[0_4px_0_0_#4A5068] text-white font-bold text-[16px] bg-[#7E86A2] overflow-hidden cursor-pointer transition-all duration-200 ease-in-out hover:brightness-105 hover:shadow-[0_5px_0_0_#4A5068] active:translate-y-[2px] active:shadow-[0_2px_0_0_#4A5068] before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(-115deg,_#7E86A2_60%,_#9AA1BA_60%,_#9AA1BA_62%,_#7E86A2_62%,_#7E86A2_65%,_#9AA1BA_65%,_#9AA1BA_70%,_#7E86A2_70%,_#7E86A2_73%,_#9AA1BA_73%,_#9AA1BA_75%,_#7E86A2_75%)] before:pointer-events-none before:z-0">
                                        <Link to='/watchTimer' className='relative z-[1]'>Bắt đầu</Link>
                                    </button>
                                    <img className="absolute right-2.5 bottom-5 w-42 animate-bounce-up-down z-50" src={imgClock} alt="icon" />
                                    <img className="hp-group-4 absolute right-[-30px] bottom-[-10px] w-[260px] h-[160px]" src={Group4} alt="icon" />
                                </div>
                            </div>
                            <div className="hp-container-box-13 w-full h-[180px] border border-[#DDDD] rounded-[16px] mt-4 p-4 flex flex-col justify-end relative overflow-hidden">
                                <div className="hp-container-box-13-in flex flex-col justify-end gap-5">
                                    <span className="hp-span-1 text-[#8C95B1] text-2xl font-bold">Kaiwa AI</span>
                                    <span className="hp-span-2 text-[#676767] text-sm font-normal">
                                        Luyện tập hội thoại Tiếng Nhật mọi lúc mọi nơi với AI
                                      </span>
                                    <button className="relative w-[163px] h-[50px] border-2 border-[#5D678A] rounded-[16px] shadow-[0_4px_0_0_#4A5068] text-white font-bold text-[16px] bg-[#7E86A2] overflow-hidden cursor-pointer transition-all duration-200 ease-in-out hover:brightness-105 hover:shadow-[0_5px_0_0_#4A5068] active:translate-y-[2px] active:shadow-[0_2px_0_0_#4A5068] before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(-115deg,_#7E86A2_60%,_#9AA1BA_60%,_#9AA1BA_62%,_#7E86A2_62%,_#7E86A2_65%,_#9AA1BA_65%,_#9AA1BA_70%,_#7E86A2_70%,_#7E86A2_73%,_#9AA1BA_73%,_#9AA1BA_75%,_#7E86A2_75%)] before:pointer-events-none before:z-0">
                                        <Link to='/kaiwaAIChat' className='relative z-[1]'>
                                            Nhận tư vấn
                                        </Link>
                                    </button>
                                    <img className="hp-img-target absolute right-2.5 bottom-5 animate-bounce-up-down z-50" src={Image4} alt="icon" />
                                    <img className="hp-group-4 absolute right-[-30px] bottom-[-10px] w-[260px] h-[160px]" src={Group4} alt="icon" />
                                </div>
                            </div>
                            <div className="hp-container-box-13 w-full h-[180px] border border-[#DDDD] rounded-[16px] mt-4 p-4 flex flex-col justify-end relative overflow-hidden">
                                <div className="hp-container-box-13-in flex flex-col justify-end gap-5">
                                    <span className="hp-span-1 text-[#8C95B1] text-2xl font-bold">Kaiwa AI</span>
                                    <span className="hp-span-2 text-[#676767] text-sm font-normal">
                                        Luyện tập hội thoại Tiếng Nhật mọi lúc mọi nơi với AI
                                      </span>
                                    <div className="flex flex-row gap-5">
                                        <button className="px-4 w-32 h-[50px] rounded-[16px] border border-[#6B7597] bg-white text-[#6B7597] font-bold text-[16px] shadow-[0_3px_0_0_#4E5670] cursor-pointer hover:bg-[#ECEFF7] transition">
                                            <Link to="/noteBook">
                                                NoteBook
                                            </Link>
                                        </button>
                                        <button className="relative w-[125px] h-[50px] border-2 border-[#5D678A] rounded-[16px] shadow-[0_4px_0_0_#4A5068] text-white font-bold text-[16px] bg-[#7E86A2] overflow-hidden cursor-pointer transition-all duration-200 ease-in-out hover:brightness-105 hover:shadow-[0_5px_0_0_#4A5068] active:translate-y-[2px] active:shadow-[0_2px_0_0_#4A5068] before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(-115deg,_#7E86A2_60%,_#9AA1BA_60%,_#9AA1BA_62%,_#7E86A2_62%,_#7E86A2_65%,_#9AA1BA_65%,_#9AA1BA_70%,_#7E86A2_70%,_#7E86A2_73%,_#9AA1BA_73%,_#9AA1BA_75%,_#7E86A2_75%)] before:pointer-events-none before:z-0">
                                            <Link to='/noteBoard' className='relative z-[1]'>
                                                NoteBoard
                                            </Link>
                                        </button>
                                    </div>
                                    <img className="hp-img-target absolute right-2.5 bottom-5 animate-bounce-up-down z-50 w-43 h-30" src={imgNote} alt="icon" />
                                    <img className="hp-group-4 absolute right-[-30px] bottom-[-10px] w-[260px] h-[160px]" src={Group4} alt="icon" />
                                </div>
                            </div>
                            <div className="hp-container-box-13 w-full h-[180px] border border-[#DDDD] rounded-[16px] mt-4 p-4 flex flex-col justify-end relative overflow-hidden">
                                <div className="hp-container-box-13-in flex flex-col justify-end gap-5">
                                    <span className="hp-span-1 text-[#8C95B1] text-2xl font-bold">Bubble Game</span>
                                    <span className="hp-span-2 text-[#676767] text-sm font-normal">
                                        Cùng thử thách và giải trí với các chấm tròn vui nhộn thôi nào!!
                                    </span>
                                    <button className="relative w-[163px] h-[50px] border-2 border-[#5D678A] rounded-[16px] shadow-[0_4px_0_0_#4A5068] text-white font-bold text-[16px] bg-[#7E86A2] overflow-hidden cursor-pointer transition-all duration-200 ease-in-out hover:brightness-105 hover:shadow-[0_5px_0_0_#4A5068] active:translate-y-[2px] active:shadow-[0_2px_0_0_#4A5068] before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(-115deg,_#7E86A2_60%,_#9AA1BA_60%,_#9AA1BA_62%,_#7E86A2_62%,_#7E86A2_65%,_#9AA1BA_65%,_#9AA1BA_70%,_#7E86A2_70%,_#7E86A2_73%,_#9AA1BA_73%,_#9AA1BA_75%,_#7E86A2_75%)] before:pointer-events-none before:z-0">
                                        <Link to='/bubbleGame' className='relative z-[1]'>
                                            Chơi ngay
                                        </Link>
                                    </button>
                                    <div className="absolute z-50 top-6 right-3 w-33 h-33 animate-spin" style={{ animationDuration: "8s" }}>
                                        <div className="relative w-full h-full">
                                            <img src={imgGame} alt="" className="w-full h-full rounded-xl object-cover" />
                                            <div className="absolute ml-3.5 mt-2.5 inset-0 w-26 h-28 bg-[#8C95B1] mix-blend-color opacity-50 rounded-full"></div>
                                        </div>
                                    </div>
                                    <img className="hp-group-4 absolute right-[-30px] bottom-[-10px] w-[260px] h-[160px]" src={Group4} alt="icon" />
                                </div>
                            </div>
                            <div className="hp-container-box-13 w-full h-[180px] border border-[#DDDD] rounded-[16px] mt-4 p-4 flex flex-col justify-end relative overflow-hidden">
                                <div className="hp-container-box-13-in flex flex-col justify-end gap-5">
                                    <span className="text-[#8C95B1] text-2xl font-bold">OpenWeatherMap API</span>
                                    <span className="text-[#676767] text-sm font-normal">
                                    Cập nhật tình hình nắng mưa, sẵn sàng cho dự định ngày mới!!
                                  </span>
                                    <button className="relative w-[163px] h-[50px] border-2 border-[#5D678A] rounded-[16px] shadow-[0_4px_0_0_#4A5068] text-white font-bold text-[16px] bg-[#7E86A2] overflow-hidden cursor-pointer transition-all duration-200 ease-in-out hover:brightness-105 hover:shadow-[0_5px_0_0_#4A5068] active:translate-y-[2px] active:shadow-[0_2px_0_0_#4A5068] before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(-115deg,_#7E86A2_60%,_#9AA1BA_60%,_#9AA1BA_62%,_#7E86A2_62%,_#7E86A2_65%,_#9AA1BA_65%,_#9AA1BA_70%,_#7E86A2_70%,_#7E86A2_73%,_#9AA1BA_73%,_#9AA1BA_75%,_#7E86A2_75%)] before:pointer-events-none before:z-0">
                                        {/*/video*/}
                                        {/*/flashCard*/}
                                        {/*newVocaSubject*/}
                                        <Link to='/weather' className='relative z-[1]'>Xem ngay</Link>
                                    </button>
                                    <img className="absolute right-2.5 z-50 w-40 animate-bounce-up-down" src={imgWeather} alt="" />
                                    {/*<img className="absolute right-2.5 z-50 w-45" src={imgWeather} alt="icon" />*/}
                                    <img className="hp-group-4 absolute right-[-30px] bottom-[-10px] w-[260px] h-[160px]" src={Group4} alt="icon" />
                                </div>
                            </div>
                        </div>
                        <div className="hp-text-2 flex justify-between">
                            <h2 className="hp-text-2-h2 text-2xl font-bold">Các khoá học</h2>
                            <Link to="/allCourse" id="AllCourse" className="hp-all-course text-[#0BA5EC] hover:text-blue-300 text-sm font-normal cursor-pointer">
                                Xem tất cả
                            </Link>
                        </div>
                        {/*<div className="hp-section-main-2-box-1-2 w-full h-auto flex flex-wrap gap-[5%]" id="Course-card">*/}
                        {/*    /!* Placeholder cho course-card (cần thêm logic để render) *!/*/}
                        {/*</div>*/}

                        {/*<div className="w-[100%] h-308 grid grid-cols-2 gap-x-5 gap-y-3">*/}
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 xl:gap-8 w-full mx-auto">
                        {status === 'pending' && <LoadingProcess/>}
                            {error && <div>Lỗi: {error}</div>}
                            {courses
                                // .filter((course: any) => course.status === true)
                                .slice(0, 3).map((course: any) => (
                                    <CourseCard1
                                        key={course.id}
                                        course={{ ...course, id: course.id }}
                                        onClick={() => {
                                            localStorage.setItem('IdCourse', course.id);
                                            // navigate(`/lesson/${course.id}`);
                                            navigate(`/user/lesson/${course.id}`);
                                        }}
                                    />
                            ))}
                        </div>
                    </div>

<section className="ml-10 flex flex-col gap-6 w-[39%]">



    <div className="h-auto bg-white rounded-[16px] border border-[#DDDDDD] p-4 text-center">
        <h2 className="flex flex-row justify-center text-xl font-bold pb-5">
            <img src={cup} alt="ranking" className="w-10 h-10 mr-2" />
            <span>Bảng xếp hạng</span>
        </h2>

        <div className="mt-4 flex items-end justify-center gap-8">
            {topThree.length > 1 && (
                <div
                    key={topThree[1].id}
                    className="relative w-16 h-16 bg-gray-100 rounded-full flex justify-center items-center"
                >
                    {getRankIcon(2)}
                    <img
                        className="w-14 h-14 rounded-full object-cover"
                        src={topThree[1].avatar || Avatar}
                        alt={topThree[1].fullName}
                    />
                    <div className="w-6 h-6 bg-gray-400 rounded-full absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex justify-center items-center z-50 border-2 border-white">
                        <span className="text-xs text-white font-bold">2</span>
                    </div>
                    <p className="absolute left-1/2 transform -translate-x-1/2 -bottom-8 whitespace-nowrap text-sm font-medium">
                        {topThree[1].fullName || 'Unknown User'}
                    </p>
                    <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-14 flex gap-1 whitespace-nowrap">
                        <img className="w-4 h-4" src={Object1} alt="star" />
                        <h3 className="text-md font-bold text-[#6B7597]">
                            {topThree[1].points}
                        </h3>
                    </div>
                </div>
            )}

            {topThree.length > 0 && (
                <div
                    key={topThree[0].id}
                    className="relative w-20 h-20 -mt-8 bg-gray-100 rounded-full flex justify-center items-center"
                >
                    {getRankIcon(1)}
                    <img
                        className="w-18 h-18 rounded-full object-cover"
                        src={topThree[0].avatar || Avatar}
                        alt={topThree[0].fullName}
                    />
                    <div className="w-6 h-6 bg-yellow-400 rounded-full absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex justify-center items-center z-50 border-2 border-white">
                        <span className="text-xs text-white font-bold">1</span>
                    </div>
                    <p className="absolute left-1/2 transform -translate-x-1/2 -bottom-8 whitespace-nowrap text-sm font-medium">
                        {topThree[0].fullName || 'Unknown User'}
                    </p>
                    <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-14 flex gap-1 whitespace-nowrap">
                        <img className="w-4 h-4" src={Object1} alt="star" />
                        <h3 className="text-md font-bold text-[#6B7597]">
                            {topThree[0].points}
                        </h3>
                    </div>
                </div>
            )}

            {topThree.length > 2 && (
                <div
                    key={topThree[2].id}
                    className="relative w-16 h-16 bg-gray-100 rounded-full flex justify-center items-center"
                >
                    {getRankIcon(3)}
                    <img
                        className="w-14 h-14 rounded-full object-cover"
                        src={topThree[2].avatar || Avatar}
                        alt={topThree[2].fullName}
                    />
                    <div className="w-6 h-6 bg-orange-400 rounded-full absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex justify-center items-center z-50 border-2 border-white">
                        <span className="text-xs text-white font-bold">3</span>
                    </div>
                    <p className="absolute left-1/2 transform -translate-x-1/2 -bottom-8 whitespace-nowrap text-sm font-medium">
                        {topThree[2].fullName || 'Unknown User'}
                    </p>
                    <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-14 flex gap-1 whitespace-nowrap">
                        <img className="w-4 h-4" src={Object1} alt="star" />
                        <h3 className="text-md font-bold text-[#6B7597]">
                            {topThree[2].points}
                        </h3>
                    </div>
                </div>
            )}
        </div>

        <div className="mt-24 flex flex-col gap-3">
            {remainingUsers.map((user, index) => {
                const rank = index + 4;
                return (
                    <div
                        key={user.id}
                        className="border border-gray-400 bg-[#FAFAFA] flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <div className="text-md font-bold w-6 text-center">
                                {rank}
                            </div>
                            <img
                                className="w-10 h-10 rounded-full object-cover"
                                src={user.avatar || Avatar}
                                alt={user.fullName}
                            />
                            <div className="text-left">
                                <p className="font-medium text-gray-800">
                                    {user.fullName || 'Unknown User'}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <img className="w-5 h-5" src={Object1} alt="points" />
                            <span className="font-bold text-[#6B7597] text-lg">
                            {user.points}
                        </span>
                        </div>
                    </div>
                );
            })}
        </div>

        {rankedUsers.length === 0 && (
            <div className="text-gray-500 py-8">
                <p>Chưa có dữ liệu xếp hạng</p>
            </div>
        )}
    </div>
                        <div className="h-auto bg-white rounded-[16px] p-5 border border-[#DDDDDD]">
                            <div className="hp-box-2 flex justify-between mt-2.5">
                            <span className="hp-box-2-span flex items-center gap-2">
                              <img src={Streaks} alt="" /> Streak
                            </span>
                                <span className="hp-box-2-date text-sm">tháng 3, 2025</span>
                            </div>
                            <div className="hp-box-2 flex justify-between mt-2.5">
                                <span className="hp-box-2-week text-sm">Tuần 4/4</span>
                                <div className="hp-box-22 flex gap-2">
                                    <img src={ChevronLeft} alt="" />
                                    <img src={ChevronRight} alt="" />
                                </div>
                            </div>
                            <div className="hp-box-3 flex justify-between mt-5">
                                <div className=" relative z-2 overflow-hidden bg-[#F5B64A] text-white p-1.5 rounded-[8px] border border-[#AD7415]  shadow-[0_3px_0_0_#AD7415] before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(-105deg,_#F5B64A_60%,_#F7C356_60%,_#F7C356_62%,_#F5B64A_62%,_#F5B64A_65%,_#F7C356_65%,_#F7C356_70%,_#F5B64A_70%,_#F5B64A_73%,_#F7C356_73%,_#F7C356_75%,_#F5B64A_75%)] before:pointer-events-none before:z-0">
                                    <span className="relative text-xs font-light z-[1]">T2</span>
                                    <h3 className="relative text-base font-bold z-[1]">16</h3>
                                </div>

                                <div className="hp-day text-center">
                                    <span className="hp-day-span text-xs text-[#3D3D3D] font-light">T2</span>
                                    <h3 className="hp-day-h3 text-base">16</h3>
                                </div>
                                <div className="hp-day text-center">
                                    <span className="hp-day-span text-xs text-[#3D3D3D] font-light">T2</span>
                                    <h3 className="hp-day-h3 text-base">16</h3>
                                </div>
                                <div className="hp-day text-center">
                                    <span className="hp-day-span text-xs text-[#3D3D3D] font-light">T2</span>
                                    <h3 className="hp-day-h3 text-base">16</h3>
                                </div>
                                <div className="hp-day text-center">
                                    <span className="hp-day-span text-xs text-[#3D3D3D] font-light">T2</span>
                                    <h3 className="hp-day-h3 text-base">16</h3>
                                </div>
                                <div className="hp-day text-center">
                                    <span className="hp-day-span text-xs text-[#3D3D3D] font-light">T2</span>
                                    <h3 className="hp-day-h3 text-base">16</h3>
                                </div>
                                <div className="hp-day text-center">
                                    <span className="hp-day-span text-xs text-[#3D3D3D] font-light">T2</span>
                                    <h3 className="hp-day-h3 text-base">16</h3>
                                </div>
                                <div className="hp-day text-center">
                                    <span className="hp-day-span text-xs text-[#3D3D3D] font-light">T2</span>
                                    <h3 className="hp-day-h3 text-base">16</h3>
                                </div>
                            </div>
                        </div>

                        <span className="text-xl font-bold mb-[-15px]">Tiện tích</span>

                        <div className="relative h-auto bg-white rounded-[16px] p-5 border border-[#DDDDDD]">
                            <p className="ml-5 pb-2 mt-[-7px] text-md font-semibold">Tính toán</p>
                            <button className="px-1.5 ml-3 h-[35px] rounded-[16px] border border-[#6B7597] bg-white text-[#6B7597] font-bold text-[16px] shadow-[0_3px_0_0_#4E5670] cursor-pointer hover:bg-[#ECEFF7] transition">
                                <Link to="/calculate">
                                   Caculator
                                </Link>
                            </button>

                            <div className="absolute right-5 top-4 rotate-[-5deg] flex items-center justify-center overflow-hidden">
                                <img src={imgCaculate} alt="" className="w-14 h-14"/>
                            </div>
                        </div>

                        <span className="text-xl font-bold mb-[-15px]">Đọc thêm</span>

                        <div className="h-auto flex justify-center flex-wrap bg-white rounded-[16px] p-5 border border-[#DDDDDD]">
                            {/*<p className="ml-5 pb-2 mt-[-7px] text-md font-semibold">Tính toán</p>*/}
                            <button className="px-1.5 my-1.5 ml-3 h-[35px] rounded-[12px] border border-[#6B7597] bg-white text-[#6B7597] font-bold text-[16px] shadow-[0_1.5px_0_0_#4E5670] cursor-pointer hover:bg-[#ECEFF7] transition">
                                <Link to="/infor">
                                   Html
                                </Link>
                            </button>
                            <button className="px-1.5 my-1.5 ml-3 h-[35px] rounded-[12px] border border-[#6B7597] bg-white text-[#6B7597] font-bold text-[16px] shadow-[0_1.5px_0_0_#4E5670] cursor-pointer hover:bg-[#ECEFF7] transition">
                                <Link to="/infor1">
                                    Css
                                </Link>
                            </button>
                            <button className="px-1.5 my-1.5 ml-3 h-[35px] rounded-[12px] border border-[#6B7597] bg-white text-[#6B7597] font-bold text-[16px] shadow-[0_1.5px_0_0_#4E5670] cursor-pointer hover:bg-[#ECEFF7] transition">
                                <Link to="/infor2">
                                    JavaScript
                                </Link>
                            </button>
                            <button className="px-1.5 my-1.5 ml-3 h-[35px] rounded-[12px] border border-[#6B7597] bg-white text-[#6B7597] font-bold text-[16px] shadow-[0_1.5px_0_0_#4E5670] cursor-pointer hover:bg-[#ECEFF7] transition">
                                <Link to="/infor3">
                                    React
                                </Link>
                            </button>
                            <button className="px-1.5 my-1.5 ml-3 h-[35px] rounded-[12px] border border-[#6B7597] bg-white text-[#6B7597] font-bold text-[16px] shadow-[0_1.5px_0_0_#4E5670] cursor-pointer hover:bg-[#ECEFF7] transition">
                                <Link to="/infor4">
                                    TypeScript
                                </Link>
                            </button>
                            <button className="px-1.5 my-1.5 ml-3 h-[35px] rounded-[12px] border border-[#6B7597] bg-white text-[#6B7597] font-bold text-[16px] shadow-[0_1.5px_0_0_#4E5670] cursor-pointer hover:bg-[#ECEFF7] transition">
                                <Link to="/infor5">
                                    REST API
                                </Link>
                            </button>
                            <button className="px-1.5 my-1.5 ml-3 h-[35px] rounded-[12px] border border-[#6B7597] bg-white text-[#6B7597] font-bold text-[16px] shadow-[0_1.5px_0_0_#4E5670] cursor-pointer hover:bg-[#ECEFF7] transition">
                                <Link to="/infor6">
                                    Git & GitHub
                                </Link>
                            </button>
                            <button className="px-1.5 my-1.5 ml-3 h-[35px] rounded-[12px] border border-[#6B7597] bg-white text-[#6B7597] font-bold text-[16px] shadow-[0_1.5px_0_0_#4E5670] cursor-pointer hover:bg-[#ECEFF7] transition">
                                <Link to="/infor7">
                                    Next.js
                                </Link>
                            </button>
                            <button className="px-1.5 my-1.5 ml-3 h-[35px] rounded-[12px] border border-[#6B7597] bg-white text-[#6B7597] font-bold text-[16px] shadow-[0_1.5px_0_0_#4E5670] cursor-pointer hover:bg-[#ECEFF7] transition">
                                <Link to="/infor8">
                                    Database
                                </Link>
                            </button>
                            <button className="px-1.5 my-1.5 ml-3 h-[35px] rounded-[12px] border border-[#6B7597] bg-white text-[#6B7597] font-bold text-[16px] shadow-[0_1.5px_0_0_#4E5670] cursor-pointer hover:bg-[#ECEFF7] transition">
                                <Link to="/infor9">
                                    Docker
                                </Link>
                            </button>
                            <button className="px-1.5 my-1.5 ml-3 h-[35px] rounded-[12px] border border-[#6B7597] bg-white text-[#6B7597] font-bold text-[16px] shadow-[0_1.5px_0_0_#4E5670] cursor-pointer hover:bg-[#ECEFF7] transition">
                                <Link to="/infor10">
                                    Cybersecurity
                                </Link>
                            </button>
                            <button className="px-1.5 my-1.5 ml-3 h-[35px] rounded-[12px] border border-[#6B7597] bg-white text-[#6B7597] font-bold text-[16px] shadow-[0_1.5px_0_0_#4E5670] cursor-pointer hover:bg-[#ECEFF7] transition">
                                <Link to="/infor11">
                                    Artificial Intelligence
                                </Link>
                            </button>
                        </div>
                    {/*</div>*/}
</section>

                </section>
                <div className="mb-15 flex justify-between items-center w-full border border-[#DDDDDD] h-[142px] rounded-[16px] bg-white p-8 mt-12">
                    <div>
                        <h2 className="hp-contact-h2 text-2xl font-bold">
                            Khởi động hành trình của bạn
                        </h2>
                        <p className="hp-contact-p text-gray-600">
                            Hãy bước vào hành trình mới để khám phá tiềm năng và chinh phục những
                            <br /> mục tiêu của bạn ngay hôm nay.
                        </p>
                    </div>
                    <div className="flex gap-4">

                        <button className="px-4 h-[50px] rounded-[16px] border border-[#6B7597] bg-white text-[#6B7597] font-bold text-[16px] shadow-[0_3px_0_0_#4E5670] cursor-pointer hover:bg-[#ECEFF7] transition">
                            <Link to="/introduce">
                                Giới thiệu
                            </Link>
                        </button>
                        <button className="relative w-[163px] h-[50px] border-2 border-[#5D678A] rounded-[16px] shadow-[0_4px_0_0_#4A5068] text-white font-bold text-[16px] bg-[#7E86A2] overflow-hidden cursor-pointer transition-all duration-200 ease-in-out hover:brightness-105 hover:shadow-[0_5px_0_0_#4A5068] active:translate-y-[2px] active:shadow-[0_2px_0_0_#4A5068] before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(-115deg,_#7E86A2_60%,_#9AA1BA_60%,_#9AA1BA_62%,_#7E86A2_62%,_#7E86A2_65%,_#9AA1BA_65%,_#9AA1BA_70%,_#7E86A2_70%,_#7E86A2_73%,_#9AA1BA_73%,_#9AA1BA_75%,_#7E86A2_75%)] before:pointer-events-none before:z-0">
                            <Link to='/feedbackForm' className='relative z-[1]'>Đánh giá</Link>
                        </button>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

const styles = `
  @keyframes slideDown {
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  .animate-slide-down {
    animation: slideDown 0.8s ease-out forwards;
  }
  @keyframes bounce-up-down {
    0% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0); }
  }
  .animate-bounce-up-down {
    animation: bounce-up-down 1s infinite ease-in-out;
  }
`;


const styleSheet = new CSSStyleSheet();
styleSheet.replaceSync(styles);
document.adoptedStyleSheets = [styleSheet];

// export default HomePage