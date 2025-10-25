import { useState } from 'react'

interface ModalAddCourseProps {
    open: boolean
    onClose: () => void
    onSubmit: (title: string) => void
}

const ModalAddCourse = ({ open, onClose, onSubmit }: ModalAddCourseProps) => {
    const [title, setTitle] = useState('')

    if (!open) return null

    return (
        <div className="fixed inset-0 bg-black/50 z-[10000] flex items-start justify-center pt-5">
            <div className="relative bg-white rounded-lg shadow-lg w-[500px] max-h-[90vh] overflow-y-auto animate-[fadeIn_0.3s_ease] z-[10001]">
                <div className="flex justify-between items-center px-5 py-3 border-b border-gray-200">
                    <h2 className="text-[18px] text-gray-800 font-semibold">Thêm khóa học mới</h2>
                    <button onClick={onClose} className="p-1 cursor-pointer text-gray-500 hover:text-gray-800 transition-colors">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                </div>

                <div className="p-5">
                    <div className="mb-4">
                        <label htmlFor="courseTitle" className="block mb-4 text-[14px] font-medium text-gray-800">
                            Tên khóa học <span className="text-red-600">*</span>
                        </label>
                        <input type="text" id="courseTitle" placeholder="Nhập tên khóa học..." value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-[14px] focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"/>
                    </div>
                </div>

                <div className="flex justify-end gap-3 px-5 py-3 border-t border-gray-200">
                    <button onClick={onClose} className="px-4 py-2 text-[14px] cursor-pointer font-medium rounded-md border border-gray-300 bg-gray-100 text-gray-800 hover:bg-gray-200 transition">
                        Hủy bỏ
                    </button>
                    <button
                        onClick={() => {
                            if (title.trim()) {
                                onSubmit(title)
                                setTitle('')
                            }
                        }}
                        className="px-4 py-2 text-[14px] cursor-pointer font-medium rounded-md bg-[#6B7597] text-white hover:bg-[#7F88A8] transition"
                    >
                        Thêm mới
                    </button>
                </div>
            </div>

            <style>
                {`
                    @keyframes fadeIn {
                      from { opacity: 0; transform: translateY(-20px); }
                      to { opacity: 1; transform: translateY(0); }
                    }
                `}
            </style>
        </div>
    )
}

export default ModalAddCourse
