import { Button } from "antd";

interface SortContainerProps {
    currSort: "asc" | "desc" | "none";
    setSort: (val: "asc" | "desc" | "none") => void;
}

const SortContainer = ({ currSort, setSort }: SortContainerProps) => {
    const handleSortClick = (type: "asc" | "desc") => {
        if(currSort === type) setSort("none");
        else setSort(type);
    }

    return (
        <div className="flex items-center mb-6 gap-2">
            <p>Sort by:</p>
            <Button type="default" onClick={() => handleSortClick("asc")} className={`border ${currSort === "asc" ? "!bg-yellow-100 !font-medium" : "!bg-white"} hover:bg-[#f5f5f5] hover:!border-[#f5f5f5] hover:!text-amber-950 transition`}>
                Ascending
            </Button>
            <Button type="default" onClick={() => handleSortClick("desc")} className={`border ${currSort === "desc" ? "!bg-yellow-100 !font-medium" : "!bg-white"} hover:bg-[#f5f5f5] hover:!border-[#f5f5f5] hover:!text-amber-950 transition`}>
                Descending
            </Button>
        </div>
    );
};

export default SortContainer;