import { Button } from "antd";
import { type Quiz } from "../types/type";
import { useNavigate } from "react-router-dom";
import Image from "../assets/Img.svg"

const QuizItem = ({ id, title, ques, plays, categoryDisplay }: Quiz) => {
    const navigate = useNavigate();

    const handlePlay = () => {
        navigate(`/quizTest/${id}`);
    };

    return (
        <div key={id} className="border border-black/20 rounded-lg flex flex-row items-center h-40 transition-transform hover:-translate-y-1 hover:shadow-lg">
            <img src={Image} alt={title} className="w-28 h-28 ml-3 object-cover rounded" />
            <div className="flex-1 p-4 flex flex-col justify-center">
                <p className="text-center font-inter text-[14px]">{categoryDisplay}</p>
                <strong className="text-center text-[16px] font-medium">{title}</strong>
                <p className="text-center font-inter text-[13.5px]">
                    {ques} questions - {plays} plays
                </p>
            </div>
            {/*<div className="pr-4 pt-20">*/}
            {/*    <Button type="primary" onClick={handlePlay} className="!bg-[#F5D2D2] border border-[#E57373] !text-[#C74B4B] hover:!bg-yellow-500">*/}
            {/*        Play*/}
            {/*    </Button>*/}
            {/*</div>*/}
            <div className="pr-4 pt-20">
                <Button
                    type="primary"
                    onClick={handlePlay}
                    className="!bg-[#F5D2D2] !border-[#E57373] !text-[#C74B4B] hover:!bg-[#E57373] hover:!text-white hover:!border-[#E57373] transition-colors duration-200"
                >
                    Play
                </Button>
            </div>

        </div>
    );
};

export default QuizItem;