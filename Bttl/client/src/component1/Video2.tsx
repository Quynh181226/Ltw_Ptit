import { useEffect, useState } from "react";
import Header2 from "../components/Header2.tsx";
import handleLogout from "../components/handleLogout.tsx";
import { Link, useNavigate } from "react-router-dom";
import Pagination2 from "../components/Pagination2.tsx";
import avatar from "../assets/Avatar.svg";

interface VideoItem {
    id: number;
    title: string;
    duration: string;
    description: string;
    videoId: string;
    instructor: string;
}

const videoData: VideoItem[] = [
    {
        id: 1,
        title: "Cách viết và phát âm あ い う え お",
        duration: "15:20",
        description: "Hướng dẫn chi tiết cách viết, thứ tự nét và phát âm chuẩn từng nguyên âm.",
        videoId: "liHgt4CbodY",
        instructor: "Sensei Japanese"
    },
    {
        id: 2,
        title: "Học Hiragana trong 1 giờ - Phần 1",
        duration: "32:15",
        description: "Học toàn bộ bảng chữ cái Hiragana qua phương pháp ghi nhớ nhanh.",
        videoId: "mZrF1CRMuUg",
        instructor: "Japanese Ammo"
    },
    {
        id: 3,
        title: "Hiragana - Hàng K, S, T, N",
        duration: "25:40",
        description: "Học cách viết và phát âm các hàng K, S, T, N trong Hiragana.",
        videoId: "8hg2y8QbZug",
        instructor: "Learn Japanese"
    },
    {
        id: 4,
        title: "Hiragana - Hàng H, M, Y, R, W",
        duration: "28:30",
        description: "Tiếp tục với các hàng H, M, Y, R, W và âm ngắt.",
        videoId: "XhO1_e2bq4Y",
        instructor: "Japanese Pod 101"
    },
    {
        id: 5,
        title: "Luyện đọc Hiragana cơ bản",
        duration: "18:25",
        description: "Bài tập luyện đọc và nhận diện chữ Hiragana trong từ vựng.",
        videoId: "r_1ohf3q5_c",
        instructor: "Coto Academy"
    },
    {
        id: 6,
        title: "Phát âm chuẩn tiếng Nhật cho người mới",
        duration: "22:10",
        description: "Hướng dẫn phát âm chuẩn, tránh các lỗi thường gặp.",
        videoId: "abcdefghijk", // Video mẫu
        instructor: "Sensei Japanese"
    },
];

