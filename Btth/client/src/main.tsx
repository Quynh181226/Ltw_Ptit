// import React, { useEffect } from "react";
// import ReactDOM from "react-dom/client";
// import { Provider } from "react-redux";
// import { Store } from "./stores/Store";
// import AppRouter from "./routers/AppRouter";
// import "./index.css";
// import "boxicons/css/boxicons.min.css";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useAppDispatch, useAppSelector } from "./hooks/Hook";
// import { getByEmail } from "./apis/UserApi";
// import { setCurrentUser } from "./slices/UserSlice";
//
// // Component App chứa logic khôi phục currentUser
// const App = () => {
//     const dispatch = useAppDispatch();
//     const { currentUser } = useAppSelector((state) => state.user);
//
//     useEffect(() => {
//         const initUser = async () => {
//             if (currentUser) return; // Nếu đã có currentUser, không cần fetch lại
//             const isLoggedIn = sessionStorage.getItem("isLoggedIn");
//             const userEmail = sessionStorage.getItem("userEmail");
//
//             if (isLoggedIn === "true" && userEmail) {
//                 try {
//                     const result = await dispatch(getByEmail(userEmail)).unwrap();
//                     dispatch(setCurrentUser(result[0])); // Set currentUser vào Redux
//                 } catch (err) {
//                     console.error("Failed to restore user:", err);
//                     // sessionStorage.removeItem("isLoggedIn");
//                     // sessionStorage.removeItem("currentUser");
//                     // sessionStorage.removeItem("userEmail");
//                 }
//             }
//         };
//
//         initUser();
//     }, [dispatch, currentUser]);
//
//     return <AppRouter />;
// };
//
// ReactDOM.createRoot(document.getElementById("root")!).render(
//     <React.StrictMode>
//         <Provider store={Store}>
//             <App />
//             <ToastContainer
//                 position="top-left"
//                 autoClose={1500}
//                 hideProgressBar={false}
//                 newestOnTop={false}
//                 closeOnClick
//                 rtl={false}
//                 pauseOnFocusLoss
//                 draggable
//                 pauseOnHover
//                 theme="light"
//             />
//         </Provider>
//     </React.StrictMode>
// );
// // import React from "react";
// // import ReactDOM from "react-dom/client";
// // import { Provider } from "react-redux";
// // import { Store } from "./stores/Store";
// // import AppRouter from "./routers/AppRouter";
// // import "./index.css";
// // import 'boxicons/css/boxicons.min.css';
// // import { ToastContainer } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";
// //
// // ReactDOM.createRoot(document.getElementById("root")!).render(
// //     <React.StrictMode>
// //         <Provider store={Store}>
// //             <AppRouter />
// //             <ToastContainer
// //                 position="top-left"
// //                 autoClose={1500}
// //                 hideProgressBar={false}
// //                 newestOnTop={false}
// //                 closeOnClick
// //                 rtl={false}
// //                 pauseOnFocusLoss
// //                 draggable
// //                 pauseOnHover
// //                 theme="light"
// //             />
// //         </Provider>
// //     </React.StrictMode>
// // );
// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import LessonList.tsx from "./pages/Courses.tsx";
// // import { BrowserRouter } from 'react-router-dom'
// // import App from './App'
// import 'boxicons/css/boxicons.min.css';
// ReactDOM.createRoot(document.getElementById('root')!).render(
//     <React.StrictMode>
//         {/*<BrowserRouter>*/}
//         {/*</BrowserRouter>*/}
//         <LessonList.tsx/>
//     </React.StrictMode>
// )
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { Store } from "./stores/Store";
import AppRouter from "./routers/AppRouter";
import "./index.css";
import "boxicons/css/boxicons.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch, useAppSelector } from "./hooks/Hook";
import { getByEmail } from "./apis/UserApi";
import { setCurrentUser } from "./slices/UserSlice";

// Component App chứa logic khôi phục currentUser
const App = () => {
    const dispatch = useAppDispatch();
    const { currentUser } = useAppSelector((state) => state.user);

    useEffect(() => {
        const initUser = async () => {
            if (currentUser) return; // Nếu đã có currentUser, không cần fetch lại
            const isLoggedIn = sessionStorage.getItem("isLoggedIn");
            const userEmail = sessionStorage.getItem("userEmail");

            if (isLoggedIn === "true" && userEmail) {
                try {
                    const result = await dispatch(getByEmail(userEmail)).unwrap();
                    if (result && result.length > 0) {
                        dispatch(setCurrentUser(result[0])); // Set currentUser vào Redux
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
    <React.StrictMode>
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
    </React.StrictMode>
);