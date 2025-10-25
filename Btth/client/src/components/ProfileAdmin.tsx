import {useEffect, useRef, useState} from 'react';
import { Select, Form, Input, Button, message } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppSelector, useAppDispatch } from "../hooks/Hook";
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import Header1 from "./Header1.tsx";
import handleLogout from "./handleLogout.tsx";
import Avatar from "../assets/Avatar.svg"
import Footer1 from "./Footer1.tsx";
import axios from "axios";
import { updateUser } from "../apis/UserApi";
import {useNavigate} from "react-router-dom";

const ProfileAdmin = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const dispatch = useAppDispatch();
    const { currentUser } = useAppSelector((state) => state.user);

    useEffect(() => {
        if (currentUser) {
            form.setFieldsValue({
                fullName: currentUser.fullName,
                email: currentUser.email,
                phone: currentUser.phone,
                birthDate: currentUser.birthDate ? moment(currentUser.birthDate) : null,
                gender: currentUser.gender,
                class: currentUser.class,
            });
            setAvatarUrl(currentUser.avatar);
        }
    }, [currentUser, form]);

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            await handleUpload(file);
        }
    };

    const handleUpload = async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "React_Ra");

        try {
            const res = await axios.post(
                "https://api.cloudinary.com/v1_1/dtxlzevgb/image/upload",
                formData
            );
            setAvatarUrl(res.data.secure_url);
            message.success("Ảnh đại diện đã được tải lên!!");
            return res.data.secure_url;
        } catch (error) {
            message.error("Lỗi khi tải ảnh lên!!");
            return null;
        }
    };

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            const avatar = avatarUrl || currentUser?.avatar;
            const updatedUser = {
                ...currentUser,
                fullName: values.fullName,
                email: values.email,
                phone: values.phone,
                birthDate: values.birthDate ? values.birthDate.format("YYYY-MM-DD") : undefined,
                gender: values.gender,
                class: values.class,
                avatar,
                waiting: !values.phone || !values.birthDate || !values.gender || !values.class ? true : false,
                active: values.phone && values.birthDate && values.gender && values.class ? true : false,
            };

            await dispatch(updateUser(updatedUser)).unwrap();
            message.success({
                content: (
                    <span>
                        Thông tin đã được cập nhật thành công!
                    </span>
                ),
                duration: 3,
            });

            form.setFieldsValue({
                fullName: updatedUser.fullName,
                email: updatedUser.email,
                phone: updatedUser.phone,
                birthDate: updatedUser.birthDate ? moment(updatedUser.birthDate) : null,
                gender: updatedUser.gender,
                class: updatedUser.class,
            });
        } catch (error) {
            message.error("Lỗi khi cập nhật thông tin!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-100 text-gray-800 font-sans min-h-screen">
            <Header1 onLogout={handleLogout} />

            <div className="max-w-6xl mx-auto px-5 py-8">
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-2xl font-semibold text-center mb-6 pb-4 border-b border-gray-200">
                        Cập nhật thông tin admin
                    </h2>

                    <div className="flex flex-col items-center">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-400 mb-4">
                            <img src={avatarUrl || Avatar} className="h-32 w-32 object-cover" />
                        </div>

                        {/* input file ẩn */}
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                        />

                        {/* nút tải ảnh mới */}
                        <Button
                            type="dashed"
                            className="mb-5 !pt-2 !pb-2 !border-gray-500 !text-gray-600 hover:!border-gray-500 hover:!text-gray-700 hover:!bg-gray-100"
                            onClick={handleButtonClick}
                        >
                            <FontAwesomeIcon icon={faUpload} className="mr-2" />
                            Tải ảnh mới
                        </Button>
                    </div>

                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        className="grid grid-cols-2 gap-5"
                    >
                        <Form.Item label="Họ và tên" name="fullName" rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}>
                            <Input size="large"/>
                        </Form.Item>

                        <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Vui lòng nhập email!', type: 'email' }]}>
                            <Input size="large"/>
                        </Form.Item>

                        <Form.Item label="Role" name="class">
                            <Input size="large" disabled={true} placeholder="Quản trị viên"/>
                        </Form.Item>

                        <Form.Item label="Giới tính" name="gender">
                            <Select placeholder="Select sex" size="large">
                                <Select.Option value="male">Nam</Select.Option>
                                <Select.Option value="female">Nữ</Select.Option>
                                <Select.Option value="other">Khác</Select.Option>
                            </Select>
                        </Form.Item>

                        <div className="flex gap-4">
                            <Button type="dashed" onClick={()=>navigate("/course")} className="!w-30 !h-11 border hover:!border-gray-400 !text-gray-500 !font-bold !rounded-2xl !shadow-[0_7px_0_#6b7280] hover:!shadow-[0_9px_0_#6b7280] !transition-all">
                                Hủy bỏ
                            </Button>
                            <button type="submit" disabled={loading} className="relative border border-[#5a637d] bg-[#7d88a8] hover:bg-[#6a7698] text-white font-bold text-[16px] rounded-2xl w-30 h-11 shadow-[0_6px_0_#5a637d] cursor-pointer overflow-hidden hover:-translate-y-[1px] hover:shadow-[0_9px_0_#5a637d] transition-all">
                                <span className="relative z-10">Lưu thay đổi</span>
                                <div className="absolute inset-0 bg-[linear-gradient(-115deg,#6a7698_60%,#7d88a7_60%,#7d88a7_62%,#6a7698_62%,#6a7698_65%,#7d88a7_65%,#7d88a7_70%,#6a7698_70%,#6a7698_73%,#7d88a7_73%,#7d88a7_75%,#6a7698_75%)] z-0 pointer-events-none"></div>
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
            <Footer1/>
        </div>
    );
};

export default ProfileAdmin;
