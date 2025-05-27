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
    }

}

export default feedbackService;