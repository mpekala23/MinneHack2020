import axios from 'axios';

export function checkLogin(username, password) {
    return axios.get('https://hot-bills.herokuapp.com/check_user',{
        params: {
                username: username,
                password: password,
        }}
    );
}

export function getBills() {
    return axios.get('https://hot-bills.herokuapp.com/get_bills',{
        params: {
        }}
    );
}

export function registerUser(username, password) {
    return axios.post('https://hot-bills.herokuapp.com/insert_user',{
        params: {
              username: username,
              psasword: password,
        }}
    );
}
