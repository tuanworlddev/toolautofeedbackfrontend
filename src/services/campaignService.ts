import axios from "axios";

async function getCanpaigns(apiKey: string) {
    try {
        const response = await axios.post('https://advert-api.wildberries.ru/adv/v1/promotion/count', {
            apiKey: apiKey
        });
        
    } catch (error) {

    }
}

export default { getCanpaigns };