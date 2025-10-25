import { useState } from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash, faKey} from "@fortawesome/free-solid-svg-icons";
import Header2 from "../components/Header2.tsx";
import handleLogout from "../components/handleLogout.tsx";
import Footer1 from "../components/Footer1.tsx";

interface WeatherData {
    name: string;
    main: {
        temp: number;
        humidity: number;
    };
    wind: {
        speed: number;
    };
    weather: { description: string; icon: string }[];
}

const Weather = () => {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState<WeatherData | null>(null);

    // API key OpenWeatherMap
    const apiKey = "53125ee6e7270332074e69503c2187c5";

    const fetchWeather = async () => {
        if (!city.trim()) return;
        try {
            const res = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=vi`
            );
            if (!res.ok) throw new Error("Không tìm thấy thành phố");
            const data: WeatherData = await res.json();
            setWeather(data);
        } catch (err: any) {
            alert(err.message);
            setWeather(null);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") fetchWeather();
    };

    // Map icon OpenWeatherMap -> emoji
    const getWeatherIcon = (desc: string) => {
        if (desc.includes("mưa")) return "🌧️";
        if (desc.includes("nắng")) return "☀️";
        if (desc.includes("mây")) return "☁️";
        if (desc.includes("bão")) return "🌩️";
        return "❓";
    };

    return (
        <div className="min-h-screen">
            <Header2 onLogout={handleLogout}/>
            <div className="min-h-screen bg-[#FAFBFC] flex flex-col items-center p-6">
                <h2 className="text-3xl font-bold text-blue-700 mb-6">Thời tiết</h2>

                <div className=" gap-2 flex justify-center mb-6">
                    <div className="flex items-center mt-1">
                        <div className="relative">
                            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} onKeyPress={handleKeyPress} placeholder="Nhập tỉnh thành phố" className="w-[200%] border-3 border-gray-300 rounded-l-md px-3 py-2 pl-3 pr-5 focus:outline-none focus:ring-2 focus:ring-[#B2D3FC]"/>
                        </div>
                        <span onClick={fetchWeather} className="cursor-pointer flex items-center justify-center bg-[#8A93AE] px-5 py-2.5 ml-37 rounded-r-md z-50">
                            <p className="text-[#f4eeee]">Search</p>
                        </span>
                    </div>

                </div>

                {weather && (
                    <div className="max-w-md w-full bg-white rounded-xl shadow p-6 flex flex-col gap-4">
                        <h4 className="text-xl font-bold text-left capitalize">{weather.name}</h4>
                        <div className="flex items-center gap-4">
                            <span className="text-7xl">{getWeatherIcon(weather.weather[0].description)}</span>
                            <p className="text-4xl font-bold m-0">{weather.main.temp}°C</p>
                            <div className="flex flex-col text-left">
                                <p className="capitalize text-[#676767] font-semibold text-md mb-2">{weather.weather[0].description}</p>
                                <p>Độ ẩm: <span className="text-[#676767]">{weather.main.humidity} %</span></p>
                                <p>Tốc độ gió:  <span className="text-[#676767]">{weather.wind.speed} km/h</span></p>
                            </div>
                        </div>
                    </div>
                )}
                <div className="flex items-center gap-4 mt-20">
                    <p className="text-[#676767] text-md  font-semibold">Note: </p>
                    <p>Tra cứu với key tỉnh, mã nước viết tắt </p>
                </div>
                <p className="text-[#676767]">
                    <span className="text-[#676767] text-md  font-semibold">Ex: </span>
                    Da Nang, VN
                </p>
            </div>
            <div className="mt-[-105px]"></div>
            <Footer1 />
        </div>
    );
};

export default Weather;











{/*<input*/}
{/*    type="text"*/}
{/*    placeholder="Nhập thành phố..."*/}
{/*    className="flex-1 p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"*/}
{/*    value={city}*/}
{/*    onChange={(e) => setCity(e.target.value)}*/}
{/*    onKeyPress={handleKeyPress}*/}
{/*/>*/}
{/*<button*/}
{/*    className="bg-pink-500 text-white px-4 rounded hover:bg-pink-600 transition"*/}

{/*>*/}
{/*    Tìm kiếm*/}
{/*</button>*/}
{/*<div className="input-group my-4">*/}
{/*    <input type="text" value={city} onChange={(e) => setCity(e.target.value)} onKeyPress={handleKeyPress} className="form-control" id="cityInput" placeholder="Nhập thành phố..."/>*/}
{/*    <button onClick={fetchWeather} className="btn btn-primary" id="searchBtn">Tìm kiếm</button>*/}
{/*</div>*/}

