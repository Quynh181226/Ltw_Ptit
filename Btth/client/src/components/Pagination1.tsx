interface PagiProps {
    currPage: number;
    totalPages: number;
    onChangePage: (page: number) => void;
    darkMode: boolean; // Thêm prop darkMode
}

const Pagination1 = ({ currPage, totalPages, onChangePage, darkMode }: PagiProps) => {
    const generatePages = (): (number | string)[] => {
        const pages: (number | string)[] = [];

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currPage <= 2) {
                for (let i = 1; i <= 3; i++) {
                    pages.push(i);
                }
                pages.push("...");
            } else if (currPage >= totalPages - 3) {
                pages.push("...");
                for (let i = totalPages - 3; i < totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(currPage - 1);
                pages.push(currPage);
                pages.push(currPage + 1);
                pages.push("...");
            }

            pages.push(totalPages);
        }

        return pages;
    };

    const pagesToShow = generatePages();

    return (
        <div className={`flex justify-center my-8 ${darkMode ? "text-gray-200" : "text-[#80A1BA]"}`}>
            {/* Nút Previous */}
            <button
                disabled={currPage === 1}
                onClick={() => onChangePage(currPage - 1)}
                className={`w-10 h-10 font-medium border cursor-pointer p-0 rounded-l-lg transition-colors ${
                    darkMode
                        ? `border-gray-600 ${currPage === 1 ? "bg-[#2A282F] text-gray-400" : "bg-[#2A282F] text-gray-200 hover:bg-[#3A3740]"}`
                        : `border-gray-300 ${currPage === 1 ? "bg-gray-100 text-gray-400" : "bg-white text-[#80A1BA] hover:bg-gray-100"}`
                } disabled:cursor-not-allowed`}
            >
                <i
                    className="fa fa-chevron-left"
                    style={{
                        color: currPage === 1 ? "rgb(156 163 175)" : darkMode ? "#F9F9F9" : "#000",
                    }}
                ></i>
            </button>

            {/* Các nút số trang */}
            <div className="flex">
                {pagesToShow.map((page, idx) =>
                    page === "..." ? (
                        <button
                            key={`btn-${idx}`}
                            disabled
                            className={`w-10 h-10 flex items-center justify-center border cursor-default ${
                                darkMode ? "bg-[#2A282F] text-gray-500 border-gray-600" : "bg-white text-gray-500 border-gray-300"
                            }`}
                        >
                            ...
                        </button>
                    ) : (
                        <button
                            key={page}
                            onClick={() => onChangePage(page as number)}
                            className={`w-10 h-10 font-medium border cursor-pointer transition-colors ${
                                currPage === page
                                    ? "bg-[#6B7597] text-white border-[#6B7597]"
                                    : darkMode
                                        ? "bg-[#2A282F] text-gray-200 border-gray-600 hover:bg-[#3A3740]"
                                        : "bg-white text-[#80A1BA] border-gray-300 hover:bg-gray-100"
                            }`}
                        >
                            {page}
                        </button>
                    )
                )}
            </div>

            {/* Nút Next */}
            <button
                disabled={currPage === totalPages}
                onClick={() => onChangePage(currPage + 1)}
                className={`w-10 h-10 font-medium border cursor-pointer p-0 rounded-r-lg transition-colors ${
                    darkMode
                        ? `border-gray-600 ${currPage === totalPages ? "bg-[#2A282F] text-gray-400" : "bg-[#2A282F] text-gray-200 hover:bg-[#3A3740]"}`
                        : `border-gray-300 ${currPage === totalPages ? "bg-gray-100 text-gray-400" : "bg-white text-[#80A1BA] hover:bg-gray-100"}`
                } disabled:cursor-not-allowed`}
            >
                <i
                    className="fa fa-chevron-right"
                    style={{
                        color: currPage === totalPages ? "rgb(156 163 175)" : darkMode ? "#F9F9F9" : "#000",
                    }}
                ></i>
            </button>
        </div>
    );
};

export default Pagination1;