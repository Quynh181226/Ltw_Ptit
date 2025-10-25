import { type Quiz } from "../types/type";
import { Link, useNavigate } from "react-router-dom";
import Image from "../assets/Img.svg";
import imgQuizTest from "../assets/imgQuizTest.jpg";
import {CheckIcon} from "lucide-react";

const QuizItem = ({ id, title, ques, plays, categoryDisplay }: Quiz) => {
    const navigate = useNavigate();

    const handlePlay = () => {
        navigate(`/quizTest/${id}`);
    };
    return (
        <div key={id} className="w-full bg-white h-[220px] rounded-[16px] p-4 border border-[#E3E3E3] flex flex-col justify-between relative transition hover:shadow-md">
            <span className="text-[#676767] font-light">Bài Test</span>
            <h3 className="text-lg font-semibold">Quizz for test {id}</h3>

            <div className="flex items-center gap-3 mt-2">
                <div className="ml-[35%] flex items-center justify-center flex-col">
                    {/*<div className="flex items-center gap-1">*/}
                    {/*    */}
                    {/*    /!*<img src={CheckIcon} alt="check" className="w-5 h-5" />*!/*/}
                    {/*    <span className="text-sm text-[#4E5670] font-medium">Check</span>*/}
                    {/*</div>*/}
                    <p className="font-inter text-[14px] text-[#666]">{categoryDisplay}</p>

                    <p className="text-sm font-semibold text-[#333] mt-1">{title}</p>
                    <p className="text-xs text-[#8B93AF] mt-1">
                        {ques} questions • {plays} plays
                    </p>
                </div>

                {/* Ảnh bài test */}
                {/*bg-[#F3F4F7] rounded-[10px] border-[7px] border-[rgba(107,117,151,0.1)]*/}
                <div className="absolute right-4 top-4 w-[80px] h-[80px] overflow-hidden">
                    <img src={imgQuizTest} alt=""  />
                </div>
            </div>

            {/* Button */}
            <div className="flex items-center">
                <button onClick={handlePlay} className="cursor-pointer px-4 h-[50px] rounded-[16px] border border-[#6B7597] bg-white text-[#6B7597] font-bold text-[16px] shadow-[0_3px_0_0_#4E5670] hover:bg-[#ECEFF7] transition">
                    Luyện tập
                </button>
            </div>
        </div>
    );

};

export default QuizItem;

