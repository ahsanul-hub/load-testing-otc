import http from "k6/http";
import { checkStatus } from "../utils.js";
import {Login} from '../login.js'
import {Profile} from '../profile.js'
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

// export function handleSummary(data) {
//     return {
//         "result_balance.html": htmlReport(data),
//     };
// }

export const options = {
    stages: [
        { target: 300, duration: '10s' },
        { target: 2000, duration: '10s' },
    ],
};

// let tkn1, tkn2


export default function Balance(){
    // console.log(tkn2)
    let res = http.post(
        `${__ENV.BASE_URL}/balance`,
        {
            token: 'd2htbURaWjFuRGxoWjcvMVJneHBSQ01LRkFmYnpIMmNMMndodEhLc3J6QT0=',
        },
        {
            headers: {
                accept: 'application/json, text/plain, */*',
                'cache-control': 'no-cache',
                'content-type': 'application/x-www-form-urlencoded',
                token: 'd2htbURaWjFuRGxoWjcvMVJneHBSQ01LRkFmYnpIMmNMMndodEhLc3J6QT0=',
            },
        }
    )
    checkStatus({
        response: res,
        expectedStatus: 200,
        failOnError: true,
        printOnError: true
    });

}

