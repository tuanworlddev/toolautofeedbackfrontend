import { useEffect, useState } from "react";
import type { Shop } from "../models/shop";

type ShopModalProps = {
    shop?: Shop;
    isOpen: boolean;
    onClose: () => void;
    onDelete: (id: string) => void;
}

function DeleteShopModal({ shop, isOpen, onClose, onDelete }: ShopModalProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const handleSubmit = () => {
        if (!shop) return;
        onDelete(shop.id);
        onClose();
    }

    if (!isOpen && !isVisible) return null;

    return (
        <div className={`fixed inset-0 bg-black/30 flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out ${isOpen ? "opacity-100" : "opacity-0"}`}>
            <div className={`bg-white p-5 rounded-md shadow w-96 transition-opacity duration-300 ease-in-out ${isOpen ? "opacity-100" : "opacity-0"}`}>
                <h2 className="text-xl mb-4">Delete Shop</h2>
                <div>Are you sure want to delete shop {shop!.name}?</div>
                <div className="flex justify-end gap-2 py-2">
                    <button
                        onClick={onClose}
                        className="px-3 py-1 transition-colors bg-gray-200 rounded hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-3 py-1 transition-colors bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteShopModal