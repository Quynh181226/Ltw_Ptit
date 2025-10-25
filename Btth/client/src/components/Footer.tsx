import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faLocationDot, faPhone} from "@fortawesome/free-solid-svg-icons";
import footerBg from "../assets/footerBg.png";

const Footer = () => {
    return (
       //  // className="!mt-15"
       // <footer className="bg-gray-800 text-white text-center w-full !p-3">
       //     {/*<div className="bg-gray-800 text-white text-center w-full">*/}
       //         <p>&copy; 2025 Quiz App. All rights reserved.</p>
       //     {/*</div>*/}
       // </footer>
        <div className="relative !bg-gray-100 !text-gray-700 pt-5">
            <div className="flex items-center mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="60px" fill="#6a7698"><path d="M480-120q-18 0-34.5-6.5T416-146L163-400h113l197 197q2 2 3.5 2.5t3.5.5q2 0 3.5-.5t3.5-2.5l267-268q23-23 35-54.5t12-64.5q-2-69-46-118.5T645-758q-31 0-59.5 12T536-711l-27 29q-5 6-13 9.5t-16 3.5q-8 0-16-3.5t-14-9.5l-27-29q-21-23-49-36t-60-13q-54 0-93.5 34.5T167-640H85q17-85 79.5-142.5T314-840q48 0 90.5 19t75.5 53q32-34 74.5-53t90.5-19q100 0 167.5 74T880-590q0 49-17 94t-51 80L543-146q-13 13-29 19.5t-34 6.5Zm-5-360H80v-80h555q17 0 28.5-11.5T675-600q0-17-11.5-28.5T635-640q-14 0-25 7.5T596-611l-77-21q11-39 43-63.5t73-24.5q50 0 85 35t35 85q0 50-35 85t-85 35h-47q3 10 5 19.5t2 20.5q0 50-35 85t-85 35q-41 0-73-24.5T359-408l77-21q3 14 14 21.5t25 7.5q17 0 28.5-11.5T515-440q0-17-11.5-28.5T475-480Zm9 0Z"/></svg>
                <h2 className="text-xl md:text-2xl font-bold">UniLife Hub</h2>
                <p className="text-gray-400 text-xl mx-2">|</p>
                <span className="text-sm md:text-base font-semibold">
                    HỌC TẬP PHÁT TRIỂN – KIẾN TẠO TRI THỨC – VƯƠN TỚI TƯƠNG LAI                    </span>
            </div>
            {/*<div className="mx-auto grid grid-cols-5 gap-10 px-6">*/}
            {/*    <div className="grid grid-rows-3 text-sm">*/}
            <div className="mx-auto grid grid-cols-2  md:grid-cols-5 gap-6 px-6">
                {/*<div className="mx-auto grid grid-cols-2 md:grid-cols-5 gap-6 px-6 justify-items-center md:justify-items-start">*/}

                <div className="text-sm space-y-3">

                    <div>
                        <h4 className="font-semibold mb-2">Thông tin liên hệ</h4>
                        <p className="flex items-start gap-2 mb-1">
                            <FontAwesomeIcon icon={faLocationDot} className="text-[#434343] text-xl" />
                            <span>
                                    Địa chỉ: Số 96A Trần Phú, phường Hà Đông, thành phố Hà Nội
                                </span>
                        </p>
                        <p className="flex items-center gap-2 mb-1">
                            <FontAwesomeIcon icon={faPhone} className="text-[#434343] text-xl" />
                            <span>Hotline: 0338771704</span>
                        </p>
                        <p className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faEnvelope} className="text-[#434343] text-xl" />
                            <span>Email: quynh2682@icloud.com</span>
                        </p>
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold text-lg mb-2">Về UniLife Hub</h3>
                    <ul className="space-y-1">
                        <li>Giới thiệu</li>
                        <li>Liên hệ</li>
                        <li>Điều khoản bảo mật</li>
                        <li>Điều khoản sử dụng</li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold text-lg mb-2">Tài nguyên</h3>
                    <ul className="space-y-1">
                        <li>Thư viện đề thi</li>
                        <li>Blog</li>
                        <li>Tổng hợp tài liệu</li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold text-lg mb-2">Chính sách chung</h3>
                    <ul className="space-y-1">
                        <li>Hướng dẫn sử dụng</li>
                        <li>Hướng dẫn thanh toán</li>
                        <li>Chính sách kiểm hàng</li>
                        <li>Phản hồi, khiếu nại</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold mb-2">Theo dõi chúng tôi tại</h4>
                    <div className="flex gap-4 mt-3 text-xl">
                        <i className="fab fa-facebook"></i>
                        <i className="fab fa-instagram"></i>
                        <i className="fab fa-twitter"></i>
                        <i className="fab fa-tiktok"></i>
                    </div>
                </div>
            </div>

            <p className="px-6 text-sm text-gray-500 mt-15 p-3 bg-gray-200">
                &copy; UniLife Hub.Com - Bản quyền thuộc Công ty TNHH Công Nghệ UniLife Hub
            </p>

            <img src={footerBg} className="absolute bottom-0 left-0 w-full h-[90%] bg-bottom bg-no-repeat bg-contain opacity-10"></img>
        </div>
    );
};

export default Footer;