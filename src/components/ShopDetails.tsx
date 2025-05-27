import { useEffect, useState } from "react";
import type { Shop } from "../models/shop";
import feedbackService from "../services/feedbackService";
import questionService from "../services/questionService";

type ShopDetailsProps = {
    shop: Shop;
    onToggleActivate: (id: string) => void;
    onToggleIsAuto: (id: string) => void;
    onupdateClick: () => void;
    onDeleteClick: () => void;
}

function ShopDetails({ shop, onToggleActivate, onToggleIsAuto, onupdateClick, onDeleteClick }: ShopDetailsProps) {
    const [countUnanswered, setCountUnanswered] = useState(0);
    const [countUnansweredToday, setCountUnansweredToday] = useState(0);
    const [countQuestionUnanswered, setCountQuestionUnanswered] = useState(0);
    const [countQuestionUnansweredToday, setCountQuestionUnansweredToday] = useState(0);
    const [feedbacks, setFeedbacks] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [processQuestionLoading, setProcessQuestionLoading] = useState(false);

    useEffect(() => {
        fetchCountUnanswered();
        fetchCountQuestionUnanswered();
        fetchFeedbacks();
    }, [shop.id]);

    const fetchCountUnanswered = async () => {
        const response = await feedbackService.getCountUnanswered(shop.apiKey);
        setCountUnanswered(response.countUnanswered);
        setCountUnansweredToday(response.countUnansweredToday);
    }

    const fetchFeedbacks = async () => {
        const response = await feedbackService.getFeedbacks(shop.apiKey, true, 20, 0, "dateDesc");
        setFeedbacks(response);
    }

    const process = async () => {
        setLoading(true);
        const response = await feedbackService.process(shop.id);
        if (response.status === 200) {
            await fetchCountUnanswered();
        }
        setLoading(false);
    }

    const fetchCountQuestionUnanswered = async () => {
        const response = await questionService.getCountUnanswered(shop.apiKey);
        setCountQuestionUnanswered(response.countUnanswered);
        setCountQuestionUnansweredToday(response.countUnansweredToday);
    }

    const processQuestion = async () => {
        setProcessQuestionLoading(true);
        const response = await questionService.process(shop.id);
        if (response.status === 200) {
            await fetchCountQuestionUnanswered();
        }
        setProcessQuestionLoading(false);
    }

    const seeMoreFeedbacks = async () => {
        const response = await feedbackService.getFeedbacks(shop.apiKey, true, 20, feedbacks.length, "dateDesc");
        setFeedbacks((prev: any) => [...prev, ...response]);
    }

    return (
        <div className="p-3 md:p-6 min-h-screen">
            <div className="flex w-full items-center justify-between mb-3">
                <div>
                    <div className="flex items-center justify-start gap-3">
                        <div className="text-blue-800 text-xl md:text-2xl font-bold">Shop: {shop.name} </div>
                        <button onClick={onupdateClick}><svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15.4998 5.49994L18.3282 8.32837M3 20.9997L3.04745 20.6675C3.21536 19.4922 3.29932 18.9045 3.49029 18.3558C3.65975 17.8689 3.89124 17.4059 4.17906 16.9783C4.50341 16.4963 4.92319 16.0765 5.76274 15.237L17.4107 3.58896C18.1918 2.80791 19.4581 2.80791 20.2392 3.58896C21.0202 4.37001 21.0202 5.63634 20.2392 6.41739L8.37744 18.2791C7.61579 19.0408 7.23497 19.4216 6.8012 19.7244C6.41618 19.9932 6.00093 20.2159 5.56398 20.3879C5.07171 20.5817 4.54375 20.6882 3.48793 20.9012L3 20.9997Z" stroke="#0f6bff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></button>
                        <button onClick={onDeleteClick}><svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 11V17" stroke="#db0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 11V17" stroke="#db0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4 7H20" stroke="#db0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="#db0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#db0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></button>
                    </div>
                    <div className={`text-sm ${shop.activate ? 'text-green-500' : 'text-red-500'}`}>Status: <span>{shop.activate ? 'On' : 'Off'}</span></div>
                </div>
                <div className="">
                    {shop.activate ? (
                        <div className="flex flex-col gap-2">
                            <button onClick={() => onToggleActivate(shop.id)} className="text-red-500 px-2 bg-red-50 cursor-pointer border border-red-400 rounded-md">Unactivate</button>
                        </div>
                    ) : (
                        <button onClick={() => onToggleActivate(shop.id)} className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 transition-colors cursor-pointer rounded-md">Activate</button>
                    )}
                </div>
            </div>
            {shop.activate ? (
                <div className="flex flex-col md:flex-row items-start justify-between gap-3 mb-3">
                    <div className="w-full md:w-1/2 flex flex-col gap-3">
                        <div className="bg-white rounded-md p-3">
                            <div className="flex items-center justify-between mb-2">
                                <div className="md:text-xl font-bold text-blue-800">Feedbacks count unanswered</div>
                                <label className="inline-flex items-center cursor-pointer">
                                    <span className="mr-1 text-sm font-medium text-blue-500">Auto reply feedback</span>
                                    <input type="checkbox" value="" className="sr-only peer" checked={shop.isAuto} onChange={() => onToggleIsAuto(shop.id)} />
                                    <div className="relative w-9 h-4 bg-blue-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                            <div>
                                Count Unanswered: {countUnanswered}
                            </div>
                            <div className="mb-2">
                                Count Unanswered today: {countUnansweredToday}
                            </div>
                            {countUnanswered > 0 ? (
                                <button onClick={process} className="px-4 py-2 bg-blue-500 disabled:bg-blue-300 text-white hover:bg-blue-600 active:bg-blue-700 transition-colors cursor-pointer rounded-md" disabled={loading ? true : false}>{loading ? 'Processing...' : 'Process'}</button>
                            ) : (
                                <div></div>
                            )}
                        </div>
                        <div className="bg-white rounded-md p-3">
                            <div className="flex items-center justify-between mb-2">
                                <div className="md:text-xl font-bold text-blue-800">Questions count unanswered</div>
                            </div>
                            <div>
                                Count Unanswered: {countQuestionUnanswered}
                            </div>
                            <div className="mb-2">
                                Count Unanswered today: {countQuestionUnansweredToday}
                            </div>
                            {countQuestionUnanswered > 0 ? (
                                <button onClick={processQuestion} className="px-4 py-2 bg-blue-500 disabled:bg-blue-300 text-white hover:bg-blue-600 active:bg-blue-700 transition-colors cursor-pointer rounded-md" disabled={processQuestionLoading ? true : false}>{processQuestionLoading ? 'Processing...' : 'Process'}</button>
                            ) : (
                                <div></div>
                            )}
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 bg-white rounded-md p-3">
                        <div className="md:text-xl font-bold text-blue-800 mb-2">Feedbacks ({feedbacks.length})</div>
                        <div className="overflow-y-auto" style={{ maxHeight: "500px" }}>
                            {feedbacks.length > 0 ? (
                                <div>
                                    {feedbacks.map((feedback: any) => (
                                        <div
                                            key={feedback.id}
                                            className="border border-gray-300 shadow-md rounded-xl p-4 mb-4 bg-white"
                                        >
                                            <div className="text-base font-semibold text-blue-800 mb-2">
                                                Customer: <span className="font-normal text-gray-800">{feedback.userName}</span>
                                            </div>
                                            <div className="mb-1">
                                                <span className="font-medium text-gray-700">Product:</span>{' '}
                                                <span className="text-gray-900">{feedback.productDetails.productName}</span>
                                            </div>
                                            <div className="mb-1">
                                                <span className="font-medium text-gray-700">Supplier art:</span>{' '}
                                                <span className="text-gray-900">{feedback.productDetails.supplierArticle}</span>
                                            </div>
                                            <div className="mb-1">
                                                <span className="font-medium text-gray-700">Valuation:</span>{' '}
                                                <span className="text-yellow-500 font-semibold">{feedback.productValuation} ★</span>
                                            </div>
                                            <div className="mb-1">
                                                <span className="font-medium text-gray-700">Question:</span>{' '}
                                                <span className="text-gray-900">{feedback.text || 'No question yet'}</span>
                                            </div>
                                            <div>
                                                <span className="font-medium text-gray-700">Answer:</span>{' '}
                                                <span className="text-gray-900">{feedback.answer?.text || 'No answer yet'}</span>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="text-center">
                                        <button onClick={seeMoreFeedbacks} className="text-blue-500 hover:text-blue-600 active:text-blue-700 font-bold transition-colors cursor-pointer">Seed more</button>
                                    </div>
                                </div>
                            ) : (
                                <div>Feedbacks is empty</div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                </div>
            )}
        </div>
    )
}

export default ShopDetails;