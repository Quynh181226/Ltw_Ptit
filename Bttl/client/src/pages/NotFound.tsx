import { useNavigate } from "react-router-dom";

export const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[lightsteelblue] text-center px-4">
            <h1 className="text-[8rem] font-[Berkshire_Swash] text-white mb-2 leading-none drop-shadow-md">
                404
            </h1>
            <h2 className="text-2xl text-gray-100 font-semibold mb-6">
                Trang bạn tìm kiếm không tồn tại
            </h2>
            <p className="text-gray-200 max-w-lg mb-8">
                Có thể liên kết bị sai, trang đã bị xóa hoặc bạn nhập sai địa chỉ.
                Hãy quay lại trang chủ để tiếp tục khám phá nội dung.
            </p>

            <button
                onClick={() => navigate("/homePage")}
                className="cursor-pointer px-6 py-3 bg-[#9fb6ce] text-white font-semibold rounded-lg shadow-md hover:bg-gray-300 transition"
            >
                Quay lại trang chủ
            </button>

            <div className="mt-30 text-gray-500 ztext-sm font-mono">
                &copy; UniLife Hub.Com - Bản quyền thuộc Công ty TNHH Công Nghệ UniLife Hub
            </div>
        </div>
    );
};
