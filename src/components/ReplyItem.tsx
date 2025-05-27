import { useState } from "react";
import questionService from "../services/questionService";

type Props = {
    question: any;
    apiKey: string;
    onReply: (id: string, answer: string) => void;
}

function ReplyItem({ apiKey, question, onReply }: Props) {
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);

    const recommend = async () => {
        setLoading(true);
        const answerRecommend = await questionService.recommend(apiKey, question.id);
        if (answerRecommend.answer) {
            setAnswer(answerRecommend.answer)
        }
        setLoading(false);
    }

    return (
        <div>
            <div
                className="border border-gray-300 shadow-md rounded-xl p-4 mb-4 bg-white"
            >
                <div className="text-base font-semibold text-blue-800 mb-2">
                    Question ID: <span className="font-normal text-gray-800">{question.id}</span>
                </div>
                <div className="mb-1">
                    <span className="font-medium text-gray-700">Date:</span>{' '}
                    <span className="text-gray-900">{new Date(question.createdDate).toLocaleString()}</span>
                </div>
                <div className="mb-1">
                    <span className="font-medium text-gray-700">Product:</span>{' '}
                    <span className="text-gray-900">{question.productDetails.productName}</span>
                </div>
                <div className="mb-1">
                    <span className="font-medium text-gray-700">Supplier art:</span>{' '}
                    <span className="text-gray-900">{question.productDetails.supplierArticle}</span>
                </div>
                <div className="mb-1">
                    <span className="font-medium text-gray-700">Question:</span>{' '}
                    <span className="text-gray-900">{question.text || 'No question yet'}</span>
                </div>
                <div className="mb-2 flex items-center justify-between">
                    <span className="font-medium text-gray-700">Answer</span>{' '}
                    <button onClick={recommend} disabled={loading ? true : false} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 active:bg-purple-700 disabled:bg-purple-300 transition-colors cursor-pointer text-white px-2 py-1 rounded-md">
                        <svg width="24px" height="24px" viewBox="0 0 32 32" enable-background="new 0 0 32 32" id="Stock_cut" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <desc></desc> <g> <path d="M17,31h-2 c-1.105,0-2-0.895-2-2v-2h6v2C19,30.105,18.105,31,17,31z" fill="none" stroke="#ffffff" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"></path> <path d="M23,16L23,16 c0,2.518-1.186,4.889-3.2,6.4L19,23v4h-6v-4l-0.8-0.6C10.186,20.889,9,18.518,9,16v0c0-3.866,3.134-7,7-7h0 C19.866,9,23,12.134,23,16z" fill="none" stroke="#ffffff" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"></path> <line fill="none" stroke="#ffffff" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" x1="16" x2="16" y1="6" y2="2"></line> <line fill="none" stroke="#ffffff" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" x1="8.93" x2="6.101" y1="8.929" y2="6.1"></line> <line fill="none" stroke="#ffffff" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" x1="23.07" x2="25.899" y1="8.929" y2="6.1"></line> <line fill="none" stroke="#ffffff" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" x1="6" x2="2" y1="16" y2="16"></line> <line fill="none" stroke="#ffffff" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" x1="26" x2="30" y1="16" y2="16"></line> </g> </g></svg>
                        {loading ? 'Generating...' : 'Recommend reply'}
                    </button>
                </div>
                {answer ? (
                    <div>
                        <textarea
                            wrap="soft"
                            className="w-full p-2 text-sm border min-h-32 rounded-md mb-1"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                        />
                        <div className="text-end">
                            <button onClick={() => onReply(question.id, answer)} className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white transition-colors px-3 py-1 rounded-md cursor-pointer">Reply</button>
                        </div>
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    )
}

export default ReplyItem;