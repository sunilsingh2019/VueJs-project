import Repository from "./Repository";

const resource = "/ticket-counter/clients";

export default {
    get() {
        return new Promise((resolve, reject) => {
            Repository.get(`${resource}`)
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

    list() {
        return new Promise((resolve, reject) => {
            Repository.get(`${resource}/list`)
                .then(response => {
                    resolve(response.data.body);
                })
                .catch(error => {
                    reject(error.response);
                });
        });
    }
}
