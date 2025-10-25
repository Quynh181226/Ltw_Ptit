import { useEffect, useRef, useState } from "react";
import Header2 from "../components/Header2.tsx";
import handleLogout from "../components/handleLogout.tsx";
import volume from "../assets/volume.svg";
import microphone from "../assets/microphone.svg";
import { Link } from "react-router-dom";

interface CountNumber {
    kanji: string;
    kana: string;
    romaji: string;
    meaning: string;
}

const countData: CountNumber[] = [
    { kanji: "０", kana: "ゼロ", romaji: "zero", meaning: "không" },
    { kanji: "１", kana: "いち", romaji: "ichi", meaning: "một" },
    { kanji: "２", kana: "に", romaji: "ni", meaning: "hai" },
    { kanji: "３", kana: "さん", romaji: "san", meaning: "ba" },
    { kanji: "４", kana: "よん", romaji: "yon", meaning: "bốn" },
    { kanji: "５", kana: "ご", romaji: "go", meaning: "năm" },
    { kanji: "６", kana: "ろく", romaji: "roku", meaning: "sáu" },
    { kanji: "７", kana: "なな", romaji: "nana", meaning: "bảy" },
    { kanji: "８", kana: "はち", romaji: "hachi", meaning: "tám" },
    { kanji: "９", kana: "きゅう", romaji: "kyū", meaning: "chín" },
    { kanji: "１０", kana: "じゅう", romaji: "jū", meaning: "mười" },
    { kanji: "１１", kana: "じゅういち", romaji: "jūichi", meaning: "mười một" },
    { kanji: "２０", kana: "にじゅう", romaji: "nijū", meaning: "hai mươi" },
    { kanji: "１００", kana: "ひゃく", romaji: "hyaku", meaning: "một trăm" },
    { kanji: "３００", kana: "さんびゃく", romaji: "sanbyaku", meaning: "ba trăm" },
    { kanji: "１０００", kana: "せん", romaji: "sen", meaning: "một nghìn" },
    { kanji: "１００００", kana: "まん", romaji: "man", meaning: "mười nghìn" },
    { kanji: "何", kana: "なん", romaji: "nan", meaning: "bao nhiêu" },
];

