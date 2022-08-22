import { sleep, check } from "k6";
import http from "k6/http";
import { checkStatus } from "../utils.js";


export const options = {
    stages: [
        { target: 100, duration: '10s' },
        // { target: 2000, duration: '10s' },
    ],
};

export default function Settings(){
    let res

    res = http.get(`${__ENV.BASE_URL}/otc/product/1/settings`, {
        headers: {
            accept: 'application/json, text/plain, */*',
            'cache-control': 'no-cache',
            'content-type': 'application/x-www-form-urlencoded',
            hash: '2d69afc537560321259422c2c28a0929',
        },
    })

    console.log(res.json())


    checkStatus({
        response: res,
        expectedStatus: 200,
        failOnError: true,
        printOnError: true
    });

}