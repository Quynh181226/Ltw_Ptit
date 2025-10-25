import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import QuizList from "../components/QuizList";
import SortContainer from "../components/SortContainer";
// import Footer1 from "../components/Footer1";
import { type Quiz } from "../types/type";
// import HandleLogout from "../components/handleLogout.tsx";
import { useAppDispatch, useAppSelector } from "../hooks/Hook.ts";
import { getAllTests } from "../apis/TestApi.ts";
import { getAllCategories } from "../apis/CateApi.ts";
import Pagination2 from "../components/Pagination2.tsx";
import NotFound from "../assets/NotFound.jpg"
// import footerBg from "../assets/footerBg.png";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEnvelope, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import HandleLogout from "../components/handleLogout.tsx";
import Footer from "../components/Footer.tsx";

const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const tests = useAppSelector((state) => state.tests.list);
    const categories = useAppSelector((state) => state.categories.categories);

    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "none">("none");
    const [search, setSearch] = useState("");

    const [currPage, setCurrPage] = useState(1);
    const perPage = 4;
    const start=(currPage-1) * perPage;
    // const end=currPage * perPage;
    const end=start+perPage;

    const handlePageChange=(page: number) => {
        if(currPage >= 1 && currPage <= totalPages){
            setCurrPage(page);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(getAllTests());
                await dispatch(getAllCategories());
                // await Promise.all([dispatch(getAllTests()), dispatch(getAllCategories())]);
            } catch (err) {
                console.log("Error fetching data", err);
            }
        };
        fetchData();
    }, [dispatch]);

    useEffect(() => {
        const mappedQuizzes = tests.map((test) => {
            const cate = categories.find((c) => c.id === test.categoryId);
            return {
                id: test.id,
                image: "/assets/Img.svg",
                categoryId: test.categoryId,
                title: test.title,
                ques: test.quesCnt,
                plays: test.plays || 0,
                categoryDisplay: cate ? (
                    <div className="flex items-center justify-center mb-1">
                        <img src={cate.image} alt={cate.name} className="!w-5 !h-5 mr-2 object-cover" />
                        {cate.name}
                    </div>
                ): (
                    ""
                )
            };
        });
        setQuizzes(mappedQuizzes);
    }, [tests, categories]);

    const filteredQuizzes = useMemo(() => {
        const key = search.trim().toLowerCase();
        return key ? quizzes.filter((q) => q.title.toLowerCase().includes(key)) : quizzes;
    }, [search, quizzes]);

    const sortedQuizzes = useMemo(() => {
        if(sortOrder ==="none") return filteredQuizzes
        return [...filteredQuizzes].sort((a, b) =>
            sortOrder === "desc" ? b.plays - a.plays : a.plays - b.plays
        );
    }, [filteredQuizzes, sortOrder]);

    const totalPages=Math.ceil(sortedQuizzes.length / perPage);
    const pagi=sortedQuizzes.slice(start, end);

    const handleRandomQuiz = () => {
        const pool = filteredQuizzes.length > 0 ? filteredQuizzes : quizzes;
        if (pool.length > 0) {
            const randomId = pool[Math.floor(Math.random() * pool.length)].id;
            navigate(`/quizTest/${randomId}`);
        }
    };

    return (
        // className="flex flex-col min-h-screen"
        <div>
            {/*<Header onLogout={HandleLogout} onSearch={setSearch} />*/}
            {/*<HeroSection onRandomQuiz={handleRandomQuiz} />*/}

            <main className="flex-1">
                {/*<h3 className="text-center text-2xl font-semibold my-5">*/}
                {/*    ⭐ Featured quizzes*/}
                {/*</h3>*/}
                {/*className="lg:px-30 px-12"*/}
                <div>
                    {/*<SortContainer currSort={sortOrder} setSort={setSortOrder} />*/}
                    {pagi.length > 0 ? (
                        <QuizList quizzes={pagi} />
                    ) : (
                        <div className="flex flex-col items-center justify-center text-center mt-16">
                            <img src={NotFound} alt="No quizzes" className="w-52 h-38 mb-3 opacity-90" />
                            <h3 className="text-3xl font-semibold text-gray-700 mb-3">
                                No quizzes found
                            </h3>
                            <p className="text-gray-400 text-sm">
                                Try adjusting your search keywords.
                            </p>
                        </div>
                    )}
                    {totalPages > 1 && (
                        <Pagination2
                            currPage={currPage}
                            totalPages={totalPages}
                            onChangePage={handlePageChange}
                        />
                    )}
                </div>
            </main>
            {/*<Footer/>*/}
        </div>
    )
};

export default Dashboard;
