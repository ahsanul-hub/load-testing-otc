import http from "k6/http";
import { checkStatus } from "../utils.js";
import {Login} from '../login.js'
import {Profile} from "../profile.js";


export const options = {
    stages: [
        { target: 300, duration: '10s' },
        // { target: 3000, duration: '10s' },
    ],
};

let tkn1 , tkn2
export function setup(){
    let response = http.post(
        `https://api-beta.rekeningku.net/v2/login`,
        {
            email: 'john.jojon888@gmail.com',
            password: 'Jakarta098890#',
            c: '',
        },
        {
            headers: {
                accept: 'application/json, text/plain, */*',
                'content-type': 'application/x-www-form-urlencoded',
            },
        }
    )
    // console.log(response.json().token)
    tkn1 = response.json().token
    // tkn2 = Profile()
}

export default function WalletDetail(){
    // if(__ITER == 0 ){
    //     tkn1 = Login()
    //     tkn2 = Profile()
    // }
    console.log(tkn1)
    let res = http.post(
        `${__ENV.BASE_URL}/walletdetail`,
        {
            id: 'IDR',
            token: tkn1 //'d2htbURaWjFuRGxoWjcvMVJneHBSQ01LRkFmYnpIMmNMMndodEhLc3J6QT0=',
        },
        {
            headers: {
                accept: 'application/json, text/plain, */*',
                'content-type': 'application/x-www-form-urlencoded',
                lang: 'id',
                token: tkn1 //'d2htbURaWjFuRGxoWjcvMVJneHBSQ01LRkFmYnpIMmNMMndodEhLc3J6QT0=',
            },
        }
    )
    console.log(res.json())
    checkStatus({
        response: res,
        expectedStatus: 200,
        failOnError: true,
        printOnError: true
    });

}

