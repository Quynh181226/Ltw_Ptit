import { Messaging } from "react-cssfx-loading";

const LoadingData = () => {
    return (
        <div className="fixed inset-0 flex flex-col justify-center items-center bg-gray-900/30 backdrop-blur-sm z-50">
            <Messaging color="#ffffff" width="60px" height="60px" duration="1.5s" />
            <p className="text-white mt-6 text-lg font-medium">
                Loading data ...
            </p>
        </div>
    );
};

export default LoadingData;
