import React, { useState } from "react";
import Footer1 from "../components/Footer1.tsx";
import Header2 from "../components/Header2.tsx";
import handleLogout from "../components/handleLogout.tsx";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {faWandMagicSparkles} from "@fortawesome/free-solid-svg-icons";
// import {Calculator} from "lucide-react";

const Calculate = () => {
    const [display, setDisplay] = useState("");

    const handleButtonClick = (value: string) => {
        setDisplay((prev) => prev + value);
    };

    const handleClear = () => setDisplay("");

    const handleEqual = () => {
        try {
            const result = Function(`"use strict"; return (${display})`)();
            setDisplay(String(result));
        } catch {
            setDisplay("Error");
        }
    };

    const buttons = [
        "7", "8", "9", "/",
        "4", "5", "6", "*",
        "1", "2", "3", "-",
        "C", "0", ".", "+"
    ];

    return (
        <>
            <Header2 onLogout={handleLogout} />

            <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAFBFC] p-6 text-center">
                <div className="mb-8 ">
                    <h3 className="text-4xl font-extrabold text-[#333] tracking-wide mb-2">
                        Calculate
                    </h3>
                    <p className="text-[#6B7280] text-lg italic">
                        Người bạn tính toán đáng yêu của bạn
                        <span className="text-xl opacity-70 filter  contrast-75">
                            🧮✨
                        </span>
                    </p>
                </div>

                <div className="w-[320px] bg-[#2f3337] rounded-3xl p-5 shadow-[0_10px_25px_rgba(0,0,0,0.3)]">
                    <div className="bg-[#1aa28e] rounded-xl h-20 mb-5 flex flex-col justify-center items-end pr-4 text-black font-bold text-3xl shadow-inner">
                        {display || <span className="text-3xl">^ &#711; ^</span>}
                    </div>

                    <div className="grid grid-cols-4 gap-3">
                        {buttons.map((btn) => (
                            <button key={btn}
                                onClick={() =>
                                    btn === "C" ? handleClear() : handleButtonClick(btn)
                                }
                                className={`h-14 text-xl font-bold rounded-xl transition-all duration-150 
                                 ${
                                    btn === "C"
                                        ? "bg-[#f14e4e] text-white shadow-[0_3px_0_#a02d2d] hover:translate-y-[2px] hover:shadow-none"
                                        : "bg-[#cfd2d6] text-black shadow-[0_3px_0_#a1a5a9] hover:translate-y-[2px] hover:shadow-none"
                                }`}
                            >
                                {btn}
                            </button>
                        ))}

                        <button onClick={handleEqual} className="col-span-4 h-14 text-xl font-bold bg-[#e1a900] text-white rounded-xl shadow-[0_3px_0_#a27800] hover:translate-y-[2px] hover:shadow-none transition-all">
                            =
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-[-10%]"></div>
            <Footer1 />
        </>
    );

};

export default Calculate;
