import { useState, useEffect, useCallback } from 'react';
import Header2 from "../components/Header2.tsx";
import handleLogout from "../components/handleLogout.tsx";
import Footer1 from '../components/Footer1.tsx';
import popSound from "../sounds/pop.mp3";
import gameOverSound from "../sounds/gameOver.mp3";
import errorSound from "../sounds/error.mp3";
import clickSound from "../sounds/click.mp3";

const BubbleGame= () => {
    const [timer, setTimer] = useState<number>(30);
    const [score, setScore] = useState<number>(0);
    const [hits, setHits] = useState<number>(0);
    const [gameStarted, setGameStarted] = useState<boolean>(false);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [bubbles, setBubbles] = useState<number[]>([]);

    const popAudio = new Audio(popSound);
    const gameOverAudio = new Audio(gameOverSound);
    const errorAudio = new Audio(errorSound);
    const clickAudio = new Audio(clickSound);

    const generateBubbles = useCallback(() => {
        const newBubbles = Array.from({ length: 91 }, () =>
            Math.floor(Math.random() * 10)
        );
        setBubbles(newBubbles);
    }, []);

    const generateHits = useCallback(() => {
        const newHit = Math.floor(Math.random() * 10);
        setHits(newHit);
    }, []);

    const handleBubbleClick = (bubbleValue: number) => {
        if (!gameStarted || gameOver) return;

        if (bubbleValue === hits) {
            popAudio.play();
            setScore(prev => prev + 10);
            generateBubbles();
            generateHits();
        }else{
            errorAudio.play();
        }
    };

    const startGame = () => {
        clickAudio.play();
        // setTimeout(()=>{
            setGameStarted(true);
            setGameOver(false);
            setTimer(30);
            setScore(0);
            generateBubbles();
            generateHits();
        // }, 100)
    };

    const restartGame = () => {
        startGame();
    };

    useEffect(() => {
        if (gameStarted && !gameOver && timer > 0) {
            const interval = setInterval(() => {
                setTimer(prev => {
                    if (prev <= 1) {
                        gameOverAudio.play();
                        setGameOver(true);
                        setGameStarted(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [gameStarted, gameOver, timer]);

    return (
        <>
            <Header2 onLogout={handleLogout}/>
            <div className="min-h-screen bg-[#F7F8FB] flex flex-col items-center justify-center p-4">
               <div className="flex flex-row justify-center gap-2">
                    <span className="mb-5 text-[#8C95B1] text-3xl font-bold">
                        BubbleGame
                    </span>
                   <div className="loader">
                       <div className="bar"></div>
                       <div className="bar"></div>
                       <div className="bar"></div>
                       <div className="bar"></div>
                       <div className="bar"></div>
                   </div>
               </div>
                <span className="mb-8 text-[#676767] text-sm font-normal">
                    Trò chơi phản xạ nhanh – chạm bong bóng, ghi điểm, xả stress sau những giờ học căng não!!
                </span>
                <div className="border-2 border-[#6B7596] w-full max-w-4xl h-146 rounded-lg overflow-hidden shadow-lg">
                    {/* Navbar */}
                    <div className="bg-[#6B7596] w-full h-1/8 flex justify-evenly items-center">
                        <div className="flex items-center gap-2">
                            <h3 className="text-white font-bold text-lg">Hits</h3>
                            <div
                                className="bg-white w-10 h-10 flex items-center justify-center font-bold rounded text-[#6B7596] text-lg">
                                {hits}
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <h3 className="text-white font-bold text-lg">Time</h3>
                            <div
                                className="bg-white w-10 h-10 flex items-center justify-center font-bold rounded text-[#6B7596] text-lg">
                                {timer}
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <h3 className="text-white font-bold text-lg">Score</h3>
                            <div
                                className="bg-white w-10 h-10 flex items-center justify-center font-bold rounded text-[#6B7596] text-lg">
                                {score}
                            </div>
                        </div>
                        <style>
                            {`
                                .loader {
                                    display: flex;
                                    // justify-content: end;
                                    margin-top: 8px
                                }
                        
                                .bar {
                                    width: 3px;
                                    height: 13.5px;
                                    margin: 0 2px;
                                    background-color: #000;
                                    border-radius: 4px;
                                    animation: loader 1s ease-in-out infinite;
                                }
                        
                                .bar:nth-child(1) {
                                    animation-delay: 0s;
                                }
                        
                                .bar:nth-child(2) {
                                    animation-delay: 0.1s;
                                }
                        
                                .bar:nth-child(3) {
                                    animation-delay: 0.2s;
                                }
                        
                                .bar:nth-child(4) {
                                    animation-delay: 0.3s;
                                }
                        
                                .bar:nth-child(5) {
                                    animation-delay: 0.4s;
                                }
                        
                                @keyframes loader {
                                    0% {
                                        transform: scale(1);
                                    }
                        
                                    20% {
                                        transform: scale(1, 2);
                                    }
                        
                                    40% {
                                        transform: scale(1);
                                    }
                                }
                            `}
                        </style>
                    </div>

                    {/* Game Content */}
                    <div
                        className="bg-[#FAFBFC] w-full h-4/5 overflow-hidden flex flex-wrap justify-center items-center p-2 relative">
                    {!gameStarted && !gameOver && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <button
                                    onClick={startGame}
                                    className="cursor-pointer bg-[#8B93AF] hover:bg-[#6B7596] text-white font-bold px-6 rounded-lg transition-colors w-32 h-10"
                                >
                                    Start
                                </button>
                            </div>
                        )}

                        {gameOver && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-90">
                                <h1 className="text-3xl font-bold text-[#6B7596] mb-4 text-center">
                                    Game Over
                                </h1>
                                <button
                                    onClick={restartGame}
                                    className="px-6 py-[10px] rounded-[5px] cursor-pointer text-base bg-[#6B7596] text-[#F9F9F9] transition-all duration-300 hover:bg-[#565D7C] hover:text-[#F9F9F9] flex items-center gap-2"
                                >
                                    Restart
                                </button>
                            </div>
                        )}

                        {gameStarted && !gameOver && (
                            <div className="w-full h-full overflow-y-auto">
                                <div className="flex flex-wrap gap-2 justify-center p-3">
                                    {bubbles.map((bubble, index) => (
                                        <div
                                            key={index}
                                            onClick={() => handleBubbleClick(bubble)}
                                            className="w-12 h-12 !border-[2px] !border-[#E57373] !bg-[#F5D2D2] text-[#C74B4B] font-bold text-lg rounded-full flex items-center justify-center m-1 cursor-pointer hover:!bg-[#E57373] hover:!text-white hover:!border-[#E57373] transition-colors duration-200"
                                        >
                                            {bubble}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="mt-[-106px]"></div>
            <Footer1 />
        </>
    );
};

export default BubbleGame;
