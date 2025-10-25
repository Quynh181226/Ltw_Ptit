import { Button } from 'antd';

interface HeroSectionProps {
    onRandomQuiz: () => void;
}
const HeroSection = ({onRandomQuiz}: HeroSectionProps) => {
    return (
        <section className="bg-[#CFADC1] text-center pt-8 pb-6">
            <h2 className="text-white text-2xl sm:text-3xl font-bold mb-5">
                Let's try a random puzzle 🎲
            </h2>
            <Button type="primary" onClick={onRandomQuiz} className="!bg-[#F5D2D2] !border-[#E57373] !text-[#C74B4B] hover:!bg-[#E57373] hover:!text-white hover:!border-[#E57373] transition-colors duration-200">
                Play
            </Button>
        </section>
    );
};

export default HeroSection;