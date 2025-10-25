import { Button, Modal } from "antd";
// import { useDispatch } from 'react-redux';
// import { deleteCategory } from '../slices/CategoriesSlice.ts';
import type {Category} from '../types/type';
import {useAppDispatch} from "../hooks/Hook.ts";
import {deleteCategory} from "../apis/CateApi.ts";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    category?: Category;
}

const ModalDeleteCategory = ({ open, onClose, category }: ModalProps) => {
    // const dispatch = useDispatch();
    const dispatch = useAppDispatch();

    const handleDelete = () => {
        if (category) {
            dispatch(deleteCategory(category.id));
        }
        onClose();
    };

    return (
        <Modal
            open={open}
            onCancel={onClose}
            title="Confirm delete"
            footer={[
                <Button key="reset" onClick={onClose}>Cancel</Button>,
                <Button key="delete" type="primary" className="!bg-red-700" onClick={handleDelete}>Delete</Button>
            ]}
        >
            <div className="-mx-6 mt-2.5 mb-5 border-t border-gray-300"></div>
            <p className="text-base font-normal my-10">Are you sure you want to delete the category "{category?.name}"?</p>
            <div className="-mx-6 mb-4 mt-5 border-b border-gray-300"></div>
        </Modal>
    );
};

export default ModalDeleteCategory;