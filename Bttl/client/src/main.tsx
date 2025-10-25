import {StrictMode, useEffect} from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { Store } from "./stores/Store";
import {AppRouter} from "./routers/AppRouter";
import "./index.css";
import "boxicons/css/boxicons.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch, useAppSelector } from "./hooks/Hook";
import { getByEmail } from "./apis/UserApi";
import { setCurrentUser } from "./slices/UserSlice";

const App = () => {
    const dispatch = useAppDispatch();
    const { currentUser } = useAppSelector((state) => state.user);

    useEffect(() => {
        const initUser = async () => {
            if (currentUser) return;
            const isLoggedIn = sessionStorage.getItem("isLoggedIn");
            const userEmail = sessionStorage.getItem("userEmail");

            if (isLoggedIn === "true" && userEmail) {
                try {
                    const result = await dispatch(getByEmail(userEmail)).unwrap();
                    if (result && result.length > 0) {
                        dispatch(setCurrentUser(result[0]));
                    } else {
                        console.error("No user found for email:", userEmail);
                        sessionStorage.removeItem("isLoggedIn");
                        sessionStorage.removeItem("userEmail");
                    }
                } catch (err) {
                    console.error("Failed to restore user:", err);
                    sessionStorage.removeItem("isLoggedIn");
                    sessionStorage.removeItem("userEmail");
                }
            }
        };

        initUser();
    }, [dispatch, currentUser]);

    return <AppRouter />;
};

ReactDOM.createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider store={Store}>
            <App />
            <ToastContainer
                position="top-left"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </Provider>
    </StrictMode>
);