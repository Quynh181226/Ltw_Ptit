import { useState } from "react";
import Header2 from "../components/Header2.tsx";
import handleLogout from "../components/handleLogout.tsx";
// import Footer from "../components/Footer.tsx";
import Vector from "../assets/Vector.svg"
import Footer1 from "../components/Footer1.tsx";

const Introduce = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Header2 onLogout={handleLogout}/>
            <div
                style={{
                    backgroundColor: "FFF3EE",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                    padding: "1rem",
                }}
            >
                {/* Header */}

                <h1
                    style={{
                        fontSize: "3rem",
                        color: "indianred",
                        fontFamily: '"Berkshire Swash", cursive',
                        textAlign: "center",
                        marginBottom: "0.5rem",
                    }}
                >
                    Chào mừng bạn đến với UniLife Hub!!
                </h1>
                <h2
                    style={{
                        fontSize: "1.4rem",
                        color: "#333",
                        fontFamily: '"Berkshire Swash", cursive',
                        textAlign: "center",
                        marginBottom: "1.5rem",
                    }}
                >
                    Thông tin chi tiết về website của chúng tôi:
                </h2>

                {/* Open Button */}
                <button onClick={() => setIsOpen(true)} className="   border border-gray-400 bg-gray-100 text-gray-700 rounded-md px-4 py-2 font-sans font-semibold text-lg cursor-pointer transition-colors duration-200 ease-in-out hover:bg-gray-200 active:bg-gray-300">
                    Click
                </button>


                {/* Dialog */}
                {isOpen && (
                    <div
                        style={{
                            position: "fixed",
                            inset: 0,
                            backgroundColor: "rgba(0,0,0,0.3)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: "1rem",
                            zIndex: 50,
                        }}
                    >
                        <div
                            style={{
                                width: "60%",
                                height: "87%",
                                backgroundColor: "white",
                                position: "relative",
                                // padding: "1.5rem",
                                fontFamily: "sans-serif",
                                color: "#555",
                                overflowY: "auto",
                                borderRadius: "0.5rem",
                            }}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setIsOpen(false)}
                                style={{
                                    // width: "80px",
                                    // height: "30px",
                                    // fontSize: "0.9rem",
                                    // border: "none",
                                    // borderRadius: "3px",
                                    // backgroundColor: "hsl(0,0%,20%)",
                                    // color: "#fff",
                                    cursor: "pointer",
                                    position: "absolute",
                                    top: "1.5rem",
                                    right: "1.5rem",
                                }}
                            >
                                <img src={Vector}/>
                            </button>

                            <div className="w-full h-px bg-gray-300  mt-16"></div>

                            {/* Content */}
                            <ul style={{
                                listStyleType: "none",
                                paddingLeft: "2rem",
                                margin: "3rem auto",
                                fontFamily: "'Berkshire Swash', cursive",
                                color: "#555",
                                lineHeight: "1.8",
                            }}>
                                <li style={{ marginBottom: "40px" }}>
                                    <h4 style={{ margin: 0, fontWeight: 600, fontSize: "1.8rem", color: "#CD5C5C" }}>
                                        Giới thiệu về UniLife Hub
                                    </h4>
                                    <h4 style={{ margin: 0, fontWeight: 600, fontSize: "1.4rem", color: "#555555" }}>
                                        UniLife Hub là gì?
                                    </h4>
                                    <p style={{ marginTop: "12px", fontSize: "1.2rem" }}>
                                        <strong>UniLife Hub</strong> – tên gọi mang ý nghĩa <em>“Website kết nối cuộc sống và học tập năng động cho sinh viên”</em>.
                                        <br />
                                        <strong>Uni</strong>: Đại diện cho <em>University</em> (Đại học) hoặc <em>unity</em> (sự kết nối), nhấn mạnh môi trường học tập gắn kết.
                                        <br />
                                        <strong>Life</strong>: Biểu thị <em>cuộc sống học tập năng động</em>, nơi học viên vừa học vừa trải nghiệm và phát triển kỹ năng toàn diện.
                                        <br />
                                        <strong>Hub</strong>: Là <em>trung tâm kết nối tri thức, trải nghiệm và cộng đồng học tập</em>.
                                    </p>
                                    <p style={{ marginTop: "14px", fontSize: "1.2rem" }}>
                                        UniLife Hub Hà Nội là đơn vị đào tạo trực tiếp liên kết với <strong>Khoa Công nghệ Thông tin – Học viện Bưu chính Viễn thông (PTIT)</strong>. Chúng tôi tạo ra môi trường học tập <em>vừa học vừa trải nghiệm</em>, nơi học viên có thể <strong>ghi chú kiến thức, tương tác, tham gia các hoạt động thú vị và thử thách kỹ năng</strong>, giúp phát triển tư duy, kỹ năng và thói quen học tập hiệu quả.
                                    </p>
                                </li>
                                <li style={{ marginBottom: "40px" }}>
                                    <h4 style={{ margin: 0, fontWeight: 600, fontSize: "1.8rem", color: "#555555" }}>
                                        Số năm thành lập
                                    </h4>
                                    <p style={{ marginTop: "12px", fontSize: "1.2rem" }}>Khoa CNTT – PTIT: Hơn 25 năm</p>
                                    <p style={{ marginTop: "12px", fontSize: "1.2rem" }}>UniLife Hub: 1+ năm đồng hành trong lĩnh vực đào tạo và phát triển kỹ năng học tập</p>
                                </li>
                                <li style={{ marginBottom: "40px" }}>
                                    <h4 style={{ margin: 0, fontWeight: 600, fontSize: "1.8rem", color: "#555555" }}>
                                        Các kênh chính thức
                                    </h4>
                                    <p style={{ marginTop: "12px", fontSize: "1.2rem" }}>
                                        Website: <a href="https://unilifehub.edu.vn" target="_blank" style={{ color: "#48a999", textDecoration: "underline" }}>unilifehub.edu.vn</a>
                                    </p>
                                    <p style={{ marginTop: "12px", fontSize: "1.2rem" }}>
                                        Fanpage: <a href="https://www.facebook.com/UniLifeHub/" target="_blank" style={{ color: "#48a999", textDecoration: "underline" }}>UniLife Hub</a>
                                    </p>
                                </li>
                                <li style={{ marginBottom: "40px" }}>
                                    <h4 style={{ margin: 0, fontWeight: 600, fontSize: "1.8rem", color: "#555555" }}>
                                        Thông tin liên hệ
                                    </h4>
                                    <p style={{ marginTop: "12px", fontSize: "1.2rem" }}>
                                        SĐT: 0338771704
                                    </p>
                                    <p style={{ marginTop: "12px", fontSize: "1.2rem" }}>
                                        Địa chỉ: Số 96A Trần Phú, phường Hà Đông, thành phố Hà Nội
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
            {/*<div className="mt-[20px]"></div>*/}
            <Footer1 />
        </>
    );
};

export default Introduce;