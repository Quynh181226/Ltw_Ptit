import {Button, message, Modal} from "antd";
import type { User } from "../types/type";
import { useAppDispatch } from "../hooks/Hook";
import {deleteUser, getAllUsers} from "../apis/UserApi";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    user?: User;
}

const ModalDeleteUser = ({ open, onClose, user }: ModalProps) => {
    const dispatch = useAppDispatch();

    const handleDelete = async () => {
        if (user) {
            try {
                await dispatch(deleteUser(user.id)).unwrap();
                await dispatch(getAllUsers()).unwrap();
                message.success("Delete user success!!");
            } catch (error) {
                message.error("Delete failed!!");
            }
        }
        onClose();
    };

    return (
        <Modal
            open={open}
            onCancel={onClose}
            title="Confirm Delete"
            footer={[
                <Button key="reset" onClick={onClose}>
                    Cancel
                </Button>,
                <Button key="delete" type="primary" className="!bg-red-700" onClick={handleDelete}>
                    Delete
                </Button>,
            ]}
        >
            <div className="-mx-6 mt-2.5 mb-5 border-t border-gray-300"></div>
            <p className="text-base font-normal my-10">
                Are you sure you want to delete the user "{user?.fullName}"?
            </p>
            <div className="-mx-6 mb-4 mt-5 border-b border-gray-300"></div>
        </Modal>
    );
};

export default ModalDeleteUser;