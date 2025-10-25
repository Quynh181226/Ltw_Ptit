interface PagiProps {
    currPage: number;
    totalPages: number;
    onChangePage: (page: number) => void;
}

const Pagination2 = ({ currPage, totalPages, onChangePage }: PagiProps) => {
    const pages: number[] = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return (
        <div className="flex justify-center my-8">
            {/* Nút Previous */}
            <button
                disabled={currPage === 1}
                onClick={() => onChangePage(currPage - 1)}
                className={`w-10 h-10 font-medium border border-gray-300 bg-white cursor-pointer p-0 rounded-l-lg transition-colors 
                hover:bg-gray-100 disabled:text-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed`}
            >
                <i
                    className="fa fa-chevron-left"
                    style={{
                        color: currPage === 1 ? "rgb(156 163 175)" : "#000",
                    }}
                ></i>
            </button>

            {/* Các nút số trang */}
            <div className="flex">
                {pages.map((page) => (
                    <button
                        key={page}
                        onClick={() => onChangePage(page)}
                        className={`w-10 h-10 font-medium border cursor-pointer transition-colors 
                        ${
                            currPage === page
                                ? "bg-[#6B7597] text-white border-[#6B7597]"
                                : "bg-white text-[#80A1BA] border-gray-300 hover:bg-gray-100"
                        }`}
                    >
                        {page}
                    </button>
                ))}
            </div>

            {/* Nút Next */}
            <button
                disabled={currPage === totalPages}
                onClick={() => onChangePage(currPage + 1)}
                className={`w-10 h-10 font-medium border border-gray-300 bg-white cursor-pointer p-0 rounded-r-lg transition-colors 
                hover:bg-gray-100 disabled:text-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed`}
            >
                <i
                    className="fa fa-chevron-right"
                    style={{
                        color:
                            currPage === totalPages
                                ? "rgb(156 163 175)"
                                : "#000",
                    }}
                ></i>
            </button>
        </div>
    );
};

export default Pagination2;