const CountNumber = () => {
    const overlayRef = useRef<HTMLDivElement>(null);
    const [activeTab, setActiveTab] = useState("basic");
    const [activePage, setActivePage] = useState("count");
    const [selectedNumber, setSelectedNumber] = useState<CountNumber | null>(null);
    const [showPopup, setShowPopup] = useState(false);

    const tabs = [
        { id: "basic", label: "Số cơ bản (1-10)" },
        { id: "tens", label: "Số chục (10, 20, 30...)" },
        { id: "hundreds", label: "Số trăm (100, 200...)" },
        { id: "thousands", label: "Số nghìn & lớn hơn" },
        { id: "special", label: "Số đặc biệt & hỏi bao nhiêu" },
    ];

    const pages = [
        { id: "hiragana", label: "Hiragana", path: "/hiragana" },
        { id: "katakana", label: "Katakana", path: "/katakana" },
        { id: "count", label: "Số đếm", path: "/countNumber" },
        { id: "test", label: "Kiểm tra cuối bài", path: "/finalTest" },
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

    const handleNumberClick = (num: CountNumber) => {
        setSelectedNumber(num);
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setSelectedNumber(null);
    };

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) handleClosePopup();
    };

    const speakJapanese = (text: string) => {
        window.speechSynthesis.cancel();

        const utter = new SpeechSynthesisUtterance(text);
        utter.lang = "ja-JP";
        utter.rate = 0.9;
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
                                <div onClick={() => handlePageClick(page.id, page.path)} className={`flex items-center gap-2 px-4 py-3 rounded-lg mt-2 cursor-pointer transition-all  ${activePage === page.id ? "bg-[#ECEFF6] border border-[#7E86A2]" : "bg-[#FAFAFA]"} hover:bg-gray-100`}>
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
                                    <h3 className="m-0 text-lg font-semibold">Số đếm trong tiếng Nhật</h3>
                                    <span className="text-sm text-gray-500">Từ 0 đến 10.000, cách đọc, cách viết và ứng dụng</span>
                                </div>
                            </div>
                            <button className="relative w-[163px] h-[50px] border-2 border-[#5D678A] rounded-[16px] shadow-[0_4px_0_0_#4A5068] text-white font-bold text-[16px] bg-[#7E86A2] overflow-hidden cursor-pointer transition-all duration-200 ease-in-out hover:brightness-105 hover:shadow-[0_5px_0_0_#4A5068] active:translate-y-[2px] active:shadow-[0_2px_0_0_#4A5068] before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(-115deg,_#7E86A2_60%,_#9AA1BA_60%,_#9AA1BA_62%,_#7E86A2_62%,_#7E86A2_65%,_#9AA1BA_65%,_#9AA1BA_70%,_#7E86A2_70%,_#7E86A2_73%,_#9AA1BA_73%,_#9AA1BA_75%,_#7E86A2_75%)] before:pointer-events-none before:z-0">
                                <Link to="/feedbackForm" className="relative z-[1]">Đánh giá</Link>
                            </button>
                        </div>

                        {/* Tabs */}
                        <div className="bg-white rounded-lg p-4 mb-4">
                            <p className="text-2xl font-semibold text-gray-800 mb-4">Số đếm</p>
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

                            {/* Tab: Số cơ bản */}
                            {activeTab === "basic" && (
                                <div className="p-4">
                                    <p className="text-base font-semibold mb-3">Số từ 0 đến 10 là nền tảng quan trọng nhất.</p>
                                    <div className="grid grid-cols-4 gap-4">
                                        {countData
                                            .filter((n) => ["０","１","２","３","４","５","６","７","８","９","１０"].includes(n.kanji))
                                            .map((item, idx) => (
                                                <div
                                                    key={idx}
                                                    onClick={() => handleNumberClick(item)}
                                                    className="flex flex-col items-center gap-1 px-2 py-3.5 rounded-lg border border-gray-300 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                                                >
                                                    <p className="m-0 text-2xl font-semibold text-gray-800">{item.kanji}</p>
                                                    <p className="m-0 text-sm text-gray-500">{item.romaji}</p>
                                                </div>
                                            ))}
                                    </div>
                                    <div className="mt-4 text-sm text-gray-600">
                                        <p><strong>Lưu ý:</strong> Số 4 có 2 cách đọc: <code>よん</code> (yon) và <code>し</code> (shi). <code>よん</code> được dùng phổ biến hơn vì <code>し</code> đồng âm với "tử" (chết).</p>
                                    </div>
                                </div>
                            )}

                            {/* Tab: Số chục */}
                            {activeTab === "tens" && (
                                <div className="p-4 space-y-4">
                                    <p className="text-base font-semibold">Số chục = số đơn vị + <code>じゅう</code> (jū)</p>
                                    <ul className="space-y-2 text-sm text-gray-700">
                                        <li><strong>10</strong> = じゅう (jū)</li>
                                        <li><strong>20</strong> = にじゅう (nijū)</li>
                                        <li><strong>30</strong> = さんじゅう (sanjū)</li>
                                        <li><strong>40</strong> = よんじゅう (yonjū)</li>
                                        <li><strong>50</strong> = ごじゅう (gojū)</li>
                                        <li><strong>99</strong> = きゅうじゅうきゅう (kyūjūkyū)</li>
                                    </ul>
                                    <p className="text-sm text-gray-600">Ví dụ: <strong>23</strong> = にじゅうさん (nijūsan)</p>
                                </div>
                            )}

                            {/* Tab: Số trăm */}
                            {activeTab === "hundreds" && (
                                <div className="p-4 space-y-4">
                                    <p className="text-base font-semibold">Số trăm = số đơn vị + <code>ひゃく</code> (hyaku)</p>
                                    <ul className="space-y-2 text-sm text-gray-700">
                                        <li><strong>100</strong> = ひゃく (hyaku)</li>
                                        <li><strong>200</strong> = にひゃく (nihyaku)</li>
                                        <li><strong>300</strong> = さんびゃく (sanbyaku) <em>(biến âm)</em></li>
                                        <li><strong>600</strong> = ろっぴゃく (roppyaku) <em>(biến âm)</em></li>
                                        <li><strong>800</strong> = はっぴゃく (happyaku) <em>(biến âm)</em></li>
                                    </ul>
                                    <p className="text-sm text-gray-600">Ví dụ: <strong>456</strong> = よんひゃくごじゅうろく (yonhyaku gojūroku)</p>
                                </div>
                            )}

                            {/* Tab: Số nghìn & lớn hơn */}
                            {activeTab === "thousands" && (
                                <div className="p-4 space-y-4">
                                    <p className="text-base font-semibold">Số lớn hơn 1000</p>
                                    <ul className="space-y-2 text-sm text-gray-700">
                                        <li><strong>1.000</strong> = せん (sen)</li>
                                        <li><strong>3.000</strong> = さんぜん (sanzen) <em>(biến âm)</em></li>
                                        <li><strong>8.000</strong> = はっせん (hassen) <em>(biến âm)</em></li>
                                        <li><strong>10.000</strong> = いちまん (ichiman)</li>
                                        <li><strong>100.000</strong> = じゅうまん (jūman)</li>
                                        <li><strong>1.000.000</strong> = ひゃくまん (hyakuman)</li>
                                    </ul>
                                    <p className="text-sm text-gray-600">Ví dụ: <strong>2025</strong> = にせんにじゅうご (nisen nijūgo)</p>
                                </div>
                            )}

                            {/* Tab: Số đặc biệt */}
                            {activeTab === "special" && (
                                <div className="p-4 space-y-4">
                                    <p className="text-base font-semibold">Số đặc biệt & câu hỏi</p>
                                    <ul className="space-y-2 text-sm text-gray-700">
                                        <li><strong>0</strong> = ゼロ (zero) hoặc れい (rei)</li>
                                        <li><strong>半</strong> = はん (han) → dùng trong "nửa giờ", "nửa vé"</li>
                                        <li><strong>何</strong> = なん (nan) → "bao nhiêu?"</li>
                                    </ul>
                                    <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm">
                                        <p><strong>Ví dụ hỏi:</strong></p>
                                        <p>→ いくらですか？ (Ikura desu ka?) → Bao nhiêu tiền?</p>
                                        <p>→ なんさいですか？ (Nansai desu ka?) → Bạn bao nhiêu tuổi?</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                </main>

                {/* Popup */}
                {showPopup && selectedNumber && (
                    <>
                        <div
                            ref={overlayRef}
                            onClick={handleOverlayClick}
                            className="fixed inset-0 bg-[rgba(0,0,0,0.45)] z-40 transition-opacity duration-300"
                        ></div>
                        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-6 z-50 w-[300px] h-[280px] flex flex-col items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition-transform duration-300">
                            <div className="flex flex-col items-center justify-center w-full h-full rounded-xl border border-[#E5E5E5] bg-[#FAFAFA] p-4">
                                <p className="text-[120px] font-bold text-gray-800 m-0">{selectedNumber.kanji}</p>
                                <p className="text-xl font-medium text-gray-600 mt-2">{selectedNumber.kana}</p>
                                <p className="text-sm text-gray-500">({selectedNumber.romaji}) - {selectedNumber.meaning}</p>
                            </div>
                            <div className="flex gap-6 mt-6">
                                <button className="flex items-center justify-center bg-orange-50 w-10 h-10 rounded-full hover:bg-orange-100 transition-colors">
                                    <img src={microphone} alt="mic" width={18} height={18} />
                                </button>
                                <button
                                    onClick={() => speakJapanese(selectedNumber.kana)}
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

export default CountNumber;