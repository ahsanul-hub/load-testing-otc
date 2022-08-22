import http from "k6/http";
import { checkStatus } from "../utils.js";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export function handleSummary(data) {
    return {
        "result_markets.html": htmlReport(data),
    };
}

export const options = {
    stages: [
        { target: 300, duration: '10s' },
        { target: 3000, duration: '10s' },
    ],
};


export default function Markets(){
    let res = http.get(`${__ENV.BASE_URL}/otc/markets`, {
        headers: {
            accept: 'application/json, text/plain, */*',
            'cache-control': 'no-cache',
            'content-type': 'application/x-www-form-urlencoded',
            hash: '2d69afc537560321259422c2c28a0929',
        },
    })
    checkStatus({
        response: res,
        expectedStatus: 200,
        failOnError: true,
        printOnError: true
    });
}