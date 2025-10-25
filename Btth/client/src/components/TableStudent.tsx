import React, { useState } from "react";
import Pagination from "../components/Pagination";
import type { User } from "../types/type";
import Avatar from "../assets/Avatar.svg";

interface TableStudentProps {
    users: User[];
    setCode: (code: "Add" | "Edit") => void;
    setSelectedUser: (user: User | undefined) => void;
    setOpenAddEdit: (open: boolean) => void;
    setOpenDelete: (open: boolean) => void;
    setOpenStatus: (open: boolean) => void;
    darkMode: boolean;
}

const TableStudent = ({ users, setCode, setSelectedUser, setOpenAddEdit, setOpenDelete, setOpenStatus, darkMode }: TableStudentProps) => {
    const [currPage, setCurrPage] = useState(1);
    const perPage = 5;

    const totalPages = Math.ceil(users.length / perPage);
    const start = (currPage - 1) * perPage;
    const pagi = users.slice(start, start + perPage);

    const handleEdit = (user: User) => {
        setSelectedUser(user);
        setCode("Edit");
        setOpenAddEdit(true);
    };

    const handleDelete = (user: User) => {
        setSelectedUser(user);
        setOpenDelete(true);
    };

    const handleStatus = (user: User) => {
        setSelectedUser(user);
        setOpenStatus(true);
    };

    // derive order: locked -> suspended -> active -> waiting -> inactive
    const getStatusText = (user: User) => {
        if (user.lockUntil && user.lockUntil > Date.now()) return "Locked";
        if (user.suspended) return "Suspended";
        if (user.active) return "Active";
        if (user.waiting) return "Waiting";
        return "Inactive";
    };

    const getStatusClass = (user: User) => {
        // Locked
        if (user.lockUntil && user.lockUntil > Date.now()) {
            return `w-[80%] text-center px-2 py-[2px] rounded-2xl border-2 cursor-pointer font-bold
        bg-[#eceff1] border-[#90a4ae] text-[#607d8b] hover:bg-[#607d8b] hover:text-white transition duration-200`;
        }
        // Suspended
        if (user.suspended) {
            return `w-[80%] text-center px-2 py-[2px] rounded-2xl border-2 cursor-pointer font-bold
        bg-[#fbeaea] border-[#e57373] text-[#d04444] hover:bg-[#d04444] hover:text-white transition duration-200`;
        }
        // Active
        if (user.active) {
            return `w-[80%] text-center px-2 py-[2px] rounded-2xl border-2 cursor-pointer
        bg-[#e9f6ec] border-[#90a56a] text-[#90a56a] hover:bg-[#6f8a47] hover:text-white transition duration-200`;
        }
        // Waiting (not active and missing profile)
        if (user.waiting) {
            return `w-[80%] text-center px-2 py-[2px] rounded-2xl border-2 cursor-pointer uppercase
        bg-[#fcf6e8] border-[#e6b84f] text-[#eab541] hover:bg-[#d5c296] hover:text-white transition duration-200`;
        }
        // Inactive (derived)
        return `w-[80%] text-center px-2 py-[2px] rounded-2xl border-2 cursor-pointer
      bg-[#f1f5f9] border-[#d1d5db] text-[#6b7280] hover:bg-[#e2e8f0] transition duration-200`;
    };

    return (
        <>
            <div className={`overflow-hidden rounded-lg border ${darkMode ? "border-gray-600" : "border-gray-300"}`}>
                <table className="w-full border-collapse">
                    <thead>
                    <tr className={`${darkMode ? "bg-[#2D2B33] text-gray-200" : "bg-[#8B93AF] text-white"}`}>
                        <th className={`px-4 py-2 border ${darkMode ? "border-gray-600" : "border-gray-300"}`}>ID</th>
                        <th className={`px-4 py-2 border ${darkMode ? "border-gray-600" : "border-gray-300"}`}>Name</th>
                        <th className={`px-4 py-2 border ${darkMode ? "border-gray-600" : "border-gray-300"} text-center`}>Status</th>
                        <th className={`px-4 py-2 border ${darkMode ? "border-gray-600" : "border-gray-300"} text-center`}>Birth</th>
                        <th className={`px-4 py-2 border ${darkMode ? "border-gray-600" : "border-gray-300"} text-center`}>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {pagi.map((user, index) => (
                        <tr key={user.id} className={`${index % 2 === 0 ? (darkMode ? "bg-[#2A282F]" : "bg-gray-50") : (darkMode ? "bg-[#242228]" : "bg-white")} hover:${darkMode ? "bg-[#3A3740]" : "bg-blue-50"} transition`}>
                            <td className={`px-4 py-2 border ${darkMode ? "border-gray-600 text-gray-300" : "border-gray-300 text-center"}`}>{user.id}</td>

                            <td className={`px-4 py-2 border ${darkMode ? "border-gray-600 text-gray-200" : "border-gray-300"}`}>
                                <div className="flex gap-2 items-center">
                                    <img src={user.avatar || Avatar} alt={user.fullName} className="w-10 h-10 object-cover rounded-full hover:scale-110 transition-transform duration-200" />
                                    <span className={`font-roboto text-[16.934px] leading-[24px] ${darkMode ? "text-gray-200" : "text-[#212529]"}`}>{user.fullName}</span>
                                </div>
                            </td>

                            <td className={`px-4 py-2 border ${darkMode ? "border-gray-600" : "border-gray-300"} text-center`}>
                                <div onClick={() => handleStatus(user)} className={`${getStatusClass(user)} inline-block text-sm font-medium`}>
                                    {getStatusText(user)}
                                </div>
                            </td>

                            <td className={`px-4 py-2 border ${darkMode ? "border-gray-600 text-gray-300" : "border-gray-300 text-center"}`}>{user.birthDate || "Not specified"}</td>

                            <td className={`px-4 py-2 text-center border ${darkMode ? "border-gray-600" : "border-gray-300"}`}>
                                <button onClick={() => handleEdit(user)} className={`px-4 py-1.5 rounded-3xl ${darkMode ? "bg-[#565D7C] text-gray-200 hover:bg-[#6B7597]" : "bg-[#6B7597] text-black hover:bg-[#565D7C]"} mr-2 cursor-pointer duration-300`}>
                                    <i className="bx bxs-pencil"></i>
                                </button>
                                <button onClick={() => handleDelete(user)} className="px-4 py-1.5 rounded-3xl bg-red-700 duration-300 text-white hover:bg-red-800 cursor-pointer">
                                    <i className="bx bxs-trash"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && <Pagination currPage={currPage} totalPages={totalPages} darkMode={darkMode} onChangePage={(p) => setCurrPage(p)} />}
        </>
    );
};

export default TableStudent;
