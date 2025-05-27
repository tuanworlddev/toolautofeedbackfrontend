import { useEffect, useState } from "react";
import type { Shop } from "../models/shop";

type ShopModalProps = {
    shop?: Shop;
    isOpen: boolean;
    onClose: () => void;
    onUpdate: (id: string, data: Shop) => void;
}

function UpdateShopModal({ shop, isOpen, onClose, onUpdate }: ShopModalProps) {
    const [name, setName] = useState("");
    const [apiKey, setApiKey] = useState("");
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setName(shop?.name ?? '');
        setApiKey(shop?.apiKey ?? '');
        if (isOpen) {
            setIsVisible(true);
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const handleSubmit = () => {
        if (!shop) return;
        const updateShop = shop;
        updateShop.name = name;
        updateShop.apiKey = apiKey;
        onUpdate(shop.id, updateShop);
        setName("");
        setApiKey("");
        onClose();
    }

    if (!isOpen && !isVisible) return null;

    return (
        <div className={`fixed inset-0 bg-black/30 flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out ${isOpen ? "opacity-100" : "opacity-0"}`}>
            <div className={`bg-white p-5 rounded-md shadow w-96 transition-opacity duration-300 ease-in-out ${isOpen ? "opacity-100" : "opacity-0"}`}>
                <h2 className="text-xl mb-4">Update Shop</h2>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className="w-full p-2 border border-blue-500 transition-all focus:border-2 rounded-md mb-2 outline-none"
                    required
                />
                <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="API key"
                    className="w-full p-2 border border-blue-500 transition-all focus:border-2 rounded-md mb-2 outline-none"
                    required
                />
                <div className="flex justify-end gap-2 py-2">
                    <button
                        onClick={onClose}
                        className="px-3 py-1 transition-colors bg-gray-200 rounded hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-3 py-1 transition-colors bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UpdateShopModal