export const Video2 = () => {
    const [activePage, setActivePage] = useState("video");
    const [currPage, setCurrPage] = useState(1);
    const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
    const navigate = useNavigate();

    const perPage = 3;
    const totalPages = Math.ceil(videoData.length / perPage);
    const start = (currPage - 1) * perPage;
    const end = start + perPage;
    const currentItems = videoData.slice(start, end);

    const pages = [
        { id: "video", label: "Video bài giảng", path: "/video2" }
    ];

    useEffect(() => {
        const path = window.location.pathname;
        if (path.includes("video")) setActivePage("video");
    }, []);

    const handlePageClick = (pageId: string, path: string) => {
        setActivePage(pageId);
        navigate(path);
    };

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) setCurrPage(page);
    };

    const handleWatchVideo = (video: VideoItem) => {
        setSelectedVideo(video);
    };

    const handleCloseVideo = () => {
        setSelectedVideo(null);
    };

    return (
        <>
            <Header2 onLogout={handleLogout} />
            <div className="m-0 p-0 box-border font-sans">
                <main className="flex gap-4 bg-gray-50 min-h-screen">
                    {/* Sidebar */}
                    <section className="border border-gray-300 w-80 h-screen p-4 bg-white overflow-y-auto">
                        <div className="w-full h-20 bg-[#7E86A2] rounded-t-2xl p-4 text-white">
                            <h3 className="text-base font-semibold leading-8">Danh sách bài</h3>
                            <span className="text-xs font-light">6 videos • 142 phút • 0 bài Test</span>
                        </div>
                        {pages.map((page) => (
                            <div key={page.id} className="mt-2">
                                <div onClick={() => handlePageClick(page.id, page.path)} className={`flex items-center gap-2 px-4 py-3 rounded-lg mt-2 cursor-pointer transition-all ${activePage === page.id ? "bg-[#ECEFF6] border border-[#7E86A2]" : "bg-[#FAFAFA]"} hover:bg-gray-100`}>
                                  <span className={`text-sm ${activePage === page.id ? "font-bold" : "font-normal"} text-gray-800`}>
                                    {page.label}
                                  </span>
                                </div>
                            </div>
                        ))}
                    </section>

                    {/* Main Content */}
                    <section className="flex-1 p-4">
                        {/* Header Card */}
                        <div className="flex justify-between items-center h-22 border border-gray-300 rounded-2xl p-4 mb-4 bg-white">
                            <div className="flex gap-4 items-center">
                                <div className="flex w-14 h-14 justify-center items-center rounded-lg bg-[rgba(126,134,162,0.1)]">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="60px" fill="#6a7698">
                                        <path d="M480-120q-18 0-34.5-6.5T416-146L163-400h113l197 197q2 2 3.5 2.5t3.5.5q2 0 3.5-.5t3.5-2.5l267-268q23-23 35-54.5t12-64.5q-2-69-46-118.5T645-758q-31 0-59.5 12T536-711l-27 29q-5 6-13 9.5t-16 3.5q-8 0-16-3.5t-14-9.5l-27-29q-21-23-49-36t-60-13q-54 0-93.5 34.5T167-640H85q17-85 79.5-142.5T314-840q48 0 90.5 19t75.5 53q32-34 74.5-53t90.5-19q100 0 167.5 74T880-590q0 49-17 94t-51 80L543-146q-13 13-29 19.5t-34 6.5Zm-5-360H80v-80h555q17 0 28.5-11.5T675-600q0-17-11.5-28.5T635-640q-14 0-25 7.5T596-611l-77-21q11-39 43-63.5t73-24.5q50 0 85 35t35 85q0 50-35 85t-85 35h-47q3 10 5 19.5t2 20.5q0 50-35 85t-85 35q-41 0-73-24.5T359-408l77-21q3 14 14 21.5t25 7.5q17 0 28.5-11.5T515-440q0-17-11.5-28.5T475-480Zm9 0Z"/>
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="m-0 text-lg font-semibold text-gray-800">Video bài giảng</h3>
                                    <span className="text-sm text-gray-500">Học Hiragana qua video chuẩn phát âm, hình ảnh sinh động</span>
                                </div>
                            </div>
                            <button className="relative w-[163px] h-[50px] border-2 border-[#5D678A] rounded-[16px] shadow-[0_4px_0_0_#4A5068] text-white font-bold text-[16px] bg-[#7E86A2] overflow-hidden cursor-pointer transition-all duration-200 ease-in-out hover:brightness-105 hover:shadow-[0_5px_0_0_#4A5068] active:translate-y-[2px] active:shadow-[0_2px_0_0_#4A5068]">
                                <Link to="/feedbackForm" className="relative z-[1]">Đánh giá</Link>
                            </button>
                        </div>

                        {/* Video List */}
                        <div className="bg-white rounded-lg p-6 space-y-4">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Danh sách video bài giảng</h2>

                            {currentItems.map((video) => (
                                <div
                                    key={video.id}
                                    className="flex gap-4 p-4 rounded-xl border border-gray-200 hover:border-[#7E86A2] hover:shadow-sm transition-all cursor-pointer"
                                    onClick={() => handleWatchVideo(video)}
                                >
                                    <div className="w-32 h-20 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                                        <img
                                            src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
                                            alt={video.title}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='128' height='96' viewBox='0 0 128 96'%3E%3Crect width='128' height='96' fill='%23f3f4f6'/%3E%3Cpath d='M48 32v32l32-16-32-16z' fill='%239ca3af'/%3E%3C/svg%3E";
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8 5v14l11-7L8 5z"/>
                                            </svg>
                                        </div>
                                        <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1 rounded">
                                            {video.duration}
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-base font-semibold text-gray-800 mb-1">{video.title}</h4>
                                        <p className="text-sm text-gray-600 mb-2">{video.description}</p>
                                        <div className="flex items-center gap-3 text-xs text-gray-500">
                                          <span className="flex items-center gap-1">
                                            <img src={avatar} alt="Giảng viên" width={16} height={16} />
                                            Giảng viên: {video.instructor}
                                          </span>
                                        </div>
                                    </div>
                                    <button
                                        className="self-center px-5 py-2 bg-[#7E86A2] text-white text-sm font-medium rounded-lg hover:bg-[#6a7291] transition-colors"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleWatchVideo(video);
                                        }}
                                    >
                                        Xem ngay
                                    </button>
                                </div>
                            ))}

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="mt-6 flex justify-end">
                                    <Pagination2
                                        currPage={currPage}
                                        totalPages={totalPages}
                                        onChangePage={handlePageChange}
                                    />
                                </div>
                            )}
                        </div>
                    </section>
                </main>

                {/* Video Player Modal */}
                {selectedVideo && (
                    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl w-full max-w-4xl overflow-hidden">
                            <div className="flex justify-between items-center p-4 border-b border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-800">{selectedVideo.title}</h3>
                                <button
                                    onClick={handleCloseVideo}
                                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="p-4">
                                <div className="relative pb-[56.25%] h-0">
                                    <iframe
                                        src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1`}
                                        title={selectedVideo.title}
                                        className="absolute top-0 left-0 w-full h-full rounded-lg"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                                <div className="mt-4">
                                    <p className="text-gray-600">{selectedVideo.description}</p>
                                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                                        <img src={avatar} alt="Giảng viên" width={20} height={20} />
                                        <span>Giảng viên: {selectedVideo.instructor}</span>
                                        <span>•</span>
                                        <span>Thời lượng: {selectedVideo.duration}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};