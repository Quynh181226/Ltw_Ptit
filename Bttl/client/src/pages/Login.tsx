// import { useState } from "react"
import ImgPtit from "../assets/ImgPtit.jpg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faEye, faEyeSlash, faKey} from "@fortawesome/free-solid-svg-icons"
import LoadingProcess from "../components/LoadingProcess.tsx";
// import {Link} from "react-router-dom";
import { useState, type FormEvent } from "react";
import "../styles/login.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/Hook";
import { login } from "../apis/UserApi";
// import LoadingProcess from "../components/LoadingProcess.tsx";
import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import {type User} from "../types/type.ts"
import { clearErr } from "../slices/UserSlice.ts"

export default function Login() {
    const [showPassword, setShowPassword] = useState(false)
    const [remember, setRemember] = useState(false)

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { loading, error } = useAppSelector((state) => state.user);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(clearErr());

        try {
            const res = await dispatch(login({ email: email.trim(), password: password.trim() })).unwrap();

            // const user: User = res.payload;

            const storage = remember ? localStorage : sessionStorage
            storage.setItem("userEmail", res.email)
            storage.setItem("isLoggedIn", "true")
            storage.setItem("currentUser", JSON.stringify(res))


            console.log("Login result:", res);


            toast.success("Login success!!");


            // if (login.rejected.match(res)) {
            //     toast.error("Invalid email or password");
            //     return;
            // }



            // if (login.fulfilled.match(res)) {
            //     toast.success("Login success!!");
                setTimeout(() => {
                    if (res.role === "admin") {
                        navigate("/categoryManagement");
                    } else {
                        // navigate("/dashboard");
                        navigate("/homePage");
                    }
                }, 2000);
            // }


        } catch (err: any) {

            // Server error

            // toast.error("Login failed!!");

            console.error("Login error:", err);

            if (err.message) {
                toast.error(err.message);
            } else if (typeof err === 'string') {
                toast.error(err);
            } else {
                toast.error("Đăng nhập thất bại!!");
            }
        }
    };
    return (
        <div className="min-h-screen bg-gradient-to-tl from-[#d4d7e2]/95 via-[#f2f3f7]/60 to-white/80 backdrop-blur-sm flex items-center">
            {loading && <LoadingProcess />}
            {/*{errors.login && <div className="mb-4 text-red-600 text-sm">{errors.login}</div>}*/}
            {/*{error && <div className="mb-4 text-red-600 text-sm">{error}</div>}*/}
            <div className="flex flex-col sm:flex-row p-5 gap-[10px] font-['FS_PF_BeauSans_Pro'] w-full mx-auto items-center sm:items-start">
                <div className="hidden sm:flex relative w-[80%] h-[95vh] rounded-3xl overflow-hidden flex-col items-center bg-cover bg-center bg-no-repeat">
                    <img src={ImgPtit} alt="Bg" className="absolute w-[80%] h-full left-5 rounded-3xl object-cover"/>
                    <div className="absolute top-[6%] left-12">
                        <div className="flex items-center gap-2 text-[#6a7698] rotate-[-4deg] skew-y-[-3deg]">
                            <svg xmlns="http://www.w3.org/2000/svg" height="60px" viewBox="0 -960 960 960" width="60px" fill="#6a7698">
                                <path d="M480-120q-18 0-34.5-6.5T416-146L163-400h113l197 197q2 2 3.5 2.5t3.5.5q2 0 3.5-.5t3.5-2.5l267-268q23-23 35-54.5t12-64.5q-2-69-46-118.5T645-758q-31 0-59.5 12T536-711l-27 29q-5 6-13 9.5t-16 3.5q-8 0-16-3.5t-14-9.5l-27-29q-21-23-49-36t-60-13q-54 0-93.5 34.5T167-640H85q17-85 79.5-142.5T314-840q48 0 90.5 19t75.5 53q32-34 74.5-53t90.5-19q100 0 167.5 74T880-590q0 49-17 94t-51 80L543-146q-13 13-29 19.5t-34 6.5Zm-5-360H80v-80h555q17 0 28.5-11.5T675-600q0-17-11.5-28.5T635-640q-14 0-25 7.5T596-611l-77-21q11-39 43-63.5t73-24.5q50 0 85 35t35 85q0 50-35 85t-85 35h-47q3 10 5 19.5t2 20.5q0 50-35 85t-85 35q-41 0-73-24.5T359-408l77-21q3 14 14 21.5t25 7.5q17 0 28.5-11.5T515-440q0-17-11.5-28.5T475-480Zm9 0Z"/>
                            </svg>
                            <span className="font-['Dancing_Script',cursive] font-semibold tracking-wide italic transform text-[1.8rem]">
                              UniLife Hub
                            </span>
                        </div>
                    </div>
                </div>
                <div className="w-full sm:w-[60%] sm:mt-[86px] sm:p-0 flex justify-center">
                    <div className="bg-white/90 sm:bg-transparent border border-gray-200 sm:border-none rounded-2xl sm:rounded-none shadow-md sm:shadow-none px-8 py-10 w-[90%] sm:w-[80%]">
                        <div className="flex sm:hidden justify-center mb-6">
                            <div className="flex items-center gap-2 text-[#6a7698] rotate-[-3.5deg]">
                                <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#6a7698">
                                    <path d="M480-120q-18 0-34.5-6.5T416-146L163-400h113l197 197q2 2 3.5 2.5t3.5.5q2 0 3.5-.5t3.5-2.5l267-268q23-23 35-54.5t12-64.5q-2-69-46-118.5T645-758q-31 0-59.5 12T536-711l-27 29q-5 6-13 9.5t-16 3.5q-8 0-16-3.5t-14-9.5l-27-29q-21-23-49-36t-60-13q-54 0-93.5 34.5T167-640H85q17-85 79.5-142.5T314-840q48 0 90.5 19t75.5 53q32-34 74.5-53t90.5-19q100 0 167.5 74T880-590q0 49-17 94t-51 80L543-146q-13 13-29 19.5t-34 6.5Zm-5-360H80v-80h555q17 0 28.5-11.5T675-600q0-17-11.5-28.5T635-640q-14 0-25 7.5T596-611l-77-21q11-39 43-63.5t73-24.5q50 0 85 35t35 85q0 50-35 85t-85 35h-47q3 10 5 19.5t2 20.5q0 50-35 85t-85 35q-41 0-73-24.5T359-408l77-21q3 14 14 21.5t25 7.5q17 0 28.5-11.5T515-440q0-17-11.5-28.5T475-480Zm9 0Z"/>
                                </svg>
                                <span className="font-['Dancing_Script',cursive] font-semibold italic text-[1.6rem]">
                                    UniLife Hub
                                </span>
                            </div>
                        </div>
                        <span className="text-[28px] sm:text-[32px] font-bold text-[#3D3D3D] block text-center sm:text-left">
                        Đăng Nhập
                        </span>
                        <span className="block text-sm text-[#676767] text-center sm:text-left mt-1">
                        Đăng nhập tài khoản để truy cập vào UniLife Hub nào !!
                        </span>
                        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-[10px] mt-6">
                            <label htmlFor="email1" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <div className="flex items-center mt-1">
                            <span className="flex items-center justify-center bg-[#6a7698] px-3 py-3.5 rounded-l-md">
                            <FontAwesomeIcon icon={faEnvelope} className="text-[#f4eeee]"/>
                            </span>
                                <input type="email" id="email1" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Nhập email" className="w-full border border-gray-300 rounded-r-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6a7698]"/>
                            </div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mt-3">
                                Mật khẩu
                            </label>
                            <div className="flex items-center mt-1">
                                <span className="flex items-center justify-center bg-[#6a7698] px-3 py-3.5 rounded-l-md">
                                <FontAwesomeIcon icon={faKey} className="text-[#f4eeee]"/>
                                </span>
                                <div className="relative w-full">
                                    <input type={showPassword ? "text" : "password"} id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Nhập mật khẩu" className="w-full border border-gray-300 rounded-r-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#6a7698]"/>
                                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"/>
                                </div>
                            </div>
                            <a className="text-[#6a7698] text-[12px] cursor-pointer w-fit mt-2">
                                Quên Mật Khẩu
                            </a>
                            <div className="flex flex-col gap-4 mt-3">
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" id="remember" checked={remember} onChange={() => setRemember(!remember)}/>
                                    <label htmlFor="remember" className="text-sm text-[#676767]">
                                        Lưu thông tin đăng nhập
                                    </label>
                                </div>
                                <button type="submit" disabled={loading} className="relative border border-[#5a637d] bg-[#7d88a8] hover:bg-[#6a7698] text-white font-bold text-[16px] rounded-2xl h-[5vh] shadow-[0_6px_0_#5a637d] cursor-pointer overflow-hidden hover:-translate-y-[1px] hover:shadow-[0_9px_0_#5a637d] transition-all">
                                    <span className="relative z-10">Đăng Nhập</span>
                                    <div className="absolute inset-0 bg-[linear-gradient(-115deg,#6a7698_60%,#7d88a7_60%,#7d88a7_62%,#6a7698_62%,#6a7698_65%,#7d88a7_65%,#7d88a7_70%,#6a7698_70%,#6a7698_73%,#7d88a7_73%,#7d88a7_75%,#6a7698_75%)] z-0 pointer-events-none"></div>
                                </button>
                                <p className="text-center text-gray-600 mt-4">
                                    Bạn chưa có tài khoản? <Link to="/" className="text-[#6a7698] hover:text-[#5a637d]">Sign up</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            </div>
            )

}



