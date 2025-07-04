import { useEffect, useState } from "react";
import type { Shop } from "../models/shop";
import reportService from "../services/reportService";
import { toast } from "react-toastify";
import ButtonItem from "./ButtonItem";

type Props = {
    shop: Shop;
};

function ReportComponent({ shop }: Props) {
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [tax, setTax] = useState(0.06);
    const [discount, setDiscount] = useState(3.5);

    useEffect(() => {
    }, [shop.id])

    const handleDownload = async () => {
        if (!dateFrom || !dateTo) {
            toast.error("Vui lòng chọn khoảng thời gian.");
            return;
        }
        try {
            const fromISO = new Date(dateFrom).toISOString();
            const toISO = new Date(dateTo).toISOString();
            await reportService.downloadReport(shop, fromISO, toISO, tax, discount);
        } catch (error) {
            toast.error("Lỗi tải báo cáo.");
        }
    };

    return (
        <div className="p-4 bg-white rounded-md space-y-4">
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
            <ButtonItem title="Download Report" onClick={handleDownload} />
        </div>
    );
}

export default ReportComponent;
