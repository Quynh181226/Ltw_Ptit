import { Course } from '../types/type'
import arrowRight from "../assets/arrowRight.svg"
import courseImg from "../assets/courseImg.png"

interface CourseCardProps {
    course: Course
    darkMode: boolean
    onClick: () => void
}

const CourseCard = ({ course, darkMode, onClick }: CourseCardProps) => {
    return (
        <div onClick={onClick} className="p-6 bg-white border border-gray-300 rounded-2xl flex flex-col gap-2 cursor-pointer hover:border-[#6B7597] transition">
            <div className="flex justify-between items-start w-full">
                <div className="flex flex-col gap-4 flex-1">
                    <div className="flex flex-col gap-2">
                        <div className="text-[#676767] text-[14px] font-normal leading-5">Courses</div>
                        <div className="text-[#3d3d3d] text-[18px] font-bold leading-8">
                            Title: {course.title}
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="text-[#676767] text-[14px] font-normal leading-5">
                            {course.numberLessons} Bài
                        </div>
                        <div className="w-1 h-1 bg-[#6B7597] rounded-full"></div>
                        <div
                            className={`${
                                course.status
                                    ? 'bg-[#7F88A8] border-[#6B7597]'
                                    : 'bg-[#C7CCDF] border-[#A4ACC8]'
                            } rounded-full text-white px-3 py-1 text-[14px] font-normal border-2`}
                        >
                            {course.status ? 'Đã duyệt' : 'Chờ duyệt'}
                        </div>
                    </div>
                </div>

                <div className="relative w-[100px] h-[100px] bg-[#F2F3F7] rounded-[10px] border-[7px] border-[rgba(107,117,151,0.1)] overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none"></div>
                    <div className="relative w-full h-full flex flex-col items-center justify-center">
                        <img src={courseImg} alt="course" />
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4 mt-3">
                <button className="relative w-[163px] h-[50px] flex items-center justify-center gap-1.5 rounded-2xl border-2 border-[#6B7597] bg-[#7F88A8] text-white font-bold text-[16px] shadow-[0_4px_0_0_#5D6688] overflow-hidden transition hover:border-[#6B7597] hover:bg-[#6B7597]">
                <span className="cursor-pointer relative z-10 flex gap-1.5 items-center">
                    Xem chi tiết
                    <img className="w-4 h-4" src={arrowRight} alt="arrow-right" />
                </span>
                    <span className="absolute inset-0 z-0 bg-[linear-gradient(-115deg,#7F88A8_60%,#6B7597_60%,#6B7597_62%,#7F88A8_62%,#7F88A8_65%,#6B7597_65%,#6B7597_70%,#7F88A8_70%,#7F88A8_73%,#6B7597_73%,#6B7597_75%,#7F88A8_75%)]"></span>
                </button>
            </div>
        </div>
    )
}

export default CourseCard
