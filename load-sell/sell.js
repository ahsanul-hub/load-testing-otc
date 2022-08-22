import http from "k6/http";
import { checkStatus } from "../utils.js";
import { FormData } from 'https://jslib.k6.io/formdata/0.0.2/index.js'
import {Login} from "../login.js";
import {Profile} from "../profile.js";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export function handleSummary(data) {
    return {
        "result_sell.html": htmlReport(data),
    };
}


export const options = {
    stages: [
        { target: 300, duration: '10s' },
        { target: 2000, duration: '10s' },
    ],
};

// let tkn
// export function setup(){
//     tkn = Login()
// }

export default function Sell(){
    // console.log(`token : ${tkn}`)
    let resPost, resGet,formData
    formData = new FormData()
    formData.boundary = '----WebKitFormBoundaryjwSR8Ph1Y40KLtBk'
    formData.append('product', '1')
    formData.append('trans_type', '1')
    formData.append('quantity', '20000')

    resPost = http.post(`${__ENV.BASE_URL}/otc/reserve`, formData.body(), {
        headers: {
            accept: 'application/json, text/plain, */*',
            'content-type': 'multipart/form-data; boundary=----WebKitFormBoundaryjwSR8Ph1Y40KLtBk',
            token: 'd2htbURaWjFuRGxoWjcvMVJneHBSQ01LRkFmYnpIMmNMMndodEhLc3J6QT0=',
        },
    })
    checkStatus({
        response: resPost,
        expectedStatus: 200,
        failOnError: true,
        printOnError: true
    });

    resGet = http.get(`${__ENV.BASE_URL}/otc/reserve/1`, {
        headers: {
            accept: 'application/json, text/plain, */*',
            token: 'd2htbURaWjFuRGxoWjcvMVJneHBSQ01LRkFmYnpIMmNMMndodEhLc3J6QT0=',
        },
    })

    checkStatus({
        response: resGet,
        expectedStatus: 200,
        failOnError: true,
        printOnError: true,
    });
}