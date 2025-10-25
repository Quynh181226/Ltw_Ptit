import React, { useState, useEffect, useRef } from "react";
import {useNavigate, useLocation, Link} from "react-router-dom";
import Header2 from "../components/Header2";
import handleLogout from "../components/handleLogout.tsx";
import volume from "../assets/volume.svg"
import medal from "../assets/medal.svg"
import start from "../assets/start.svg"
import x from "../assets/x.svg"
import v from "../assets/v.svg"

interface Answer {
    label: string;
    text: string;
    correct: boolean;
}

interface Question {
    type: "text" | "audio";
    question?: string;
    audio?: string;
    answers: Answer[];
    explanation?: string;
}

const FinalTest = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [currentQ, setCurrentQ] = useState(0);
    const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [isChecking, setIsChecking] = useState(false);
    const [activePage, setActivePage] = useState("test");
    const [showExplanation, setShowExplanation] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    const overlayRef = useRef<HTMLDivElement>(null);

    // Cập nhật activePage
    useEffect(() => {
        const path = location.pathname;
        if (path.includes("hiragana")) setActivePage("hiragana");
        else if (path.includes("katakana")) setActivePage("katakana");
        else if (path.includes("count")) setActivePage("count");
        else if (path.includes("test")) setActivePage("test");
    }, [location]);

    const pages = [
        { id: "hiragana", label: "Hiragana", path: "/hiragana" },
        { id: "katakana", label: "Katakana", path: "/katakana" },
        { id: "count", label: "Số đếm", path: "/countNumber" },
        { id: "test", label: "Kiểm tra cuối bài", path: "/finalTest" },
    ];

    const handlePageClick = (pageId: string, path: string) => {
        setActivePage(pageId);
        navigate(path);
    };

    const questions: Question[] = [
        {
            type: "text" as const,
            question: "こん",
            answers: [
                { label: "A", text: "こんにちは", correct: true },
                { label: "B", text: "こんばんは", correct: false },
                { label: "C", text: "おはよう", correct: false },
            ],
            explanation: 'Từ "こん" là phần đầu của "こんにちは" (konnichiwa) - Xin chào.',
        },
        {
            type: "text" as const,
            question: "さよう",
            answers: [
                { label: "A", text: "ありがとう", correct: false },
                { label: "B", text: "さようなら", correct: true },
                { label: "C", text: "おやすみ", correct: false },
            ],
            explanation: 'Từ "さよう" là phần đầu của "さようなら" (sayounara) - Tạm biệt.',
        },
        {
            type: "audio" as const,
            audio: "../../assets/play-circle.svg",
            answers: [
                { label: "A", text: "こんにちは", correct: true },
                { label: "B", text: "こんばんは", correct: false },
                { label: "C", text: "おはよう", correct: false },
            ],
            explanation: 'Âm thanh phát là "こんにちは" - Xin chào.',
        },
        {
            type: "text" as const,
            question: "おは",
            answers: [
                { label: "A", text: "おはよう", correct: true },
                { label: "B", text: "おはようございます", correct: false },
                { label: "C", text: "おはなし", correct: false },
            ],
            explanation: 'Từ "おは" là phần đầu của "おはよう" (ohayou) - Chào buổi sáng.',
        },
        {
            type: "text" as const,
            question: "あ",
            answers: [
                { label: "A", text: "ありがとう", correct: true },
                { label: "B", text: "あした", correct: false },
                { label: "C", text: "あめ", correct: false },
            ],
            explanation: 'Từ "あ" là phần đầu của "ありがとう" (arigatou) - Cảm ơn.',
        },
        {
            type: "audio" as const,
            audio: "../../assets/play-circle.svg",
            answers: [
                { label: "A", text: "さようなら", correct: true },
                { label: "B", text: "すみません", correct: false },
                { label: "C", text: "すみまさん", correct: false },
            ],
            explanation: 'Âm thanh phát là "さようなら" - Tạm biệt.',
        },
        {
            type: "text" as const,
            question: "すみ",
            answers: [
                { label: "A", text: "すみません", correct: true },
                { label: "B", text: "すみまさん", correct: false },
                { label: "C", text: "すみや", correct: false },
            ],
            explanation: 'Từ "すみ" là phần đầu của "すみません" (sumimasen) - Xin lỗi.',
        },
        {
            type: "text" as const,
            question: "はじめ",
            answers: [
                { label: "A", text: "はじめまして", correct: true },
                { label: "B", text: "はじめよう", correct: false },
                { label: "C", text: "はじめに", correct: false },
            ],
            explanation: 'Từ "はじめ" là phần đầu của "はじめまして" (hajimemashite) - Rất vui được gặp bạn.',
        },
        {
            type: "audio" as const,
            audio: "../../assets/play-circle.svg",
            answers: [
                { label: "A", text: "ありがとう", correct: true },
                { label: "B", text: "ありがとうございます", correct: false },
                { label: "C", text: "ありがと", correct: false },
            ],
            explanation: 'Âm thanh phát là "ありがとう" - Cảm ơn.',
        },
        {
            type: "text" as const,
            question: "じゃあ",
            answers: [
                { label: "A", text: "じゃあね", correct: true },
                { label: "B", text: "じゃあまた", correct: false },
                { label: "C", text: "じゃあな", correct: false },
            ],
            explanation: 'Từ "じゃあ" là phần đầu của "じゃあね" (jaa ne) - Hẹn gặp lại.',
        },
    ] as const;

    const totalQ = questions.length;

    const speakJapanese = (text: string) => {
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(text);
        utter.lang = "ja-JP";
        window.speechSynthesis.speak(utter);
    };

    useEffect(() => {
        const q = questions[currentQ];
        if (q.type === "audio") {
            const correctText = q.answers.find((a) => a.correct)?.text || "";
            const timer = setTimeout(() => speakJapanese(correctText), 600);
            return () => clearTimeout(timer);
        }
    }, [currentQ]);

    const handleAnswerClick = (index: number) => {
        if (isChecking) return;
        setSelectedIdx(index);
    };

    const handleCheck = () => {
        if (selectedIdx === null || isChecking) return;
        setIsChecking(true);
        setShowExplanation(true);

        const q = questions[currentQ];
        const correct = q.answers[selectedIdx].correct;
        setIsCorrect(correct);

        if (correct) {
            setScore((prev) => prev + 1);
        }
    };

    const nextQuestion = () => {
        setCurrentQ((prev) => prev + 1);
        setSelectedIdx(null);
        setIsChecking(false);
        setShowExplanation(false);
    };

    const handlePrev = () => {
        if (currentQ > 0 && !isChecking) {
            setCurrentQ((prev) => prev - 1);
            setSelectedIdx(null);
            setIsChecking(false);
            setShowExplanation(false);
        }
    };

    const handleRedo = () => {
        setCurrentQ(0);
        setScore(0);
        setSelectedIdx(null);
        setIsChecking(false);
        setShowResult(false);
        setShowExplanation(false);
    };

    const closePopup = (e: React.MouseEvent) => {
        if (e.target === overlayRef.current) {
            setShowResult(false);
        }
    };

    const q = questions[currentQ];
    const knScore = Math.round((score / totalQ) * 100);

    return (
        <div className="m-0 p-0 box-border font-['FS_PF_BeauSans_Pro','Roboto',sans-serif] min-h-screen flex flex-col">
            <Header2 onLogout={handleLogout} />

            <main className="flex flex-1 gap-4 bg-[#FAFAFA] min-h-0">
                {/* Sidebar */}
                <section className="border border-[#DDDDDD] w-64 min-h-full p-4 bg-white flex-shrink-0">
                    <div className="w-full h-20 bg-[#7E86A2] rounded-t-2xl p-4 text-white">
                        <h3 className="text-base font-semibold leading-8">Danh sách bài</h3>
                        <span className="text-xs font-light">4 videos • 50 phút • 1 bài Test</span>
                    </div>

                    {pages.map((page) => (
                        <div
                            key={page.id}
                            onClick={() => handlePageClick(page.id, page.path)}
                            className={`
                flex items-center gap-2 px-4 py-3 rounded-lg mt-2 cursor-pointer transition-all
                ${activePage === page.id ? "bg-[#ECEFF6] border border-[#7E86A2]" : "bg-[#FAFAFA]"}
                hover:bg-gray-100
              `}
                        >
              <span
                  className={`
                  text-sm
                  ${activePage === page.id ? "text-[#3D3D3D] font-bold" : "text-[#3D3D3D] font-normal"}
                `}
              >
                {page.label}
              </span>
                        </div>
                    ))}
                </section>

                <section className="flex-1 p-4 flex flex-col gap-5 min-w-0">
                    <div className="flex justify-between items-center min-h-22 border border-gray-300 rounded-2xl p-4 bg-white flex-shrink-0">
                        <div className="flex gap-4 items-center">
                            <div className="flex w-14 h-14 justify-center items-center rounded-lg bg-[rgba(126,134,162,0.1)] flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="60px" fill="#6a7698"><path d="M480-120q-18 0-34.5-6.5T416-146L163-400h113l197 197q2 2 3.5 2.5t3.5.5q2 0 3.5-.5t3.5-2.5l267-268q23-23 35-54.5t12-64.5q-2-69-46-118.5T645-758q-31 0-59.5 12T536-711l-27 29q-5 6-13 9.5t-16 3.5q-8 0-16-3.5t-14-9.5l-27-29q-21-23-49-36t-60-13q-54 0-93.5 34.5T167-640H85q17-85 79.5-142.5T314-840q48 0 90.5 19t75.5 53q32-34 74.5-53t90.5-19q100 0 167.5 74T880-590q0 49-17 94t-51 80L543-146q-13 13-29 19.5t-34 6.5Zm-5-360H80v-80h555q17 0 28.5-11.5T675-600q0-17-11.5-28.5T635-640q-14 0-25 7.5T596-611l-77-21q11-39 43-63.5t73-24.5q50 0 85 35t35 85q0 50-35 85t-85 35h-47q3 10 5 19.5t2 20.5q0 50-35 85t-85 35q-41 0-73-24.5T359-408l77-21q3 14 14 21.5t25 7.5q17 0 28.5-11.5T515-440q0-17-11.5-28.5T475-480Zm9 0Z"/></svg>
                            </div>
                            <div className="min-w-0">
                                <h3 className="m-0 text-lg font-semibold truncate">Kiểm tra cuối bài - Chào hỏi tiếng Nhật</h3>
                                <span className="text-sm text-gray-500">Đánh giá toàn diện kiến thức đã học</span>
                            </div>
                        </div>
                        <button className="relative w-[163px] h-[50px] border-2 border-[#5D678A] rounded-[16px] shadow-[0_4px_0_0_#4A5068] text-white font-bold text-[16px] bg-[#7E86A2] overflow-hidden cursor-pointer transition-all duration-200 ease-in-out hover:brightness-105 hover:shadow-[0_5px_0_0_#4A5068] active:translate-y-[2px] active:shadow-[0_2px_0_0_#4A5068] before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(-115deg,_#7E86A2_60%,_#9AA1BA_60%,_#9AA1BA_62%,_#7E86A2_62%,_#7E86A2_65%,_#9AA1BA_65%,_#9AA1BA_70%,_#7E86A2_70%,_#7E86A2_73%,_#9AA1BA_73%,_#9AA1BA_75%,_#7E86A2_75%)] before:pointer-events-none before:z-0 flex-shrink-0">
                            <Link to="/feedbackForm" className="relative z-[1] w-full h-full flex items-center justify-center">
                                Đánh giá
                            </Link>
                        </button>
                    </div>

                    <div className="rounded-lg bg-white border border-[#DDD] flex flex-col gap-5 flex-1 min-h-0">
                        <div className="p-6 lg:p-12 flex-1 min-h-0">
                            <p className="text-2xl font-bold text-[#3D3D3D] m-0">Nội dung nhóm câu hỏi</p>

                            <div className="flex justify-between mt-2 mb-6">
                                <p className="text-sm text-[#676767] m-0">Chọn đáp án đúng</p>
                                <p className="text-md text-[#676767] m-0">Câu {currentQ + 1}/{totalQ}</p>
                            </div>

                            <div className="flex flex-col lg:flex-row gap-6 h-[calc(100%-80px)] min-h-0">
                                <div className="flex-1 p-6 lg:p-12 rounded-lg border border-[#DDD] bg-[#FAFAFA] flex flex-col items-center justify-center gap-5 min-h-[200px]">
                                    <p className="text-lg font-semibold text-[#3D3D3D] m-0 text-center">
                                        {q.type === "text" ? "Chọn đáp án đúng" : "Nghe và trả lời câu hỏi"}
                                    </p>
                                    {q.type === "text" ? (
                                        <p className="text-3xl lg:text-4xl font-bold text-[#3D3D3D] m-0 text-center">{q.question}</p>
                                    ) : (
                                        <button
                                            className="border-none bg-transparent cursor-pointer"
                                            onClick={() => speakJapanese(q.answers.find((a) => a.correct)?.text || "")}
                                        >
                                            <img src={volume} alt="play" className="w-12 h-12 lg:w-18 lg:h-18" />
                                        </button>
                                    )}
                                </div>

                                <div className="flex flex-col gap-4 flex-1 min-w-0">
                                    {q.answers.map((ans, i) => {
                                        const isSelected = selectedIdx === i;
                                        const isCorrectAns = ans.correct;
                                        const showResult = isChecking;

                                        return (
                                            <div
                                                key={i}
                                                onClick={() => handleAnswerClick(i)}
                                                className={`
                                                    flex w-full min-h-20 p-3 items-center gap-4 rounded-lg border transition-all cursor-pointer
                                                    ${!showResult && isSelected ? "bg-[#ECEFF6] border-2 border-[#7E86A2] shadow-[0_4px_0_#7E86A2]" : ""}
                                                    ${showResult && isCorrectAns ? "bg-[#ECFDF3] border border-[#12B76A] shadow-[0_4px_0_#12B76A]" : ""}
                                                    ${showResult && isSelected && !isCorrectAns ? "bg-[#FEF3F2] border border-[#F04438] shadow-[0_4px_0_#F04438]" : ""}
                                                    ${(!showResult && !isSelected) || (showResult && !isSelected && !isCorrectAns) ? "bg-[#FAFAFA] border border-[#DDD] shadow-[0_4px_0_#D1D1D1]" : ""}
                                                    ${isChecking && !isCorrectAns && !isSelected ? "opacity-60" : ""}
                                                    ${isChecking ? "cursor-default" : ""}
                                                  `}
                                            >
                                                <div
                                                    className={`w-10 h-10 flex justify-center items-center rounded-lg text-[#676767] text-base font-semibold border flex-shrink-0
                                                        ${
                                                        showResult && isCorrectAns
                                                            ? "border-[#DDD] bg-[#12B76A] text-white"
                                                            : showResult && isSelected && !isCorrectAns
                                                                ? "border-[#DDD] bg-[#F04438] text-white"
                                                                : !showResult && isSelected
                                                                    ? "border-[#7E86A2] bg-[#ECEFF6]"
                                                                    : "border-[#D1D1D1] bg-[#EBEBEB]"
                                                    }
                                                `}
                                                >
                                                    {ans.label}
                                                </div>
                                                <p className="m-0 text-base font-semibold text-[#3D3D3D] truncate">{ans.text}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {showExplanation && (
                            <div className={`mt-5 p-4 border-t ${isCorrect ? "bg-[#D1FADF] border-t-[#32D583]" : "bg-[#FEF3F2] border-t-[#F04438]"} flex flex-col gap-3`}>
                                <div className="font-bold pl-2">Giải thích:</div>
                                <div className="pl-2 text-[#3D3D3D]">
                                    <span className="text-[#7E86A2] font-medium">{q.question}</span> {q.explanation}
                                </div>

                                <div className="flex items-center gap-4 py-4">
                                    <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-white flex justify-center items-center flex-shrink-0">
                                        <img
                                            src={isCorrect? v: x}
                                            alt="icon"
                                            className="w-8 h-8 lg:w-10 lg:h-10"
                                        />
                                    </div>
                                    <div className="min-w-0">
                                        <div className={`text-2xl lg:text-3xl font-bold ${isCorrect ? "text-[#0E9A5C]" : "text-[#F04438]"} `}>
                                            {isCorrect ? "Chính xác!" : "Chưa chính xác!"}
                                        </div>
                                        <div className="text-sm text-[#676767]">
                                            {isCorrect ? "Bạn đã chọn đúng!" : "Hãy xem lời giải để hiểu bài nhé"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="px-4 border-t border-[#DDD] bg-transparent flex-shrink-0">
                        <div className="flex justify-between items-center my-6 lg:my-12 gap-4">
                            <button onClick={handlePrev}  disabled={currentQ === 0 || isChecking}  className={`px-4 lg:px-5 py-3 rounded-2xl border border-[#B5B5B5] bg-white text-[#B5B5B5] text-base font-bold shadow-[0_2px_0_#B5B5B5] transition-all ${currentQ === 0 || isChecking ? "cursor-not-allowed opacity-60" : "cursor-pointer"} flex-shrink-0`}>
                                Câu trước
                            </button>

                            {!showExplanation ? (
                                <button
                                    className={`px-4 lg:px-5 py-3 rounded-2xl text-base font-bold transition-all flex-shrink-0
                                     ${selectedIdx !== null
                                        ? "bg-[#32D583] text-white border-[1.5px] border-[#12B76A] shadow-[0_2px_0_#039855]"
                                        : "bg-white text-[#B5B5B5] border-[1.5px] border-[#B5B5B5] shadow-[0_2px_0_#B5B5B5] cursor-not-allowed opacity-60"
                                    }
                            `}
                                    onClick={handleCheck}
                                    disabled={selectedIdx === null}
                                >
                                    Kiểm tra
                                </button>
                            ) : (
                                <button
                                    className={`px-4 lg:px-5 py-3 rounded-2xl text-white text-base font-bold cursor-pointer flex-shrink-0 ${isCorrect
                                        ? "bg-[#32D583] border border-[#039855] shadow-[0_2px_0_#039855]"
                                        : "bg-[#F04438] border border-[#890e05] shadow-[0_2px_0_#890e05]"
                                    }
                            `}
                                    onClick={() => {
                                        if (currentQ < totalQ - 1) {
                                            nextQuestion();
                                        } else {
                                            setShowResult(true);
                                        }
                                    }}
                                >
                                    Tiếp tục
                                </button>
                            )}
                        </div>
                    </div>
                </section>
            </main>

            {showResult && (
                <>
                    <div
                        ref={overlayRef}
                        className="fixed inset-0 bg-black/50 z-[1000]"
                        onClick={closePopup}
                    />
                    <div
                        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[600px] min-h-[520px] p-6 lg:p-10 bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.18)] z-[1100] flex flex-col items-center gap-4`}
                    >
                        <img src={medal} alt="medal" className="w-1/2 max-w-[200px] mb-2" />
                        <p className="text-xl lg:text-2xl font-bold text-[#F5B64A] m-0 text-center">Hoàn thành bài kiểm tra!</p>
                        <div className="flex gap-4 lg:gap-6 flex-wrap justify-center">
                            <div className="bg-[#32D583] rounded-lg p-[2px] w-28">
                                <p className="text-white text-center text-sm m-0">Điểm của bạn</p>
                                <p className="bg-white text-[#32D583] rounded-md px-2 py-1 font-bold m-0 text-center">
                                    {score}/{totalQ}
                                </p>
                            </div>
                            <div className="bg-[#F5B64A] rounded-lg p-[2px] w-28">
                                <p className="text-white text-center text-sm m-0">Điểm KN</p>
                                <p className="bg-white text-[#F5B64A] rounded-md px-2 py-1 font-bold m-0 flex items-center justify-center gap-1.5">
                                    <img src={start} alt="exp" className="w-4 h-4" /> {knScore}
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-between w-full pt-6 border-t border-[#DDD] gap-4 lg:gap-72 mt-4">
                            <button onClick={handleRedo} className="cursor-pointer px-4 lg:px-5 py-3 rounded-2xl border border-[#B5B5B5] bg-white text-[#B5B5B5] font-bold shadow-[0_2px_0_#B5B5B5] text-sm lg:text-base flex-shrink-0">
                                Làm lại
                            </button>
                            <button className="relative w-[100px] border-2 border-[#5D678A] rounded-[16px] shadow-[0_4px_0_0_#4A5068] text-white font-bold text-sm lg:text-[16px] bg-[#7E86A2] overflow-hidden cursor-pointer transition-all duration-200 ease-in-out hover:brightness-105 hover:shadow-[0_5px_0_0_#4A5068] active:translate-y-[2px] active:shadow-[0_2px_0_0_#4A5068] before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(-115deg,_#7E86A2_60%,_#9AA1BA_60%,_#9AA1BA_62%,_#7E86A2_62%,_#7E86A2_65%,_#9AA1BA_65%,_#9AA1BA_70%,_#7E86A2_70%,_#7E86A2_73%,_#9AA1BA_73%,_#9AA1BA_75%,_#7E86A2_75%)] before:pointer-events-none before:z-0 flex-shrink-0">
                                <Link to='/homePage' className='relative z-[1] w-full h-full flex items-center justify-center'>
                                    Trang chủ
                                </Link>
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default FinalTest;