import axios from 'axios';
import Constants from 'expo-constants';

const BASE_URL = 'https://ai-chat-api-kohl.vercel.app/api/geminiapi';

const getGeminiApi = (userMsg) => {
    return axios.get(`${BASE_URL}?prompt=${encodeURIComponent(userMsg)}`);
};

export default {
    getGeminiApi
};

// const BASE_URL='http://localhost:3000/api/geminiapi'

//const BASE_URL = 'https://ai-chat-api-kohl.vercel.app/api/geminiapi';