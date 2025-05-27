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
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0,0,256,256">
                            <g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style={{ mixBlendMode: "normal" }}><g transform="scale(10.66667,10.66667)"><path d="M11,0v3h2v-3zM4.22266,2.80859l-1.41406,1.41406l2.12109,2.12109l1.41406,-1.41406zM19.77734,2.80859l-2.12109,2.12109l1.41406,1.41406l2.12109,-2.12109zM12,5c-3.85433,0 -7,3.14567 -7,7c0,2.76779 1.65612,5.10224 4,6.23438v2.76563c0,1.09306 0.90694,2 2,2h2c1.09306,0 2,-0.90694 2,-2v-2.76562c2.34388,-1.13214 4,-3.46659 4,-6.23437c0,-3.85433 -3.14567,-7 -7,-7zM12,7c2.77367,0 5,2.22633 5,5c0,2.18434 -1.39467,4.02285 -3.33398,4.70898l-0.66602,0.23438v4.05664h-2v-4.05664l-0.66602,-0.23437c-1.93932,-0.68613 -3.33398,-2.52464 -3.33398,-4.70898c0,-2.77367 2.22633,-5 5,-5zM0,11v2h3v-2zM21,11v2h3v-2zM4.92969,17.65625l-2.12109,2.12109l1.41406,1.41406l2.12109,-2.12109zM19.07031,17.65625l-1.41406,1.41406l2.12109,2.12109l1.41406,-1.41406z"></path></g></g>
                        </svg>
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