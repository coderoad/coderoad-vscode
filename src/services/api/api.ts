import axios from 'axios'

require('dotenv').config()

const api = axios.create({
    baseURL: process.env.API_URL,
    method: 'POST',
    headers: {
        'Content-Type': 'application/graphql',
    }
})

export default api