import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBars, faBell, faChevronRight, faSearch, faFilter, faCog, faSignOutAlt, faUsers, faGraduationCap, faPlusSquare, faTrashCan,} from "@fortawesome/free-solid-svg-icons";
import { Dropdown, Menu, Modal, Button, Input, Checkbox } from "antd";
import { useAppDispatch, useAppSelector } from "../hooks/Hook.ts";
import { addLessonContent, getAllCourses } from "../apis/CourseApi.ts";
import Avatar from "../assets/avatar.svg";
import handleLogout from "../components/handleLogout.tsx";
import "../styles/d1.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import iconFlashCard from "../assets/iconFlashCard.svg";
import iconPDF from "../assets/iconPDF.svg";
import iconTask from "../assets/iconTask.svg";
import iconBook from "../assets/iconBook.svg";
import iconPlayCircle from "../assets/iconPlayCircle.svg";
import iconHeadphone from "../assets/iconHeadphone.svg";
import { Question, Answer } from "../types/type.ts";
import {toast} from "react-toastify";
import LoadingProcess from "../components/LoadingProcess.tsx";

interface WordPair {
    word1: string;
    word2: string;
}

interface TestData {
    allQuestionTN?: any[];
    allQuestionND?: any[];
    allQuestionDVOC?: any[];
    allQuestionGC?: WordPair[];
    allQuestionTL?: string;
}

