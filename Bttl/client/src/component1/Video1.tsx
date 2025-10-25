'use client';
import React, { useEffect, useState } from 'react';
import Header2 from '../components/Header2.tsx';
import handleLogout from '../components/handleLogout.tsx';
import { Send } from 'lucide-react';
import iconPlayCircle from '../assets/iconPlayCircle.svg';
import iconFlashCard from '../assets/iconFlashCard.svg';
import iconTask from '../assets/iconTask.svg';
import iconPDF from '../assets/iconPDF.svg';
import iconBook from '../assets/iconBook.svg';
import iconHeadphone from '../assets/iconHeadphone.svg';
import { NewVoca } from "./NewVoca.tsx";
import LoadingProcess from "../components/LoadingProcess.tsx";

const SECTION_INFO: Record<string, { icon: string; title: string; description: string }> = {
    video: {
        icon: iconPlayCircle,
        title: 'Video bài giảng',
        description: 'Học qua video chuẩn phát âm, hình ảnh sinh động',
    },
    flashCard: {
        icon: iconFlashCard,
        title: 'Flash card',
        description: 'Luyện tập từ vựng và khái niệm qua flashcard tương tác',
    },
    test: {
        icon: iconTask,
        title: 'Bài kiểm tra',
        description: 'Kiểm tra kiến thức với các bài tập thực hành',
    },
    slide: {
        icon: iconPDF,
        title: 'Slide / PDF',
        description: 'Tài liệu slide và PDF hỗ trợ học tập',
    },
    book: {
        icon: iconBook,
        title: 'Text nội dung',
        description: 'Nội dung bài học dạng văn bản chi tiết',
    },
    audio: {
        icon: iconHeadphone,
        title: 'Audio / Script',
        description: 'Luyện nghe với audio và script chi tiết',
    },
};

interface SidebarMenuProps {
    activeSection: string;
    onSectionChange: (section: string) => void;
}

