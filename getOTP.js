import http from "k6/http";
import { checkStatus } from "./utils.js";
import {Login} from './login.js'
import {Profile} from "./profile.js";


export const options = {
    stages: [
        { target: 3, duration: '10s' },
    ],
};

let a = 0
let tkn, tkn2

export default function GetOTP(){
    if(a==0){
        tkn = Login()[0]
        tkn2 = Profile()
        a++
    }
    let res = http.post(
        `${__ENV.BASE_URL}/sendsms`,
        {
            token: tkn2,
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
    console.log(res.json())

    checkStatus({
        response: res,
        expectedStatus: 200,
        failOnError: true,
        printOnError: true
    });

}

