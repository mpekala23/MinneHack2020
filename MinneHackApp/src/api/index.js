import axios from 'axios';

export function checkLogin(username, password) {
    return axios.get('https://hot-bills.herokuapp.com/check_user',
        {params: {
                username: username,
                password: password,
        }}
    );
}