const SidebarMenu = ({ activeSection, onSectionChange }: SidebarMenuProps) => {
    const pages = [
        { id: 'video', label: 'Video', path: '/video' },
        { id: 'flashCard', label: 'Flash card', path: '/flashcard' },
        { id: 'test', label: 'Bài kiểm tra', path: '/test' },
        { id: 'slide', label: 'Slide / PDF', path: '/slide' },
        { id: 'book', label: 'Text', path: '/book' },
        { id: 'audio', label: 'Audio / Script', path: '/audio' },
    ];

    return (
        <aside className="w-80 border border-gray-300 p-4 mb-3 bg-white min-h-screen overflow-y-auto">
            <div className="w-full h-20 bg-[#7E86A2] rounded-t-2xl p-4 text-white">
                <h3 className="text-base font-semibold leading-8">Danh sách bài</h3>
                <span className="text-xs font-light">1 videos • 50 phút • 1 bài Test</span>
            </div>
            {pages.map((page) => (
                <div
                    key={page.id}
                    onClick={() => onSectionChange(page.id)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg mt-2 cursor-pointer transition-all ${
                        activeSection === page.id ? 'bg-[#ECEFF6] border border-[#7E86A2]' : 'bg-[#FAFAFA] hover:bg-gray-100'
                    }`}
                >
                    <img
                        src={SECTION_INFO[page.id].icon}
                        alt={page.label}
                        className={`w-5 h-5 ${activeSection === page.id ? 'filter-none' : 'filter grayscale'}`}
                        style={activeSection === page.id ? { filter: 'hue-rotate(200deg) saturate(150%) brightness(80%)' } : {}}
                    />
                    <span className={`text-sm ${activeSection === page.id ? 'font-bold' : 'font-normal'} text-gray-800`}>
                        {page.label}
                    </span>
                </div>
            ))}
        </aside>
    );
};

const LessonInfo = ({ activeSection }: { activeSection: string }) => (
    <div className="flex justify-between items-center h-22 border border-gray-300 rounded-2xl p-4 mb-4 bg-white">
        <div className="flex gap-4 items-center">
            <div className="flex w-14 h-14 justify-center items-center rounded-lg bg-[rgba(126,134,162,0.1)]">
                <img
                    src={SECTION_INFO[activeSection].icon}
                    alt={activeSection}
                    className="w-6 h-6"
                    style={{ filter: 'hue-rotate(200deg) saturate(150%) brightness(80%)' }}
                />
            </div>
            <div>
                <h3 className="m-0 text-lg font-semibold text-gray-800">{SECTION_INFO[activeSection].title}</h3>
                <span className="text-sm text-gray-500">{SECTION_INFO[activeSection].description}</span>
            </div>
        </div>
        <button className="relative w-[163px] h-[50px] border-2 border-[#5D678A] rounded-[16px] shadow-[0_4px_0_0_#4A5068] text-white font-bold text-[16px] bg-[#7E86A2] overflow-hidden cursor-pointer transition-all duration-200 ease-in-out hover:brightness-105 hover:shadow-[0_5px_0_0_#4A5068] active:translate-y-[2px] active:shadow-[0_2px_0_0_#4A5068]">
            Bài tiếp theo
        </button>
    </div>
);

const VideoPlayer = () => {
    return (
        <div className="w-full h-[500px] bg-gray-100 flex items-center justify-center rounded-lg">
            <iframe
                id="youtube-player"
                width="100%"
                height="500"
                src="https://www.youtube.com/embed/mZrF1CRMuUg"
                title="Luyện nghe tiếng Nhật N2"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
            ></iframe>
        </div>
    );
};

const Tabs = () => {
    const [activeTab, setActiveTab] = useState('description');

    return (
        <div className="mt-4">
            <div className="flex gap-1 border-b border-gray-300">
                {['description', 'document', 'discussion'].map((tab) => (
                    <button
                        key={tab}
                        className={`px-4 py-2 text-sm font-medium transition ${
                            activeTab === tab ? 'text-[#7E86A2] border-b-2 border-[#7E86A2]' : 'text-gray-600 hover:text-gray-800'
                        }`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab === 'description' ? 'Mô tả' : tab === 'document' ? 'Tài liệu' : 'Thảo luận'}
                    </button>
                ))}
            </div>
            <div className="p-4">
                {activeTab === 'description' && (
                    <div>
                        <h1 className="text-xl font-medium text-gray-800">
                            <span className="font-bold">Title: </span>
                            JLPT N1 聴解 問題 1 (Kỳ thi tháng 7 năm 2010)
                        </h1>
                        <p className="text-sm text-gray-500 font-semibold uppercase tracking-wide mt-2">Mô tả ngắn:</p>
                        <p className="text-base text-gray-700 leading-relaxed">
                            Đây là phần luyện nghe <span className="font-medium text-[#7E86A2]">(聴解)</span> số 1 của kỳ thi năng lực
                            tiếng Nhật <span className="font-semibold">JLPT N1</span> – kỳ thi cấp cao nhất. Video giúp người học rèn
                            luyện kỹ năng nghe hiểu qua các đoạn hội thoại, thông báo và bản tin thực tế bằng tiếng Nhật.
                        </p>
                    </div>
                )}
                {activeTab === 'document' && (
                    <div className="space-y-4">
                        <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold text-gray-800 mb-3">Giới thiệu tài liệu</h2>
                            <p className="text-gray-700 leading-relaxed">
                                Video này thuộc phần <span className="font-medium text-[#7E86A2]">聴解 (Nghe hiểu)</span> của kỳ thi năng
                                lực tiếng Nhật <span className="font-semibold">JLPT N1</span> – kỳ thi cấp độ cao nhất. Đây là câu hỏi số
                                1 trong đề thi tháng 7 năm 2010.
                            </p>
                            <p className="text-gray-700 leading-relaxed mt-2">
                                Người học sẽ luyện tập khả năng nghe và hiểu nội dung qua các đoạn hội thoại, thông báo, hoặc tin tức bằng
                                tiếng Nhật chuẩn.
                            </p>
                        </div>
                        <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold text-gray-800 mb-3">Hướng dẫn học</h2>
                            <ul className="list-disc list-inside text-gray-700 space-y-2">
                                <li>Nghe toàn bộ đoạn hội thoại một lần để nắm nội dung chính.</li>
                                <li>Ghi chú lại từ vựng, ngữ pháp hoặc mẫu câu quan trọng.</li>
                                <li>Nghe lại và so sánh với bản dịch (nếu có) để kiểm tra khả năng hiểu.</li>
                                <li>Lặp lại nhiều lần để cải thiện phản xạ nghe.</li>
                            </ul>
                        </div>
                        <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                            <h2 className="text-lg font-bold text-gray-800 mb-2">Xem tài liệu trực tuyến</h2>
                            <a
                                href="https://www.jlpt.jp/e/samples/sample09.html"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#7E86A2] hover:underline"
                            >
                                JLPT Official Sample Questions N1 (Bộ đề mẫu chính thức)
                            </a>
                            <p className="text-sm text-gray-500 mt-1">
                                Nguồn: Trang chính thức JLPT cung cấp đề mẫu N1, có PDF và file nghe.
                            </p>
                        </div>
                    </div>
                )}
                {activeTab === 'discussion' && (
                    <div>
                        <div className="flex gap-3 mb-4">
                            <div className="w-10 h-10 bg-gray-200 rounded-full" />
                            <input
                                type="text"
                                placeholder="Bạn muốn thảo luận vấn đề gì?"
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            />
                            <button className="p-2 bg-[#7E86A2] text-white rounded-lg hover:bg-[#6a7291]">
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">Bình luận</p>
                        <div className="flex gap-3">
                            <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0" />
                            <div>
                                <p className="font-medium text-sm">Nguyễn Thị Minh Thùy</p>
                                <p className="text-sm text-gray-700 mt-1">
                                    Ornare eu elementum felis porttitor nunc tortor. Ornare neque accumsan metus nulla ultricies maecenas
                                    rhoncus ultrices cras.
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    5:30 3/3/2025 · <span className="text-[#7E86A2] cursor-pointer">Phản hồi</span>
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export const Video1: React.FC = () => {
    const [activeSection, setActiveSection] = useState('video');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {loading && (
                <LoadingProcess/>
            )}
            <div className="m-0 p-0 box-border font-sans">
                <Header2 onLogout={handleLogout} />
                <main className="flex gap-4 bg-gray-50 min-h-screen">
                    <SidebarMenu activeSection={activeSection} onSectionChange={setActiveSection} />
                    <section className="flex-1 p-4">
                        <LessonInfo activeSection={activeSection} />
                        <div className="bg-white rounded-lg p-6">
                            {activeSection === 'video' && <VideoPlayer />}
                            {activeSection === 'flashCard' && (
                                <div className="w-full h-full min-h-[600px]">
                                    <NewVoca/>
                                </div>
                            )}
                            {activeSection === 'test' && (
                                <div className="h-96 bg-[#FAFAFA] rounded-lg flex items-center justify-center text-gray-500">
                                    Bài kiểm tra
                                </div>
                            )}
                            {activeSection === 'slide' && (
                                <div className="h-96 bg-[#FAFAFA] rounded-lg flex items-center justify-center text-gray-500">
                                    Slide / PDF
                                </div>
                            )}
                            {activeSection === 'book' && (
                                <div className="h-96 bg-[#FAFAFA] rounded-lg flex items-center justify-center text-gray-500">
                                    Text nội dung
                                </div>
                            )}
                            {activeSection === 'audio' && (
                                <div className="h-96 bg-[#FAFAFA] rounded-lg flex items-center justify-center text-gray-500">
                                    Audio / Script
                                </div>
                            )}
                            {activeSection === 'video' && <Tabs />}
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
};