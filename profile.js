import { check, sleep } from "k6";
import http from "k6/http";
import { checkStatus } from "./utils.js";
import {Login} from "./login.js";


let tkn

export function Profile(){
    if(!tkn){
        tkn = Login()
    }
    let res = http.post(
        `https://api-beta.rekeningku.net/v2/profile`,
        {
            token: tkn ,
        },
        {
            headers: {
                accept: 'application/json, text/plain, */*',
                'content-type': 'application/x-www-form-urlencoded',
                hash: '2d69afc537560321259422c2c28a0929',
                token: tkn,
            },
        }
    )
    return res.json().token

    checkStatus({
        response: res,
        expectedStatus: 200,
        failOnError: true,
        printOnError: false
    });

}