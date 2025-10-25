import { useState, useEffect } from "react";
import { Modal } from "antd";
import Avatar from "../assets/Avatar.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTimesCircle, faLock, faClock } from "@fortawesome/free-solid-svg-icons";

interface ModalStatusProps {
    open: boolean;
    onClose: () => void;
    user: any | undefined;
    onSave: (active: boolean, suspended: boolean, waiting: boolean, lockUntil: number | null) => void;
}

const ModalStatus = ({ open, onClose, user, onSave }: ModalStatusProps) => {
    const [active, setActive] = useState<boolean>(user?.active || false);
    const [suspended, setSuspended] = useState<boolean>(user?.suspended || false);
    const [waiting, setWaiting] = useState<boolean>(user?.waiting || false);
    const [lockUntil, setLockUntil] = useState<number | null>(user?.lockUntil ?? null);

    useEffect(() => {
        if (user) {
            setActive(Boolean(user.active));
            setSuspended(Boolean(user.suspended));
            setWaiting(Boolean(user.waiting));
            setLockUntil(user.lockUntil ?? null);
        }
    }, [user, open]);

    const handleSave = () => {
        if (user) {
            // Normalize: if "active" is true -> waiting false; if inactive chosen -> active false
            const newActive = !!active;
            const newWaiting = !!waiting;
            onSave(newActive, suspended, newWaiting, lockUntil);
            onClose();
        }
    };

    const statusIcons = {
        active: faCheckCircle,
        waiting: faClock,
        suspended: faTimesCircle,
        locked: faLock,
        inactive: faTimesCircle,
    };

    const statusColors = {
        active: "text-green-700",
        waiting: "text-yellow-600",
        suspended: "text-red-700",
        locked: "text-gray-600",
        inactive: "text-gray-700",
    };

    // derive current status for display: LOCKED -> SUSPENDED -> ACTIVE -> WAITING -> INACTIVE
    const getCurrentStatus = () => {
        if (lockUntil && lockUntil > Date.now()) return "locked";
        if (suspended) return "suspended";
        if (active) return "active";
        if (waiting) return "waiting";
        return "inactive";
    };

    // Options: show "Active" if user.active currently true; otherwise show "Inactive" option
    const statusOptions = [
        { key: active ? "active" : "inactive", label: active ? "Active" : "Inactive", icon: statusIcons[active ? "active" : "inactive"] },
        { key: "waiting", label: "Waiting", icon: statusIcons.waiting },
        { key: "suspended", label: "Suspended", icon: statusIcons.suspended },
        { key: "locked", label: "Lock account (temp)", icon: statusIcons.locked },
    ];

    return (
        <Modal open={open} onCancel={onClose} footer={null} centered className="w-[90%] max-w-[520px] rounded-lg">
            <div className="p-5">
                <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-2">
                    <h3 className="text-xl text-gray-800 font-bold flex items-center gap-2">
                        <i className="bx bx-user-check text-[#565D7C]"></i>
                        Edit Account Status
                    </h3>
                </div>

                <div className="flex items-center gap-4 mb-6">
                    <div className="w-18 h-18 rounded-full overflow-hidden bg-gray-200">
                        <img src={user?.avatar || Avatar} alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <div className="font-semibold">{user?.fullName || "Unknown"}</div>
                        <div className="text-gray-500">{user?.email || "No email"}</div>
                        <div
                            className={`mt-1 px-2 py-1 rounded-full inline-flex items-center text-sm font-medium ${
                                statusColors[getCurrentStatus() as keyof typeof statusColors]
                            } ${
                                getCurrentStatus() === "active"
                                    ? "bg-green-100 !text-[#155724]"
                                    : getCurrentStatus() === "waiting"
                                        ? "bg-yellow-100"
                                        : getCurrentStatus() === "suspended"
                                            ? "bg-red-100"
                                            : getCurrentStatus() === "locked"
                                                ? "bg-gray-100"
                                                : "bg-gray-100"
                            }`}
                        >
                            <FontAwesomeIcon icon={statusIcons[getCurrentStatus() as keyof typeof statusIcons]} className="mr-2" />
                            {getCurrentStatus().charAt(0).toUpperCase() + getCurrentStatus().slice(1)}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    {statusOptions.map(({ key, label, icon }) => {
                        // compute isSelected by derived current status
                        const isSelected = getCurrentStatus() === key;
                        return (
                            <div
                                key={key}
                                onClick={() => {
                                    if (key === "active") {
                                        setActive(true);
                                        setWaiting(false);
                                        setSuspended(false);
                                        setLockUntil(null);
                                    } else if (key === "inactive") {
                                        setActive(false);
                                        setWaiting(false);
                                        setSuspended(false);
                                        setLockUntil(null);
                                    } else if (key === "waiting") {
                                        setWaiting(true);
                                        setActive(false);
                                        setSuspended(false);
                                        setLockUntil(null);
                                    } else if (key === "suspended") {
                                        setSuspended(true);
                                        setActive(false);
                                        setWaiting(false);
                                        setLockUntil(null);
                                    } else if (key === "locked") {
                                        // temporary lock e.g. 24h default: set lockUntil to 24h from now
                                        setLockUntil(Date.now() + 24 * 60 * 60 * 1000);
                                        setActive(false);
                                        setWaiting(false);
                                        setSuspended(false);
                                    }
                                }}
                                className={`p-3 rounded-md border flex items-center gap-3 cursor-pointer transition-all duration-150
                  ${isSelected ? "bg-[#e7f0ff] border-[#4a6fdc]" : "bg-[#f8f9fa] border-[#e6e6e6] hover:bg-[#f0f5ff] hover:border-[#c9d4f6]"}`}
                            >
                                <FontAwesomeIcon icon={icon} className={`${statusColors[key as keyof typeof statusColors]} text-lg`} />
                                <span className="text-sm">{label}</span>
                            </div>
                        );
                    })}
                </div>

                <div className="flex justify-end gap-4 mt-6 border-t border-gray-200 pt-4">
                    <button className="cursor-pointer px-4 py-2 rounded-2xl border border-gray-300 bg-gray-100 hover:bg-gray-200 transition" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="cursor-pointer px-4 py-2 rounded-2xl bg-[#6B7597] text-white hover:bg-[#565D7C] transition" onClick={handleSave}>
                        Save
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default ModalStatus;
