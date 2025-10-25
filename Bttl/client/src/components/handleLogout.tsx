// import {useNavigate} from "react-router-dom";

const HandleLogout = () => {
    // const navigate=useNavigate();
    // sessionStorage.removeItem("isLoggedIn");
    // sessionStorage.removeItem("currentUser");
    window.location.href = "/login";
    // navigate("/login");
    sessionStorage.clear();
    localStorage.clear();
};

export default HandleLogout;
