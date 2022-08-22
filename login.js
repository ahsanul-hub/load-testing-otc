import { sleep, group } from 'k6'
import http from 'k6/http'


export function Login() {
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
    return response.json().token

}

