import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../stores/Store";
import type { TestDetail } from "../types/type";
import { getAllTests } from "../apis/TestApi";
import { useNavigate } from "react-router-dom";
import ModalDeleteTest from "./ModalDeleteTest";
import { getAllCategories } from "../apis/CateApi.ts";
import Pagination from "../components/Pagination";
import LoadingProcess from "./LoadingProcess.tsx";
import NotFound1 from "../assets/NotFound1.jpg";

interface TableTestProps {
    search: string;
    sort: string;
    darkMode: boolean; // ← THÊM PROP
}

const TableTest = ({ search, sort, darkMode }: TableTestProps) => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { list, status, error } = useSelector((state: RootState) => state.tests);
    const categories = useSelector((state: RootState) => state.categories.categories);

    const [deleteOpen, setDeleteOpen] = useState(false);
    const [selectedTest, setSelectedTest] = useState<TestDetail | undefined>(undefined);

    const [currPage, setCurrPage] = useState(1);
    const perPage = 5;

    useEffect(() => {
        dispatch(getAllTests());
        dispatch(getAllCategories());
    }, [dispatch]);

    const handleDeleteClick = (quiz: TestDetail) => {
        setSelectedTest(quiz);
        setDeleteOpen(true);
    };

    let filtered = list.filter((t: TestDetail) =>
        t.title.toLowerCase().includes(search.toLowerCase())
    );

    if (sort === "title") {
        filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === "duration") {
        filtered = [...filtered].sort((a, b) => a.duration - b.duration);
    }

    const totalPages = Math.ceil(filtered.length / perPage);
    const start = (currPage - 1) * perPage;
    const end = start + perPage;
    const pagi = filtered.slice(start, end);

    if (status === "pending") return <LoadingProcess />;
    if (status === "failed") return <p className="text-red-600">{error}</p>;

    return (
        <>
            <div className={`overflow-hidden rounded-lg border ${darkMode ? "border-gray-600" : "border-gray-300"}`}>
                <table className="w-full border-collapse">
                    <thead>
                    <tr className={`${darkMode ? "bg-[#2D2B33] text-gray-200" : "bg-[#8B93AF] text-white"}`}>
                        <th className={`px-4 py-2 border ${darkMode ? "border-gray-600" : "border-gray-300"}`}>ID</th>
                        <th className={`px-4 py-2 border ${darkMode ? "border-gray-600" : "border-gray-300"}`}>Test name</th>
                        <th className={`px-4 py-2 border ${darkMode ? "border-gray-600" : "border-gray-300"}`}>Category</th>
                        <th className={`px-4 py-2 border ${darkMode ? "border-gray-600" : "border-gray-300"}`}>Number questions</th>
                        <th className={`px-4 py-2 border ${darkMode ? "border-gray-600" : "border-gray-300"}`}>Time</th>
                        <th className={`px-4 py-2 border ${darkMode ? "border-gray-600" : "border-gray-300"} text-center`}>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {pagi.length > 0 ? (
                        pagi.map((quiz: TestDetail, index: number) => {
                            const category = categories.find(c => c.id === quiz.categoryId);
                            return (
                                <tr
                                    key={quiz.id}
                                    className={`${index % 2 === 0
                                        ? (darkMode ? "bg-[#2A282F]" : "bg-gray-50")
                                        : (darkMode ? "bg-[#242228]" : "bg-white")
                                    } hover:${darkMode ? "bg-[#3A3740]" : "bg-blue-50"} transition`}
                                >
                                    <td className={`px-4 py-2 border ${darkMode ? "border-gray-600 text-gray-300" : "border-gray-300 text-center"}`}>
                                        {quiz.id}
                                    </td>
                                    <td className={`px-4 py-2 border ${darkMode ? "border-gray-600 text-gray-200" : "border-gray-300"}`}>
                                        {quiz.title}
                                    </td>
                                    <td className={`px-4 py-2 border ${darkMode ? "border-gray-600 text-gray-200" : "border-gray-300"}`}>
                                        {category ? (
                                            <div className="flex items-center">
                                                <img
                                                    src={category.image}
                                                    alt={category.name}
                                                    className="w-7 h-6 mr-2 rounded-full object-cover"
                                                />
                                                <span className={darkMode ? "text-gray-200" : ""}>{category.name}</span>
                                            </div>
                                        ) : (
                                            <div className="px-4 py-2">Cate empty</div>
                                        )}
                                    </td>
                                    <td className={`px-4 py-2 border ${darkMode ? "border-gray-600 text-gray-300" : "border-gray-300 text-center"}`}>
                                        {quiz.quesCnt}
                                    </td>
                                    <td className={`px-4 py-2 border ${darkMode ? "border-gray-600 text-gray-300" : "border-gray-300 text-center"}`}>
                                        {quiz.duration} min
                                    </td>
                                    <td className={`px-4 py-2 text-center border ${darkMode ? "border-gray-600" : "border-gray-300"}`}>
                                        <div className="flex justify-center gap-2">
                                            <button
                                                onClick={() => navigate(`/createTest/${quiz.id}`)}
                                                className={`px-4 py-1.5 rounded-3xl ${darkMode
                                                    ? "bg-[#565D7C] text-gray-200 hover:bg-[#6B7597]"
                                                    : "bg-[#6B7597] text-black hover:bg-[#565D7C]"
                                                } duration-300 cursor-pointer`}
                                            >
                                                <i className='bx bxs-pencil'></i>
                                            </button>
                                            <button
                                                onClick={() => handleDeleteClick(quiz)}
                                                className="px-4 py-1.5 rounded-3xl bg-red-700 duration-300 text-white hover:bg-red-800 cursor-pointer"
                                            >
                                                <i className='bx bxs-trash'></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan={6}>
                                <div className="flex flex-col items-center justify-center text-center mt-6 mb-4">
                                    <img
                                        src={NotFound1}
                                        alt="No quizzes"
                                        className="w-40 h-28 mb-3 opacity-90"
                                    />
                                    <p className={darkMode ? "text-gray-400" : "text-gray-500"}>No quizzes found</p>
                                </div>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            <ModalDeleteTest
                open={deleteOpen}
                onClose={() => setDeleteOpen(false)}
                test={selectedTest}
            />

            {totalPages > 1 && (
                <Pagination
                    currPage={currPage}
                    totalPages={totalPages}
                    darkMode={darkMode}
                    onChangePage={(p) => setCurrPage(p)}
                />
            )}
        </>
    );
};

export default TableTest;