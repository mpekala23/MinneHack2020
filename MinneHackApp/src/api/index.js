import axios from 'axios';
const API_URL = 'https://hot-bills.herokuapp.com';
//const API_URL = 'http://127.0.0.1:5000';

export function checkLogin(username, password) {
    return axios.get(API_URL + '/check_user',{
        params: {
                username: username,
                password: password,
        }}
    );
}

export function getBills() {
    return axios.get(API_URL + '/get_bills',{
        params: {
        }}
    );
}

export function vote(bill, value) {
  let form = new FormData();
  form.append('username', username)
  form.append('bill', bill)
  form.append('value', value)
  return axios({
    method: 'post',
    url: API_URL + '/vote',
    data: form,
    headers: {'Content-Type': 'multipart/form-data' }
  });
}

export function registerUser(username, password) {
    let form = new FormData();
    form.append('username', username)
    form.append('password', password)
    return axios({
      method: 'post',
      url: API_URL + '/insert_user',
      data: form,
      headers: {'Content-Type': 'multipart/form-data' }
    });
}

export function getSubscriptions(username) {
    return axios.get(API_URL + '/get_subscriptions',{
        params: {
            username: username,
        }
    });
}

export function addSubscription(username, topic) {
    let form = new FormData();
    form.append('username', username)
    form.append('topic', topic)
    return axios({
      method: 'post',
      url: API_URL + '/insert_subscription',
      data: form,
      headers: {'Content-Type': 'multipart/form-data' }
    });
}

export function removeSubscription(username, topic) {
    let form = new FormData();
    form.append('username', username)
    form.append('topic', topic)
    return axios({
      method: 'post',
      url: API_URL + '/delete_subscription',
      data: form,
      headers: {'Content-Type': 'multipart/form-data' }
    });
}
