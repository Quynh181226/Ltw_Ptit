import { useEffect, useRef, useState } from "react";
import Header2 from "../components/Header2.tsx";
import handleLogout from "../components/handleLogout.tsx";
import volume from "../assets/volume.svg";
import microphone from "../assets/microphone.svg";
import { Link } from "react-router-dom";
import Pagination2 from "../components/Pagination2.tsx";

interface KatakanaChar {
    char: string;
    rom: string;
}

const katakanaData: KatakanaChar[] = [
    { char: "ア", rom: "a" }, { char: "イ", rom: "i" }, { char: "ウ", rom: "u" },
    { char: "エ", rom: "e" }, { char: "オ", rom: "o" }, { char: "カ", rom: "ka" },
    { char: "キ", rom: "ki" }, { char: "ク", rom: "ku" }, { char: "ケ", rom: "ke" },
    { char: "コ", rom: "ko" }, { char: "サ", rom: "sa" }, { char: "シ", rom: "shi" },
    { char: "ス", rom: "su" }, { char: "セ", rom: "se" }, { char: "ソ", rom: "so" },
    { char: "タ", rom: "ta" }, { char: "チ", rom: "chi" }, { char: "ツ", rom: "tsu" },
    { char: "テ", rom: "te" }, { char: "ト", rom: "to" }, { char: "ナ", rom: "na" },
    { char: "ニ", rom: "ni" }, { char: "ヌ", rom: "nu" }, { char: "ネ", rom: "ne" },
    { char: "ノ", rom: "no" }, { char: "ハ", rom: "ha" }, { char: "ヒ", rom: "hi" },
    { char: "フ", rom: "fu" }, { char: "ヘ", rom: "he" }, { char: "ホ", rom: "ho" },
    { char: "マ", rom: "ma" }, { char: "ミ", rom: "mi" }, { char: "ム", rom: "mu" },
    { char: "メ", rom: "me" }, { char: "モ", rom: "mo" }, { char: "ヤ", rom: "ya" },
    { char: "ユ", rom: "yu" }, { char: "ヨ", rom: "yo" }, { char: "ラ", rom: "ra" },
    { char: "リ", rom: "ri" }, { char: "ル", rom: "ru" }, { char: "レ", rom: "re" },
    { char: "ロ", rom: "ro" }, { char: "ワ", rom: "wa" }, { char: "ヲ", rom: "wo" },
    { char: "ン", rom: "n" }
];

