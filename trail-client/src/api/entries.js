import axios from 'axios';

const API = 'http://localhost:1337/api/entries';

export async function getEntries() {
    const res = await axios.get(API); //make GET request to API to fetch all entries
    return res.data.data; // Strapi wraps the real data in a "data" object
}