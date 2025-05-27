import type { Shop } from "../models/shop";

type SidebarProps = {
    shops: Shop[];
    selectedShop?: Shop;
    onCreateClick: () => void;
    onSelectShop: (shop: Shop) => void;
}

function Sidebar({ shops, selectedShop, onCreateClick, onSelectShop }: SidebarProps) {

    return (
        <div className="w-64 h-screen flex flex-col bg-white">
            <div className="px-3 py-6 flex items-center justify-center gap-3">
                <img src="./wb_logo.png" alt="Wildberries" width="32px" height="32px" className="rounded-md" />
                <div className="text-2xl text-blue-900 font-bold uppercase">Shops</div>
            </div>
            <hr className="text-blue-50 mb-3" />
            <div className="px-3">
                <div className="text-end mb-2">
                    <button
                        onClick={onCreateClick}
                        className="px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 active:bg-green-800 transition-colors"
                    >
                        + New
                    </button>
                </div>
                <hr className="text-blue-50 mb-3" />
                <ul>
                    {shops.length > 0 && shops.map((shop) => (
                        <li
                            key={shop.id}
                            className={`flex items-center justify-start gap-2 text-sm text-black my-2 p-2 transition-colors rounded-md hover:bg-blue-300 cursor-pointer ${shop.id === selectedShop?.id ? 'bg-blue-500 text-white font-bold' : ''}`}
                            onClick={() => onSelectShop(shop)}
                        >
                            <svg viewBox="0 0 16 16" fill="none" width="16" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 1L0 4V5C0 5 2 6 4 6C6 6 8 5 8 5C8 5 10 6 12 6C14 6 16 5 16 5V4L13 1H3Z" fill="#000000"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M1 15V7.5187C1.81671 7.76457 2.88168 8 4 8C5.3025 8 6.53263 7.68064 7.38246 7.39737C7.60924 7.32177 7.81664 7.24612 8 7.17526C8.18337 7.24612 8.39076 7.32177 8.61754 7.39737C9.46737 7.68064 10.6975 8 12 8C13.1183 8 14.1833 7.76457 15 7.5187V15H7V10H4V15H1ZM12 10H10V13H12V10Z" fill="#000000"></path> </g></svg>
                            <span>{shop.name}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Sidebar