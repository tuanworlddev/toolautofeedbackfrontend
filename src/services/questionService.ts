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

}

export default questionService;