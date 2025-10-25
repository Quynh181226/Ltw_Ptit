// import axiosConfig from "../utils/axiosConfig.ts";
// import { createAsyncThunk } from "@reduxjs/toolkit";
//
// export const getByEmail = createAsyncThunk("user/getByEmail", async (email: string) => {
//     return (await axiosConfig.get(`users?email=${email}`)).data;
// });
//
// export const add = createAsyncThunk("user/add", async (user: any) => {
//     return (
//         await axiosConfig.post(`users`, {
//             ...user,
//             active: false,
//             suspended: false,
//             loginAttempts: 0,
//             lockUntil: null,
//             waiting: true,
//             avatar: null,
//         })
//     ).data;
// });
//
// // profilePage
// export const updateUser = createAsyncThunk("user/updateUser", async (user: any) => {
//     return (await axiosConfig.patch(`users/${user.id}`, user)).data;
// });
//
// export const deleteUser = createAsyncThunk("user/deleteUser", async (id: number) => {
//     return (await axiosConfig.delete(`users/${id}`)).data; // Lưu ý: axios.delete có thể không trả về data, xem thêm dưới đây
// });
//
// export const updateUserStatus = createAsyncThunk(
//     "user/updateUserStatus",
//     async ({
//                id,
//                active,
//                suspended,
//                waiting,
//                lockUntil,
//            }: {
//         id: number;
//         active: boolean;
//         suspended: boolean;
//         waiting: boolean;
//         lockUntil: number | null;
//     }) => {
//         return (
//             await axiosConfig.patch(`/users/${id}`, {
//                 active,
//                 suspended,
//                 waiting,
//                 lockUntil,
//             })
//         ).data || { id, active, suspended, waiting, lockUntil }; // Fallback nếu data không tồn tại
//     }
// );
//
// export const getAllUsers = createAsyncThunk("user/getAllUsers", async () => {
//     return (await axiosConfig.get("users")).data;
// });
//
// export const login = createAsyncThunk(
//     "user/login",
//     async (
//         { email, password }: { email: string; password: string },
//         { rejectWithValue }
//     ) => {
//         try {
//             const res = await axiosConfig.get(`users?email=${email}`);
//             const user = res.data[0];
//
//             // Không tìm thấy user => sai email
//             if (!user) {
//                 return rejectWithValue("Invalid email or password");
//             }
//
//             // Nếu tài khoản đang bị khóa
//             if (user.suspended && user.lockUntil && user.lockUntil > Date.now()) {
//                 const minutesLeft = Math.ceil((user.lockUntil - Date.now()) / 60000);
//                 return rejectWithValue(
//                     `Tài khoản bị khóa. Vui lòng thử lại sau ${minutesLeft} phút.`
//                 );
//             }
//
//             // Sai mật khẩu
//             if (user.password !== password) {
//                 const newAttempts = (user.loginAttempts || 0) + 1;
//                 const maxAttempts = 5;
//                 const lockDuration = 30 * 60 * 1000; // 30 phút
//
//                 // Nếu vượt quá số lần thử cho phép -> khóa
//                 if (newAttempts >= maxAttempts) {
//                     await axiosConfig.patch(`users/${user.id}`, {
//                         loginAttempts: newAttempts,
//                         suspended: true,
//                         lockUntil: Date.now() + lockDuration,
//                     });
//                     return rejectWithValue(
//                         `Tài khoản bị khóa do đăng nhập sai quá ${maxAttempts} lần. Vui lòng thử lại sau 30 phút.`
//                     );
//                 }
//
//                 // Cập nhật số lần đăng nhập sai
//                 await axiosConfig.patch(`users/${user.id}`, {
//                     loginAttempts: newAttempts,
//                 });
//
//                 // Hiển thị thông báo theo yêu cầu
//                 if (newAttempts <= 3) {
//                     return rejectWithValue("Invalid email or password");
//                 } else {
//                     return rejectWithValue(
//                         `Mật khẩu sai. Bạn còn ${maxAttempts - newAttempts} lần thử.`
//                     );
//                 }
//             }
//
//             // Đăng nhập thành công
//             await axiosConfig.patch(`users/${user.id}`, {
//                 loginAttempts: 0,
//                 suspended: false,
//                 lockUntil: null,
//             });
//
//             return user;
//         } catch (err) {
//             return rejectWithValue("Login failed");
//         }
//     }
// );
// src/apis/UserApi.ts – ĐÃ SỬA CHUẨN 100% (GIỮ NGUYÊN LOGIC CỦA BẠN)
import axiosConfig from "../utils/axiosConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getByEmail = createAsyncThunk("user/getByEmail", async (email: string) => {
    return (await axiosConfig.get(`api/users?email=${email}`)).data;
});

