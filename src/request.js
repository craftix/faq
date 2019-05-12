import store from './store';

export const API_URL = window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost' ?
                'http://127.0.0.1:2627' : 'https://api.faq.litarvan.com';

export function httpGet(path, params = {}) {
    return request('GET', path, params)
}

export function httpPost(path, params = {}) {
    return request('GET', path, params)
}

async function request(method, path, params) {
    return await (await fetch(API_URL + path, {
        method,
        headers: {
            Authorization: 'Bearer ' + store.state.token
        },
        body: JSON.stringify(params)
    })).json()
}
