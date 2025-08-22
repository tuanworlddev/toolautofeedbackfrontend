import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import annotationPlugin from 'chartjs-plugin-annotation';

Chart.register(annotationPlugin);
import type { Shop } from '../models/shop';

type Props = {
    shop: Shop
}

// Định nghĩa kiểu cho dữ liệu từ API
interface ChartData {
    nmID: number;
    vendorCode: string;
    ordersCount: number;
    ordersSumRub: number;
    prevOrdersCount: number;
    prevOrdersSumRub: number;
}

interface OrderResponse {
    chartData: ChartData[],
    totalOrders: number,
    totalPrevOrders: number
}

function OrdersReport({ shop }: Props) {
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [totalOrders, setTotalOrders] = useState<number>(0);
    const [totalPrevOrders, setTotalPrevOrders] = useState<number>(0);
    const [chartData, setChartData] = useState<ChartData[]>([]);
    const [error, setError] = useState<string>('');
    const ordersChartRef = useRef<Chart | null>(null);
    const revenueChartRef = useRef<Chart | null>(null);
    const ordersCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const revenueCanvasRef = useRef<HTMLCanvasElement | null>(null);

    // Format date to YYYY-MM-DD HH:mm:ss for dateFrom (00:00:00) and dateTo (23:59:59)
    const formatDateRange = (dateString: string): { dateFrom: string; dateTo: string } => {
        if (!dateString) return { dateFrom: '', dateTo: '' };
        const date = new Date(dateString);
        const pad = (num: number) => String(num).padStart(2, '0');
        const dateFormatted = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
        return {
            dateFrom: `${dateFormatted} 00:00:00`,
            dateTo: `${dateFormatted} 23:59:59`,
        };
    };

    // Fetch data from API
    const fetchData = async () => {
        if (!shop?.apiKey || !selectedDate) {
            setError('Vui lòng chọn cửa hàng và ngày');
            return;
        }

        const { dateFrom, dateTo } = formatDateRange(selectedDate);

        try {
            const response = await axios.post<OrderResponse>('http://localhost:8080/api/v1/orders', {
                apiKey: shop.apiKey,
                dateFrom,
                dateTo,
            });
            setChartData(response.data.chartData);
            setTotalOrders(response.data.totalOrders);
            setTotalPrevOrders(response.data.totalPrevOrders);
            setError('');
        } catch (err) {
            setError('Lỗi khi lấy dữ liệu: ' + (axios.isAxiosError(err) ? err.response?.data?.error || err.message : 'Unknown error'));
            setChartData([]);
            setTotalOrders(0);
            setTotalPrevOrders(0);
        }
    };

    // Download chart as PNG
    const downloadChart = (chartRef: React.MutableRefObject<Chart | null>, filename: string) => {
        if (chartRef.current) {
            const link = document.createElement('a');
            link.href = chartRef.current.toBase64Image();
            link.download = filename;
            link.click();
        }
    };

    const formatDate = (date: Date) =>
        `${date.getFullYear().toString()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

    // Render charts
    useEffect(() => {
        if (chartData.length === 0) return;

        // Destroy existing charts
        if (ordersChartRef.current) ordersChartRef.current.destroy();
        if (revenueChartRef.current) revenueChartRef.current.destroy();

        const previousDate = new Date(selectedDate);
        previousDate.setDate(previousDate.getDate() - 1);
        // Orders Chart
        if (ordersCanvasRef.current) {
            ordersChartRef.current = new Chart(ordersCanvasRef.current, {
                type: 'bar',
                data: {
                    labels: chartData.map(item => item.vendorCode),
                    datasets: [
                        {
                            label: `${formatDate(previousDate)}`,
                            data: chartData.map(item => item.prevOrdersCount),
                            backgroundColor: '#36A2EB',
                        },
                        {
                            label: `${selectedDate}`,
                            data: chartData.map(item => item.ordersCount),
                            backgroundColor: '#FF6384',
                        },
                    ],
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Số đơn hàng theo sản phẩm',
                        },
                        annotation: {
                            annotations: {
                                totalPrevOrders: {
                                    type: 'label',
                                    xValue: chartData.length - 2,
                                    yValue: Math.max(...chartData.map(item => item.prevOrdersCount)) * 1.3,
                                    content: `Tổng đơn: ${totalPrevOrders}`,
                                    backgroundColor: '#36A2EB',
                                    font: { size: 12 },
                                    padding: 4,
                                },
                                totalOrders: {
                                    type: 'label',
                                    xValue: chartData.length / 2,
                                    yValue: Math.max(...chartData.map(item => item.ordersCount)) * 1.4,
                                    content: `Tổng đơn: ${totalOrders}`,
                                    backgroundColor: '#FF6384',
                                    font: { size: 12 },
                                    padding: 4,
                                },
                            },
                        },
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: { display: true, text: 'Số đơn hàng' },
                        },
                        x: {
                            title: { display: true, text: 'Mã sản phẩm (VendorCode)' },
                        },
                    },
                },
            });
        }

        // Revenue Chart
        if (revenueCanvasRef.current) {
            revenueChartRef.current = new Chart(revenueCanvasRef.current, {
                type: 'bar',
                data: {
                    labels: chartData.map(item => item.vendorCode),
                    datasets: [
                        {
                            label: `${formatDate(previousDate)}`,
                            data: chartData.map(item => item.prevOrdersCount),
                            backgroundColor: '#36A2EB',
                        },
                        {
                            label: `${selectedDate}`,
                            data: chartData.map(item => item.ordersCount),
                            backgroundColor: '#FF6384',
                        },
                    ],
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Doanh thu theo sản phẩm',
                        },
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: { display: true, text: 'Doanh thu (RUB)' },
                        },
                        x: {
                            title: { display: true, text: 'Mã sản phẩm (VendorCode)' },
                        },
                    },
                },
            });
        }

        return () => {
            if (ordersChartRef.current) ordersChartRef.current.destroy();
            if (revenueChartRef.current) revenueChartRef.current.destroy();
        };
    }, [chartData]);

    // Handle shop change
    useEffect(() => {
        setChartData([]);
        setError('');
    }, [shop?.id]);

    return (
        <div className="container mx-auto p-4 space-y-8">
            <h1 className="text-2xl font-bold text-center">Báo cáo đơn hàng</h1>
            <div className="bg-white p-4 rounded-lg shadow flex flex-col sm:flex-row gap-4 items-center">
                <div className="flex flex-col">
                    <label className="text-sm font-medium">Chọn ngày</label>
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="border rounded p-2"
                    />
                </div>
                <button
                    onClick={fetchData}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Tìm kiếm
                </button>
            </div>
            {error && <div className="text-red-500 text-center">{error}</div>}
            {chartData.length > 0 && (
                <>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <canvas ref={ordersCanvasRef}></canvas>
                        <button
                            onClick={() => downloadChart(ordersChartRef, 'orders_chart.png')}
                            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                            Tải biểu đồ đơn hàng
                        </button>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <canvas ref={revenueCanvasRef}></canvas>
                        <button
                            onClick={() => downloadChart(revenueChartRef, 'revenue_chart.png')}
                            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                            Tải biểu đồ doanh thu
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default OrdersReport;