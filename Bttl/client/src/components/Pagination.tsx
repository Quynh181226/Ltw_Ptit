interface PagiProps {
    currPage: number;
    totalPages: number;
    onChangePage: (page: number) => void;
    darkMode: boolean;
}

const Pagination = ({ currPage, totalPages, onChangePage, darkMode }: PagiProps) => {
    const pages: number[] = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return (
        <div className="flex justify-center my-8">
            <button
                disabled={currPage === 1}
                onClick={() => onChangePage(currPage - 1)}
                className={`w-10 h-10 font-medium border cursor-pointer p-0 rounded-l-lg transition-colors
                    ${darkMode
                    ? "border-gray-600 bg-[#2A282F] text-gray-300 hover:bg-[#3A3740] disabled:text-gray-600"
                    : "border-gray-300 bg-white hover:bg-gray-100 disabled:text-gray-400 disabled:bg-gray-100"
                } disabled:cursor-not-allowed`}
            >
                <i
                    className="fa fa-chevron-left"
                    style={{
                        color:
                            darkMode
                                ? "inherit"
                                : currPage === 1
                                    ? "rgb(156 163 175)"
                                    : "#000"
                    }}
                ></i>
            </button>

            <div className="flex">
                {pages.map((page) => (
                    <button
                        key={page}
                        onClick={() => onChangePage(page)}
                        className={`w-10 h-10 font-medium border cursor-pointer transition-colors
                            ${currPage === page
                            ? "bg-[#6B7597] text-white border-[#6B7597]"
                            : darkMode
                                ? "bg-[#2A282F] text-gray-300 border-gray-600 hover:bg-[#3A3740]"
                                : "bg-white text-[#80A1BA] border-gray-300 hover:bg-gray-100"
                        }`}
                    >
                        {page}
                    </button>
                ))}
            </div>

            <button
                disabled={currPage === totalPages}
                onClick={() => onChangePage(currPage + 1)}
                className={`w-10 h-10 font-medium border cursor-pointer p-0 rounded-r-lg transition-colors
                    ${darkMode
                    ? "border-gray-600 bg-[#2A282F] text-gray-300 hover:bg-[#3A3740] disabled:text-gray-600"
                    : "border-gray-300 bg-white hover:bg-gray-100 disabled:text-gray-400 disabled:bg-gray-100"
                } disabled:cursor-not-allowed`}
            >
                <i className="fa fa-chevron-right" style={{color: darkMode ? "inherit" : currPage === totalPages ? "rgb(156 163 175)" : "#000"}}></i>
            </button>
        </div>
    );
};

export default Pagination;