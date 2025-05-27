import { useEffect, useState } from "react";
import { useShops } from "../hooks/useShops";
import Sidebar from "../components/Sidebar";
import type { Shop } from "../models/shop";
import CreateShopModal from "../components/CreateShopModal";
import ShopDetails from "../components/ShopDetails";
import UpdateShopModal from "../components/UpdateShopModal";
import DeleteShopModal from "../components/DeleteShopModal";

function HomePage() {
    const { shops, fetchShop, createShop, updateShop, deleteShop, selectedShop, changeSelectedShop, toggleActivate, toggleIsAuto } = useShops();
    const [showCreateShopModal, setShowCreateShopModal] = useState(false);
    const [showUpdateShopModal, setShowUpdateShopModal] = useState(false);
    const [showDeleteShopModal, setShowDeleteShopModal] = useState(false);

    useEffect(() => {
        fetchShop();
    }, []);

    return (
        <div className="flex">
            <Sidebar
                shops={shops}
                selectedShop={selectedShop}
                onCreateClick={() => setShowCreateShopModal(true)}
                onSelectShop={(shop: Shop) => changeSelectedShop(shop)}
            />
            <div className="flex-1 bg-blue-50 p-6">
                {selectedShop ? (
                    <ShopDetails
                        shop={selectedShop}
                        onToggleActivate={toggleActivate}
                        onToggleIsAuto={toggleIsAuto}
                        onupdateClick={() => setShowUpdateShopModal(true)}
                        onDeleteClick={() => setShowDeleteShopModal(true)}
                    />
                ) : (
                    <p className="text-gray-500">Select a store to see details.</p>
                )}
            </div>

            <CreateShopModal
                isOpen={showCreateShopModal}
                onClose={() => setShowCreateShopModal(false)}
                onCreate={createShop}
            />
            {selectedShop && (
                <div>
                    <UpdateShopModal
                        shop={selectedShop}
                        isOpen={showUpdateShopModal}
                        onClose={() => setShowUpdateShopModal(false)}
                        onUpdate={updateShop}
                    />
                    <DeleteShopModal
                        shop={selectedShop}
                        isOpen={showDeleteShopModal}
                        onClose={() => setShowDeleteShopModal(false)}
                        onDelete={deleteShop}
                    />
                </div>
            )}
        </div>
    );

}

export default HomePage;