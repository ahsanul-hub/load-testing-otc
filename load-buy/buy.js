import http from "k6/http";
import { checkStatus } from "../utils.js";
import { FormData } from 'https://jslib.k6.io/formdata/0.0.2/index.js'
import {Login} from "../login.js";
import {Profile} from "../profile";


export const options = {
    stages: [
        { target: 30, duration: '10s' },
        // { target: 3000, duration: '10s' },
    ],
};

let tkn1, tkn2
export function setup(){
    tkn1 = Login()
    tkn2 = Profile()
}

export default function Buy(){
    let resPost, resGet,formData

    formData = new FormData()
    formData.boundary = '----WebKitFormBoundary98S9EuEEiMbcdkyR'
    formData.append('product', '1')
    formData.append('trans_type', '0')
    formData.append('quantity', '10000')

    resPost = http.post(`${__ENV.BASE_URL}/otc/reserve`, formData.body(), {
        headers: {
            accept: 'application/json, text/plain, */*',
            'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary98S9EuEEiMbcdkyR',
            lang: 'id',
            'sec-ch-ua': '"Chromium";v="104", " Not A;Brand";v="99", "Google Chrome";v="104"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"',
            token: tkn1,
        },
    })
    console.log(resPost.json())
    checkStatus({
        response: resPost,
        expectedStatus: 200,
        failOnError: true,
        printOnError: true
    });

    resGet = http.get(`${__ENV.BASE_URL}/otc/reserve/1`, {
        headers: {
            accept: 'application/json, text/plain, */*',
            lang: 'id',
            'sec-ch-ua': '"Chromium";v="104", " Not A;Brand";v="99", "Google Chrome";v="104"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"',
            token: tkn1,
        },
    })
    // console.log(resGet.json())
    checkStatus({
        response: resGet,
        expectedStatus: 200,
        failOnError: true,
        printOnError: true
    });
}