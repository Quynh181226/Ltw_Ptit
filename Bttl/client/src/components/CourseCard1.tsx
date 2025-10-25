import buttonIcon from "../assets/buttonIcon.svg";
import jpN1 from "../assets/jpN1.jpg";
import jpN2 from "../assets/jpN2.jpg";
import jpN3 from "../assets/jpN3.jpg";
import jpN4 from "../assets/jpN4.jpg";
import jpN5 from "../assets/jpN5.jpg";

interface Course {
    id: string;
    title: string;
    lessons?: any[];
    status?: boolean;
}

interface CourseCardProps {
    course: Course;
    onClick: () => void;
}

const nImages: Record<string, string> = {
    "1": jpN1,
    "2": jpN2,
    "3": jpN3,
    "4": jpN4,
    "5": jpN5,
};

const CourseCard1 = ({ course, onClick }: CourseCardProps) => {
    const lessonCount = Array.isArray(course.lessons)
        ? `${course.lessons.length} Bài`
        : "1 Bài";

    const match = course.title.match(/N([1-5])/);
    const n = match ? match[1] : "1";
    const imageSrc = nImages[n];

    return (
        <div className="cursor-pointer" onClick={onClick}>
            <div className="bg-white rounded-[16px] border border-[#DDDDDD] hover:border-[#6B7597] p-5 flex flex-col justify-between shadow-[0_4px_10px_rgba(0,0,0,0.04)] transition hover:shadow-[0_6px_16px_rgba(0,0,0,0.08)] duration-300 ease-in-out">

                <img src={imageSrc} alt={course.title} className="w-[100%] h-30  image-rendering-auto" />

                <div className="flex flex-col gap-3 mt-3">
                    <div className="flex flex-col gap-1">
                        <span className="text-[#676767] text-sm font-normal leading-5">Khóa học</span>
                        <h3 className="text-xl font-semibold text-[#1C1C1C] leading-6">{course.title}</h3>
                    </div>
                    <span className="text-[#6B7597] text-sm font-medium leading-5">{lessonCount}</span>
                </div>

                <div className="flex justify-end">
                    <button
                        className="cursor-pointer relative flex items-center gap-2 px-5 py-2 rounded-[16px] text-white border-2 border-[#5D678A] shadow-[0_3px_0_0_#4A5068] bg-[#7E86A2] overflow-hidden transition-all duration-300 ease-in-out hover:brightness-105 hover:shadow-[0_5px_0_0_#4A5068] active:translate-y-[2px] active:shadow-[0_2px_0_0_#4A5068] before:content-[''] before:absolute before:inset-0  before:bg-[linear-gradient(-146deg,_#7E86A2_57%,_#9AA1BA_60%,_#9AA1BA_62%,_#7E86A2_62%,_#7E86A2_65%,_#9AA1BA_65%,_#9AA1BA_70%,_#7E86A2_70%,_#7E86A2_73%,_#9AA1BA_73%,_#9AA1BA_75%,_#7E86A2_75%)] before:pointer-events-none before:z-0">
                        <span className="relative z-[1] flex items-center gap-2">
                            <img src={buttonIcon} alt="icon" className="w-4 h-7" />
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CourseCard1;
