import React, { useState, useEffect, useRef } from "react";
import LoadingProcess from "../components/LoadingProcess.tsx";
// import medal from "../assets/medal.svg"
import volume from "../assets/volume.svg"
import x from "../assets/x1.svg"
import v from "../assets/v1.svg"
// import start from "../assets/start.svg"
// import microphone from "../assets/microphone.svg";

export const NewVoca = () => {
    const [cards, setCards] = useState<any[]>([]);
    const [currIdx, setCurrIdx] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showMeaning, setShowMeaning] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    const audioRef = useRef<HTMLAudioElement | null>(null);

    const flashcards = [
        { japanese: "私は", meaning: "Tôi" },
        { japanese: "あなた", meaning: "Bạn" },
        { japanese: "本", meaning: "Sách" },
        { japanese: "水", meaning: "Nước" },
        { japanese: "食べる", meaning: "Ăn" }
    ];

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        audioRef.current = new Audio();
        audioRef.current.onended = () => setIsPlaying(false);

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    const loadData = () => {
        setIsLoading(true);
        setTimeout(() => {
            setCards(flashcards);
            setIsLoading(false);
        }, 2000);
    };

    const handleCardClick = () => {
        if (cards.length === 0) return;
        setShowMeaning(!showMeaning);
    };

    const handleVolumeClick = (e: React.MouseEvent) => {
        e.stopPropagation();

        if (!currentCard || !audioRef.current) return;

        const textToSpeak = showMeaning ? currentCard.meaning : currentCard.japanese;

        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(textToSpeak);

            const voices = speechSynthesis.getVoices();
            const japaneseVoice = voices.find(voice =>
                voice.lang.includes('ja') || voice.lang.includes('JP')
            );

            if (japaneseVoice) {
                utterance.voice = japaneseVoice;
                utterance.lang = 'ja-JP';
            } else {
                utterance.lang = showMeaning ? 'vi-VN' : 'ja-JP';
            }

            utterance.rate = 0.8;
            utterance.pitch = 1;

            setIsPlaying(true);

            utterance.onend = () => {
                setIsPlaying(false);
            };

            utterance.onerror = () => {
                setIsPlaying(false);
            };

            speechSynthesis.cancel();
            speechSynthesis.speak(utterance);
        } else {
            try {
                const audioFile = showMeaning
                    ? `/audio/${currentCard.meaning.toLowerCase().replace(/\s+/g, '_')}.mp3`
                    : `/audio/${currentCard.japanese}.mp3`;

                if (audioRef.current) {
                    audioRef.current.src = audioFile;
                    audioRef.current.play().then(() => {
                        setIsPlaying(true);
                    }).catch(error => {
                        console.error("Lỗi phát âm thanh:", error);
                        setIsPlaying(false);
                    });
                }
            } catch (error) {
                console.error("Lỗi phát âm thanh:", error);
                setIsPlaying(false);
            }
        }
    };

    const wrongAns = () => {
        if (cards.length === 0) return;

        const newCards = [...cards];
        const currCard = newCards[currIdx];
        newCards.splice(currIdx, 1);
        newCards.push(currCard);

        setCards(newCards);
        setShowMeaning(false);

        if (currIdx >= newCards.length) {
            setCurrIdx(0);
        }
    };

    const correctAns = () => {
        if (cards.length === 0) return;

        const newCards = [...cards];
        newCards.splice(currIdx, 1);

        setCards(newCards);
        setShowMeaning(false);

        if (newCards.length === 0) {
            setShowPopup(true);
            return;
        }

        if (currIdx >= newCards.length) {
            setCurrIdx(newCards.length - 1);
        }
    };

    const handleStudy = () => {
        setShowPopup(false);
    };

    const handleRedo = () => {
        window.location.reload();
    };

    const currentCard = cards[currIdx];

    return (
        <>
            {/* Loading Spinner */}
            {isLoading && (
                <LoadingProcess/>
            )}
             <div className="w-full h-full min-h-[600px] bg-cover bg-center bg-no-repeat flex justify-center items-center" style={{ backgroundImage: 'url(../../assets/thubachgounf.png)' }}>
                    <div className="relative">
                        <div className="absolute -top-8 left-16 w-[641px] h-[199px] rounded-2xl border border-[#AD7415] bg-[#F7C268] opacity-60 z-30"></div>
                        <div className="absolute -top-4 left-12 w-[679px] h-[199px] rounded-2xl border border-[#AD7415] bg-[#F7C268] opacity-60 z-20"></div>
                        <div className="absolute top-4 left-8 w-[717px] h-[199px] rounded-2xl border border-[#AD7415] bg-[#F7C268] opacity-60 z-10"></div>

                        <div className="z-50 w-[776px] p-6 rounded-[32px] border-2 border-[#AD7415] bg-gradient-to-b from-[#F9D597] to-[#AD7415] shadow-[0_7px_0_0_#AD7415] relative">
                            <div className="p-3 rounded-[24px] bg-gradient-to-b from-[#AD7415] to-[#F9D597]">
                                <div
                                    className="w-[700px] h-[353px] bg-white rounded-xl relative overflow-hidden flex justify-center items-center cursor-pointer"
                                    onClick={handleCardClick}
                                >
                                    <p className="text-6xl font-bold text-gray-800 text-center p-8 transition-all duration-300">
                                        {currentCard ? (showMeaning ? currentCard.meaning : currentCard.japanese) : ""}
                                    </p>

                                    {/* Volume Icon với logic phát âm thanh */}
                                    <img
                                        src={volume}
                                        alt="volume"
                                        className={`absolute bottom-6 right-4 w-20 h-10 cursor-pointer hover:opacity-80 transition-opacity ${
                                            isPlaying ? 'animate-pulse' : ''
                                        }`}
                                        onClick={handleVolumeClick}
                                        title="Nghe phát âm"
                                    />
                                </div>
                            </div>

                            {/* Navigation Buttons */}
                            <div className="flex justify-center items-center gap-16 mt-4">
                                <button
                                    onClick={wrongAns}
                                    className="cursor-pointer hover:scale-110 transition-transform"
                                >
                                    <img src={x} alt="wrong" className="w-20 h-12" />
                                </button>
                                <span className="text-4xl font-bold text-white">
                                {cards.length > 0 ? `${currIdx + 1}/${cards.length}` : "0/0"}
                            </span>
                                <button
                                    onClick={correctAns}
                                    className="cursor-pointer hover:scale-110 transition-transform"
                                >
                                    <img src={v} alt="correct" className="w-20 h-12" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/*/!* Completion Popup *!/*/}
                {/*{showPopup && (*/}
                {/*    <>*/}
                {/*        <div className="fixed inset-0 bg-[rgba(0,0,0,0.45)] z-40 transition-opacity duration-300"></div>*/}
                {/*        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-6 z-50 w-[450px] h-[500px] flex flex-col items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition-transform duration-300">*/}
                {/*            <div className="flex flex-col items-center gap-2">*/}
                {/*                <img src={medal} alt="medal" className="w-16 h-16" />*/}
                {/*                <div className="text-2xl font-bold text-[#F5B64A]">Hoàn thành phần từ vựng</div>*/}
                {/*                <div className="flex gap-6 mt-4">*/}
                {/*                    <div className="w-27 h-21 bg-[#F5B64A] rounded-lg p-1">*/}
                {/*                        <div className="text-white text-sm font-bold text-center">Điểm KN</div>*/}
                {/*                        <div className="flex items-center justify-center gap-1.5 bg-white rounded px-2 py-2 mt-1 text-[#F5B64A] text-lg font-bold">*/}
                {/*                            <img src={start} alt="point" className="w-4 h-4" />*/}
                {/*                            5*/}
                {/*                        </div>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*            <div className="flex justify-between items-center w-full px-16 py-10 mt-7 border-t border-gray-300">*/}
                {/*                <button onClick={handleRedo} className="px-5 py-3 border border-gray-400 bg-white text-gray-400 rounded-2xl font-bold shadow-[0_2px_0_0_#B5B5B5] hover:bg-gray-50 transition-colors">*/}
                {/*                    Làm lại*/}
                {/*                </button>*/}
                {/*                <button onClick={handleStudy} className="px-5 py-3 bg-[#F5B64A] text-white rounded-2xl font-bold relative hover:bg-[#e6a53e] transition-colors">*/}
                {/*                    <img src="../../assets/Frame 1000007256.svg" alt="study" className="absolute left-4 top-0 w-8 h-12"/>*/}
                {/*                    Học tiếp*/}
                {/*                </button>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </>*/}
                {/*)}*/}
        </>
    );
};