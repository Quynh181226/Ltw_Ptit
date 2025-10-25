import QuizItem from "./QuizItem";
import { type Quiz } from "../types/type";

interface QuizListProps {
    quizzes: Quiz[];
}

const QuizList = ({ quizzes }: QuizListProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {quizzes.map((quiz) => (
                <QuizItem key={quiz.id} {...quiz} />
            ))}
        </div>
    );
};

export default QuizList;