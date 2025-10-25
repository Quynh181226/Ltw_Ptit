import { useState, useEffect, type ChangeEvent } from "react";
import { Button, Input, Modal, DatePicker, Select, message } from "antd";
import axios from "axios";
import type { User } from "../types/type";
import { useAppDispatch } from "../hooks/Hook";
import { add, getAllUsers, updateUser } from "../apis/UserApi";
import { toast } from "react-toastify";
import moment from "moment";
import Avatar from "../assets/avatar.svg";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    user?: User;
    code: "Add" | "Edit";
    allUsers: User[];
}

const ModalAddEditUser = ({ open, onClose, user, code, allUsers }: ModalProps) => {
    const dispatch = useAppDispatch();

    const [fullName, setFullName] = useState(user?.fullName ?? "");
    const [email, setEmail] = useState(user?.email ?? "");
    const [password, setPassword] = useState(user?.password ?? "");
    const [phone, setPhone] = useState(user?.phone ?? "");
    const [birthDate, setBirthDate] = useState(user?.birthDate ? moment(user.birthDate) : null);
    const [gender, setGender] = useState(user?.gender ?? "");
    const [className, setClassName] = useState(user?.class ?? "");
    const [avatar, setAvatar] = useState<string>(user?.avatar ?? "");
    const [file, setFile] = useState<File | null>(null);
    const [displayFileName, setDisplayFileName] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setFullName(user?.fullName ?? "");
        setEmail(user?.email ?? "");
        // show existing password (as you requested)
        setPassword(user?.password ?? "");
        setPhone(user?.phone ?? "");
        setBirthDate(user?.birthDate ? moment(user.birthDate).startOf("day") : null);
        setGender(user?.gender ?? "");
        setClassName(user?.class ?? "");
        setAvatar(user?.avatar ?? "");
        setFile(null);
        setError(null);

        if (user?.avatar && code === "Edit") {
            setDisplayFileName(user.avatar.split("/").pop() || "No file selected");
        } else {
            setDisplayFileName(null);
        }
    }, [open, user, code]);

    const handleInputFile = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setAvatar(URL.createObjectURL(selectedFile));
            setDisplayFileName(selectedFile.name);
        }
    };

    const uploadToCloudinary = async (): Promise<string | null> => {
        if (!file) return avatar || null;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "React_Ra");

        try {
            const res = await axios.post("https://api.cloudinary.com/v1_1/dtxlzevgb/image/upload", formData);
            return res.data.secure_url as string;
        } catch (err) {
            console.error("Upload failed:", err);
            toast.error("Upload failed!!");
            return null;
        }
    };

    const handleSubmit = async () => {
        if (!fullName.trim()) {
            setError("Full name is required");
            return;
        } else if (!email.trim()) {
            setError("Email is required");
            return;
        } else if (code === "Add" && !password.trim()) {
            setError("Password is required");
            return;
        }

        setLoading(true);
        setError(null);

        const avatarUrl = await uploadToCloudinary();

        const generateNewId = (): string => {
            if (allUsers.length === 0) return "BCN001";
            const lastUser = allUsers[allUsers.length - 1];
            const num = parseInt(String(lastUser.id).replace("BCN", "").replace(/^0+/, "")) + 1;
            return `BCN${num.toString().padStart(3, "0")}`;
        };

        const profileComplete = Boolean(fullName && email && phone && birthDate && gender && className && (avatarUrl || avatar));

        const userData = {
            id: user?.id ?? generateNewId(),
            fullName: fullName.trim(),
            email: email.trim(),
            // for Add: set provided password; for Edit: keep user.password if password field left empty
            password: password.trim() || user?.password || "123456",
            phone: phone.trim(),
            birthDate: birthDate ? birthDate.format("YYYY-MM-DD") : null,
            gender: gender.trim(),
            class: className.trim(),
            avatar: avatarUrl || avatar || Avatar,
            role: user?.role ?? "user",
            // IMPORTANT: do NOT auto-set active=true on Add; user should be inactive by default (needs login)
            active: user?.active ?? false, // keep existing active flag on edit; on add it's false by default in API
            suspended: user?.suspended ?? false,
            loginAttempts: user?.loginAttempts ?? 0,
            lockUntil: user?.lockUntil ?? null,
            // waiting: if profile incomplete -> true ; else false
            waiting: !profileComplete,
        };

        try {
            if (code === "Add") {
                // Ensure backend will set active=false and waiting appropriately (we already set waiting flag here)
                await dispatch(add(userData));
                message.success("User added successfully!");
            } else if (code === "Edit" && user) {
                await dispatch(updateUser(userData));
                message.success("User updated successfully!");
            }

            // Refresh list
            dispatch(getAllUsers());
            onClose();
        } catch (err) {
            message.error("Error!!");
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            open={open}
            onCancel={onClose}
            title={code === "Add" ? "Add User" : "Edit User"}
            footer={[
                <Button key="cancel" size="large" onClick={onClose}>
                    Cancel
                </Button>,
                <Button key="save" size="large" type="primary" loading={loading} onClick={handleSubmit}>
                    Save
                </Button>,
            ]}
        >
            <div className="-mx-6 mt-2.5 mb-5 border-t border-gray-300"></div>

            <div className="mb-4">
                <label className="block font-medium text-[#344054] mb-2">Full Name:</label>
                <Input size="large" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </div>

            <div className="mb-4">
                <label className="block font-medium text-[#344054] mb-2">Email:</label>
                <Input size="large" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="mb-4">
                <label className="block font-medium text-[#344054] mb-2">Password:</label>
                <Input size="large" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <div className="mb-4">
                <label className="block font-medium text-[#344054] mb-2">Phone:</label>
                <Input size="large" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>

            <div className="mb-4">
                <label className="block font-medium text-[#344054] mb-2">Birth Date:</label>
                <DatePicker size="large" value={birthDate} onChange={(date) => setBirthDate(date)} format="YYYY-MM-DD" className="w-full" />
            </div>

            <div className="mb-4">
                <label className="block font-medium text-[#344054] mb-2">Gender:</label>
                <Select size="large" value={gender} placeholder="Select gender" className="w-full" onChange={(value) => setGender(value)}>
                    <Select.Option value="male">Male</Select.Option>
                    <Select.Option value="female">Female</Select.Option>
                    <Select.Option value="other">Other</Select.Option>
                </Select>
            </div>

            <div className="mb-4">
                <label className="block font-medium text-[#344054] mb-2">Class:</label>
                <Input size="large" value={className} onChange={(e) => setClassName(e.target.value)} />
            </div>

            <div className="mb-4">
                <label className="block font-medium text-[#344054] mb-2">Avatar:</label>
                <div className="flex flex-row">
                    <Input
                        addonBefore={<span onClick={() => document.getElementById("fileInput")?.click()} className="cursor-pointer">Choose file</span>}
                        size="large"
                        placeholder={displayFileName || "No file selected"}
                        style={{ width: "100%", boxShadow: "none", borderColor: "#d9d9d9" }}
                        readOnly
                    />
                    <input id="fileInput" type="file" accept="image/*" onChange={handleInputFile} className="hidden" />
                </div>
            </div>

            {error && <div className="text-red-700 text-sm mt-2">{error}</div>}

            <div className="-mx-6 mb-4 mt-5 border-b border-gray-300"></div>
        </Modal>
    );
};

export default ModalAddEditUser;
