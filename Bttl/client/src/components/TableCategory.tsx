import Pagination from "../components/Pagination";
import type { Category } from "../types/type";
import {useState} from "react";

interface TableCategoryProps {
    categories: Category[];
    setCode: (code: "Add" | "Edit") => void;
    setSelectedCategory: (category: Category | undefined) => void;
    setOpenAddEdit: (open: boolean) => void;
    setOpenDelete: (open: boolean) => void;
    darkMode: boolean;
}

const TableCategory = ({
                           categories,
                           setCode,
                           setSelectedCategory,
                           setOpenAddEdit,
                           setOpenDelete,
                           darkMode
                       }: TableCategoryProps) => {
    const [currPage, setCurrPage] = useState(1);
    const perPage=5;

    const totalPages=Math.ceil(categories.length / perPage);
    const start=(currPage-1)*perPage;
    const end=start+perPage;
    const pagi=categories.slice(start,end);


    const handleEdit = (cate: Category) => {
        setSelectedCategory(cate);
        setCode("Edit");
        setOpenAddEdit(true);
    };

    const handleDelete = (cate: Category) => {
        setSelectedCategory(cate);
        setOpenDelete(true);
    };

    return (
        <>
            <div className={`overflow-hidden rounded-lg border ${darkMode ? "border-gray-600" : "border-gray-300"}`}>
                <table className="w-full border-collapse">
                    <thead>
                    <tr className={`${darkMode ? "bg-[#2D2B33] text-gray-200" : "bg-[#8B93AF] text-white"}`}>
                        <th className={`px-4 py-2 border ${darkMode ? "border-gray-600" : "border-gray-300"}`}>ID</th>
                        <th className={`px-4 py-2 border ${darkMode ? "border-gray-600" : "border-gray-300"}`}>Category name</th>
                        <th className={`px-4 py-2 border ${darkMode ? "border-gray-600" : "border-gray-300"} text-center`}>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {pagi.map((item, index) => (
                        <tr
                            key={item.id}
                            className={`${index % 2 === 0
                                ? (darkMode ? "bg-[#2A282F]" : "bg-gray-50")
                                : (darkMode ? "bg-[#242228]" : "bg-white")
                            } hover:${darkMode ? "bg-[#3A3740]" : "bg-blue-50"} transition`}
                        >
                            <td className={`px-4 py-2 border ${darkMode ? "border-gray-600 text-gray-300" : "border-gray-300 text-center"}`}>
                                {item.id}
                            </td>
                            <td className={`px-4 py-2 border ${darkMode ? "border-gray-600 text-gray-200" : "border-gray-300"} flex gap-2 flex-row items-center`}>
                                <img
                                    src={item.image}
                                    alt=""
                                    className="rounded-full w-10 h-10 hover:scale-110 transition-transform duration-200"
                                />
                                <span className={`font-roboto text-[16.934px] leading-[24px] ${darkMode ? "text-gray-200" : "text-[#212529]"}`}>
                                {item.name}
                            </span>
                            </td>
                            <td className={`px-4 py-2 text-center border ${darkMode ? "border-gray-600" : "border-gray-300"}`}>
                                <button
                                    onClick={() => handleEdit(item)}
                                    className={`px-4 py-1.5 rounded-3xl ${darkMode
                                        ? "bg-[#565D7C] text-gray-200 hover:bg-[#6B7597]"
                                        : "bg-[#6B7597] text-black hover:bg-[#565D7C]"
                                    } mr-2 cursor-pointer duration-300`}
                                >
                                    <i className='bx bxs-pencil'></i>
                                </button>
                                <button
                                    onClick={() => handleDelete(item)}
                                    className="px-4 py-1.5 rounded-3xl bg-red-700 duration-300 text-white hover:bg-red-800 cursor-pointer"
                                >
                                    <i className='bx bxs-trash'></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
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

export default TableCategory;