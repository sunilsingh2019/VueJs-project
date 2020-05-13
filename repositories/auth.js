import Repository from "./Repository";

import axios from "axios";

const resource = "";

export default {
    login(payload) {
        return new Promise((resolve, reject) => {
            axios.post(`${resource}/api/login`, payload)
                .then(response => {
                    resolve(response.data.body);
                })
                .catch(error => {
                    reject(error.response);
                });
        });
    },

    logout() {
        return new Promise((resolve, reject) => {
            Repository.post(`${resource}/logout`, {})
                .then(response => {
                    resolve(response.data.body);
                })
                .catch(error => {
                    reject(error.response);
                });
        });
    },

    register(payload) {
        return new Promise((resolve, reject) => {
            axios.post(`${resource}/api/register`, payload)
                .then(response => {
                    resolve(response.data.body);
                })
                .catch(error => {
                    reject(error.response);
                });
        });
    }
}
