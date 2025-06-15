import { useState } from "react";
import type { Shop } from "../models/shop";
import reportService from "../services/reportService";

type Props = {
    shop: Shop;
};

function ReportComponent({ shop }: Props) {
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [tax, setTax] = useState(0.06);
    const [discount, setDiscount] = useState(3.5);
    const [loading, setLoading] = useState(false);

    const handleDownload = async () => {
        if (!dateFrom || !dateTo) {
            alert("Vui lòng chọn khoảng thời gian.");
            return;
        }

        setLoading(true);
        try {
            const fromISO = new Date(dateFrom).toISOString();
            const toISO = new Date(dateTo).toISOString();
            await reportService.downloadReport(shop.apiKey, fromISO, toISO, tax, discount);
        } catch (error) {
            alert("Lỗi khi tải báo cáo.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 bg-white rounded-md shadow-md space-y-4">
            <h3 className="text-xl font-bold text-blue-800">Report</h3>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex flex-col">
                    <label htmlFor="dateFrom" className="text-sm text-gray-600">From</label>
                    <input
                        type="date"
                        id="dateFrom"
                        className="border rounded-md p-2"
                        value={dateFrom}
                        onChange={(e) => setDateFrom(e.target.value)}
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="dateTo" className="text-sm text-gray-600">To</label>
                    <input
                        type="date"
                        id="dateTo"
                        className="border rounded-md p-2"
                        value={dateTo}
                        onChange={(e) => setDateTo(e.target.value)}
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="tax" className="text-sm text-gray-600">Tax (%)</label>
                    <input
                        type="number"
                        id="tax"
                        className="border rounded-md p-2"
                        step="0.01"
                        min="0"
                        value={tax}
                        onChange={(e) => setTax(parseFloat(e.target.value))}
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="discount" className="text-sm text-gray-600">Discount (%)</label>
                    <input
                        type="number"
                        id="discount"
                        className="border rounded-md p-2"
                        step="0.01"
                        min="0"
                        value={discount}
                        onChange={(e) => setDiscount(parseFloat(e.target.value))}
                    />
                </div>
            </div>

            <button
                onClick={handleDownload}
                disabled={loading}
                className={`px-4 py-2 rounded-md text-white transition-colors ${loading
                        ? "bg-blue-300 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600 active:bg-blue-700"
                    }`}
            >
                {loading ? "Đang tải..." : "Download Report"}
            </button>
        </div>
    );
}

export default ReportComponent;
