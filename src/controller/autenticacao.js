import axios from "axios"

export default async function autentic() {
    const config = {
        method: 'get',
        url: 'https://api.scripture.api.bible/v1/bibles',
        headers: {"api-key": "4be11d45a3c82176fc98848f8dc92c28"}
    }
    const response = await axios(config);
    // const token = "Bearer " + response
    return response
}

console.log(autentic())