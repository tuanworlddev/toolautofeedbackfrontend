import axiosClient from "../api/axiosClient"

const questionService = {

    async getCountUnanswered(apiKey: string) {
        try {
            const response = await axiosClient.get(`/questions/count-unanswered?apiKey=${apiKey}`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error(`Error get count unanswered ${error}`);
            throw new Error(`Error get count unanswered ${error}`);
        }
    },

    async process(shopId: string) {
        try {
            const response = await axiosClient.post(`/questions/process/${shopId}`);
            return response;
        } catch (error) {
            console.error(`Error process ${error}`);
            throw new Error(`Error process ${error}`);
        }
    },

    async getQuestions(apiKey: string, isAnswered: boolean = true, take: number = 20, skip: number = 0, order: string = "dateDesc") {
        try {
            const response = await axiosClient.get(`/questions`, {
                params: {
                    apiKey: apiKey,
                    isAnswered: isAnswered,
                    take: take,
                    skip: skip,
                    order: order
                },
            });
            return response.data.questions;
        } catch (error) {
            console.error(`Error get questions ${error}`);
            throw new Error(`Error get questions ${error}`);
        }
    },

    async recommend(apiKey: string, questionId: string) {
        try {
            const response = await axiosClient.get(`/questions/recommend/${questionId}?apiKey=${apiKey}`,);
            return response.data;
        } catch (error) {
            console.error(`Error recommend ${error}`);
            throw new Error(`Error recommend ${error}`);
        }
    },

    async reply(apiKey: string, questionId: string, answer: string) {
        try {
            const response = await axiosClient.post(`/questions/reply/${questionId}?apiKey=${apiKey}`, {
                answer: answer
            });
            return response;
        } catch (error) {
            console.error(`Error reply ${error}`);
            throw new Error(`Error reply ${error}`);
        }
    },

}

export default questionService;