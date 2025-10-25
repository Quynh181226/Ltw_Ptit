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

export const deleteUser = createAsyncThunk("user/deleteUser", async (id: number | string) => {
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
            suspended: false,
            inactive: false,
            lockUntil: null,
            loginAttempts: 0,
            waiting: waiting
        });

        return {
            id: userId,
            active: false,
            suspended: false,
            lockUntil: null,
            waiting: waiting
        };
    } catch (err: any) {
        throw new Error(err.response?.data?.message || "Logout failed");
    }
});

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

                if (newAttempts <= 2) {
                    return rejectWithValue("Invalid email or password");
                } else {
                    return rejectWithValue(`Sai mật khẩu. Còn ${left} lần thử.`);
                }
            }

            const waiting = !(user.fullName && user.avatar);

            await axiosConfig.patch(`api/users/${user.id}`, {
                loginAttempts: 0,
                suspended: false,
                lockUntil: null,
                active: true,
                waiting: waiting,
            });

            return { ...user, active: true, suspended: false, lockUntil: null, waiting };
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Login failed");
        }
    }
);