const Katakana = () => {
    const overlayRef = useRef<HTMLDivElement>(null);
    const [activeTab, setActiveTab] = useState("alphabet");
    const [activePage, setActivePage] = useState("katakana");
    const [selectedChar, setSelectedChar] = useState<KatakanaChar | null>(null);
    const [showPopup, setShowPopup] = useState(false);

    const [currPage, setCurrPage] = useState(1);
    const perPage = 15;
    const start = (currPage - 1) * perPage;
    const end = start + perPage;
    const totalPages = Math.ceil(katakanaData.length / perPage);
    const currentItems = katakanaData.slice(start, end);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrPage(page);
        }
    };

    const tabs = [
        { id: "alphabet", label: "Bảng chữ cái" },
        { id: "negative", label: "Biến âm (Dakuon)" },
        { id: "graft", label: "Âm ghép (Youon)" },
        { id: "sound", label: "Trường âm (Chouon)" },
        { id: "shock", label: "Âm ngắt (Sokuon)" }
    ];

    const pages = [
        { id: "hiragana", label: "Hiragana", path: "/hiragana" },
        { id: "katakana", label: "Katakana", path: "/katakana" },
        { id: "count", label: "Số đếm", path: "/countNumber" },
        { id: "test", label: "Kiểm tra cuối bài", path: "/finalTest" }
    ];

    useEffect(() => {
        const path = window.location.pathname;
        if (path.includes("hiragana")) setActivePage("hiragana");
        else if (path.includes("katakana")) setActivePage("katakana");
        else if (path.includes("count")) setActivePage("count");
        else if (path.includes("test")) setActivePage("test");
    }, []);

    const handleTabClick = (tabId: string) => setActiveTab(tabId);

    const handlePageClick = (pageId: string, path: string) => {
        setActivePage(pageId);
        window.location.href = path;
    };

    const handleCharClick = (char: KatakanaChar) => {
        setSelectedChar(char);
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setSelectedChar(null);
    };

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) handleClosePopup();
    };

    // PHÁT ÂM TIẾNG NHẬT
    const speakJapanese = (text: string) => {
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(text);
        utter.lang = "ja-JP";
        utter.rate = 0.8;
        utter.pitch = 1;
        window.speechSynthesis.speak(utter);
    };

    return (
        <>
            <Header2 onLogout={handleLogout} />
            <div className="m-0 p-0 box-border font-sans">
                <main className="flex gap-4 bg-gray-50">
                    {/* Sidebar */}
                    <section className="border border-gray-300 w-80 h-screen p-4 bg-white">
                        <div className="w-full h-20 bg-[#7E86A2] rounded-t-2xl p-4 text-white">
                            <h3 className="text-base font-semibold leading-8">Danh sách bài</h3>
                            <span className="text-xs font-light">4 videos • 50 phút • 1 bài Test</span>
                        </div>
                        {pages.map((page) => (
                            <div key={page.id} className="mt-2">
                                <div
                                    onClick={() => handlePageClick(page.id, page.path)}
                                    className={`flex items-center gap-2 px-4 py-3 rounded-lg mt-2 cursor-pointer transition-all
                    ${activePage === page.id ? "bg-[#ECEFF6] border border-[#7E86A2]" : "bg-[#FAFAFA]"} hover:bg-gray-100`}
                                >
                  <span className={`text-sm ${activePage === page.id ? "font-bold" : "font-normal"}`}>
                    {page.label}
                  </span>
                                </div>
                            </div>
                        ))}
                    </section>

                    {/* Main Section */}
                    <section className="flex-1 p-4">
                        <div className="flex justify-between items-center h-22 border border-gray-300 rounded-2xl p-4 mb-4 bg-white">
                            <div className="flex gap-4 items-center">
                                <div className="flex w-14 h-14 justify-center items-center rounded-lg bg-[rgba(126,134,162,0.1)]">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="60px" fill="#6a7698">
                                        <path d="M480-120q-18 0-34.5-6.5T416-146L163-400h113l197 197q2 2 3.5 2.5t3.5.5q2 0 3.5-.5t3.5-2.5l267-268q23-23 35-54.5t12-64.5q-2-69-46-118.5T645-758q-31 0-59.5 12T536-711l-27 29q-5 6-13 9.5t-16 3.5q-8 0-16-3.5t-14-9.5l-27-29q-21-23-49-36t-60-13q-54 0-93.5 34.5T167-640H85q17-85 79.5-142.5T314-840q48 0 90.5 19t75.5 53q32-34 74.5-53t90.5-19q100 0 167.5 74T880-590q0 49-17 94t-51 80L543-146q-13 13-29 19.5t-34 6.5Zm-5-360H80v-80h555q17 0 28.5-11.5T675-600q0-17-11.5-28.5T635-640q-14 0-25 7.5T596-611l-77-21q11-39 43-63.5t73-24.5q50 0 85 35t35 85q0 50-35 85t-85 35h-47q3 10 5 19.5t2 20.5q0 50-35 85t-85 35q-41 0-73-24.5T359-408l77-21q3 14 14 21.5t25 7.5q17 0 28.5-11.5T515-440q0-17-11.5-28.5T475-480Zm9 0Z"/>
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="m-0 text-lg font-semibold">Katakana</h3>
                                    <span className="text-sm text-gray-500">Bảng chữ cái dùng cho từ mượn, tên nước ngoài, âm thanh</span>
                                </div>
                            </div>
                            <button className="relative w-[163px] h-[50px] border-2 border-[#5D678A] rounded-[16px] shadow-[0_4px_0_0_#4A5068] text-white font-bold text-[16px] bg-[#7E86A2] overflow-hidden cursor-pointer transition-all duration-200 ease-in-out hover:brightness-105 hover:shadow-[0_5px_0_0_#4A5068] active:translate-y-[2px] active:shadow-[0_2px_0_0_#4A5068] before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(-115deg,_#7E86A2_60%,_#9AA1BA_60%,_#9AA1BA_62%,_#7E86A2_62%,_#7E86A2_65%,_#9AA1BA_65%,_#9AA1BA_70%,_#7E86A2_70%,_#7E86A2_73%,_#9AA1BA_73%,_#9AA1BA_75%,_#7E86A2_75%)] before:pointer-events-none before:z-0">
                                <Link to="/feedbackForm" className="relative z-[1]">Đánh giá</Link>
                            </button>
                        </div>

                        {/* Tabs */}
                        <div className="bg-white rounded-lg p-4 mb-4">
                            <p className="text-2xl font-semibold text-gray-800 mb-4">Katakana</p>
                            <div className="flex gap-2 flex-wrap mb-4">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => handleTabClick(tab.id)}
                                        className={`px-4 py-2 rounded-lg cursor-pointer transition-colors ${
                                            activeTab === tab.id ? "bg-[#ECEFF6] border border-[#7E86A2]" : "bg-gray-50 hover:bg-gray-100"
                                        }`}
                                    >
                                        <p className={`m-0 text-sm font-medium ${activeTab === tab.id ? "text-gray-600" : "text-gray-500"}`}>
                                            {tab.label}
                                        </p>
                                    </button>
                                ))}
                            </div>

                            <div className="border-b border-gray-300 pb-2 mb-4"></div>

                            {activeTab === "alphabet" && (
                                <div className="p-4">
                                    <p className="text-base font-semibold mb-3">Katakana gồm 46 chữ cái cơ bản, dùng cho từ mượn, tên riêng, âm thanh.</p>
                                    <div className="grid grid-cols-5 gap-4">
                                        {currentItems.map((item, idx) => (
                                            <div
                                                key={idx}
                                                onClick={() => handleCharClick(item)}
                                                className="flex flex-col items-center gap-1 px-2 py-3.5 rounded-lg border border-gray-300 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                                            >
                                                <p className="m-0 text-2xl font-semibold text-gray-800">{item.char}</p>
                                                <p className="m-0 text-sm text-gray-500">{item.rom}</p>
                                            </div>
                                        ))}
                                    </div>
                                    {totalPages > 1 && (
                                        <div className="mt-6 flex justify-end">
                                            <Pagination2
                                                currPage={currPage}
                                                totalPages={totalPages}
                                                onChangePage={handlePageChange}
                                            />
                                        </div>
                                    )}
                                    <div className="mt-4 text-sm text-gray-600">
                                        <p><strong>Lưu ý:</strong> Katakana có cùng âm với Hiragana, chỉ khác hình thức.</p>
                                    </div>
                                </div>
                            )}

                            {activeTab === "negative" && (
                                <div className="p-4 space-y-4">
                                    <p className="text-base font-semibold">Biến âm (濁音 - Dakuon): Thêm dấu <code>゛</code> (nigori) để biến thành âm đục.</p>
                                    <ul className="space-y-2 text-sm text-gray-700">
                                        <li><strong>カ → ガ</strong> (ka → ga)</li>
                                        <li><strong>サ → ザ</strong> (sa → za)</li>
                                        <li><strong>ハ → バ</strong> (ha → ba)</li>
                                        <li><strong>ハ → パ</strong> (ha → pa) – dùng dấu <code>゜</code> (handakuon)</li>
                                    </ul>
                                    <p className="text-sm text-gray-600">Ví dụ: <strong>アメリカ</strong> (Amerika) → Mỹ</p>
                                </div>
                            )}

                            {activeTab === "graft" && (
                                <div className="p-4 space-y-4">
                                    <p className="text-base font-semibold">Âm ghép (拗音 - Youon): Dùng chữ <code>ャ ュ ョ</code> nhỏ sau chữ có âm <code>イ</code>.</p>
                                    <ul className="space-y-2 text-sm text-gray-700">
                                        <li><strong>キャ</strong> (kya) → キャンディ (kyandi) = kẹo</li>
                                        <li><strong>シュ</strong> (shu) → シューズ (shūzu) = giày</li>
                                        <li><strong>チョ</strong> (cho) → チョコレート (chokorēto) = socola</li>
                                    </ul>
                                    <p className="text-sm text-gray-600">Thường dùng trong từ mượn tiếng Anh.</p>
                                </div>
                            )}

                            {/* Tab: Trường âm */}
                            {activeTab === "sound" && (
                                <div className="p-4 space-y-4">
                                    <p className="text-base font-semibold">Trường âm (長音 - Chouon): Dùng dấu <code>ー</code> để kéo dài nguyên âm.</p>
                                    <ul className="space-y-2 text-sm text-gray-700">
                                        <li><strong>コーヒー</strong> (kōhī) = cà phê</li>
                                        <li><strong>ビール</strong> (bīru) = bia</li>
                                        <li><strong>スーパー</strong> (sūpā) = siêu thị</li>
                                    </ul>
                                    <p className="text-sm text-gray-600">Dấu <code>ー</code> chỉ xuất hiện trong Katakana.</p>
                                </div>
                            )}

                            {/* Tab: Âm ngắt */}
                            {activeTab === "shock" && (
                                <div className="p-4 space-y-4">
                                    <p className="text-base font-semibold">Âm ngắt (促音 - Sokuon): Dùng chữ <code>ッ</code> nhỏ để tạo âm ngắt.</p>
                                    <ul className="space-y-2 text-sm text-gray-700">
                                        <li><strong>カット</strong> (katto) = cắt</li>
                                        <li><strong>ベッド</strong> (beddo) = giường</li>
                                        <li><strong>マッチ</strong> (macchi) = diêm</li>
                                    </ul>
                                    <p className="text-sm text-gray-600">Tạo cảm giác dừng ngắn trước phụ âm.</p>
                                </div>
                            )}
                        </div>
                    </section>
                </main>

                {/* Popup */}
                {showPopup && selectedChar && (
                    <>
                        <div
                            ref={overlayRef}
                            onClick={handleOverlayClick}
                            className="fixed inset-0 bg-[rgba(0,0,0,0.45)] z-40 transition-opacity duration-300"
                        ></div>
                        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-6 z-50 w-[300px] h-[280px] flex flex-col items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition-transform duration-300">
                            <div className="flex flex-col items-center justify-center w-full h-full rounded-xl border border-[#E5E5E5] bg-[#FAFAFA] p-4">
                                <p className="text-[120px] font-bold text-gray-800 m-0">{selectedChar.char}</p>
                                <p className="text-xl font-medium text-gray-600 mt-2">{selectedChar.rom}</p>
                            </div>
                            <div className="flex gap-6 mt-6">
                                <button className="flex items-center justify-center bg-orange-50 w-10 h-10 rounded-full hover:bg-orange-100 transition-colors">
                                    <img src={microphone} alt="mic" width={18} height={18} />
                                </button>
                                <button
                                    onClick={() => speakJapanese(selectedChar.rom)}
                                    className="flex items-center justify-center bg-blue-50 w-10 h-10 rounded-full hover:bg-blue-100 transition-colors"
                                >
                                    <img src={volume} alt="sound" width={24} height={24} />
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Katakana;