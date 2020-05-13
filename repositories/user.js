import Repository from "./Repository";

const resource = "/user";

export default {
    get() {
        return new Promise((resolve, reject) => {
            Repository.get(`${resource}/?client_user_name=${document.getElementById('gp-client-name').getAttribute('data-client-name')}`)
                .then(response => {
                    resolve(response.data.body);
                })
                .catch(error => {
                    reject(error.response);
                });
        });
    },

    find(id) {
        return new Promise((resolve, reject) => {
            Repository.get(`${resource}/${id}`)
                .then(response => {
                    resolve(response.data.body);
                })
                .catch(error => {
                    reject(error.response);
                });
        });
    },

    create(payload) {
        return new Promise((resolve, reject) => {
            Repository.post(`${resource}`, payload)
                .then(response => {
                    resolve(response.data.body);
                })
                .catch(error => {
                    reject(error.response);
                });
        });
    },

    update(id, payload) {
        return new Promise((resolve, reject) => {
            Repository.put(`${resource}/${id}`, payload)
                .then(response => {
                    resolve(response.data.body);
                })
                .catch(error => {
                    reject(error.response);
                });
        });
    },

    delete(id) {
        return new Promise((resolve, reject) => {
            Repository.delete(`${resource}/${id}`)
                .then(response => {
                    resolve(response.data.body);
                })
                .catch(error => {
                    reject(error.response);
                });
        });
    },

    invite(email) {
        return new Promise((resolve, reject) => {
            Repository.post(`${resource}/invite`, email)
                .then(response => {
                    resolve(response.data.body);
                })
                .catch(error => {
                    reject(error.response);
                });
        });
    }
}
