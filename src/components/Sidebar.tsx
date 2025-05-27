import { useState } from "react";
import type { Shop } from "../models/shop";

type SidebarProps = {
    shops: Shop[];
    selectedShop?: Shop;
    onCreateClick: () => void;
    onSelectShop: (shop: Shop) => void;
};

function Sidebar({ shops, selectedShop, onCreateClick, onSelectShop }: SidebarProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const LogoHeader = () => (
        <div className="px-3 py-6 flex items-center justify-center gap-3">
            <img src="./wb_logo.png" alt="Wildberries" className="w-8 h-8 rounded-md" />
            <span className="text-2xl text-blue-900 font-bold uppercase">Shops</span>
        </div>
    );

    const NewButton = () => (
        <div className="text-end mb-2 px-3">
            <button
                onClick={onCreateClick}
                className="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 active:bg-green-800 transition-colors"
            >
                + New
            </button>
        </div>
    );

    const ShopList = () => (
        <ul className="px-3">
            {shops.map((shop) => (
                <li
                    key={shop.id}
                    onClick={() => onSelectShop(shop)}
                    className={`flex items-center gap-2 text-sm my-2 p-2 rounded-md transition-colors cursor-pointer hover:bg-blue-300
                        ${shop.id === selectedShop?.id ? "bg-blue-500 text-white font-bold" : "text-black"}`}
                >
                    <svg viewBox="0 0 16 16" fill="none" width="16" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 1L0 4V5C0 5 2 6 4 6C6 6 8 5 8 5C8 5 10 6 12 6C14 6 16 5 16 5V4L13 1H3Z" fill="currentColor" />
                        <path fillRule="evenodd" clipRule="evenodd"
                            d="M1 15V7.5187C1.81671 7.76457 2.88168 8 4 8C5.3025 8 6.53263 7.68064 7.38246 7.39737C7.60924 7.32177 7.81664 7.24612 8 7.17526C8.18337 7.24612 8.39076 7.32177 8.61754 7.39737C9.46737 7.68064 10.6975 8 12 8C13.1183 8 14.1833 7.76457 15 7.5187V15H7V10H4V15H1ZM12 10H10V13H12V10Z"
                            fill="currentColor" />
                    </svg>
                    <span>{shop.name}</span>
                </li>
            ))}
        </ul>
    );

    const SidebarContent = () => (
        <div className="bg-white w-64 h-full flex flex-col">
            <LogoHeader />
            <hr className="text-blue-50 mb-3" />
            <NewButton />
            <hr className="text-blue-50 mb-3" />
            <ShopList />
        </div>
    );

    return (
        <div>
            {/* Desktop sidebar */}
            <div className="hidden md:flex md:w-64 md:h-screen">
                <SidebarContent />
            </div>

            {/* Mobile top bar */}
            <div className="w-full h-16 flex md:hidden items-center justify-start p-3 shadow">
                <div className="flex items-center w-full gap-6">
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-2xl">
                        ☰
                    </button>
                    <div className="flex items-center gap-2">
                        <img src="./wb_logo.png" alt="Wildberries" className="w-8 h-8 rounded" />
                        <span className="font-bold text-xl text-blue-900">Shops</span>
                    </div>
                </div>
            </div>

            {/* Mobile sidebar drawer */}
            {sidebarOpen && (
                <>
                    <div className="fixed inset-0 z-30 bg-black/40 md:hidden" onClick={() => setSidebarOpen(false)} />
                    <div className="fixed top-0 left-0 z-40 h-full w-64 bg-white transition-transform duration-300 ease-in-out transform md:hidden">
                        <SidebarContent />
                    </div>
                </>
            )}
        </div>
    );
}

export default Sidebar;
