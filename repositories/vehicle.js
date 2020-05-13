import Repository from "./Repository";

const resource = "/ticket-counter/vehicle";

export default {
    /* Active when status is 4 aka completed! */
    getActiveVehicles() {
        return new Promise((resolve, reject) => {
            Repository.post(`${resource}/get-active-vehicles`)
                .then(response => {
                    resolve(response.data.body);
                })
                .catch(error => {
                    reject(error.response);
                });
        });
    },

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

    changeStatus(id, status) {
        return new Promise((resolve, reject) => {
            Repository.post(`${resource}/${id}/${status}/change-status`)
                .then(response => {
                    resolve(response.data.body);
                })
                .catch(error => {
                    reject(error.response);
                });
        });
    },

    getSeats(id) {
        return new Promise((resolve, reject) => {
            Repository.post(`/vehicle/seats/${id}`)
                .then(response => {
                    resolve(response.data.body);
                })
                .catch(error => {
                    reject(error.response);
                });
        });
    },

    getVehicles() {
        return new Promise((resolve, reject) => {
            Repository.post(`${resource}/get-vehicles`)
                .then(response => {
                    resolve(response.data.body);
                })
                .catch(error => {
                    reject(error.response);
                });
        });
    },

    saveSeats(payload) {
        return new Promise((resolve, reject) => {
            Repository.post(`${resource}/seats`, payload)
                .then(response => {
                    resolve(response.data.body);
                })
                .catch(error => {
                    reject(error.response);
                });
        });
    },

    getSeatStats(id, date) {
        return new Promise((resolve, reject) => {
            Repository.post(`/vehicle/seats-stat/${id}/${date}`)
                .then(response => {
                    resolve(response.data.body);
                })
                .catch(error => {
                    reject(error.response);
                });
        });
    },

    getVehicleLayoutSettings(id) {
        return new Promise((resolve, reject) => {
            Repository.post(`/vehicle/${id}/get-layout-settings`)
                .then(response => {
                    resolve(response.data.body);
                })
                .catch(error => {
                    reject(error.response);
                });
        });
    }

}
