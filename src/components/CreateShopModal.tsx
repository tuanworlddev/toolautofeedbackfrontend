import { useEffect, useState } from "react";
import type { CreateShop } from "../models/shop";

type ShopModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (data: CreateShop) => void;
}

function CreateShopModal({ isOpen, onClose, onCreate }: ShopModalProps) {
    const [name, setName] = useState("");
    const [apiKey, setApiKey] = useState("");
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
        onCreate({ name, apiKey });
        setName("");
        setApiKey("");
        onClose();
    }

    if (!isOpen && !isVisible) return null;

    return (
        <div className={`fixed inset-0 bg-black/30 flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out ${isOpen ? "opacity-100" : "opacity-0"}`}>
            <div className={`bg-white p-5 rounded-md shadow w-96 transition-opacity duration-300 ease-in-out ${isOpen ? "opacity-100" : "opacity-0"}`}>
                <h2 className="text-xl mb-4">Create Shop</h2>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="name"
                    className="w-full p-2 border border-blue-500 transition-colors focus:border-2 rounded-md mb-2"
                    required
                />
                <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="API key"
                    className="w-full p-2 border border-blue-500 transition-colors focus:border-2 rounded-md mb-2"
                    required
                />
                <div className="flex justify-end gap-2 my-2">
                    <button
                        onClick={onClose}
                        className="px-3 py-1 transition-colors bg-gray-300 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-3 py-1 transition-colors bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreateShopModal