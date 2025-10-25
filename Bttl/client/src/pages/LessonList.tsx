import { Lesson } from "../types/type";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faSearch } from "@fortawesome/free-solid-svg-icons";

interface LessonListProps {
    lessons: Lesson[];
    searchValue: string;
    darkMode: boolean;
    onLessonClick: (lessonId: number | undefined) => void;
    checkAllSubCollection: (dataLesson: Lesson[], index: number) => [number, number, number];
}

const LessonList = ({lessons,searchValue, darkMode, onLessonClick, checkAllSubCollection}: LessonListProps) => {
    const filteredLessons = lessons.filter((lesson) =>
        lesson.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <div className="flex flex-wrap mt-6 w-full">
            <div className={`flex-grow basis-[500px] rounded-[20px] p-6 ${darkMode ? 'bg-[#302E36]' : 'bg-[#F9F9F9]'}`}>
                <div className="flex justify-end mb-6 min-w-[420px]">
                    <FontAwesomeIcon icon={faSearch} className="cursor-pointer" />
                    <FontAwesomeIcon icon={faFilter} className="cursor-pointer" />
                </div>
                <section className="content flex flex-wrap items-center justify-center gap-[10%]">
                    {filteredLessons.map((lesson, index) => {
                        const [progress, video, test] = checkAllSubCollection(lessons, index);
                        return (
                            <div
                                key={`${lesson.id || index}`}
                                onClick={() => onLessonClick(lesson.id)}
                                className="cursor-pointer mb-3 mt-5 w-[345px] h-43 bg-white rounded-lg shadow-[0_4px_8px_rgba(0,0,0,0.1)] p-4 text-left transition-all duration-300 hover:border hover:border-[#6B7597] hover:-translate-y-1 hover:shadow-[0_6px_12px_rgba(0,0,0,0.15)]"
                            >
                                <div className="text-sm text-[#646464] mb-2">Courses</div>
                                <div className="text-xl font-semibold text-[#555] mb-3">{lesson.name}</div>
                                <div className="text-sm text-[#666] mb-4">
                                    {video} Video • {lesson.time} phút • {test} bài test
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="flex-1 bg-[#d9e6f5] rounded overflow-hidden mb-2 h-[10px] w-1/2">
                                        <div
                                            className="h-full rounded-lg transition-width duration-300 border-[3.5px] border-[#6B7597] bg-[#6B7597]"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                    <div className="text-sm font-bold text-[#6B7597] ml-[5px] whitespace-nowrap mb-[5px]">
                                        {progress}% hoàn thành
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </section>
            </div>
        </div>
    );
};

export default LessonList;