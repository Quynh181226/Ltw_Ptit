import { Navigate } from "react-router-dom";
import type {ReactNode} from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    return isLoggedIn ? children : <Navigate to="/login" replace={true} />;
};

export default ProtectedRoute;