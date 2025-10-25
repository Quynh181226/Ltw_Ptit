// import { useEffect, useState } from "react";
// import { useAppDispatch, useAppSelector } from "../hooks/Hook";
// import { getAllQues } from "../apis/QuesApi";
// import type { Question } from "../types/type";
// import ModalAddEditQues from "./ModalAddEditQues";
// import ModalDeleteQues from "./ModalDeleteQues";
// // import { Button } from "antd";
// import Pagination1 from "./Pagination1.tsx";
// import LoadingProcess from "./LoadingProcess.tsx";
//
// interface TableQuesProps {
//     testId: number;
//     onEdit?: (ques: Question) => void;
//     onDelete?: (quesId: number) => void;
//     questions?: Question[];
//     darkMode: boolean;
// }
//
// const TableQues = ({ testId, onEdit, onDelete, darkMode, questions: questionsFromProp }: TableQuesProps) => {
//     const dispatch = useAppDispatch();
//     const { list, status, error } = useAppSelector(state => state.ques);
//
//     const quesList = questionsFromProp || list;
//     const quesStatus = questionsFromProp ? "success" : status;
//     const quesError = questionsFromProp ? null : error;
//
//     const [modalAddEditOpen, setModalAddEditOpen] = useState(false);
//     const [editQues, setEditQues] = useState<Question | null>(null);
//
//     const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
//     const [selectedQues, setSelectedQues] = useState<Question | null>(null);
//
//     const [currPage, setCurrPage] = useState(1);
//     const perPage=2;
//
//     useEffect(() => {
//         if (!questionsFromProp && testId !== 0) {
//             dispatch(getAllQues(testId));
//         }
//     }, [dispatch, testId, questionsFromProp]);
//
//     const totalPages=Math.ceil(quesList.length / perPage);
//     const start=(currPage-1)*perPage;
//     const end=start+perPage;
//     const pagi=quesList.slice(start,end);
//
//     const handleEdit = (ques: Question) => {
//         setEditQues(ques);
//         setModalAddEditOpen(true);
//         if (onEdit) onEdit(ques);
//     };
//
//     const handleDeleteClick = (ques: Question) => {
//         setSelectedQues(ques);
//         setModalDeleteOpen(true);
//     };
//
//     const handleSaveQues = () => {
//         if (!questionsFromProp && testId !== 0) {
//             dispatch(getAllQues(testId));
//         }
//         setModalAddEditOpen(false);
//     };
//
//     const handleDeletedQues = () => {
//         if (!questionsFromProp && testId !== 0) {
//             dispatch(getAllQues(testId));
//         }
//         setModalDeleteOpen(false);
//     };
//
//     if (status === "pending") return <LoadingProcess/>;
//
//
//
//
//
//
//
//
//     if (quesStatus === "failed") return <p className="text-red-600">{quesError}</p>;
//
//     return (
//         <>
//             <div className={`overflow-hidden rounded-lg border ${darkMode ? "border-gray-600" : "border-gray-300"} mt-6`}>
//                 <table className="w-full border-collapse">
//                     <thead>
//                     <tr className={`${darkMode ? "bg-[#2D2B33] text-gray-200" : "bg-[#8B93AF] text-white"}`}>
//                         <th className={`px-4 py-2 border ${darkMode ? "border-gray-600" : "border-gray-300"}`}>ID</th>
//                         <th className={`px-4 py-2 border ${darkMode ? "border-gray-600" : "border-gray-300"}`}>Câu hỏi</th>
//                         <th className={`px-4 py-2 border ${darkMode ? "border-gray-600" : "border-gray-300"} text-center`}>Hành động</th>
//                     </tr>
//                     </thead>
//                     <tbody>
//                     {pagi.map((q, index) => (
//                         <tr
//                             key={q.id}
//                             className={`${index % 2 === 0
//                                 ? (darkMode ? "bg-[#2A282F]" : "bg-gray-50")
//                                 : (darkMode ? "bg-[#242228]" : "bg-white")
//                             } hover:${darkMode ? "bg-[#3A3740]" : "bg-blue-50"} transition`}
//                         >
//                             <td className={`px-4 py-2 border ${darkMode ? "border-gray-600 text-gray-300 text-center" : "border-gray-300 text-center"}`}>
//                                 {q.id}
//                             </td>
//                             <td className={`px-4 py-2 border ${darkMode ? "border-gray-600 text-gray-200" : "border-gray-300"}`}>
//                                 {q.question}
//                             </td>
//                             <td className={`px-4 py-2 text-center border ${darkMode ? "border-gray-600" : "border-gray-300"}`}>
//                                 <div className="flex justify-center gap-2">
//                                     <button
//                                         onClick={() => handleEdit(q)}
//                                         className={`px-4 py-1.5 rounded-3xl ${darkMode
//                                             ? "bg-[#565D7C] text-gray-200 hover:bg-[#6B7597]"
//                                             : "bg-[#6B7597] text-black hover:bg-[#565D7C]"
//                                         } duration-300 cursor-pointer`}
//                                     >
//                                         <i className='bx bxs-pencil'></i>
//                                     </button>
//                                     <button
//                                         onClick={() => handleDeleteClick(q)}
//                                         className="px-4 py-1.5 rounded-3xl bg-red-700 duration-300 text-white hover:bg-red-800 cursor-pointer"
//                                     >
//                                         <i className='bx bxs-trash'></i>
//                                     </button>
//                                 </div>
//                             </td>
//                         </tr>
//                     ))}
//
//                     {quesList.length === 0 && (
//                         <tr>
//                             <td colSpan={3} className={`text-center px-4 py-3 border ${darkMode ? "border-gray-600 text-gray-400" : "border-gray-300 text-gray-500"}`}>
//                                 No questions yet
//                             </td>
//                         </tr>
//                     )}
//                     </tbody>
//                 </table>
//             </div>
//
//             {modalAddEditOpen && (
//                 <ModalAddEditQues
//                     open={modalAddEditOpen}
//                     onClose={() => setModalAddEditOpen(false)}
//                     testData={{
//                         id: testId,
//                         quesDetail: quesList,
//                         quesCnt: quesList.length,
//                         title: "",
//                         categoryId: 0,
//                         duration: 0,
//                         plays: 0,
//                     }}
//                     editData={editQues}
//                     onSave={handleSaveQues}
//                 />
//             )}
//
//             {modalDeleteOpen && (
//                 <ModalDeleteQues
//                     open={modalDeleteOpen}
//                     onClose={() => setModalDeleteOpen(false)}
//                     ques={selectedQues}
//                     testId={testId}
//                     onDeleted={handleDeletedQues}
//                     customHandleDelete={onDelete}
//                 />
//             )}
//
//             {totalPages > 1 && (
//                 <Pagination1
//                     currPage={currPage}
//                     totalPages={totalPages}
//                     onChangePage={(p) => setCurrPage(p)}
//                     darkMode={darkMode}
//                 />
//             )}
//         </>
//     );
// };
//
// export default TableQues;

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/Hook";
import { getAllQues } from "../apis/QuesApi";
import type { Question } from "../types/type";
import ModalAddEditQues from "./ModalAddEditQues";
import ModalDeleteQues from "./ModalDeleteQues";
import Pagination1 from "./Pagination1.tsx";
import LoadingProcess from "./LoadingProcess.tsx";

