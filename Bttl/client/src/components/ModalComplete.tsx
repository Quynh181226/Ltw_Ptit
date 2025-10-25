import { Button, Modal } from "antd"
import {useNavigate} from "react-router-dom";

interface ModalProps {
    open: boolean
    onClose: () => void
    score: number
    totalQuestions: number
    correctAnswers: number
    wrongAnswers: number
}

const ModelComplete = ({ open, onClose, score, totalQuestions, correctAnswers, wrongAnswers }: ModalProps) => {
    const navigate = useNavigate();

    return (
        <Modal open={open} onCancel={onClose}centered width={450}
               footer={[
                   <Button key="reset" type="primary" onClick={() =>{
                                                           onClose();
                                                           navigate(0)
                                                           // setCurrentQuestionIndex(0);
                                                           // setScore(0);
                                                           // setCorrectAnswers(0);
                                                           // setWrongAnswers(0);
                                                           // setSelectedAnswers([]);
                                                       }}>
                       Retry
                   </Button>,
                   <Button key="home" type="primary" onClick={()=>navigate("/dashboard")} className="!bg-[#198754]">
                       Home
                   </Button>
               ]}
        >
            <hr className="-mx-6 mt-8 mb-4 border-t border-gray-300"/>

            <h2 className="text-[#212529] font-medium text-center text-[29.4px] leading-[38.4px] mb-3" style={{ fontFamily: "sans-serif" }}>Completed</h2>

            <div className="bg-[#D1E7DD] border border-[#A3CFBB] rounded-md p-4 text-center text-[#0A3622] mb-6">
                <p className="mb-2 text-lg font-medium">Congratulations!!</p>
                <p >You have completed the test</p>
                <hr className="mt-3 mb-2 border-t border-[#0A3622]/25" />
                <p className="text-lg font-semibold">
                    Your score: <span>{score}%</span>
                </p>
            </div>

            <div className="border border-gray-300 rounded-md overflow-hidden">
                <div className="bg-[rgba(33,37,41,0.03)] text-[#212529] font-medium text-center text-[19.7px] leading-[24px] p-3" style={{ fontFamily: "sans-serif"}}>
                    Detailed results
                </div>

                <hr className="-mx-6 border-t border-gray-300"/>

                <div className="p-4 text-center bg-white">
                    <p className="mb-2 font-medium">
                        Total questions:
                        <span className="font-normal"> {totalQuestions}</span>
                    </p>
                    <p className="mb-2 font-medium">
                        Correct answers:
                        <span className="font-normal"> {correctAnswers}</span>
                    </p>
                    <p className="mb-2 font-medium">
                        Wrong answers:
                        <span className="font-normal"> {wrongAnswers}</span>
                    </p>
                </div>
            </div>

            <hr className="-mx-6 mt-7 mb-5 border-t border-gray-300"/>
        </Modal>
    )
}

export default ModelComplete;