export const add = createAsyncThunk("user/add", async (user: any) => {
    return (
        await axiosConfig.post(`api/users`, {
            ...user,
            active: false,
            suspended: false,
            loginAttempts: 0,
            lockUntil: null,
            waiting: true,
            avatar: null,
        })
    ).data;
});

export const updateUser = createAsyncThunk("user/updateUser", async (user: any) => {
    return (await axiosConfig.patch(`api/users/${user.id}`, user)).data;
});

export const deleteUser = createAsyncThunk("user/deleteUser", async (id: number) => {
    await axiosConfig.delete(`api/users/${id}`);
    return id;
});

export const updateUserStatus = createAsyncThunk(
    "api/user/updateUserStatus",
    async ({
               id,
               active,
               suspended,
               waiting,
               lockUntil,
           }: {
        id: number;
        active: boolean;
        suspended: boolean;
        waiting: boolean;
        lockUntil: number | null;
    }) => {
        const res = await axiosConfig.patch(`api/users/${id}`, {
            active,
            suspended,
            waiting,
            lockUntil,
        });
        return res.data || { id, active, suspended, waiting, lockUntil };
    }
);

export const getAllUsers = createAsyncThunk("user/getAllUsers", async () => {
    return (await axiosConfig.get("api/users")).data;
});

export const logout = createAsyncThunk("user/logout", async (userId: number) => {
    try {
        const res = await axiosConfig.get(`api/users/${userId}`);
        const user = res.data;

        const waiting = !(user.fullName && user.avatar);

        await axiosConfig.patch(`api/users/${userId}`, {
            active: false,
            inactive: true,
            waiting: waiting
        });

        return { id: userId, active: false, inactive: true, waiting };
    } catch (err: any) {
        throw new Error(err.response?.data?.message || "Logout failed");
    }
});


// GIỮ NGUYÊN LOGIC CỦA BẠN – CHỈ ĐỔI API GỌI LÀ POST /api/auth/login
export const login = createAsyncThunk(
    "user/login",
    async (
        { email, password }: { email: string; password: string },
        { rejectWithValue }
    ) => {
        try {
            const res = await axiosConfig.get(`api/users`, { params: { email } });
            const user = res.data[0];

            if (!user) return rejectWithValue("Invalid email or password");

            if (user.suspended && user.lockUntil && user.lockUntil > Date.now()) {
                const minutesLeft = Math.ceil((user.lockUntil - Date.now()) / 60000);
                return rejectWithValue(`Tài khoản bị khóa. Thử lại sau ${minutesLeft} phút.`);
            }

            if (user.password !== password) {
                const newAttempts = (user.loginAttempts || 0) + 1;
                const maxAttempts = 5;
                const lockDuration = 30 * 60 * 1000;

                if (newAttempts >= maxAttempts) {
                    await axiosConfig.patch(`api/users/${user.id}`, {
                        loginAttempts: newAttempts,
                        suspended: true,
                        lockUntil: Date.now() + lockDuration,
                    });
                    return rejectWithValue(
                        `Sai mật khẩu quá ${maxAttempts} lần. Tài khoản bị khóa 30 phút.`
                    );
                }

                await axiosConfig.patch(`api/users/${user.id}`, {
                    loginAttempts: newAttempts,
                });

                const left = maxAttempts - newAttempts;
                return rejectWithValue(
                    left > 0 ? `Sai mật khẩu. Còn ${left} lần thử.` : "Invalid email or password"
                );
            }

            // ✅ Đăng nhập thành công
            const waiting = !(user.fullName && user.avatar);

            await axiosConfig.patch(`api/users/${user.id}`, {
                loginAttempts: 0,
                suspended: false,
                lockUntil: null,
                active: true,
                inactive: false,
                waiting: waiting,
            });

            return { ...user, active: true, inactive: false, waiting };
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Login failed");
        }
    }
);