interface TableQuesProps {
    testId: number;
    onEdit?: (ques: Question) => void;
    onDelete?: (quesId: number) => void;
    questions?: Question[];
    darkMode: boolean;
}

const TableQues = ({ testId, onEdit, onDelete, darkMode, questions: questionsFromProp }: TableQuesProps) => {
    const dispatch = useAppDispatch();
    const { list, status, error } = useAppSelector(state => state.ques);

    const quesList = questionsFromProp || list || []; // Đảm bảo luôn là mảng
    const quesStatus = questionsFromProp ? "success" : status;
    const quesError = questionsFromProp ? null : error;

    const [modalAddEditOpen, setModalAddEditOpen] = useState(false);
    const [editQues, setEditQues] = useState<Question | null>(null);
    const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
    const [selectedQues, setSelectedQues] = useState<Question | null>(null);
    const [currPage, setCurrPage] = useState(1);
    const perPage = 2;

    useEffect(() => {
        if (!questionsFromProp && testId !== 0) {
            dispatch(getAllQues(testId));
        }
    }, [dispatch, testId, questionsFromProp]);

    const totalPages = Math.ceil(quesList.length / perPage);
    const start = (currPage - 1) * perPage;
    const end = start + perPage;
    const pagi = quesList.slice(start, end);

    const handleEdit = (ques: Question) => {
        setEditQues(ques);
        setModalAddEditOpen(true);
        if (onEdit) onEdit(ques);
    };

    const handleDeleteClick = (ques: Question) => {
        setSelectedQues(ques);
        setModalDeleteOpen(true);
    };

    const handleSaveQues = () => {
        if (!questionsFromProp && testId !== 0) {
            dispatch(getAllQues(testId));
        }
        setModalAddEditOpen(false);
    };

    const handleDeletedQues = () => {
        if (!questionsFromProp && testId !== 0) {
            dispatch(getAllQues(testId));
        }
        setModalDeleteOpen(false);
    };

    if (quesStatus === "pending") return <LoadingProcess />;

    if (quesStatus === "failed") return <p className="text-red-600">{quesError}</p>;

    return (
        <>
            <div className={`overflow-hidden rounded-lg border ${darkMode ? "border-gray-600" : "border-gray-300"} mt-6`}>
                <table className="w-full border-collapse">
                    <thead>
                    <tr className={`${darkMode ? "bg-[#2D2B33] text-gray-200" : "bg-[#8B93AF] text-white"}`}>
                        <th className={`px-4 py-2 border ${darkMode ? "border-gray-600" : "border-gray-300"}`}>ID</th>
                        <th className={`px-4 py-2 border ${darkMode ? "border-gray-600" : "border-gray-300"}`}>Câu hỏi</th>
                        <th className={`px-4 py-2 border ${darkMode ? "border-gray-600" : "border-gray-300"} text-center`}>Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                    {pagi.length > 0 ? (
                        pagi.map((q, index) => (
                            <tr
                                key={q.id}
                                className={`${index % 2 === 0 ? (darkMode ? "bg-[#2A282F]" : "bg-gray-50") : (darkMode ? "bg-[#242228]" : "bg-white")} hover:${darkMode ? "bg-[#3A3740]" : "bg-blue-50"} transition`}
                            >
                                <td className={`px-4 py-2 border ${darkMode ? "border-gray-600 text-gray-300 text-center" : "border-gray-300 text-center"}`}>
                                    {q.id}
                                </td>
                                <td className={`px-4 py-2 border ${darkMode ? "border-gray-600 text-gray-200" : "border-gray-300"}`}>
                                    {q.question}
                                </td>
                                <td className={`px-4 py-2 text-center border ${darkMode ? "border-gray-600" : "border-gray-300"}`}>
                                    <div className="flex justify-center gap-2">
                                        <button
                                            onClick={() => handleEdit(q)}
                                            className={`px-4 py-1.5 rounded-3xl ${darkMode ? "bg-[#565D7C] text-gray-200 hover:bg-[#6B7597]" : "bg-[#6B7597] text-black hover:bg-[#565D7C]"} duration-300 cursor-pointer`}
                                        >
                                            <i className='bx bxs-pencil'></i>
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(q)}
                                            className="px-4 py-1.5 rounded-3xl bg-red-700 duration-300 text-white hover:bg-red-800 cursor-pointer"
                                        >
                                            <i className='bx bxs-trash'></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3} className={`text-center px-4 py-3 border ${darkMode ? "border-gray-600 text-gray-400" : "border-gray-300 text-gray-500"}`}>
                                No questions yet
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
            {modalAddEditOpen && (
                <ModalAddEditQues
                    open={modalAddEditOpen}
                    onClose={() => setModalAddEditOpen(false)}
                    testData={{
                        id: testId,
                        quesDetail: quesList,
                        quesCnt: quesList.length,
                        title: "",
                        categoryId: 0,
                        duration: 0,
                        plays: 0,
                    }}
                    editData={editQues}
                    onSave={handleSaveQues}
                />
            )}
            {modalDeleteOpen && (
                <ModalDeleteQues
                    open={modalDeleteOpen}
                    onClose={() => setModalDeleteOpen(false)}
                    ques={selectedQues}
                    testId={testId}
                    onDeleted={handleDeletedQues}
                    customHandleDelete={onDelete}
                />
            )}
            {totalPages > 1 && (
                <Pagination1
                    currPage={currPage}
                    totalPages={totalPages}
                    onChangePage={(p) => setCurrPage(p)}
                    darkMode={darkMode}
                />
            )}
        </>
    );
};

export default TableQues;