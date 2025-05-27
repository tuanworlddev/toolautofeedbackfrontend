import axiosClient from "../api/axiosClient"

const feedbackService = {

    async getCountUnanswered(apiKey: string) {
        try {
            const response = await axiosClient.get(`/feedbacks/count-unanswered?apikey=${apiKey}`);
            return response.data;
        } catch (error) {
            console.error(`Error get count unanswered ${error}`);
            throw new Error(`Error get count unanswered ${error}`);
        }
    },

    async process(shopId: string) {
        try {
            const response = await axiosClient.post(`/feedbacks/process/${shopId}`);
            return response;
        } catch (error) {
            console.error(`Error process ${error}`);
            throw new Error(`Error process ${error}`);
        }
    },

    async getFeedbacks(apiKey: string, isAnswered: boolean = true, take: number = 20, skip: number = 0, order: string = "dateDesc") {
        try {
            const response = await axiosClient.get(`/feedbacks`, {
                params: {
                    apiKey: apiKey,
                    isAnswered: isAnswered,
                    take: take,
                    skip: skip,
                    order: order
                },
            });
            return response.data.feedbacks;
        } catch (error) {
            console.error(`Error process ${error}`);
            throw new Error(`Error process ${error}`);
        }
    }

}

export default feedbackService;