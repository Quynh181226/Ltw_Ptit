import React, { useState, useRef, useEffect } from 'react';
import Header2 from "../components/Header2.tsx";
import handleLogout from "../components/handleLogout.tsx";
import Footer1 from "../components/Footer1.tsx";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface Lap {
  id: number;
  time: string;
  lapNumber: number;
}

const WatchTimer = () => {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [laps, setLaps] = useState<Lap[]>([]);

  const intervalRef = useRef<number | null>(null);
  const lapCounterRef = useRef<number>(0);

  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = Math.floor((time % 1000) / 10);

  const padTime = (time: number): string => time.toString().padStart(2, '0');

  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true);
      const startTime = Date.now() - time;

      intervalRef.current = window.setInterval(() => {
        const currentTime = Date.now() - startTime;
        setTime(currentTime);
      }, 10);
    }
  };

  const handlePause = () => {
    if (isRunning && intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    if (intervalRef.current !== null) clearInterval(intervalRef.current);
    setIsRunning(false);
    setTime(0);
    setLaps([]);
    lapCounterRef.current = 0;
  };

  const handleLap = () => {
    if (isRunning) {
      const lapTime = `${padTime(minutes)}:${padTime(seconds)}:${padTime(milliseconds)}`;
      const newLap: Lap = {
        id: Date.now(),
        time: lapTime,
        lapNumber: ++lapCounterRef.current,
      };
      setLaps(prev => [...prev, newLap]);
    }
  };

  const handleDeleteLap = (id: number) => {
    setLaps(prev => prev.filter(lap => lap.id !== id));
  };

  const handleDeleteAll = () => {
    setLaps([]);
    lapCounterRef.current = 0;
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) clearInterval(intervalRef.current);
    };
  }, []);

  return (
      <>
        <Header2 onLogout={handleLogout}/>
        <div className="min-h-screen bg-[#FAFBFC] flex flex-col items-center justify-center p-4">
          <main className="w-full max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-center mb-3 text-black">
              Watch Timer
            </h1>

            <p className="text-[#676767] text-center text-md font-normal mb-8">
              Theo dõi thời gian cùng học tập hiệu quả!!
            </p>

            {/* Timer Display */}
            <div className="flex xl:ml-[23.5%] md:ml-[21%] sm:ml-[12.5%] flex-wrap justify-center items-center gap-4 mb-8 w-120 bg-[#F5D2D2] border-4 border-black py-5 px-6 rounded-3xl">
              <div className="border-4 rounded-2xl border-gray-700 bg-yellow-400 w-30 h-30 flex items-center justify-center text-4xl font-mono">
                {padTime(minutes)}
              </div>
              <div className="border-4 rounded-2xl border-gray-700 bg-blue-400 w-30 h-30 flex items-center justify-center text-4xl font-mono">
                {padTime(seconds)}
              </div>
              <div className="border-4 rounded-2xl border-gray-700 bg-green-600 w-30 h-30 flex items-center justify-center text-4xl font-mono">
                {padTime(milliseconds)}
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap justify-center gap-4 mb-4">
              <button
                  onClick={handleStart}
                  disabled={isRunning}
                  className="cursor-pointer font-semibold bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded disabled:opacity-50"
              >
                Start
              </button>
              <button
                  onClick={handlePause}
                  disabled={!isRunning}
                  className="cursor-pointer font-semibold bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded disabled:opacity-50"
              >
                Pause
              </button>
              <button
                  onClick={handleReset}
                  className="cursor-pointer font-semibold bg-teal-700 hover:bg-teal-800 text-white px-6 py-3 rounded"
              >
                Reset
              </button>
              <button
                  onClick={handleLap}
                  disabled={!isRunning}
                  className="cursor-pointer font-semibold bg-amber-700 hover:bg-amber-800 text-white px-6 py-3 rounded disabled:opacity-50"
              >
                Lap
              </button>
              <button
                  onClick={handleDeleteAll}
                  disabled={laps.length === 0}
                  className="cursor-pointer font-semibold bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded disabled:opacity-50"
              >
                Delete All
              </button>
            </div>

            <ul className="border-2 border-black max-h-40 overflow-y-auto divide-y divide-black">
              {laps.length === 0 && <li className="p-2 text-center text-gray-600">No laps recorded</li>}
              {laps.map(lap => (
                  <li key={lap.id} className="flex justify-between items-center p-2 bg-amber-50">
              <span>
                <strong>Lap {lap.lapNumber}: </strong>{lap.time}
              </span>
                    <button onClick={() => handleDeleteLap(lap.id)} className="cursor-pointer text-red-800 hover:text-red-900">
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </li>
              ))}
            </ul>
          </main>
        </div>
        <div className="mt-[-106px]"></div>
        <Footer1 />
      </>
  );
};

export default WatchTimer;