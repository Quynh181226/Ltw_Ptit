import { createSlice } from "@reduxjs/toolkit";
import {
    getByEmail,
    add,
    login,
    updateUser,
    getAllUsers,
    deleteUser,
    updateUserStatus,
    logout,  // THÊM: import logout
} from "../apis/UserApi";
import type { UserState, User } from "../types/type";

const initialState: UserState = {
    users: [],
    error: null,
    loading: false,
    currentUser: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        clearErr: (state) => {
            state.error = null;
        },
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
            localStorage.setItem("currentUser", JSON.stringify(action.payload));
        },
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        restoreFromStorage: (state) => {
            const saved = localStorage.getItem("currentUser");
            if (saved) {
                state.currentUser = JSON.parse(saved);
            }
        },
    },
    extraReducers: (builder) => {
        builder
            // GET BY EMAIL
            .addCase(getByEmail.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getByEmail.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload as User[];
                state.currentUser = action.payload[0] || null;
                if (state.currentUser) {
                    localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
                }
            })
            .addCase(getByEmail.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as string) || "Error";
            })

            // ADD USER
            .addCase(add.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(add.fulfilled, (state, action) => {
                state.loading = false;
                const newUser = action.payload as User;
                if (newUser.role !== "admin") {
                    state.users.push(newUser);
                }
            })
            .addCase(add.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as string) || "Error";
            })

            // DELETE USER
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                const userId = action.payload as number;
                state.users = state.users.filter((user) => user.id !== userId);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // UPDATE USER STATUS (ADMIN) – SỬA: XÓA 'inactive' vì không tồn tại
            .addCase(updateUserStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserStatus.fulfilled, (state, action) => {
                state.loading = false;
                const { id, active, waiting, suspended, lockUntil } = action.payload as {
                    id: number;
                    active: boolean;
                    waiting: boolean;
                    suspended: boolean;
                    lockUntil: number | null;
                };
                const index = state.users.findIndex((u) => u.id === id);
                if (index !== -1) {
                    state.users[index] = {
                        ...state.users[index],
                        active,
                        waiting,
                        suspended,
                        lockUntil,
                        loginAttempts: 0,
                    };
                }
            })
            .addCase(updateUserStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // GET ALL USERS
            .addCase(getAllUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                const allUsers = action.payload as User[];
                const nonAdmin = allUsers.filter((u) => u.role !== "admin");
                state.users = nonAdmin;

                if (state.currentUser?.id) {
                    const updated = allUsers.find((u) => u.id === state.currentUser?.id);
                    if (updated) {
                        state.currentUser = updated;
                        localStorage.setItem("currentUser", JSON.stringify(updated));
                    }
                }
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // LOGIN – TÍCH HỢP STATUS TABLE: SET active = true, waiting = false khi login thành công
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload as User;

                // TÍCH HỢP STATUS TABLE: active = true (online)
                state.currentUser.active = true;
                state.currentUser.waiting = false;

                localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // LOGOUT – TÍCH HỢP STATUS TABLE: SET active = false, waiting = false (nếu hồ sơ đầy đủ) hoặc true (nếu thiếu)
            // .addCase(logout.fulfilled, (state, action) => {
            //     const updated = action.payload as User;
            //     const idx = state.users.findIndex((u) => u.id === updated.id);
            //     if (idx !== -1) {
            //         state.users[idx] = updated;
            //     }
            //     state.currentUser = null;
            //     localStorage.removeItem("currentUser");
            // })
            .addCase(logout.fulfilled, (state, action) => {
                const updated = action.payload as unknown as { id: number; active: boolean; inactive: boolean; waiting: boolean };

                // const updated = action.payload as { id: number; active: boolean; inactive: boolean; waiting: boolean };
                const user = state.users.find(u => u.id === updated.id);

                if (user) {
                    user.active = updated.active;
                    user.inactive = updated.inactive;
                    user.waiting = updated.waiting;
                }

                if (state.currentUser?.id === updated.id) {
                    state.currentUser = null;
                    localStorage.removeItem("currentUser");
                }
            })


        // UPDATE USER – TÍCH HỢP STATUS TABLE: TỰ ĐỘNG SET active/waiting dựa trên hồ sơ
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                const updatedUser = action.payload as User;
                const idx = state.users.findIndex((u) => u.id === updatedUser.id);
                if (idx !== -1) {
                    state.users[idx] = updatedUser;
                }
                if (state.currentUser?.id === updatedUser.id) {
                    state.currentUser = updatedUser;
                    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
                }
            });
    },
});

export const { clearErr, setCurrentUser, setUsers, restoreFromStorage } = userSlice.actions;
export const userReducer = userSlice.reducer;