const AddDataForLesson = () => {
    const { courseId, lessonId } = useParams<{ courseId?: string; lessonId?: string }>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { currentUser } = useAppSelector((state) => state.user);
    const { list: courses, status, error } = useAppSelector((state) => state.courses);

    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [darkMode, setDarkMode] = useState(false);

    // Modal states
    const [showVideoModal, setShowVideoModal] = useState(false);
    const [showDocumentModal, setShowDocumentModal] = useState(false);
    const [showTestModal, setShowTestModal] = useState(false);
    const [showPDFModal, setShowPDFModal] = useState(false);
    const [showFlashCardModal, setShowFlashCardModal] = useState(false);
    const [showAudioModal, setShowAudioModal] = useState(false);

    // Form states
    const [videoUrl, setVideoUrl] = useState("");
    const [videoTitle, setVideoTitle] = useState("");
    const [videoDescription, setVideoDescription] = useState("");
    const [docTitle, setDocTitle] = useState("");
    const [docTarget, setDocTarget] = useState("");
    const [docDesc, setDocDesc] = useState("");
    const [docContent, setDocContent] = useState("");
    const [pdfUrl, setPdfUrl] = useState("");
    const [pdfDesc, setPdfDesc] = useState("");
    const [selectedTestTypes, setSelectedTestTypes] = useState<string[]>([]);

    // === STATE CÂU HỎI ===
    const [questionsTN, setQuestionsTN] = useState<Question[]>([
        {
            id: Date.now(),
            question: "",
            answers: [
                { id: 1, text: "", correct: false },
                { id: 2, text: "", correct: false },
                { id: 3, text: "", correct: false },
                { id: 4, text: "", correct: false }
            ]
        }
    ]);

    const [questionsND, setQuestionsND] = useState<Question[]>([
        {
            id: Date.now(),
            question: "",
            answers: [
                { id: 1, text: "", correct: false },
                { id: 2, text: "", correct: false }
            ]
        }
    ]);

    const [questionsDVOC, setQuestionsDVOC] = useState<Question[]>([
        {
            id: Date.now(),
            question: "",
            answers: [
                { id: 1, text: "", correct: false },
                { id: 2, text: "", correct: false },
                { id: 3, text: "", correct: false },
                { id: 4, text: "", correct: false }
            ]
        }
    ]);

    const [wordPairs, setWordPairs] = useState<WordPair[]>([{ word1: "", word2: "" }]);
    const [selfAnswer, setSelfAnswer] = useState("");
    const [flashCards, setFlashCards] = useState<WordPair[]>([{ word1: "", word2: "" }]);
    const [audioQuestions, setAudioQuestions] = useState<Question[]>([{
        id: Date.now(),
        question: "",
        answers: [{ id: 1, text: "", correct: true }]
    }]);

    const [showTestTypeModal, setShowTestTypeModal] = useState(false);
    const [tempSelectedTestTypes, setTempSelectedTestTypes] = useState<string[]>([]);

    // === REF CHO ReactQuill ===
    const quillRef = useRef<ReactQuill>(null);

    // === HÀM THÊM/XÓA CÂU HỎI ===
    const handleAddQuestion = (type: string) => {
        const newQuestion: Question = {
            id: Date.now(),
            question: "",
            answers: type === "ND"
                ? [
                    { id: 1, text: "", correct: false },
                    { id: 2, text: "", correct: false }
                ]
                : [
                    { id: 1, text: "", correct: false },
                    { id: 2, text: "", correct: false },
                    { id: 3, text: "", correct: false },
                    { id: 4, text: "", correct: false }
                ]
        };

        switch (type) {
            case "TN":
                setQuestionsTN(prev => [...prev, newQuestion]);
                break;
            case "ND":
                setQuestionsND(prev => [...prev, newQuestion]);
                break;
            case "DVOC":
                setQuestionsDVOC(prev => [...prev, newQuestion]);
                break;
            default:
                break;
        }
    };

    const handleRemoveQuestion = (type: string, index: number) => {
        const setters = {
            TN: setQuestionsTN,
            ND: setQuestionsND,
            DVOC: setQuestionsDVOC
        };
        const setter = setters[type as keyof typeof setters];
        if (setter) {
            setter(prev => prev.length > 1 ? prev.filter((_, i) => i !== index) : prev);
        }
    };

    const handleChangeQuestion = (type: string, index: number, value: string) => {
        const setters = {
            TN: setQuestionsTN,
            ND: setQuestionsND,
            DVOC: setQuestionsDVOC
        };
        const setter = setters[type as keyof typeof setters];
        if (setter) {
            setter(prev => {
                const newQ = [...prev];
                newQ[index].question = value;
                return newQ;
            });
        }
    };

    const handleChangeAnswer = (type: string, qIdx: number, aIdx: number, value: string) => {
        const setters = {
            TN: setQuestionsTN,
            ND: setQuestionsND,
            DVOC: setQuestionsDVOC
        };
        const setter = setters[type as keyof typeof setters];
        if (setter) {
            setter(prev => {
                const newQ = [...prev];
                if (!newQ[qIdx]?.answers) newQ[qIdx].answers = [];
                if (!newQ[qIdx].answers[aIdx]) {
                    newQ[qIdx].answers[aIdx] = { id: aIdx + 1, text: "", correct: false };
                }
                newQ[qIdx].answers[aIdx].text = value;
                return newQ;
            });
        }
    };

    const handleToggleCorrect = (type: string, qIdx: number, aIdx: number) => {
        const setters = {
            TN: setQuestionsTN,
            ND: setQuestionsND,
            DVOC: setQuestionsDVOC
        };
        const setter = setters[type as keyof typeof setters];
        if (setter) {
            setter(prev => {
                const newQ = [...prev];
                if (!newQ[qIdx]?.answers) return newQ;
                newQ[qIdx].answers.forEach((a, i) => {
                    a.correct = i === aIdx;
                });
                return newQ;
            });
        }
    };

    // === GHÉP CÂU ===
    const addWordPair = () => {
        if (wordPairs.length < 30) {
            setWordPairs(prev => [...prev, { word1: "", word2: "" }]);
        }
    };

    const removeWordPair = (idx: number) => {
        setWordPairs(prev => prev.length > 1 ? prev.filter((_, i) => i !== idx) : prev);
    };

    const handleWordPairChange = (idx: number, field: "word1" | "word2", value: string) => {
        setWordPairs(prev => {
            const newPairs = [...prev];
            newPairs[idx][field] = value;
            return newPairs;
        });
    };

    // === FLASHCARD ===
    const addFlashCard = () => {
        if (flashCards.length < 30) {
            setFlashCards(prev => [...prev, { word1: "", word2: "" }]);
        }
    };

    const removeFlashCard = (idx: number) => {
        setFlashCards(prev => prev.length > 1 ? prev.filter((_, i) => i !== idx) : prev);
    };

    const handleFlashCardChange = (idx: number, field: "word1" | "word2", value: string) => {
        setFlashCards(prev => {
            const newCards = prev.map((card, index) => {
                if (index === idx) {
                    return { ...card, [field]: value };
                }
                return card;
            });
            return newCards;
        });
    };

    const addAudioQuestion = () => {
        setAudioQuestions(prev => [...prev, {
            id: Date.now(),
            question: "",
            answers: [{ id: 1, text: "", correct: true }]
        }]);
    };

    const removeAudioQuestion = (idx: number) => {
        setAudioQuestions(prev => prev.length > 1 ? prev.filter((_, i) => i !== idx) : prev);
    };

    const handleAudioQuestionChange = (idx: number, value: string) => {
        setAudioQuestions(prev => {
            const newQuestions = prev.map((q, index) => {
                if (index === idx) {
                    return { ...q, question: value };
                }
                return q;
            });
            return newQuestions;
        });
    };

    const handleAudioAnswerChange = (idx: number, value: string) => {
        setAudioQuestions(prev => {
            const newQuestions = prev.map((q, index) => {
                if (index === idx) {
                    const newAnswers = q.answers?.map((answer, answerIdx) => {
                        if (answerIdx === 0) {
                            return {
                                id: answer.id || 1,
                                text: value,
                                correct: answer.correct !== undefined ? answer.correct : true
                            };
                        }
                        return answer;
                    }) || [{ id: 1, text: value, correct: true }];

                    return { ...q, answers: newAnswers };
                }
                return q;
            });
            return newQuestions;
        });
    };

    useEffect(() => {
        dispatch(getAllCourses());
    }, [dispatch]);

    const course = courses.find(c => c.id === Number(courseId));
    const lesson = course?.lessons?.find(l => l.id === Number(lessonId));

    useEffect(() => {
        if (showFlashCardModal && lesson?.contents) {
            const flashContents = lesson.contents
                .filter(c => c.type === "flash")
                .sort((a, b) => (b.id || 0) - (a.id || 0));

            if (flashContents.length > 0) {
                const latestFlash = flashContents[0];
                if (latestFlash.data?.allWordFlash && Array.isArray(latestFlash.data.allWordFlash)) {
                    setFlashCards(latestFlash.data.allWordFlash.length > 0 ? latestFlash.data.allWordFlash : [{ word1: "", word2: "" }]);
                }
            }
        }
    }, [showFlashCardModal, lesson?.contents]);

    useEffect(() => {
        if (showAudioModal && lesson?.contents) {
            const audioContents = lesson.contents
                .filter(c => c.type === "audio")
                .sort((a, b) => (b.id || 0) - (a.id || 0));

            if (audioContents.length > 0) {
                const latestAudio = audioContents[0];
                if (latestAudio.data?.audioArr && Array.isArray(latestAudio.data.audioArr)) {
                    const convertedAudioQuestions = latestAudio.data.audioArr.map((item: any, index: number) => {
                        let answers: Answer[] = [];

                        if (Array.isArray(item.answers) && item.answers.length > 0) {
                            if (typeof item.answers[0] === 'object') {
                                answers = item.answers.map((ans: any, ansIndex: number) => ({
                                    id: ansIndex + 1,
                                    text: String(ans.text || ans || ""),
                                    correct: Boolean(ans.correct || ansIndex === 0)
                                }));
                            } else {
                                answers = item.answers.map((ans: any, ansIndex: number) => ({
                                    id: ansIndex + 1,
                                    text: String(ans || ""),
                                    correct: ansIndex === 0
                                }));
                            }
                        } else {
                            answers = [{ id: 1, text: "", correct: true }];
                        }

                        return {
                            id: item.id || Date.now() + index,
                            question: String(item.question || ""),
                            answers: answers
                        };
                    });

                    setAudioQuestions(convertedAudioQuestions.length > 0 ? convertedAudioQuestions : [{
                        id: Date.now(),
                        question: "",
                        answers: [{ id: 1, text: "", correct: true }]
                    }]);
                }
            }
        }
    }, [showAudioModal, lesson?.contents]);

    const convertDBQuestionsToState = (dbQuestions: any[] = []): Question[] => {
        return dbQuestions.map((q, index) => ({
            id: q.id || Date.now() + index,
            question: q.question || "",
            answers: Array.isArray(q.answers)
                ? q.answers.map((answer: string, answerIndex: number) => ({
                    id: answerIndex + 1,
                    text: answer || "",
                    correct: q.correctAnswer === answerIndex
                }))
                : (q.answers ? [{ id: 1, text: q.answers, correct: true }] : [])
        }));
    };

    useEffect(() => {
        if (!lesson?.contents) return;

        console.log("Lesson contents:", lesson.contents);

        const findContent = (type: string) => lesson.contents?.find(c => c.type === type);

        const video = findContent("video")?.data;
        const doc = findContent("document")?.data;
        const pdf = findContent("pdf")?.data;
        const test = findContent("test")?.data;
        const flash = findContent("flash")?.data;
        const audio = findContent("audio")?.data;

        // Load video data
        if (video) {
            setVideoUrl(video.idVideo || "");
            setVideoTitle(video.videoTitle || "");
            setVideoDescription(video.description || "");
        }

        // Load document data
        if (doc) {
            setDocTitle(doc.title || "");
            setDocTarget(doc.targetLesson || "");
            setDocDesc(doc.description || "");
            setDocContent(doc.lessonContent || "");
        }

        // Load PDF data
        if (pdf) {
            setPdfUrl(pdf.linkPDf || "");
            setPdfDesc(pdf.description || "");
        }

        if (test) {
            console.log("Test data found:", test);

            const availableTypes: string[] = [];

            if (test.allQuestionTN && test.allQuestionTN.length > 0) {
                setQuestionsTN(convertDBQuestionsToState(test.allQuestionTN));
                availableTypes.push("TN");
            }

            if (test.allQuestionND && test.allQuestionND.length > 0) {
                setQuestionsND(convertDBQuestionsToState(test.allQuestionND));
                availableTypes.push("ND");
            }

            if (test.allQuestionDVOC && test.allQuestionDVOC.length > 0) {
                setQuestionsDVOC(convertDBQuestionsToState(test.allQuestionDVOC));
                availableTypes.push("DVOC");
            }

            if (test.allQuestionGC && test.allQuestionGC.length > 0) {
                setWordPairs(test.allQuestionGC);
                availableTypes.push("GC");
            }

            if (test.allQuestionTL && test.allQuestionTL.trim() !== "") {
                setSelfAnswer(test.allQuestionTL);
                availableTypes.push("TL");
            }

            setSelectedTestTypes(availableTypes);
            console.log("Available test types:", availableTypes);
        }

        if (flash?.allWordFlash && Array.isArray(flash.allWordFlash)) {
            setFlashCards(flash.allWordFlash.length > 0 ? flash.allWordFlash : [{ word1: "", word2: "" }]);
        }

        if (audio?.audioArr && Array.isArray(audio.audioArr)) {
            const convertedAudioQuestions = audio.audioArr.map((item: any, index: number) => {
                let answers = [];

                if (Array.isArray(item.answers) && item.answers.length > 0) {
                    if (typeof item.answers[0] === 'object') {
                        // answers là array of objects
                        answers = item.answers.map((ans: any, ansIndex: number) => ({
                            id: ansIndex + 1,
                            text: ans.text?.toString() || ans.toString() || "",
                            correct: ans.correct || ansIndex === 0
                        }));
                    } else {
                        answers = item.answers.map((ans: string, ansIndex: number) => ({
                            id: ansIndex + 1,
                            text: ans?.toString() || "",
                            correct: ansIndex === 0
                        }));
                    }
                } else {
                    answers = [{ id: 1, text: "", correct: true }];
                }

                return {
                    id: item.id || Date.now() + index,
                    question: item.question?.toString() || "",
                    answers: answers
                };
            });

            setAudioQuestions(convertedAudioQuestions.length > 0 ? convertedAudioQuestions : [{
                id: Date.now(),
                question: "",
                answers: [{ id: 1, text: "", correct: true }]
            }]);
        }
    }, [lesson?.contents]);

    const handleOpenTestTypeModal = () => {
        setTempSelectedTestTypes([...selectedTestTypes]);
        setShowTestTypeModal(true);
    };

    const handleConfirmTestTypes = () => {
        setSelectedTestTypes(tempSelectedTestTypes);
        setShowTestTypeModal(false);
    };

    const handleCancelTestTypes = () => {
        setShowTestTypeModal(false);
        setTempSelectedTestTypes([...selectedTestTypes]);
    };

    const handleAddVideo = async () => {
        if (!videoUrl || !videoTitle || !videoDescription) {
            toast.warning("Vui lòng điền đầy đủ thông tin video!!");
            return;
        }

        const idVideo = videoUrl.includes("=") ? videoUrl.split("=")[1] : videoUrl.split("/").pop();

        try {
            await dispatch(addLessonContent({
                courseId: Number(courseId),
                lessonId: Number(lessonId),
                type: "video",
                data: {
                    idVideo,
                    videoTitle,
                    description: videoDescription
                }
            })).unwrap();

            setShowVideoModal(false);
            dispatch(getAllCourses());
            toast.success("Thêm video thành công!!");
        } catch (error) {
            console.error("Lỗi khi thêm video:", error);
            toast.error("Có lỗi xảy ra khi thêm video!!");
        }
    };

    const handleAddDocument = async () => {
        if (!docTitle || !docTarget || !docDesc || !docContent) {
            toast.warning("Vui lòng điền đầy đủ thông tin tài liệu!!");
            return;
        }

        try {
            await dispatch(addLessonContent({
                courseId: Number(courseId),
                lessonId: Number(lessonId),
                type: "document",
                data: {
                    title: docTitle,
                    targetLesson: docTarget,
                    description: docDesc,
                    lessonContent: docContent
                }
            })).unwrap();

            setShowDocumentModal(false);
            dispatch(getAllCourses());
            alert("Thêm tài liệu thành công!");
        } catch (error) {
            console.error("Lỗi khi thêm tài liệu:", error);
            alert("Có lỗi xảy ra khi thêm tài liệu!");
        }
    };

    const handleAddPDF = async () => {
        if (!pdfUrl || !pdfDesc) {
            alert("Vui lòng điền đầy đủ thông tin PDF!");
            return;
        }

        try {
            await dispatch(addLessonContent({
                courseId: Number(courseId),
                lessonId: Number(lessonId),
                type: "pdf",
                data: {
                    linkPDf: pdfUrl,
                    description: pdfDesc
                }
            })).unwrap();

            setShowPDFModal(false);
            dispatch(getAllCourses());
            alert("Thêm PDF thành công!");
        } catch (error) {
            console.error("Lỗi khi thêm PDF:", error);
            alert("Có lỗi xảy ra khi thêm PDF!");
        }
    };

    const handleAddTest = async () => {
        if (selectedTestTypes.length === 0) {
            alert("Vui lòng chọn ít nhất 1 loại câu hỏi!");
            return;
        }

        const validateQuestion = (q: Question): boolean => {
            if (!q.question?.trim()) return false;
            if (!q.answers || !Array.isArray(q.answers)) return false;

            const hasValidCorrectAnswer = q.answers.some(a => a.correct && a.text?.trim());
            const hasAnswerContent = q.answers.some(a => a.text?.trim());

            return hasValidCorrectAnswer && hasAnswerContent;
        };

        const testData: TestData = {};
        let hasValidData = false;

        // TRẮC NGHIỆM
        if (selectedTestTypes.includes("TN")) {
            const validQuestions = questionsTN.filter(validateQuestion);
            if (validQuestions.length > 0) {
                testData.allQuestionTN = validQuestions.map(q => ({
                    id: q.id,
                    question: q.question,
                    answers: q.answers?.map(a => a.text),
                    correctAnswer: q.answers?.findIndex(a => a.correct)
                }));
                hasValidData = true;
            } else {
                alert("Loại câu hỏi Trắc nghiệm chưa có câu hỏi hợp lệ!");
                return;
            }
        }

        // NGHE/ĐỌC
        if (selectedTestTypes.includes("ND")) {
            const validQuestions = questionsND.filter(validateQuestion);
            if (validQuestions.length > 0) {
                testData.allQuestionND = validQuestions.map(q => ({
                    id: q.id,
                    question: q.question,
                    answers: q.answers?.map(a => a.text),
                    correctAnswer: q.answers?.findIndex(a => a.correct)
                }));
                hasValidData = true;
            } else {
                alert("Loại câu hỏi Nghe/Đọc chưa có câu hỏi hợp lệ!");
                return;
            }
        }

        // CHỌN TỪ ĐÚNG
        if (selectedTestTypes.includes("DVOC")) {
            const validQuestions = questionsDVOC.filter(validateQuestion);
            if (validQuestions.length > 0) {
                testData.allQuestionDVOC = validQuestions.map(q => ({
                    id: q.id,
                    question: q.question,
                    answers: q.answers?.map(a => a.text),
                    correctAnswer: q.answers?.findIndex(a => a.correct)
                }));
                hasValidData = true;
            } else {
                alert("Loại câu hỏi Chọn từ đúng chưa có câu hỏi hợp lệ!");
                return;
            }
        }

        // GHÉP CÂU
        if (selectedTestTypes.includes("GC")) {
            const validPairs = wordPairs.filter(p => p.word1.trim() && p.word2.trim());
            if (validPairs.length > 0) {
                testData.allQuestionGC = validPairs;
                hasValidData = true;
            } else {
                alert("Loại câu hỏi Ghép câu chưa có cặp từ hợp lệ!");
                return;
            }
        }

        // TỰ LUẬN
        if (selectedTestTypes.includes("TL")) {
            if (selfAnswer.trim()) {
                testData.allQuestionTL = selfAnswer.trim();
                hasValidData = true;
            } else {
                alert("Loại câu hỏi Tự luận chưa có nội dung!");
                return;
            }
        }

        if (!hasValidData) {
            alert("Vui lòng nhập ít nhất một câu hỏi hợp lệ!");
            return;
        }

        try {
            await dispatch(addLessonContent({
                courseId: Number(courseId),
                lessonId: Number(lessonId),
                type: "test",
                data: testData,
            })).unwrap();

            setShowTestModal(false);
            dispatch(getAllCourses());
            alert("Lưu bài kiểm tra thành công!");
        } catch (error) {
            console.error("Lỗi khi lưu bài kiểm tra:", error);
            alert("Có lỗi xảy ra khi lưu bài kiểm tra!");
        }
    };

    const handleAddFlashCard = async () => {
        const validCards = flashCards.filter(card => card.word1.trim() && card.word2.trim());

        if (validCards.length === 0) {
            alert("Vui lòng thêm ít nhất 1 flashcard hợp lệ!");
            return;
        }

        try {
            await dispatch(addLessonContent({
                courseId: Number(courseId),
                lessonId: Number(lessonId),
                type: "flash",
                data: { allWordFlash: validCards }
            })).unwrap();

            setShowFlashCardModal(false);
            dispatch(getAllCourses());
            alert("Thêm flashcard thành công!");
        } catch (error) {
            console.error("Lỗi khi thêm flashcard:", error);
            alert("Có lỗi xảy ra khi thêm flashcard!");
        }
    };

    const handleAddAudio = async () => {
        const validQuestions = audioQuestions.filter(q => {
            const questionText = q.question?.trim();
            let answerText = "";

            if (Array.isArray(q.answers) && q.answers.length > 0) {
                const firstAnswer = q.answers[0];
                if (typeof firstAnswer === 'object' && firstAnswer !== null && 'text' in firstAnswer) {
                    answerText = (firstAnswer.text as string)?.trim() || "";
                } else {
                    answerText = (firstAnswer as string)?.trim() || "";
                }
            }

            return questionText && answerText;
        });

        if (validQuestions.length === 0) {
            alert("Vui lòng thêm ít nhất 1 câu hỏi nghe hợp lệ!");
            return;
        }

        try {
            const normalizedAudioData = validQuestions.map(q => ({
                id: q.id,
                question: q.question,
                answers: Array.isArray(q.answers)
                    ? q.answers.map(a =>
                        typeof a === 'object' && a !== null && 'text' in a ? a.text : a
                    )
                    : []
            }));

            await dispatch(addLessonContent({
                courseId: Number(courseId),
                lessonId: Number(lessonId),
                type: "audio",
                data: { audioArr: normalizedAudioData }
            })).unwrap();

            setShowAudioModal(false);
            dispatch(getAllCourses());
            alert("Thêm câu hỏi nghe thành công!");
        } catch (error) {
            console.error("Lỗi khi thêm câu hỏi nghe:", error);
            alert("Có lỗi xảy ra khi thêm câu hỏi nghe!");
        }
    };

    // Reset forms
    const resetVideoForm = () => {
        setVideoUrl("");
        setVideoTitle("");
        setVideoDescription("");
    };

    const resetTestForm = () => {
        setSelectedTestTypes([]);
        setQuestionsTN([{
            id: Date.now(),
            question: "",
            answers: [
                { id: 1, text: "", correct: false },
                { id: 2, text: "", correct: false },
                { id: 3, text: "", correct: false },
                { id: 4, text: "", correct: false }
            ]
        }]);
        setQuestionsND([{
            id: Date.now(),
            question: "",
            answers: [
                { id: 1, text: "", correct: false },
                { id: 2, text: "", correct: false }
            ]
        }]);
        setQuestionsDVOC([{
            id: Date.now(),
            question: "",
            answers: [
                { id: 1, text: "", correct: false },
                { id: 2, text: "", correct: false },
                { id: 3, text: "", correct: false },
                { id: 4, text: "", correct: false }
            ]
        }]);
        setWordPairs([{ word1: "", word2: "" }]);
        setSelfAnswer("");
    };

    const isContentAdded = (type: string) => {
        return lesson?.contents?.some(c => c.type === type) || false;
    };

    const userMenu = (
        <Menu className="w-72 p-4 rounded-lg shadow-lg border border-gray-200">
            <Menu.Item key="user-info" disabled>
                <div className="flex items-center gap-4">
                    <img src={currentUser?.avatar || Avatar} className="w-10 h-10 rounded-full" alt="Avatar" />
                    <div>
                        <h3 className="text-base font-semibold text-gray-800">{currentUser?.fullName}</h3>
                        <span className="text-sm text-gray-500">{currentUser?.email}</span>
                    </div>
                </div>
            </Menu.Item>
            <Menu.Item key="info">
                <Link to="/profileAdmin" className="text-gray-700 font-semibold hover:bg-gray-100 block px-2 py-1 rounded">
                    Thông Tin
                </Link>
            </Menu.Item>
            <Menu.Item key="signout">
                <span onClick={handleLogout} className="text-red-900 font-semibold hover:bg-gray-100 block px-2 py-1 rounded">
                    Đăng xuất
                </span>
            </Menu.Item>
        </Menu>
    );

    if (status === "pending") return <LoadingProcess/>
    if (error) return console.error("Lỗi: ", error)
    if (!course || !lesson) return <div className="p-10 text-center">Không tìm thấy khóa học hoặc bài học</div>;

    return (
        <div
            className={`font-[Poppins,sans-serif] m-0 p-0 box-border transition-colors duration-300 ${
                darkMode ? 'bg-[#37353E] text-[#FBFBFB]' : 'bg-[#eee] min-h-screen text-[#37353E]'
            }`}
        >      <section
            className={`sidebar ${sidebarOpen ? '' : 'hide'} ${darkMode ? 'dark' : ''} before:content-[''] before:absolute before:w-10 before:h-10 before:-top-10 before:right-0 before:rounded-full ${
                darkMode ? 'before:shadow-[20px_20px_0_#111]' : 'before:shadow-[20px_20px_0_#F9F9F9]'
            }`}
        >
            <Link to="#" className="flex items-center h-14 font-bold text-2xl sticky top-0 left-0 z-[500] pb-5 box-content text-[#6B7597]">
                <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="60px" fill="#6a7698">
                    <path d="M480-120q-18 0-34.5-6.5T416-146L163-400h113l197 197q2 2 3.5 2.5t3.5.5q2 0 3.5-.5t3.5-2.5l267-268q23-23 35-54.5t12-64.5q-2-69-46-118.5T645-758q-31 0-59.5 12T536-711l-27 29q-5 6-13 9.5t-16 3.5q-8 0-16-3.5t-14-9.5l-27-29q-21-23-49-36t-60-13q-54 0-93.5 34.5T167-640H85q17-85 79.5-142.5T314-840q48 0 90.5 19t75.5 53q32-34 74.5-53t90.5-19q100 0 167.5 74T880-590q0 49-17 94t-51 80L543-146q-13 13-29 19.5t-34 6.5Zm-5-360H80v-80h555q17 0 28.5-11.5T675-600q0-17-11.5-28.5T635-640q-14 0-25 7.5T596-611l-77-21q11-39 43-63.5t73-24.5q50 0 85 35t35 85q0 50-35 85t-85 35h-47q3 10 5 19.5t2 20.5q0 50-35 85t-85 35q-41 0-73-24.5T359-408l77-21q3 14 14 21.5t25 7.5q17 0 28.5-11.5T515-440q0-17-11.5-28.5T475-480Zm9 0Z" />
                </svg>
                {sidebarOpen && <span className="ml-2">UniLife Hub</span>}
            </Link>

            <div className="menu top">
                <div className="menu-item min-w-[40px] flex justify-center">
                    <Link to="#" className={`menu-link ${sidebarOpen ? '' : 'hide'} hover:text-[#7F88A8]`}>
                        <i className="bx bxs-dashboard !ml-2.5 flex min-w-[30px]"></i>
                        {sidebarOpen && <span>Dashboard</span>}
                    </Link>
                </div>

                <div className="menu-item min-w-[40px] flex justify-center">
                    <Link to="#" className={`menu-link ${sidebarOpen ? '' : 'hide'} hover:text-[#7F88A8]`}>
                        <i className="bx bxs-shopping-bag-alt !ml-2.5 flex min-w-[30px]"></i>
                        {sidebarOpen && <span>Topic</span>}
                    </Link>
                </div>

                <div className="menu-item">
                    <Link to="/categoryManagement" className={`menu-link group ${sidebarOpen ? '' : 'hide'} hover:text-[#7F88A8]`}>
                        <svg className="min-w-[40px] flex justify-center fill-current group-hover:text-[#6B7597] transition-colors duration-200" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill={darkMode ? '#F9F9F9' : '#302E36'} viewBox="0 0 24 24">
                            <path d="M7 3a4 4 0 1 0 0 8 4 4 0 1 0 0-8M17 3a4 4 0 1 0 0 8 4 4 0 1 0 0-8M7 13a4 4 0 1 0 0 8 4 4 0 1 0 0-8M18 13h-2v3h-3v2h3v3h2v-3h3v-2h-3z"></path>
                        </svg>
                        {sidebarOpen && <span className="group-hover:text-[#6B7597] transition-colors duration-200">Category</span>}
                    </Link>
                </div>

                <div className="menu-item">
                    <Link to="/testManagement" className={`menu-link group ${sidebarOpen ? '' : 'hide'}`}>
                        <svg className="min-w-[40px] flex justify-center fill-current group-hover:text-[#6B7597] transition-colors duration-200" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill={darkMode ? '#F9F9F9' : '#302E36'} viewBox="0 0 24 24">
                            <path d="M4 2H2v19c0 .55.45 1 1 1h19v-2H4z"></path>
                            <path d="M7 10h11c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1H7c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1m10-2h-5V6h5zM8 6h2v2H8zM21 12H7c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1M8 14h6v2H8zm12 2h-4v-2h4z"></path>
                        </svg>
                        {sidebarOpen && <span className="group-hover:text-[#6B7597] transition-colors duration-200">Test</span>}
                    </Link>
                </div>

                <div className={`menu-item active ${darkMode ? 'dark-active' : ''}`}>
                    <Link to="/courseManagement" className={`menu-link group ${sidebarOpen ? '' : 'hide'} flex items-center gap-2 text-[#6B7597] hover:text-[#7F88A8] transition-colors duration-200`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="min-w-[40px] flex justify-center fill-current group-hover:text-[#7F88A8] transition-colors duration-200">
                            <path d="M20 4h-8.59L10 2.59C9.63 2.22 9.11 2 8.59 2H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2M4 18v-8h16v8z" />
                        </svg>
                        {sidebarOpen && <span>Courses</span>}
                    </Link>
                </div>

                <div className="menu-item">
                    <Link to="/studentManagement" className={`menu-link ${sidebarOpen ? '' : 'hide'} hover:text-[#7F88A8]`}>
                        <FontAwesomeIcon icon={faUsers} className="min-w-[40px] flex justify-center" />
                        {sidebarOpen && <span>Student</span>}
                    </Link>
                </div>

                <div className="menu-item">
                    <Link to="/addExam" className={`menu-link ${sidebarOpen ? '' : 'hide'} hover:text-[#7F88A8]`}>
                        <FontAwesomeIcon icon={faGraduationCap} className="min-w-[40px] flex justify-center" />
                        {sidebarOpen && <span>Exam</span>}
                    </Link>
                </div>
            </div>

            <div className="menu">
                <div className="menu-item">
                    <Link to="#" className={`menu-link ${sidebarOpen ? '' : 'hide'} hover:text-[#7F88A8]`}>
                        <FontAwesomeIcon icon={faCog} className="min-w-[40px] flex justify-center" />
                        {sidebarOpen && <span>Settings</span>}
                    </Link>
                </div>

                <div className="menu-item">
                    <Link to="/login" className={`menu-link ${sidebarOpen ? '' : 'hide'} text-red-700 hover:text-red-800`} onClick={handleLogout}>
                        <FontAwesomeIcon icon={faSignOutAlt} className="min-w-[40px] flex justify-center" />
                        {sidebarOpen && <span>Logout</span>}
                    </Link>
                </div>
            </div>
        </section>

            <section
                className={`relative transition-all duration-300 ease-in-out ${
                    sidebarOpen ? 'w-[calc(100%-280px)] left-[280px]' : 'w-[calc(100%-60px)] left-[60px]'
                } max-[768px]:w-[calc(100%-60px)] max-[768px]:left-[60px]`}
            >
                <nav
                    className={`h-14 px-6 flex items-center gap-6 font-[Lato,sans-serif] sticky top-0 left-0 z-[1000] ${
                        darkMode ? 'bg-[#111]' : 'bg-[#F9F9F9]'
                    } before:content-[''] before:absolute before:w-10 before:h-10 before:-bottom-10 before:left-0 before:rounded-full ${
                        darkMode ? 'before:shadow-[-20px_-20px_0_#111]' : 'before:shadow-[-20px_-20px_0_#F9F9F9]'
                    }`}
                >
                    <FontAwesomeIcon
                        icon={faBars}
                        className={`cursor-pointer ${darkMode ? 'text-[#FBFBFB]' : 'text-[#342E37]'}`}
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    />
                    <div className="flex items-center gap-[10px] ml-auto mr-5">
                        <input
                            type="checkbox"
                            id="switch-mode"
                            hidden
                            checked={darkMode}
                            onChange={() => setDarkMode(!darkMode)}
                        />
                        <label htmlFor="switch-mode" className={`switch-toggle ${darkMode ? 'dark' : ''}`}></label>
                        <Link to="#" className={`text-xl relative ${darkMode ? 'text-[#FBFBFB]' : 'text-[#342E37]'}`}>
                            <FontAwesomeIcon icon={faBell} />
                            <span
                                className={`absolute -top-[6px] -right-[6px] w-5 h-5 rounded-full border-2 font-bold text-xs flex justify-center items-center ${
                                    darkMode ? 'border-[#111] bg-[#6B7597] text-[#F9F9F9]' : 'border-[#F9F9F9] bg-[#6B7597] text-[#F9F9F9]'
                                }`}
                            >
                                8
                            </span>
                        </Link>
                        <Dropdown overlay={userMenu} trigger={['hover']}>
                            <img
                                src={currentUser?.avatar || Avatar}
                                alt="Avatar"
                                className="w-10 h-10 rounded-full cursor-pointer object-cover"
                            />
                        </Dropdown>
                    </div>
                </nav>
                <main className="w-full min-h-screen p-6 font-poppins max-h-[calc(100vh-56px)] overflow-y-auto">
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                        <div>
                            <h1 className="text-3xl font-semibold mb-2">Lesson</h1>
                            <div className="flex items-center gap-4">
                                <Link to={`/lesson/${courseId}`} className="text-[#AAAAAA] hover:text-[#6B7597]">Lesson</Link>
                                <FontAwesomeIcon icon={faChevronRight} />
                                <span className="text-[#6B7597]">{lesson.name}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-6 mt-6 w-full">
                        <div className={`flex-grow basis-[500px] rounded-[20px] p-6 ${darkMode ? "bg-[#302E36]" : "bg-[#F9F9F9]"}`}>
                            <section className="content flex flex-wrap justify-around gap-4 mt-6">
                                {[
                                    { id: "addVideo", icon: iconPlayCircle, label: "video", title: "Add New Video Content" },
                                    { id: "addBook", icon: iconBook, label: "document", title: "Add New document" },
                                    { id: "flashCard", icon: iconFlashCard, label: "flash", title: "Add New flashCard" },
                                    { id: "addTest", icon: iconTask, label: "test", title: "Add New test" },
                                    { id: "PDF", icon: iconPDF, label: "pdf", title: "Add New PDF" },
                                    { id: "addAudio", icon: iconHeadphone, label: "audio", title: "Add New audio" },
                                ].map((item) => (
                                    <div
                                        key={item.id}
                                        className={`header-card w-[30%] flex gap-4 border-4 rounded-lg p-4 items-center cursor-pointer transition-all duration-300 ${
                                            isContentAdded(item.label)
                                                ? "bg-[#CDE4A8] border-[#8BB646] shadow-lg shadow-gray-200"
                                                : "border-[#ED7A3B] bg-[#f4dccd] hover:bg-[#F4BC9A]"
                                        }`}
                                        onClick={() => {
                                            if (item.label === "video") setShowVideoModal(true);
                                            if (item.label === "document") setShowDocumentModal(true);
                                            if (item.label === "test") setShowTestModal(true);
                                            if (item.label === "pdf") setShowPDFModal(true);
                                            if (item.label === "flash") setShowFlashCardModal(true);
                                            if (item.label === "audio") setShowAudioModal(true);
                                        }}
                                    >
                                        <div className="icon-card">
                                            <div className={`border-4 rounded-md w-16 p-2 ${isContentAdded(item.label) ? "border-[#ACCA7B] bg-[#E3F0D1]" : "!border-[#f1cdb8] bg-[#FDEFE9]"}`}>
                                                <img src={item.icon} alt="" className={`w-25 ${isContentAdded(item.label) ? "icon-green" : ""}`}/>
                                            </div>
                                        </div>
                                        <div className="content">
                                            <div className="title-section">
                                                <div className="label text-sm capitalize">{item.label}</div>
                                                <div className="title text-lg font-semibold">{item.title}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </section>
                        </div>
                    </div>
                </main>

                {/* === MODALS === */}

                {/* Video Modal */}
                <Modal
                    title={<span className="text-xl font-semibold">Add Video by URL</span>}
                    open={showVideoModal}
                    onCancel={() => {
                        setShowVideoModal(false);
                        resetVideoForm();
                    }}
                    footer={[
                        <button key="cancel" className="cursor-pointer px-4 py-2 rounded-2xl border border-gray-300 bg-gray-100 hover:bg-gray-200 transition"
                                 onClick={() => {
                                    setShowVideoModal(false);
                                    resetVideoForm();
                                 }}
                        >
                            Cancel
                        </button>,
                        <button key="submit" onClick={handleAddVideo} className="ml-3 cursor-pointer px-4 py-2 rounded-2xl bg-[#6B7597] text-white hover:bg-[#565D7C] transition">
                            Add Video
                        </button>
                    ]}
                    centered
                    width={600}
                >
                    <form>
                        <div className="form-group mb-5">
                            <div className="-mx-6 mt-3 mb-5 border-t border-gray-300"></div>
                            <label htmlFor="videoUrl" className="form-label block mb-2 font-medium text-[#333]">
                                Video URL
                            </label>
                            <input
                                type="url"
                                id="videoUrl"
                                className="form-input1 w-full p-3 border border-[#ddd] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                value={videoUrl}
                                onChange={(e) => setVideoUrl(e.target.value)}
                            />
                        </div>
                        <div className="form-group mb-5">
                            <label htmlFor="videoTitle" className="form-label block mb-2 font-medium text-[#333]">
                                Video Title
                            </label>
                            <input
                                type="text"
                                id="videoTitle"
                                className="form-input1 w-full p-3 border border-[#ddd] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Enter video title"
                                value={videoTitle}
                                onChange={(e) => setVideoTitle(e.target.value)}
                            />
                        </div>
                        <div className="form-group mb-5">
                            <label htmlFor="videoDescription" className="form-label block mb-2 font-medium text-[#333]">
                                Video Description
                            </label>
                            <ReactQuill
                                value={videoDescription}
                                onChange={setVideoDescription}
                                className="lesson-textarea w-full border border-[#d0d0d0] rounded-lg min-h-[100px]"
                                placeholder="Nhập mô tả"
                            />
                        </div>
                    </form>
                </Modal>

                {/* Document Modal */}
                <Modal
                    title={<span className="text-xl font-semibold">Nhập Document Bài Học HTML</span>}
                    open={showDocumentModal}
                    onCancel={() => setShowDocumentModal(false)}
                    footer={[
                        <button key="cancel" onClick={() => setShowDocumentModal(false)} className="cursor-pointer px-4 py-2 rounded-2xl border border-gray-300 bg-gray-100 hover:bg-gray-200 transition">
                            Huỷ
                        </button>,
                        <button key="submit" onClick={handleAddDocument} className="cursor-pointer ml-3 px-4 py-2 rounded-2xl bg-[#6B7597] text-white hover:bg-[#565D7C] transition">
                            Lưu
                        </button>
                    ]}
                    centered
                    width={600}
                    style={{ maxHeight: "90vh" }}
                >
                    <div className="-mx-6 mt-3.5 mb-5 border-t border-gray-300"></div>
                    <div className="space-y-5">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-medium mb-2 text-[#6B7597]">Tên bài học</h3>
                            <Input size="large" className="w-full p-2 border rounded" value={docTitle} onChange={(e) => setDocTitle(e.target.value)} placeholder="Nhập tiêu đề" />
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-medium mb-2 text-[#6B7597]">Mục tiêu</h3>
                            <Input size="large" className="w-full p-2 border rounded" value={docTarget} onChange={(e) => setDocTarget(e.target.value)} />
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-medium mb-2 text-[#6B7597]">Mô tả</h3>
                            <Input size="large" className="w-full p-2 border rounded" value={docDesc} onChange={(e) => setDocDesc(e.target.value)} />
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-medium mb-2 text-[#6B7597]">Nội dung chi tiết</h3>
                            <ReactQuill value={docContent} onChange={setDocContent} className="min-h-[150px]" />
                        </div>
                    </div>
                </Modal>

                {/* Test Type Selection Modal */}
                <Modal
                    title={<span className="text-lg font-medium p-3 rounded">Chọn dạng câu hỏi</span>}
                    open={showTestTypeModal}
                    onCancel={handleCancelTestTypes}
                    footer={[
                        <Button size="large" key="cancel" onClick={handleCancelTestTypes}>Hủy</Button>,
                        <Button size="large" key="submit" type="primary" onClick={handleConfirmTestTypes} disabled={tempSelectedTestTypes.length === 0}>
                            Chọn ({tempSelectedTestTypes.length})
                        </Button>,
                    ]}
                    centered
                    width={500}
                >
                    <div className="-mx-6 mt-3 mb-5 border-t border-gray-300"></div>
                    <div className="question-popup-content" style={{ padding: "20px" }}>
                        <p className="question-popup-description" style={{ marginBottom: "20px", color: "#555" }}>
                            Hãy chọn một hoặc nhiều dạng câu hỏi dưới đây:
                        </p>
                        <div className="question-type-list" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                            {[
                                { type: "TN", label: "Trắc nghiệm", color: "#f3712b", description: "Câu hỏi có nhiều lựa chọn, chỉ một đáp án đúng" },
                                { type: "ND", label: "Bài Nghe / Đọc", color: "#34A853", description: "Câu hỏi chỉ có hai lựa chọn: Đúng hoặc Sai" },
                                { type: "DVOC", label: "Chọn từ đúng", color: "#fbbc05", description: "Câu hỏi yêu cầu người dùng nhập câu trả lời ngắn" },
                                { type: "GC", label: "Ghép câu", color: "#ea4335", description: "Câu hỏi yêu cầu người dùng kết nối các mục trong hai danh sách" },
                                { type: "TL", label: "Tự luận", color: "#46bdc6", description: "Câu hỏi có chỗ trống hoặc yêu cầu nộp file, tự luận" },
                            ].map((item) => (
                                <div
                                    key={item.type}
                                    className={`question-type-item question-type-${item.type.toLowerCase()}`}
                                    style={{
                                        display: "flex",
                                        border: tempSelectedTestTypes.includes(item.type) ? `2px solid ${item.color}` : "1px solid #ddd",
                                        borderRadius: "6px",
                                        overflow: "hidden",
                                        transition: "all 0.2s",
                                        cursor: "pointer",
                                        backgroundColor: tempSelectedTestTypes.includes(item.type) ? `${item.color}10` : "#f9f9f9",
                                    }}
                                    onClick={() => {
                                        if (tempSelectedTestTypes.includes(item.type)) {
                                            setTempSelectedTestTypes(tempSelectedTestTypes.filter(t => t !== item.type));
                                        } else {
                                            setTempSelectedTestTypes([...tempSelectedTestTypes, item.type]);
                                        }
                                    }}
                                >
                                    <div className="question-type-icon" style={{ width: "60px", display: "flex", justifyContent: "center", alignItems: "center", padding: "12px" }}>
                                        <div className="question-type-icon-circle" style={{ width: "36px", height: "36px", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", color: "white", fontSize: "16px", backgroundColor: item.color }}>
                                            {item.type === "TN" ? "A" : item.type}
                                        </div>
                                    </div>
                                    <div className="question-type-content" style={{ flexGrow: 1, padding: "12px 16px", borderLeft: "1px solid #ddd" }}>
                                        <div className="question-type-title" style={{ fontWeight: "500", marginBottom: "4px" }}>{item.label}</div>
                                        <div className="question-type-description" style={{ fontSize: "13px", color: "#666" }}>{item.description}</div>
                                    </div>
                                    {tempSelectedTestTypes.includes(item.type) && (
                                        <div className="question-type-check" style={{ width: "40px", display: "flex", justifyContent: "center", alignItems: "center", color: item.color, fontSize: "18px" }}>✓</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </Modal>

                {/* Main Test Modal */}
                <Modal
                    title={
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-medium">Tạo bài kiểm tra</span>
                            {/*<Button type="primary" className="bg-[#f3712b] hover:bg-[#e05f1d]">*/}
                            {/*    */}
                            {/*</Button>*/}
                        </div>
                    }
                    open={showTestModal}
                    onCancel={() => {
                        setShowTestModal(false);
                        resetTestForm();
                    }}
                    footer={[
                        <button key="cancel" className="cursor-pointer px-4 py-2 rounded-2xl border border-gray-300 bg-gray-100 hover:bg-gray-200 transition"
                                onClick={() => {
                                    setShowTestModal(false);
                                    resetTestForm();
                                }}>
                            Huỷ
                        </button>,
                        <button key="submit" onClick={handleAddTest} disabled={selectedTestTypes.length === 0} className="cursor-pointer ml-3 px-4 py-2 rounded-2xl bg-[#6B7597] text-white hover:bg-[#565D7C] transition">
                            Lưu tất cả
                        </button>
                    ]}
                    centered
                    width={700}
                    style={{ maxHeight: "80vh" }}
                >
                    <div className="-mx-6 mt-3 mb-5 border-t border-gray-300"></div>

                    <button onClick={handleOpenTestTypeModal} className="px-5 py-[10px] rounded-[5px] cursor-pointer text-base bg-[#6B7597] text-[#F9F9F9] transition-all duration-300 hover:bg-[#565D7C] hover:text-[#F9F9F9] flex items-center gap-2">
                        <FontAwesomeIcon icon={faPlusSquare} />
                        Thay đổi dạng câu hỏi
                    </button>

                    {selectedTestTypes.length > 0 && (
                        <div className="mb-4">
                            <h3 className="font-medium text-gray-700 mt-3 mb-2">Các dạng câu hỏi đã chọn:</h3>
                            <div className="flex flex-wrap gap-2">
                                {selectedTestTypes.map(type => {
                                    const typeInfo = [
                                        { type: "TN", label: "Trắc nghiệm", color: "#f3712b" },
                                        { type: "ND", label: "Bài Nghe / Đọc", color: "#34A853" },
                                        { type: "DVOC", label: "Chọn từ đúng", color: "#fbbc05" },
                                        { type: "GC", label: "Ghép câu", color: "#ea4335" },
                                        { type: "TL", label: "Tự luận", color: "#46bdc6" },
                                    ].find(t => t.type === type);

                                    return (
                                        <span key={type} className="px-3 py-1 rounded-full text-white text-sm font-medium" style={{ backgroundColor: typeInfo?.color }}>
                                            {typeInfo?.label}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {selectedTestTypes.length > 0 && (
                        <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "24px", maxHeight: "50vh", overflowY: "auto" }}>

                            {/* TRẮC NGHIỆM */}
                            {selectedTestTypes.includes("TN") && (
                                <div>
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="font-medium text-[#f3712b]">Trắc nghiệm</h3>
                                        <Button onClick={() => handleAddQuestion("TN")} className="bg-[#f3712b] text-white hover:bg-[#e05f1d]">+ Thêm câu hỏi</Button>
                                    </div>
                                    <div style={{ maxHeight: "400px", overflowY: "auto", paddingRight: "10px" }}>
                                        {questionsTN.map((q, index) => (
                                            <div key={q.id} style={{ border: "1px solid #ddd", padding: "16px", borderRadius: "6px", marginBottom: "16px", backgroundColor: "#fafafa" }}>
                                                <div className="flex items-center justify-between mb-3">
                                                    <h4 className="font-medium text-gray-700">Câu {index + 1}</h4>
                                                    <Button onClick={() => handleRemoveQuestion("TN", index)} disabled={questionsTN.length === 1} danger size="small">Xóa câu hỏi</Button>
                                                </div>
                                                <Input size="large" placeholder="Nhập câu hỏi trắc nghiệm" value={q.question} onChange={(e) => handleChangeQuestion("TN", index, e.target.value)} style={{ marginBottom: "12px" }} />
                                                {q.answers?.map((answer, i) => (
                                                    <Input
                                                        key={answer.id}
                                                        size="large"
                                                        value={answer.text}
                                                        onChange={(e) => handleChangeAnswer("TN", index, i, e.target.value)}
                                                        style={{ width: "100%", marginBottom: "8px" }}
                                                        addonBefore={<Checkbox checked={answer.correct} onChange={() => handleToggleCorrect("TN", index, i)} />}
                                                        placeholder={`Đáp án ${i + 1}`}
                                                    />
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* BÀI NGHE/ĐỌC */}
                            {selectedTestTypes.includes("ND") && (
                                <div>
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="font-medium text-[#34A853]">Bài Nghe / Đọc</h3>
                                        <Button onClick={() => handleAddQuestion("ND")} className="bg-[#34A853] text-white hover:bg-[#2d9249]">+ Thêm câu hỏi</Button>
                                    </div>
                                    <div style={{ maxHeight: "400px", overflowY: "auto", paddingRight: "10px" }}>
                                        {questionsND.map((q, index) => (
                                            <div key={q.id} style={{ border: "1px solid #ddd", padding: "16px", borderRadius: "6px", marginBottom: "16px", backgroundColor: "#fafafa" }}>
                                                <div className="flex items-center justify-between mb-3">
                                                    <h4 className="font-medium text-gray-700">Câu {index + 1}</h4>
                                                    <Button onClick={() => handleRemoveQuestion("ND", index)} disabled={questionsND.length === 1} danger size="small">Xóa câu hỏi</Button>
                                                </div>
                                                <Input size="large" placeholder="Nhập câu hỏi nghe/đọc" value={q.question} onChange={(e) => handleChangeQuestion("ND", index, e.target.value)} style={{ marginBottom: "12px" }} />
                                                {q.answers?.slice(0, 2).map((answer, i) => (
                                                    <Input
                                                        key={answer.id}
                                                        size="large"
                                                        value={answer.text}
                                                        onChange={(e) => handleChangeAnswer("ND", index, i, e.target.value)}
                                                        style={{ width: "100%", marginBottom: "8px" }}
                                                        addonBefore={<Checkbox checked={answer.correct} onChange={() => handleToggleCorrect("ND", index, i)} />}
                                                        placeholder={i === 0 ? "Đáp án đúng" : "Đáp án sai"}
                                                    />
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* CHỌN TỪ ĐÚNG */}
                            {selectedTestTypes.includes("DVOC") && (
                                <div>
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="font-medium text-[#fbbc05]">Chọn từ đúng</h3>
                                        <Button onClick={() => handleAddQuestion("DVOC")} className="bg-[#fbbc05] text-white hover:bg-[#e6a904]">+ Thêm câu hỏi</Button>
                                    </div>
                                    <div style={{ maxHeight: "400px", overflowY: "auto", paddingRight: "10px" }}>
                                        {questionsDVOC.map((q, index) => (
                                            <div key={q.id} style={{ border: "1px solid #ddd", padding: "16px", borderRadius: "6px", marginBottom: "16px", backgroundColor: "#fafafa" }}>
                                                <div className="flex items-center justify-between mb-3">
                                                    <h4 className="font-medium text-gray-700">Câu {index + 1}</h4>
                                                    <Button onClick={() => handleRemoveQuestion("DVOC", index)} disabled={questionsDVOC.length === 1} danger size="small">Xóa câu hỏi</Button>
                                                </div>
                                                <Input size="large" placeholder="Nhập câu hỏi chọn từ đúng" value={q.question} onChange={(e) => handleChangeQuestion("DVOC", index, e.target.value)} style={{ marginBottom: "12px" }} />
                                                {q.answers?.map((answer, i) => (
                                                    <Input
                                                        key={answer.id}
                                                        size="large"
                                                        value={answer.text}
                                                        onChange={(e) => handleChangeAnswer("DVOC", index, i, e.target.value)}
                                                        style={{ width: "100%", marginBottom: "8px" }}
                                                        addonBefore={<Checkbox checked={answer.correct} onChange={() => handleToggleCorrect("DVOC", index, i)} />}
                                                        placeholder={`Lựa chọn ${i + 1}`}
                                                    />
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* GHÉP CÂU */}
                            {selectedTestTypes.includes("GC") && (
                                <div>
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="font-medium text-[#ea4335]">Ghép câu</h3>
                                        <Button onClick={addWordPair} disabled={wordPairs.length >= 30} className="bg-[#ea4335] text-white hover:bg-[#d33225]">+ Thêm cặp từ</Button>
                                    </div>
                                    <div style={{ maxHeight: "400px", overflowY: "auto", paddingRight: "10px" }}>
                                        {wordPairs.map((pair, index) => (
                                            <div key={index} style={{ display: "flex", gap: "8px", border: "1px solid #ddd", padding: "16px", borderRadius: "6px", marginBottom: "16px", alignItems: "center", backgroundColor: "#fafafa" }}>
                                                <div className="flex items-center mr-2">
                                                    <span className="font-medium text-gray-600">Cặp {index + 1}</span>
                                                </div>
                                                <Input size="large" placeholder="Từ/Câu 1" value={pair.word1} onChange={(e) => handleWordPairChange(index, "word1", e.target.value)} style={{ flex: 1 }} />
                                                <span className="text-gray-400">↔</span>
                                                <Input size="large" placeholder="Từ/Câu 2" value={pair.word2} onChange={(e) => handleWordPairChange(index, "word2", e.target.value)} style={{ flex: 1 }} />
                                               <button  onClick={() => removeWordPair(index)} disabled={wordPairs.length === 1}>
                                                   <FontAwesomeIcon icon={faTrashCan} className="text-red-700 hover:text-red-800 cursor-pointer !h-5 !w-4"/>
                                               </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* TỰ LUẬN */}
                            {selectedTestTypes.includes("TL") && (
                                <div>
                                    <h3 className="font-medium text-[#46bdc6] mb-3">Tự luận</h3>
                                    <ReactQuill value={selfAnswer} onChange={setSelfAnswer} className="min-h-[150px] mb-4" placeholder="Nhập câu hỏi tự luận hoặc hướng dẫn cho bài tập..." />
                                </div>
                            )}
                        </div>
                    )}
                </Modal>

                {/* PDF Modal */}
                <Modal
                    title={<span className="text-xl font-semibold text-[#333]">Add PDF by URL</span>}
                    open={showPDFModal}
                    onCancel={() => setShowPDFModal(false)}
                    footer={[
                        <Button size="large" key="cancel" onClick={() => setShowPDFModal(false)}>Cancel</Button>,
                        <Button size="large" key="submit" onClick={handleAddPDF} className=" !bg-[#6B7597] !text-white hover:!bg-[#565D7C] !transition">Add File</Button>,
                    ]}
                    centered
                    width={600}
                >
                    <form>
                        <div className="form-group mb-5">
                            <label htmlFor="urlPDF" className="form-label block mb-2 font-medium text-[#333]">PDF URL</label>
                            <input type="url" id="urlPDF" className="form-input1 w-full p-3 border border-[#ddd] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="https://example.pdf" value={pdfUrl} onChange={(e) => setPdfUrl(e.target.value)} />
                        </div>
                        <div className="form-group mb-5">
                            <label htmlFor="pdfDescription" className="form-label block mb-2 font-medium text-[#333]">PDF Description</label>
                            <ReactQuill value={pdfDesc} onChange={setPdfDesc} className="lesson-textarea w-full border border-[#d0d0d0] rounded-lg min-h-[100px]" placeholder="Nhập mô tả PDF" />
                        </div>
                    </form>
                </Modal>

                {/* Flashcard Modal */}
                <Modal
                    title={<span className="text-xl font-semibold text-[#f3712b]">Thêm từ vào flash Card</span>}
                    open={showFlashCardModal}
                    onCancel={() => setShowFlashCardModal(false)}
                    footer={[
                        <Button key="cancel" onClick={() => setShowFlashCardModal(false)}>Huỷ</Button>,
                        <Button key="add" onClick={addFlashCard} disabled={flashCards.length >= 30} className="bg-[#f3712b] text-white hover:bg-[#e05f1d]">+ Thêm cặp từ</Button>,
                        <Button key="submit" onClick={handleAddFlashCard} className="ml-3 !cursor-pointer px-4 py-2 !rounded-md !bg-[#6B7597] !text-white hover:!bg-[#565D7C] transition">Lưu</Button>,
                    ]}
                    centered
                    width={600}
                >
                    <div className="-mx-6 mt-3.5 border-t border-gray-300"></div>

                    <div className="p-5">
                        <h5 className="text-gray-600 text-xl mb-2">Giới hạn 30 cặp từ ({flashCards.length}/30)</h5>
                        <span className="text-gray-600">Điền cặp từ đúng để ghép thành câu</span>
                        <div className="mt-2.5 flex flex-col gap-5 max-h-[400px] overflow-y-auto pr-2.5">
                            {flashCards.map((card, idx) => (
                                <div key={idx} className="flex gap-2 items-center">
                                    <Input
                                        size="large"
                                        placeholder="Mặt trước"
                                        value={card.word1}
                                        onChange={(e) => handleFlashCardChange(idx, "word1", e.target.value)}
                                        className="flex-1"
                                    />
                                    <Input
                                        size="large"
                                        placeholder="Mặt sau"
                                        value={card.word2}
                                        onChange={(e) => handleFlashCardChange(idx, "word2", e.target.value)}
                                        className="flex-1"
                                    />
                                    <Button
                                        onClick={() => removeFlashCard(idx)}
                                        disabled={flashCards.length === 1}
                                        danger
                                        size="small"
                                    >
                                        <i className="fa fa-times"></i>
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="-mx-6 mt-3.5 mb-5 border-t border-gray-300"></div>
                </Modal>
                {/* Audio Modal */}
                <Modal
                    title={<span className="text-xl font-semibold text-[#f3712b]">Thêm Câu hỏi nghe và điền từ</span>}
                    open={showAudioModal}
                    onCancel={() => {
                        setShowAudioModal(false);
                    }}
                    footer={[
                        <Button key="cancel" onClick={() => setShowAudioModal(false)}>Huỷ</Button>,
                        <Button key="add" onClick={addAudioQuestion} className="bg-[#f3712b] text-white hover:bg-[#e05f1d]">+ Thêm câu hỏi</Button>,
                        <Button key="submit" onClick={handleAddAudio} className="!bg-[#6B7597] !text-white hover:!bg-[#565D7C] !transition]">Lưu</Button>,
                    ]}
                    centered
                    width={600}
                >
                    <div className="p-5">
                        <div className="max-h-[400px] overflow-y-auto pr-2.5">
                            {audioQuestions.map((q, idx) => (
                                <div key={q.id} className="flex flex-col gap-2 mb-4 p-3 border border-gray-200 rounded-lg">
                                    <div className="font-semibold text-gray-700">
                                        Câu {idx + 1}
                                    </div>
                                    <Input
                                        size="large"
                                        value={q.question || ""}
                                        placeholder="Câu hỏi"
                                        onChange={(e) => handleAudioQuestionChange(idx, e.target.value)}
                                    />
                                    <Input
                                        size="large"
                                        placeholder="Cụm từ đúng"
                                        value={q.answers?.[0]?.text?.toString() || ""}
                                        onChange={(e) => handleAudioAnswerChange(idx, e.target.value)}
                                    />
                                    <Button
                                        onClick={() => removeAudioQuestion(idx)}
                                        disabled={audioQuestions.length === 1}
                                        danger
                                        size="small"
                                        className="w-fit"
                                    >
                                        Xóa câu hỏi
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                </Modal>
            </section>
        </div>
    );
};

export default AddDataForLesson;