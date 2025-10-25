import { Button, Modal } from "antd";
import { useAppDispatch } from "../hooks/Hook";
import type { Question } from "../types/type";
import { deleteQues } from "../apis/QuesApi";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    ques: Question | null;
    testId: number;
    onDeleted: () => void;
    customHandleDelete?: (quesId: number) => void;
}

const ModalDeleteQues = ({ open, onClose, ques, testId, onDeleted, customHandleDelete }: ModalProps) => {
    const dispatch = useAppDispatch();

    const handleDelete = async () => {
        if (ques) {
            try {
                if (customHandleDelete) {
                    customHandleDelete(ques.id);
                } else {
                    await dispatch(deleteQues({testId, quesId: ques.id}));
                }
                onDeleted();
            } catch (err) {
                console.error("Err delete ques: ", err);
                onClose();
            }
        } else {
            onClose();
        }
    };

    return (
        <Modal open={open} onCancel={onClose} title="Confirm delete"
               footer={[
                   <Button key="cancel" onClick={onClose}>Cancel</Button>,
                   <Button key="delete" type="primary" className="!bg-red-700" onClick={handleDelete}>
                       Delete
                   </Button>
               ]}
        >
            <div className="-mx-6 mt-2.5 mb-5 border-t border-gray-300"></div>
            <p className="text-base font-normal my-10">
                Are you sure you want to delete the question "{ques?.question}"?
            </p>
            <div className="-mx-6 mb-4 mt-5 border-b border-gray-300"></div>
        </Modal>
    );
};

export default ModalDeleteQues;